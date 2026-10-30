import { NextRequest, NextResponse } from 'next/server';
import { getFlashcardById, deleteFlashcard } from '@/lib/serverStore';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const card = getFlashcardById(id);

    if (!card) {
      return NextResponse.json(
        { success: false, message: 'Flashcard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, card });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error fetching flashcard', error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteFlashcard(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Flashcard not found or could not be deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Flashcard deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error deleting flashcard', error: String(error) },
      { status: 500 }
    );
  }
}
