import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { scrapeGoogleReviews } from '@/lib/review-scraper';
import { generateMarketingAssets } from '@/lib/content-generator';

export async function POST(request: NextRequest) {
  try {
    // Get request body
    const { name, googleBusinessUrl } = await request.json();

    if (!name || !googleBusinessUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get current user from Supabase auth
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Create campaign
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .insert({
        user_id: user.id,
        name,
        google_business_url: googleBusinessUrl,
        status: 'processing',
      })
      .select()
      .single();

    if (campaignError) throw campaignError;

    // Scrape reviews in the background
    scrapeAndGenerateContent(campaign.id, googleBusinessUrl);

    return NextResponse.json({
      success: true,
      campaignId: campaign.id,
      message: 'Campaign created. Generating content...',
    });

  } catch (error: any) {
    console.error('Campaign creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create campaign' },
      { status: 500 }
    );
  }
}

/**
 * Background process to scrape reviews and generate content
 */
async function scrapeAndGenerateContent(campaignId: string, googleBusinessUrl: string) {
  try {
    // Step 1: Scrape reviews
    const scraperResult = await scrapeGoogleReviews(googleBusinessUrl);

    if (!scraperResult.success || scraperResult.reviews.length === 0) {
      await supabase
        .from('campaigns')
        .update({ status: 'failed' })
        .eq('id', campaignId);
      return;
    }

    // Step 2: Generate content for each review
    for (const review of scraperResult.reviews) {
      try {
        const assets = await generateMarketingAssets(review.text);

        // Save generated content
        await supabase
          .from('generated_content')
          .insert({
            campaign_id: campaignId,
            review_text: review.text,
            caption_1: assets.captions[0],
            caption_2: assets.captions[1],
            caption_3: assets.captions[2],
            video_script: assets.videoScript,
            image_prompt: assets.imagePrompt,
          });

      } catch (error) {
        console.error('Error generating content for review:', error);
        // Continue with other reviews even if one fails
      }
    }

    // Step 3: Mark campaign as completed
    await supabase
      .from('campaigns')
      .update({ status: 'completed' })
      .eq('id', campaignId);

  } catch (error) {
    console.error('Background processing error:', error);
    await supabase
      .from('campaigns')
      .update({ status: 'failed' })
      .eq('id', campaignId);
  }
}
