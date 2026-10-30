/**
 * High-speed local academic dictionary & vocabulary lookup service for LINGORA CBT
 */

export interface VocabLookupResult {
  word: string;
  partOfSpeech: string;
  phonetic?: string;
  meaningVi: string;
  meaningEn: string;
  exampleSentence?: string;
  contextNote?: string;
}

const ACADEMIC_DICTIONARY: Record<string, VocabLookupResult> = {
  intermittency: {
    word: 'intermittency',
    partOfSpeech: 'noun',
    phonetic: '/ˌɪn.təˈmɪt.ənt.si/',
    meaningVi: 'Tính gián đoạn, sự không liên tục (của nguồn năng lượng)',
    meaningEn: 'The state or condition of not happening continuously or stopping and starting at intervals',
    exampleSentence: 'The intermittency of solar and wind energy presents severe grid integration challenges.',
    contextNote: 'Từ khóa then chốt trong IELTS Reading & Writing về chủ đề năng lượng tái tạo.'
  },
  embrittlement: {
    word: 'embrittlement',
    partOfSpeech: 'noun',
    phonetic: '/ɪmˈbrɪt.əl.mənt/',
    meaningVi: 'Hiện tượng làm giòn gãy, thoái hóa độ dẻo kết cấu kim loại',
    meaningEn: 'Loss of ductility of a material, making it brittle and prone to fracture',
    exampleSentence: 'Transporting compressed hydrogen causes severe metallurgical embrittlement in legacy steel pipelines.',
    contextNote: 'Thuật ngữ kỹ thuật luyện kim xuất hiện trong các bài đọc học thuật về cơ sở hạ tầng.'
  },
  decarbonization: {
    word: 'decarbonization',
    partOfSpeech: 'noun',
    phonetic: '/diːˌkɑː.bə.naɪˈzeɪ.ʃən/',
    meaningVi: 'Quá trình phi carbon hóa, giảm thiểu khí thải CO2',
    meaningEn: 'The reduction of carbon dioxide emissions through use of low-carbon energy sources',
    exampleSentence: 'International treaties accelerate industrial decarbonization by 2050.',
    contextNote: 'Chủ đề môi trường cốt lõi của IELTS Band 7.5+.'
  },
  consolidation: {
    word: 'consolidation',
    partOfSpeech: 'noun',
    phonetic: '/kənˌsɒl.ɪˈdeɪ.ʃən/',
    meaningVi: 'Sự củng cố, làm cho bền vững (ký ức / tổ chức)',
    meaningEn: 'The process of becoming stronger and more solid, especially memory traces in neurology',
    exampleSentence: 'Sleep plays an indispensable role in synaptic memory consolidation.',
    contextNote: 'Thường gặp trong các bài đọc tâm lý học & khoa học thần kinh (neuroscience).'
  },
  hippocampus: {
    word: 'hippocampus',
    partOfSpeech: 'noun',
    phonetic: '/ˌhɪp.əˈkæm.pəs/',
    meaningVi: 'Hồi hải mã (vùng não chịu trách nhiệm lưu trữ ký ức ngắn hạn)',
    meaningEn: 'A complex brain structure embedded deep into temporal lobe essential for learning and memory',
    exampleSentence: 'Information temporarily held in the hippocampus is transferred to the neocortex.',
    contextNote: 'Cấu trúc giải phẫu não kinh điển trong các bài đọc Cambridge IELTS.'
  },
  oscillations: {
    word: 'oscillations',
    partOfSpeech: 'noun (plural)',
    phonetic: '/ˌɒs.ɪˈleɪ.ʃənz/',
    meaningVi: 'Sự dao động điện sinh lý tuần hoàn',
    meaningEn: 'Repetitive variations, typically in time, of some measure about a central value',
    exampleSentence: 'Slow cortical oscillations coordinate the neural transfer of information during deep sleep.',
    contextNote: 'Dùng trong các bài đọc vật lý học hoặc sinh học thần kinh.'
  },
  glymphatic: {
    word: 'glymphatic',
    partOfSpeech: 'adjective',
    phonetic: '/ɡlɪmˈfæt.ɪk/',
    meaningVi: 'Hệ thống bài tiết dọn dẹp chất thải chuyển hóa của hệ thần kinh trung ương',
    meaningEn: 'Relating to a specialized macroscopic waste clearance system in vertebrate brains',
    exampleSentence: 'The glymphatic system flushes out toxic beta-amyloid proteins during deep sleep.',
    contextNote: 'Cụm từ sinh học y khoa chuyên sâu trong các bài đọc band cao.'
  },
  impetus: {
    word: 'impetus',
    partOfSpeech: 'noun',
    phonetic: '/ˈɪm.pɪ.təs/',
    meaningVi: 'Động lực thúc đẩy, cú hích phát triển',
    meaningEn: 'Something that makes a process or activity happen or happen more quickly',
    exampleSentence: 'Environmental protection accords provide the primary impetus for renewable research.',
    contextNote: 'Từ vựng Band 8.0 đồng nghĩa với stimulus hoặc driving force.'
  },
  ubiquitous: {
    word: 'ubiquitous',
    partOfSpeech: 'adjective',
    phonetic: '/juːˈbɪk.wə.təs/',
    meaningVi: 'Có mặt ở khắp nơi, phổ biến rộng rãi',
    meaningEn: 'Present, appearing, or found everywhere simultaneously',
    exampleSentence: 'Smart devices have become ubiquitous throughout modern life.',
    contextNote: 'Collocation học thuật: ubiquitous presence / ubiquitous technology.'
  },
  mitigate: {
    word: 'mitigate',
    partOfSpeech: 'verb',
    phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
    meaningVi: 'Giảm nhẹ mức độ nghiêm trọng, làm dịu',
    meaningEn: 'To make something less severe, harmful, or painful',
    exampleSentence: 'Adequate battery reserves can mitigate sudden grid frequency drops.',
    contextNote: 'Động từ quan trọng trong IELTS Writing & Reading.'
  }
};

/**
 * Clean up text selection and search dictionary
 */
export function lookupWord(selectedText: string): VocabLookupResult {
  const cleanWord = selectedText
    .trim()
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');

  if (ACADEMIC_DICTIONARY[cleanWord]) {
    return ACADEMIC_DICTIONARY[cleanWord];
  }

  // Heuristic context translation for terms not in static seed
  return {
    word: cleanWord,
    partOfSpeech: cleanWord.endsWith('tion') || cleanWord.endsWith('ity') || cleanWord.endsWith('ment') ? 'noun' : cleanWord.endsWith('ly') ? 'adverb' : cleanWord.endsWith('al') || cleanWord.endsWith('ic') || cleanWord.endsWith('ive') ? 'adjective' : 'term',
    meaningVi: `Thuật ngữ học thuật trong văn cảnh bài đọc: "${cleanWord}"`,
    meaningEn: `Academic vocabulary item in context: "${cleanWord}"`,
    exampleSentence: `Notice how "${cleanWord}" operates within the reading paragraph sentence structure.`,
    contextNote: 'Bạn có thể bấm "Lưu vào Sổ từ vựng" để hệ thống tự động đồng bộ sang Flashcard ôn tập Spaced Repetition (SM-2).'
  };
}
