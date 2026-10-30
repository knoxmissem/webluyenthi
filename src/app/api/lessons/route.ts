import { NextRequest, NextResponse } from 'next/server';
import { duolingoUnits } from '@/data/duolingoLessons';

export async function GET() {
  try {
    const units = Object.values(duolingoUnits).map(u => ({
      id: u.id,
      nodeId: u.nodeId,
      title: u.title,
      titleVi: u.titleVi,
      descriptionVi: u.descriptionVi,
      xpReward: u.xpReward,
      questionsCount: u.questions.length
    }));

    return NextResponse.json({
      success: true,
      count: units.length,
      data: units
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch lessons', error: String(error) },
      { status: 500 }
    );
  }
}
