import { useState } from "react";
import ContentEditor from "../components/cms/ContentEditor";
import ContentList from "../components/cms/ContentList";
import './cms.css'

type Sponsor = {
  name: string;
  website: string;
  description: string;
  contact_email: string;
  sponsorship_levels: { name: string; items: string[] }[];
  image: any;
  tags?: string[];
};

type Horse = {
  name: string;
  breed: string;
  age: string;
  color: string;
  disciplines: string[];
  description: string;
  owner: string;
  image: any;
};

type Member = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  membership_type: string;
  interests: string[];
  bio: string;
  image: any;
};

type ContentType = 'sponsors' | 'horses' | 'members';

type ContentData = {
  sponsors: Sponsor[];
  horses: Horse[];
  members: Member[];
};

const ContentManagement = () => {
  const [currentContent, setCurrentContent] = useState<any>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [contentType, setContentType] = useState<ContentType>('sponsors');
  const [contentData, setContentData] = useState<ContentData>({
    sponsors: [
      {
        name: 'Acme Corp',
        website: 'https://acme.com',
        description: 'Leading provider of equestrian equipment',
        contact_email: 'sponsor@acme.com',
        sponsorship_levels: [
          { name: 'Grand Champion', items: ['Main Arena Sponsorship', 'Trophy Presentation'] },
          { name: 'Reserve Champion', items: ['Warm-up Arena', 'Program Advertisement'] }
        ],
        image: null
      }
    ],
    horses: [
      {
        name: 'Thunder',
        breed: 'Thoroughbred',
        age: '8',
        color: 'Bay',
        disciplines: ['Dressage', 'Show Jumping'],
        description: 'Experienced competition horse',
        owner: 'Jane Smith',
        image: null
      }
    ],
    members: [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        membership_type: 'Premium',
        interests: ['Dressage', 'Trail Riding'],
        bio: 'Passionate rider with 15 years experience',
        image: null
      }
    ]
  });

  const schemas = {
    sponsors: {
      title: 'Sponsors',
      description: 'Manage sponsor information and sponsorship levels',
      fields: [
        { name: 'name', type: 'text', label: 'Sponsor Name', required: true, placeholder: 'Enter sponsor name' },
        { name: 'website', type: 'url', label: 'Website', required: false, placeholder: 'https://example.com' },
        { name: 'description', type: 'textarea', label: 'Description', required: false, placeholder: 'Brief description of the sponsor' },
        { name: 'contact_email', type: 'email', label: 'Contact Email', required: false, placeholder: 'contact@sponsor.com' },
        { 
          name: 'sponsorship_levels', 
          type: 'hierarchical', 
          label: 'Sponsorship Levels', 
          required: false,
          categoryLabel: 'Sponsorship Level',
          itemLabel: 'Sponsorship Item'
        },
        { name: 'tags', type: 'array', label: 'Tags', required: false }
      ]
    },
    horses: {
      title: 'Horses',
      description: 'Manage horse information and profiles',
      fields: [
        { name: 'name', type: 'text', label: 'Horse Name', required: true, placeholder: 'Enter horse name' },
        { name: 'breed', type: 'text', label: 'Breed', required: true, placeholder: 'Enter breed' },
        { name: 'age', type: 'number', label: 'Age', required: false, placeholder: 'Age in years' },
        { name: 'color', type: 'select', label: 'Color', required: false, options: ['Bay', 'Chestnut', 'Black', 'Gray', 'Palomino', 'Pinto', 'Appaloosa'] },
        { name: 'disciplines', type: 'array', label: 'Disciplines', required: false },
        { name: 'description', type: 'textarea', label: 'Description', required: false, placeholder: 'Horse description and notes' },
        { name: 'owner', type: 'text', label: 'Owner', required: false, placeholder: 'Owner name' }
      ]
    },
    members: {
      title: 'Members',
      description: 'Manage member information and profiles',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', required: true, placeholder: 'Enter first name' },
        { name: 'last_name', type: 'text', label: 'Last Name', required: true, placeholder: 'Enter last name' },
        { name: 'email', type: 'email', label: 'Email', required: true, placeholder: 'member@example.com' },
        { name: 'phone', type: 'text', label: 'Phone', required: false, placeholder: '(555) 123-4567' },
        { name: 'membership_type', type: 'select', label: 'Membership Type', required: true, options: ['Standard', 'Premium', 'Family', 'Student'] },
        { name: 'interests', type: 'array', label: 'Interests', required: false },
        { name: 'bio', type: 'textarea', label: 'Bio', required: false, placeholder: 'Member biography' }
      ]
    }
  };

  const handleSave = (data: any) => {
    setContentData(prev => ({
      ...prev,
      [contentType]: editingIndex !== null 
        ? prev[contentType].map((item, index) => index === editingIndex ? data : item)
        : [...prev[contentType], data]
    }));
    setCurrentContent(null);
    setEditingIndex(null);
  };

  const handleEdit = (item: any, index: number) => {
    setCurrentContent(item);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setContentData(prev => ({
        ...prev,
        [contentType]: prev[contentType].filter((_, i) => i !== index)
      }));
    }
  };

  const handleNew = () => {
    setCurrentContent({});
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setCurrentContent(null);
    setEditingIndex(null);
  };

  if (currentContent !== null) {
    return (
      <ContentEditor
        schema={schemas[contentType]}
        initialData={currentContent}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">CMS Content Editor</h1>
      
      <div className="mb-6">
        <div className="flex space-x-4">
          {(Object.keys(schemas) as ContentType[]).map(key => (
            <button
              key={key}
              onClick={() => setContentType(key)}
              className={`px-4 py-2 rounded-md transition-colors ${
                contentType === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {schemas[key].title}
            </button>
          ))}
        </div>
      </div>

      <ContentList
        items={contentData[contentType]}
        schema={schemas[contentType]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onNew={handleNew}
      />
    </div>
  );
};

export default ContentManagement;