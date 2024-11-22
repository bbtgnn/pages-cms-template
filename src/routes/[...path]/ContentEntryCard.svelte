<script lang="ts">
	import type { ContentEntry } from './+page';
	import { decode } from 'html-entities';
	import { assets, base } from '$app/paths';

	let { entry }: { entry: ContentEntry } = $props();

	// Function to create an excerpt from HTML content
	function createExcerpt(html: string | undefined, maxLength = 150): string {
		if (!html) return '';
		// Remove HTML tags and decode HTML entities
		const text = decode(html.replace(/<[^>]*>/g, ''));
		if (text.length <= maxLength) return text;
		// Find the last space before maxLength to avoid cutting words
		const lastSpace = text.lastIndexOf(' ', maxLength);
		return text.substring(0, lastSpace) + '...';
	}
</script>

<a
	href={base + entry.path}
	class="block overflow-hidden rounded-lg border border-base-content/10 bg-base text-base-content shadow-md transition-transform duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-md hover:shadow-accent/30"
>
	<div class="h-48 w-full">
		{#if entry.cover}
			<img
				src="{assets}{entry.cover}"
				alt={entry.title || 'Blog post'}
				loading="lazy"
				class="h-full w-full object-cover"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-base-content/5">
				<svg class="h-12 w-12 text-base-content/20" fill="currentColor" viewBox="0 0 24 24">
					<path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm5 3h2v6h-2V9zm-3 3h2v3H8v-3zm6 0h2v3h-2v-3z" />
				</svg>
			</div>
		{/if}
	</div>
	<div class="p-4">
		{#if entry.title}
			<h2 class="text-theme-text mb-2 line-clamp-2 text-xl font-semibold">{entry.title}</h2>
		{/if}
		{#if entry.content}
			<p class="text-theme-text/75 line-clamp-3 text-sm">{createExcerpt(entry.content)}</p>
		{/if}
	</div>
</a>
