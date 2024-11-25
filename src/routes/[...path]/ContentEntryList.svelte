<script lang="ts">
	import type { ContentEntry } from './+page';
	import ContentEntryCard from './ContentEntryCard.svelte';
	import settings from '$lib/site/settings.json';
	import { PageState } from '$root/src/lib/utils.svelte';

	let { entries }: { entries: ContentEntry[] } = $props();

	const pageState = new PageState();
	const currentSection = $derived(
		settings.menu.find((item) => item.href === pageState.rawPathname)?.label
	);
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
