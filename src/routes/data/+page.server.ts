import { GITHUB_RAW_URL } from '$lib/utils.server';
import { pipe, Record, Array } from 'effect';

export const prerender = true;

export const load = async () => {
	const dataFileLoaders = import.meta.glob('$lib/export-data/*.{csv,json}', { query: '?raw' });

	const dataFilePaths = pipe(
		Record.toEntries(dataFileLoaders),
		Array.map(([path]) => GITHUB_RAW_URL + path)
	);

	return {
		dataFilePaths
	};
};
