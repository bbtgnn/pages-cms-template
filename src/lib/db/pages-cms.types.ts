/* - AI-generated file - */

// Base field type that all fields extend
export interface BaseField {
	name: string;
	label: string;
	type: string;
	required?: boolean;
	list?: boolean;
}

// Specific field types
export interface StringField extends BaseField {
	type: 'string';
}

export interface RichTextField extends BaseField {
	type: 'rich-text';
}

export interface ImageField extends BaseField {
	type: 'image';
}

export interface ObjectField extends BaseField {
	type: 'object';
	fields: Field[];
}

// Union of all field types
export type Field = StringField | RichTextField | ImageField | ObjectField;

// Content model types
export interface ContentModel {
	name: string;
	label: string;
	path: string;
	type: 'file' | 'collection';
	fields: Field[];
}

// Root configuration type
export interface PagesCmsConfig {
	media: {
		input: string;
		output: string;
	};
	content: ContentModel[];
}
