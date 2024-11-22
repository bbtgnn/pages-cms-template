import { GITHUB_RAW_URL } from '$lib/utils';
import { pipe, Record, Array } from 'effect';

export const load = async () => {
	const csvFileLoaders = import.meta.glob('$lib/csv/*.csv', { query: '?raw' });

	const csvFilePaths = pipe(
		Record.toEntries(csvFileLoaders),
		Array.map(([path]) => GITHUB_RAW_URL + path)
	);

	return {
		csvFilePaths
	};
};
