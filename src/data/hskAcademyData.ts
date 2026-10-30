/**
 * HSK ACADEMY COMPREHENSIVE CURRICULUM DATA (HSK 1 - 6)
 * Supports:
 * - Vocabulary with Hanzi, Pinyin, Vietnamese, POS, Example & Translation
 * - Characters with Radicals, Components, and Recognition
 * - Grammar Rules with Formulas, Explanations, Examples & Common Mistakes
 * - Reading Texts with Toggleable Pinyin & Comprehension Questions
 * - Writing / Sentence Reorder & Structure Practice
 */

export interface HskWordItem {
  id: string;
  level: number; // 1 to 6
  hanzi: string;
  pinyin: string;
  partOfSpeech: string;
  meaningVi: string;
  meaningEn: string;
  radical?: string;
  components?: string;
  exampleSentence: string;
  examplePinyin: string;
  exampleVi: string;
}

export interface HskCharacterItem {
  char: string;
  pinyin: string;
  radical: string;
  strokeCount: number;
  meaningVi: string;
  commonWords: { hanzi: string; pinyin: string; vi: string }[];
}

export interface HskGrammarRule {
  id: string;
  level: number;
  title: string;
  titleVi: string;
  pattern: string;
  explanationVi: string;
  exampleChinese: string;
  examplePinyin: string;
  exampleVi: string;
  commonMistakeVi: string;
  practiceQuestions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanationVi: string;
  }[];
}

export interface HskReadingPassage {
  id: string;
  level: number;
  title: string;
  titleVi: string;
  chineseText: string;
  pinyinText: string;
  translationVi: string;
  questions: {
    id: string;
    prompt: string;
    promptVi: string;
    options: { key: string; text: string; textVi: string }[];
    correctAnswer: string;
    explanationVi: string;
  }[];
}

export interface HskWritingExercise {
  id: string;
  level: number;
  type: 'word_order' | 'fill_blank' | 'sentence_make';
  prompt: string;
  promptVi: string;
  tokens?: string[]; // For word ordering
  correctAnswer: string;
  hintVi: string;
  explanationVi: string;
}

export interface HskLevelMeta {
  level: number;
  title: string;
  titleVi: string;
  subtitle: string;
  targetWords: number;
  descriptionVi: string;
  objectivesVi: string[];
  color: string;
  accentColor: string;
}

export const HSK_LEVELS_META: HskLevelMeta[] = [
  {
    level: 1,
    title: 'HSK 1',
    titleVi: 'Cấp Độ 1 — Nền Tảng Sơ Cấp',
    subtitle: '150 Từ Vựng Cốt Lõi',
    targetWords: 150,
    descriptionVi: 'Làm quen với hệ thống phát âm Pinyin, nhận diện các nét chữ Hán cơ bản và giao tiếp trong các tình huống sinh hoạt hàng ngày đơn giản nhất.',
    objectivesVi: [
      'Nắm vững thanh mẫu, vận mẫu và 4 thanh điệu Pinyin',
      'Nhận diện và hiểu 150 từ vựng căn bản (chào hỏi, số đếm, gia đình)',
      'Hỏi và trả lời về thông tin cá nhân, thời gian, giá cả',
      'Hiểu cấu trúc câu đơn: Chủ ngữ + Động từ + Tân ngữ'
    ],
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
    accentColor: '#059669'
  },
  {
    level: 2,
    title: 'HSK 2',
    titleVi: 'Cấp Độ 2 — Giao Tiếp Cơ Bản Hàng Ngày',
    subtitle: '300 Từ Vựng Mở Rộng',
    targetWords: 300,
    descriptionVi: 'Mở rộng vốn từ về mua sắm, thời tiết, du lịch, hỏi đường và mô tả các hoạt động thường nhật với câu phức đơn giản.',
    objectivesVi: [
      'Sử dụng thành thạo 300 từ vựng thông dụng',
      'Giao tiếp tự nhiên trong mua bán, đặt món, gọi xe',
      'Sử dụng câu so sánh chữ 比, câu liên động, trợ từ động thái 了 / 过 / 着',
      'Đọc hiểu đoạn hội thoại ngắn 50-80 chữ Hán'
    ],
    color: 'from-teal-500/10 to-cyan-500/10 border-teal-500/30 text-teal-700 dark:text-teal-400',
    accentColor: '#0D9488'
  },
  {
    level: 3,
    title: 'HSK 3',
    titleVi: 'Cấp Độ 3 — Giao Tiếp Sơ Trung Cấp & Đặt Câu',
    subtitle: '600 Từ Vựng Chuẩn Hóa',
    targetWords: 600,
    descriptionVi: 'Đạt năng lực giao tiếp cơ bản trong học tập và công việc. Bắt đầu rèn luyện kỹ năng sắp xếp câu và viết chữ Hán không cần Pinyin hỗ trợ.',
    objectivesVi: [
      'Làm chủ 600 từ vựng và 40 cấu trúc ngữ pháp trọng tâm',
      'Sử dụng thành thạo bổ ngữ kết quả, bổ ngữ xu hướng, câu chữ 把',
      'Biểu đạt nguyên nhân - kết quả (因为...所以...), điều kiện (只要...就...)',
      'Đọc hiểu đoạn văn 150-200 chữ Hán và hoàn thành sắp xếp câu'
    ],
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400',
    accentColor: '#2563EB'
  },
  {
    level: 4,
    title: 'HSK 4',
    titleVi: 'Cấp Độ 4 — Trung Cấp & Đọc Hiểu Thực Tế',
    subtitle: '1200 Từ Vựng Toàn Diện',
    targetWords: 1200,
    descriptionVi: 'Thảo luận lưu loát về các chủ đề văn hóa, xã hội, công việc và đời sống đô thị. Tự tin đọc báo chí tiếng Trung và viết đoạn văn ngắn.',
    objectivesVi: [
      'Nắm vững 1200 từ vựng học thuật và giao tiếp chuyên nghiệp',
      'Sử dụng cấu trúc câu chữ 把, 被, câu phản vấn, liên từ phức',
      'Đọc hiểu nhanh các bài luận ngắn 300 chữ và nắm bắt ý chính',
      'Sắp xếp từ ngữ thành câu hoàn chỉnh và viết câu miêu tả tranh'
    ],
    color: 'from-indigo-500/10 to-violet-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-400',
    accentColor: '#4F46E5'
  },
  {
    level: 5,
    title: 'HSK 5',
    titleVi: 'Cấp Độ 5 — Cao Cấp & Tư Duy Ngôn Ngữ Phức Hợp',
    subtitle: '2500 Từ Vựng Nâng Cao',
    targetWords: 2500,
    descriptionVi: 'Đọc hiểu báo chí, tạp chí, thưởng thức phim ảnh và văn học Trung Hoa. Có khả năng thuyết trình và viết bài luận học thuật 80-100 chữ.',
    objectivesVi: [
      'Làm chủ 2500 từ vựng cao cấp và thành ngữ (成语) thông dụng',
      'Phân biệt sắc thái các từ đồng nghĩa gần nghĩa tinh tế',
      'Đọc hiểu bài đọc dài 600-800 chữ mang tính học thuật cao',
      'Viết đoạn văn ngắn dựa trên 5 từ khóa cho trước hoặc miêu tả tranh'
    ],
    color: 'from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-700 dark:text-purple-400',
    accentColor: '#7C3AED'
  },
  {
    level: 6,
    title: 'HSK 6',
    titleVi: 'Cấp Độ 6 — Thành Thạo Toàn Diện Như Người Bản Xứ',
    subtitle: '5000+ Từ Vựng Chuyên Nghiệp',
    targetWords: 5000,
    descriptionVi: 'Cấp độ cao nhất của hệ thống HSK 6 bậc. Đọc hiểu tài liệu chuyên ngành, nghị luận xã hội sâu sắc và tóm tắt văn bản 1000 chữ thành 400 chữ.',
    objectivesVi: [
      'Vốn từ 5000+ từ vựng bao quát triết học, kinh tế, khoa học và văn hóa',
      'Nhận diện lỗi sai ngữ pháp tinh vi trong câu (Bệnh cú - 病句)',
      'Đọc hiểu tài liệu chuyên ngành và văn bản dài với tốc độ cao',
      'Viết tóm tắt rút gọn văn bản tự sự 1000 chữ chính xác và cô đọng'
    ],
    color: 'from-rose-500/10 to-amber-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400',
    accentColor: '#E11D48'
  }
];

// SAMPLE VOCABULARY ACROSS ALL 6 LEVELS
export const HSK_VOCABULARY_DATA: HskWordItem[] = [
  // HSK 1
  {
    id: 'hsk1-w1',
    level: 1,
    hanzi: '你好',
    pinyin: 'nǐ hǎo',
    partOfSpeech: 'cụm từ',
    meaningVi: 'Xin chào',
    meaningEn: 'Hello, hi',
    radical: '亻 (nhân đứng)',
    exampleSentence: '你好！很高兴认识你。',
    examplePinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ.',
    exampleVi: 'Xin chào! Rất vui được làm quen với bạn.'
  },
  {
    id: 'hsk1-w2',
    level: 1,
    hanzi: '谢谢',
    pinyin: 'xièxie',
    partOfSpeech: 'động từ',
    meaningVi: 'Cảm ơn',
    meaningEn: 'Thank you, thanks',
    radical: '讠 (ngôn)',
    exampleSentence: '太谢谢你的帮助了。',
    examplePinyin: 'Tài xièxie nǐ de bāngzhù le.',
    exampleVi: 'Rất cảm ơn sự giúp đỡ của bạn.'
  },
  {
    id: 'hsk1-w3',
    level: 1,
    hanzi: '喜欢',
    pinyin: 'xǐhuan',
    partOfSpeech: 'động từ',
    meaningVi: 'Thích, yêu thích',
    meaningEn: 'To like, to be fond of',
    radical: '口 (khẩu)',
    exampleSentence: '我很喜欢学习汉语。',
    examplePinyin: 'Wǒ hěn xǐhuan xuéxí Hànyǔ.',
    exampleVi: 'Tôi rất thích học tiếng Trung.'
  },

  // HSK 2
  {
    id: 'hsk2-w1',
    level: 2,
    hanzi: '便宜',
    pinyin: 'piányi',
    partOfSpeech: 'tính từ',
    meaningVi: 'Rẻ, giá cả phải chăng',
    meaningEn: 'Cheap, inexpensive',
    radical: '亻 (nhân đứng)',
    exampleSentence: '这件衣服既好看又便宜。',
    examplePinyin: 'Zhè jiàn yīfu jì hǎokàn yòu piányi.',
    exampleVi: 'Chiếc áo này vừa đẹp lại vừa rẻ.'
  },
  {
    id: 'hsk2-w2',
    level: 2,
    hanzi: '旅游',
    pinyin: 'lǚyóu',
    partOfSpeech: 'động từ/danh từ',
    meaningVi: 'Du lịch, đi tham quan',
    meaningEn: 'To travel, journey',
    radical: '方 (phương)',
    exampleSentence: '我们打算明年去北京旅游。',
    examplePinyin: 'Wǒmen dǎsuàn míngnián qù Běijīng lǚyóu.',
    exampleVi: 'Chúng tôi dự định năm sau đi du lịch Bắc Kinh.'
  },

  // HSK 3
  {
    id: 'hsk3-w1',
    level: 3,
    hanzi: '解决',
    pinyin: 'jiějué',
    partOfSpeech: 'động từ',
    meaningVi: 'Giải quyết, xử lý (vấn đề)',
    meaningEn: 'To solve, to settle',
    radical: '角 (giác)',
    exampleSentence: '这个问题我们必须尽快解决。',
    examplePinyin: 'Zhè gè wèntí wǒmen bìxū jǐnkuài jiějué.',
    exampleVi: 'Vấn đề này chúng ta phải giải quyết càng sớm càng tốt.'
  },
  {
    id: 'hsk3-w2',
    level: 3,
    hanzi: '环境',
    pinyin: 'huánjìng',
    partOfSpeech: 'danh từ',
    meaningVi: 'Môi trường, hoàn cảnh',
    meaningEn: 'Environment, surroundings',
    radical: '王 (ngọc)',
    exampleSentence: '保护城市环境人人有责。',
    examplePinyin: 'Bǎohù chéngshì huánjìng rénrén yǒu zé.',
    exampleVi: 'Bảo vệ môi trường thành phố là trách nhiệm của mọi người.'
  },

  // HSK 4
  {
    id: 'hsk4-w1',
    level: 4,
    hanzi: '坚持',
    pinyin: 'jiānchí',
    partOfSpeech: 'động từ',
    meaningVi: 'Kiên trì, giữ vững',
    meaningEn: 'To persist, to persevere',
    radical: '土 (thổ)',
    exampleSentence: '只要坚持锻炼，身体就会越来越好。',
    examplePinyin: 'Zhǐyào jiānchí duànliàn, shēntǐ jiù huì yuè lái yuè hǎo.',
    exampleVi: 'Chỉ cần kiên trì tập luyện, sức khỏe sẽ ngày càng tốt hơn.'
  },
  {
    id: 'hsk4-w2',
    level: 4,
    hanzi: '究竟',
    pinyin: 'jiūjìng',
    partOfSpeech: 'phó từ',
    meaningVi: 'Rốt cuộc, cuối cùng (nhấn mạnh nghi vấn)',
    meaningEn: 'After all, actually',
    radical: '穴 (huyệt)',
    exampleSentence: '你究竟什么时候能完成这份报告？',
    examplePinyin: 'Nǐ jiūjìng shénme shíhou néng wánchéng zhè fèn bàogào?',
    exampleVi: 'Rốt cuộc thì khi nào bạn mới hoàn thành bản báo cáo này?'
  },

  // HSK 5
  {
    id: 'hsk5-w1',
    level: 5,
    hanzi: '潜移默化',
    pinyin: 'qián yí mò huà',
    partOfSpeech: 'thành ngữ (成语)',
    meaningVi: 'Mưa dầm thấm lâu, ngấm ngầm biến đổi theo thời gian',
    meaningEn: 'Subtle influence over time, imperceptible transformation',
    radical: '氵 (thủy)',
    exampleSentence: '父母的言行举止对孩子起着潜移默化的作用。',
    examplePinyin: 'Fùmǔ de yánxíng jǔzhǐ duì háizi qǐ zhe qián yí mò huà de zuòyòng.',
    exampleVi: 'Lời nói và hành động của cha mẹ có tác động mưa dầm thấm lâu đối với con cái.'
  },
  {
    id: 'hsk5-w2',
    level: 5,
    hanzi: '趋势',
    pinyin: 'qūshì',
    partOfSpeech: 'danh từ',
    meaningVi: 'Xu thế, chiều hướng phát triển',
    meaningEn: 'Trend, tendency',
    radical: '走 (tẩu)',
    exampleSentence: '数字化转型已成为全球企业发展的必然趋势。',
    examplePinyin: 'Shùzìhuà zhuǎnxíng yǐ chéngwéi quánqiú qǐyè fāzhǎn de bìrán qūshì.',
    exampleVi: 'Chuyển đổi số đã trở thành xu thế tất yếu của các doanh nghiệp toàn cầu.'
  },

  // HSK 6
  {
    id: 'hsk6-w1',
    level: 6,
    hanzi: '潜移默化',
    pinyin: 'bìng fēi',
    partOfSpeech: 'phó từ',
    meaningVi: 'Hoàn toàn không phải (văn phong trang trọng)',
    meaningEn: 'Not at all, by no means',
    radical: '一',
    exampleSentence: '成功并非偶然，而是日积月累努力的结果。',
    examplePinyin: 'Chénggōng bìng fēi ǒurán, ér shì rì jī yuè lěi nǔlì de jiéguǒ.',
    exampleVi: 'Thành công hoàn toàn không phải ngẫu nhiên, mà là kết quả của sự nỗ lực tích lũy ngày qua ngày.'
  },
  {
    id: 'hsk6-w2',
    level: 6,
    hanzi: '见微知著',
    pinyin: 'jiàn wēi zhī zhù',
    partOfSpeech: 'thành ngữ (成语)',
    meaningVi: 'Thấy đốm lửa biết đám cháy; nhìn từ chi tiết nhỏ thấy được bản chất lớn',
    meaningEn: 'From small signs one can discern large trends',
    radical: '见 (kiến)',
    exampleSentence: '优秀的管理者善于见微知著，在萌芽状态化解危机。',
    examplePinyin: 'Yōuxiù de guǎnlǐzhě shànyú jiàn wēi zhī zhù, zài méngyá zhuàngtài huàjiě wēijī.',
    exampleVi: 'Nhà quản lý xuất sắc biết nhìn từ chi tiết nhỏ để hóa giải khủng hoảng ngay từ giai đoạn manh nha.'
  }
];

// SAMPLE CHARACTERS & RADICALS DATA
export const HSK_CHARACTERS_DATA: HskCharacterItem[] = [
  {
    char: '你',
    pinyin: 'nǐ',
    radical: '亻 (nhân đứng)',
    strokeCount: 7,
    meaningVi: 'Bạn, anh, chị (ngôi thứ 2)',
    commonWords: [
      { hanzi: '你好', pinyin: 'nǐhǎo', vi: 'Xin chào' },
      { hanzi: '你们', pinyin: 'nǐmen', vi: 'Các bạn' }
    ]
  },
  {
    char: '好',
    pinyin: 'hǎo',
    radical: '女 (nữ)',
    strokeCount: 6,
    meaningVi: 'Tốt, đẹp, hay (Nữ + Tử = Điều tốt lành)',
    commonWords: [
      { hanzi: '好看', pinyin: 'hǎokàn', vi: 'Đẹp mắt' },
      { hanzi: '好吃', pinyin: 'hǎochī', vi: 'Ngon miệng' }
    ]
  },
  {
    char: '学',
    pinyin: 'xué',
    radical: '子 (tử)',
    strokeCount: 8,
    meaningVi: 'Học tập, bắt chước',
    commonWords: [
      { hanzi: '学生', pinyin: 'xuésheng', vi: 'Học sinh' },
      { hanzi: '学校', pinyin: 'xuéxiào', vi: 'Trường học' }
    ]
  },
  {
    char: '语',
    pinyin: 'yǔ',
    radical: '讠 (ngôn)',
    strokeCount: 9,
    meaningVi: 'Ngôn ngữ, lời nói (Ngôn + Ngũ + Khẩu)',
    commonWords: [
      { hanzi: '汉语', pinyin: 'Hànyǔ', vi: 'Tiếng Hán' },
      { hanzi: '语言', pinyin: 'yǔyán', vi: 'Ngôn ngữ' }
    ]
  }
];

// SAMPLE GRAMMAR RULES ACROSS ALL 6 LEVELS
export const HSK_GRAMMAR_DATA: HskGrammarRule[] = [
  // HSK 1 Grammar
  {
    id: 'hsk1-g1',
    level: 1,
    title: 'Câu phán đoán với 是 (shì)',
    titleVi: 'Cấu trúc câu khẳng định với 是 (Là)',
    pattern: 'Chủ ngữ + 是 + Danh từ / Cụm danh từ',
    explanationVi: 'Từ "是" tương đương với động từ "to be" trong tiếng Anh hoặc "là" trong tiếng Việt, dùng để biểu thị danh tính, nghề nghiệp, quốc tịch.',
    exampleChinese: '我是越南人。她是我的汉语老师。',
    examplePinyin: 'Wǒ shì Yuènán rén. Tā shì wǒ de Hànyǔ lǎoshī.',
    exampleVi: 'Tôi là người Việt Nam. Cô ấy là giáo viên tiếng Trung của tôi.',
    commonMistakeVi: 'Không dùng "是" trước tính từ. Ví dụ KHÔNG nói: "我很好" -> KHÔNG nói "我是好".',
    practiceQuestions: [
      {
        question: 'Chọn câu viết đúng ngữ pháp:',
        options: [
          'A. 他是我的同学。(Tā shì wǒ de tóngxué.)',
          'B. 他是很高。(Tā shì hěn gāo.)',
          'C. 我是学习汉语。(Wǒ shì xuéxí Hànyǔ.)',
          'D. 他朋友是我。(Tā péngyou shì wǒ.)'
        ],
        correctAnswer: 'A',
        explanationVi: 'Đáp án A dùng chuẩn 是 nối chủ ngữ với danh từ "bạn cùng lớp".'
      }
    ]
  },

  // HSK 2 Grammar
  {
    id: 'hsk2-g1',
    level: 2,
    title: 'Câu so sánh với 比 (bǐ)',
    titleVi: 'Cấu trúc so sánh hơn với chữ 比',
    pattern: 'A + 比 + B + Tính từ [+ Cụm từ chênh lệch]',
    explanationVi: 'Chữ 比 dùng để so sánh tính chất giữa hai đối tượng A và B. Nếu muốn nêu rõ mức độ chênh lệch nhiều hay ít, đặt 一点儿 / 得多 / 具体数字 ở cuối câu.',
    exampleChinese: '今天比昨天冷得多。',
    examplePinyin: 'Jīntiān bǐ zuótiān lěng de duō.',
    exampleVi: 'Hôm nay lạnh hơn hôm qua rất nhiều.',
    commonMistakeVi: 'Không đặt "很", "非常", "真" trước tính từ trong câu chữ 比. Ví dụ KHÔNG nói: "A 比 B 很好".',
    practiceQuestions: [
      {
        question: 'Câu nào sau đây vi phạm quy tắc câu so sánh chữ 比?',
        options: [
          'A. 哥哥比我高五厘米。(Anh trai cao hơn tôi 5 cm)',
          'B. 这本书比那本书很有意思。(Cuốn sách này hay hơn cuốn kia rất nhiều)',
          'C. 妹妹比我跑得快。(Em gái chạy nhanh hơn tôi)',
          'D. 今天的西瓜比昨天的甜一点儿。(Dưa hấu hôm nay ngọt hơn hôm qua một chút)'
        ],
        correctAnswer: 'B',
        explanationVi: 'Trong câu chữ 比 tuyệt đối không dùng phó từ chỉ mức độ "很". Phải sửa thành: 这本书比那本书有意思得多。'
      }
    ]
  },

  // HSK 3 Grammar
  {
    id: 'hsk3-g1',
    level: 3,
    title: 'Câu chữ 把 (bǎ) căn bản',
    titleVi: 'Cấu trúc câu xử lý với chữ 把 (Cơ bản)',
    pattern: 'Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác',
    explanationVi: 'Câu chữ 把 nhấn mạnh hành động gây tác động và làm biến đổi hoặc dịch chuyển vị trí của đối tượng/tân ngữ.',
    exampleChinese: '请把门关上。',
    examplePinyin: 'Qǐng bǎ mén guān shang.',
    exampleVi: 'Xin hãy đóng cửa lại.',
    commonMistakeVi: 'Động từ sau tân ngữ không được đứng đơn độc, bắt buộc phải có thành phần khác như 了, 到, 在, bổ ngữ xu hướng.',
    practiceQuestions: [
      {
        question: 'Chọn câu sắp xếp đúng cấu trúc câu chữ 把:',
        options: [
          'A. 我把护照带在身边了。',
          'B. 我带护照在身边把。',
          'C. 把我护照带了。',
          'D. 护照给我把带上。'
        ],
        correctAnswer: 'A',
        explanationVi: 'Chủ ngữ (我) + 把 + Tân ngữ (护照) + Động từ (带) + Bổ ngữ (在身边了).'
      }
    ]
  },

  // HSK 4 Grammar
  {
    id: 'hsk4-g1',
    level: 4,
    title: 'Câu bị động với 被 (bèi)',
    titleVi: 'Cấu trúc câu bị động với chữ 被',
    pattern: 'Chủ ngữ (kẻ bị hại/chịu tác động) + 被 + [Kẻ gây ra] + Động từ + Thành phần khác',
    explanationVi: 'Dùng để diễn tả một sự việc không mong muốn hoặc bị tác động bởi một chủ thể khác.',
    exampleChinese: '我的自行车被小偷偷走了。',
    examplePinyin: 'Wǒ de zìxíngchē bèi xiǎotōu tōu zǒu le.',
    exampleVi: 'Xe đạp của tôi đã bị kẻ trộm lấy cắp mất rồi.',
    commonMistakeVi: 'Trong văn nói có thể thay 被 bằng 叫 hoặc 让, nhưng sau 叫 và 让 bắt buộc phải có đối tượng thực hiện hành động.',
    practiceQuestions: [
      {
        question: 'Điền từ thích hợp: 那个漂亮的蛋糕被弟弟_____了。',
        options: [
          'A. 吃了 (chī le)',
          'B. 学习 (xuéxí)',
          'C. 跑步 (pǎobù)',
          'D. 漂亮 (piàoliang)'
        ],
        correctAnswer: 'A',
        explanationVi: 'Bánh kem bị em trai ăn mất (吃了).'
      }
    ]
  },

  // HSK 5 Grammar
  {
    id: 'hsk5-g1',
    level: 5,
    title: 'Phân biệt 尽管 (jǐnguǎn) và 不管 (bùguǎn)',
    titleVi: 'Phân biệt cặp liên từ cao cấp 尽管 (Dù cho) và 不管 (Bất kể)',
    pattern: '尽管...但是... (Nhượng bộ sự thật) VS 不管...都... (Điều kiện bất biến)',
    explanationVi: '尽管 biểu thị sự nhượng bộ trước một sự thật đã xảy ra hoặc chắc chắn xảy ra. 不管 đứng trước đại từ nghi vấn (谁, 什么, 怎么) hoặc phương án lựa chọn biểu thị bất kể điều kiện thế nào thì kết quả vẫn không đổi.',
    exampleChinese: '尽管天气很冷，他还是坚持跑步。不管遇到什么困难，我们都要勇敢面对。',
    examplePinyin: 'Jǐnguǎn tiānqì hěn lěng, tā háishì jiānchí pǎobù. Bùguǎn yù dào shénme kùnnan, wǒmen dōu yào yǒnggǎn miànduì.',
    exampleVi: 'Dù cho trời rất lạnh, anh ấy vẫn kiên trì chạy bộ. Bất kể gặp khó khăn gì, chúng ta đều phải dũng cảm đối mặt.',
    commonMistakeVi: 'Nhầm lẫn giữa điều kiện không điều kiện (sau 不管 phải có yếu tố nghi vấn) với sự thật đã xác định (sau 尽管).',
    practiceQuestions: [
      {
        question: 'Điền từ thích hợp: _____条件多么艰苦，科学家们_____没有放弃实验。',
        options: [
          'A. 不管 / 都 (Bất kể / đều)',
          'B. 尽管 / 但是 (Mặc dù / nhưng)',
          'C. 因为 / 所以 (Bởi vì / cho nên)',
          'D. 只有 / 才 (Chỉ có / mới)'
        ],
        correctAnswer: 'A',
        explanationVi: 'Có từ nghi vấn "多么" (dù cho đến mức nào) nên phải dùng cấu trúc "不管...都...".'
      }
    ]
  },

  // HSK 6 Grammar
  {
    id: 'hsk6-g1',
    level: 6,
    title: 'Nhận diện Lỗi sai ngữ pháp (病句辨析)',
    titleVi: 'Phân tích lỗi sai thành phần câu HSK 6: Thiếu chủ ngữ & Trộn lẫn cấu trúc',
    pattern: 'Nguyên nhân: Do dùng sai cụm giới từ "通过...使..." hoặc "在...下"',
    explanationVi: 'Dạng bài độc quyền của HSK 6. Lỗi kinh điển là dùng giới từ ở cả đầu câu và giữa câu khiến câu biến thành hai trạng ngữ liên tiếp, hoàn toàn mất đi chủ ngữ ngữ pháp.',
    exampleChinese: '【Câu sai】: 通过这次社会实践，使我学到了很多书本上没有的知识。\n【Câu sửa】: 这次社会实践使我学到了很多书本上没有的知识。',
    examplePinyin: 'Zhè cì shèhuì shíjiàn shǐ wǒ xué dào le hěnduō shūběn shang méiyǒu de zhīshi.',
    exampleVi: 'Chuyến thực hành xã hội này đã giúp tôi học được rất nhiều kiến thức không có trong sách vở.',
    commonMistakeVi: 'Khi thấy cả "通过" và "使" hoặc "让" trong cùng một câu, 90% câu đó bị lỗi thiếu chủ ngữ.',
    practiceQuestions: [
      {
        question: 'Câu nào sau đây KHÔNG MẮC LỖI ngữ pháp (Câu đúng)?',
        options: [
          'A. 通过老师的耐心讲解，使我终于明白了这道数学题。',
          'B. 老师的耐心讲解，让我终于明白了这道数学题。',
          'C. 在老师的帮助下，让我有了很大的进步。',
          'D. 经过大家的共同努力，使工程提前竣工了。'
        ],
        correctAnswer: 'B',
        explanationVi: 'Câu B có chủ ngữ rõ ràng "老师的耐心讲解". Các câu A, C, D đều mắc lỗi kinh điển lược bỏ chủ ngữ do lạm dụng cặp giới từ.'
      }
    ]
  }
];

// SAMPLE READING PASSAGES ACROSS ALL 6 LEVELS
export const HSK_READING_DATA: HskReadingPassage[] = [
  // HSK 1 Reading
  {
    id: 'hsk1-r1',
    level: 1,
    title: '我的中国朋友 (Người bạn Trung Quốc của tôi)',
    titleVi: 'Bài đọc HSK 1: Người bạn Trung Quốc',
    chineseText: '我叫李明。我有三个好朋友。他们是张医生、王老师和大卫。我们都喜欢在星期六下午喝茶看书。今天天气很好，我们去公园散步。',
    pinyinText: 'Wǒ jiào Lǐ Míng. Wǒ yǒu sān gè hǎo péngyou. Tāmen shì Zhāng yīshēng, Wáng lǎoshī hé Dàwèi. Wǒmen dōu xǐhuan zài xīngqīliù xiàwǔ hē chá kàn shū. Jīntiān tiānqì hěn hǎo, wǒmen qù gōngyuán sànbù.',
    translationVi: 'Tôi tên là Lý Minh. Tôi có 3 người bạn thân. Họ là bác sĩ Trương, cô giáo Vương và David. Chúng tôi đều thích uống trà đọc sách vào chiều thứ Bảy. Hôm nay thời tiết rất đẹp, chúng tôi đến công viên đi dạo.',
    questions: [
      {
        id: 'hsk1-rq1',
        prompt: '李明有几个好朋友？(Lý Minh có mấy người bạn thân?)',
        promptVi: 'Lý Minh có bao nhiêu người bạn thân?',
        options: [
          { key: 'A', text: '两个 (2 người)', textVi: '2 người' },
          { key: 'B', text: '三个 (3 người)', textVi: '3 người' },
          { key: 'C', text: '四个 (4 người)', textVi: '4 người' },
          { key: 'D', text: '五个 (5 người)', textVi: '5 người' }
        ],
        correctAnswer: 'B',
        explanationVi: 'Bài viết nêu rõ: "我有三个好朋友" -> 3 người bạn (B).'
      }
    ]
  },

  // HSK 2 Reading
  {
    id: 'hsk2-r1',
    level: 2,
    title: '在餐馆点菜 (Gọi món tại nhà hàng)',
    titleVi: 'Bài đọc HSK 2: Gọi món ăn tại nhà hàng',
    chineseText: '服务员，请给我们看一下菜单。我想吃一点儿米饭和羊肉，请少放辣。我朋友不吃肉，请给她来一盘新鲜的蔬菜。请问你们这里有什么好喝的水果茶吗？',
    pinyinText: 'Fúwùyuán, qǐng gěi wǒmen kàn yíxià càidān. Wǒ xiǎng chī yìdiǎnr mǐfàn hé yángròu, qǐng shǎo fàng là. Wǒ péngyou bù chī ròu, qǐng gěi tā lái yì pán xīnxiān de shūcài. Qǐngwèn nǐmen zhèlǐ yǒu shénme hǎohē de shuǐguǒ chá ma?',
    translationVi: 'Phục vụ, làm ơn cho chúng tôi xem thực đơn. Tôi muốn ăn một chút cơm và thịt cừu, xin cho ít ớt cay. Bạn tôi không ăn thịt, xin cho cô ấy một đĩa rau tươi. Xin hỏi ở đây có trà hoa quả nào ngon không?',
    questions: [
      {
        id: 'hsk2-rq1',
        prompt: '他的朋友想吃什么？(Bạn của anh ấy muốn ăn gì?)',
        promptVi: 'Người bạn đi cùng muốn ăn món gì?',
        options: [
          { key: 'A', text: '羊肉 (Thịt cừu)', textVi: 'Thịt cừu' },
          { key: 'B', text: '米饭 (Cơm trắng)', textVi: 'Cơm' },
          { key: 'C', text: '蔬菜 (Rau tươi)', textVi: 'Rau xanh' },
          { key: 'D', text: '牛肉 (Thịt bò)', textVi: 'Thịt bò' }
        ],
        correctAnswer: 'C',
        explanationVi: 'Bài viết có câu: "我朋友不吃肉，请给她来一盘新鲜的蔬菜" -> Ăn rau tươi (C).'
      }
    ]
  },

  // HSK 3 Reading
  {
    id: 'hsk3-r1',
    level: 3,
    title: '选择合适的工作 (Lựa chọn công việc phù hợp)',
    titleVi: 'Bài đọc HSK 3: Chọn lựa nghề nghiệp phù hợp',
    chineseText: '找工作的时候，薪水当然重要，但并不是唯一的考虑因素。工作环境、是否有学习和提高的机会，以及同事之间的关系，对个人的长远发展有着更深的影响。如果每天都带着积极的心情去上班，工作效率自然就会大大提高。',
    pinyinText: 'Zhǎo gōngzuò de shíhou, xīnshuǐ dāngrán zhòngyào, dàn bìng bú shì wéiyī de kǎolǜ yīnsù. Gōngzuò huánjìng, shìfǒu yǒu xuéxí hé tígāo de jīhuì, yǐjí tóngshì zhījiān de guānxi, duì gèrén de chángyuǎn fāzhǎn yǒu zhe gèng shēn de yǐngxiǎng. Rúguǒ měitiān dōu dài zhe jījí de xīnqíng qù shàngbān, gōngzuò xiàolǜ zìrán jiù huì dàdà tígāo.',
    translationVi: 'Khi tìm việc làm, tiền lương đương nhiên quan trọng nhưng hoàn toàn không phải yếu tố duy nhất. Môi trường làm việc, cơ hội học hỏi phát triển và mối quan hệ đồng nghiệp có ảnh hưởng sâu sắc hơn đến tương lai lâu dài.',
    questions: [
      {
        id: 'hsk3-rq1',
        prompt: '根据短文，找工作时什么对长远发展更重要？',
        promptVi: 'Theo đoạn văn, điều gì quan trọng hơn cho sự phát triển lâu dài khi tìm việc?',
        options: [
          { key: 'A', text: '只看工资高不高 (Chỉ xem lương cao hay thấp)', textVi: 'Chỉ xem lương' },
          { key: 'B', text: '工作环境与学习提升的机会 (Môi trường & cơ hội nâng cao bản thân)', textVi: 'Môi trường & cơ hội học hỏi' },
          { key: 'C', text: '离家近不近 (Gần nhà hay xa nhà)', textVi: 'Gần nhà' },
          { key: 'D', text: '有没有很多假期 (Có nhiều ngày nghỉ không)', textVi: 'Nhiều kỳ nghỉ' }
        ],
        correctAnswer: 'B',
        explanationVi: 'Đoạn văn viết: "工作环境、是否有学习和提高的机会...对个人的长远发展有着更深的影响".'
      }
    ]
  },

  // HSK 4 Reading
  {
    id: 'hsk4-r1',
    level: 4,
    title: '绿色出行与共享经济 (Giao thông xanh & Kinh tế chia sẻ)',
    titleVi: 'Bài đọc HSK 4: Giao thông xanh và phong cách sống đô thị hiện đại',
    chineseText: '近年来，绿色低碳的生活理念深入人心。共享单车的广泛普及，不仅有效解决了城市公共交通"最后一公里"的接驳难题，还显著缓解了道路交通拥堵，降低了尾气排放。越来越多市民选择扫码骑行，既锻炼了身体，又为净化空气贡献了一份力量。',
    pinyinText: 'Jìnnián lái, lǜsè dī tàn de shēnghuó lǐniàn shēnrù rénxīn. Gòngxiǎng dānchē de guǎngfàn pǔjí, bùjǐn yǒuxiào jiějué le chéngshì gōnggòng jiāotōng "zuìhòu yì gōnglǐ" de jiēbó nántí, hái xiǎnzhù huǎnjiě le dàolù jiāotōng yōngdǔ, jiàngdī le wěiqì páifàng. Yuè lái yuè duō shìmín xuǎnzé sǎomǎ qíxíng, jì duànliàn le shēntǐ, yòu wèi jìnghuà kōngqì gòngxiàn le yí fèn lìliang.',
    translationVi: 'Những năm gần đây, quan niệm sống xanh ít carbon đã đi sâu vào lòng người. Việc xe đạp công cộng phổ biến rộng rãi không những giải quyết bài toán chặng cuối cùng mà còn giảm thiểu ùn tắc và ô nhiễm khí thải.',
    questions: [
      {
        id: 'hsk4-rq1',
        prompt: '共享单车的普及带来了什么积极影响？',
        promptVi: 'Sự phổ biến của xe đạp chia sẻ mang lại tác động tích cực nào?',
        options: [
          { key: 'A', text: '买车的人变多了 (Người mua xe hơi nhiều hơn)', textVi: 'Nhiều người mua xe hơn' },
          { key: 'B', text: '缓解交通拥堵并减少尾气污染 (Giảm ùn tắc và ô nhiễm khí thải)', textVi: 'Giảm ùn tắc & khí thải' },
          { key: 'C', text: '地铁票价下降了 (Giá vé tàu điện ngầm giảm)', textVi: 'Vé tàu giảm giá' },
          { key: 'D', text: '道路变得更狭窄 (Đường sá trở nên hẹp hơn)', textVi: 'Đường hẹp lại' }
        ],
        correctAnswer: 'B',
        explanationVi: 'Dẫn chứng: "还显著缓解了道路交通拥堵，降低了尾气排放" -> Giảm ùn tắc và khí thải (B).'
      }
    ]
  },

  // HSK 5 Reading
  {
    id: 'hsk5-r1',
    level: 5,
    title: '阅读习惯与大脑重塑 (Thói quen đọc sách & Tái định hình não bộ)',
    titleVi: 'Bài đọc HSK 5: Thói quen đọc sách và sự tái cấu trúc nơ-ron não bộ',
    chineseText: '现代神经科学研究揭示，深度阅读不仅是一种获取信息的认知活动，更是重塑大脑神经连接的有力途径。在阅读富有隐喻与逻辑思辨的长文本时，大脑的多个功能区域会被协同激活，显著增强读者的同理心、专注力与复杂批判性思维。相比碎片化的短视频浏览，深度阅读能有效对抗注意力涣散，让现代人在浮躁的信息洪流中保持内心的笃定与深刻。',
    pinyinText: 'Xiàndài shénjīng kēxué yánjiū jiēshì, shēndù yuèdú bùjǐn shì yì zhǒng huòqǔ xìnxī de rènzhī huódòng, gèng shì chóngsù dànǎo shénjīng liánjiē de yǒulì tújìng. Zài yuèdú fùyǒu yǐnyù yǔ luóji sībiàn de cháng wénběn shí, dànǎo de duō gè gōngnéng qūyù huì bèi xiétóng jīhuó, xiǎnzhù zēngqiáng dúzhě de tónglǐ xīn, zhuānzhù lì yǔ fùzá pīpàn xìng sīwéi. Xiāngbǐ suìpiàn huà de duǎn shìpín liúlǎn, shēndù yuèdú néng yǒuxiào duìkàng zhùyì lì huànsàn, ràng xiàndài rén zài fúzào de xìnxī hóngliú zhōng bǎochí nèixīn de dǔdìng yǔ shēnkè.',
    translationVi: 'Nghiên cứu khoa học thần kinh hiện đại chỉ ra rằng đọc sâu không chỉ tiếp nhận thông tin mà còn tái định hình các khớp thần kinh não bộ, củng cố sự tập trung và tư duy phản biện chống lại sự phân tán chú ý của các video ngắn.',
    questions: [
      {
        id: 'hsk5-rq1',
        prompt: '根据短文，深度阅读的核心益处是什么？',
        promptVi: 'Theo đoạn văn, lợi ích cốt lõi của việc đọc sâu là gì?',
        options: [
          { key: 'A', text: '提高阅读速度 (Tăng tốc độ đọc lướt)', textVi: 'Tăng tốc độ đọc' },
          { key: 'B', text: '重塑大脑神经连接并增强专注力与批判性思维 (Tái kết nối nơ-ron, tăng tập trung & tư duy phản biện)', textVi: 'Tái tạo nơ-ron & tư duy phản biện' },
          { key: 'C', text: '减少睡眠时间 (Giảm thời gian ngủ)', textVi: 'Ít ngủ hơn' },
          { key: 'D', text: '取代所有社交活动 (Thay thế mọi giao tiếp xã hội)', textVi: 'Thay thế giao tiếp' }
        ],
        correctAnswer: 'B',
        explanationVi: 'Dẫn chứng: "重塑大脑神经连接... 显著增强读者的同理心、专注力与复杂批判性思维".'
      }
    ]
  },

  // HSK 6 Reading
  {
    id: 'hsk6-r1',
    level: 6,
    title: '传统文化在当代的创造性转化 (Sự chuyển hóa sáng tạo của văn hóa truyền thống)',
    titleVi: 'Bài đọc HSK 6: Chuyển hóa sáng tạo của di sản văn hóa trong thời đại số',
    chineseText: '非物质文化遗产并非封存在博物馆玻璃柜中的陈旧化石，而是具有内在生命力的文化基因。在全球化与数字化浪潮的激荡下，优秀传统文化若想历久弥新，必须秉持"创造性转化与创新性发展"的理念。通过融合现代审美范式、数字沉浸交互技术以及契合当代青年价值认同的叙事策略，古老的传统技艺与哲学智慧方能打破圈层壁垒，重新焕发勃勃生机，成为构筑国家文化软实力与民族认同感的坚实基石。',
    pinyinText: 'Fēi wùzhì wénhuà yíchǎn bìng fēi fēngcún zài bówùguǎn bōli guì zhōng de chénjiù huàshí, ér shì jùyǒu nèizài shēngmìng lì de wénhuà jīyīn. Zài quánqiú huà yǔ shùzì huà làngcháo de jīdàng xià, yōuxiù chuántǒng wénhuà ruò xiǎng lì jiǔ mí xīn, bìxū bǐngchí "chuàngzào xìng zhuǎnhuà yǔ chuàngxīn xìng fāzhǎn" de lǐniàn. Tōngguò rónghé xiàndài shěnměi fànshì, shùzì chénjìn jiāohù jìshù yǐjí qìhé dāngdài qīngnián jiàzhí rèntóng de xùshì cèlüè, gǔlǎo de chuántǒng jìyì yǔ zhéxué zhìhuì fāng néng dǎpò quāncéng bìlěi, chóngxīn huànfā bóbó shēngjī, chéngwéi gòuzhù guójiā wénhuà ruǎnlìliàng yǔ mínzú rèntóng gǎn de jiānshí jīshí.',
    translationVi: 'Di sản phi vật thể không phải hóa thạch trong tủ kính mà mang gen văn hóa sống động. Để tồn tại trường tồn trong kỷ nguyên số, di sản cần chuyển hóa sáng tạo qua công nghệ tương tác nhập vai và thẩm mỹ hiện đại.',
    questions: [
      {
        id: 'hsk6-rq1',
        prompt: '文章认为非遗文化保持生命力的关键路径是什么？',
        promptVi: 'Bài viết cho rằng con đường then chốt để di sản văn hóa giữ vững sức sống là gì?',
        options: [
          { key: 'A', text: '原封不动地锁在博物馆 (Khóa kín nguyên vẹn trong bảo tàng)', textVi: 'Khóa trong bảo tàng' },
          { key: 'B', text: '完全抛弃传统技艺 (Vứt bỏ kỹ nghệ truyền thống)', textVi: 'Bỏ kỹ nghệ xưa' },
          { key: 'C', text: '创造性转化，融合现代数字技术与当代审美范式 (Chuyển hóa sáng tạo, dung hợp công nghệ số & thẩm mỹ hiện đại)', textVi: 'Chuyển hóa sáng tạo & công nghệ' },
          { key: 'D', text: '仅在老年人中传承 (Chỉ truyền thụ trong người già)', textVi: 'Chỉ truyền cho người già' }
        ],
        correctAnswer: 'C',
        explanationVi: 'Dẫn chứng: "必须秉持\'创造性转化与创新性发展\'的理念。通过融合现代审美范式、数字沉浸交互技术...".'
      }
    ]
  }
];

// SAMPLE WRITING & SENTENCE REORDER EXERCISES ACROSS ALL 6 LEVELS
export const HSK_WRITING_DATA: HskWritingExercise[] = [
  // HSK 1: Simple word ordering
  {
    id: 'hsk1-wri-1',
    level: 1,
    type: 'word_order',
    prompt: '连词成句 (Sắp xếp các từ thành câu hoàn chỉnh HSK 1):',
    promptVi: 'Sắp xếp các từ thành câu chào hỏi chuẩn:',
    tokens: ['很', '认识', '高兴', '你', '我'],
    correctAnswer: '我 认识 你 很 高兴',
    hintVi: 'Cấu trúc: Chủ ngữ + Động từ + Tân ngữ + Tính từ biểu thị cảm xúc.',
    explanationVi: 'Câu hoàn chỉnh: 我认识你很高兴 (hoặc 很高兴认识你).'
  },

  // HSK 2: Comparison & Location
  {
    id: 'hsk2-wri-1',
    level: 2,
    type: 'word_order',
    prompt: '连词成句 (Sắp xếp câu so sánh hơn chữ 比 HSK 2):',
    promptVi: 'Sắp xếp câu so sánh nhiệt độ giữa hai ngày:',
    tokens: ['昨天', '今天', '比', '冷', '一点儿'],
    correctAnswer: '今天 比 昨天 冷 一点儿',
    hintVi: 'Công thức so sánh: A + 比 + B + Tính từ + 一点儿.',
    explanationVi: 'Cấu trúc chuẩn: 今天比昨天冷一点儿。(Hôm nay lạnh hơn hôm qua một chút).'
  },

  // HSK 3: Verb Complements
  {
    id: 'hsk3-wri-1',
    level: 3,
    type: 'word_order',
    prompt: '连词成句 (Sắp xếp câu chữ 把 bổ ngữ kết quả HSK 3):',
    promptVi: 'Sắp xếp câu diễn tả việc làm xong bài tập:',
    tokens: ['把', '我', '作业', '做完了'],
    correctAnswer: '我 把 作业 做完了',
    hintVi: 'Công thức: S + 把 + O + V + 了.',
    explanationVi: 'Cấu trúc chuẩn: 我把作业做完了。(Tôi đã làm xong bài tập rồi).'
  },

  // HSK 4: Disposal & Passive
  {
    id: 'hsk4-wri-1',
    level: 4,
    type: 'word_order',
    prompt: '连词成句 (Sắp xếp câu chữ 被 HSK 4):',
    promptVi: 'Sắp xếp câu diễn tả đồ vật bị làm mất:',
    tokens: ['我的', '弄丢了', '被', '弟弟', '钥匙'],
    correctAnswer: '我的 钥匙 被 弟弟 弄丢了',
    hintVi: 'Công thức bị động: Vật chịu tác động + 被 + Người thực hiện + Động từ.',
    explanationVi: 'Cấu trúc chuẩn: 我的钥匙被弟弟弄丢了。(Chìa khóa của tôi bị em trai làm mất rồi).'
  },

  // HSK 5: Complex sentences with paired conjunctions
  {
    id: 'hsk5-wri-1',
    level: 5,
    type: 'word_order',
    prompt: '连词成句 (Sắp xếp câu liên từ cao cấp HSK 5):',
    promptVi: 'Sắp xếp câu có cặp liên từ 不仅...而且...:',
    tokens: ['锻炼身体', '不仅能', '坚持跑步', '愉悦心情', '而且能'],
    correctAnswer: '坚持跑步 不仅能 锻炼身体 而且能 愉悦心情',
    hintVi: 'Cấu trúc: Chủ ngữ + 不仅能 + V1 + 而且能 + V2.',
    explanationVi: 'Câu chuẩn: 坚持跑步不仅能锻炼身体，而且能愉悦心情。'
  },

  // HSK 6: Error correction & Formal sentence reconstruction
  {
    id: 'hsk6-wri-1',
    level: 6,
    type: 'word_order',
    prompt: '连词成句 (Sắp xếp câu văn phong trang trọng HSK 6):',
    promptVi: 'Sắp xếp câu chứa thành ngữ và cấu trúc nghị luận:',
    tokens: ['并非', '成功的', '偶然现象', '取得', '日积月累的结果', '而是'],
    correctAnswer: '取得 成功的 并非 偶然现象 而是 日积月累的结果',
    hintVi: 'Cấu trúc: Chủ ngữ + 并非... 而是...',
    explanationVi: 'Câu chuẩn: 取得成功并非偶然现象，而是日积月累的结果。'
  }
];
