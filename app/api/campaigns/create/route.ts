import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { query, queryOne } from '@/lib/db';
import { scrapeGoogleReviews } from '@/lib/review-scraper';
import { generateMarketingAssets } from '@/lib/content-generator';

export async function POST(request: NextRequest) {
  try {
    // Get session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get request body
    const { name, googleBusinessUrl } = await request.json();

    if (!name || !googleBusinessUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create campaign
    const campaign = await queryOne<{ id: string }>(
      `INSERT INTO campaigns (user_id, name, google_business_url, status)
       VALUES ($1, $2, $3, 'processing')
       RETURNING id`,
      [session.user.id, name, googleBusinessUrl]
    );

    if (!campaign) {
      throw new Error('Failed to create campaign');
    }

    // Scrape and generate content in the background
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
      await query(
        `UPDATE campaigns SET status = 'failed' WHERE id = $1`,
        [campaignId]
      );
      return;
    }

    // Step 2: Generate content for each review
    for (const review of scraperResult.reviews) {
      try {
        const assets = await generateMarketingAssets(review.text);

        // Save generated content
        await query(
          `INSERT INTO generated_content
           (campaign_id, review_text, caption_1, caption_2, caption_3, video_script, image_prompt)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            campaignId,
            review.text,
            assets.captions[0],
            assets.captions[1],
            assets.captions[2],
            assets.videoScript,
            assets.imagePrompt,
          ]
        );

      } catch (error) {
        console.error('Error generating content for review:', error);
        // Continue with other reviews even if one fails
      }
    }

    // Step 3: Mark campaign as completed
    await query(
      `UPDATE campaigns SET status = 'completed' WHERE id = $1`,
      [campaignId]
    );

  } catch (error) {
    console.error('Background processing error:', error);
    await query(
      `UPDATE campaigns SET status = 'failed' WHERE id = $1`,
      [campaignId]
    );
  }
}
