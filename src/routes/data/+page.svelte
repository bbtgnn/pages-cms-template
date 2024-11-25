<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-7xl space-y-1 p-8">
	{#each data.dataFilePaths as path}
		<a href={path} class="block text-base-content underline hover:no-underline" target="_blank">
			{path}
		</a>
	{/each}
</div>
