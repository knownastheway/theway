# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

The Way is a high-performance church website built with Bun runtime that compiles to a single executable. The architecture prioritizes performance, simplicity, and minimal dependencies while serving static assets from memory.

## Core Commands

### Development
```bash
# Start development server with hot reload
bun run dev

# Start production server
bun run start

# Install dependencies
bun install
```

### Building
```bash
# Build single-file executable
bun run build

# Output: ./dist/theway (single binary with all assets bundled)
```

### Docker
```bash
# Build Docker image
docker build -t theway:latest .

# Run container
docker run -p 8080:8080 theway:latest
```

## Architecture

### Single Binary Design
- **Entry Point**: `main.js` - Bun HTTP server with routing
- **Asset Bundling**: `assets.js` - All static files bundled at build time
- **Memory Serving**: Static assets served from memory, not filesystem
- **Runtime**: Bun v1.2.18+ (not Node.js)

### Key Components
1. **HTTP Server**: Native Bun.serve() with custom routing
2. **Asset Management**: Memory-based serving with MIME type detection
3. **Email Service**: Nodemailer with Gmail SMTP for contact forms
4. **Static Assets**: HTML, CSS, JS, images bundled into executable

### Directory Structure
```
/
├── main.js              # Server entry point & routing
├── assets.js            # Asset bundling (all imports)
├── package.json         # Bun dependencies
├── public/              # Static assets (bundled at build)
│   ├── index.html       # Main page
│   ├── views/           # HTML templates
│   ├── css/             # Stylesheets
│   ├── scripts/         # Client-side JS
│   ├── components/      # UI components
│   └── images/          # Images
├── dist/                # Build output
└── docs/                # Technical documentation
```

## Request Handling

### Routing Logic (main.js:49-161)
- `GET /` → serves index.html from memory
- `POST /contact` → processes contact form, sends email
- `GET /css/*` → serves CSS from assets.css bundle
- `GET /scripts/*` → serves JS from assets.scripts bundle
- `GET /images/*` → serves images from assets.images bundle
- `GET /views/*` → serves HTML views from assets.html bundle
- Fallback to filesystem for unbundled assets

### Asset Serving Strategy
1. **Primary**: Memory-based serving from assets.js bundles
2. **Fallback**: Filesystem serving for assets not in bundle
3. **404**: Unknown paths return 404

## Email Configuration

Contact form requires Gmail SMTP configuration:
```bash
# Required environment variables
EMAIL_ADDR=your-email@gmail.com
EMAIL_PASS=your-app-password  # Gmail App Password
PORT=8080                     # Optional, defaults to 8080
```

## Adding New Assets

### Static Assets
1. Place file in appropriate `public/` subdirectory
2. Add import to `assets.js` with correct type annotation
3. Add to appropriate assets export object
4. Asset will be bundled and served from memory

### Example: Adding new CSS file
```javascript
// In assets.js
import newCss from './public/css/new-style.css' with { type: 'text' };

// Add to css object
css: {
  'new-style.css': newCss,
  // ... other css files
}
```

## Performance Characteristics

- **Cold Start**: <10ms (vs Node.js ~100ms)
- **Memory Usage**: ~80MB (vs Express ~150MB)
- **Build Time**: ~200ms
- **Bundle Size**: ~108MB (includes all assets)
- **Request Latency**: <1ms for static assets

## Development Notes

### Testing
- No test framework currently configured
- Manual testing via `bun run dev`
- Docker testing via container build

### Dependencies
- **Runtime**: Only `nodemailer` for email functionality
- **Dev**: `@types/bun` for TypeScript support
- **Build**: `@flydotio/dockerfile` for Docker generation

### JavaScript Features
- ES2022+ syntax
- ES modules (type: "module")
- Bun native APIs (Bun.serve, Bun.file, etc.)
- Modern fetch API

## Common Tasks

### Adding New Page
1. Create HTML file in `public/views/`
2. Add import to `assets.js`
3. Add to `assets.html` object
4. Add routing logic in `main.js` if needed

### Updating Styles
1. Edit CSS files in `public/css/`
2. Changes automatically included in next build
3. No additional bundling steps needed

### Email Template Changes
Contact form email template is in `main.js:74` - modify HTML directly in code.

## Deployment

### Single Binary
- Build creates self-contained executable
- No external dependencies needed
- Copy `dist/theway` to target server and run

### Docker
- Multi-stage build for minimal image size
- Alpine-based final image (~112MB)
- Configurable via environment variables

### Fly.io
- Configured via `fly.toml`
- `fly deploy` for deployment
- Environment variables set via Fly dashboard