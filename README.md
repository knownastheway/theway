# The Way

> A modern, high-performance church website built with Bun, featuring single-file executable deployment and blazing-fast performance.

## ✨ Features

- **⚡ Lightning Fast**: Built with Bun runtime for superior performance
- **📦 Single Executable**: Compiles to a single binary with all assets bundled
- **🐳 Docker Ready**: Minimal 112MB Docker image for easy deployment
- **📱 Responsive Design**: Mobile-first responsive layout
- **📧 Contact Forms**: Integrated email functionality with nodemailer
- **🎨 Modern Stack**: ES2022, TypeScript support, and modern JavaScript features
- **🔒 Secure**: Minimal attack surface with dependency-free deployment
- **☁️ Cloud Native**: Ready for Fly.io, Docker, and container deployments

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) v1.2.18 or higher
- [Docker](https://docs.docker.com/get-docker/) or [Podman](https://podman.io/) (optional)

### Development

```bash
# Clone the repository
git clone https://github.com/knownastheway/theway.git
cd theway

# Install dependencies
bun install

# Start development server with hot reload
bun run dev

# Visit http://localhost:8080
```

### Production Build

```bash
# Build single-file executable
bun run build

# Run the executable
./dist/theway
```

### Docker Deployment

```bash
# Build Docker image
docker build -t theway:latest .

# Run container
docker run -p 8080:8080 theway:latest
```

## 🏗️ Architecture

The Way is built with a modern, performance-first architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
├─────────────────────────────────────────────────────────────┤
│                     Static Assets                            │
│  • HTML Views & Partials   • CSS Stylesheets               │
│  • JavaScript Components   • Images & Fonts                 │
├─────────────────────────────────────────────────────────────┤
│                   Bun HTTP Server                            │
│  • Native fetch() API      • Built-in routing               │
│  • Memory-served assets     • Contact form handling         │
├─────────────────────────────────────────────────────────────┤
│                  Email Integration                           │
│  • Nodemailer SMTP        • Gmail service                   │
│  • HTML email templates   • Form validation                 │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
theway/
├── main.js                 # Main server entry point
├── assets.js              # Bundled static assets
├── package.json           # Dependencies and scripts
├── Dockerfile             # Multi-stage Docker build
├── bun.lock              # Dependency lock file
├── dist/                 # Build output
│   └── theway            # Single executable
├── public/               # Static assets
│   ├── index.html        # Main homepage
│   ├── views/            # HTML templates
│   ├── css/              # Stylesheets
│   ├── scripts/          # JavaScript files
│   ├── images/           # Images and icons
│   └── components/       # UI components
└── docs/                 # Documentation
    ├── api.md            # API documentation
    ├── deployment.md     # Deployment guides
    └── architecture.md   # Technical architecture
```

## 🛠️ Development Scripts

```bash
# Development
bun run dev          # Start with hot reload
bun run start        # Start production server

# Building
bun run build        # Create single executable

# Docker
docker build -t theway .     # Build image
docker run -p 8080:8080 theway   # Run container
```

## 🌍 Environment Variables

The application uses environment variables for configuration:

```bash
# Required for email functionality
EMAIL_ADDR=your-email@gmail.com
EMAIL_PASS=your-app-password

# Optional
PORT=8080              # Server port (default: 8080)
NODE_ENV=production    # Environment mode
```

## 📧 Email Configuration

The contact form uses Gmail SMTP. To set up:

1. Enable 2-factor authentication on your Google account
2. Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. Set environment variables:
   ```bash
   export EMAIL_ADDR=your-email@gmail.com
   export EMAIL_PASS=your-app-password
   ```

## 🚀 Deployment

### Fly.io

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
fly deploy
```

### Docker

```bash
# Build and run
docker build -t theway .
docker run -p 8080:8080 -e EMAIL_ADDR=your-email@gmail.com -e EMAIL_PASS=your-password theway
```

### Binary Deployment

```bash
# Build executable
bun run build

# Deploy single file
scp dist/theway user@server:/opt/theway/
ssh user@server 'chmod +x /opt/theway/theway && /opt/theway/theway'
```

## 🔧 Technical Details

### Performance Optimizations

- **Bun Runtime**: 3x faster than Node.js for most workloads
- **Single Executable**: Zero cold start, instant deployment
- **Memory Assets**: All static files served from memory
- **Minimal Dependencies**: Only essential runtime libraries

### Security Features

- **Dependency Minimization**: Reduced attack surface
- **Input Validation**: Form data sanitization
- **HTTPS Ready**: TLS termination support
- **Container Security**: Minimal Alpine-based images

### Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile Optimized**: Responsive design for all devices
- **Progressive Enhancement**: Graceful degradation for older browsers

## 📚 API Documentation

### Endpoints

#### `GET /`
Serves the main homepage

#### `POST /contact`
Handles contact form submissions

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello from the contact form!"
}
```

**Response:**
```html
<div class='alert alert-success'>
  Thanks for reaching out! We received your email.
</div>
```

#### Static Assets
- `GET /css/*` - CSS stylesheets
- `GET /scripts/*` - JavaScript files
- `GET /images/*` - Images and icons
- `GET /components/*` - UI components

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Code of conduct
- Development setup
- Pull request process
- Coding standards

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/knownastheway/theway/issues)
- **Documentation**: [./docs](./docs/)
- **Community**: [Discussions](https://github.com/knownastheway/theway/discussions)

## 🙏 Acknowledgments

- **Bun Team**: For the incredible runtime performance
- **Church Community**: For inspiration and feedback
- **Contributors**: Everyone who helped make this project better

---

<div align="center">
  <strong>Built with ❤️ for the church community</strong>
</div>
