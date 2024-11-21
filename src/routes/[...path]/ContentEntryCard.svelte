<script lang="ts">
	import type { ContentEntry } from './+page';

	let { entry }: { entry: ContentEntry } = $props();

	// Function to create an excerpt from HTML content
	function createExcerpt(html: string | undefined, maxLength = 150): string {
		if (!html) return '';
		// Use DOM API to properly decode HTML entities and remove tags
		const tempElement = document.createElement('div');
		tempElement.innerHTML = html;
		// Get plain text content with proper entity decoding
		const text = tempElement.textContent || tempElement.innerText || '';
		if (text.length <= maxLength) return text;
		// Find the last space before maxLength to avoid cutting words
		const lastSpace = text.lastIndexOf(' ', maxLength);
		return text.substring(0, lastSpace) + '...';
	}
</script>

<a
	href={entry.path}
	class="block overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
>
	<div class="h-48 w-full">
		{#if entry.cover}
			<img
				src={entry.cover}
				alt={entry.title || 'Blog post'}
				loading="lazy"
				class="h-full w-full object-cover"
			/>
		{:else}
			<div class="h-full w-full bg-gradient-to-br from-blue-100 to-blue-200"></div>
		{/if}
	</div>
	<div class="p-4">
		{#if entry.title}
			<h2 class="mb-2 line-clamp-2 text-xl font-semibold text-gray-900">{entry.title}</h2>
		{/if}
		{#if entry.content}
			<p class="line-clamp-3 text-sm text-gray-600">{createExcerpt(entry.content)}</p>
		{/if}
	</div>
</a>
