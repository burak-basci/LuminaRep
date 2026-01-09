/**
 * AI Content Generation Engine
 * Transforms Google Reviews into professional marketing assets
 * Powered by Google Gemini
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface GeneratedAssets {
  captions: [string, string, string];
  videoScript: string;
  imagePrompt: string;
}

/**
 * Generate Instagram captions from a review
 */
async function generateCaptions(reviewText: string): Promise<[string, string, string]> {
  const prompt = `You are an elite copywriter for luxury medical aesthetics brands. Transform this 5-star review into THREE variations of Instagram captions.

Review: "${reviewText}"

Requirements:
- Target audience: Affluent individuals seeking premium cosmetic procedures
- Tone: Sophisticated, aspirational, yet authentic
- Length: 150-200 characters each (Instagram-optimized)
- Include subtle emotional triggers (confidence, transformation, self-care)
- NO hashtags, NO emojis
- Focus on the transformation and experience, not just the procedure
- Each variation should have a different angle (emotional, social proof, aspiration)

Return ONLY three captions separated by "---" with no additional text or numbering.`;

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 500,
    },
  });

  const content = result.response.text() || '';
  const captions = content.split('---').map(c => c.trim()).filter(c => c.length > 0);

  // Ensure we have exactly 3 captions
  while (captions.length < 3) {
    captions.push('Experience the transformation. Discover confidence.');
  }

  return [captions[0], captions[1], captions[2]];
}

/**
 * Generate a video script for short-form content (Reels/TikTok)
 */
async function generateVideoScript(reviewText: string): Promise<string> {
  const prompt = `You are a social media strategist for high-end medical aesthetics clinics. Create a short-form video script (15-30 seconds) based on this review.

Review: "${reviewText}"

Script Structure:
HOOK (0-3 sec): Attention-grabbing opening question or statement
STORY (3-20 sec): Brief patient transformation narrative
CTA (20-30 sec): Subtle call-to-action

Requirements:
- Write in a conversational, authentic tone
- Include visual cues in [brackets] for the creator
- Focus on the emotional journey and results
- Maintain luxury brand positioning
- NO aggressive sales language
- Target length: 50-80 words

Format:
HOOK: [Visual cue] "Script line"
STORY: [Visual cue] "Script line"
CTA: [Visual cue] "Script line"`;

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 400,
    },
  });

  return result.response.text() || 'Create your script here.';
}

/**
 * Generate DALL-E/Midjourney image prompt
 */
async function generateImagePrompt(reviewText: string): Promise<string> {
  const prompt = `You are an AI art director specializing in luxury medical aesthetics marketing. Create a detailed image generation prompt based on this review.

Review: "${reviewText}"

Requirements:
- Style: Ultra-modern, minimalist luxury aesthetic
- Mood: Confident, serene, aspirational
- Color palette: Neutral tones (cream, beige, white) with accents of emerald or gold
- Composition: Clean, sophisticated, magazine-quality
- Setting: High-end medical spa environment
- Lighting: Soft, natural, flattering
- NO people's faces (to avoid uncanny valley), focus on ambiance, details, or silhouettes
- Should evoke feelings of trust, transformation, and exclusivity

Return ONLY the image prompt (one paragraph, 50-80 words) optimized for DALL-E 3 or Midjourney. No additional explanation.`;

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 200,
    },
  });

  return result.response.text() || 'Luxury medical spa interior with soft lighting.';
}

/**
 * Main function: Generate all marketing assets from a review
 */
export async function generateMarketingAssets(reviewText: string): Promise<GeneratedAssets> {
  try {
    // Generate all assets in parallel for speed
    const [captions, videoScript, imagePrompt] = await Promise.all([
      generateCaptions(reviewText),
      generateVideoScript(reviewText),
      generateImagePrompt(reviewText),
    ]);

    return {
      captions,
      videoScript,
      imagePrompt,
    };
  } catch (error) {
    console.error('Content generation error:', error);

    // Return fallback content
    return {
      captions: [
        'Transform your confidence with expert care.',
        'Experience luxury aesthetics that deliver real results.',
        'Where expertise meets elegance. Discover the difference.',
      ],
      videoScript: `HOOK: [Close-up of serene clinic interior] "Ready to feel confident again?"
STORY: [B-roll of consultation] "Our clients don't just see results—they feel transformed."
CTA: [Text overlay with booking info] "Your journey starts here."`,
      imagePrompt: 'Ultra-modern luxury medical spa interior, minimalist design, soft natural lighting, cream and white color palette with emerald accents, marble surfaces, elegant botanical elements, professional and serene atmosphere, magazine-quality photography',
    };
  }
}

/**
 * Batch generate content for multiple reviews
 */
export async function batchGenerateContent(
  reviews: string[]
): Promise<GeneratedAssets[]> {
  const results = await Promise.all(
    reviews.map(review => generateMarketingAssets(review))
  );
  return results;
}
