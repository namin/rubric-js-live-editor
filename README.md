# JavaScript Live Editor

A React application that provides a JavaScript editor with live canvas rendering, featuring side-by-side layout on desktop and stacked layout on mobile.

## Features

- **Monaco Editor**: Full-featured JavaScript editor with syntax highlighting
- **Live Canvas Rendering**: Real-time execution of JavaScript code with canvas drawing
- **Responsive Design**: Side-by-side on desktop, stacked on mobile
- **Safe Code Execution**: Sandboxed JavaScript execution with limited global access
- **Error Handling**: Comprehensive error display and recovery
- **Accessibility**: Full ARIA support and keyboard navigation
- **Code Persistence**: Automatic saving to localStorage

## Architecture

This project follows the Rubric Architecture pattern with strict layer separation:

- **Components**: Pure React components (presentation and container)
- **Stores**: Zustand state management
- **Hooks**: Custom React hooks for reusable logic
- **Styles**: CSS Modules for styling
- **Types**: TypeScript type definitions

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run validation:
   ```bash
   npm run validate
   ```

## Usage

1. Write JavaScript code in the left panel (or top panel on mobile)
2. The canvas will automatically update as you type
3. Use canvas drawing APIs like:
   ```javascript
   const canvas = document.getElementById('canvas');
   const ctx = canvas.getContext('2d');
   
   // Draw shapes, text, etc.
   ctx.fillStyle = '#FF0000';
   ctx.fillRect(10, 10, 100, 100);
   ```

## Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Execute code (when editor is focused)

## Security

The code execution is sandboxed with:
- Limited global object access
- Prevented access to dangerous APIs
- setTimeout limits to prevent infinite loops
- No setInterval access
- No network or storage access from executed code

## Browser Support

- Modern browsers with ES2020 support
- Canvas API support required
- Monaco Editor requirements (IE11+ with polyfills)

## Development

The project uses:
- **React 18** with TypeScript
- **Vite** for build tooling
- **Zustand** for state management
- **Monaco Editor** for code editing
- **CSS Modules** for styling

All code must pass Rubric validation before deployment.
