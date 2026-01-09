# Deployment Guide for LuminaRep

## Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)
- All API keys ready (Supabase, Gemini, Stripe)

### Step-by-Step Deployment

#### 1. Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - LuminaRep SaaS"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/luminarep.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel

1. **Visit [vercel.com](https://vercel.com) and sign in**

2. **Click "Add New Project"**

3. **Import your GitHub repository**

4. **Configure Project:**
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Add Environment Variables:**

Click "Environment Variables" and add ALL of these:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

6. **Click "Deploy"**

Wait 2-3 minutes for deployment to complete.

#### 3. Post-Deployment Configuration

##### Update Stripe Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Enter URL: `https://your-app.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Copy the webhook secret
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
7. Redeploy

##### Update Supabase Auth Redirect URLs

1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Add to "Site URL": `https://your-app.vercel.app`
3. Add to "Redirect URLs":
   - `https://your-app.vercel.app/auth/callback`
   - `https://your-app.vercel.app/dashboard`

##### Test Your Deployment

1. Visit `https://your-app.vercel.app`
2. Sign up for a test account
3. Create a test campaign
4. Verify content generation works
5. Test Stripe checkout (use test mode first)

---

## Alternative: Deploy to Other Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

Add the same environment variables in Netlify dashboard.

### Railway

1. Visit [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add environment variables
4. Deploy automatically

### Self-Hosted (VPS)

```bash
# On your server
git clone https://github.com/yourusername/luminarep.git
cd luminarep

# Install dependencies
npm install

# Create .env.local with all variables

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "luminarep" -- start
pm2 save
```

Use Nginx as reverse proxy:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Production Checklist

Before going live:

- [ ] All environment variables set correctly
- [ ] Supabase database schema executed
- [ ] Stripe products created ($99/month)
- [ ] Stripe webhook configured and tested
- [ ] Gemini API key valid and has quota
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic on Vercel)
- [ ] Email auth working in Supabase
- [ ] Test signup flow end-to-end
- [ ] Test campaign creation with real Google URLs
- [ ] Test Stripe payment flow
- [ ] Error monitoring set up (Sentry recommended)
- [ ] Analytics configured (Vercel Analytics)

---

## Maintenance

### Update Environment Variables

```bash
# In Vercel dashboard
Settings > Environment Variables > Edit

# After updating, redeploy:
Deployments > Three dots > Redeploy
```

### Monitor Performance

- **Vercel Analytics**: Real-time performance metrics
- **Supabase Logs**: Database queries and auth events
- **Stripe Dashboard**: Payment success/failure rates
- **Gemini API Console**: Token usage and quotas

### Backup Database

```bash
# Supabase automatic backups (paid plans)
# Or use pg_dump for manual backups

# From Supabase dashboard:
Database > Backups > Download
```

---

## Scaling Considerations

### When to Upgrade

- **100+ users**: Upgrade Supabase to Pro
- **1000+ campaigns/day**: Upgrade Gemini quota
- **$10k+ MRR**: Consider dedicated infrastructure

### Performance Optimization

1. **Enable Vercel Edge Functions** for API routes
2. **Implement caching** for generated content
3. **Add CDN** for static assets (automatic on Vercel)
4. **Database indexing** (already in schema)
5. **Rate limiting** on campaign creation

---

## Cost Estimation

### Monthly Costs (at scale)

- **Vercel Pro**: $20/month (optional, includes analytics)
- **Supabase Pro**: $25/month (beyond free tier)
- **Gemini API**: Pay-as-you-go (~$0.50 per 1M tokens)
- **Stripe**: 2.9% + $0.30 per transaction
- **Domain**: $12/year (optional)

**Total**: ~$45-70/month baseline + usage fees

### Revenue Projection

- 10 customers × $99 = $990/month
- 50 customers × $99 = $4,950/month
- 100 customers × $99 = $9,900/month

Even at 10 customers, you're profitable.

---

**Good luck with your launch! 🚀**
