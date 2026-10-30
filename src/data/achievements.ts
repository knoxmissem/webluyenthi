import { Achievement, DailyQuest, IslandNode } from '@/types';

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-first-step',
    code: 'first_step',
    title: 'First Step to Greatness',
    titleVi: 'Bước Đi Đầu Tiên',
    description: 'Complete your first interactive lesson with full attention.',
    descriptionVi: 'Hoàn thành bài học tương tác đầu tiên của bạn.',
    category: 'lessons',
    badgeIcon: 'footprints',
    requiredProgress: 1,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'ach-streak-7',
    code: 'streak_master',
    title: 'Unstoppable Flame',
    titleVi: 'Ngọn Lửa Bất Diệt',
    description: 'Maintain an active daily learning streak for 7 consecutive days.',
    descriptionVi: 'Duy trì chuỗi học tập liên tục trong 7 ngày.',
    category: 'streak',
    badgeIcon: 'flame',
    requiredProgress: 7,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'ach-vocab-50',
    code: 'vocab_master',
    title: 'Lexicon Master',
    titleVi: 'Bậc Thầy Từ Vựng',
    description: 'Master 50 vocabulary flashcards through spaced repetition.',
    descriptionVi: 'Thuộc và làm chủ 50 từ vựng qua phương pháp lặp lại ngắt quãng SRS.',
    category: 'xp',
    badgeIcon: 'book-open',
    requiredProgress: 50,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'ach-mock-1',
    code: 'exam_hero',
    title: 'Exam Gladiator',
    titleVi: 'Chiến Binh Phòng Thi',
    description: 'Complete a full-length IELTS or HSK simulated mock examination.',
    descriptionVi: 'Hoàn thành bài thi thử mô phỏng thực tế IELTS hoặc HSK.',
    category: 'exam',
    badgeIcon: 'award',
    requiredProgress: 1,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'ach-mistake-solver',
    code: 'error_slayer',
    title: 'Mistake Conqueror',
    titleVi: 'Khuất Phục Sai Sót',
    description: 'Successfully correct 5 previous errors from your Error Notebook.',
    descriptionVi: 'Ôn tập và làm đúng lại 5 câu hỏi trong Sổ tay lỗi sai.',
    category: 'lessons',
    badgeIcon: 'shield-check',
    requiredProgress: 5,
    currentProgress: 0,
    unlocked: false
  },
  {
    id: 'ach-explorer',
    code: 'explorer',
    title: 'Explorer of Lingora',
    titleVi: 'Thám Hiểm Gia Lingora',
    description: 'Unlock island checkpoints and progress towards the peak of linguistic mastery.',
    descriptionVi: 'Mở khóa toàn bộ các trạm đảo tri thức và tiến bước tới đỉnh cao ngôn ngữ.',
    category: 'special',
    badgeIcon: 'medal',
    requiredProgress: 5,
    currentProgress: 0,
    unlocked: false
  }
];

export const initialQuests: DailyQuest[] = [
  {
    id: 'quest-1',
    title: 'Daily Focus Session',
    titleVi: 'Luyện tập 15 phút mỗi ngày',
    description: 'Spend at least 15 active minutes studying today.',
    descriptionVi: 'Dành tối thiểu 15 phút học tập tập trung trong ngày hôm nay.',
    type: 'time',
    target: 15,
    progress: 0,
    completed: false,
    xpReward: 30
  },
  {
    id: 'quest-2',
    title: 'Expand Vocabulary',
    titleVi: 'Học 5 từ mới hoặc ôn Flashcards',
    description: 'Review or discover 5 vocabulary items.',
    descriptionVi: 'Khám phá hoặc ôn luyện 5 thẻ từ vựng qua flashcards.',
    type: 'vocab',
    target: 5,
    progress: 0,
    completed: false,
    xpReward: 35
  },
  {
    id: 'quest-3',
    title: 'Complete a Quiz',
    titleVi: 'Hoàn thành 1 bài luyện tập trắc nghiệm',
    description: 'Finish a skill quiz or practice exercise with at least 80% accuracy.',
    descriptionVi: 'Làm xong 1 bài tập trắc nghiệm kỹ năng đạt độ chính xác từ 80%.',
    type: 'quiz',
    target: 1,
    progress: 0,
    completed: false,
    xpReward: 40
  },
  {
    id: 'quest-4',
    title: 'Error Notebook Review',
    titleVi: 'Chữa 2 lỗi sai trong Sổ tay cá nhân',
    description: 'Re-attempt 2 incorrect questions from past sessions.',
    descriptionVi: 'Làm lại 2 câu trả lời sai trước đó để củng cố kiến thức.',
    type: 'mistake',
    target: 2,
    progress: 0,
    completed: false,
    xpReward: 25
  }
];

export const initialIslandNodes: IslandNode[] = [
  {
    id: 'node-1',
    stepNumber: 1,
    title: 'Collocations & Writing Lab: Foundation',
    titleVi: 'Đảo 1: Phòng Luyện Writing & Collocations',
    track: 'ielts',
    type: 'lesson',
    isCompleted: false,
    isCurrent: true,
    isLocked: false,
    xpReward: 30,
    routeLink: '/practice'
  },
  {
    id: 'node-2',
    stepNumber: 2,
    title: 'Hải Trình Từ Vựng: Spaced Repetition',
    titleVi: 'Đảo 2: Vịnh Từ Vựng Flashcard SM-2',
    track: 'ielts',
    type: 'quiz',
    isCompleted: false,
    isCurrent: false,
    isLocked: true,
    xpReward: 40,
    routeLink: '/flashcards'
  },
  {
    id: 'node-3',
    stepNumber: 3,
    title: 'Reading CBT Simulation: Cambridge',
    titleVi: 'Đảo 3: Phòng Thi Thử Reading CBT',
    track: 'ielts',
    type: 'lesson',
    isCompleted: false,
    isCurrent: false,
    isLocked: true,
    xpReward: 50,
    routeLink: '/mock-exams'
  },
  {
    id: 'node-4',
    stepNumber: 4,
    title: 'HSK Standard Simulation: HSK 1-6',
    titleVi: 'Đảo 4: Thi Thử Chuẩn HSK Quốc Tế',
    track: 'hsk',
    type: 'boss',
    isCompleted: false,
    isCurrent: false,
    isLocked: true,
    xpReward: 60,
    routeLink: '/mock-exams/hsk'
  },
  {
    id: 'node-5',
    stepNumber: 5,
    title: 'Ultimate CBT Exam Challenge',
    titleVi: 'Đảo 5: Thử Thách Đỉnh Cao CBT',
    track: 'ielts',
    type: 'trophy',
    isCompleted: false,
    isCurrent: false,
    isLocked: true,
    xpReward: 100,
    routeLink: '/mock-exams'
  }
];
