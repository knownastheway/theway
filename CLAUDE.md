# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- **Start server:** `npm start` or `NODE_ENV=production node main.js` (runs on port 8080 by default, or PORT env var)
- **Install dependencies:** `npm install`
- **Production build:** `npm run build` (installs production dependencies only)

### Deployment
- **Deploy to Fly.io:** `fly deploy`
- **Docker build:** `docker build -t theway .`
- **Docker run:** `docker run -p 8080:8080 -e EMAIL_ADDR=<email> -e EMAIL_PASS=<password> theway`

## Architecture

This is a simple Express.js website for "Known As The Way" (knownastheway.com) with the following structure:

### Core Application
- **main.js**: Express server setup with email contact form functionality using Nodemailer
- **Port:** Defaults to 8080, configurable via PORT environment variable
- **View engines:** EJS and Pug configured, views served from `/public` directory

### Environment Variables
- `EMAIL_ADDR`: Gmail address for sending contact form emails
- `EMAIL_PASS`: Gmail password for authentication
- `PORT`: Server port (default: 8080)

### Key Routes
- `GET /`: Serves index.html
- `POST /contact`: Handles contact form submissions, sends email to aaron@knownastheway.com

### Static Assets
- CSS files: `/public/css/`
- Images: `/public/images/`
- Scripts: `/public/scripts/`
- HTML views: `/public/views/` (about, contact, mission, serve, team, resources)
- Main index: `/public/index.html`

### Deployment Configuration
- **Fly.io**: Configured in `fly.toml` (app name: "theway", region: atl, port: 8080)
- **Docker**: Multi-stage build with Node.js 18.5.0 slim base image
- **Production mode**: Always runs with NODE_ENV=production