import { useContext, useEffect, useRef, useState } from "react";
import { ContentObject, ContentSchema } from "../components/cms/types";
import ContentObjectEditor from "../components/cms/ContentObjectEditor";
import ContentList from "../components/cms/ContentList";
import { directorSchema, horseSchema, sponsorSchema } from "../data/schemas";
import { fetchData, updateData } from "../services/dataService";
import _ from "lodash";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { orchestrateAuthenticatedCall } from "../services/authService";

const placeholder: Record<string, ContentObject[]> = {
  'Horses': [],
  'Directors': [],
  'Sponsors': []
};

const CMSEditor: React.FC = () => {
  const [currentSchema, setCurrentSchema] = useState<ContentSchema>(horseSchema);
  const [data, setData] = useState<Record<string, ContentObject[]>>(placeholder);
  const [editingObject, setEditingObject] = useState<ContentObject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const prevDataRef = useRef<Record<string, ContentObject[]>>(placeholder);
  const responseCacheRef = useRef<Record<string, any> | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {

    (async () => {
      const data = await fetchData('data');
      responseCacheRef.current = _.cloneDeep(data.data);
      if (data.success) {
        setData(data.data || placeholder);
      } else {
        console.error('Failed to fetch initial data:', data.message);
        alert('Failed to load data. Please try again later.');
      }
    })();
  }, []);

  useEffect(() => {
    // ensure idempotency of data updates
    if (_.isEqual(data, prevDataRef.current)) {
      return;
    }
    prevDataRef.current = _.cloneDeep(data);
    // ensure a remote read does not trigger a remote write
    if (_.isEqual(data, responseCacheRef.current)) {
      return;
    }

    (async () => {
      // write new state to backend
      const response = await orchestrateAuthenticatedCall(
        authContext,
        navigate,
        updateData,
        ['data', data]
      );
      if ((!response.success) && response.reason === 'session_expired') {
        return;
      }
      if (!response.success) {
        alert('Failed to save data. Please try again later.');
        console.error('Failed to save data:', response?.message);
      }
    })();
  }, [data])

  const schemas = [horseSchema, directorSchema, sponsorSchema];

  const handleSave = async (object: ContentObject) => {
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