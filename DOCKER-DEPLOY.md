# LuminaRep - Docker Deployment Guide

Complete guide to deploying LuminaRep with Docker Compose on your own server.

---

## 🎯 Overview

This deployment uses:
- **Docker Compose** for container orchestration
- **PostgreSQL 16** for the database (self-hosted)
- **Next.js** app in production mode
- **No external dependencies** - everything runs on your server

---

## 📋 Prerequisites

- Server with Docker and Docker Compose installed
- Domain name pointing to your server
- Basic knowledge of Linux/SSH

---

## 🚀 Quick Start (5 minutes)

### 1. Install Docker (if not already installed)

```bash
# On Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt-get install docker-compose-plugin

# Verify installation
docker --version
docker compose version
```

### 2. Clone the Repository

```bash
git clone https://github.com/yourusername/luminarep.git
cd luminarep
```

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Generate a secure secret for NextAuth
openssl rand -base64 32

# Edit .env with your values
nano .env
```

**Required environment variables:**

```env
# PostgreSQL
POSTGRES_PASSWORD=choose_a_strong_password_here

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=paste_the_generated_secret_here

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Stripe (optional - for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# App URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 4. Launch the Application

```bash
# Build and start all services
docker compose up -d

# Check logs
docker compose logs -f

# Check status
docker compose ps
```

**That's it!** Your application is now running at `http://localhost:3000`

---

## 🌐 Connect Your Domain

### Option 1: Using Nginx (Recommended)

Install Nginx as a reverse proxy:

```bash
sudo apt-get install nginx certbot python3-certbot-nginx
```

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/luminarep
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/luminarep /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Get SSL Certificate (HTTPS)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Option 2: Using Caddy (Easier)

Install Caddy:

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

Create Caddyfile:

```bash
sudo nano /etc/caddy/Caddyfile
```

Add this configuration:

```
yourdomain.com {
    reverse_proxy localhost:3000
}
```

Reload Caddy:

```bash
sudo systemctl reload caddy
```

Caddy automatically handles HTTPS certificates!

---

## 🔧 Common Operations

### View Logs

```bash
# All services
docker compose logs -f

# Just the app
docker compose logs -f app

# Just the database
docker compose logs -f postgres
```

### Restart Services

```bash
# Restart everything
docker compose restart

# Restart just the app
docker compose restart app
```

### Update the Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker compose up -d --build
```

### Backup Database

```bash
# Create backup
docker compose exec postgres pg_dump -U luminarep luminarep > backup_$(date +%Y%m%d).sql

# Restore from backup
docker compose exec -T postgres psql -U luminarep luminarep < backup_20260109.sql
```

### Access Database

```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U luminarep -d luminarep

# Run a query
docker compose exec postgres psql -U luminarep -d luminarep -c "SELECT COUNT(*) FROM users;"
```

### Stop Everything

```bash
# Stop services (keeps data)
docker compose down

# Stop and remove data
docker compose down -v
```

---

## 📊 Monitoring

### Check Health

```bash
# App health
curl http://localhost:3000/api/health

# Database health
docker compose exec postgres pg_isready -U luminarep
```

### Resource Usage

```bash
# Check Docker stats
docker stats

# Check disk usage
docker system df
```

---

## 🔒 Security Checklist

- [ ] Change default PostgreSQL password
- [ ] Generate a strong NEXTAUTH_SECRET
- [ ] Enable firewall (UFW)
- [ ] Set up SSL/HTTPS
- [ ] Keep Docker and packages updated
- [ ] Set up automated backups
- [ ] Configure fail2ban (optional)

### Basic Firewall Setup

```bash
# Enable UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 🎛️ Environment-Specific Configuration

### Development

```bash
# Use docker-compose.override.yml for dev settings
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### Production

```bash
# Always use production .env
# Enable restart policies
# Set resource limits (optional)
```

---

## 🐛 Troubleshooting

### Database Connection Errors

```bash
# Check if postgres is running
docker compose ps postgres

# Check logs
docker compose logs postgres

# Verify connection string in .env
echo $DATABASE_URL
```

### App Won't Start

```bash
# Check build logs
docker compose logs app

# Rebuild from scratch
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Port Already in Use

```bash
# Find what's using port 3000
sudo lsof -i :3000

# Change port in docker-compose.yml
# Change "3000:3000" to "8080:3000"
```

---

## 📈 Scaling

### Horizontal Scaling

Add more app instances:

```yaml
# docker-compose.yml
services:
  app:
    deploy:
      replicas: 3
    # ... rest of config
```

### Database Performance

```yaml
# docker-compose.yml
services:
  postgres:
    command: postgres -c max_connections=200 -c shared_buffers=256MB
```

---

## 💰 Cost Estimation

Running on a VPS:

- **Small VPS (2GB RAM)**: $5-10/month (DigitalOcean, Linode, Hetzner)
- **Medium VPS (4GB RAM)**: $12-20/month (for higher traffic)
- **Gemini API**: Free tier or pay-as-you-go
- **Domain**: $10-15/year

**Total: ~$60-240/year**

Compare to Vercel + Supabase: ~$45-70/month ($540-840/year)

---

##Human: Continue with the doc