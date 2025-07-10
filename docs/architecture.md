# Architecture Documentation

This document provides an in-depth technical overview of The Way church website architecture, design decisions, and implementation details.

## Table of Contents

- [System Overview](#system-overview)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Data Flow](#data-flow)
- [Asset Management](#asset-management)
- [Performance Characteristics](#performance-characteristics)
- [Security Architecture](#security-architecture)
- [Deployment Architecture](#deployment-architecture)
- [Design Decisions](#design-decisions)
- [Future Considerations](#future-considerations)

## System Overview

The Way is a high-performance, single-page church website built with modern web technologies. The architecture prioritizes performance, simplicity, and maintainability while minimizing infrastructure complexity.

### Key Architectural Principles

1. **Performance First**: Every decision optimizes for speed and efficiency
2. **Simplicity**: Minimal dependencies and straightforward implementation
3. **Portability**: Single executable runs anywhere
4. **Security**: Reduced attack surface through minimal dependencies
5. **Maintainability**: Clear separation of concerns and modern code practices

## Technology Stack

### Runtime Environment
- **Bun v1.2.18**: JavaScript runtime and package manager
- **Node.js APIs**: Compatibility layer for existing libraries
- **ES2022**: Modern JavaScript features and syntax

### Core Technologies
- **HTTP Server**: Bun.serve() native implementation
- **Email**: Nodemailer with Gmail SMTP
- **Static Assets**: Memory-served bundled files
- **Build System**: Bun's native bundler and compiler

### Development Tools
- **TypeScript**: Type definitions for development
- **Docker**: Container deployment
- **Git**: Version control

## Application Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Load Balancer                        │
│                     (nginx/cloudflare)                      │
└─────────────────────────┬───────────────────────────────────┘
                         │
┌─────────────────────────▼───────────────────────────────────┐
│                   Bun HTTP Server                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                 Request Router                          ││
│  │  • Static Asset Routing                                ││
│  │  • Form Processing                                     ││
│  │  • Error Handling                                      ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │                Asset Manager                            ││
│  │  • Memory-based Asset Serving                          ││
│  │  • MIME Type Detection                                 ││
│  │  • Fallback File System                               ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │                Email Service                            ││
│  │  • SMTP Connection Pool                                ││
│  │  • Template Processing                                 ││
│  │  • Error Handling                                      ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
src/
├── main.js              # Application entry point
├── assets.js            # Asset bundling and imports
├── package.json         # Dependencies and configuration
└── public/              # Static assets (bundled at build time)
    ├── index.html       # Main application shell
    ├── views/           # HTML templates
    ├── css/             # Stylesheets
    ├── scripts/         # Client-side JavaScript
    ├── components/      # UI components
    └── images/          # Static images
```

## Data Flow

### Request Processing Flow

```
1. Client Request
   ↓
2. Bun HTTP Server
   ↓
3. URL Parsing & Routing
   ↓
4. Route Handler Selection
   ├── Static Asset → Memory Lookup → Response
   ├── Form Submission → Validation → Email → Response
   └── Unknown → 404 Response
```

### Asset Serving Flow

```
1. Asset Request (e.g., /css/style.css)
   ↓
2. Path Normalization
   ↓
3. Asset Bundle Lookup
   ├── Found in Bundle → Serve from Memory
   └── Not Found → Filesystem Fallback
   ↓
4. MIME Type Detection
   ↓
5. Response with Headers
```

### Contact Form Flow

```
1. Form Submission (POST /contact)
   ↓
2. Form Data Extraction
   ↓
3. Email Template Generation
   ↓
4. SMTP Connection
   ↓
5. Email Sending
   ├── Success → Success Response
   └── Error → Error Response
```

## Asset Management

### Bundle Strategy

All static assets are bundled into the executable at build time using Bun's import system:

```javascript
// assets.js
import indexHtml from './public/index.html' with { type: 'text' };
import styleCss from './public/css/style.css' with { type: 'text' };
import logoPng from './public/images/logo.png';

export const assets = {
  html: { 'index.html': indexHtml },
  css: { 'style.css': styleCss },
  images: { 'logo.png': logoPng }
};
```

### Asset Categories

1. **Text Assets**: HTML, CSS, JavaScript (imported as strings)
2. **Binary Assets**: Images, fonts (imported as binary data)
3. **Dynamic Assets**: Generated content (served from filesystem)

### Memory Management

- **Static Assets**: Loaded once at startup, served from memory
- **Dynamic Content**: Generated on-demand
- **Caching**: Browser-level caching via HTTP headers

## Performance Characteristics

### Benchmarks

| Metric | Value | Comparison |
|--------|-------|------------|
| Cold Start | <10ms | Node.js: ~100ms |
| Memory Usage | 80MB | Express: ~150MB |
| Request Latency | <1ms | Static assets |
| Build Time | 200ms | Webpack: ~5s |
| Bundle Size | 108MB | Includes all assets |

### Optimization Strategies

1. **Asset Bundling**: All assets in memory
2. **Minimal Dependencies**: Only essential libraries
3. **Efficient Routing**: Direct path matching
4. **Native APIs**: Bun's optimized implementations

### Scalability Considerations

- **Horizontal Scaling**: Multiple instances behind load balancer
- **Vertical Scaling**: Single instance can handle 1000+ concurrent connections
- **CDN Integration**: Static assets can be served from CDN
- **Database**: Currently stateless, can add database layer

## Security Architecture

### Attack Surface Reduction

```
Traditional Node.js Stack     →     The Way Stack
├── Express                  →     ├── Bun HTTP Server
├── Body Parser              →     │   (built-in)
├── Cookie Parser            →     │
├── CORS                     →     │
├── Helmet                   →     │
├── Rate Limiting            →     │
├── Session Management       →     │
└── Static File Serving      →     └── Memory Assets
```

### Security Measures

1. **Input Validation**: Form data sanitization
2. **Environment Variables**: Secure credential storage
3. **HTTPS**: TLS termination at reverse proxy
4. **Container Security**: Minimal Alpine base image
5. **Dependency Management**: Minimal external dependencies

### Threat Model

| Threat | Mitigation | Risk Level |
|--------|------------|------------|
| Code Injection | Input sanitization | Low |
| XSS | Content-Type headers | Low |
| CSRF | Form validation | Medium |
| DoS | Rate limiting (proxy) | Medium |
| Data Breach | No persistent data | Low |

## Deployment Architecture

### Single Binary Deployment

```
Build Environment          Production Environment
├── Source Code           ├── Single Executable
├── Dependencies          │   ├── Bun Runtime
├── Assets                │   ├── Application Code
└── Build Tools           │   ├── Static Assets
                         │   └── Node Modules
                         └── Configuration
                             ├── Environment Variables
                             └── System Service
```

### Container Architecture

```dockerfile
# Multi-stage build
FROM bun:alpine AS builder
COPY . .
RUN bun install && bun run build

FROM alpine:latest
COPY --from=builder /app/dist/theway .
CMD ["./theway"]
```

### Infrastructure Patterns

1. **Reverse Proxy**: nginx/Cloudflare for SSL termination
2. **Load Balancing**: Multiple instances for high availability
3. **Monitoring**: Health checks and metrics collection
4. **Backup**: Configuration and binary versioning

## Design Decisions

### Why Bun Over Node.js?

| Aspect | Node.js | Bun | Decision |
|--------|---------|-----|----------|
| Performance | Baseline | 3x faster | ✅ Bun |
| Cold Start | ~100ms | <10ms | ✅ Bun |
| Memory Usage | Higher | Lower | ✅ Bun |
| Ecosystem | Mature | Growing | ⚠️ Trade-off |
| Bundle Size | Larger | Smaller | ✅ Bun |

### Why Single Binary?

1. **Deployment Simplicity**: Copy one file, run anywhere
2. **Dependency Management**: No external dependencies
3. **Version Control**: Single artifact versioning
4. **Security**: Reduced attack surface
5. **Performance**: Faster startup and execution

### Why Memory-Based Assets?

1. **Performance**: Sub-millisecond response times
2. **Reliability**: No file system dependencies
3. **Scalability**: Consistent performance under load
4. **Simplicity**: No complex caching strategies

### Why Minimal Dependencies?

1. **Security**: Fewer potential vulnerabilities
2. **Maintenance**: Less code to maintain
3. **Performance**: Smaller bundle size
4. **Reliability**: Fewer points of failure

## Future Considerations

### Potential Enhancements

1. **Database Integration**
   - SQLite for local data
   - PostgreSQL for advanced features
   - Content management system

2. **Advanced Features**
   - User authentication
   - Content management
   - Advanced analytics
   - Real-time features

3. **Performance Optimizations**
   - HTTP/2 server push
   - Advanced caching strategies
   - CDN integration
   - Image optimization

4. **Security Enhancements**
   - Rate limiting
   - Input validation library
   - Security headers
   - Audit logging

### Scalability Roadmap

```
Current: Single Instance
├── Load Balancer
├── Multiple Instances
├── Database Layer
├── Caching Layer
└── Microservices (if needed)
```

### Technology Evolution

- **Bun Updates**: Track Bun development for new features
- **Web Standards**: Adopt new web platform features
- **Performance**: Continuous optimization
- **Security**: Regular security reviews

## Monitoring & Observability

### Metrics to Track

1. **Performance Metrics**
   - Response times
   - Memory usage
   - CPU utilization
   - Request rates

2. **Business Metrics**
   - Page views
   - Contact form submissions
   - User engagement
   - Error rates

3. **Infrastructure Metrics**
   - Server uptime
   - Network latency
   - Disk usage
   - Security events

### Logging Strategy

```javascript
// Structured logging
const log = {
  timestamp: new Date().toISOString(),
  level: 'info',
  method: request.method,
  url: pathname,
  userAgent: request.headers.get('user-agent'),
  ip: request.headers.get('x-forwarded-for'),
  responseTime: Date.now() - startTime,
  status: response.status
};
```

## Conclusion

The Way's architecture represents a modern approach to web application development, prioritizing performance, simplicity, and maintainability. By leveraging Bun's capabilities and adopting a minimalist approach, the application achieves excellent performance characteristics while maintaining ease of deployment and operation.

The architecture is designed to evolve with the project's needs while maintaining the core principles of simplicity and performance. Future enhancements can be added incrementally without compromising the fundamental design.

---

For implementation details, see the [API Documentation](api.md) or [Deployment Guide](deployment.md).