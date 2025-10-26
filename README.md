# Savour

A recipe sharing platform where you can upload your favorite recipes and browse what others are cooking.

## What is this?

Savour is basically like Instagram but for recipes. You can upload your own recipes with photos, ingredients, steps, and tags - or just scroll through a feed of recipes from other people. I built this because I was tired of recipe sites that make you read someone's entire life story before getting to the actual recipe.

## Tech Stack

- **Vue 3** - Frontend framework
- **Vite** - Build tool (because waiting for webpack got old)
- **Firebase** - Database and storage for recipes and images
- **Vue Router** - Page navigation
- **MDB Bootstrap** - UI components
- **Cypress** - E2E testing
- **Vitest** - Unit testing

## Features

- Upload recipes with multiple images
- Add ingredients, step-by-step instructions, and tags
- Browse a feed of all uploaded recipes
- View detailed recipe pages with everything nicely laid out
- Responsive design (works on mobile too)

## Getting Started

### Prerequisites

You'll need Node.js installed. That's pretty much it.

### Installation

1. Clone the repo
```bash
git clone https://github.com/yourusername/Savour.git
cd Savour/savour-project
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
- Create a Firebase project at [firebase.google.com](https://firebase.google.com)
- Enable Firestore Database and Storage in your Firebase console
- Copy `.env.example` to `.env` in the `savour-project` folder
- Fill in your Firebase config values in the `.env` file

4. Run it locally
```bash
npm run dev
```

The app should open up at `http://localhost:5173`

## Project Structure

- `src/views/` - Main pages (Feed, Recipe Page, Upload Page)
- `src/components/` - Reusable components for recipe cards, carousels, etc.
- `src/router/` - Vue Router setup
- `firebase.js` - Firebase configuration

## Testing

Run unit tests:
```bash
npm run test:unit
```

Run e2e tests:
```bash
npm run test:e2e:dev
```

## Building for Production

```bash
npm run build
```

## The Team

Built by a group of students who like food and code:

- [Jared Tanuwidjaja](https://github.com/matchasaur)
- [Aaron Bantay](https://github.com/abant006)
- [Matthew Bingham](https://github.com/mattbingham10-goat)
- [Mihai Lache (school account)](https://github.com/mihai-lache)

## License

See LICENSE.txt for details.
