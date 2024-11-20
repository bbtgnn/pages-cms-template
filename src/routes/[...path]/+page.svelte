<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { content, entries } = $derived(data);
</script>

{#if content}
	<pre>{JSON.stringify(content, null, 2)}</pre>
{:else if entries}
	<div class="space-y-2">
		{#each entries as entry}
			<div>
				<a href="/{entry.path}" class="text-blue-600 underline hover:text-blue-800">
					{entry.path}
				</a>
			</div>
		{/each}
	</div>
{/if}
