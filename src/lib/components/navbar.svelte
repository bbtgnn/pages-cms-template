<script lang="ts">
	import AppLogo from '$lib/components/appLogo.svelte';
	import settings from '$lib/site/settings.json';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<header class="bg-white">
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex items-center gap-x-4">
			<AppLogo />
			<span class="text-sm font-semibold leading-6 text-gray-900">{settings.title}</span>
		</div>
		<div class="flex gap-x-8">
			{#each settings.menu as item}
				{@const href = base + item.href}
				<a
					{href}
					class="text-sm font-semibold leading-6 transition-colors"
					class:text-gray-900={$page.url.pathname !== href}
					class:text-blue-600={$page.url.pathname === href}
				>
					{item.label}
				</a>
			{/each}
		</div>
	</nav>
</header>
