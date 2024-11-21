<script lang="ts">
	import AppLogo from '$lib/components/appLogo.svelte';
	import settings from '$lib/site/settings.json';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<header class="bg-base text-base-content border-b-base-content/10 border-b">
	<nav
		class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 p-6 lg:px-8"
		aria-label="Global"
	>
		<AppLogo />

		<div class="flex gap-x-4">
			{#each settings.menu as item}
				{@const href = base + item.href}
				{@const isActive =
					item.href === '/' ? $page.url.pathname === href : $page.url.pathname.startsWith(href)}
				<a
					{href}
					class="ring-accent/40 rounded-md px-3 py-2 font-semibold transition-colors hover:ring {isActive
						? 'bg-base-content/10'
						: ''}"
				>
					{item.label}
				</a>
			{/each}
		</div>
	</nav>
</header>
