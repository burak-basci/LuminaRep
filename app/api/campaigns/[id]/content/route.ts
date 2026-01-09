import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify campaign belongs to user
    const campaign = await query(
      `SELECT id FROM campaigns WHERE id = $1 AND user_id = $2`,
      [params.id, session.user.id]
    );

    if (campaign.length === 0) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    // Get content
    const content = await query(
      `SELECT id, review_text, caption_1, caption_2, caption_3, video_script, image_prompt, created_at
       FROM generated_content
       WHERE campaign_id = $1
       ORDER BY created_at DESC`,
      [params.id]
    );

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error('Error loading content:', error);
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}
