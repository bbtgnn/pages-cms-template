<script lang="ts">
	import home from '$lib/site/home.json';
	import { marked } from 'marked';
	import Prose from './Prose.svelte';

	const htmlContent = home.introduction ? marked(home.introduction, { async: false }) : '';
</script>

{#if home.introduction}
	<div class="bg-base py-8 sm:py-12">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl text-center">
				<Prose content={htmlContent} />
			</div>
		</div>
	</div>
{/if}
