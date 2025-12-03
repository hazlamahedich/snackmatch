# SnackMatch

SnackMatch is a smart snack recommendation system that helps users find the perfect snack based on their mood, nutritional needs, and preferences. Built with Svelte and Tailwind CSS, SnackMatch uses AI-powered recommendations to suggest snacks that match your current vibe.

## Features

- **Mood-based snack recommendations** - Get snack suggestions based on your current mood
- **Nutritional analysis** - View detailed nutritional information for each snack
- **Personalized profiles** - Save your preferences and snack history
- **Learning system** - The app learns from your choices to provide better recommendations
- **Responsive design** - Works on desktop and mobile devices

## Project Structure

```
src/
├── lib/
│   ├── components/      # Reusable UI components
│   ├── services/        # API and data services
│   ├── stores/          # State management stores
│   └── assets/          # Static assets
├── routes/              # Application routes and pages
└── app.css              # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```sh
git clone https://github.com/hazlamahedich/snackmatch.git
cd snackmatch
```

2. Install dependencies:
```sh
npm install
# or
yarn install
```

3. Start the development server:
```sh
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run check` - Run type checking
- `npm run lint` - Run linting

## Configuration

The project uses the following configuration files:

- `vite.config.ts` - Vite configuration
- `svelte.config.js` - Svelte configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## Environment Variables

Create a `.env` file based on `.env.example` for environment-specific configuration.

## Technologies Used

- **Svelte** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **SvelteKit** - Application framework

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the project maintainer.
