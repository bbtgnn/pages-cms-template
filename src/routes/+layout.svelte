<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import x from '$lib/site/settings.json';
	import AppLogo from '$lib/components/appLogo.svelte';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<div class="flex items-center gap-2">
		<AppLogo></AppLogo>
		{x.title}
	</div>
	{@render children()}
</ParaglideJS>
