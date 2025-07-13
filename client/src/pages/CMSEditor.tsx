import { useState } from "react";
import { ContentObject, ContentSchema } from "../components/cms/types";
import ContentObjectEditor from "../components/cms/ContentObjectEditor";
import ContentList from "../components/cms/ContentList";
import { directorSchema, horseSchema, sponsorSchema } from "../data/schemas";

const sampleData: Record<string, ContentObject[]> = {
  'Horses': [
    { 
      id: '1', 
      name: 'Thunder', 
      description: 'Beautiful stallion', 
      file: { 
        name: 'thunder.jpg', 
        size: 2048000, 
        type: 'image/jpeg', 
        dataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzdhNTdjMiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VGh1bmRlcjwvdGV4dD48L3N2Zz4=' 
      }, 
      bf: [2022, 2023] 
    },
    { 
      id: '2', 
      name: 'Lightning', 
      file: { 
        name: 'lightning.jpg', 
        size: 1500000, 
        type: 'image/jpeg', 
        dataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzllNjNmZiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TGlnaHRuaW5nPC90ZXh0Pjwvc3ZnPg==' 
      } 
    }
  ],
  'Directors': [
    { 
      id: '1', 
      name: 'John Doe', 
      title: 'CEO', 
      email: 'john@example.com', 
      phone: '5551234567', 
      file: { 
        name: 'john.jpg', 
        size: 1800000, 
        type: 'image/jpeg', 
        dataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzRhMTQ4YyIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Sm9obiBEb2U8L3RleHQ+PC9zdmc+' 
      } 
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      title: 'CTO', 
      email: 'jane@example.com', 
      file: { 
        name: 'jane.jpg', 
        size: 1600000, 
        type: 'image/jpeg', 
        dataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzZhMWI5YSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SmFuZSBTbWl0aDwvdGV4dD48L3N2Zz4=' 
      } 
    }
  ],
  'Sponsors': [
    { 
      id: '1', 
      category: 'Gold', 
      items: [
        { 
          name: 'ABC Corp', 
          file: { 
            name: 'abc.jpg', 
            size: 1200000, 
            type: 'image/jpeg', 
            dataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZDcwMCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJibGFjayIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QUJDIE9vcnA8L3RleHQ+PC9zdmc+' 
          }, 
          href: 'https://abc.com' 
        },
        { name: 'XYZ Ltd', href: 'https://xyz.com' }
      ]
    },
    { 
      id: '2', 
      category: 'Silver', 
      items: [
        { 
          name: 'DEF Inc', 
          file: { 
            name: 'def.jpg', 
            size: 900000, 
            type: 'image/jpeg', 
            dataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2M5YzljOSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJibGFjayIgdGV4dC1hbmNob3I9Im1pZGRsZSI+REVGIEluYzwvdGV4dD48L3N2Zz4=' 
          } 
        }
      ]
    }
  ]
};

const CMSEditor: React.FC = () => {
  const [currentSchema, setCurrentSchema] = useState<ContentSchema>(horseSchema);
  const [data, setData] = useState<Record<string, ContentObject[]>>(sampleData);
  const [editingObject, setEditingObject] = useState<ContentObject | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const schemas = [horseSchema, directorSchema, sponsorSchema];

  const handleSave = (object: ContentObject) => {
    const schemaName = currentSchema.name;
    const existingIndex = data[schemaName].findIndex(item => item.id === object.id);
    
    if (existingIndex >= 0) {
      const newData = { ...data };
      newData[schemaName][existingIndex] = object;
      setData(newData);
    } else {
      setData(prev => ({
        ...prev,
        [schemaName]: [...prev[schemaName], object]
      }));
    }
    
    setEditingObject(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const schemaName = currentSchema.name;
      setData(prev => ({
        ...prev,
        [schemaName]: prev[schemaName].filter(item => item.id !== id)
      }));
    }
  };

  const handleEdit = (object: ContentObject) => {
    setEditingObject(object);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingObject(null);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingObject(null);
    setIsCreating(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3e5f5',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#4a148c',
        color: 'white',
        padding: '16px 20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Content Management System</h1>
      </header>

      <nav style={{
        backgroundColor: '#6a1b9a',
        padding: '12px 20px',
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        {schemas.map((schema) => (
          <button
            key={schema.name}
            onClick={() => setCurrentSchema(schema)}
            style={{
              background: currentSchema.name === schema.name ? '#7e57c2' : 'transparent',
              color: 'white',
              border: '1px solid #7e57c2',
              borderRadius: '4px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: currentSchema.name === schema.name ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            {schema.name}
          </button>
        ))}
      </nav>

      <main>
        <ContentList
          schema={currentSchema}
          objects={data[currentSchema.name] || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
        />
      </main>

      {(editingObject || isCreating) && (
        <ContentObjectEditor
          schema={currentSchema}
          object={editingObject}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CMSEditor;