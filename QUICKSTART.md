# LuminaRep - Quick Start Guide

Get LuminaRep running locally in **5 minutes**.

---

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free)
- A Google Gemini API key (free)

---

## Step 1: Get Your API Keys

### Supabase (30 seconds)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy these from Settings > API:
   - Project URL
   - `anon` public key
   - `service_role` secret key

### Google Gemini (30 seconds)

1. Go to [ai.google.dev](https://ai.google.dev)
2. Click "Get API Key"
3. Copy your API key

---

## Step 2: Set Up Database (2 minutes)

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

---

## Step 3: Configure Environment (1 minute)

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Leave Stripe keys as placeholders for now (optional feature)

---

## Step 4: Install & Run (1 minute)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Open [http://localhost:3000](http://localhost:3000)**

---

## Step 5: Test It Out

1. **Sign Up**: Click "Start Free Trial" and create an account
2. **Create Campaign**:
   - Click "New Campaign"
   - Name: "Test Campaign"
   - URL: Any Google Maps URL (demo data will be used)
   - Click "Generate Content"
3. **View Results**: Wait 5-10 seconds, then click on your campaign to see:
   - 3 Instagram caption variations
   - Video script for Reels/TikTok
   - Image generation prompt for DALL-E/Midjourney

---

## What Just Happened?

✅ Built a complete Next.js 15 application
✅ Set up Supabase authentication and database
✅ Integrated Google Gemini AI for content generation
✅ Created a luxury dark mode UI with Tailwind CSS
✅ Built a professional campaign management dashboard

---

## Next Steps

### Enable Real Review Scraping (Optional)

Currently using demo data. To scrape real reviews:

1. Sign up for [SerpAPI](https://serpapi.com) (free tier available)
2. Add `SERPAPI_KEY` to `.env.local`
3. Uncomment the SerpAPI code in `/lib/review-scraper.ts`

### Enable Stripe Payments (Optional)

1. Create a [Stripe](https://stripe.com) account
2. Add Stripe keys to `.env.local`
3. Create a product at $99/month
4. Copy the Price ID to `.env.local`
5. Test with card: `4242 4242 4242 4242`

### Deploy to Production

See `DEPLOYMENT.md` for detailed deployment instructions to Vercel.

---

## Troubleshooting

**"Failed to fetch" on signup**
- Check Supabase URL and keys are correct
- Verify SQL schema was executed

**"Content generation failed"**
- Verify Gemini API key is valid
- Check browser console for errors

**Build errors**
- Run `npm install` again
- Delete `.next` folder and rebuild

---

## Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── auth/page.tsx         # Sign in/up
│   ├── dashboard/page.tsx    # Main dashboard
│   └── api/                  # API routes
├── lib/
│   ├── content-generator.ts  # Gemini AI integration
│   ├── review-scraper.ts     # Google review scraper
│   ├── stripe.ts             # Payment integration
│   └── supabase.ts           # Database client
└── supabase-schema.sql       # Database schema
```

---

## Key Features Implemented

✅ **Landing Page** - Professional B2B SaaS marketing copy
✅ **Authentication** - Email/password via Supabase Auth
✅ **Campaign Management** - Create and organize review campaigns
✅ **Content Generation** - AI-powered captions, scripts, and image prompts
✅ **Copy-to-Clipboard** - One-click copying of all assets
✅ **Stripe Integration** - Ready for $99/month subscriptions
✅ **Luxury UI** - Dark mode with emerald and gold accents
✅ **Production Ready** - Type-safe, scalable architecture

---

## Commands Reference

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Lint code
```

---

## Support

- **Documentation**: See `README.md` for full details
- **Deployment**: See `DEPLOYMENT.md` for production setup
- **Database**: Check `supabase-schema.sql` for schema reference

---

**Ready to launch your Micro-SaaS? You're already 95% there. 🚀**

Just configure your production environment variables and deploy to Vercel!
