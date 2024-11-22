import { Record, pipe, Array } from 'effect';
import { SITE_CONTENT_INDEX } from './sources';

//

type ContentLoader = {
	path: string;
	loader: () => Promise<string>;
};

export function getSiteContentLoaders(): ContentLoader[] {
	const exclude = ['home.json', 'settings.json'];

	const entries = pipe(
		SITE_CONTENT_INDEX,
		Record.filter((_, key) => !exclude.some((e) => key.endsWith(e)))
	);

	return pipe(
		Record.toEntries(entries),
		Array.map(([path, loader]) => ({
			path,
			loader
		}))
	);
}
