import { NextRequest, NextResponse } from 'next/server';
import { syncUserProgress, getUserProgress } from '@/lib/serverStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required to sync progress' },
        { status: 400 }
      );
    }

    const accountData = syncUserProgress(email, {
      profile: body.profile,
      islandNodes: body.islandNodes,
      mistakes: body.mistakes,
      studyPlan: body.studyPlan
    });

    return NextResponse.json({
      success: true,
      message: 'Account progress synced successfully to cloud',
      lastSyncedAt: accountData?.lastSyncedAt,
      accountData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to sync progress', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const accountData = getUserProgress(email);

    if (!accountData) {
      return NextResponse.json(
        { success: false, message: 'No existing progress found for this Gmail account' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      accountData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error retrieving account progress', error: String(error) },
      { status: 500 }
    );
  }
}
