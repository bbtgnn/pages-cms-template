import yaml from 'yaml';
import { config } from 'dotenv';

//

export function parseYamlFrontmatter(str: string): Record<string, unknown> {
	// Remove any leading/trailing whitespace
	const trimmed = str.trim();

	// Remove the first --- and last --- (if they exist)
	const yamlContent = trimmed
		.replace(/^---\s*/, '') // Remove starting ---
		.replace(/\s*---$/, ''); // Remove ending ---

	// Parse the YAML content
	return yaml.parse(yamlContent);
}

//

config();

export const GITHUB_RAW_URL = [
	'https://raw.githubusercontent.com',
	process.env.GITHUB_REPOSITORY ?? '',
	process.env.GITHUB_REF ?? ''
]
	.map((s) => s.replace(/^\/+|\/+$/g, '')) // Remove leading/trailing slashes from each segment
	.join('/');
