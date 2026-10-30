import { MockExam } from '@/types';
import examBankData from './exam_bank.json';
import ieltsMiniData from './ielts_mini_mocks.json';
import hskMiniData from './hsk_mini_mocks.json';
import hskMockData from './hsk_mock_exams.json';
import cambridgeData from './cambridge_exams.json';

// Typecast JSON imports to MockExam array
const fullExams: MockExam[] = examBankData.exams as unknown as MockExam[];
const cambridgeExams: MockExam[] = ((cambridgeData as unknown as { cambridgeExams: MockExam[] }).cambridgeExams || []) as unknown as MockExam[];
const ieltsMinis: MockExam[] = ieltsMiniData.miniMocks as unknown as MockExam[];
const hskMocks: MockExam[] = hskMiniData.hskMocks as unknown as MockExam[];
const hskStandardMocks: MockExam[] = (hskMockData.hskExams || []) as unknown as MockExam[];

export const allMockExams: MockExam[] = [
  ...cambridgeExams,
  ...fullExams,
  ...ieltsMinis,
  ...hskMocks,
  ...hskStandardMocks
];

// Preserving legacy exported name for zero-breakage backward compatibility
export const sampleMockExams: MockExam[] = allMockExams;

/**
 * Filter HSK mock exams by level (1 to 6)
 */
export function getHskMockExams(level?: number | string) {
  return allMockExams.filter(exam => {
    if (exam.track !== 'hsk') return false;
    if (!level) return true;
    const lvlStr = `hsk ${level}`.toLowerCase();
    const lvlNumStr = `hsk${level}`.toLowerCase();
    const examLvl = exam.level.toLowerCase();
    const examId = exam.id.toLowerCase();
    return examLvl.includes(lvlStr) || examLvl.includes(lvlNumStr) || examId.startsWith(`hsk${level}-`);
  });
}

/**
 * Filter exams or exercises by criteria
 */
export function queryExercises(criteria: {
  track?: 'ielts' | 'hsk' | 'all';
  skill?: 'listening' | 'reading' | 'writing' | 'all';
  isMiniMock?: boolean;
  questionType?: string;
  search?: string;
}) {
  return allMockExams.filter(exam => {
    if (criteria.track && criteria.track !== 'all' && exam.track !== criteria.track) {
      return false;
    }
    if (criteria.isMiniMock !== undefined && Boolean(exam.isMiniMock) !== criteria.isMiniMock) {
      return false;
    }
    if (criteria.skill && criteria.skill !== 'all') {
      const hasSkill = exam.sections.some(s => s.skill === criteria.skill);
      if (!hasSkill) return false;
    }
    if (criteria.questionType) {
      const hasType = exam.sections.some(s =>
        s.questions.some(q => q.type === criteria.questionType)
      );
      if (!hasType) return false;
    }
    if (criteria.search) {
      const q = criteria.search.toLowerCase();
      const matchTitle =
        exam.title.toLowerCase().includes(q) ||
        exam.titleVi.toLowerCase().includes(q) ||
        exam.level.toLowerCase().includes(q);
      if (!matchTitle) return false;
    }
    return true;
  });
}
