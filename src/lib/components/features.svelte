<script lang="ts">
	import home from '$lib/site/home.json';
	import type { HomePageContent } from '$lib/types/generated-types';

	const { features } = home as HomePageContent;
</script>

{#if features && features.length > 0}
	<div class="bg-white py-8 sm:py-12">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
				{#each features as feature}
					<div class="text-center">
						<div class="text-4xl mb-4">{feature.emoji}</div>
						<h3 class="text-lg font-semibold leading-7 text-gray-900">
							{feature.title}
						</h3>
						<p class="mt-4 text-sm leading-6 text-gray-600">
							{feature.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
