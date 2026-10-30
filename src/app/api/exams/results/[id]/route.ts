import { NextRequest, NextResponse } from 'next/server';
import { getExamResultById } from '@/lib/serverStore';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = getExamResultById(id);

    if (!result) {
      return NextResponse.json(
        { success: false, message: 'Exam result not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      result
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error retrieving exam result', error: String(error) },
      { status: 500 }
    );
  }
}
