const fs = require('fs');
const path = require('path');

const examBank = JSON.parse(fs.readFileSync(path.join(__dirname, 'exam_bank.json'), 'utf8'));
const ieltsMini = JSON.parse(fs.readFileSync(path.join(__dirname, 'ielts_mini_mocks.json'), 'utf8'));
const hskMini = JSON.parse(fs.readFileSync(path.join(__dirname, 'hsk_mini_mocks.json'), 'utf8'));
const hskStandard = JSON.parse(fs.readFileSync(path.join(__dirname, 'hsk_mock_exams.json'), 'utf8'));

const allExams = [
  ...(examBank.exams || []),
  ...(ieltsMini.miniMocks || []),
  ...(hskMini.hskMocks || []),
  ...(hskStandard.hskExams || [])
];

const VALID_TYPES = new Set([
  'mcq', 'multiple_choice_multi', 'fill_blank', 'note_completion',
  'form_completion', 'table_completion', 'sentence_completion',
  'summary_completion', 'matching_headings', 'matching_features',
  'matching_sentence_endings', 'matching_information', 'tfng', 'ynng',
  'short_answer', 'diagram_label', 'map_label', 'writing_academic_task1',
  'writing_general_task1', 'writing_task2', 'hsk_listening_dialogue',
  'hsk_reading_comprehension', 'hsk_sentence_reorder', 'hsk_cloze'
]);

let totalSections = 0;
let totalQuestions = 0;
const duplicateIds = [];
const missingKeys = [];
const invalidTypes = [];
const missingExplanations = [];
let recordedCount = 0;
let ttsCount = 0;
let missingAudioCount = 0;
const seenIds = new Set();

for (const exam of allExams) {
  totalSections += exam.sections.length;
  for (const sec of exam.sections) {
    if (sec.skill === 'listening') {
      if (sec.audioSourceType === 'recorded') recordedCount++;
      else if (sec.audioSourceType === 'tts') ttsCount++;
      else missingAudioCount++;
    }

    for (const q of sec.questions) {
      totalQuestions++;
      if (seenIds.has(q.id)) duplicateIds.push(q.id);
      else seenIds.add(q.id);

      if (!q.correctAnswer || q.correctAnswer.trim() === '') missingKeys.push(q.id);
      if (!VALID_TYPES.has(q.type)) invalidTypes.push(`${q.id} (${q.type})`);
      if (!q.explanationVi || q.explanationVi.trim() === '') missingExplanations.push(q.id);
    }
  }
}

console.log('--- LINGORA DATA QUALITY REPORT ---');
console.log(`Total Exams: ${allExams.length}`);
console.log(`Total Sections: ${totalSections}`);
console.log(`Total Questions: ${totalQuestions}`);
console.log(`Duplicate IDs: ${duplicateIds.length === 0 ? '0 (ALL UNIQUE)' : duplicateIds.join(', ')}`);
console.log(`Missing Answer Keys: ${missingKeys.length === 0 ? '0 (ALL VERIFIED)' : missingKeys.join(', ')}`);
console.log(`Invalid Question Types: ${invalidTypes.length === 0 ? '0 (ALL VALID)' : invalidTypes.join(', ')}`);
console.log(`Missing Explanations: ${missingExplanations.length === 0 ? '0 (ALL VERIFIED)' : missingExplanations.join(', ')}`);
console.log(`Audio Audit: Recorded=${recordedCount}, TTS AI Speech Practice=${ttsCount}, Missing=${missingAudioCount}`);
