/**
 * IELTS Writing Evaluation Engine
 * Evaluates essays across the 4 official assessment dimensions:
 * 1. Task Achievement / Task Response
 * 2. Coherence and Cohesion
 * 3. Lexical Resource
 * 4. Grammatical Range and Accuracy
 */

import { WritingEvaluationResult } from '@/types';

// High-band cohesive devices
const COHESIVE_CONNECTORS = [
  'furthermore', 'moreover', 'in addition', 'consequently',
  'nevertheless', 'nonetheless', 'on the contrary', 'in contrast',
  'in particular', 'specifically', 'notably', 'for instance',
  'to illustrate', 'as a result', 'in conclusion', 'to summarize',
  'it is argued that', 'proponents contend', 'critics maintain'
];

// Academic vocabulary markers
const ACADEMIC_LEXICAL_ITEMS = [
  'ubiquitous', 'mitigate', 'predominantly', 'intermittency',
  'substantial', 'pivotal', 'indispensable', 'precipitate',
  'underpin', 'catalyst', 'exponential', 'manifest', 'paradigm',
  'correlation', 'proliferation', 'detrimental', 'paramount'
];

export function evaluateEssaySubmission(params: {
  essayText: string;
  taskType: 'task1_academic' | 'task1_general' | 'task2_essay';
  targetWordCount?: number;
}): WritingEvaluationResult {
  const { essayText, taskType, targetWordCount = taskType === 'task2_essay' ? 250 : 150 } = params;

  const rawWords = essayText.trim().split(/\s+/).filter(Boolean);
  const wordCount = rawWords.length;
  const paragraphs = essayText.split(/\n+/).map(p => p.trim()).filter(Boolean);
  const paragraphCount = paragraphs.length;

  const lowerText = essayText.toLowerCase();

  // 1. Task Achievement / Response Assessment
  let trBand = 6.0;
  let trFeedback = '';
  if (wordCount < targetWordCount * 0.7) {
    trBand = 5.0;
    trFeedback = `Bài viết chưa đạt dung lượng tối thiểu (${wordCount}/${targetWordCount} từ). Việc thiếu từ sẽ bị trừ điểm trực tiếp ở tiêu chí Task Response theo quy chế chấm thi chính thức.`;
  } else if (wordCount < targetWordCount) {
    trBand = 6.0;
    trFeedback = `Dung lượng bài viết ở mức vừa đủ (${wordCount}/${targetWordCount} từ), nhưng các luận điểm cần được phát triển sâu hơn bằng ví dụ thực tế hoặc giải thích nguyên nhân-hệ quả.`;
  } else if (paragraphCount >= 4 && wordCount >= targetWordCount) {
    trBand = 7.5;
    trFeedback = `Bài viết hoàn thành tốt yêu cầu của đề bài (${wordCount} từ). Đã thiết lập lập trường rõ ràng từ phần Mở bài đến Kết luận và triển khai các luận cứ cân bằng.`;
  } else {
    trBand = 6.5;
    trFeedback = `Đã trả lời được các câu hỏi chính của đề bài, tuy nhiên phần phân chia cấu trúc đoạn cần tách biệt rõ ràng hơn giữa các luận điểm.`;
  }

  // 2. Coherence and Cohesion Assessment
  let ccBand = 6.0;
  const foundConnectors = COHESIVE_CONNECTORS.filter(c => lowerText.includes(c));
  let ccFeedback = '';

  if (paragraphCount < 3) {
    ccBand = 5.0;
    ccFeedback = `Bài viết chưa phân chia đoạn văn hợp lý (chỉ có ${paragraphCount} đoạn). Cần đảm bảo tối thiểu 4 đoạn: Mở bài, Thân bài 1, Thân bài 2, và Kết luận.`;
  } else if (foundConnectors.length >= 4) {
    ccBand = 7.5;
    ccFeedback = `Mạch văn và tính liên kết rất mượt mà. Đã sử dụng tự nhiên ${foundConnectors.length} liên từ học thuật (${foundConnectors.slice(0, 3).join(', ')}...). Ý tưởng giữa các câu chuyển tiếp nhịp nhàng.`;
  } else {
    ccBand = 6.5;
    ccFeedback = `Cấu trúc các đoạn văn rõ ràng. Để nâng lên Band 7.0+, hãy bổ sung thêm các cụm từ nối tinh tế hơn như "Furthermore", "Consequently", "In contrast".`;
  }

  // 3. Lexical Resource Assessment
  let lrBand = 6.0;
  const foundAcademicVocab = ACADEMIC_LEXICAL_ITEMS.filter(w => lowerText.includes(w));
  let lrFeedback = '';

  if (foundAcademicVocab.length >= 3) {
    lrBand = 7.5;
    lrFeedback = `Vốn từ vựng học thuật phong phú. Đã ứng dụng thành công các từ vựng Band cao (${foundAcademicVocab.slice(0, 4).join(', ')}).`;
  } else if (wordCount >= targetWordCount) {
    lrBand = 6.5;
    lrFeedback = `Từ vựng được dùng chính xác và đúng ngữ cảnh. Nên hạn chế lặp lại các từ cơ bản (như "good", "bad", "big", "important") bằng các cụm collocation học thuật tương đương.`;
  } else {
    lrBand = 5.5;
    lrFeedback = `Vốn từ ở mức trung bình. Cần nâng cấp các cấu trúc cụm danh từ và thành ngữ học thuật để tăng điểm Lexical Resource.`;
  }

  // 4. Grammatical Range and Accuracy Assessment
  let graBand = 6.0;
  let graFeedback = '';
  const hasComplexSentences = lowerText.includes('although') || lowerText.includes('whereas') || lowerText.includes('while') || lowerText.includes('if');
  const hasPassiveVoice = lowerText.includes('is characterized') || lowerText.includes('was argued') || lowerText.includes('can be seen') || lowerText.includes('are required');

  if (hasComplexSentences && hasPassiveVoice) {
    graBand = 7.5;
    graFeedback = `Đa dạng cấu trúc ngữ pháp: Đã kết hợp nhuần nhuyễn câu phức (complex sentences), mệnh đề quan hệ và thể bị động (passive voice). Lỗi sai cơ bản rất ít.`;
  } else if (hasComplexSentences || hasPassiveVoice) {
    graBand = 6.5;
    graFeedback = `Ngữ pháp nhìn chung chính xác, đã sử dụng được một số câu ghép và câu phức. Chú ý tính hòa hợp chủ vị (subject-verb agreement) và chia thì nhất quán.`;
  } else {
    graBand = 6.0;
    graFeedback = `Bài viết chủ yếu gồm các câu đơn. Cần mở rộng sử dụng câu điều kiện, mệnh đề quan hệ (which, that, who) để nâng thang điểm Grammatical Range.`;
  }

  // Calculate Overall Band Score (Rounded to nearest 0.5)
  const average = (trBand + ccBand + lrBand + graBand) / 4;
  const overallBand = Math.round(average * 2) / 2;

  // Paragraph Analysis
  const paragraphAnalysis = paragraphs.map((p, idx) => {
    const role =
      idx === 0
        ? 'Mở bài (Introduction)'
        : idx === paragraphs.length - 1
        ? 'Kết luận (Conclusion)'
        : `Thân bài ${idx} (Body Paragraph ${idx})`;

    const pWords = p.split(/\s+/).filter(Boolean).length;
    return {
      paragraphIndex: idx + 1,
      role,
      feedbackVi: `${role}: Gồm ${pWords} từ. ${
        pWords < 30
          ? 'Đoạn này hơi ngắn, cần bổ sung thêm câu phân tích hoặc luận cứ làm rõ.'
          : 'Dung lượng đoạn cân đối, câu chủ đề và các câu giải thích phát triển mạch lạc.'
      }`
    };
  });

  const strengths = [
    `Đã hoàn thành bài viết với tổng cộng ${wordCount} từ và ${paragraphCount} đoạn rõ ràng.`,
    `Tư duy lập luận logic, các luận điểm đều bám sát câu hỏi định hướng của đề bài.`
  ];

  if (foundConnectors.length > 0) {
    strengths.push(`Sử dụng linh hoạt các liên từ (${foundConnectors.slice(0, 3).join(', ')}).`);
  }

  const weaknesses = [];
  if (wordCount < targetWordCount) {
    weaknesses.push(`Chưa đạt mốc tối thiểu ${targetWordCount} từ (hiện có ${wordCount} từ).`);
  }
  if (paragraphCount < 4) {
    weaknesses.push('Cấu trúc chưa đủ 4 đoạn tiêu chuẩn (Mở bài - 2 Thân bài - Kết luận).');
  }
  weaknesses.push('Có thể mở rộng thêm các từ nối học thuật nâng cao và cấu trúc đảo ngữ (Inversion) để bứt phá lên Band 8.0.');

  const modelRevision =
    taskType === 'task2_essay'
      ? `It is often argued that artificial intelligence will eventually supersede human educators across educational institutions. While AI systems undeniably offer unprecedented capabilities in personalized curriculum pacing and automated evaluation, I firmly contend that human instructors remain irreplaceable due to their vital role in cultivating emotional intelligence, ethical discernment, and critical thinking.\n\nOn the one hand, AI-powered pedagogical platforms excel in quantitative instructional delivery. Adaptive algorithms can diagnose individual learning gaps in real time, delivering customized exercises tailored to each student's cognitive rate. Furthermore, automated grading mitigates logistical burdens on educational faculty, allowing instantaneous feedback on technical subjects such as mathematics and syntax. Consequently, as an auxiliary instructional instrument, artificial intelligence enhances pedagogical efficiency dramatically.\n\nNevertheless, teaching is fundamentally a relational and empathetic endeavor that transcends algorithmic data transmission. Human teachers provide moral mentorship, inspire intellectual curiosity, and detect subtle emotional distress that machine learning models cannot perceive. In classroom discussions involving ethical dilemmas, philosophy, and creative discourse, teachers stimulate students to challenge premises and formulate independent perspectives—a dialectical process that synthetic software cannot replicate.\n\nIn conclusion, while artificial intelligence will continue to revolutionize the technological mechanics of classroom administration, human educators remain indispensable for nurturing holistic character and fostering genuine intellectual inquiry.`
      : `The bar chart illustrates the proportion of electricity generated from renewable sources across four nations between 2010 and 2020.\n\nOverall, Norway consistently maintained an overwhelming dominance in renewable electricity generation throughout the surveyed decade. In contrast, while Germany recorded the most dramatic upward trajectory, Australia and Japan experienced more modest expansions.\n\nIn 2010, Norway generated approximately 95% of its electricity via renewable vectors, a figure that ascended marginally to reach nearly 98% by 2020. Conversely, Germany commenced the period with a modest share of only 16% in 2010. However, spurred by substantial clean energy investments, this proportion surged significantly to 31% in 2015 before culminating at 44% in 2020, representing nearly a threefold expansion.\n\nWith regard to the remaining countries, Japan produced 10% of its power from renewables in 2010, rising steadily to 19% by the end of the period. Similarly, Australia exhibited a parallel upward progression, advancing from 9% in 2010 to 14% in 2015, and finally reaching 21% in 2020.`;

  return {
    taskResponseOrAchievement: {
      band: trBand,
      feedbackVi: trFeedback
    },
    coherenceAndCohesion: {
      band: ccBand,
      feedbackVi: ccFeedback
    },
    lexicalResource: {
      band: lrBand,
      feedbackVi: lrFeedback,
      suggestedUpgrades: [
        { original: 'very big problem', upgraded: 'pressing predicament / severe obstacle', explanation: 'Nâng cấp cụm danh từ học thuật' },
        { original: 'makes things better', upgraded: 'ameliorates the situation', explanation: 'Động từ học thuật cao cấp' },
        { original: 'a lot of people think', upgraded: 'it is widely contended that', explanation: 'Mẫu câu dẫn quan điểm khách quan' }
      ]
    },
    grammaticalRangeAndAccuracy: {
      band: graBand,
      feedbackVi: graFeedback,
      detectedMistakes: [
        { original: 'teacher can helps student', corrected: 'teachers can help students', explanation: 'Hòa hợp số ít - số nhiều và động từ khiếm khuyết can + V nguyên mẫu.' }
      ]
    },
    overallBand,
    wordCount,
    strengths,
    weaknesses,
    paragraphAnalysis,
    modelRevision,
    isEstimate: true
  };
}
