# API Documentation

This document provides comprehensive API documentation for The Way church website.

## Overview

The Way uses a simple REST-like API built with Bun's native HTTP server. The API handles static asset serving and form processing with minimal overhead.

## Base URL

```
Local Development: http://localhost:8080
Production: https://your-domain.com
```

## Authentication

No authentication is required for public endpoints. Email functionality uses server-side environment variables for SMTP authentication.

## Content Types

- **HTML**: `text/html; charset=utf-8`
- **CSS**: `text/css; charset=utf-8`
- **JavaScript**: `application/javascript; charset=utf-8`
- **JSON**: `application/json; charset=utf-8`
- **Images**: `image/jpeg`, `image/png`, `image/gif`, etc.

## Endpoints

### Static Content

#### `GET /`
**Description**: Serves the main homepage

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 15432

<!DOCTYPE html>
<html>
<!-- Homepage content -->
</html>
```

**Example**:
```bash
curl http://localhost:8080/
```

#### `GET /views/{page}`
**Description**: Serves HTML view templates

**Parameters**:
- `page` (string) - Page name (about, contact, mission, etc.)

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<!DOCTYPE html>
<html>
<!-- Page content -->
</html>
```

**Example**:
```bash
curl http://localhost:8080/views/about.html
```

#### `GET /css/{filename}`
**Description**: Serves CSS stylesheets

**Parameters**:
- `filename` (string) - CSS file name

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: text/css; charset=utf-8

/* CSS content */
```

**Example**:
```bash
curl http://localhost:8080/css/style.css
```

#### `GET /scripts/{filename}`
**Description**: Serves JavaScript files

**Parameters**:
- `filename` (string) - JavaScript file name

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: application/javascript; charset=utf-8

// JavaScript content
```

**Example**:
```bash
curl http://localhost:8080/scripts/contact-form.js
```

#### `GET /images/{filename}`
**Description**: Serves image files

**Parameters**:
- `filename` (string) - Image file name

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Length: 45234

[Binary image data]
```

**Example**:
```bash
curl http://localhost:8080/images/logo.png
```

#### `GET /components/{filename}`
**Description**: Serves UI component files

**Parameters**:
- `filename` (string) - Component file name

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: application/javascript; charset=utf-8

// Component JavaScript
```

### Form Processing

#### `POST /contact`
**Description**: Handles contact form submissions

**Request Body** (form-data):
```
name: string (required) - Sender's name
email: string (required) - Sender's email address
message: string (required) - Message content
```

**Request Example**:
```http
POST /contact HTTP/1.1
Content-Type: application/x-www-form-urlencoded

name=John%20Doe&email=john@example.com&message=Hello%20from%20the%20website
```

**Success Response**:
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<div class='alert alert-success'>
  <button type='button' class='close' data-dismiss='alert'>&times;</button>
  <strong>Sweet!</strong> Thanks for reaching out! We received your email and will respond as soon as possible.
</div>
```

**Error Response**:
```http
HTTP/1.1 500 Internal Server Error
Content-Type: text/plain; charset=utf-8

There was a problem with the contact form.
```

**cURL Example**:
```bash
curl -X POST http://localhost:8080/contact \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=John Doe&email=john@example.com&message=Hello from the API"
```

**JavaScript Example**:
```javascript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('message', 'Hello from JavaScript');

fetch('/contact', {
  method: 'POST',
  body: formData
})
.then(response => response.text())
.then(html => {
  document.getElementById('result').innerHTML = html;
});
```

## Error Handling

### Standard Error Responses

#### 404 Not Found
```http
HTTP/1.1 404 Not Found
Content-Type: text/plain; charset=utf-8

Not Found
```

#### 500 Internal Server Error
```http
HTTP/1.1 500 Internal Server Error
Content-Type: text/plain; charset=utf-8

There was a problem with the contact form.
```

### Error Codes

| Status Code | Description | Common Causes |
|-------------|-------------|---------------|
| 200 | Success | Request completed successfully |
| 404 | Not Found | Asset not found in bundle or filesystem |
| 500 | Internal Server Error | Email sending failed, server error |

## Rate Limiting

Currently, no rate limiting is implemented. For production deployments, consider implementing rate limiting at the reverse proxy level (nginx, Cloudflare, etc.).

## CORS Headers

The server does not set CORS headers by default. For cross-origin requests, configure appropriate headers:

```javascript
// Add to main.js response headers
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}
```

## Performance Characteristics

### Response Times
- **Static Assets**: < 1ms (served from memory)
- **Contact Form**: 100-500ms (depends on email service)
- **Cold Start**: < 10ms (Bun executable)

### Memory Usage
- **Base Application**: ~30MB
- **Asset Bundle**: ~50MB
- **Total Runtime**: ~80MB

### Concurrent Connections
- **Default**: 1000 concurrent connections
- **Configurable**: Via Bun.serve options

## Email Configuration

### SMTP Settings
```javascript
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ADDR,
    pass: process.env.EMAIL_PASS
  }
});
```

### Email Template
```html
<!DOCTYPE html>
<html>
<body>
  <div>
    <h3>{name} ({email}) filled out the contact us form at knownastheway.com:</h3>
    <p>{message}</p>
  </div>
</body>
</html>
```

## Asset Bundling

All static assets are bundled into the executable at build time:

```javascript
// assets.js
export const assets = {
  html: { 'index.html': htmlContent },
  css: { 'style.css': cssContent },
  scripts: { 'app.js': jsContent },
  images: { 'logo.png': imageBinary }
};
```

## Development Tools

### Testing Endpoints

```bash
# Test homepage
curl -I http://localhost:8080/

# Test contact form
curl -X POST http://localhost:8080/contact \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "message=Test message"

# Test static assets
curl -I http://localhost:8080/css/style.css
curl -I http://localhost:8080/images/logo.png
```

### Debugging

Enable debug logging:
```javascript
// Add to main.js
console.log(`${request.method} ${url.pathname}`);
```

## Security Considerations

### Input Validation
- Form data is processed as-is
- Consider adding validation for production use
- Sanitize data before email sending

### Environment Variables
- Email credentials stored in environment variables
- Never commit credentials to version control

### HTTPS
- Configure HTTPS at reverse proxy level
- Use secure headers for production

## Migration from Express

### Key Differences
- No middleware stack
- Direct request/response handling
- Assets served from memory
- Simplified routing

### Express vs Bun Comparison
```javascript
// Express (old)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Bun (new)
if (pathname === '/') {
  return new Response(assets.html['index.html'], {
    headers: { 'Content-Type': 'text/html' }
  });
}
```

## Future Enhancements

- [ ] Add request logging
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Support for more email providers
- [ ] Add caching headers
- [ ] Implement compression
- [ ] Add health check endpoint
- [ ] Add metrics endpoint

---

For more information, see the [Architecture Documentation](architecture.md) or [Deployment Guide](deployment.md).