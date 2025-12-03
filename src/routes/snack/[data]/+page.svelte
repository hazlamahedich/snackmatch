<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
    import GlassCard from '$lib/components/ui/GlassCard.svelte';
    import NutritionLabel from '$lib/components/ui/NutritionLabel.svelte';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { saveSnack } from '$lib/services/storageService';
	import { fly, scale } from 'svelte/transition';
    import { onMount } from 'svelte';
    import confetti from 'canvas-confetti';

	let snackData: any = $state(null);
	let saveMessage = $state('Save to Pantry');
    let isSaved = $state(false);

    onMount(() => {
        try {
			const dataParam = $page.params.data;
			if (dataParam) {
				snackData = JSON.parse(decodeURIComponent(dataParam));
                // Trigger confetti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#FF7A5A', '#FFD600', '#FFF9DA']
                });
			}
		} catch (e) {
			console.error('Failed to process snack data:', e);
			goto('/');
		}
    });

	function handleGenerateAgain() {
		goto('/');
	}

	function handleSave() {
		if (snackData && !isSaved) {
			saveSnack(snackData);
			saveMessage = 'Saved!';
            isSaved = true;
            
            // Small heart burst
            confetti({
                particleCount: 30,
                spread: 40,
                origin: { y: 0.8 },
                shapes: ['star'],
                colors: ['#FFD600']
            });
		}
	}
</script>

<Header subtitle="Here's your perfect snack!" />

<main class="flex flex-col items-center justify-center p-4 pb-20 w-full max-w-4xl mx-auto">
    {#if snackData}
        <div in:scale={{ duration: 500, start: 0.8, opacity: 0 }} class="w-full">
            <GlassCard class="w-full text-center relative overflow-visible border-4 border-black bg-white">
                
                <!-- Giant Emoji -->
                <div class="text-[8rem] md:text-[10rem] leading-none -mt-20 filter drop-shadow-lg animate-bounce">
                    {snackData.emoji || '🍿'}
                </div>

                <div class="space-y-2 mb-8">
                    <h2 class="text-4xl md:text-6xl font-extrabold text-text-dark tracking-tighter leading-tight">
                        {snackData.snack_name}
                    </h2>
                    <p class="text-xl md:text-2xl font-bold text-primary italic">
                        "{snackData.description}"
                    </p>
                </div>

                <!-- Energy Meter -->
                <div class="flex flex-col items-center gap-2 mb-8">
                    <span class="font-bold uppercase tracking-widest text-xs text-text-soft">Energy Level</span>
                    <div class="flex gap-2 bg-gray-100 p-2 rounded-full border-2 border-black items-center justify-center">
                        {#each Array(5) as _, i}
                            <div 
                                class="w-8 h-4 rounded-full transition-colors duration-500 border border-gray-300"
                                style="background-color: {i < (snackData.energy_score || 0) ? '#FFD600' : '#E5E7EB'}; box-shadow: {i < (snackData.energy_score || 0) ? '0 0 10px rgba(255,214,0,0.6)' : 'none'};"
                            ></div>
                        {/each}
                         <span class="font-bold ml-2 text-lg">{snackData.energy_score}/5</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8 text-gray-900">
                    <!-- Recipe Pill -->
                    <div class="bg-blue-50 p-6 rounded-2xl border-2 border-black shadow-card relative group hover:-translate-y-1 transition-transform">
                        <div class="absolute -top-3 -left-3 bg-blue-200 border-2 border-black rounded-full p-2 shadow-sm text-2xl">🥣</div>
                        <h3 class="font-extrabold text-lg mb-2 mt-2 text-gray-900">Quick Fix</h3>
                        <div class="text-sm text-gray-900">
                             {#if typeof snackData.recipe === 'string'}
                                {snackData.recipe}
                            {:else if snackData.recipe?.ingredients || snackData.recipe?.steps}
                                <!-- Standardized Format -->
                                {#if snackData.recipe.ingredients && snackData.recipe.ingredients.length > 0}
                                    <h4 class="font-bold mb-1">Ingredients</h4>
                                    <ul class="list-disc list-inside mb-2">
                                        {#each snackData.recipe.ingredients as item}
                                            {#if typeof item === 'object'}
                                                <li>{item.ingredient} ({item.quantity})</li>
                                            {:else}
                                                <li>{item}</li>
                                            {/if}
                                        {/each}
                                    </ul>
                                {/if}
                                {#if snackData.recipe.steps && snackData.recipe.steps.length > 0}
                                    <h4 class="font-bold mb-1">Instructions</h4>
                                    <ol class="list-decimal list-inside">
                                        {#each snackData.recipe.steps as step}
                                            <li>{step}</li>
                                        {/each}
                                    </ol>
                                {:else if snackData.recipe.instructions}
                                     <!-- Legacy Fallback -->
                                    <h4 class="font-bold mb-1">Instructions</h4>
                                    <ol class="list-decimal list-inside">
                                        {#each snackData.recipe.instructions as step}
                                            <li>{step}</li>
                                        {/each}
                                    </ol>
                                {/if}
                            {:else if Array.isArray(snackData.recipe)}
                                <ul class="list-disc list-inside">
                                    {#each snackData.recipe as item}
                                        <li>{item.ingredient} ({item.quantity})</li>
                                    {/each}
                                </ul>
                            {/if}
                        </div>
                    </div>

                    <!-- Drink Pill -->
                     <div class="bg-green-50 p-6 rounded-2xl border-2 border-black shadow-card relative group hover:-translate-y-1 transition-transform">
                        <div class="absolute -top-3 -left-3 bg-green-200 border-2 border-black rounded-full p-2 shadow-sm text-2xl">🥤</div>
                        <h3 class="font-extrabold text-lg mb-2 mt-2 text-gray-900">Best Sip</h3>
                        <p class="text-sm text-gray-900">{snackData.drink_pairing}</p>
                    </div>
                </div>

                <!-- Nutrition Label -->
                 {#if snackData.nutrition}
                    <div class="mb-8">
                        <NutritionLabel nutrition={snackData.nutrition} />
                    </div>
                 {/if}

                <!-- Extra Recommendations (Music/Books) -->
                <div class="space-y-4 mb-8">
                    {#if snackData.music_recommendations?.length > 0}
                        <div class="bg-purple-50 p-6 rounded-xl border-2 border-black text-left shadow-card relative">
                             <div class="absolute -top-3 -left-3 bg-purple-200 border-2 border-black rounded-full p-2 shadow-sm text-2xl">🎵</div>
                            <h4 class="font-extrabold text-lg text-purple-900 mb-4 mt-2">Vibe Setters</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {#each snackData.music_recommendations as music}
                                    <div class="bg-white p-3 rounded-lg border border-black/20 shadow-sm hover:shadow-md transition-shadow">
                                        <p class="font-bold text-sm text-primary">{music.title}</p>
                                        <p class="text-xs font-medium text-gray-600">{music.artist}</p>
                                        <p class="text-xs text-gray-500 italic mt-1">"{music.description}"</p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    {#if snackData.book_recommendations?.length > 0}
                        <div class="bg-yellow-50 p-6 rounded-xl border-2 border-black text-left shadow-card relative">
                             <div class="absolute -top-3 -left-3 bg-yellow-200 border-2 border-black rounded-full p-2 shadow-sm text-2xl">📚</div>
                            <h4 class="font-extrabold text-lg text-yellow-900 mb-4 mt-2">Brain Snacks</h4>
                             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {#each snackData.book_recommendations as book}
                                    <div class="bg-white p-3 rounded-lg border border-black/20 shadow-sm hover:shadow-md transition-shadow">
                                        <p class="font-bold text-sm text-primary">{book.title}</p>
                                        <p class="text-xs font-medium text-gray-600">{book.author}</p>
                                         <p class="text-xs text-gray-500 italic mt-1">"{book.description}"</p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>

                <div class="grid grid-cols-2 gap-4 mt-8">
                    <Button onclick={handleGenerateAgain} variant="secondary" class="w-full">
                        🔄 Again
                    </Button>
                    <Button onclick={handleSave} variant="primary" class="w-full" disabled={isSaved}>
                        {saveMessage}
                    </Button>
                </div>

            </GlassCard>
        </div>
    {/if}
</main>
