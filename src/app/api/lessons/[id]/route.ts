import { NextRequest, NextResponse } from 'next/server';
import { duolingoUnits } from '@/data/duolingoLessons';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const unit = duolingoUnits[id];

    if (!unit) {
      return NextResponse.json(
        { success: false, message: 'Lesson unit not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      unit
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch lesson unit', error: String(error) },
      { status: 500 }
    );
  }
}
