# Known As The Way

A modern, responsive website for Known As The Way organization, built with Express.js and deployed on Fly.io.

## 🌐 Live Site

Visit us at [knownastheway.com](https://knownastheway.com)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
  - [Fly.io Deployment](#flyio-deployment)
  - [Docker Deployment](#docker-deployment)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

Known As The Way is a community-focused organization website that provides information about our mission, team, and services. The site features a contact form for visitor inquiries and showcases our various community initiatives.

## Features

- 📱 Responsive design for all devices
- 📧 Contact form with email notifications
- 🎨 Modern UI with smooth animations
- ⚡ Fast page loads with static asset optimization
- 🔒 Secure email handling
- 🚀 Production-ready deployment configuration

## Tech Stack

- **Backend**: Node.js, Express.js
- **View Engines**: EJS, Pug
- **Email Service**: Nodemailer (Gmail SMTP)
- **Styling**: CSS3, Bootstrap
- **Deployment**: Fly.io, Docker
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (v18.5.0 or higher recommended)
- npm or pnpm
- Gmail account for email functionality (optional for local development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/knownastheway/theway.git
cd theway
```

2. Install dependencies:
```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory (or set these in your environment):

```env
PORT=8080                           # Server port (optional, defaults to 8080)
EMAIL_ADDR=your-email@gmail.com    # Gmail address for sending emails
EMAIL_PASS=your-app-password       # Gmail app password (not regular password)
NODE_ENV=development                # Set to 'production' for production
```

**Note**: For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### Running Locally

Start the development server:

```bash
node main.js
```

Or for production mode:

```bash
npm start
```

The server will start on `http://localhost:8080` (or your configured PORT).

## Project Structure

```
theway/
├── main.js                 # Express server and route configuration
├── package.json            # Dependencies and scripts
├── Dockerfile              # Docker configuration
├── fly.toml               # Fly.io deployment configuration
├── public/                # Static assets and views
│   ├── index.html         # Main landing page
│   ├── css/               # Stylesheets
│   ├── scripts/           # JavaScript files
│   ├── images/            # Image assets
│   ├── fonts/             # Font files
│   ├── vendor/            # Third-party libraries
│   └── views/             # HTML page templates
│       ├── about.html
│       ├── contact.html
│       ├── mission.html
│       ├── serve.html
│       ├── team.html
│       └── resources.html
└── .github/               # GitHub templates
    └── ISSUE_TEMPLATE/
```

## Deployment

### Fly.io Deployment

1. Install the Fly CLI:
```bash
curl -L https://fly.io/install.sh | sh
```

2. Login to Fly:
```bash
fly auth login
```

3. Deploy the application:
```bash
fly deploy
```

4. Set environment secrets:
```bash
fly secrets set EMAIL_ADDR=your-email@gmail.com
fly secrets set EMAIL_PASS=your-app-password
```

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t theway .
```

2. Run the container:
```bash
docker run -d \
  -p 8080:8080 \
  -e EMAIL_ADDR=your-email@gmail.com \
  -e EMAIL_PASS=your-app-password \
  --name theway \
  theway
```

## API Endpoints

### `GET /`
Serves the main landing page.

### `POST /contact`
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Response:**
- Success: HTML alert with confirmation message
- Error: Error message string

### Static Routes
- `/css/*` - Stylesheet files
- `/scripts/*` - JavaScript files
- `/images/*` - Image assets

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:
- Code of conduct
- Development process
- How to submit pull requests
- Coding standards

## License

This project is proprietary software. All rights reserved.

## Contact

- **Website**: [knownastheway.com](https://knownastheway.com)
- **Email**: Use the contact form on our website
- **GitHub**: [github.com/knownastheway/theway](https://github.com/knownastheway/theway)

---

Built with ❤️ by the Known As The Way team