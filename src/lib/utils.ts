import yaml from 'yaml';

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
