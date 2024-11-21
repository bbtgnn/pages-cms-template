import type { EntryGenerator } from './$types.js';
import { Record, pipe, Array } from 'effect';
import yaml from 'yaml';
import { marked } from 'marked';

//

export const entries: EntryGenerator = () => {
	return Object.keys(getSiteContent()).map((path) => ({
		path
	}));
};

export const load = async ({ params }) => {
	const siteContent = getSiteContent();
	const matchedFiles = Record.filter(siteContent, (_, path) => path.includes(params.path));

	const entries = await pipe(
		Record.toEntries(matchedFiles),
		Array.map(async ([path, contentPromise]) => {
			const fileContent = await contentPromise();
			const data = parseYamlFrontmatter(fileContent);
			return transformDataToContentEntry(path, data);
		}),
		(entries) => Promise.all(entries)
	);

	return {
		entries
	};
};

// Utils

export type ContentEntry = {
	path: string;
	title?: string;
	cover?: string;
	content?: string;
	metadata?: Record<string, unknown>;
};

function getSiteContent() {
	const siteContent = import.meta.glob('$lib/site/**', { query: '?raw', import: 'default' });
	const siteContentFolderPath = '/src/lib/site/';
	const exclude = ['home.json', 'settings.json'];

	const entries = pipe(
		siteContent,
		Record.filter((_, key) => !exclude.some((e) => key.endsWith(e))),
		Record.mapKeys((key) => key.replace(siteContentFolderPath, '').replace(/\.[^/.]+$/, ''))
	);

	// Promise<string> because we're using ?raw
	return entries as Record<string, () => Promise<string>>;
}

function parseYamlFrontmatter(str: string): Record<string, unknown> {
	// Remove any leading/trailing whitespace
	const trimmed = str.trim();

	// Remove the first --- and last --- (if they exist)
	const yamlContent = trimmed
		.replace(/^---\s*/, '') // Remove starting ---
		.replace(/\s*---$/, ''); // Remove ending ---

	// Parse the YAML content
	return yaml.parse(yamlContent);
}

async function transformDataToContentEntry(
	path: string,
	data: Record<string, unknown>
): Promise<ContentEntry> {
	const { title, cover, content, ...metadata } = data;

	let htmlContent: string | undefined = undefined;
	try {
		if (content && typeof content === 'string') htmlContent = await marked(content);
	} catch (e) {
		console.error(e);
	}

	return {
		path,
		title: title as string | undefined,
		cover: cover as string | undefined,
		content: htmlContent,
		metadata
	};
}
