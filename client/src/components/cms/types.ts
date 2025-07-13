export interface FieldDefinition {
  name: string;
  type: 'string' | 'number' | 'array' | 'email' | 'phone' | 'file' | 'url';
  optional?: boolean;
  arrayType?: 'string' | 'number' | 'object';
  objectSchema?: FieldDefinition[];
}

export interface ContentSchema {
  name: string;
  fields: FieldDefinition[];
}

export interface ContentObject {
  id: string;
  [key: string]: any;
}