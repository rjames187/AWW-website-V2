import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ContentObject, ContentSchema } from "./types";
import FieldInput from "./FieldInput";

const ContentObjectEditor: React.FC<{
  schema: ContentSchema;
  object: ContentObject | null;
  onSave: (object: ContentObject) => void;
  onCancel: () => void;
}> = ({ schema, object, onSave, onCancel }) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (object) {
      setFormData({ ...object });
    } else {
      const initialData: any = { id: Date.now().toString() };
      schema.fields.forEach(field => {
        if (field.type === 'array') {
          initialData[field.name] = [];
        } else if (field.type === 'file') {
          initialData[field.name] = null;
        } else {
          initialData[field.name] = '';
        }
      });
      setFormData(initialData);
    }
  }, [object, schema]);

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#4a148c' }}>
            {object ? 'Edit' : 'Create'} {schema.name.slice(0, -1)}
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#666',
              padding: '4px'
            }}
          >
            <X size={24} />
          </button>
        </div>
        
        <div>
          {schema.fields.map((field) => (
            <div key={field.name} style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#4a148c' }}>
                {field.name} {!field.optional && <span style={{ color: '#e91e63' }}>*</span>}
              </label>
              <FieldInput
                field={field}
                value={formData[field.name]}
                onChange={(value) => setFormData({ ...formData, [field.name]: value })}
              />
            </div>
          ))}
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              onClick={handleSubmit}
              style={{
                background: '#7e57c2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 'bold'
              }}
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={onCancel}
              style={{
                background: '#9e9e9e',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentObjectEditor;