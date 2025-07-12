import { ChevronDown, ChevronRight, Edit3, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface ContentListProps {
  items: any[];
  schema: {
    title: string;
  };
  onEdit: (item: any, index: number) => void;
  onDelete: (index: number) => void;
  onNew: () => void;
}

const ContentList = ({ items, schema, onEdit, onDelete, onNew }: ContentListProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Existing {schema.title}
        </h3>
        <button
          onClick={onNew}
          className="flex items-center px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-md transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add New
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No {schema.title.toLowerCase()} found. Create your first one!
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="mr-3 text-gray-500 hover:text-gray-700"
                  >
                    {expandedItems[index] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      {item.name || item.first_name && item.last_name ? `${item.first_name} ${item.last_name}` : `Item ${index + 1}`}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.description || item.bio || item.breed || 'No description'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(item, index)}
                    className="px-3 py-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-md transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              {expandedItems[index] && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.image && (
                      <div className="col-span-full">
                        <img
                          src={item.image}
                          alt="Content"
                          className="max-w-full max-h-32 rounded-md object-cover"
                        />
                      </div>
                    )}
                    {Object.entries(item).map(([key, value]) => (
                      key !== 'image' && value && (
                        <div key={key} className="text-sm">
                          <strong className="text-gray-600 capitalize">{key.replace('_', ' ')}:</strong>
                          <span className="ml-2 text-gray-800">
                            {Array.isArray(value) 
                              ? value.map(v => 
                                typeof v === 'object' && v !== null
                                  ? `${v.name ?? ''}${v.items ? `: ${Array.isArray(v.items) ? v.items.join(', ') : ''}` : ''}`
                                  : String(v)
                              ).join(', ')
                              : String(value)
                            }
                          </span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentList;