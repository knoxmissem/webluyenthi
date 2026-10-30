import examBankData from './exam_bank.json';
import ieltsMiniData from './ielts_mini_mocks.json';
import hskMiniData from './hsk_mini_mocks.json';

interface AuditReport {
  totalExams: number;
  totalSections: number;
  totalQuestions: number;
  duplicateQuestionIds: string[];
  missingAnswerKeys: string[];
  invalidQuestionTypes: string[];
  missingExplanations: string[];
  audioAudit: {
    recordedAudioCount: number;
    ttsAudioCount: number;
    missingAudioCount: number;
  };
  details: string[];
}

function auditExamBank(): AuditReport {
  const allExams = [
    ...(examBankData.exams || []),
    ...(ieltsMiniData.miniMocks || []),
    ...(hskMiniData.hskMocks || [])
  ];

  const report: AuditReport = {
    totalExams: allExams.length,
    totalSections: 0,
    totalQuestions: 0,
    duplicateQuestionIds: [],
    missingAnswerKeys: [],
    invalidQuestionTypes: [],
    missingExplanations: [],
    audioAudit: {
      recordedAudioCount: 0,
      ttsAudioCount: 0,
      missingAudioCount: 0
    },
    details: []
  };

  const seenQuestionIds = new Set<string>();

  const VALID_QUESTION_TYPES = new Set([
    'mcq',
    'multiple_choice_multi',
    'fill_blank',
    'note_completion',
    'form_completion',
    'table_completion',
    'sentence_completion',
    'summary_completion',
    'matching_headings',
    'matching_features',
    'matching_sentence_endings',
    'matching_information',
    'tfng',
    'ynng',
    'short_answer',
    'diagram_label',
    'map_label',
    'writing_academic_task1',
    'writing_general_task1',
    'writing_task2',
    'hsk_listening_dialogue',
    'hsk_reading_comprehension',
    'hsk_sentence_reorder',
    'hsk_cloze'
  ]);

  for (const exam of allExams) {
    report.totalSections += exam.sections.length;

    for (const section of (exam.sections as any[])) {
      if (section.skill === 'listening') {
        if (section.audioSourceType === 'recorded') {
          report.audioAudit.recordedAudioCount++;
        } else if (section.audioSourceType === 'tts') {
          report.audioAudit.ttsAudioCount++;
        } else {
          report.audioAudit.missingAudioCount++;
        }
      }

      for (const q of section.questions) {
        report.totalQuestions++;

        // 1. Check duplicate IDs
        if (seenQuestionIds.has(q.id)) {
          report.duplicateQuestionIds.push(q.id);
        } else {
          seenQuestionIds.add(q.id);
        }

        // 2. Check missing answer key
        if (!q.correctAnswer || q.correctAnswer.trim() === '') {
          report.missingAnswerKeys.push(q.id);
        }

        // 3. Check valid question type
        if (!VALID_QUESTION_TYPES.has(q.type)) {
          report.invalidQuestionTypes.push(`${q.id} (type: ${q.type})`);
        }

        // 4. Check explanations
        if (!q.explanationVi || q.explanationVi.trim() === '') {
          report.missingExplanations.push(q.id);
        }
      }
    }
  }

  return report;
}

const audit = auditExamBank();
console.log('--- LINGORA EXAMINATION DATA QUALITY AUDIT REPORT ---');
console.log(`Total Exams: ${audit.totalExams}`);
console.log(`Total Sections: ${audit.totalSections}`);
console.log(`Total Questions: ${audit.totalQuestions}`);
console.log(`Duplicate Question IDs: ${audit.duplicateQuestionIds.length === 0 ? 'None (PASS)' : audit.duplicateQuestionIds.join(', ')}`);
console.log(`Missing Answer Keys: ${audit.missingAnswerKeys.length === 0 ? 'None (PASS)' : audit.missingAnswerKeys.join(', ')}`);
console.log(`Invalid Question Types: ${audit.invalidQuestionTypes.length === 0 ? 'None (PASS)' : audit.invalidQuestionTypes.join(', ')}`);
console.log(`Missing Explanations: ${audit.missingExplanations.length === 0 ? 'None (PASS)' : audit.missingExplanations.join(', ')}`);
console.log('Audio Status:');
console.log(`  - Studio Recorded Tracks: ${audit.audioAudit.recordedAudioCount}`);
console.log(`  - TTS Synthetic Speech Fallback Tracks: ${audit.audioAudit.ttsAudioCount}`);
console.log(`  - Unconfigured Audio Tracks: ${audit.audioAudit.missingAudioCount}`);
console.log('Audit completed successfully.');
