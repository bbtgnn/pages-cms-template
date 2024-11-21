<script lang="ts">
	import Settings from '$lib/site/settings.json';
	import { assets, base } from '$app/paths';
</script>

<a href="{base}/" class="flex shrink-0 items-center gap-2 text-theme-text hover:text-theme-accent-background">
	<img src="{assets}{Settings.logo}" alt="{Settings.title} logo" class="h-8" />
	<p class="font-medium">{Settings.title}</p>
</a>
