<script lang="ts">
	interface Props {
		children: any;
		onclick?: () => void;
		variant?: 'primary' | 'secondary' | 'icon';
		class?: string;
        disabled?: boolean;
        type?: "button" | "submit" | "reset";
	}

	let { children, onclick, variant = 'primary', class: className = '', disabled = false, type = "button" }: Props = $props();

	const baseClasses = "relative font-bold rounded-xl transition-all duration-150 ease-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black";
    
    const variants = {
        primary: "bg-primary text-black shadow-pop hover:shadow-pop-hover active:shadow-pop-active",
        secondary: "bg-surface text-text-dark shadow-pop hover:shadow-pop-hover active:shadow-pop-active",
        icon: "p-2 bg-white shadow-pop hover:shadow-pop-hover active:shadow-pop-active rounded-full aspect-square flex items-center justify-center"
    };
</script>

<button
	{type}
	class="{baseClasses} {variants[variant]} {className}"
	{onclick}
    {disabled}
>
	{#if variant === 'primary' || variant === 'secondary'}
        <span class="px-6 py-3 block">
            {@render children()}
        </span>
    {:else}
        {@render children()}
    {/if}
</button>
