<script lang="ts">
	import home from '$lib/site/home.json';
	import type { HomePageContent } from '$lib/types/generated-types';
	import { marked } from 'marked';
	import Prose from './Prose.svelte';

	const { introduction } = home as HomePageContent;
	const htmlContent = introduction ? marked(introduction, { async: false }) : '';
</script>

{#if introduction}
	<div class="bg-base py-8 sm:py-12">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl text-center">
				<Prose content={htmlContent} />
			</div>
		</div>
	</div>
{/if}
