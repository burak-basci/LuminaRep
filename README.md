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
- ✅ **AI-Powered Content Generation** - Gemini-powered copywriting for luxury aesthetics brands
- ✅ **Campaign Management** - Organize and track all your content campaigns in one dashboard
- ✅ **Copy-to-Clipboard Assets** - One click to copy any caption, script, or prompt
- ✅ **Unlimited Generation** - No limits on campaigns or content creation

### Technical Stack
- **Framework:** Next.js 15 (App Router) with TypeScript
- **Styling:** Tailwind CSS (Luxury Dark Mode)
- **Database:** Supabase (PostgreSQL + Auth)
- **AI Engine:** Google Gemini Pro
- **Payments:** Stripe (Subscriptions + Webhooks)
- **Deployment:** Vercel-ready

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ and npm
- **Supabase Account** (free tier works)
- **Google Gemini API Key** (free tier available)
- **Stripe Account** (test mode for development)

---

## 🛠️ Installation & Setup

### 1. Clone and Install

```bash
# You're already in the project directory
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Run the database schema:
   - Go to SQL Editor in Supabase Dashboard
   - Copy the contents of `supabase-schema.sql`
   - Execute the SQL
4. Enable Email Auth:
   - Go to Authentication > Providers
   - Enable Email provider
   - Configure email templates (optional)

### 3. Get Google Gemini API Key

1. Visit [ai.google.dev](https://ai.google.dev)
2. Click "Get API Key"
3. Create a new API key
4. Copy the key

### 4. Set Up Stripe

1. Create account at [stripe.com](https://stripe.com)
2. Get your API keys from Dashboard > Developers > API keys
3. Create a product:
   - Products > Add Product
   - Name: "LuminaRep Professional"
   - Price: $99/month (recurring)
   - Copy the Price ID
4. Set up webhook endpoint (after deployment):
   - Developers > Webhooks > Add endpoint
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## 📁 Project Structure

```
LuminaRep/
├── app/
│   ├── api/
│   │   ├── campaigns/create/    # Campaign creation endpoint
│   │   └── stripe/              # Stripe integration
│   ├── auth/                    # Authentication pages
│   ├── dashboard/               # Main dashboard
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── components/                  # Reusable components
├── lib/
│   ├── auth.ts                  # Supabase auth utilities
│   ├── content-generator.ts    # Gemini AI integration
│   ├── review-scraper.ts       # Google review scraper
│   ├── stripe.ts               # Stripe utilities
│   └── supabase.ts             # Supabase client
├── supabase-schema.sql         # Database schema
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

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add all environment variables from `.env.local`
5. Deploy

Your app will be live at `https://your-app.vercel.app`

### Post-Deployment

1. Update `NEXT_PUBLIC_APP_URL` in environment variables
2. Configure Stripe webhook with your production URL
3. Test the complete flow with Stripe test mode
4. Switch to Stripe live mode when ready

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

### Rate Limiting

Consider adding rate limiting for:
- Campaign creation (e.g., 5 per hour)
- API endpoints (use Vercel's built-in protection)

### Monitoring

Set up error tracking:
- [Sentry](https://sentry.io) for error monitoring
- Vercel Analytics for performance
- Stripe Dashboard for payment monitoring

---

## 🧪 Testing

### Test Authentication
```bash
1. Visit http://localhost:3000/auth
2. Sign up with a test email
3. Check Supabase dashboard for new user
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
1. Add Stripe keys to .env.local
2. Use test card: 4242 4242 4242 4242
3. Any future expiry date and CVC
```

---

## 🐛 Troubleshooting

### "Cannot find module @google/generative-ai"
```bash
npm install @google/generative-ai
```

### Supabase Auth Errors
- Verify your Supabase URL and keys
- Check that email provider is enabled
- Run the SQL schema again

### Stripe Webhook Not Working
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Verify webhook secret matches `.env.local`

### Content Generation Fails
- Check Gemini API key is valid
- Verify API quota (free tier has limits)
- Check console for error messages

---

## 📝 License

This is a proprietary SaaS product. All rights reserved.

---

## 🤝 Support

For issues or questions:
- Check the troubleshooting section above
- Review Supabase/Stripe documentation
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

**Built with ❤️ for medical aesthetics professionals who refuse to let their reputation go to waste.**
