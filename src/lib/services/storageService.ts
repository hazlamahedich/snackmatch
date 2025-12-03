interface NutritionInfo {
	calories: number;
	protein: number;  // in grams
	carbs: number;    // in grams
	fat: number;      // in grams
	fiber: number;     // in grams
}

interface MusicRecommendation {
	title: string;
	artist: string;
	genre: string;
	mood: string;
	description: string;
}

interface BookRecommendation {
	title: string;
	author: string;
	genre: string;
	mood: string;
	description: string;
}

interface SnackData {
	snack_name: string;
	emoji: string;
	energy_score: number;
	recipe: string;
	drink_pairing: string;
	description: string;
	nutrition?: NutritionInfo;
	music_recommendations?: MusicRecommendation[];
	book_recommendations?: BookRecommendation[];
}

const STORAGE_KEY = 'snackmatch_history';

export function getSnackHistory(): SnackData[] {
	if (typeof window === 'undefined') {
		return [];
	}
	try {
		const history = localStorage.getItem(STORAGE_KEY);
		return history ? JSON.parse(history) : [];
	} catch (error) {
		console.error('Error reading from localStorage:', error);
		return [];
	}
}

export function saveSnack(snack: SnackData): void {
	if (typeof window === 'undefined') {
		return;
	}
	try {
			const history = getSnackHistory();
			history.push(snack);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
	} catch (error) {
		console.error('Error saving to localStorage:', error);
	}
}

export function clearSnackHistory(): void {
	if (typeof window === 'undefined') {
		return;
	}
	try {
			localStorage.removeItem(STORAGE_KEY);
	} catch (error) {
		console.error('Error clearing localStorage:', error);
	}
}