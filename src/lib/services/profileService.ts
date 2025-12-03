// Define the structure for a user profile
export interface UserProfile {
	dietary?: string[];
	allergies?: string[];
	favoriteTypes?: string[];
}

const PROFILE_KEY = 'snackmatch_user_profile';

// Load user profile from localStorage
export function loadProfile(): UserProfile | null {
	try {
		const profileData = localStorage.getItem(PROFILE_KEY);
		if (profileData) {
			return JSON.parse(profileData);
		}
		return null;
	} catch (error) {
		console.error('Failed to load user profile:', error);
		return null;
	}
}

// Save user profile to localStorage
export function saveProfile(profile: UserProfile): void {
	try {
		localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
	} catch (error) {
		console.error('Failed to save user profile:', error);
	}
}

// Clear user profile from localStorage
export function clearProfile(): void {
	try {
		localStorage.removeItem(PROFILE_KEY);
	} catch (error) {
		console.error('Failed to clear user profile:', error);
	}
}