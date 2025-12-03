<script lang="ts">
	interface Props {
		label: string;
        emoji?: string;
		selected?: boolean;
		onclick?: () => void;
	}

	let { label, emoji, selected = false, onclick }: Props = $props();
</script>

<button
	class="
        px-4 py-2 rounded-full border-2 border-black font-bold text-sm transition-all duration-200
        {selected ? 'bg-accent text-black shadow-pop-active translate-x-1 translate-y-1' : 'bg-surface text-text-dark shadow-pop hover:shadow-pop-hover active:shadow-pop-active active:translate-x-1 active:translate-y-1'}
    "
	{onclick}
>
    {#if emoji}
        <span class="mr-1">{emoji}</span>
    {/if}
	{label}
</button>
