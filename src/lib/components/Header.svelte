<script lang="ts">
	interface Props {
		subtitle?: string;
	}
	let { subtitle = '' }: Props = $props();
</script>

<header class="text-center py-8 relative z-10 pointer-events-none">
	<h1 class="font-extrabold text-5xl md:text-6xl text-primary drop-shadow-[4px_4px_0_rgba(0,0,0,1)] tracking-tight animate-bounce pointer-events-auto inline-block cursor-default hover:scale-105 transition-transform">
		SnackMatch
	</h1>
	{#if subtitle}
		<p class="font-bold text-text-dark mt-2 text-lg bg-white/50 backdrop-blur-sm inline-block px-4 py-1 rounded-full border-2 border-black shadow-card transform -rotate-2">
            {subtitle}
        </p>
	{/if}
</header>
