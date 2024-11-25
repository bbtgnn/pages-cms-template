<script lang="ts">
	import { assets } from '$app/paths';
	import { isBaseColorDark } from '$lib/theme/utils';

	type Props = { content: string; class?: string };

	let { content, class: className }: Props = $props();
	const isDark = isBaseColorDark();

	const contentWithCorrectImagePath = $derived(
		content.replace(/src="([^"]*)"/g, (_, p1) => {
			// Absolute paths start with:
			// - http:// or https:// (external URLs)
			// - // (protocol-relative URLs)
			// - data: (data URLs)
			if (p1.startsWith('http://') || 
				p1.startsWith('https://') || 
				p1.startsWith('//') || 
				p1.startsWith('data:')) {
				return `src="${p1}"`;
			}
			// Prepend assets for relative paths and root-relative paths
			return `src="${assets}${p1}"`;
		})
	);
</script>

<div class="prose prose-lg {isDark ? 'prose-invert' : ''} mx-auto {className}">
	{@html contentWithCorrectImagePath}
</div>
