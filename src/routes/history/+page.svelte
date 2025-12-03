<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
    import GlassCard from '$lib/components/ui/GlassCard.svelte';
	import Header from '$lib/components/Header.svelte';
	import { getSnackHistory, clearSnackHistory } from '$lib/services/storageService';
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

	let savedSnacks: any[] = $state([]);
	let showClearConfirm = $state(false);

	onMount(() => {
		savedSnacks = getSnackHistory();
	});

	function handleClearHistory() {
		if (savedSnacks.length === 0) return;
		showClearConfirm = true;
	}

	function confirmClearHistory() {
		clearSnackHistory();
		savedSnacks = [];
		showClearConfirm = false;
	}

	function cancelClearHistory() {
		showClearConfirm = false;
	}

	function handleBack() {
		goto('/');
	}
    
    // Helper to simulate rotation for polaroid look
    function getRandomRotation(index: number) {
        // Pseudo-random deterministic based on index
        const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
        return rotations[index % rotations.length];
    }
</script>

<Header subtitle="Your Pantry 🥫" />

<main class="flex flex-col items-center justify-center p-4 pb-20 w-full max-w-6xl mx-auto">
    <div class="w-full">
        <div class="flex justify-between items-center mb-8">
            <div class="flex gap-2">
                <Button onclick={handleBack} variant="secondary" class="px-4 py-2 text-sm">
                     ⬅ Back
                </Button>
            </div>
            {#if savedSnacks.length > 0}
                <Button onclick={handleClearHistory} variant="secondary" class="bg-red-100 text-red-600 border-red-900 px-4 py-2 text-sm">
                    Trash All 🗑️
                </Button>
            {/if}
        </div>

        {#if savedSnacks.length === 0}
            <div class="text-center py-20 opacity-50">
                <div class="text-9xl mb-4 grayscale">🧊</div>
                <p class="text-2xl font-bold text-text-dark">Your pantry is empty!</p>
                <p class="text-lg text-text-soft mt-2">Go find some snacks to fill it up.</p>
            </div>
        {:else}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each savedSnacks as snack, i}
                    <div 
                        in:fly={{ y: 50, duration: 500, delay: i * 100 }}
                        class="group bg-white text-gray-900 p-4 pb-8 rounded-sm shadow-lg border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10 {getRandomRotation(i)}"
                    >
                        <!-- Tape Effect -->
                        <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-100/80 backdrop-blur-sm transform -rotate-1 border border-white/50 shadow-sm"></div>

                        <!-- Image Area (Emoji) -->
                        <div class="bg-gray-100 aspect-square flex items-center justify-center mb-4 shadow-inner border border-gray-200">
                            <div class="text-8xl filter drop-shadow-md">{snack.emoji}</div>
                        </div>

                        <!-- Content -->
                        <div class="text-center">
                            <h3 class="font-bold text-xl text-text-dark mb-1 font-handwriting">{snack.snack_name}</h3>
                            <p class="text-sm text-text-soft italic line-clamp-2">{snack.description}</p>
                            
                            <div class="mt-4 flex justify-center gap-1">
                                {#each Array(snack.energy_score || 0) as _}
                                    <span class="text-xs">⚡</span>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    {#if showClearConfirm}
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <GlassCard class="max-w-sm w-full bg-white border-2 border-red-500">
                <h3 class="font-extrabold text-2xl text-red-600 mb-4">Burn the Pantry? 🔥</h3>
                <p class="text-text-dark font-medium mb-8">This will delete all your saved snacks forever. Are you sure?</p>
                <div class="flex gap-4">
                    <Button onclick={cancelClearHistory} variant="secondary" class="flex-1">
                        Nope
                    </Button>
                    <Button onclick={confirmClearHistory} variant="primary" class="bg-red-500 border-red-700 flex-1">
                        Burn It
                    </Button>
                </div>
            </GlassCard>
        </div>
    {/if}
</main>
