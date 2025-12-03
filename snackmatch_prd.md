# SnackMatch – Product Requirements Document (PRD)

## 1. Overview
SnackMatch is a playful, AI-powered web application built with Svelte and Trae AI. It recommends the perfect snack based on the user’s current mood, situation, and vibe. The app focuses on simplicity, personality, and fun, with a modern pastel UI and smooth animations.

## 2. Goals
- Provide a fast and enjoyable snack recommendation experience.
- Use Trae AI to generate snack ideas, quick recipes, pairings, and humor.
- Deliver a lightweight, responsive Svelte front‑end experience.
- Allow users to save and view past snack recommendations.

## 3. User Flow
1. User opens the app.
2. User enters their current vibe or situation.
3. User clicks **Find My Snack!**
4. App shows a playful loading screen.
5. AI-generated snack result appears.
6. User can:
   - Generate Again
   - Save
   - Go back
7. Saved snacks appear in the Snack History page.

## 4. Features
### Core Features
- Mood-based input box
- Trae AI integration
- Snack recommendation system
- Quick recipe + drink pairing
- Energy score
- AI-generated fun description
- Save to local history
- View and clear snack history

### Optional Add-ons
- Shareable snack result card
- Favorite snacks
- Dark mode

## 5. Screens

### Home Screen
- Header with app logo and subtitle  
- Cute snack illustrations  
- Input box for mood  
- Primary CTA button  
- Link to Snack History  

### Loading Screen
- Animated bouncing emoji  
- Random snack-themed phrases  

### Snack Result Screen
- Snack name  
- Emoji  
- Energy level  
- Recipe  
- Drink pairing  
- Description  
- Generate Again / Save buttons  
- Back navigation  

### Snack History Screen
- Back button  
- List of past saved snacks  
- Clear History button  

## 6. Technical Requirements

### Frontend
- Svelte or SvelteKit  
- Optional: TailwindCSS  
- Local storage management  
- Svelte transitions (fade, slide, scale)  

### AI Integration
Trae AI returns a JSON object with:
- snack_name  
- emoji  
- energy_score  
- recipe  
- drink_pairing  
- description  

### Performance
- Sub‑1 sec initial load  
- Animations under 300ms  
- SVG illustrations  

## 7. UI/UX Requirements

### Colors
- Background: #FFF9DA  
- Primary: #FF7A5A  
- Accent: #FFB3C1  
- Text Dark: #3E3E3E  
- Text Soft: #6A6A6A  

### Typography
- Poppins ExtraBold (titles)  
- Poppins Bold (buttons)  
- Poppins Regular (text)  

### Animation Rules
- Soft scaling buttons  
- Fade + scale snack card  
- Bouncing loading icon  

## 8. Future Roadmap
- User accounts  
- AI image-generation snack previews  
- Snack customization  
- “Snack Packs” presets  
- Public API  
