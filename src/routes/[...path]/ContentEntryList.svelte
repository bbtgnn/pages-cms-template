<script lang="ts">
	import type { ContentEntry } from './+page';
	import ContentEntryCard from './ContentEntryCard.svelte';

	export let entries: ContentEntry[];
</script>

<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-8 sm:grid-cols-2 lg:grid-cols-3">
	{#each entries as entry}
		<ContentEntryCard {entry} />
	{/each}
</div>
