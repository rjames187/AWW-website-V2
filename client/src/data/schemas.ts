import { ContentSchema } from "../components/cms/types";

export const horseSchema: ContentSchema = {
  name: 'Horses',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'description', type: 'string', optional: true },
    { name: 'file', type: 'file' },
    { name: 'bf', type: 'array', arrayType: 'number', optional: true }
  ]
};

export const directorSchema: ContentSchema = {
  name: 'Directors',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'title', type: 'string', optional: true },
    { name: 'email', type: 'email', optional: true },
    { name: 'phone', type: 'phone', optional: true },
    { name: 'description', type: 'string', optional: true },
    { name: 'file', type: 'file' }
  ]
};

export const sponsorSchema: ContentSchema = {
  name: 'Sponsors',
  fields: [
    { name: 'category', type: 'string' },
    { 
      name: 'items', 
      type: 'array', 
      arrayType: 'object',
      objectSchema: [
        { name: 'name', type: 'string' },
        { name: 'file', type: 'file', optional: true },
        { name: 'href', type: 'url', optional: true }
      ]
    }
  ]
};