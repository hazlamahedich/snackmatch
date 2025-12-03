import { writable } from 'svelte/store';

export type ThemeName = 'default' | 'spicy' | 'sweet' | 'healthy' | 'latenight';

export interface Theme {
	name: ThemeName;
	colors: {
		background: string; // Hex for backup, but we will mainly use the rgb channels
		primary: string;
		accent: string;
		text: string;
		surface: string;
	};
	// For Tailwind variable usage (RGB channels: "r g b")
	channels: {
		background: string;
		primary: string;
		accent: string;
		text: string;
		surface: string;
	};
}

const themes: Record<ThemeName, Theme> = {
	default: {
		name: 'default',
		colors: { background: '#FFF9DA', primary: '#FF7A5A', accent: '#FFD600', text: '#3E3E3E', surface: '#FFFFFF' },
		channels: { background: '255 249 218', primary: '255 122 90', accent: '255 214 0', text: '62 62 62', surface: '255 255 255' }
	},
	spicy: {
		name: 'spicy',
		colors: { background: '#FFE5E5', primary: '#FF4D4D', accent: '#FF9F43', text: '#4A0000', surface: '#FFF0F0' },
		channels: { background: '255 229 229', primary: '255 77 77', accent: '255 159 67', text: '74 0 0', surface: '255 240 240' }
	},
	sweet: {
		name: 'sweet',
		colors: { background: '#F3E5F5', primary: '#FF80AB', accent: '#81D4FA', text: '#4A148C', surface: '#FFFFFF' },
		channels: { background: '243 229 245', primary: '255 128 171', accent: '129 212 250', text: '74 20 140', surface: '255 255 255' }
	},
	healthy: {
		name: 'healthy',
		colors: { background: '#E8F5E9', primary: '#4CAF50', accent: '#CDDC39', text: '#1B5E20', surface: '#FFFFFF' },
		channels: { background: '232 245 233', primary: '76 175 80', accent: '205 220 57', text: '27 94 32', surface: '255 255 255' }
	},
	latenight: {
		name: 'latenight',
		colors: { background: '#1A237E', primary: '#D500F9', accent: '#FFFF00', text: '#FFFFFF', surface: '#283593' },
		channels: { background: '26 35 126', primary: '213 0 249', accent: '255 255 0', text: '255 255 255', surface: '40 53 147' }
	}
};

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>(themes.default);

	return {
		subscribe,
		setTheme: (vibe: string) => {
			const v = vibe.toLowerCase();
			let theme: ThemeName = 'default';

			if (v.includes('spicy') || v.includes('hot') || v.includes('angry') || v.includes('party')) {
				theme = 'spicy';
			} else if (v.includes('sweet') || v.includes('happy') || v.includes('love') || v.includes('cute') || v.includes('dessert')) {
				theme = 'sweet';
			} else if (v.includes('healthy') || v.includes('fresh') || v.includes('green') || v.includes('gym') || v.includes('fit')) {
				theme = 'healthy';
			} else if (v.includes('night') || v.includes('dark') || v.includes('movie') || v.includes('tired') || v.includes('salty')) {
				theme = 'latenight';
			}
            
            // Only update if different to avoid unnecessary repaints/recalc
            update(current => {
                if (current.name !== theme) {
                    applyTheme(themes[theme]);
                    return themes[theme];
                }
                return current;
            });
		},
        reset: () => {
            applyTheme(themes.default);
            set(themes.default);
        }
	};
}

// Helper to update CSS variables on the document body
function applyTheme(theme: Theme) {
	if (typeof document !== 'undefined') {
		const root = document.documentElement;
		root.style.setProperty('--color-bg', theme.channels.background);
		root.style.setProperty('--color-primary', theme.channels.primary);
		root.style.setProperty('--color-accent', theme.channels.accent);
		root.style.setProperty('--color-text', theme.channels.text);
		root.style.setProperty('--color-surface', theme.channels.surface);
	}
}

export const themeStore = createThemeStore();
