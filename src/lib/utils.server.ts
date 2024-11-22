import { config } from 'dotenv';

config();

export const GITHUB_RAW_URL = [
	'https://raw.githubusercontent.com',
	process.env.GITHUB_REPOSITORY ?? '',
	process.env.GITHUB_REF ?? ''
]
	.map((s) => s.replace(/^\/+|\/+$/g, '')) // Remove leading/trailing slashes from each segment
	.join('/');
