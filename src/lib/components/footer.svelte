<script lang="ts">
	import AppLogo from '$lib/components/appLogo.svelte';
	import settings from '$lib/site/settings.json';
</script>

<footer class="bg-gray-50">
	<div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
		<div class="flex flex-col items-start gap-4">
			<div class="flex items-center gap-x-4">
				<AppLogo />
				<p class="text-sm font-semibold leading-6 text-gray-900">{settings.title}</p>
			</div>
		</div>
		<div class="mt-8 md:mt-0">
			<p class="text-sm text-gray-500">
				&copy; {new Date().getFullYear()}
				{settings.title}. All rights reserved.
			</p>
		</div>
	</div>
</footer>
