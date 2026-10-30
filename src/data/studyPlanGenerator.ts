import { StudyPlan, StudyTask, TrackType } from '@/types';

export function generatePersonalizedStudyPlan(params: {
  track: TrackType;
  currentBand?: number;
  targetBand?: number;
  currentHsk?: number;
  targetHsk?: number;
  dailyMinutes: number;
  preferences?: string[];
}): StudyPlan {
  const { track, currentBand = 5.5, targetBand = 7.0, currentHsk = 2, targetHsk = 4, dailyMinutes = 30 } = params;

  const isIelts = track === 'ielts' || track === 'both';
  const isHsk = track === 'hsk' || track === 'both';

  // Scale task durations to match user's total daily minutes
  const vocabTime = Math.max(5, Math.round(dailyMinutes * 0.2));
  const mainSkillTime = Math.max(10, Math.round(dailyMinutes * 0.45));
  const practiceTime = Math.max(5, Math.round(dailyMinutes * 0.25));
  const reviewTime = Math.max(5, dailyMinutes - vocabTime - mainSkillTime - practiceTime);

  const week1Tasks: StudyTask[] = [
    {
      id: 'task-w1-1',
      title: isIelts ? 'Academic Vocabulary: Essential Science & Society' : 'HSK 3-4 High Frequency Flashcards',
      titleVi: isIelts ? 'Từ vựng Học thuật: Khoa học & Xã hội' : 'Thẻ từ vựng HSK 3-4 tần suất cao',
      skill: 'vocab',
      durationMinutes: vocabTime,
      difficulty: 'easy',
      objective: 'Master 10 high-frequency terms with spaced repetition recall.',
      objectiveVi: 'Nắm chắc 10 từ vựng cốt lõi qua phương pháp lặp lại ngắt quãng.',
      xpReward: 25,
      completed: false,
      routeLink: '/flashcards',
      scheduledDay: 'Thứ Hai'
    },
    {
      id: 'task-w1-2',
      title: isIelts ? 'Listening Section 2: Campus Facilities & Note Completion' : 'HSK Listening: Daily Conversations & Catching Keywords',
      titleVi: isIelts ? 'Listening Section 2: Ký túc xá & Điền ghi chú' : 'Luyện nghe HSK: Hội thoại đời sống & Bắt từ khóa',
      skill: 'listening',
      durationMinutes: mainSkillTime,
      difficulty: 'medium',
      objective: 'Practice recognizing distractors and exact numbers in audio recordings.',
      objectiveVi: 'Luyện kỹ năng nhận diện bẫy gây nhiễu và bắt chính xác số liệu trong bài nghe.',
      xpReward: 50,
      completed: false,
      routeLink: isIelts ? '/practice' : '/mock-exams/hsk',
      scheduledDay: 'Thứ Hai'
    },
    {
      id: 'task-w1-3',
      title: isIelts ? 'Reading Skill: Skimming & True/False/Not Given Trap Prevention' : 'HSK Grammar: Master the 把 (bǎ) Disposal Sentence Structure',
      titleVi: isIelts ? 'Kỹ thuật Đọc: Skimming & Bẫy True/False/Not Given' : 'Ngữ pháp HSK: Làm chủ cấu trúc câu chữ 把',
      skill: isIelts ? 'reading' : 'grammar',
      durationMinutes: practiceTime,
      difficulty: 'medium',
      objective: 'Locate textual evidence without confusing assumptions with facts.',
      objectiveVi: 'Xác định dẫn chứng văn bản mà không bị nhầm lẫn giữa suy đoán và thông tin thực tế.',
      xpReward: 40,
      completed: false,
      routeLink: isIelts ? '/practice' : '/mock-exams/hsk',
      scheduledDay: 'Thứ Hai'
    },
    {
      id: 'task-w1-4',
      title: 'Error Notebook: Review & Re-attempt Mistakes',
      titleVi: 'Sổ tay lỗi sai: Ôn tập & Làm lại câu sai',
      skill: 'mistake',
      durationMinutes: reviewTime,
      difficulty: 'easy',
      objective: 'Analyze root causes of previous incorrect answers to prevent recurrence.',
      objectiveVi: 'Phân tích nguyên nhân gốc rễ câu sai để không lặp lại lỗi cũ.',
      xpReward: 30,
      completed: false,
      routeLink: '/practice',
      scheduledDay: 'Thứ Hai'
    }
  ];

  const week2Tasks: StudyTask[] = [
    {
      id: 'task-w2-1',
      title: 'Daily Vocab Boost: Collocations & Synonyms',
      titleVi: 'Nâng cấp từ vựng: Cụm từ cố định & Từ đồng nghĩa',
      skill: 'vocab',
      durationMinutes: vocabTime,
      difficulty: 'medium',
      objective: 'Enhance lexical resource with natural phrases.',
      objectiveVi: 'Mở rộng vốn từ vựng với các cụm từ tự nhiên.',
      xpReward: 30,
      completed: false,
      routeLink: '/flashcards'
    },
    {
      id: 'task-w2-2',
      title: isIelts ? 'Writing Task 2: Coherence & Thesis Formulation' : 'HSK Reading: Speed Recognition with Pinyin Assist',
      titleVi: isIelts ? 'Writing Task 2: Tính liên kết & Mở bài sắc bén' : 'Đọc hiểu HSK: Tăng tốc độ nhận diện mặt chữ Hán',
      skill: isIelts ? 'writing' : 'reading',
      durationMinutes: mainSkillTime,
      difficulty: 'hard',
      objective: 'Draft coherent paragraphs with logical connectors and topical evidence.',
      objectiveVi: 'Xây dựng đoạn văn mạch lạc với từ nối logic và dẫn chứng thuyết phục.',
      xpReward: 60,
      completed: false,
      routeLink: isIelts ? '/practice' : '/mock-exams/hsk'
    },
    {
      id: 'task-w2-3',
      title: isIelts ? 'Speaking Part 2: Cue Card Note-taking Strategy' : 'HSK Sentence Arrangement Challenge',
      titleVi: isIelts ? 'Speaking Part 2: Chiến thuật ghi chú 1 phút' : 'Thử thách sắp xếp trật tự câu HSK',
      skill: isIelts ? 'speaking' : 'grammar',
      durationMinutes: practiceTime,
      difficulty: 'medium',
      objective: 'Fluently sustain speaking for 2 minutes without abrupt hesitation.',
      objectiveVi: 'Nói liên tục 2 phút tự tin, hạn chế ngập ngừng.',
      xpReward: 45,
      completed: false,
      routeLink: isIelts ? '/practice' : '/mock-exams/hsk'
    }
  ];

  const week3Tasks: StudyTask[] = [
    {
      id: 'task-w3-1',
      title: 'Advanced Reading: Matching Headings & Information',
      titleVi: 'Kỹ thuật Đọc nâng cao: Nối tiêu đề & Thông tin đoạn',
      skill: 'reading',
      durationMinutes: mainSkillTime,
      difficulty: 'hard',
      objective: 'Analyze paragraph structure and main idea synthesis.',
      objectiveVi: 'Phân tích ý chính đoạn văn và tổng hợp thông tin cốt lõi.',
      xpReward: 55,
      completed: false,
      routeLink: '/mock-exams'
    },
    {
      id: 'task-w3-2',
      title: 'Full Section Mock Test Checkpoint',
      titleVi: 'Kiểm tra tiến độ: Thi thử từng phần chuẩn hóa',
      skill: 'listening',
      durationMinutes: dailyMinutes,
      difficulty: 'hard',
      objective: 'Evaluate accuracy under realistic exam conditions.',
      objectiveVi: 'Đánh giá độ chính xác dưới áp lực phòng thi thực tế.',
      xpReward: 80,
      completed: false,
      routeLink: '/mock-exams'
    }
  ];

  const week4Tasks: StudyTask[] = [
    {
      id: 'task-w4-1',
      title: 'Full-length Mock Examination Simulation',
      titleVi: 'Thi thử toàn diện: Full Mock Examination',
      skill: 'reading',
      durationMinutes: 60,
      difficulty: 'hard',
      objective: 'Simulate full test stamina and calculate estimated diagnostic band score.',
      objectiveVi: 'Rèn luyện sức bền thi thực tế và tính điểm band dự kiến.',
      xpReward: 120,
      completed: false,
      routeLink: '/mock-exams'
    },
    {
      id: 'task-w4-2',
      title: 'Final Diagnostic Review & Error Notebook Clearance',
      titleVi: 'Tổng ôn lỗi sai & Củng cố trước kỳ thi',
      skill: 'mistake',
      durationMinutes: 30,
      difficulty: 'medium',
      objective: 'Ensure zero recurrent errors on frequent topics.',
      objectiveVi: 'Xóa sạch các lỗi sai thường gặp để tự tin đạt mục tiêu.',
      xpReward: 70,
      completed: false,
      routeLink: '/practice'
    }
  ];

  const targetDescription = isIelts && isHsk
    ? `Target IELTS Band ${targetBand.toFixed(1)} & HSK ${targetHsk}`
    : isIelts
    ? `Target IELTS Band ${targetBand.toFixed(1)} (${dailyMinutes} mins/day)`
    : `Target HSK Level ${targetHsk} (${dailyMinutes} mins/day)`;

  const targetDescriptionVi = isIelts && isHsk
    ? `Mục tiêu IELTS Band ${targetBand.toFixed(1)} & HSK ${targetHsk}`
    : isIelts
    ? `Mục tiêu IELTS Band ${targetBand.toFixed(1)} (${dailyMinutes} phút/ngày)`
    : `Mục tiêu HSK Cấp ${targetHsk} (${dailyMinutes} phút/ngày)`;

  return {
    id: `plan-${Date.now()}`,
    track,
    generatedDate: new Date().toISOString(),
    targetDescription,
    targetDescriptionVi,
    currentEstimatedScore: isIelts ? `Band ${currentBand.toFixed(1)}` : `HSK ${currentHsk}`,
    weeks: [
      {
        week: 1,
        title: 'Week 1: Core Foundation & Question Type Mastery',
        titleVi: 'Tuần 1: Xây dựng Nền tảng & Làm quen Dạng đề',
        objective: 'Establish sustainable daily habits, master note-completion and grammar basics.',
        objectiveVi: 'Hình thành nhịp học tập bền vững, làm chủ kỹ năng nghe điền từ và ngữ pháp cốt lõi.',
        tasks: week1Tasks
      },
      {
        week: 2,
        title: 'Week 2: Advanced Cohesion & Reading Strategies',
        titleVi: 'Tuần 2: Nâng cao Tính liên kết & Chiến thuật Đọc',
        objective: 'Overcome reading traps and structure high-scoring essay paragraphs.',
        objectiveVi: 'Tránh các bẫy đọc hiểu tinh vi và nâng cao chất lượng đoạn văn viết.',
        tasks: week2Tasks
      },
      {
        week: 3,
        title: 'Week 3: Speed, Stamina & Interactive Drills',
        titleVi: 'Tuần 3: Tăng tốc độ & Luyện phản xạ thi',
        objective: 'Increase processing speed and speaking fluidity under timed pressure.',
        objectiveVi: 'Tăng tốc độ làm bài và độ lưu loát khi nói dưới áp lực thời gian.',
        tasks: week3Tasks
      },
      {
        week: 4,
        title: 'Week 4: Mock Examination & Error Elimination',
        titleVi: 'Tuần 4: Thi thử mô phỏng thực tế & Xóa sạch lỗi sai',
        objective: 'Execute full test simulations and achieve target band confidence.',
        objectiveVi: 'Hoàn thành các đề thi thử thực chiến và tự tin bứt phá điểm số mục tiêu.',
        tasks: week4Tasks
      }
    ]
  };
}
