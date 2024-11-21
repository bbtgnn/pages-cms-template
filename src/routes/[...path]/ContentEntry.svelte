<script lang="ts">
	import { assets } from '$app/paths';
	import type { ContentEntry } from './+page';
	import settings from '$lib/site/settings.json';
	import { page } from '$app/stores';
	import { Store } from 'runed';

	let { entry }: { entry: ContentEntry } = $props();

	function formatMetadataValue(value: unknown): string {
		if (Array.isArray(value)) {
			return value
				.map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
				.join(', ');
		}

		if (typeof value === 'object' && value !== null) {
			return JSON.stringify(value);
		}

		return String(value);
	}

	const pageState = new Store(page);
	const currentPath = $derived(pageState.current.url.pathname);
	const parentSection = $derived(
		settings.menu.find((item) => item.href !== '/' && currentPath.startsWith(item.href))
	);
</script>

<article class="pb-10">
	{#if entry.cover}
		<div class="relative isolate -mx-6 mb-8 max-h-[600px] overflow-hidden sm:-mx-12 lg:-mx-16">
			<div class="aspect-[2/1]">
				<img
					src="{assets}{entry.cover}"
					alt=""
					class="absolute inset-0 h-full w-full object-cover"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-gray-900/75 via-gray-900/50"></div>
			</div>
			<div class="absolute inset-0 flex items-center justify-center px-6 sm:px-12">
				{#if entry.title}
					<h1
						class="max-w-3xl text-center text-4xl font-bold tracking-tight text-white sm:text-6xl"
					>
						{entry.title}
					</h1>
				{/if}
			</div>
		</div>
	{:else if entry.title}
		<h1 class="mb-16 pt-12 text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
			{entry.title}
		</h1>
	{/if}

	{#if parentSection}
		<div class="mx-auto mb-8 max-w-3xl px-6 lg:px-8">
			<a
				href={parentSection.href}
				class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
			>
				<svg class="-ml-1 mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
						clip-rule="evenodd"
					/>
				</svg>
				Back to {parentSection.label}
			</a>
		</div>
	{/if}

	<div class="mx-auto max-w-3xl px-6 lg:px-8">
		{#if parentSection}
			<hr class="mb-12 border-gray-200" />
		{/if}

		{#if entry.metadata && Object.entries(entry.metadata).length > 0}
			<dl class="mb-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
				{#each Object.entries(entry.metadata) as [key, value]}
					<dt class="font-medium uppercase tracking-wide text-gray-400">{key}</dt>
					<dd class="text-gray-900">{formatMetadataValue(value)}</dd>
				{/each}
			</dl>
			<hr class="mb-12 border-gray-200" />
		{/if}

		{#if entry.content}
			<div class="prose prose-lg prose-gray mx-auto prose-headings:font-bold prose-a:text-blue-600">
				{@html entry.content}
			</div>
		{/if}
	</div>
</article>
