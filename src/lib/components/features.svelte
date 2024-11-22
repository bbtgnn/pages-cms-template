<script lang="ts">
	import home from '$lib/site/home.json';

	const { features } = home;
</script>

{#if features && features.length > 0}
	<div class="bg-base-content/5 text-base-content py-8 sm:py-12">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div
				class="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3"
			>
				{#each features as feature}
					<div
						class="bg-base ring-base-content/10 relative flex flex-col rounded-2xl p-8 shadow-sm ring-1 transition-all hover:shadow-md"
					>
						<div class="flex items-center gap-x-4">
							<div class="text-4xl">{feature.emoji}</div>
							<h3 class="text-base-content text-lg font-semibold leading-7">
								{feature.title}
							</h3>
						</div>
						<p class="text-base-content/90 mt-4 text-sm leading-6">
							{feature.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
