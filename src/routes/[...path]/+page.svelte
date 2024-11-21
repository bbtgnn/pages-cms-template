<script lang="ts">
	import type { PageData } from './$types';
	import ContentEntryList from './ContentEntryList.svelte';
	import ContentEntry from './ContentEntry.svelte';

	let { data }: { data: PageData } = $props();
	const { entries } = $derived(data);
</script>

{#if entries.length === 1}
	<ContentEntry entry={entries[0]} />
{:else}
	<ContentEntryList {entries} />
{/if}
