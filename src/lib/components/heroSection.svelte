<script lang="ts">
	import home from '$lib/site/home.json';
	import { assets } from '$app/paths';
</script>

<div class="relative isolate overflow-hidden">
	<!-- Background image -->
	<div class="absolute inset-0 -z-10">
		<img src="{assets}{home.hero_cover}" alt="" class="h-full w-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-t from-gray-900/50"></div>
	</div>

	<!-- Content -->
	<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
				{home.hero_title}
			</h1>
			<p class="mt-6 text-lg leading-8 text-gray-300">
				{home.hero_description}
			</p>
		</div>
	</div>
</div>
