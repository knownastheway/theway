# Contributing to Known As The Way

Thank you for your interest in contributing to the Known As The Way website! We welcome contributions from the community and are grateful for any help you can provide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Process](#development-process)
- [Style Guidelines](#style-guidelines)
  - [JavaScript Style Guide](#javascript-style-guide)
  - [CSS Style Guide](#css-style-guide)
  - [Commit Messages](#commit-messages)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be Respectful**: Treat everyone with respect. No harassment, discrimination, or inappropriate behavior will be tolerated.
- **Be Collaborative**: Work together towards common goals. Share knowledge and help others learn.
- **Be Professional**: Keep discussions focused on the project and maintain professional communication.
- **Be Inclusive**: Welcome contributors from all backgrounds and experience levels.

## Getting Started

1. **Fork the Repository**: Click the "Fork" button on the [GitHub repository](https://github.com/knownastheway/theway).

2. **Clone Your Fork**:
```bash
git clone https://github.com/your-username/theway.git
cd theway
```

3. **Add Upstream Remote**:
```bash
git remote add upstream https://github.com/knownastheway/theway.git
```

4. **Install Dependencies**:
```bash
npm install
```

5. **Create a Branch**:
```bash
git checkout -b feature/your-feature-name
```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear Title**: Descriptive summary of the issue
- **Description**: Detailed explanation of the problem
- **Steps to Reproduce**: Step-by-step instructions to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment Details**:
  - OS and version
  - Node.js version
  - Browser and version

**Use the bug report template** in `.github/ISSUE_TEMPLATE/bug_report.md`

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear Title**: Descriptive summary of the enhancement
- **Detailed Description**: Explain the enhancement and its benefits
- **Use Cases**: Describe scenarios where this would be useful
- **Possible Implementation**: If you have ideas on how to implement it
- **Alternatives Considered**: Other solutions you've thought about

**Use the feature request template** in `.github/ISSUE_TEMPLATE/feature_request.md`

### Pull Requests

1. **Ensure your code follows the style guidelines**
2. **Update documentation** if you're changing functionality
3. **Write clear commit messages** following our conventions
4. **Test your changes** thoroughly
5. **Update the README** if necessary
6. **Reference any related issues** in your PR description

#### Pull Request Process

1. **Keep PRs focused**: One feature or fix per PR
2. **Write a clear PR description** using our template:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] I have tested these changes locally
- [ ] All existing tests pass

## Checklist
- [ ] My code follows the project style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
```

3. **Respond to feedback** promptly and professionally
4. **Be patient**: Review may take time

## Development Process

### 1. Setting Up Development Environment

```bash
# Install dependencies
npm install

# Set up environment variables (create .env file)
PORT=8080
EMAIL_ADDR=test@example.com
EMAIL_PASS=test-password
NODE_ENV=development
```

### 2. Making Changes

- Work on your feature branch
- Make small, focused commits
- Test your changes locally
- Ensure no console errors or warnings

### 3. Running the Application

```bash
# Development mode
node main.js

# Production mode
npm start
```

### 4. Before Submitting

- Sync with upstream:
```bash
git fetch upstream
git rebase upstream/main
```

- Ensure your code is clean:
  - No commented-out code
  - No debug console.log statements
  - Proper error handling

## Style Guidelines

### JavaScript Style Guide

- **Indentation**: Use tabs (as per `.editorconfig`)
- **Semicolons**: Always use semicolons
- **Quotes**: Use single quotes for strings
- **Variables**: Use meaningful variable names
- **Functions**: Use descriptive function names
- **Comments**: Add comments for complex logic

Example:
```javascript
// Good
function sendContactEmail(userData) {
    const { name, email, message } = userData;
    
    if (!email || !name) {
        throw new Error('Required fields missing');
    }
    
    // Prepare email options
    const mailOptions = {
        from: 'noreply@knownastheway.com',
        to: 'contact@knownastheway.com',
        subject: `Contact from ${name}`,
        html: formatEmailTemplate(message)
    };
    
    return smtpTransport.sendMail(mailOptions);
}
```

### CSS Style Guide

- **Organization**: Group related properties
- **Naming**: Use lowercase with hyphens for classes
- **Comments**: Document sections and complex styles
- **Mobile-First**: Write mobile styles first, then desktop

Example:
```css
/* Section: Navigation */
.nav-menu {
    /* Layout */
    display: flex;
    flex-direction: column;
    
    /* Spacing */
    padding: 1rem;
    margin: 0;
    
    /* Typography */
    font-size: 1rem;
    line-height: 1.5;
    
    /* Colors */
    background-color: #fff;
    color: #333;
}

/* Desktop styles */
@media (min-width: 768px) {
    .nav-menu {
        flex-direction: row;
    }
}
```

### Commit Messages

Follow the conventional commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```bash
feat(contact): add email validation to contact form

fix(nav): correct mobile menu toggle behavior

docs(readme): update installation instructions

style(css): format stylesheet with consistent indentation

refactor(routes): simplify express route handlers

chore(deps): update express to latest version
```

## Project Structure

When adding new features, follow the existing project structure:

```
theway/
├── main.js                 # Server logic goes here
├── public/                 
│   ├── css/               # Stylesheets
│   ├── scripts/           # Client-side JavaScript
│   ├── images/            # Image assets
│   └── views/             # HTML templates
├── tests/                 # Test files (if added)
└── docs/                  # Additional documentation (if needed)
```

## Testing

Currently, the project doesn't have automated tests. If you're adding tests:

1. Create a `tests/` directory
2. Use a testing framework like Jest or Mocha
3. Write tests for your new features
4. Update package.json with test scripts
5. Document how to run tests

Example test structure:
```javascript
// tests/contact.test.js
describe('Contact Form', () => {
    it('should validate email format', () => {
        // Test implementation
    });
    
    it('should send email successfully', () => {
        // Test implementation
    });
});
```

## Documentation

- **Code Comments**: Add JSDoc comments for functions:
```javascript
/**
 * Sends contact form email
 * @param {Object} userData - User form data
 * @param {string} userData.name - User's name
 * @param {string} userData.email - User's email
 * @param {string} userData.message - User's message
 * @returns {Promise} Email send result
 */
function sendContactEmail(userData) {
    // Implementation
}
```

- **README Updates**: Update README.md when adding:
  - New dependencies
  - New environment variables
  - New endpoints or features
  - Setup instructions changes

- **Inline Documentation**: Document complex logic inline:
```javascript
// Calculate rate limit window (5 minutes in milliseconds)
const rateLimitWindow = 5 * 60 * 1000;
```

## Community

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For general questions and ideas
- **Email**: Contact through the website form

### Recognition

Contributors will be recognized in:
- GitHub contributors page
- Special mentions in release notes
- Community acknowledgments

### Review Process

- **Initial Review**: Within 3-5 business days
- **Feedback**: Constructive and specific
- **Iterations**: Work with reviewers to address feedback
- **Approval**: Requires at least one maintainer approval

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Questions?

If you have questions about contributing, feel free to:
1. Open a GitHub Discussion
2. Contact us through the website
3. Review existing issues and PRs for examples

---

Thank you for contributing to Known As The Way! Your efforts help make our community platform better for everyone. 🙏