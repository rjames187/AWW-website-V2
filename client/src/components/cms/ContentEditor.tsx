import { Eye, EyeOff, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import { useState, useCallback } from 'react';
import HierarchicalCategory from './HierarchicalCategory';

interface ContentEditorProps {
  schema: any;
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const ContentEditor = ({ schema, initialData = {}, onSave, onCancel }: ContentEditorProps) => {
  const [formData, setFormData] = useState<any>(initialData);
  const [errors, setErrors] = useState<any>({});
  const [imagePreview, setImagePreview] = useState(initialData.image || null);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: null
      }));
    }
  }, [errors]);

  const handleArrayChange = useCallback((field: string, index: number, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field]?.map((item: any, i: number) => i === index ? value : item) || []
    }));
  }, []);

  const handleArrayAdd = useCallback((field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  }, []);

  const handleArrayRemove = useCallback((field: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field]?.filter((_: any, i: number) => i !== index) || []
    }));
  }, []);

  const handleHierarchicalChange = useCallback((field: string, categoryIndex: number, itemIndex: number, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field]?.map((category: { items: any[]; }, ci: number) => 
        ci === categoryIndex 
          ? {
            ...category,
            items: category.items?.map((item: any, ii: number) => ii === itemIndex ? value : item) || []
          }
          : category
      ) || []
    }));
  }, []);

  const handleHierarchicalAdd = useCallback((field: string, categoryIndex: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field]?.map((category: { items: any[]; }, ci: number) => 
        ci === categoryIndex 
          ? {
            ...category,
            items: [...(category.items || []), '']
          }
          : category
      ) || []
    }));
  }, []);

  const handleHierarchicalRemove = useCallback((field: string, categoryIndex: number, itemIndex: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field]?.map((category: { items: any[]; }, ci: number) => 
        ci === categoryIndex 
          ? {
            ...category,
            items: category.items?.filter((_: any, ii: number) => ii !== itemIndex) || []
          }
          : category
      ) || []
    }));
  }, []);

  const handleCategoryAdd = useCallback((field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...(prev[field] || []), { name: '', items: [] }]
    }));
  }, []);

  const handleCategoryRemove = useCallback((field: string, categoryIndex: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field]?.filter((_: any, ci: number) => ci !== categoryIndex) || []
    }));
  }, []);

  const handleCategoryNameChange = useCallback((field: string, categoryIndex: number, name: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field]?.map((category: { name: string; }, ci: number) => 
        ci === categoryIndex ? { ...category, name } : category
      ) || []
    }));
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setImagePreview(result);
        setFormData((prev: any) => ({
          ...prev,
          image: result
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const validateForm = () => {
    const newErrors: any = {};

    schema.fields.forEach((field: { required: boolean; name: string; label: string; type: string; }) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.type === 'email' && formData[field.name] && 
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])) {
        newErrors[field.name] = 'Please enter a valid email address';
      }
      
      if (field.type === 'url' && formData[field.name] && 
          !/^https?:\/\/.+/.test(formData[field.name])) {
        newErrors[field.name] = 'Please enter a valid URL';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const renderField = (field: {
    categoryLabel: string; name: string; label: string; type: string; required: boolean; placeholder?: string; options?: string[]; 
}) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];
    
    const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors";
    const errorClasses = error ? "border-red-500" : "border-gray-300";
    
    const arrayValue = formData[field.name] || [];
    const hierarchicalValue = formData[field.name] || [];
    
    switch (field.type) {
    case 'text':
    case 'email':
    case 'url':
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
            placeholder={field.placeholder}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
      
    case 'textarea':
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${baseClasses} ${errorClasses} h-24 resize-vertical`}
            placeholder={field.placeholder}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
      
    case 'select':
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
      
    case 'number':
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
            placeholder={field.placeholder}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
      
    case 'array':
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {arrayValue.map((item: string | number | readonly string[] | undefined, index: number) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(field.name, index, e.target.value)}
                className={`${baseClasses} ${errorClasses} flex-1`}
                placeholder={`${field.label} ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleArrayRemove(field.name, index)}
                className="ml-2 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleArrayAdd(field.name)}
            className="flex items-center px-3 py-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-md transition-colors"
          >
            <Plus size={16} className="mr-1" />
              Add {field.label}
          </button>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
      
    case 'hierarchical':
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
            {hierarchicalValue.map((category: any, categoryIndex: any) => (
              <HierarchicalCategory
                key={categoryIndex}
                category={category}
                categoryIndex={categoryIndex}
                field={field}
                onCategoryNameChange={handleCategoryNameChange}
                onCategoryRemove={handleCategoryRemove}
                onItemChange={handleHierarchicalChange}
                onItemAdd={handleHierarchicalAdd}
                onItemRemove={handleHierarchicalRemove}
              />
            ))}
            <button
              type="button"
              onClick={() => handleCategoryAdd(field.name)}
              className="flex items-center px-3 py-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-md transition-colors mt-2"
            >
              <Plus size={16} className="mr-1" />
                Add {field.categoryLabel || 'Category'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
      
    default:
      return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {schema.title}
        </h2>
        <p className="text-gray-600">{schema.description}</p>
      </div>

      <div className="space-y-4">
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {imagePreview ? (
                <div className="space-y-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-48 mx-auto rounded-md object-cover"
                  />
                  <p className="text-sm text-purple-600 hover:text-purple-800">
                    Click to change image
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click to upload an image
                  </p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Dynamic Fields */}
        {schema.fields.map(renderField)}

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center px-4 py-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-md transition-colors"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            <span className="ml-2">{showPreview ? 'Hide' : 'Show'} Preview</span>
          </button>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors border border-gray-300"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-md transition-colors"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      {showPreview && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Preview</h3>
          <div className="bg-white p-4 rounded-md">
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-32 rounded-md object-cover"
                />
              </div>
            )}
            {schema.fields.map((field: { name: any; label: any; type: string; }) => (
              formData[field.name] && (
                <div key={field.name} className="mb-2">
                  <strong className="text-sm text-gray-600">{field.label}:</strong>
                  <span className="ml-2 text-sm">
                    {field.type === 'hierarchical' 
                      ? (
                        <div className="mt-1">
                          {formData[field.name].map((category: any, idx: number) => (
                            <div key={idx} className="mb-1">
                              <strong>{category.name}:</strong> {category.items?.join(', ')}
                            </div>
                          ))}
                        </div>
                      )
                      : Array.isArray(formData[field.name]) 
                        ? formData[field.name].join(', ')
                        : formData[field.name]
                    }
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;