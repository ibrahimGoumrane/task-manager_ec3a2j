# React Template

A modern React template with Vite, TypeScript, and Tailwind CSS for rapid project development.

## Features

- ⚡ Vite 4.4.5 for lightning-fast development
- 🔷 TypeScript 5.0.2 with strict configuration
- 🎨 Tailwind CSS 3.3.5 for utility-first styling
- 📝 PostCSS with Autoprefixer
- 🔧 Path aliases (@/\* imports) via Vite
- 📱 Responsive design ready
- 🧹 ESLint with React-specific rules
- 🚀 Production optimized builds
- 🔄 React Router 6.8.0 for navigation
- 🌙 Dark mode support built-in

## Project Structure

```text
react-template/
├── src/                   # Source files
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components (Button, etc.)
│   │   └── layout/       # Layout-specific components
│   ├── pages/            # Page components for routing
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions and helpers
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # Global styles with Tailwind CSS
│   │   └── index.css     # Main CSS file with Tailwind imports
│   ├── App.tsx           # Main App component with routing
│   ├── main.tsx          # Application entry point
│   └── vite-env.d.ts     # Vite type definitions
├── public/               # Static assets (images, icons, etc.)
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration with path aliases
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.cjs         # ESLint configuration
└── package.json          # Dependencies and scripts
```

## Technologies & Dependencies

### Core Dependencies

- **React 18.2.0** - JavaScript library for building user interfaces
- **React DOM 18.2.0** - React rendering for web browsers
- **React Router DOM 6.8.0** - Declarative routing for React applications

### Development Dependencies

- **Vite 4.4.5** - Next generation frontend build tool
- **@vitejs/plugin-react 4.0.0** - Vite plugin for React support
- **TypeScript 5.0.2** - Static type checking for JavaScript
- **@types/node 20.0.0** - Node.js type definitions
- **@types/react 18.2.0** - React type definitions
- **@types/react-dom 18.2.0** - React DOM type definitions

### Styling & CSS

- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **PostCSS 8.4.31** - CSS transformation tool
- **Autoprefixer 10.4.16** - CSS vendor prefix automation

### Code Quality & Linting

- **ESLint 8.45.0** - JavaScript/TypeScript linting tool
- **@typescript-eslint/eslint-plugin 6.0.0** - TypeScript-specific ESLint rules
- **@typescript-eslint/parser 6.0.0** - TypeScript parser for ESLint
- **eslint-plugin-react-hooks 4.6.0** - React Hooks linting rules
- **eslint-plugin-react-refresh 0.4.3** - React Refresh linting rules

## Configuration Files

### `vite.config.ts` - Build Configuration

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Path alias for clean imports
    },
  },
  server: {
    port: 5173,
    open: true, // Auto-open browser
  },
  build: {
    outDir: "dist",
    sourcemap: true, // Generate source maps
  },
});
```

### `tailwind.config.js` - Tailwind Configuration

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all source files
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
```

### Path Aliases & Imports

- `@/*` maps to `./src/*` for clean absolute imports
- Example: `import { Button } from "@/components/ui/Button"`

### CSS Variables in `src/styles/index.css`

- `--background` and `--foreground` for consistent theming
- Automatic dark mode support via `prefers-color-scheme`

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173) (opens automatically)

## Component Examples

The template includes pre-built components with Tailwind CSS:

### Button Component (`src/components/ui/Button.tsx`)

- Multiple variants: `primary`, `secondary`, `outline`
- Size options: `sm`, `md`, `lg`
- Fully typed with TypeScript interface
- Built-in focus states and accessibility features

### Usage Example

```typescript
import { Button } from "@/components/ui/Button";

function MyComponent() {
  return (
    <div>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
      <Button variant="outline" size="md">
        Learn More
      </Button>
    </div>
  );
}
```

### Styling with Tailwind CSS

The template demonstrates Tailwind usage in `src/App.tsx`:

```typescript
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
  <div className="max-w-2xl mx-auto text-center p-8">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
      Welcome to React Template
    </h1>
  </div>
</div>
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run type-check` - Run TypeScript compiler check

## Building for Production

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Preview the build:**
   ```bash
   npm run preview
   ```

The build artifacts will be stored in the `dist/` directory.

## Deployment

This template can be deployed on:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Docker containers**

## Customization

1. Update `package.json` with your project details
2. Modify `src/App.tsx` for main app structure
3. Add your components in the `src/components/` directory
4. Configure routing in `src/App.tsx`
5. Add global styles in `src/styles/`
6. Add utility functions in `src/utils/`

## Best Practices

- Use TypeScript for type safety
- Keep components small and focused
- Write tests for critical functionality
- Use custom hooks for reusable logic
- Follow React naming conventions
- Use proper semantic HTML
- Optimize images and assets

## Testing

This template uses Jest and React Testing Library for testing. Test files should be placed in the `__tests__/` directory or alongside components with `.test.tsx` extension.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this template for your projects.
