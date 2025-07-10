# Contributing to The Way

We're excited that you're interested in contributing to The Way! This document provides guidelines and instructions for contributing to our church website project.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful**: Treat all community members with respect and kindness
- **Be collaborative**: Work together constructively and professionally
- **Be inclusive**: Welcome newcomers and help them get started
- **Be patient**: Remember that everyone has different experience levels
- **Be constructive**: Provide helpful feedback and suggestions

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Bun](https://bun.sh/) v1.2.18 or higher
- [Git](https://git-scm.com/) for version control
- [Docker](https://docs.docker.com/get-docker/) or [Podman](https://podman.io/) (optional)

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/theway.git
   cd theway
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   # For email testing, you'll need Gmail credentials
   ```

4. **Start development server**
   ```bash
   bun run dev
   ```

5. **Verify setup**
   - Visit http://localhost:8080
   - Check that the site loads correctly
   - Test the contact form (if email is configured)

## 🔧 Development Workflow

### Branch Strategy

We use a simple branching strategy:
- `main` - Production-ready code
- `feature/feature-name` - New features
- `fix/issue-description` - Bug fixes
- `docs/documentation-update` - Documentation changes

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow our coding standards (see below)
   - Write clear, concise commit messages
   - Add tests if applicable

3. **Test your changes**
   ```bash
   # Run development server
   bun run dev
   
   # Build production executable
   bun run build
   
   # Test the built executable
   ./dist/theway
   
   # Test Docker build
   docker build -t theway-test .
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

## 📏 Coding Standards

### JavaScript/TypeScript

- **ES2022+**: Use modern JavaScript features
- **Imports**: Use ES6 imports, prefix Node.js built-ins with `node:`
- **Async/Await**: Prefer async/await over promises
- **Const/Let**: Use `const` by default, `let` when reassignment is needed
- **Arrow Functions**: Use arrow functions for callbacks and short functions

```javascript
// Good
import { resolve } from 'node:path';
import nodemailer from 'nodemailer';

const handleContact = async (formData) => {
  const email = formData.get('email');
  // ...
};

// Avoid
var fs = require('fs');
function handleContact(formData) {
  return new Promise((resolve, reject) => {
    // ...
  });
}
```

### File Structure

- **Assets**: All static assets must be imported in `assets.js`
- **Main Logic**: Keep `main.js` focused on server logic
- **Separation**: Separate concerns (email, routing, assets)

### Performance

- **Bun APIs**: Use Bun's native APIs when possible
- **Memory Efficiency**: Avoid unnecessary memory allocations
- **Bundle Size**: Keep dependencies minimal

## 🧪 Testing

### Manual Testing

1. **Development Server**
   ```bash
   bun run dev
   ```
   - Test all pages load correctly
   - Test contact form submission
   - Check responsive design

2. **Production Build**
   ```bash
   bun run build
   ./dist/theway
   ```
   - Verify all assets are bundled
   - Test performance improvements

3. **Docker Build**
   ```bash
   docker build -t theway-test .
   docker run -p 8080:8080 theway-test
   ```

### Test Checklist

Before submitting a PR, verify:
- [ ] All pages load without errors
- [ ] Contact form works (if configured)
- [ ] Responsive design works on mobile
- [ ] Production build creates working executable
- [ ] Docker build succeeds
- [ ] No console errors or warnings

## 📝 Commit Messages

Use conventional commits for clear history:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes

### Examples
```
feat(contact): add email validation
fix(assets): resolve image loading issue
docs(readme): update installation instructions
perf(server): optimize static asset serving
```

## 🔄 Pull Request Process

1. **Create Pull Request**
   - Use our PR template
   - Link related issues
   - Provide clear description of changes

2. **PR Requirements**
   - [ ] Passes all tests
   - [ ] Follows coding standards
   - [ ] Includes documentation updates
   - [ ] Has clear commit messages

3. **Review Process**
   - Code review by maintainers
   - Address feedback promptly
   - Keep PR focused and small

4. **Merge**
   - Squash commits for clean history
   - Update changelog if needed

## 📚 Documentation

### When to Update Docs

- Adding new features
- Changing configuration options
- Modifying API endpoints
- Updating deployment process

### Documentation Types

- **README.md**: Project overview and quick start
- **CONTRIBUTING.md**: This file
- **docs/**: Detailed documentation
- **Code Comments**: For complex logic

## 🐛 Bug Reports

Use GitHub Issues with the bug template:

```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g. macOS 12.0]
- Browser: [e.g. Chrome 95]
- Bun Version: [e.g. 1.2.18]
```

## 💡 Feature Requests

Use GitHub Issues with the feature template:

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should it work?

**Alternatives**
Other solutions considered
```

## 🏗️ Architecture Guidelines

### Server Structure

```javascript
// main.js - Keep it focused
import { assets } from './assets.js';

const server = Bun.serve({
  port,
  async fetch(request) {
    // Handle routing
    // Serve assets
    // Process forms
  }
});
```

### Asset Management

```javascript
// assets.js - Import all static files
import indexHtml from './public/index.html' with { type: 'text' };
import logoPng from './public/images/logo.png';

export const assets = {
  html: { 'index.html': indexHtml },
  images: { 'logo.png': logoPng }
};
```

### Email Integration

```javascript
// Secure email handling
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ADDR,
    pass: process.env.EMAIL_PASS
  }
});
```

## 🔒 Security Guidelines

### Environment Variables

- Never commit secrets to the repository
- Use `.env` files for local development
- Document required environment variables

### Input Validation

- Validate all form inputs
- Sanitize user data
- Use parameterized queries if adding database support

### Dependencies

- Keep dependencies minimal
- Regularly update dependencies
- Review security advisories

## 📦 Release Process

1. **Version Bump**
   - Update version in `package.json`
   - Update changelog

2. **Testing**
   - Full regression testing
   - Performance benchmarking
   - Security review

3. **Documentation**
   - Update documentation
   - Review examples

4. **Release**
   - Create GitHub release
   - Update deployment guides

## 🤔 Need Help?

- **GitHub Issues**: Technical questions
- **GitHub Discussions**: General questions
- **Discord**: Real-time chat (if available)
- **Email**: For sensitive matters

## 🙏 Recognition

Contributors are recognized through:
- GitHub contributions graph
- Changelog acknowledgments
- README acknowledgments
- Community highlights

Thank you for contributing to The Way! Your help makes this project better for the entire church community.

---

<div align="center">
  <strong>Built with ❤️ by the community</strong>
</div>