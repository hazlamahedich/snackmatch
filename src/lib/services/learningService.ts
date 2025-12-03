// Define a simple preference model for learning
interface UserPreferenceModel {
	sweet: number;
	salty: number;
	healthy: number;
	spicy: number;
	savory: number;
	vegan: number;
	glutenFree: number;
	dairyFree: number;
	nutFree: number;
}

const MODEL_KEY = 'snackmatch_preference_model';

// Default model values
const DEFAULT_MODEL: UserPreferenceModel = {
	sweet: 0,
	salty: 0,
	healthy: 0,
	spicy: 0,
	savory: 0,
	vegan: 0,
	glutenFree: 0,
	dairyFree: 0,
	nutFree: 0
};

// Load the preference model from localStorage
export function loadModel(): UserPreferenceModel {
	try {
		const modelData = localStorage.getItem(MODEL_KEY);
		if (modelData) {
			return JSON.parse(modelData);
		}
		return DEFAULT_MODEL;
	} catch (error) {
		console.error('Failed to load preference model:', error);
		return DEFAULT_MODEL;
	}
}

// Save the preference model to localStorage
export function saveModel(model: UserPreferenceModel): void {
	try {
		localStorage.setItem(MODEL_KEY, JSON.stringify(model));
	} catch (error) {
		console.error('Failed to save preference model:', error);
	}
}

// Update the model based on a snack interaction
export function updateModel(snackData: any, action: 'save' | 'reject'): void {
	const model = loadModel();
	if (!model) return;

	// Define traits with proper typing
	const traits: Record<string, string[]> = {
		sweet: ['sweet', 'candy', 'chocolate', 'sugar', 'dessert', 'honey'],
		salty: ['salty', 'chips', 'pretzels', 'popcorn', 'fries', 'bacon'],
		healthy: ['fruit', 'vegetable', 'salad', 'smoothie', 'yogurt', 'nuts', 'seeds'],
		spicy: ['spicy', 'hot', 'pepper', 'chili', 'wasabi', 'jalapeno'],
		savory: ['cheese', 'pizza', 'burger', 'sandwich', 'soup', 'meat'],
		vegan: ['vegan', 'plant-based', 'tofu', 'vegetable', 'fruit'],
		glutenFree: ['gluten-free', 'celiac', 'wheat-free', 'bread-free'],
		dairyFree: ['dairy-free', 'lactose-free', 'milk-free', 'cheese-free', 'vegan'],
		nutFree: ['nut-free', 'peanut-free', 'almond-free', 'tree-nut-free']
	};

	// Check snack name and description for traits
	const checkTraits = (text: string, keywords: string[]): boolean => {
		return keywords.some(keyword => text.toLowerCase().includes(keyword));
	};

	// Update model weights
	for (const trait in traits) {
		const weight = action === 'save' ? 0.1 : -0.05; // Small increments/decrements
		if (checkTraits(snackData.snack_name, traits[trait])) {
			model[trait] += weight;
		}
	}

	// Ensure weights don't go below -1 or above 1
	for (const trait in model) {
		if (model[trait] < -1) model[trait] = -1;
		if (model[trait] > 1) model[trait] = 1;
	}

	saveModel(model);
}