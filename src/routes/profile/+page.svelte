<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { saveProfile, loadProfile, clearProfile, type UserProfile } from '$lib/services/profileService.ts';

	let profile: UserProfile = {
		dietary: [],
		allergies: '',
		favoriteTypes: []
	};
	let isLoading = false;

	// Load profile on component mount
	onMount(() => {
		console.log('Profile page mounting, loading profile...');
		const loadedProfile = loadProfile();
		console.log('Loaded profile:', loadedProfile);
		if (loadedProfile) {
			profile = loadedProfile;
		}
	});

	function handleSave() {
		if (profile) {
			isLoading = true;
			saveProfile(profile);
			setTimeout(() => {
				isLoading = false;
				goto('/'); // Go back to home page after saving
			}, 1000); // Simulate a brief loading state
		}
	}

	function handleClear() {
		console.log('Clearing profile...');
		isLoading = true;
		clearProfile();
		console.log('Profile cleared, resetting to empty profile:', profile);
		profile = {
			dietary: [],
			allergies: '',
			favoriteTypes: []
		}; // Reset to empty profile
		setTimeout(() => {
			isLoading = false;
		}, 500);
	}
</script>

<Header subtitle="Customize Your SnackMatch Experience" />

<main class="flex flex-col items-center justify-center p-8 space-y-6">
	<div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
		<h2 class="font-poppins-extrabold text-2xl text-primary mb-6">User Profile</h2>

		{#if isLoading}
			<div class="text-center">
				<p>Saving...</p>
			</div>
		{:else}
			<form on:submit|preventDefault={handleSave} class="space-y-6">
				<div>
					<label for="dietary" class="block text-text-dark font-poppins-bold mb-2">Dietary Preferences</label>
					<div class="space-y-2">
						{#each ['vegan', 'gluten-free', 'dairy-free', 'nut-free'] as preference}
							<label class="flex items-center space-x-2">
								<input
									type="checkbox"
									bind:group={profile.dietary}
									value={preference}
									class="h-4 w-4 text-accent border-accent rounded focus:ring-2 focus:ring-primary"
								/>
								<span class="font-poppins-regular text-text-dark">{preference}</span>
							</label>
						{/each}
					</div>
				</div>

				<div>
					<label for="allergies" class="block text-text-dark font-poppins-bold mb-2">Allergies</label>
					<input
						type="text"
						bind:value={profile.allergies}
						placeholder="e.g., nuts, soy, dairy"
						class="w-full p-3 border-2 border-accent rounded-lg font-poppins-regular text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>

				<div>
					<label for="favoriteTypes" class="block text-text-dark font-poppins-bold mb-2">Favorite Snack Types</label>
					<select
						bind:value={profile.favoriteTypes}
						multiple
						class="w-full p-3 border-2 border-accent rounded-lg font-poppins-regular text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="salty">Salty</option>
						<option value="sweet">Sweet</option>
						<option value="healthy">Healthy</option>
						<option value="spicy">Spicy</option>
						<option value="savory">Savory</option>
					</select>
				</div>

				<div class="flex space-x-4">
					<Button onClick={handleSave} type="primary" disabled={isLoading}>
						{isLoading ? 'Saving...' : 'Save Preferences'}
					</Button>
					<Button onClick={handleClear} type="secondary" disabled={isLoading}>
						Clear Profile
					</Button>
				</div>
			</form>
		{/if}
	</div>

	<nav class="text-center mt-6">
		<a href="/" class="text-accent font-poppins-regular hover:underline">← Back to Home</a>
	</nav>
</main>
