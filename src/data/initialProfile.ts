import { LearnerProfile } from '@/types';
import { generatePersonalizedStudyPlan } from './studyPlanGenerator';

export const initialProfile: LearnerProfile = {
  id: 'learner-001',
  name: 'DucAnh Nguyen',
  avatar: '🦁',
  track: 'ielts',
  diagnosticLevel: 'beginner',
  hasCompletedOnboarding: false,
  currentIeltsBand: 5.0,
  targetIeltsBand: 6.5,
  ieltsSkillScores: {
    listening: 5.0,
    reading: 5.0,
    writing: 4.5,
    speaking: 5.0
  },
  ieltsMode: 'academic',
  currentHskLevel: 1,
  targetHskLevel: 3,
  hskSyllabusVersion: '2.0',
  dailyMinutes: 15,
  weekendMinutes: 30,
  selectedDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  targetDate: '2026-12-31',
  learningPreferences: ['short_lessons', 'games', 'vocab'],
  
  // Starting clean at 0
  level: 1,
  xp: 0,
  nextLevelXp: 100,
  streak: 0,
  bestStreak: 0,
  streakFrozenToday: false,
  freezeInventory: 1,
  totalStudyMinutes: 0,
  completedLessonsCount: 0,
  quizAccuracyAverage: 0,
  hearts: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  
  completedLessonIds: [],
  masteredMistakeIds: [],
  unlockedAchievementIds: []
};

export const initialStudyPlan = generatePersonalizedStudyPlan({
  track: 'ielts',
  currentBand: 5.0,
  targetBand: 6.5,
  dailyMinutes: 15
});
