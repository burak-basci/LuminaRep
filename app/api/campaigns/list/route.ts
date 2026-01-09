import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const campaigns = await query(
      `SELECT id, name, google_business_url, created_at, status
       FROM campaigns
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [session.user.id]
    );

    return NextResponse.json({ campaigns });
  } catch (error: any) {
    console.error('Error loading campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to load campaigns' },
      { status: 500 }
    );
  }
}
