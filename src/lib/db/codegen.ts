import type { Field, PagesCmsConfig, ContentModel } from './pages-cms.types';
import prettier from 'prettier';
import { PAGES_CMS_CONFIG } from './sources';
import path from 'path';
import fs from 'fs/promises';

//

main();

async function main() {
	const rawCode = generateTypeDefinitions(PAGES_CMS_CONFIG);
	const formattedCode = await formatCode(rawCode);
	const filePath = path.join(import.meta.dirname, `db.types.ts`);
	await fs.writeFile(filePath, formattedCode);
	console.log(`✨ Type definitions written to ${filePath} ✨`);
}

//

function generateTypeDefinitions(config: PagesCmsConfig): string {
	const contentTypes = config.content.map((content) => ({
		contentType: contentModelToType(content),
		contentName: content.name,
		type: content.type
	}));

	//

	const indexTypeEntries = contentTypes.map(
		(content) => `${formatKey(content.contentName)}: ${content.contentType.typeName}`
	);
	const COLLECTIONS_TYPE_NAME = 'Collections';
	const indexType = `export type ${COLLECTIONS_TYPE_NAME} = { ${indexTypeEntries.join(';\n')} }`;
	const collectionNameType = `export type CollectionName = keyof ${COLLECTIONS_TYPE_NAME}`;

	//

	const output = [
		indexType,
		collectionNameType,
		...contentTypes.map((content) => content.contentType.typeCode)
	].join('\n\n');

	return output;
}

function contentModelToType(content: ContentModel): { typeName: string; typeCode: string } {
	const typeName = toPascalCase(content.name);
	const fields = content.fields.map(
		(field) => `${formatKey(field.name)}: ${getTypeForField(field)}`
	);
	const typeCode = `export type ${typeName} = { ${fields.join(';\n')} }`;
	return { typeName, typeCode };
}

function getTypeForField(field: Field): string {
	switch (field.type) {
		case 'string':
			return 'string';
		case 'image':
			return 'string'; // Image fields store paths as strings
		case 'rich-text':
			return 'string';
		case 'object':
			if (field.fields) {
				const nestedTypes = field.fields.map((f) => `${formatKey(f.name)}: ${getTypeForField(f)}`);
				return `{ ${nestedTypes.join(';\n')} }`;
			}
			return 'Record<string, unknown>';
		default:
			return 'unknown';
	}
}

// Utils

async function formatCode(code: string, options: prettier.Options = { parser: 'typescript' }) {
	const formatOptions = await prettier.resolveConfig(import.meta.url, { editorconfig: true });
	const formattedCode = await prettier.format(code, {
		...formatOptions,
		...options
	});
	return formattedCode;
}

function toPascalCase(str: string): string {
	return str
		.split(/[-_\s]+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join('');
}

function formatKey(string: string): string {
	return JSON.stringify(string);
}
