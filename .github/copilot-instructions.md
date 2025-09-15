# Copilot Instructions

This document provides guidance to AI coding agents for working effectively within the "The Way" website's codebase.

## Project Overview

This is a simple, single-page style website for the "Known As The Way" organization. The backend is a Node.js/Express server, and the front end is a mix of static HTML, CSS, and JavaScript, including jQuery and some legacy AngularJS components.

## Key Files and Architecture

- **`main.js`**: This is the most important file. It's the entry point for the Node.js application, setting up the Express server, middleware, static file serving, and the contact form API endpoint. All server-side logic is contained here.
- **`public/`**: This directory contains all front-end assets.
  - **`public/index.html`**: The main HTML file for the website.
  - **`public/views/`**: Contains partial HTML views that are loaded into the main page.
  - **`public/css/`**: Contains all stylesheets.
  - **`public/scripts/`**: Contains client-side JavaScript files.
  - **`public/vendor/`**: Contains third-party libraries like AngularJS.
- **`Dockerfile` and `fly.toml`**: These files are used for deployment to Fly.io.

## Development Workflow

### Running the Application

1. **Install dependencies**:
    ```bash
    pnpm install
    ```

2. **Set up environment variables**:
    Create a `.env` file in the root of the project with the following variables for the contact form:

    ```
    EMAIL_ADDR=your-gmail-address@gmail.com
    EMAIL_PASS=your-gmail-app-password
    ```

3. **Start the server**:

    ```bash
    npm start
    ```

    The server will run on `http://localhost:8080` by default.

### Contact Form

The contact form functionality is handled by a `POST` request to the `/contact` endpoint in `main.js`. It uses `Nodemailer` to send an email. When working on this feature, refer to the `smtpTransport` and the `/contact` route in `main.js`.

## Conventions and Patterns

- The server is a monolithic file (`main.js`). Any new server-side functionality should be added there, following the existing patterns.
- The frontend is not a modern Single Page Application (SPA). It's a more traditional website that uses jQuery for DOM manipulation and AJAX. While there are some AngularJS files in `public/vendor`, they appear to be part of a theme and are not heavily integrated into the custom application logic.
- Static assets are served directly by Express. There is no build step for the frontend.
- Dependencies are managed with `pnpm`.
