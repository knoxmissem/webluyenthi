import { NextRequest, NextResponse } from 'next/server';
import { getExamById } from '@/lib/serverStore';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'practice';
    const exam = getExamById(id);

    if (!exam) {
      return NextResponse.json(
        { success: false, message: 'Mock examination not found' },
        { status: 404 }
      );
    }

    // In mock exam mode, sanitize correct answers and explanations for anti-cheating & security
    if (mode === 'mock') {
      const sanitizedExam = {
        ...exam,
        sections: exam.sections.map(section => ({
          ...section,
          questions: section.questions.map(q => ({
            ...q,
            correctAnswer: '',
            acceptedAnswers: undefined,
            explanation: '',
            explanationVi: '',
            evidenceText: undefined,
            evidenceParagraph: undefined,
            paraphrasePairs: undefined,
            distractorExplanations: undefined,
            trapNoteVi: undefined
          }))
        }))
      };

      return NextResponse.json({
        success: true,
        exam: sanitizedExam
      });
    }

    return NextResponse.json({
      success: true,
      exam
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error retrieving exam', error: String(error) },
      { status: 500 }
    );
  }
}
