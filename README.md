# LuminaRep - Automated Social Proof Engine

![LuminaRep Banner](https://via.placeholder.com/1200x400/0a0a0a/10b981?text=LuminaRep)

**Transform your Google Reviews into professional marketing assets in 60 seconds.**

LuminaRep is a premium SaaS platform designed specifically for medical aesthetics practices, cosmetic surgeons, and boutique dentists who want to automate their social proof into revenue-driving content.

---

## 🎯 What It Does

LuminaRep automatically converts your 5-star Google Reviews into:

- **3 Variations of Elite Instagram Captions** - Professional, conversion-optimized copy
- **Short-form Video Scripts** - Ready-to-shoot Reels/TikTok content
- **AI Image Generation Prompts** - Custom prompts for DALL-E, Midjourney, or Stable Diffusion

No copywriter needed. No manual work. Just paste your Google Business URL and let AI do the heavy lifting.

---

## 🚀 Features

### Core Functionality
- ✅ **One-Click Review Import** - Paste Google Business URL, extract 5-star reviews automatically
- ✅ **AI-Powered Content Generation** - Powered by Google Gemini:
  - 3 variations of luxury Instagram captions
  - TikTok/Reels video scripts with visual cues
  - Custom image generation prompts for DALL-E/Midjourney
- ✅ **Campaign Management Dashboard** - Full-featured interface with copy-to-clipboard
- ✅ **User Authentication** - Secure email/password via NextAuth
- ✅ **Stripe Subscriptions** - $99/month with 7-day free trial
- ✅ **Luxury Dark Mode UI** - Emerald & Gold accent colors, professional B2B design

### Technical Stack
- **Framework:** Next.js 15 (App Router) with TypeScript
- **Database:** PostgreSQL (self-hosted via Docker)
- **Authentication:** NextAuth.js
- **AI Engine:** Google Gemini Pro
- **Payments:** Stripe (Subscriptions + Webhooks)
- **Styling:** Tailwind CSS with custom design system
- **Deployment:** Docker Compose (fully self-hosted)

---

## 📋 Prerequisites

- **Docker & Docker Compose** installed
- **Node.js 18+** and npm (for local development)
- **Google Gemini API Key** (free tier available)
- **Stripe Account** (for payments - optional)

---

## 🛠️ Quick Start (Docker - Recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/luminarep.git
cd luminarep
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Generate NextAuth secret
openssl rand -base64 32

# Edit .env with your values
nano .env
```

**Required variables:**
```env
POSTGRES_PASSWORD=your_secure_password
NEXTAUTH_SECRET=your_generated_secret_here
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Launch with Docker

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Check status
docker compose ps
```

**That's it!** Visit [http://localhost:3000](http://localhost:3000)

---

## 💻 Local Development (Without Docker)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up PostgreSQL

You need a PostgreSQL database. Either:

**Option A: Use Docker for DB only**
```bash
docker run -d \
  --name luminarep-postgres \
  -e POSTGRES_DB=luminarep \
  -e POSTGRES_USER=luminarep \
  -e POSTGRES_PASSWORD=changeme \
  -p 5432:5432 \
  postgres:16-alpine
```

**Option B: Install PostgreSQL locally**
```bash
# On Ubuntu/Debian
sudo apt-get install postgresql

# Create database
sudo -u postgres createdb luminarep
sudo -u postgres createuser luminarep
```

### 3. Run Database Schema

```bash
# Connect to PostgreSQL
psql -U luminarep -d luminarep < schema.sql
```

### 4. Configure Environment

```bash
cp .env.example .env.local

# Edit with your values
nano .env.local
```

```env
DATABASE_URL=postgresql://luminarep:changeme@localhost:5432/luminarep
NEXTAUTH_SECRET=your_secret_here
GEMINI_API_KEY=your_gemini_key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Production Deployment

### Self-Hosted with Docker

See **[DOCKER-DEPLOY.md](./DOCKER-DEPLOY.md)** for complete production deployment guide including:
- Setting up your server
- Configuring your domain
- HTTPS with Nginx/Caddy
- Database backups
- Monitoring

**Key Steps:**
1. Get a VPS (DigitalOcean, Hetzner, Linode - $5-10/month)
2. Point your domain to the server
3. Clone repo and configure `.env`
4. Run `docker compose up -d`
5. Set up Nginx/Caddy for HTTPS
6. Configure Stripe webhooks

---

## 📁 Project Structure

```
LuminaRep/
├── app/
│   ├── api/
│   │   ├── auth/              # NextAuth + signup
│   │   ├── campaigns/          # Campaign management
│   │   ├── stripe/             # Payment integration
│   │   └── health/             # Health check
│   ├── auth/                   # Authentication pages
│   ├── dashboard/              # Main dashboard
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
├── lib/
│   ├── db.ts                   # PostgreSQL client
│   ├── auth-helpers.ts         # Auth utilities
│   ├── content-generator.ts    # Gemini AI integration
│   ├── review-scraper.ts       # Google review scraper
│   └── stripe.ts               # Stripe utilities
├── docker-compose.yml          # Docker orchestration
├── Dockerfile                  # App container
├── schema.sql                  # Database schema
├── .env.example                # Environment template
└── README.md                   # You are here
```

---

## 🎨 Design System

LuminaRep uses a luxury dark mode aesthetic with:

- **Primary Color:** Emerald (`#10b981`)
- **Accent Color:** Gold (`#fbbf24`)
- **Background:** Deep Black (`#0a0a0a`)
- **Typography:** Inter font family
- **Components:** Pre-built Tailwind utilities (`.btn-primary`, `.card`, `.input`)

---

## 🔧 Customization

### Modify AI Prompts

Edit `/lib/content-generator.ts` to customize:
- Caption tone and style
- Video script format
- Image prompt aesthetics

### Change Branding

Edit `/app/globals.css` to modify:
- Color scheme
- Typography
- Component styles

### Adjust Pricing

Update Stripe product and modify:
- Landing page pricing section (`/app/page.tsx`)
- Environment variable `STRIPE_PRICE_ID`

---

## 🧪 Testing

### Test Authentication
```bash
1. Visit http://localhost:3000/auth
2. Sign up with a test email
3. Check PostgreSQL for new user
```

### Test Campaign Creation
```bash
1. Sign in to dashboard
2. Click "New Campaign"
3. Enter any Google Maps URL (uses demo data)
4. Wait for content generation
5. View generated captions, scripts, and prompts
```

### Test Stripe (Optional)
```bash
1. Add Stripe keys to .env
2. Use test card: 4242 4242 4242 4242
3. Any future expiry date and CVC
```

---

## 📊 Production Considerations

### Google Review Scraping

The current implementation uses **demo data**. For production:

1. **Integrate a scraping service:**
   - [SerpAPI](https://serpapi.com/google-maps-reviews) - Recommended
   - [Apify](https://apify.com/compass/google-maps-reviews-scraper)
   - [Outscraper](https://outscraper.com/google-maps-reviews-scraper/)

2. **Update `/lib/review-scraper.ts`:**
   - Uncomment the SerpAPI implementation
   - Add `SERPAPI_KEY` to environment variables
   - Test with real Google Business URLs

### Monitoring

- **Health endpoint:** `GET /api/health`
- **Docker stats:** `docker stats`
- **Logs:** `docker compose logs -f`
- Consider adding Sentry for error tracking

---

## 💰 Cost Comparison

### Self-Hosted (This Setup)
- **VPS (2-4GB RAM):** $5-10/month
- **Domain:** $10-15/year
- **Gemini API:** Free tier or pay-as-you-go
- **Total:** ~$60-120/year

### Cloud SaaS (Vercel + Supabase)
- **Vercel Pro:** $20/month
- **Supabase Pro:** $25/month
- **Total:** ~$540/year

**You save $400-480/year by self-hosting!**

---

## 🐛 Troubleshooting

### Database Connection Errors
```bash
# Check if postgres is running
docker compose ps postgres

# View logs
docker compose logs postgres

# Test connection
docker compose exec postgres psql -U luminarep -d luminarep -c "SELECT 1"
```

### App Won't Start
```bash
# Rebuild from scratch
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Port Already in Use
```bash
# Find what's using port 3000
sudo lsof -i :3000

# Or change port in docker-compose.yml
```

---

## 📝 License

This is a proprietary SaaS product. All rights reserved.

---

## 🤝 Support

For issues or questions:
- Check [DOCKER-DEPLOY.md](./DOCKER-DEPLOY.md) for deployment help
- Review the troubleshooting section above
- Verify all environment variables are set correctly

---

## 🎯 Roadmap

Future enhancements:
- [ ] Multi-language support
- [ ] Custom brand voice training
- [ ] Direct social media posting
- [ ] Analytics dashboard
- [ ] Team collaboration features
- [ ] API for third-party integrations

---

**Built for medical aesthetics professionals who refuse to let their reputation go to waste.**

**Fully self-hosted. No vendor lock-in. Complete control.**
