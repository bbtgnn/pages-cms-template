<script lang="ts">
	import home from '$lib/site/home.json';
	import type { HomePageContent } from '$lib/types/generated-types';

	const { introduction } = home as HomePageContent;
</script>

{#if introduction}
	<div class="bg-white py-24 sm:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl text-center">
				<div class="prose prose-lg mx-auto">
					{@html introduction}
				</div>
			</div>
		</div>
	</div>
{/if}
