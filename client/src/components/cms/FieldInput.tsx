import { Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { FieldDefinition } from "./types";
import { uploadImageFile } from "../../services/uploadService";
import { AuthContext } from "../../context/AuthContext";

const CDN_HOST = import.meta.env.VITE_CDN_HOST;

const FieldInput: React.FC<{
  field: FieldDefinition;
  value: any;
  onChange: (value: any) => void;
}> = ({ field, value, onChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const authContext = useContext(AuthContext);

  const baseInputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1c4e9',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: '#fafafa',
    transition: 'all 0.2s ease'
  };

  const focusStyle = {
    outline: 'none',
    borderColor: '#7e57c2',
    boxShadow: '0 0 0 2px rgba(126, 87, 194, 0.2)'
  };

  const handleFileSelect = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result;
      if (result) {
        const fileData = {
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: result as string
        };
        
        // Update the UI immediately with preview
        onChange(fileData);
        
        // Upload the file to backend
        setUploading(true);
        try {
          // Generate a unique key for the file
          const key = `${Date.now()}-${file.name}`;
          
          const { authData } = authContext;
          const { accessToken } = authData || {};

          // Upload using the File object (more efficient)
          const uploadResult = await uploadImageFile(file, key, accessToken);
          
          if (uploadResult.success) {
            // Update the value with the server URL
            onChange({
              ...fileData,
              uploadedUrl: uploadResult.url,
              uploadKey: key,
              dataUrl: undefined
            });
            console.log('File uploaded successfully:', uploadResult.url);
          } else {
            console.error('Upload failed:', uploadResult.message);
            // You might want to show an error message to the user here
          }
        } catch (error) {
          console.error('Upload error:', error);
          // You might want to show an error message to the user here
        } finally {
          setUploading(false);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  if (field.type === 'file') {
    return (
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: dragOver ? '2px dashed #7e57c2' : '2px dashed #d1c4e9',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: dragOver ? '#f3e5f5' : '#fafafa',
            transition: 'all 0.2s ease',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {value && (value.dataUrl || value.uploadKey) ? (
            <div style={{ width: '100%' }}>
              <img
                src={value.dataUrl ?? `${CDN_HOST}/${value.uploadKey}`}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100px',
                  objectFit: 'contain',
                  marginBottom: '8px',
                  borderRadius: '4px'
                }}
              />
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                {value.name} ({Math.round(value.size / 1024)} KB)
                {uploading && <span style={{ color: '#7e57c2', marginLeft: '8px' }}>Uploading...</span>}
                {value.uploadedUrl && <span style={{ color: '#4caf50', marginLeft: '8px' }}>✓ Uploaded</span>}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                }}
                style={{
                  background: '#e91e63',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '16px', color: '#7e57c2', marginBottom: '8px' }}>
                📁
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Click to select or drag & drop an image
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                Supported formats: JPG, PNG, GIF, WebP
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (field.type === 'array' && field.arrayType === 'number') {
    const arrayValue = Array.isArray(value) ? value : [];
    return (
      <div>
        <div style={{ marginBottom: '8px' }}>
          <input
            type="text"
            placeholder="Enter numbers separated by commas"
            value={arrayValue.join(', ')}
            onChange={(e) => {
              const numbers = e.target.value
                .split(',')
                .map(s => s.trim())
                .filter(s => s)
                .map(s => parseInt(s))
                .filter(n => !isNaN(n));
              onChange(numbers);
            }}
            style={baseInputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1c4e9';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>
    );
  }

  if (field.type === 'array' && field.arrayType === 'object' && field.objectSchema) {
    const arrayValue = Array.isArray(value) ? value : [];
    return (
      <div>
        {arrayValue.map((item: any, index: number) => (
          <div key={index} style={{ 
            marginBottom: '12px', 
            padding: '12px', 
            border: '1px solid #e1bee7',
            borderRadius: '4px',
            backgroundColor: '#f3e5f5'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong>Item {index + 1}</strong>
              <button
                onClick={() => {
                  const newArray = [...arrayValue];
                  newArray.splice(index, 1);
                  onChange(newArray);
                }}
                style={{
                  background: '#e91e63',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Remove
              </button>
            </div>
            {field.objectSchema?.map((subField: any) => (
              <div key={subField.name} style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#4a148c' }}>
                  {subField.name} {!subField.optional && <span style={{ color: '#e91e63' }}>*</span>}
                </label>
                <FieldInput
                  field={subField}
                  value={item[subField.name]}
                  onChange={(newValue) => {
                    const newArray = [...arrayValue];
                    newArray[index] = { ...newArray[index], [subField.name]: newValue };
                    onChange(newArray);
                  }}
                />
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={() => {
            const newItem: any = {};
            field.objectSchema!.forEach((subField: any) => {
              if (subField.type === 'file') {
                newItem[subField.name] = null;
              } else {
                newItem[subField.name] = '';
              }
            });
            onChange([...arrayValue, newItem]);
          }}
          style={{
            background: '#7e57c2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>
    );
  }

  return (
    <input
      type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : field.type === 'url' ? 'url' : 'text'}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      style={baseInputStyle}
      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
      onBlur={(e) => {
        e.target.style.borderColor = '#d1c4e9';
        e.target.style.boxShadow = 'none';
      }}
    />
  );
};

export default FieldInput;