import { NextRequest, NextResponse } from 'next/server';
import { logoutGoogleSession } from '@/lib/serverStore';

export async function POST() {
  try {
    logoutGoogleSession();
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Logout failed', error: String(error) },
      { status: 500 }
    );
  }
}
