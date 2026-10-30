import { NextRequest, NextResponse } from 'next/server';
import { submitExamSubmission } from '@/lib/serverStore';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const result = submitExamSubmission(id, {
      answers: body.answers || {},
      timeSpentSeconds: body.timeSpentSeconds || 0,
      mode: body.mode || 'mock',
      writingDrafts: body.writingDrafts
    });

    if (!result) {
      return NextResponse.json(
        { success: false, message: 'Exam not found or submission failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Exam graded and recorded successfully',
      resultId: result.id,
      result
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server-side exam grading failed', error: String(error) },
      { status: 500 }
    );
  }
}
