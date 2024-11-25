import { getSiteContentLoaders } from '$lib/db';
import { PAGES_CMS_CONFIG } from '$lib/db/sources';
import type { ContentModel, Field } from '$lib/db/pages-cms.types';
import fs from 'fs';
import path from 'path';
import { parseYamlFrontmatter } from '$lib/utils';
import { flatten } from 'flat';
import { pipe, Record, Array } from 'effect';
import { GITHUB_RAW_URL } from '$lib/utils.server';

//

main();

async function main() {
	const collections = PAGES_CMS_CONFIG.content.filter((content) => content.type === 'collection');
	for (const contentCollection of collections) {
		await generateCollectionCsv(contentCollection);
		await generateCollectionJson(contentCollection);
	}
	console.log(`✨ CSV and JSON files generated in: ${import.meta.dirname} ✨`);
}

async function generateCollectionCsv(contentModel: ContentModel) {
	const validFields = contentModel.fields.filter(isValidCsvField);

	// Create headers from fields
	const headers = validFields
		.map((field) => {
			if (field.type === 'object' && field.fields) {
				// For object types, create multiple columns with dot notation
				return field.fields.map((subField) => `${field.name}.${subField.name}`);
			}
			return field.name;
		})
		.flat();

	// Getting content
	const collectionEntries = await pipe(
		getSiteContentLoaders(),
		Array.filter((loader) => loader.filePath.includes(contentModel.path)),
		Array.map(({ loader }) => loader()),
		(entries) => Promise.all(entries)
	);

	const csvEntries = collectionEntries.map((content) =>
		pipe(
			parseYamlFrontmatter(content),
			// Map image fields to paths
			Record.map((value, key) => {
				const fieldConfig = validFields.find((f) => f.name == key);
				if (fieldConfig?.type == 'image' && typeof value == 'string') {
					return GITHUB_RAW_URL + '/static' + value;
				}
				return value;
			}),
			(record) => flatten(record) as Record<string, unknown>
		)
	);

	// Transform records into CSV rows
	const rows = csvEntries.map((record) =>
		headers
			.map((header) => {
				const value = record[header];
				// Handle special characters and quotes in CSV
				if (value === null || value === undefined) return '';
				const stringValue = String(value);
				if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
					return `"${stringValue.replace(/"/g, '""')}"`;
				}
				return stringValue;
			})
			.join(',')
	);

	// Combine headers and rows
	const csvContent = [headers.join(','), ...rows].join('\n');

	// Write to file
	const csvPath = path.join(import.meta.dirname, `${contentModel.name}.csv`);
	fs.writeFileSync(csvPath, csvContent);
}

function isValidCsvField(field: Field): boolean {
	return !(field?.type == 'rich-text' || field?.list == true || field?.type == 'object');
}

//

async function generateCollectionJson(contentModel: ContentModel) {
	const collectionEntries = await pipe(
		getSiteContentLoaders(),
		Array.filter((loader) => loader.filePath.includes(contentModel.path)),
		Array.map(({ loader }) => loader()),
		(entries) => Promise.all(entries)
	);

	const jsonEntries = collectionEntries.map((content) =>
		pipe(
			parseYamlFrontmatter(content),
			// Map image fields to paths
			Record.map((value, key) => {
				const fieldConfig = contentModel.fields.find((f) => f.name == key);
				if (fieldConfig?.type == 'image' && typeof value == 'string') {
					return GITHUB_RAW_URL + '/static' + value;
				}
				return value;
			}),
			(record) => flatten(record) as Record<string, unknown>
		)
	);

	// Combine headers and rows
	const jsonContent = JSON.stringify(jsonEntries, null, 4);

	// Write to file
	const jsonPath = path.join(import.meta.dirname, `${contentModel.name}.json`);
	fs.writeFileSync(jsonPath, jsonContent);
}
