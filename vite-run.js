import { createServer } from 'vite';
import { ViteNodeRunner } from 'vite-node/client';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import config from './svelte.config.js';

//

/** @param {string} script Path to the script to execute */
async function run(script) {
	const dirname = path.dirname(fileURLToPath(import.meta.url));
	const scriptPath = path.resolve(dirname, script);

	/** @type {import('vite').ViteDevServer} */
	let server;

	try {
		server = await createServer({
			root: dirname,
			resolve: {
				alias: config.kit.alias
			}
		});

		const runner = new ViteNodeRunner({
			root: server.config.root,
			base: server.config.base,
			fetchModule: (id) => server.ssrFetchModule(id)
		});

		await runner.executeFile(scriptPath);
	} catch (error) {
		console.error(`Error executing script: ${script}`);
		console.error(error);
		console.log();
		console.error(
			"Please note that if you are running a script with dependencies, all of these dependencies and their sub-dependencies must not import SvelteKit's `$env` or `$app` modules"
		);
	} finally {
		if (server) await server.close();
	}
}

// Get the script path from command line arguments
const scriptPath = process.argv[2];

if (!scriptPath) {
	console.error('Please provide a script path as an argument');
	console.error('Usage: node script.js <path-to-script>');
	process.exit(1);
}

run(scriptPath).catch(() => {
	process.exit(1);
});
