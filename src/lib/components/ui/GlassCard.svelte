<script lang="ts">
	interface Props {
		children: any;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<div class="clay-card rounded-2xl p-6 text-gray-900 {className}">
	{@render children()}
</div>
