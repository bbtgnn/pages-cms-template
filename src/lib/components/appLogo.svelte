<script lang="ts">
	import Settings from '$lib/site/settings.json';
	import { assets, base } from '$app/paths';
</script>

<a href="{base}/">
	<img src="{assets}{Settings.logo}" alt="{Settings.title} logo" class="h-8" />
</a>
