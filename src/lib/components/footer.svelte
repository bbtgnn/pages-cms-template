<script lang="ts">
	import AppLogo from '$lib/components/appLogo.svelte';
	import settings from '$lib/site/settings.json';
</script>

<footer class="bg-base text-base-content/50 border-t-base-content/10 border-t">
	<div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
		<AppLogo />
		<div class="mt-8 md:mt-0">
			<p class="text-sm">
				&copy; {new Date().getFullYear()}
				{settings.title}. All rights reserved.
			</p>
		</div>
	</div>
</footer>
