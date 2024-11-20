import type { EntryGenerator } from './$types.js';
import { Record, pipe, Option } from 'effect';

//

function getSiteContent() {
	const siteContent = import.meta.glob('$lib/site/**', { query: '?raw', import: 'default' });
	const siteContentFolderPath = '/src/lib/site/';
	const exclude = ['home.json', 'settings.json'];

	return pipe(
		siteContent,
		Record.filter((_, key) => !exclude.some((e) => key.endsWith(e))),
		Record.mapKeys((key) => key.replace(siteContentFolderPath, '').replace(/\.[^/.]+$/, ''))
	);
}

//

export const entries: EntryGenerator = () => {
	return Object.keys(getSiteContent()).map((path) => ({
		path
	}));
};

export const load = async ({ params }) => {
	const path = params.path;
	const content = getSiteContent();

	const fileContent = Record.get(content, path);
	const matchedFiles = Record.filter(content, (_, key) => key.includes(path));

	if (Option.isSome(fileContent)) {
		return { content: await fileContent.value() };
	} else if (Record.size(matchedFiles) > 0) {
		const entries = await Promise.all(
			Object.entries(matchedFiles).map(async ([key, loader]) => ({
				path: key,
				content: await loader()
			}))
		);
		return { entries };
	} else {
		return {};
	}
};
