import { Edit, Plus, Trash2 } from "lucide-react";
import { ContentObject, ContentSchema, FieldDefinition } from "./types";

const ContentList: React.FC<{
  schema: ContentSchema;
  objects: ContentObject[];
  onEdit: (object: ContentObject) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}> = ({ schema, objects, onEdit, onDelete, onCreate }) => {
  const renderFieldValue = (field: FieldDefinition, value: any): string => {
    if (value === null || value === undefined) return '';
    
    if (field.type === 'array') {
      if (field.arrayType === 'number') {
        return Array.isArray(value) ? value.join(', ') : '';
      } else if (field.arrayType === 'object') {
        return Array.isArray(value) ? `${value.length} items` : '0 items';
      }
    }
    
    if (field.type === 'file') {
      return value && value.name ? `Image: ${value.name}` : 'No image';
    }
    
    return String(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#4a148c' }}>{schema.name}</h2>
        <button
          onClick={onCreate}
          style={{
            background: '#7e57c2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 'bold'
          }}
        >
          <Plus size={16} />
          Create New
        </button>
      </div>

      {objects.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          No {schema.name.toLowerCase()} found. Create your first one!
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
        }}>
          {objects.map((object) => (
            <div
              key={object.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e1bee7',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, color: '#4a148c', fontSize: '16px' }}>
                  {object.name || object.category || 'Unnamed'}
                </h3>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => onEdit(object)}
                    style={{
                      background: '#7e57c2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(object.id)}
                    style={{
                      background: '#e91e63',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              {schema.fields.slice(0, 3).map((field) => (
                <div key={field.name} style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#6a1b9a', fontSize: '12px' }}>
                    {field.name}:
                  </strong>
                  <span style={{ marginLeft: '6px', fontSize: '12px', color: '#666' }}>
                    {renderFieldValue(field, object[field.name])}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentList;