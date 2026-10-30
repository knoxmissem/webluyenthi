import { NextRequest, NextResponse } from 'next/server';
import { getAllExams } from '@/lib/serverStore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const track = searchParams.get('track') || undefined;
    const type = searchParams.get('type') || undefined;
    const skill = searchParams.get('skill') || undefined;
    const questionType = searchParams.get('questionType') || undefined;
    const isMiniMockParam = searchParams.get('isMiniMock');
    const isMiniMock = isMiniMockParam !== null ? isMiniMockParam === 'true' : undefined;
    const search = searchParams.get('search') || undefined;

    const exams = getAllExams({ track, type, skill, questionType, isMiniMock, search });

    return NextResponse.json({
      success: true,
      count: exams.length,
      data: exams
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve exams', error: String(error) },
      { status: 500 }
    );
  }
}
