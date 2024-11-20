<script lang="ts">
	import home from '$lib/site/home.json';
	import type { HomePageContent } from '$lib/types/generated-types';
	import { marked } from 'marked';

	const { introduction } = home as HomePageContent;
	
	// Convert markdown to HTML if introduction exists
	const htmlContent = introduction ? marked(introduction) : '';
</script>

{#if introduction}
	<div class="bg-white py-8 sm:py-12">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl text-center">
				<div class="prose prose-lg mx-auto">
					{@html htmlContent}
				</div>
			</div>
		</div>
	</div>
{/if}
