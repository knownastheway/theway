# Deployment Guide

This comprehensive guide covers all deployment options for The Way church website, from local development to production hosting.

## Table of Contents

- [Quick Deploy](#quick-deploy)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Docker Deployment](#docker-deployment)
- [Cloud Platforms](#cloud-platforms)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Maintenance](#monitoring--maintenance)

## Quick Deploy

For the impatient, here's a 30-second deployment:

```bash
# Clone and build
git clone https://github.com/knownastheway/theway.git
cd theway
bun install
bun run build

# Run anywhere
./dist/theway
```

## Local Development

### Prerequisites

- [Bun](https://bun.sh/) v1.2.18 or higher
- [Git](https://git-scm.com/) for version control
- [Docker](https://docker.com/) or [Podman](https://podman.io/) (optional)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/knownastheway/theway.git
   cd theway
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Environment configuration**:
   ```bash
   # Create environment file
   cp .env.example .env
   
   # Edit with your settings
   nano .env
   ```

4. **Start development server**:
   ```bash
   bun run dev
   ```

### Development Environment Variables

```bash
# .env file
PORT=8080
NODE_ENV=development

# Email configuration (optional for development)
EMAIL_ADDR=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Production Deployment

### Single Binary Deployment

The easiest deployment method - a single executable file:

```bash
# Build the executable
bun run build

# Copy to your server
scp dist/theway user@server:/opt/theway/

# Run on server
ssh user@server 'chmod +x /opt/theway/theway && /opt/theway/theway'
```

### Systemd Service (Linux)

Create a systemd service for automatic startup:

```ini
# /etc/systemd/system/theway.service
[Unit]
Description=The Way Church Website
After=network.target

[Service]
Type=simple
User=theway
Group=theway
WorkingDirectory=/opt/theway
ExecStart=/opt/theway/theway
Restart=always
RestartSec=10

# Environment variables
Environment=NODE_ENV=production
Environment=PORT=8080
Environment=EMAIL_ADDR=your-email@gmail.com
Environment=EMAIL_PASS=your-app-password

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ReadWritePaths=/opt/theway/logs

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable theway
sudo systemctl start theway
sudo systemctl status theway
```

### Reverse Proxy Setup

#### Nginx Configuration

```nginx
# /etc/nginx/sites-available/theway
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Proxy to Bun server
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://127.0.0.1:8080;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/theway /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Docker Deployment

### Basic Docker Deployment

```bash
# Build image
docker build -t theway:latest .

# Run container
docker run -d \
  --name theway \
  -p 8080:8080 \
  -e EMAIL_ADDR=your-email@gmail.com \
  -e EMAIL_PASS=your-app-password \
  --restart unless-stopped \
  theway:latest
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  theway:
    build: .
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - EMAIL_ADDR=${EMAIL_ADDR}
      - EMAIL_PASS=${EMAIL_PASS}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - theway
    restart: unless-stopped
```

Start with:
```bash
docker-compose up -d
```

### Kubernetes Deployment

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: theway
  labels:
    app: theway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: theway
  template:
    metadata:
      labels:
        app: theway
    spec:
      containers:
      - name: theway
        image: theway:latest
        ports:
        - containerPort: 8080
        env:
        - name: NODE_ENV
          value: "production"
        - name: EMAIL_ADDR
          valueFrom:
            secretKeyRef:
              name: email-secret
              key: email-addr
        - name: EMAIL_PASS
          valueFrom:
            secretKeyRef:
              name: email-secret
              key: email-pass
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: theway-service
spec:
  selector:
    app: theway
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer
```

## Cloud Platforms

### Fly.io

1. **Install Fly CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login and initialize**:
   ```bash
   fly auth login
   fly launch
   ```

3. **Configure fly.toml**:
   ```toml
   app = "theway"
   primary_region = "sjc"
   
   [build]
   
   [env]
     NODE_ENV = "production"
     PORT = "8080"
   
   [http_service]
     internal_port = 8080
     force_https = true
     auto_stop_machines = true
     auto_start_machines = true
     min_machines_running = 0
     processes = ["app"]
   
   [[vm]]
     cpu_kind = "shared"
     cpus = 1
     memory_mb = 256
   ```

4. **Set secrets**:
   ```bash
   fly secrets set EMAIL_ADDR=your-email@gmail.com
   fly secrets set EMAIL_PASS=your-app-password
   ```

5. **Deploy**:
   ```bash
   fly deploy
   ```

### Vercel

```json
{
  "name": "theway",
  "version": 2,
  "builds": [
    {
      "src": "main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Railway

```yaml
# railway.toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "bun run start"
restartPolicyType = "on-failure"
restartPolicyMaxRetries = 10
```

### Digital Ocean App Platform

```yaml
# .do/app.yaml
name: theway
services:
- name: web
  source_dir: /
  github:
    repo: your-username/theway
    branch: main
  run_command: bun run start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: EMAIL_ADDR
    value: your-email@gmail.com
    type: SECRET
  - key: EMAIL_PASS
    value: your-app-password
    type: SECRET
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Bun
      uses: oven-sh/setup-bun@v1
      with:
        bun-version: 1.2.18
    
    - name: Install dependencies
      run: bun install
    
    - name: Build application
      run: bun run build
    
    - name: Test build
      run: timeout 10s ./dist/theway || exit 0

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Bun
      uses: oven-sh/setup-bun@v1
      with:
        bun-version: 1.2.18
    
    - name: Build for production
      run: |
        bun install
        bun run build
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /opt/theway
          wget -O theway-new https://github.com/your-username/theway/releases/latest/download/theway
          chmod +x theway-new
          sudo systemctl stop theway
          mv theway-new theway
          sudo systemctl start theway
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  BUN_VERSION: "1.2.18"

test:
  stage: test
  image: oven/bun:${BUN_VERSION}
  script:
    - bun install
    - bun run build
    - timeout 10s ./dist/theway || exit 0

build:
  stage: build
  image: oven/bun:${BUN_VERSION}
  script:
    - bun install
    - bun run build
  artifacts:
    paths:
      - dist/theway
    expire_in: 1 hour

deploy:
  stage: deploy
  script:
    - scp dist/theway user@${SERVER_HOST}:/opt/theway/theway-new
    - ssh user@${SERVER_HOST} 'cd /opt/theway && sudo systemctl stop theway && mv theway-new theway && sudo systemctl start theway'
  only:
    - main
```

## Monitoring & Maintenance

### Health Checks

Add a health check endpoint:

```javascript
// In main.js
if (pathname === '/health') {
  return new Response(JSON.stringify({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### Logging

```javascript
// Add request logging
console.log(`${new Date().toISOString()} ${request.method} ${pathname} ${response.status}`);
```

### Monitoring Tools

- **Uptime monitoring**: UptimeRobot, Pingdom
- **Performance monitoring**: New Relic, DataDog
- **Error tracking**: Sentry, Rollbar
- **Log aggregation**: ELK Stack, Fluentd

### Backup Strategy

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups/theway"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup binary
cp /opt/theway/theway $BACKUP_DIR/theway_$DATE

# Backup configuration
cp /opt/theway/.env $BACKUP_DIR/env_$DATE

# Cleanup old backups (keep last 30 days)
find $BACKUP_DIR -name "theway_*" -mtime +30 -delete
```

### SSL Certificate Renewal

```bash
#!/bin/bash
# renew-ssl.sh
certbot renew --quiet
systemctl reload nginx
```

Add to crontab:
```bash
0 0 * * * /opt/scripts/renew-ssl.sh
```

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Find process using port
   lsof -i :8080
   
   # Kill process
   kill -9 PID
   ```

2. **Email not sending**:
   ```bash
   # Check environment variables
   printenv | grep EMAIL
   
   # Test SMTP connection
   telnet smtp.gmail.com 587
   ```

3. **Memory issues**:
   ```bash
   # Monitor memory usage
   ps aux | grep theway
   
   # Check system resources
   htop
   ```

### Performance Tuning

```bash
# System limits
ulimit -n 65536  # Increase file descriptor limit

# Network tuning
echo 'net.core.somaxconn = 1024' >> /etc/sysctl.conf
sysctl -p
```

## Security Checklist

- [ ] SSL/TLS certificates configured
- [ ] Firewall configured (ports 80, 443, 22 only)
- [ ] Regular security updates
- [ ] Strong passwords and SSH keys
- [ ] Environment variables secured
- [ ] Regular backups
- [ ] Monitoring in place
- [ ] Rate limiting configured
- [ ] Input validation implemented

---

For more detailed information, see the [API Documentation](api.md) or [Architecture Guide](architecture.md).