<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
    import GlassCard from '$lib/components/ui/GlassCard.svelte';
    import VibePill from '$lib/components/ui/VibePill.svelte';
	import Header from '$lib/components/Header.svelte';
	import { generateSnack } from '$lib/services/aiService';
	import { goto } from '$app/navigation';
	import { currentVibe } from '$lib/stores/vibeStore';
    import { themeStore } from '$lib/stores/themeStore';
	import type { UserProfile } from '$lib/services/profileService';

	let vibe = $state('');
	let isLoading = $state(false);
	let userProfile: UserProfile | null = null;

    const suggestedVibes = [
        { label: 'Hungry', emoji: '🤤' },
        { label: 'Sad', emoji: '😢' },
        { label: 'Party', emoji: '🎉' },
        { label: 'Study', emoji: '📚' },
        { label: 'Late Night', emoji: '🌙' },
        { label: 'Healthy', emoji: '🥗' }
    ];

    function updateTheme(newVibe: string) {
        vibe = newVibe;
        currentVibe.set(newVibe);
        themeStore.setTheme(newVibe);
    }

	async function handleFindSnack() {
		if (!vibe.trim()) return;

		isLoading = true;
		await goto('/loading');

		try {
			const snackData = await generateSnack(vibe, userProfile);
			const snackDataString = JSON.stringify(snackData);
            // Update theme based on the result (optional, but good)
            // themeStore.setTheme(snackData.snack_name + " " + vibe); 
			await goto(`/snack/${encodeURIComponent(snackDataString)}`, { replaceState: true });
		} catch (error) {
			console.error('Error in generateSnack:', error);
			isLoading = false;
			await goto('/');
		}
	}
</script>

<Header subtitle="Find your perfect snack based on your vibe!" />

<main class="flex flex-col items-center justify-center p-4 w-full max-w-2xl mx-auto relative z-10">
    
    <!-- Floating Emoji Decoration (Static for now, can animate) -->
    <div class="absolute -top-20 left-0 text-6xl animate-bounce delay-700 opacity-50 hidden md:block">🍕</div>
    <div class="absolute top-40 right-0 text-6xl animate-bounce delay-100 opacity-50 hidden md:block">🥑</div>

    <GlassCard class="w-full text-center space-y-8 transform transition-transform hover:scale-[1.01] duration-500">
        <h2 class="text-3xl font-extrabold text-text-dark tracking-tight">
            What's the vibe right now?
        </h2>

        <!-- Magic Input -->
        <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <input 
                type="text" 
                bind:value={vibe} 
                oninput={(e) => updateTheme(e.currentTarget.value)}
                placeholder="I'm feeling..." 
                class="relative w-full px-6 py-4 bg-white border-2 border-black rounded-xl text-xl font-bold text-text-dark placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/20 shadow-inner transition-all"
                onkeydown={(e) => e.key === 'Enter' && handleFindSnack()}
            />
        </div>

        <!-- Vibe Pills -->
        <div class="flex flex-wrap justify-center gap-3">
            {#each suggestedVibes as v}
                <VibePill 
                    label={v.label} 
                    emoji={v.emoji} 
                    selected={vibe.toLowerCase().includes(v.label.toLowerCase())}
                    onclick={() => updateTheme(v.label)} 
                />
            {/each}
        </div>

        <div class="pt-4">
            <Button onclick={handleFindSnack} variant="primary" class="w-full text-xl py-4 animate-pulse hover:animate-none" disabled={!vibe}>
                HIT ME! 🎲
            </Button>
        </div>
    </GlassCard>

    <nav class="mt-8 flex gap-6">
		<a href="/history" class="text-text-dark font-bold hover:text-primary transition-colors bg-white/50 px-4 py-2 rounded-full border-2 border-transparent hover:border-black hover:shadow-pop">
            📂 The Pantry
        </a>
		<a href="/profile" class="text-text-dark font-bold hover:text-primary transition-colors bg-white/50 px-4 py-2 rounded-full border-2 border-transparent hover:border-black hover:shadow-pop">
            👤 Profile
        </a>
	</nav>
</main>
