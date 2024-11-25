import { Record, pipe, Array } from 'effect';
import { SITE_CONTENT_INDEX, SITE_FOLDER_PATH } from './sources';

//

type ContentLoader = {
	filePath: string;
	loader: () => Promise<string>;
	urlPathname: string;
};

export function getSiteContentLoaders(): ContentLoader[] {
	const exclude = ['home.json', 'settings.json'];

	const entries = pipe(
		SITE_CONTENT_INDEX,
		Record.filter((_, key) => !exclude.some((e) => key.endsWith(e)))
	);

	return pipe(
		Record.toEntries(entries),
		Array.map(([filePath, loader]) => ({
			loader,
			filePath,
			urlPathname: filePath
				.replace(/\.[^/.]+$/, '')
				.replace(SITE_FOLDER_PATH, '')
				.replace('//', '/')
		}))
	);
}
