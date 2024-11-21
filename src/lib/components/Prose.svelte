<script lang="ts">
	import { isBaseColorDark } from '$lib/theme/utils';

	let { content, class: className } = $props<{ content: string; class?: string }>();
	const isDark = isBaseColorDark();
</script>

<div class="prose prose-lg {isDark ? 'prose-invert' : ''} mx-auto {className}">
	{@html content}
</div>
