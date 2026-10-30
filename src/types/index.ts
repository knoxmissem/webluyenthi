export type TrackType = 'ielts' | 'hsk' | 'both';
export type AppLanguage = 'vi' | 'en';
export type ProficiencyLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  provider: 'google';
  lastLoginAt: string;
}

export interface AuthResult {
  success: boolean;
  isNewUser: boolean;
  hasCompletedOnboarding: boolean;
  error?: string;
}

export interface LearnerProfile {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  googleUser?: GoogleUser;
  syncStatus?: 'synced' | 'syncing' | 'offline';
  lastSyncedAt?: string;
  hasCompletedOnboarding?: boolean;
  priorExperience?: string;
  learningGoalReason?: string;
  track: TrackType;
  diagnosticLevel: ProficiencyLevel;
  
  // IELTS Scores
  currentIeltsBand: number; // e.g. 5.5
  targetIeltsBand: number;  // e.g. 7.0
  ieltsSkillScores?: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  ieltsMode?: 'academic' | 'general';

  // HSK Levels
  currentHskLevel: number; // 1-6
  targetHskLevel: number;  // 1-6
  hskSyllabusVersion?: '2.0' | '3.0';

  // Time & Schedules
  dailyMinutes: number; // e.g. 30
  weekendMinutes?: number;
  selectedDays: string[]; // e.g. ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  targetDate?: string;

  // Preferences
  learningPreferences: string[];

  // Gamification
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
  bestStreak: number;
  streakFrozenToday: boolean;
  freezeInventory: number;
  totalStudyMinutes: number;
  completedLessonsCount: number;
  quizAccuracyAverage: number;
  hearts: number; // Duolingo-style hearts (0-5)
  lastActiveDate: string;

  completedLessonIds: string[];
  completedVocabSessionIds?: string[];
  masteredMistakeIds: string[];
  unlockedAchievementIds: string[];
}

export interface DailyQuest {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  type: 'listen' | 'vocab' | 'read' | 'mistake' | 'time' | 'quiz';
  target: number;
  progress: number;
  completed: boolean;
  xpReward: number;
}

export interface StudyTask {
  id: string;
  title: string;
  titleVi: string;
  skill: 'listening' | 'reading' | 'writing' | 'speaking' | 'vocab' | 'grammar' | 'mistake';
  durationMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  objective: string;
  objectiveVi: string;
  xpReward: number;
  completed: boolean;
  routeLink: string;
  scheduledDay?: string; // 'Monday', 'Tuesday', etc.
}

export interface StudyPlanWeek {
  week: number;
  title: string;
  titleVi: string;
  objective: string;
  objectiveVi: string;
  tasks: StudyTask[];
}

export interface StudyPlan {
  id: string;
  track: TrackType;
  generatedDate: string;
  targetDescription: string;
  targetDescriptionVi: string;
  currentEstimatedScore: string;
  weeks: StudyPlanWeek[];
}

export interface QuestionOption {
  key: string;
  text: string;
  textVi?: string;
}

export interface Question {
  id: string;
  number: number;
  prompt: string;
  promptVi?: string;
  type: 'mcq' | 'fill_blank' | 'tfng' | 'matching' | 'sentence_order';
  options?: QuestionOption[];
  correctAnswer: string | string[];
  explanation: string;
  explanationVi: string;
  evidenceText?: string;
  category: 'vocab' | 'grammar' | 'comprehension' | 'evidence' | 'time' | 'pronunciation' | 'sentence_structure' | 'hanzi';
}

export interface Exercise {
  id: string;
  title: string;
  titleVi: string;
  instruction: string;
  instructionVi: string;
  type: 'listening' | 'reading' | 'writing' | 'speaking' | 'vocab' | 'grammar';
  audioUrl?: string;
  audioTranscript?: string;
  passageText?: string;
  pinyinText?: string;
  questions: Question[];
}

export interface Lesson {
  id: string;
  track: 'ielts' | 'hsk';
  skill: 'listening' | 'reading' | 'writing' | 'speaking' | 'vocab' | 'grammar';
  level: string; // e.g. "IELTS 5.5 - 6.5" or "HSK 3"
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  durationMinutes: number;
  xpReward: number;
  exercise: Exercise;
}

export interface MistakeItem {
  id: string;
  questionId: string;
  questionPrompt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  explanationVi: string;
  skill: string;
  topic: string;
  category: 'vocab' | 'grammar' | 'comprehension' | 'evidence' | 'time' | 'pronunciation' | 'sentence_structure' | 'hanzi';
  datePracticed: string;
  mastered: boolean;
  timesReviewed: number;
}

export interface FlashcardItem {
  id: string;
  track: 'ielts' | 'hsk';
  level: string;
  term: string; // Hanzi or English word
  pinyin?: string;
  phonetic?: string; // IPA
  partOfSpeech: string;
  meaningVi: string;
  meaningEn: string;
  exampleSentence: string;
  examplePinyin?: string;
  exampleVi: string;
  intervalDays: number;
  repetition: number;
  easeFactor: number;
  nextReviewDate: string;
  mastered: boolean;
  category?: 'academic' | 'collocation' | 'idiom' | 'chengyu' | 'general';
  collocations?: string[];
  writingContext?: string;
  topicId?: string;
  sessionId?: string;
  sessionNumber?: number;
}

export interface VocabSessionQuestion {
  id: string;
  question: string;
  questionVi: string;
  options: string[];
  correctAnswer: string;
  explanationVi: string;
}

export interface VocabSession {
  id: string;
  topicId: string;
  sessionNumber: number;
  phase?: number;
  phaseNameVi?: string;
  title: string;
  titleVi: string;
  descriptionVi: string;
  track: 'ielts' | 'hsk';
  level: string;
  targetCount: number; // 15 - 25 words/collocations
  durationMinutes: number; // 15 - 20 min
  xpReward: number;
  cards: FlashcardItem[];
  quizQuestions?: VocabSessionQuestion[];
}

export interface VocabTopic {
  id: string;
  track: 'ielts' | 'hsk';
  slug: string;
  title: string;
  titleVi: string;
  descriptionVi: string;
  badge: string; // e.g. "IELTS Writing Task 2", "HSK 4 Chuẩn", "HSK 5 Nâng Cao", "HSK 成语"
  icon: string;
  sessionsCount: number;
  totalWords: number;
  sessions: VocabSession[];
}

export type ExamQuestionType =
  | 'mcq'
  | 'multiple_choice_multi'
  | 'fill_blank'
  | 'note_completion'
  | 'form_completion'
  | 'table_completion'
  | 'sentence_completion'
  | 'summary_completion'
  | 'matching_headings'
  | 'matching_features'
  | 'matching_sentence_endings'
  | 'matching_information'
  | 'tfng'
  | 'ynng'
  | 'short_answer'
  | 'diagram_label'
  | 'map_label'
  | 'writing_academic_task1'
  | 'writing_general_task1'
  | 'writing_task2'
  | 'hsk_listening_dialogue'
  | 'hsk_reading_comprehension'
  | 'hsk_sentence_reorder'
  | 'hsk_cloze';

export interface ParaphrasePair {
  questionPhrase: string;
  passagePhrase: string;
  notesVi?: string;
}

export interface ExamQuestion {
  id: string;
  number: number;
  type: ExamQuestionType;
  prompt: string;
  promptVi?: string;
  options?: QuestionOption[];
  correctAnswer: string;
  acceptedAnswers?: string[]; // Multiple valid formats (e.g. ['9:30', '9:30 am', '9.30'])
  explanation: string;
  explanationVi: string;
  evidenceText?: string; // Direct sentence quote from passage or transcript
  evidenceParagraph?: string; // e.g. "Paragraph B" or "Lines 12-16"
  paraphrasePairs?: ParaphrasePair[];
  distractorExplanations?: Record<string, string>; // Why A is wrong, why B is wrong, etc.
  trapNoteVi?: string; // Common traps for this question type (e.g. TFNG false vs not given)
  userAnswer?: string;
  isFlagged?: boolean;
  wordLimit?: number; // e.g. "NO MORE THAN TWO WORDS AND/OR A NUMBER"
  targetHeadingOptions?: { key: string; text: string }[]; // For matching headings
  reorderTokens?: string[]; // For HSK sentence arrangement
  chartImageUrl?: string; // For writing task 1 or diagram labeling
  wordCountTarget?: number; // For writing e.g. 150 or 250
  modelEssay?: {
    band: number;
    title?: string;
    essay: string;
    paragraphs?: { title: string; content: string }[];
    keyVocabulary?: { term: string; meaningVi: string; band: string }[];
    structureAnalysis?: string[];
  };
}

export interface ExamSection {
  id: string;
  skill: 'listening' | 'reading' | 'writing' | 'speaking';
  title: string;
  titleVi: string;
  instructions: string;
  instructionsVi: string;
  sectionNumber?: number; // e.g. Section 1, Section 2
  audioUrl?: string; // Real audio file URL
  audioText?: string; // Audio script / transcript for TTS fallback
  audioSourceType?: 'recorded' | 'tts' | 'none';
  audioDurationSeconds?: number;
  audioTranscript?: string;
  playbackPolicy?: 'single_pass' | 'flexible'; // single_pass in real mock exam
  passageText?: string;
  passageTitle?: string;
  passageTitleVi?: string;
  passageAuthorOrSource?: string;
  taskType?: 'task1_academic' | 'task1_general' | 'task2_essay';
  chartImageUrl?: string;
  questions: ExamQuestion[];
}

export interface MockExam {
  id: string;
  track: 'ielts' | 'hsk';
  title: string;
  titleVi: string;
  level: string; // e.g. "Target Band 6.0 - 8.5" or "HSK 4"
  type: 'academic' | 'general' | 'hsk';
  durationMinutes: number;
  totalQuestions: number;
  isMiniMock?: boolean; // Clearly distinguishes partial tests from official 40-question mocks
  isOfficialSimulation?: boolean;
  syllabusVersion?: 'cambridge' | 'hsk2.0' | 'hsk3.0';
  sections: ExamSection[];
}

export interface WritingEvaluationResult {
  taskResponseOrAchievement: {
    band: number;
    feedbackVi: string;
  };
  coherenceAndCohesion: {
    band: number;
    feedbackVi: string;
  };
  lexicalResource: {
    band: number;
    feedbackVi: string;
    suggestedUpgrades?: { original: string; upgraded: string; explanation: string }[];
  };
  grammaticalRangeAndAccuracy: {
    band: number;
    feedbackVi: string;
    detectedMistakes?: { original: string; corrected: string; explanation: string }[];
  };
  overallBand: number;
  wordCount: number;
  strengths: string[];
  weaknesses: string[];
  paragraphAnalysis: {
    paragraphIndex: number;
    role: string;
    feedbackVi: string;
  }[];
  modelRevision: string;
  isEstimate: boolean; // Always true to conform to standard disclaimer
}

export interface MockExamAttempt {
  id: string;
  examId: string;
  dateStarted: string;
  dateCompleted: string;
  timeSpentSeconds: number;
  totalScore: number;
  maxScore: number;
  estimatedBandOrScore: string;
  mode: 'practice' | 'mock';
  skillBreakdown: {
    skill: string;
    score: number;
    maxScore: number;
    bandEstimate?: number;
  }[];
  answers: Record<string, string>;
  flaggedQuestionNumbers?: number[];
  weakCategories: string[];
  writingEvaluation?: WritingEvaluationResult;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  category: 'streak' | 'xp' | 'lessons' | 'exam' | 'special';
  badgeIcon: string;
  requiredProgress: number;
  currentProgress: number;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface IslandNode {
  id: string;
  stepNumber: number;
  title: string;
  titleVi: string;
  track: 'ielts' | 'hsk';
  type: 'lesson' | 'quiz' | 'boss' | 'trophy';
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  xpReward: number;
  routeLink: string;
}
