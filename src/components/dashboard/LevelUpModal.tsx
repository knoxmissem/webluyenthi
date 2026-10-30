'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import { Trophy, Sparkles, X } from 'lucide-react';

export function LevelUpModal() {
  const { showLevelUpModal, setShowLevelUpModal, profile } = useLearner();
  const { t } = useLanguage();

  useEffect(() => {
    if (showLevelUpModal) {
      // Trigger festive confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, [showLevelUpModal]);

  if (!showLevelUpModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-500/50 p-6 shadow-2xl text-center">
        <button
          onClick={() => setShowLevelUpModal(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Golden Badge Icon */}
        <div className="mx-auto mb-4 relative flex items-center justify-center w-28 h-28">
          <div className="absolute inset-0 bg-amber-400/20 rounded-full animate-ping opacity-75" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800">
            <Trophy className="w-12 h-12 text-amber-950" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-7 h-7 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        <h3 className="text-2xl font-black uppercase tracking-wider text-amber-500 dark:text-amber-400 mb-1">
          {t('LÊN CẤP!', 'LEVEL UP!')}
        </h3>
        <p className="text-base font-bold text-stone-800 dark:text-stone-100 mb-2">
          {t(`Chúc mừng bạn đã đạt Cấp độ ${profile.level}!`, `You unlocked Level ${profile.level}!`)}
        </p>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 px-2 leading-relaxed">
          {t(
            'Bạn đã mở khóa danh hiệu Thám Hiểm Gia và tiến gần hơn tới mục tiêu ngôn ngữ của mình!',
            'You unlocked the Explorer badge and made great strides toward your language target!'
          )}
        </p>

        <button
          onClick={() => setShowLevelUpModal(false)}
          className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-base shadow-md shadow-indigo-500/25 transition active:scale-95"
        >
          OK
        </button>
      </div>
    </div>
  );
}
