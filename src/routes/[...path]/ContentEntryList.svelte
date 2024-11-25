<script lang="ts">
	import type { ContentEntry } from './+page';
	import ContentEntryCard from './ContentEntryCard.svelte';
	import settings from '$lib/site/settings.json';
	import { page } from '$app/stores';
	import { Store } from 'runed';
	import { base } from '$app/paths';

	let { entries }: { entries: ContentEntry[] } = $props();

	const pageState = new Store(page);
	const currentPath = $derived(base + pageState.current.url.pathname);
	const currentSection = $derived(settings.menu.find((item) => item.href === currentPath)?.label);
</script>

<div class="px-6 py-12 text-base-content lg:px-8">
	{#if currentSection}
		<h1 class="mx-auto mb-10 max-w-7xl text-4xl font-bold">{currentSection}</h1>
	{/if}

	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each entries as entry}
			<ContentEntryCard {entry} />
		{/each}
	</div>
</div>
