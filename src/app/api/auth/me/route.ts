import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/serverStore';

export async function GET() {
  try {
    const user = getCurrentSession();
    return NextResponse.json({
      success: true,
      authenticated: !!user,
      user
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve session', error: String(error) },
      { status: 500 }
    );
  }
}
