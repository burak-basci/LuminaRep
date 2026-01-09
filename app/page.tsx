"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Navigation */}
      <nav className="border-b border-luxury-border">
        <div className="container-luxury py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
            <span className="text-2xl font-bold gradient-text">LuminaRep</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/auth" className="btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section">
        <div className="container-luxury text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Transform Patient Reviews Into
              <span className="block gradient-text">Revenue-Driving Content</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Automated social proof engine for medical aesthetics. Turn your Google Reviews
              into professional marketing assets in seconds—no copywriter needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth" className="btn-primary text-lg px-8 py-4">
                Start Free Trial
              </Link>
              <Link href="#demo" className="btn-secondary text-lg px-8 py-4">
                See Demo
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-12 border-y border-luxury-border">
        <div className="container-luxury">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text">500+</div>
              <div className="text-gray-400 mt-2">Practices Using LuminaRep</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">50K+</div>
              <div className="text-gray-400 mt-2">Marketing Assets Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">3.2x</div>
              <div className="text-gray-400 mt-2">Average Engagement Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="section" id="features">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Your Reputation is Your Best Marketing Asset
            </h2>
            <p className="text-xl text-gray-400">
              Yet 90% of medical aesthetics practices let their 5-star reviews sit idle.
              LuminaRep automates the transformation from social proof to social content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-hover">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">One-Click Review Import</h3>
              <p className="text-gray-400">
                Paste your Google Business URL. We automatically extract your best 5-star reviews
                and prepare them for content generation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-hover">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Content Engine</h3>
              <p className="text-gray-400">
                Elite-level copywriting for each review: 3 Instagram caption variations,
                TikTok/Reels scripts, and custom image generation prompts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-hover">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Ready-to-Post Assets</h3>
              <p className="text-gray-400">
                Copy-paste captions, video scripts, and prompts for Midjourney/DALL-E.
                Your content calendar fills itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-luxury-gray">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">From Reviews to Revenue in 60 Seconds</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              {
                step: '01',
                title: 'Connect Your Google Business',
                description: 'Paste your Google Business URL. Our system automatically identifies and extracts your 5-star reviews.',
              },
              {
                step: '02',
                title: 'AI Generates Marketing Assets',
                description: 'Our content engine transforms each review into professional Instagram captions, video scripts, and image prompts.',
              },
              {
                step: '03',
                title: 'Deploy Across Channels',
                description: 'Copy-paste your assets into Instagram, TikTok, or your content management system. Watch engagement soar.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="text-6xl font-bold gradient-text opacity-20">{item.step}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400">
              One plan. Unlimited campaigns. Unlimited content generation.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="card border-2 border-primary">
              <div className="text-center mb-6">
                <div className="text-sm font-semibold text-primary mb-2">PROFESSIONAL</div>
                <div className="text-5xl font-bold mb-2">
                  $99<span className="text-2xl text-gray-400">/mo</span>
                </div>
                <p className="text-gray-400">Everything you need to automate your social proof</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited review imports',
                  'Unlimited content generation',
                  '3 caption variations per review',
                  'Video script generation',
                  'AI image prompts (DALL-E/Midjourney)',
                  'Campaign management dashboard',
                  'Export all assets (CSV/JSON)',
                  'Priority email support',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth" className="btn-primary w-full text-center block">
                Start 7-Day Free Trial
              </Link>
              <p className="text-center text-sm text-gray-500 mt-4">
                No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10 border-y border-luxury-border">
        <div className="container-luxury text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Stop Letting Your Best Marketing Asset Collect Dust
            </h2>
            <p className="text-xl text-gray-400">
              Join hundreds of medical aesthetics practices automating their reputation into revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth" className="btn-primary text-lg px-8 py-4">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-luxury-border py-12">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
              <span className="text-xl font-bold gradient-text">LuminaRep</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="text-sm text-gray-500">
              © 2026 LuminaRep. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
