import { writable } from 'svelte/store';

function createVibeStore() {
	const { subscribe, set, update } = writable('');

	return {
		subscribe,
		set,
		update
	};
}

export const currentVibe = createVibeStore();