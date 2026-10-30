import { NextRequest, NextResponse } from 'next/server';
import { getAllFlashcards, createFlashcard } from '@/lib/serverStore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const track = searchParams.get('track') || undefined;
    const category = searchParams.get('category') || undefined;
    const level = searchParams.get('level') || undefined;
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;

    const result = getAllFlashcards({ track, category, level, search, status });

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch flashcards', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.term || !body.meaningVi || !body.track) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: term, meaningVi, track' },
        { status: 400 }
      );
    }

    const newCard = createFlashcard({
      track: body.track,
      level: body.level || (body.track === 'ielts' ? 'IELTS Band 6.5+' : 'HSK 3'),
      term: body.term,
      pinyin: body.pinyin || undefined,
      phonetic: body.phonetic || undefined,
      partOfSpeech: body.partOfSpeech || 'noun',
      meaningVi: body.meaningVi,
      meaningEn: body.meaningEn || body.meaningVi,
      exampleSentence: body.exampleSentence || '',
      examplePinyin: body.examplePinyin || undefined,
      exampleVi: body.exampleVi || ''
    });

    return NextResponse.json(
      { success: true, message: 'Flashcard created successfully', card: newCard },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create flashcard', error: String(error) },
      { status: 500 }
    );
  }
}
