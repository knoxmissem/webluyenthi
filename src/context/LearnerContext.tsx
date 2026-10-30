'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LearnerProfile,
  StudyPlan,
  DailyQuest,
  FlashcardItem,
  MistakeItem,
  Achievement,
  IslandNode,
  GoogleUser,
  AuthResult,
  TrackType,
  ProficiencyLevel
} from '@/types';
import { initialProfile, initialStudyPlan } from '@/data/initialProfile';
import { initialQuests, initialAchievements, initialIslandNodes } from '@/data/achievements';
import { initialFlashcards } from '@/data/flashcards';
import { generatePersonalizedStudyPlan } from '@/data/studyPlanGenerator';

interface LearnerContextType {
  profile: LearnerProfile;
  studyPlan: StudyPlan;
  quests: DailyQuest[];
  flashcards: FlashcardItem[];
  mistakes: MistakeItem[];
  achievements: Achievement[];
  islandNodes: IslandNode[];
  showLevelUpModal: boolean;
  setShowLevelUpModal: (show: boolean) => void;
  unlockedBadge: Achievement | null;
  setUnlockedBadge: (badge: Achievement | null) => void;
  
  // Google & Email Auth & Cloud Sync
  currentUser: GoogleUser | null;
  isGoogleAuthModalOpen: boolean;
  setIsGoogleAuthModalOpen: (open: boolean) => void;
  loginWithGoogle: (email: string, name?: string, avatar?: string) => Promise<AuthResult>;
  loginWithEmail: (email: string, password?: string, name?: string, isRegister?: boolean) => Promise<AuthResult>;
  logoutGoogle: () => void;
  syncToCloud: () => Promise<void>;
  completeOnboarding: (data: {
    track: TrackType;
    diagnosticLevel: ProficiencyLevel;
    currentIeltsBand: number;
    targetIeltsBand: number;
    currentHskLevel: number;
    targetHskLevel: number;
    dailyMinutes: number;
    priorExperience?: string;
    learningGoalReason?: string;
    learningPreferences: string[];
    selectedDays?: string[];
    targetDate?: string;
  }) => void;

  // Actions
  updateProfile: (partial: Partial<LearnerProfile>) => void;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  toggleStreakFreeze: () => void;
  deductHeart: () => void;
  refillHearts: () => void;
  unlockNextIslandNode: (completedNodeId: string) => void;
  completeTask: (taskId: string) => void;
  completeLesson: (lessonId: string, xpEarned: number) => void;
  completeVocabSession: (sessionId: string, xpEarned: number) => void;
  addMistake: (mistake: Omit<MistakeItem, 'id' | 'datePracticed' | 'mastered' | 'timesReviewed'>) => void;
  markMistakeMastered: (mistakeId: string) => void;
  addFlashcard: (card: Omit<FlashcardItem, 'id' | 'intervalDays' | 'repetition' | 'easeFactor' | 'nextReviewDate' | 'mastered'>) => void;
  updateFlashcardSM2: (cardId: string, qualityRating: 1 | 2 | 3 | 4 | 5) => void;
  regenerateStudyPlan: () => void;
  resetAllData: () => void;
  playAudioCue: (type: 'correct' | 'level_up' | 'click' | 'quest' | 'wrong') => void;
}

const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

// Web Audio API procedural sound synthesizer (Zero external file dependencies)
function playProceduralSound(type: 'correct' | 'level_up' | 'click' | 'quest' | 'wrong') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'click') {
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'correct') {
      // Cheerful Duolingo-style ding
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'wrong') {
      // Duolingo error buzz
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(196, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'level_up') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.1);
      osc.frequency.setValueAtTime(659.25, now + 0.2);
      osc.frequency.setValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'quest') {
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch {
    // Audio might be blocked before first user gesture
  }
}

export function LearnerProvider({ children }: { children: React.ReactNode }) {
  // Fresh clean state starting at 0
  const [profile, setProfile] = useState<LearnerProfile>(initialProfile);
  const [studyPlan, setStudyPlan] = useState<StudyPlan>(initialStudyPlan);
  const [quests, setQuests] = useState<DailyQuest[]>(initialQuests);
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(initialFlashcards);
  const [mistakes, setMistakes] = useState<MistakeItem[]>([]); // Clean 0 mistakes
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [islandNodes, setIslandNodes] = useState<IslandNode[]>(initialIslandNodes);

  const [showLevelUpModal, setShowLevelUpModal] = useState<boolean>(false);
  const [unlockedBadge, setUnlockedBadge] = useState<Achievement | null>(null);

  // Google User session & modal state
  const [currentUser, setCurrentUser] = useState<GoogleUser | null>(null);
  const [isGoogleAuthModalOpen, setIsGoogleAuthModalOpen] = useState<boolean>(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('lingora_google_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
      }

      const savedProfile = localStorage.getItem('lingora_profile_v2');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        // Clear any old v1 demo caches to ensure clean 0 start
        localStorage.removeItem('lingora_profile');
        localStorage.removeItem('lingora_mistakes');
        localStorage.removeItem('lingora_quests');
        localStorage.removeItem('lingora_study_plan');
        localStorage.removeItem('lingora_island_nodes');
      }

      const savedPlan = localStorage.getItem('lingora_study_plan_v2');
      if (savedPlan) setStudyPlan(JSON.parse(savedPlan));

      const savedQuests = localStorage.getItem('lingora_quests_v2');
      if (savedQuests) setQuests(JSON.parse(savedQuests));

      const savedMistakes = localStorage.getItem('lingora_mistakes_v2');
      if (savedMistakes) setMistakes(JSON.parse(savedMistakes));

      const savedNodes = localStorage.getItem('lingora_island_nodes_v2');
      if (savedNodes) setIslandNodes(JSON.parse(savedNodes));
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('lingora_profile_v2', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('lingora_study_plan_v2', JSON.stringify(studyPlan));
    } catch {}
  }, [studyPlan]);

  useEffect(() => {
    try {
      localStorage.setItem('lingora_quests_v2', JSON.stringify(quests));
    } catch {}
  }, [quests]);

  useEffect(() => {
    try {
      localStorage.setItem('lingora_mistakes_v2', JSON.stringify(mistakes));
    } catch {}
  }, [mistakes]);

  useEffect(() => {
    try {
      localStorage.setItem('lingora_island_nodes_v2', JSON.stringify(islandNodes));
    } catch {}
  }, [islandNodes]);

  const updateProfile = (partial: Partial<LearnerProfile>) => {
    setProfile(prev => ({ ...prev, ...partial }));
  };

  const addXp = (amount: number) => {
    setProfile(prev => {
      const newXp = prev.xp + amount;
      if (newXp >= prev.nextLevelXp) {
        // Level up!
        const newLevel = prev.level + 1;
        const newNextXp = prev.nextLevelXp + newLevel * 150;
        playProceduralSound('level_up');
        setShowLevelUpModal(true);
        return {
          ...prev,
          level: newLevel,
          xp: newXp - prev.nextLevelXp,
          nextLevelXp: newNextXp
        };
      }
      return {
        ...prev,
        xp: newXp
      };
    });
  };

  const incrementStreak = () => {
    setProfile(prev => {
      const nextStreak = prev.streak + 1;
      return {
        ...prev,
        streak: nextStreak,
        bestStreak: Math.max(prev.bestStreak, nextStreak),
        lastActiveDate: new Date().toISOString()
      };
    });
  };

  const deductHeart = () => {
    setProfile(prev => ({
      ...prev,
      hearts: Math.max(0, (prev.hearts ?? 5) - 1)
    }));
  };

  const refillHearts = () => {
    setProfile(prev => ({
      ...prev,
      hearts: 5
    }));
  };

  const toggleStreakFreeze = () => {
    setProfile(prev => {
      if (prev.streakFrozenToday) {
        return { ...prev, streakFrozenToday: false, freezeInventory: prev.freezeInventory + 1 };
      } else if (prev.freezeInventory > 0) {
        return { ...prev, streakFrozenToday: true, freezeInventory: prev.freezeInventory - 1 };
      }
      return prev;
    });
  };

  // Duolingo-style progressive node unlocking
  const unlockNextIslandNode = (completedNodeId: string) => {
    playProceduralSound('correct');

    setIslandNodes(prev => {
      const currentIndex = prev.findIndex(n => n.id === completedNodeId);
      if (currentIndex === -1) return prev;

      return prev.map((node, idx) => {
        if (idx === currentIndex) {
          return { ...node, isCompleted: true, isCurrent: false };
        }
        if (idx === currentIndex + 1) {
          return { ...node, isLocked: false, isCurrent: true };
        }
        return node;
      });
    });

    // Update profile progression
    setProfile(prev => {
      const isFirstLesson = prev.completedLessonsCount === 0;
      const nextCompleted = prev.completedLessonsCount + 1;
      const nextStreak = prev.streak === 0 ? 1 : prev.streak;

      return {
        ...prev,
        completedLessonsCount: nextCompleted,
        totalStudyMinutes: prev.totalStudyMinutes + 10,
        streak: nextStreak,
        bestStreak: Math.max(prev.bestStreak, nextStreak),
        quizAccuracyAverage: prev.quizAccuracyAverage === 0 ? 100 : Math.round((prev.quizAccuracyAverage + 100) / 2),
        completedLessonIds: prev.completedLessonIds.includes(completedNodeId)
          ? prev.completedLessonIds
          : [...prev.completedLessonIds, completedNodeId],
        unlockedAchievementIds: isFirstLesson
          ? [...prev.unlockedAchievementIds, 'ach-first-step']
          : prev.unlockedAchievementIds
      };
    });

    // Update daily quests
    setQuests(prev =>
      prev.map(q => {
        if (q.type === 'quiz') return { ...q, progress: 1, completed: true };
        if (q.type === 'time') {
          const newProg = Math.min(q.target, q.progress + 10);
          return { ...q, progress: newProg, completed: newProg >= q.target };
        }
        return q;
      })
    );
  };

  const completeTask = (taskId: string) => {
    setStudyPlan(prev => {
      const updatedWeeks = prev.weeks.map(w => ({
        ...w,
        tasks: w.tasks.map(t => {
          if (t.id === taskId && !t.completed) {
            addXp(t.xpReward);
            playProceduralSound('quest');
            return { ...t, completed: true };
          }
          return t;
        })
      }));
      return { ...prev, weeks: updatedWeeks };
    });
  };

  const completeLesson = (lessonId: string, xpEarned: number) => {
    addXp(xpEarned);
    playProceduralSound('correct');
    setProfile(prev => ({
      ...prev,
      completedLessonsCount: prev.completedLessonsCount + 1,
      totalStudyMinutes: prev.totalStudyMinutes + 15,
      streak: prev.streak === 0 ? 1 : prev.streak,
      quizAccuracyAverage: prev.quizAccuracyAverage === 0 ? 90 : Math.round((prev.quizAccuracyAverage + 90) / 2),
      completedLessonIds: prev.completedLessonIds.includes(lessonId)
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId]
    }));

    setQuests(prev =>
      prev.map(q => (q.type === 'quiz' ? { ...q, progress: 1, completed: true } : q))
    );
  };

  const completeVocabSession = (sessionId: string, xpEarned: number) => {
    addXp(xpEarned);
    playProceduralSound('level_up');
    setProfile(prev => {
      const existing = prev.completedVocabSessionIds || [];
      return {
        ...prev,
        completedLessonsCount: prev.completedLessonsCount + 1,
        totalStudyMinutes: prev.totalStudyMinutes + 15,
        streak: prev.streak === 0 ? 1 : prev.streak,
        completedVocabSessionIds: existing.includes(sessionId) ? existing : [...existing, sessionId]
      };
    });
  };

  const addMistake = (item: Omit<MistakeItem, 'id' | 'datePracticed' | 'mastered' | 'timesReviewed'>) => {
    const newMistake: MistakeItem = {
      ...item,
      id: `mistake-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      datePracticed: new Date().toISOString().split('T')[0],
      mastered: false,
      timesReviewed: 0
    };
    setMistakes(prev => [newMistake, ...prev]);
  };

  const markMistakeMastered = (mistakeId: string) => {
    playProceduralSound('correct');
    addXp(20);
    setMistakes(prev =>
      prev.map(m =>
        m.id === mistakeId
          ? { ...m, mastered: true, timesReviewed: m.timesReviewed + 1 }
          : m
      )
    );
    setQuests(prev =>
      prev.map(q =>
        q.type === 'mistake'
          ? { ...q, progress: Math.min(q.target, q.progress + 1), completed: q.progress + 1 >= q.target }
          : q
      )
    );
  };

  const addFlashcard = (item: Omit<FlashcardItem, 'id' | 'intervalDays' | 'repetition' | 'easeFactor' | 'nextReviewDate' | 'mastered'>) => {
    const newCard: FlashcardItem = {
      ...item,
      id: `fc-user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      intervalDays: 1,
      repetition: 0,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
      mastered: false
    };
    setFlashcards(prev => [newCard, ...prev]);
  };

  const updateFlashcardSM2 = (cardId: string, rating: 1 | 2 | 3 | 4 | 5) => {
    playProceduralSound('click');
    setFlashcards(prev =>
      prev.map(card => {
        if (card.id !== cardId) return card;

        let newRep = card.repetition;
        let newInterval = card.intervalDays;
        let newEF = card.easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
        if (newEF < 1.3) newEF = 1.3;

        if (rating >= 3) {
          if (newRep === 0) newInterval = 1;
          else if (newRep === 1) newInterval = 6;
          else newInterval = Math.round(card.intervalDays * newEF);
          newRep += 1;
        } else {
          newRep = 0;
          newInterval = 1;
        }

        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + newInterval);

        return {
          ...card,
          repetition: newRep,
          intervalDays: newInterval,
          easeFactor: Number(newEF.toFixed(2)),
          nextReviewDate: nextDate.toISOString(),
          mastered: rating >= 4
        };
      })
    );

    addXp(10);
    setQuests(prev =>
      prev.map(q =>
        q.type === 'vocab'
          ? { ...q, progress: Math.min(q.target, q.progress + 1), completed: q.progress + 1 >= q.target }
          : q
      )
    );
  };

  const regenerateStudyPlan = () => {
    const newPlan = generatePersonalizedStudyPlan({
      track: profile.track,
      currentBand: profile.currentIeltsBand,
      targetBand: profile.targetIeltsBand,
      currentHsk: profile.currentHskLevel,
      targetHsk: profile.targetHskLevel,
      dailyMinutes: profile.dailyMinutes,
      preferences: profile.learningPreferences
    });
    setStudyPlan(newPlan);
  };

  // Google & Email Auth Methods
  const loginWithGoogle = async (email: string, name?: string, avatar?: string): Promise<AuthResult> => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, avatar })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        try {
          localStorage.setItem('lingora_google_user', JSON.stringify(data.user));
        } catch {}

        // Check if there is saved cloud/local progress for this specific email
        const savedAccountKey = `lingora_account_${data.user.email}`;
        let localSavedProgress: any = null;
        try {
          const raw = localStorage.getItem(savedAccountKey);
          if (raw) localSavedProgress = JSON.parse(raw);
        } catch {}

        let isNewUser = !!data.isNewUser;
        let hasCompletedOnboarding = false;

        if (data.accountData && data.accountData.profile) {
          // Cloud has saved progress
          hasCompletedOnboarding = !!data.accountData.profile.hasCompletedOnboarding;
          setProfile({
            ...data.accountData.profile,
            email: data.user.email,
            googleUser: data.user,
            syncStatus: 'synced',
            lastSyncedAt: data.accountData.lastSyncedAt
          });
          if (data.accountData.islandNodes) setIslandNodes(data.accountData.islandNodes);
          if (data.accountData.mistakes) setMistakes(data.accountData.mistakes);
          if (data.accountData.studyPlan) setStudyPlan(data.accountData.studyPlan);
        } else if (localSavedProgress && localSavedProgress.profile) {
          // Local storage has saved progress for this email
          hasCompletedOnboarding = !!localSavedProgress.profile.hasCompletedOnboarding;
          setProfile({
            ...localSavedProgress.profile,
            email: data.user.email,
            googleUser: data.user,
            syncStatus: 'synced'
          });
          if (localSavedProgress.islandNodes) setIslandNodes(localSavedProgress.islandNodes);
          if (localSavedProgress.mistakes) setMistakes(localSavedProgress.mistakes);
          if (localSavedProgress.studyPlan) setStudyPlan(localSavedProgress.studyPlan);
        } else {
          // First time this email logs in: tie current clean profile to this email
          isNewUser = true;
          hasCompletedOnboarding = false;
          setProfile(prev => ({
            ...prev,
            name: data.user.name || prev.name,
            email: data.user.email,
            googleUser: data.user,
            syncStatus: 'synced',
            hasCompletedOnboarding: false,
            lastSyncedAt: new Date().toISOString()
          }));
        }

        // Sync initial state to cloud
        fetch('/api/auth/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.user.email,
            profile,
            islandNodes,
            mistakes,
            studyPlan
          })
        }).catch(() => {});

        return {
          success: true,
          isNewUser,
          hasCompletedOnboarding
        };
      }
      return {
        success: false,
        isNewUser: false,
        hasCompletedOnboarding: false,
        error: data.message || 'Đăng nhập Google thất bại'
      };
    } catch (err) {
      console.error('Google login error:', err);
      return {
        success: false,
        isNewUser: false,
        hasCompletedOnboarding: false,
        error: String(err)
      };
    }
  };

  const loginWithEmail = async (email: string, password?: string, name?: string, isRegister?: boolean): Promise<AuthResult> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, isRegister })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        try {
          localStorage.setItem('lingora_google_user', JSON.stringify(data.user));
        } catch {}

        const savedAccountKey = `lingora_account_${data.user.email}`;
        let localSavedProgress: any = null;
        try {
          const raw = localStorage.getItem(savedAccountKey);
          if (raw) localSavedProgress = JSON.parse(raw);
        } catch {}

        let isNewUser = !!data.isNewUser;
        let hasCompletedOnboarding = false;

        if (data.accountData && data.accountData.profile) {
          hasCompletedOnboarding = !!data.accountData.profile.hasCompletedOnboarding;
          setProfile({
            ...data.accountData.profile,
            email: data.user.email,
            googleUser: data.user,
            syncStatus: 'synced',
            lastSyncedAt: data.accountData.lastSyncedAt
          });
          if (data.accountData.islandNodes) setIslandNodes(data.accountData.islandNodes);
          if (data.accountData.mistakes) setMistakes(data.accountData.mistakes);
          if (data.accountData.studyPlan) setStudyPlan(data.accountData.studyPlan);
        } else if (localSavedProgress && localSavedProgress.profile) {
          hasCompletedOnboarding = !!localSavedProgress.profile.hasCompletedOnboarding;
          setProfile({
            ...localSavedProgress.profile,
            email: data.user.email,
            googleUser: data.user,
            syncStatus: 'synced'
          });
          if (localSavedProgress.islandNodes) setIslandNodes(localSavedProgress.islandNodes);
          if (localSavedProgress.mistakes) setMistakes(localSavedProgress.mistakes);
          if (localSavedProgress.studyPlan) setStudyPlan(localSavedProgress.studyPlan);
        } else {
          isNewUser = true;
          hasCompletedOnboarding = false;
          setProfile(prev => ({
            ...prev,
            name: data.user.name || prev.name,
            email: data.user.email,
            googleUser: data.user,
            syncStatus: 'synced',
            hasCompletedOnboarding: false,
            lastSyncedAt: new Date().toISOString()
          }));
        }

        return {
          success: true,
          isNewUser,
          hasCompletedOnboarding
        };
      }
      return {
        success: false,
        isNewUser: false,
        hasCompletedOnboarding: false,
        error: data.message || 'Xác thực tài khoản thất bại'
      };
    } catch (err) {
      return {
        success: false,
        isNewUser: false,
        hasCompletedOnboarding: false,
        error: String(err)
      };
    }
  };

  const completeOnboarding = (data: {
    track: TrackType;
    diagnosticLevel: ProficiencyLevel;
    currentIeltsBand: number;
    targetIeltsBand: number;
    currentHskLevel: number;
    targetHskLevel: number;
    dailyMinutes: number;
    priorExperience?: string;
    learningGoalReason?: string;
    learningPreferences: string[];
    selectedDays?: string[];
    targetDate?: string;
  }) => {
    playProceduralSound('level_up');

    // 1. Generate tailored study plan
    const generatedPlan = generatePersonalizedStudyPlan({
      track: data.track,
      currentBand: data.currentIeltsBand,
      targetBand: data.targetIeltsBand,
      currentHsk: data.currentHskLevel,
      targetHsk: data.targetHskLevel,
      dailyMinutes: data.dailyMinutes,
      preferences: data.learningPreferences
    });
    setStudyPlan(generatedPlan);
    try {
      localStorage.setItem('lingora_study_plan_v2', JSON.stringify(generatedPlan));
    } catch {}

    // 2. Adjust Island nodes according to track
    setIslandNodes(prev => {
      const isHsk = data.track === 'hsk';
      return prev.map((node, idx) => {
        if (idx === 0) {
          return {
            ...node,
            track: isHsk ? 'hsk' : 'ielts',
            title: isHsk ? 'HSK 1: Chào hỏi & Số đếm' : 'IELTS: Core Vocabulary',
            titleVi: isHsk ? 'HSK 1: Chào hỏi & Số đếm cơ bản' : 'IELTS: Từ vựng học thuật cốt lõi',
            isLocked: false,
            isCurrent: true
          };
        }
        return {
          ...node,
          track: isHsk ? 'hsk' : 'ielts'
        };
      });
    });

    // 3. Update profile with starter 50 XP bonus!
    setProfile(prev => {
      const nextXp = prev.xp + 50; // Starter 50 XP
      const updatedProfile: LearnerProfile = {
        ...prev,
        track: data.track,
        diagnosticLevel: data.diagnosticLevel,
        currentIeltsBand: data.currentIeltsBand,
        targetIeltsBand: data.targetIeltsBand,
        currentHskLevel: data.currentHskLevel,
        targetHskLevel: data.targetHskLevel,
        dailyMinutes: data.dailyMinutes,
        priorExperience: data.priorExperience,
        learningGoalReason: data.learningGoalReason,
        learningPreferences: data.learningPreferences,
        selectedDays: data.selectedDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        targetDate: data.targetDate || '2026-12-31',
        hasCompletedOnboarding: true,
        xp: nextXp,
        unlockedAchievementIds: prev.unlockedAchievementIds.includes('ach-first-step')
          ? prev.unlockedAchievementIds
          : [...prev.unlockedAchievementIds, 'ach-first-step']
      };

      try {
        localStorage.setItem('lingora_profile_v2', JSON.stringify(updatedProfile));
      } catch {}

      // If user is logged in, sync to cloud & save account key
      if (updatedProfile.email) {
        const savedAccountKey = `lingora_account_${updatedProfile.email}`;
        try {
          localStorage.setItem(savedAccountKey, JSON.stringify({
            profile: updatedProfile,
            studyPlan: generatedPlan,
            islandNodes,
            mistakes
          }));
        } catch {}

        fetch('/api/auth/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: updatedProfile.email,
            profile: updatedProfile,
            studyPlan: generatedPlan,
            islandNodes,
            mistakes
          })
        }).catch(() => {});
      }

      return updatedProfile;
    });
  };

  const logoutGoogle = () => {
    if (currentUser?.email) {
      const savedAccountKey = `lingora_account_${currentUser.email}`;
      try {
        localStorage.setItem(savedAccountKey, JSON.stringify({
          profile,
          islandNodes,
          mistakes,
          studyPlan
        }));
      } catch {}
    }
    setCurrentUser(null);
    try {
      localStorage.removeItem('lingora_google_user');
    } catch {}
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    setProfile(prev => ({
      ...prev,
      email: undefined,
      googleUser: undefined,
      syncStatus: 'offline'
    }));
  };

  const syncToCloud = async () => {
    if (!currentUser?.email) return;
    try {
      setProfile(prev => ({ ...prev, syncStatus: 'syncing' }));
      const res = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email,
          profile,
          islandNodes,
          mistakes,
          studyPlan
        })
      });
      const data = await res.json();
      if (data.success) {
        setProfile(prev => ({
          ...prev,
          syncStatus: 'synced',
          lastSyncedAt: data.lastSyncedAt
        }));
      }
    } catch {
      setProfile(prev => ({ ...prev, syncStatus: 'offline' }));
    }
  };

  const resetAllData = () => {
    setProfile(initialProfile);
    setStudyPlan(initialStudyPlan);
    setQuests(initialQuests);
    setFlashcards(initialFlashcards);
    setAchievements(initialAchievements);
    setIslandNodes(initialIslandNodes);
    setMistakes([]);
    try {
      localStorage.clear();
    } catch {}
  };

  return (
    <LearnerContext.Provider
      value={{
        profile,
        studyPlan,
        quests,
        flashcards,
        mistakes,
        achievements,
        islandNodes,
        showLevelUpModal,
        setShowLevelUpModal,
        unlockedBadge,
        setUnlockedBadge,
        currentUser,
        isGoogleAuthModalOpen,
        setIsGoogleAuthModalOpen,
        loginWithGoogle,
        loginWithEmail,
        logoutGoogle,
        syncToCloud,
        completeOnboarding,
        updateProfile,
        addXp,
        incrementStreak,
        deductHeart,
        refillHearts,
        unlockNextIslandNode,
        toggleStreakFreeze,
        completeTask,
        completeLesson,
        completeVocabSession,
        addMistake,
        markMistakeMastered,
        addFlashcard,
        updateFlashcardSM2,
        regenerateStudyPlan,
        resetAllData,
        playAudioCue: playProceduralSound
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearner() {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error('useLearner must be used within a LearnerProvider');
  }
  return context;
}
