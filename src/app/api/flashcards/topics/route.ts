import { NextRequest, NextResponse } from 'next/server';
import { vocabTopics } from '@/data/vocabCurriculum';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const track = searchParams.get('track');

    let result = vocabTopics;
    if (track && track !== 'all') {
      result = result.filter(t => t.track === track);
    }

    return NextResponse.json({
      success: true,
      totalTopics: result.length,
      topics: result
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch topics', error: String(error) },
      { status: 500 }
    );
  }
}
