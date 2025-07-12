import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface HierarchicalCategoryProps {
  category: any;
  categoryIndex: number;
  field: any;
  onCategoryNameChange: (fieldName: string, categoryIndex: number, newName: string) => void;
  onCategoryRemove: (fieldName: string, categoryIndex: number) => void; 
  onItemChange: (fieldName: string, categoryIndex: number, itemIndex: number, newValue: string) => void;
  onItemAdd: (fieldName: string, categoryIndex: number) => void;
  onItemRemove: (fieldName: string, categoryIndex: number, itemIndex: number) => void;
}

const HierarchicalCategory = ({ 
  category, 
  categoryIndex, 
  field, 
  onCategoryNameChange, 
  onCategoryRemove, 
  onItemChange, 
  onItemAdd, 
  onItemRemove 
}: HierarchicalCategoryProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-4 bg-white border border-gray-200 rounded-md p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center flex-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2 text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          <input
            type="text"
            value={category.name}
            onChange={(e) => onCategoryNameChange(field.name, categoryIndex, e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder={`${field.categoryLabel || 'Category'} Name`}
          />
        </div>
        <button
          type="button"
          onClick={() => onCategoryRemove(field.name, categoryIndex)}
          className="ml-2 px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
      
      {isExpanded && (
        <div className="ml-6">
          {category.items?.map((item: any, itemIndex: number) => (
            <div key={itemIndex} className="flex mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => onItemChange(field.name, categoryIndex, itemIndex, e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder={`${field.itemLabel || 'Item'} ${itemIndex + 1}`}
              />
              <button
                type="button"
                onClick={() => onItemRemove(field.name, categoryIndex, itemIndex)}
                className="ml-2 px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onItemAdd(field.name, categoryIndex)}
            className="flex items-center px-2 py-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-md transition-colors text-sm"
          >
            <Plus size={14} className="mr-1" />
            Add {field.itemLabel || 'Item'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HierarchicalCategory;