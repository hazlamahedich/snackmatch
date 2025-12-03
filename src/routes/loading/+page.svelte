<script lang="ts">
	import { onMount } from 'svelte';
    import GlassCard from '$lib/components/ui/GlassCard.svelte';

	const phrases = [
		'Consulting the Flavor Matrix... 🧐',
		'Calibrating crunch levels... ⚙️',
		'Taste-testing digital cookies... 🍪',
		'Asking the Snack Oracle... 🔮',
        'Mixing ingredients... 🥣'
	];
    
    const emojis = ['🍕', '🌮', '🥨', '🍿', '🍩', '🥗', '🍎', '🍔', '🥑', '🍫'];

	let currentPhrase = $state(phrases[0]);
    let currentEmoji = $state(emojis[0]);

	onMount(() => {
		const phraseInterval = setInterval(() => {
            currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        }, 2000);
        
        const emojiInterval = setInterval(() => {
            currentEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        }, 100); // Fast spin

		return () => {
            clearInterval(phraseInterval);
            clearInterval(emojiInterval);
        };
	});
</script>

<div class="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4 h-[60vh]">
    <GlassCard class="w-full flex flex-col items-center space-y-8 border-4 border-primary/50">
        <div class="text-2xl font-bold text-primary uppercase tracking-widest">
            Snack Matching...
        </div>

        <!-- Slot Machine Window -->
        <div class="relative w-40 h-40 bg-white rounded-2xl border-4 border-black shadow-inner flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-gray-100 opacity-50"></div>
            <div class="text-8xl animate-bounce">
                {currentEmoji}
            </div>
            <!-- Shine effect -->
            <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/40 to-transparent"></div>
        </div>

        <div class="w-full space-y-2">
            <p class="text-xl font-bold text-text-dark animate-pulse min-h-[3rem]">
                {currentPhrase}
            </p>
            <!-- Liquid Progress Bar -->
            <div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden border-2 border-black relative">
                <div class="absolute top-0 left-0 h-full bg-accent w-full origin-left animate-[blob_2s_ease-in-out_infinite]"></div>
                <div class="h-full bg-primary w-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20"></div>
            </div>
        </div>
    </GlassCard>
</div>
