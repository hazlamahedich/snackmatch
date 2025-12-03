import { GoogleGenerativeAI } from '@google/generative-ai';
import ollama from 'ollama';
import type { UserProfile } from '$lib/services/profileService';

// --- Configuration ---
// Determine which AI provider to use from environment variable
const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'ollama'; // Can be 'gemini' or 'ollama'

// Gemini Configuration
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (AI_PROVIDER === 'gemini' && !geminiApiKey) {
	throw new Error('VITE_GEMINI_API_KEY is not set in environment variables for Gemini provider.');
}
const genAI = new GoogleGenerativeAI(geminiApiKey);
const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Ollama Configuration
const OLLAMA_HOST = import.meta.env.VITE_OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'deepseek-r1:14b';

// --- Interface ---
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

// --- AI Provider Logic ---

async function generateWithGemini(prompt: string): Promise<any> {
	const result = await geminiModel.generateContent(prompt);
	const response = result.response.text();
	const cleanResponse = response.replace('```json', '').replace('```', '').trim();
	return JSON.parse(cleanResponse);
}

async function generateWithOllama(prompt: string): Promise<any> {
	// We need to instruct Ollama to respond with JSON for structured output
	const jsonPrompt = `${prompt}\n\nIMPORTANT: Respond with ONLY a valid JSON object. Do not include any other text or markdown formatting like \`\`\`json.`;
	
	console.log('🔧 Calling Ollama API with model:', OLLAMA_MODEL);
	console.log('🔧 Ollama host:', OLLAMA_HOST);
	
	try {
		const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: OLLAMA_MODEL,
				prompt: jsonPrompt,
				format: 'json',
				stream: false,
			}),
		});

		console.log('🔧 Ollama response status:', response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('🔧 Ollama error response:', errorText);
			throw new Error(`Ollama request failed: ${response.statusText} - ${errorText}`);
		}

		const data = await response.json();
		console.log('🔧 Raw Ollama data:', data);
		
		// Ollama's /api/generate endpoint returns response directly in the 'response' field
		if (!data.response) {
			console.error('🔧 Ollama returned empty response field');
			throw new Error('Ollama returned an empty response.');
		}

		// The response from Ollama might be a string that needs to be parsed
		const text = typeof data.response === 'string' ? data.response : JSON.stringify(data.response);
		console.log('🔧 Ollama response text to parse:', text);
		
		try {
			const parsed = JSON.parse(text);
			console.log('🔧 Successfully parsed Ollama response:', parsed);
			return parsed;
		} catch (parseError) {
			console.error('🔧 Failed to parse Ollama response:', parseError);
			console.error('🔧 Text that failed to parse:', text);
			throw parseError;
		}
	} catch (error) {
		console.error('🔧 Ollama API call failed:', error);
		throw error;
	}
}

// --- AI Functions for Recommendations ---

async function generateMusicRecommendations(snackName: string, vibe: string, energyScore: number): Promise<MusicRecommendation[]> {
	const prompt = `
		You are a playful AI assistant for a snack recommendation app called SnackMatch.
		Based on snack "${snackName}" and user's vibe "${vibe}" (energy level: ${energyScore}/5),
		recommend 3 perfect songs that would complement this snacking experience.
		
		Provide a JSON array with objects containing: title, artist, genre, mood, and description.
		The mood should match both the snack type and user's vibe.
		Make descriptions fun and personality-filled.
		Respond with only the JSON array, no extra text.
	`;

	try {
		console.log('🎵 Generating music recommendations for:', { snackName, vibe, energyScore });
		let musicRecs: MusicRecommendation[] = [];
		if (AI_PROVIDER === 'ollama') {
		console.log('🎵 Using Ollama for music recommendations...');
		const response = await generateWithOllama(prompt);
		console.log('🎵 Raw Ollama music response:', response);
		console.log('🎵 Response keys:', Object.keys(response || {}));
		// Parse the response properly - it might be nested or in a different format
		musicRecs = Array.isArray(response) ? response :
			(Array.isArray(response?.music_recommendations) ? response.music_recommendations :
			(Array.isArray(response?.music) ? response.music :
			(Array.isArray(response?.recommendations) ? response.recommendations :
			(Array.isArray(response?.songs) ? response.songs : []))));
	} else {
			console.log('🎵 Using Gemini for music recommendations...');
			const response = await generateWithGemini(prompt);
			console.log('🎵 Raw Gemini music response:', response);
			musicRecs = Array.isArray(response) ? response :
				(Array.isArray(response?.music_recommendations) ? response.music_recommendations : []);
		}
		console.log('🎵 Parsed music recommendations:', musicRecs);
        if (!musicRecs || musicRecs.length === 0) {
            throw new Error('Empty music recommendations returned');
        }
		return musicRecs;
	} catch (error) {
		console.error('Error generating music recommendations:', error);
		// Return fallback music recommendations
		return [
			{
				title: "Good Vibrations",
				artist: "The Beach Boys",
				genre: "Pop/Rock",
				mood: "Upbeat",
				description: "A classic feel-good track that pairs perfectly with any snack!"
			},
			{
				title: "Lovely Day",
				artist: "Bill Withers",
				genre: "Soul",
				mood: "Relaxed",
				description: "Smooth and mellow, just like your snacking moment."
			},
			{
				title: "Uptown Funk",
				artist: "Mark Ronson ft. Bruno Mars",
				genre: "Funk/Pop",
				mood: "Energetic",
				description: "Get ready to snack and dance!"
			}
		];
	}
}

async function generateBookRecommendations(snackName: string, vibe: string, energyScore: number): Promise<BookRecommendation[]> {
	const prompt = `
		You are a playful AI assistant for a snack recommendation app called SnackMatch.
		Based on snack "${snackName}" and user's vibe "${vibe}" (energy level: ${energyScore}/5),
		recommend 3 perfect books that would complement this snacking experience.
		
		Provide a JSON array with objects containing: title, author, genre, mood, and description.
		The mood should match both the snack type and user's vibe.
		Make descriptions fun and personality-filled.
		Respond with only the JSON array, no extra text.
	`;

	try {
		console.log('📚 Generating book recommendations for:', { snackName, vibe, energyScore });
		let bookRecs: BookRecommendation[] = [];
		if (AI_PROVIDER === 'ollama') {
			console.log('📚 Using Ollama for book recommendations...');
			const response = await generateWithOllama(prompt);
			console.log('📚 Raw Ollama book response:', response);
			// Parse the response properly - it might be nested or in a different format
			bookRecs = Array.isArray(response) ? response :
				(Array.isArray(response?.book_recommendations) ? response.book_recommendations :
				(Array.isArray(response?.books) ? response.books :
				(Array.isArray(response?.recommendations) ? response.recommendations : [])));
		} else {
			console.log('📚 Using Gemini for book recommendations...');
			const response = await generateWithGemini(prompt);
			console.log('📚 Raw Gemini book response:', response);
			bookRecs = Array.isArray(response) ? response :
				(Array.isArray(response?.book_recommendations) ? response.book_recommendations : []);
		}
		console.log('📚 Parsed book recommendations:', bookRecs);
        if (!bookRecs || bookRecs.length === 0) {
            throw new Error('Empty book recommendations returned');
        }
		return bookRecs;
	} catch (error) {
		console.error('Error generating book recommendations:', error);
		// Return fallback book recommendations
		return [
			{
				title: "The Hitchhiker's Guide to the Galaxy",
				author: "Douglas Adams",
				genre: "Science Fiction Comedy",
				mood: "Playful",
				description: "A hilarious space adventure perfect for mindless snacking!"
			},
			{
				title: "The Little Book of Hygge",
				author: "Meik Wiking",
				genre: "Lifestyle/Self-Help",
				mood: "Cozy",
				description: "Find your perfect snacking comfort zone."
			},
			{
				title: "Ready Player One",
				author: "Ernest Cline",
				genre: "Science Fiction",
				mood: "Adventurous",
				description: "An exciting read that'll make you forget you're even eating!"
			}
		];
	}
}

// --- Main Exported Function ---
export async function generateSnack(vibe: string, profile?: UserProfile): Promise<SnackData> {
	const prompt = `
		You are a playful AI assistant for a snack recommendation app called SnackMatch.
		Based on the user's vibe, provide a creative and fun snack recommendation in a JSON object.
		The JSON object must have the following keys: snack_name, emoji, energy_score (1-5), recipe, drink_pairing, description, and nutrition.
        
        IMPORTANT: The 'recipe' field must be an OBJECT with the following two keys:
        1. 'ingredients': An array of strings (e.g., ["1 cup flour", "2 eggs"]).
        2. 'steps': An array of strings describing the instructions (e.g., ["Mix flour and eggs", "Bake at 350F"]).

		The nutrition object must contain: calories, protein (grams), carbs (grams), fat (grams), and fiber (grams).
		Provide realistic nutritional estimates for a standard serving size.
		The description should be fun and personality-filled.
		User's vibe: "${vibe}"
		Respond with only the JSON object, no extra text.
	`;

	let snackData: SnackData;

	try {
		if (AI_PROVIDER === 'ollama') {
			console.log('Using Ollama provider...');
			snackData = await generateWithOllama(prompt);
		} else {
			console.log('Using Gemini provider...');
			snackData = await generateWithGemini(prompt);
		}
        
        // Validation and Fallback for Nutrition
        if (!snackData.nutrition || typeof snackData.nutrition !== 'object') {
             snackData.nutrition = {
                calories: 200,
                protein: 5,
                carbs: 20,
                fat: 10,
                fiber: 3
            };
        }
	} catch (error) {
		console.error(`Error generating snack with ${AI_PROVIDER}:`, error);
		// Return a fallback snack in case of an error
		snackData = {
			snack_name: 'Classic Popcorn',
			emoji: '🍿',
			energy_score: 2,
			recipe: 'Air-pop some kernels and sprinkle with your favorite seasoning.',
			drink_pairing: 'A classic soda or sparkling water.',
			description: 'A timeless snack that never disappoints.',
			nutrition: {
				calories: 31,
				protein: 1,
				carbs: 6,
				fat: 0.4,
				fiber: 1.2
			}
		};
	}

	// Generate music and book recommendations
	try {
		console.log('🎯 Generating music and book recommendations...');
		const [musicRecs, bookRecs] = await Promise.all([
			generateMusicRecommendations(snackData.snack_name, vibe, snackData.energy_score),
			generateBookRecommendations(snackData.snack_name, vibe, snackData.energy_score)
		]);

		console.log('🎯 Final recommendations before assignment:', { musicRecs, bookRecs });
		snackData.music_recommendations = musicRecs;
		snackData.book_recommendations = bookRecs;
		console.log('🎯 Final snack data with recommendations:', snackData);
	} catch (error) {
		console.error('Error generating recommendations:', error);
		// Continue without recommendations if they fail
        // Ensure fallback data is populated even on error
        if (!snackData.music_recommendations || snackData.music_recommendations.length === 0) {
             snackData.music_recommendations = [
                {
                    title: "Good Vibrations",
                    artist: "The Beach Boys",
                    genre: "Pop/Rock",
                    mood: "Upbeat",
                    description: "A classic feel-good track that pairs perfectly with any snack!"
                }
            ];
        }
        if (!snackData.book_recommendations || snackData.book_recommendations.length === 0) {
            snackData.book_recommendations = [
                {
                    title: "The Hitchhiker's Guide to the Galaxy",
                    author: "Douglas Adams",
                    genre: "Science Fiction Comedy",
                    mood: "Playful",
                    description: "A hilarious space adventure perfect for mindless snacking!"
                }
            ];
        }
	}

	return snackData;
}