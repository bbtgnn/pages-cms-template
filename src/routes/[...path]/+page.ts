import type { EntryGenerator } from './$types.js';
import { Record, pipe, Array } from 'effect';
import { marked } from 'marked';
import { getSiteContentLoaders } from '$lib/db/index.js';
import { parseYamlFrontmatter } from '$lib/utils.js';

//

export const entries: EntryGenerator = () => {
	return Object.values(getSiteContentLoaders()).map(({ urlPathname }) => ({
		path: urlPathname.slice(1)
	}));
};

export const load = async ({ params }) => {
	const loaders = getSiteContentLoaders();
	const matchedLoaders = Array.filter(loaders, ({ urlPathname }) =>
		urlPathname.includes(params.path)
	);

	const entries = await pipe(
		matchedLoaders,
		Array.map(async ({ urlPathname, loader }) => {
			const fileContent = await loader();
			const data = parseYamlFrontmatter(fileContent);
			return transformDataToContentEntry(urlPathname, data);
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
