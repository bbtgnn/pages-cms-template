<script lang="ts">
	import home from '$lib/site/home.json';
	import type { HomePageContent } from '$lib/types/generated-types';

	const { features } = home as HomePageContent;
</script>

{#if features && features.length > 0}
	<div class="bg-gray-50 py-8 sm:py-12">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
				{#each features as feature}
					<div class="relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
						<div class="flex items-center gap-x-4">
							<div class="text-4xl">{feature.emoji}</div>
							<h3 class="text-lg font-semibold leading-7 text-gray-900">
								{feature.title}
							</h3>
						</div>
						<p class="mt-4 text-sm leading-6 text-gray-600">
							{feature.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
