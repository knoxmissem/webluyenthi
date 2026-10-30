import { NextRequest, NextResponse } from 'next/server';
import { reviewFlashcardSM2 } from '@/lib/serverStore';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const rating = body.rating as 1 | 2 | 3 | 4 | 5;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: 'Rating must be an integer between 1 and 5' },
        { status: 400 }
      );
    }

    const updatedCard = reviewFlashcardSM2(id, rating);

    if (!updatedCard) {
      return NextResponse.json(
        { success: false, message: 'Flashcard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'SM-2 spaced repetition calculation updated successfully',
      card: updatedCard,
      nextReviewDate: updatedCard.nextReviewDate,
      intervalDays: updatedCard.intervalDays,
      repetition: updatedCard.repetition,
      mastered: updatedCard.mastered
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process flashcard review', error: String(error) },
      { status: 500 }
    );
  }
}
