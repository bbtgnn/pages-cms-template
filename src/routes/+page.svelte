<script lang="ts">
	import HeroPage from '$lib/components/heroSection.svelte';
	import Introduction from '$lib/components/introduction.svelte';
	import Features from '$lib/components/features.svelte';
	import { base } from '$app/paths';

	console.log(base);
</script>

<HeroPage />
<pre>{JSON.stringify(base)}</pre>
<Introduction />
<Features />
