import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import SiteSettings from './src/lib/site/settings.json';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: SiteSettings.colors
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;
