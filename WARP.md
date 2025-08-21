# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React-based portfolio website (v4) built with modern tooling and designed with a developer-themed aesthetic. The project uses Vite as the build tool, Tailwind CSS for styling, and follows a component-based architecture.

## Architecture

### Key Technologies
- **Frontend**: React 19, JSX
- **Build Tool**: Vite with SWC for fast compilation
- **Styling**: Tailwind CSS v4 with custom configuration
- **Testing**: Vitest with React Testing Library
- **Package Manager**: pnpm (user preference)
- **Icons**: Lucide React and React Icons
- **Code Quality**: ESLint, Prettier, Husky for git hooks

### Project Structure
```
src/
├── components/           # React components organized by feature
│   ├── Hero/            # Landing section with navigation
│   ├── Experience/      # Work experience timeline
│   ├── Projects/        # Project showcase with filtering
│   ├── ContactSection.jsx
│   ├── common/          # Shared components (SectionHeader)
│   └── index.js         # Component exports
├── data/                # JSON data files for content
│   ├── HeroData.json    # Hero section content
│   ├── Experience.json  # Work experience data
│   ├── Projects.json    # Project portfolio data
│   └── Contact.json     # Contact information
├── assets/              # Static assets (images, PDFs)
├── App.jsx              # Main app component
└── main.jsx             # Entry point
```

### Data-Driven Architecture
The application uses a data-driven approach where content is separated from components:
- Each major section has a corresponding JSON file in `src/data/`
- Components import and render data dynamically
- This allows for easy content updates without touching component code

## Development Commands

### Primary Development Workflow
```bash
# Install dependencies (uses pnpm per user preference)
pnpm install

# Start development server (runs on port 3000, auto-opens browser)
pnpm dev

# Run tests in watch mode
pnpm test:dev

# Run all tests with coverage (CI mode)
pnpm test

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Quality & Formatting
```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Check Prettier formatting
pnpm prettier:check

# Fix Prettier formatting
pnpm prettier:fix

# Format code (runs both Prettier and ESLint fixes)
pnpm format
```

### Testing Specific Files
```bash
# Run tests for a specific file
npx vitest src/components/Hero/Hero.test.jsx

# Run tests matching a pattern
npx vitest --grep "Hero component"
```

## Code Quality Setup

### Git Hooks (Husky)
- **Pre-commit**: Runs `lint-staged` which formats and lints staged files
- **Pre-push**: Runs full test suite to prevent broken code from being pushed

### ESLint Configuration
- Uses modern ESLint flat config format
- Configured for React 19 with hooks support
- Integrates Prettier for consistent formatting
- Ignores dist/ and node_modules/

### Prettier Configuration
- Uses tabs (tabWidth: 4)
- 80 character print width
- Single quotes
- Includes Tailwind CSS plugin for class sorting

## Testing Architecture

### Test Setup
- **Framework**: Vitest with jsdom environment
- **Testing Library**: React Testing Library with jest-dom matchers
- **Location**: Tests are co-located with components (e.g., `SectionHeader.test.jsx`)
- **Setup**: Global test setup in `tests/setup.js`

### Test Configuration
- Tests run in jsdom environment for DOM simulation
- Global cleanup after each test
- Coverage reporting with v8
- Tests match pattern: `./src/**/*.test.jsx`

## Development Notes

### Component Patterns
- Components follow a consistent structure with data imports from JSON files
- Icon mapping objects are used to dynamically render Lucide React icons
- Responsive design with mobile-first approach using Tailwind utilities
- State management with React hooks (useState, useEffect)

### Styling Approach
- Developer-themed design with terminal/code aesthetics
- Dark theme with indigo/purple accent colors
- Consistent use of gray-950/900/800 backgrounds
- Interactive elements with hover states and transitions

### Node.js Version Management
- Project uses Volta for Node.js version management
- Locked to Node.js 20.14.0 and pnpm 9.2.0
- Package manager is explicitly set to pnpm@9.2.0

## File Naming Conventions
- Components use PascalCase (e.g., `Hero.jsx`, `SectionHeader.jsx`)
- Test files use `.test.jsx` suffix
- Data files use PascalCase with `.json` extension
- Index files export components for clean imports

## Build Configuration

### Vite Configuration
- Uses SWC for React compilation (faster than Babel)
- Tailwind CSS integrated via Vite plugin
- Development server on port 3000 with auto-open
- Test configuration embedded in vite.config.js

### Environment
- ES modules throughout (type: "module" in package.json)
- Modern JavaScript features (ES2020+)
- JSX with React 19 automatic runtime
