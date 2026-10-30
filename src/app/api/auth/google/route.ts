import { NextRequest, NextResponse } from 'next/server';
import { loginGoogleAccount } from '@/lib/serverStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email || 'learner.google@gmail.com';
    const name = body.name || email.split('@')[0];
    const avatar = body.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`;

    if (!email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Invalid Gmail address format' },
        { status: 400 }
      );
    }

    const { user, accountData } = loginGoogleAccount({ email, name, avatar });
    const isNewUser = !accountData.profile;
    const hasCompletedOnboarding = !!(accountData.profile && accountData.profile.hasCompletedOnboarding);

    return NextResponse.json({
      success: true,
      message: 'Logged in with Google successfully',
      user,
      accountData,
      isNewUser,
      hasCompletedOnboarding
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Google authentication failed', error: String(error) },
      { status: 500 }
    );
  }
}
