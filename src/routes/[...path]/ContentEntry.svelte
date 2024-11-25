<script lang="ts">
	import { marked } from 'marked';
	import { assets, base } from '$app/paths';
	import Prose from '$lib/components/Prose.svelte';
	import type { ContentEntry } from './+page';
	import settings from '$lib/site/settings.json';
	import { PageState } from '$root/src/lib/utils.svelte';

	let { entry }: { entry: ContentEntry } = $props();

	const htmlContent = entry.content ? marked(entry.content, { async: false }) : '';

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

	const pageState = new PageState();
	const parentSection = $derived(
		settings.menu.find(
			(item) =>
				item.href !== '/' &&
				pageState.rawPathname.includes(item.href) &&
				pageState.rawPathname !== item.href
		)
	);
</script>

<article>
	{#if entry.cover}
		<div class="relative isolate max-h-[600px] overflow-hidden">
			<div class="aspect-[2/1]">
				<img
					src="{assets}{entry.cover}"
					alt=""
					class="absolute inset-0 h-full w-full object-cover"
				/>
				<div
					class="absolute inset-0 bg-gradient-to-t from-base-content/75 via-base-content/50"
				></div>
			</div>
			<div class="absolute inset-0 flex items-center justify-center px-6 sm:px-12">
				{#if entry.title}
					<h1 class="max-w-3xl text-center text-4xl text-base font-bold tracking-tight sm:text-6xl">
						{entry.title}
					</h1>
				{/if}
			</div>
		</div>
		<div class="p-8">
			<div class="prose prose-lg mx-auto">
				{@render backlink()}
			</div>
		</div>
	{:else if entry.title}
		<div class="p-8">
			<div class="prose prose-lg mx-auto">
				{@render backlink()}
			</div>
		</div>

		<h1
			class="px-6 pb-16 pt-8 text-center text-4xl font-bold tracking-tight text-base-content sm:text-6xl lg:px-8"
		>
			{entry.title}
		</h1>
	{/if}

	<div class="mx-auto max-w-3xl px-6 pb-16 lg:px-8">
		<div class="mb-8 space-y-8">
			{#if parentSection}
				<hr class="border-base-content/10" />
			{/if}

			{#if entry.metadata && Object.entries(entry.metadata).length > 0}
				<dl class="mb-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
					{#each Object.entries(entry.metadata) as [key, value]}
						<dt class="font-medium uppercase tracking-wide text-base-content/60">{key}</dt>
						<dd class="text-base-content">{formatMetadataValue(value)}</dd>
					{/each}
				</dl>
				<hr class="border-base-content/10" />
			{/if}
		</div>

		{#if entry.content}
			<Prose content={htmlContent} />
		{/if}
	</div>
</article>

{#snippet backlink()}
	{#if parentSection}
		<a
			href={base + parentSection.href}
			class="inline-flex items-center rounded-md border bg-base-content/5 px-4 py-2 text-base-content transition-colors hover:bg-base-content/10"
		>
			<svg
				class="mr-2 h-4 w-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				></path>
			</svg>
			{parentSection.label}
		</a>
	{/if}
{/snippet}
