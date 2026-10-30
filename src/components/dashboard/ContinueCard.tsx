'use client';

import React from 'react';
import Link from 'next/link';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Sparkles, BookOpen, Clock, Play } from 'lucide-react';

export function ContinueCard() {
  const { profile, studyPlan, islandNodes } = useLearner();
  const { t } = useLanguage();

  // Find currently active island node (Duolingo style)
  const currentNode = islandNodes.find(n => n.isCurrent) || islandNodes[0];
  const activeTask = studyPlan.weeks[0]?.tasks.find(t => !t.completed) || studyPlan.weeks[0]?.tasks[0];
  const completedCount = islandNodes.filter(n => n.isCompleted).length;
  const totalNodes = islandNodes.length;

  const targetLink = '/practice';

  return (
    <div className="rounded-3xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between mb-6">
      {/* Top Tag Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-extrabold text-[11px] tracking-wide uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t('MỤC TIÊU LUYỆN TẬP', 'NEXT PRACTICE')}
          </span>
          <span className="text-xs font-bold text-stone-400 dark:text-stone-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            10 MIN
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-slate-700 border border-stone-200 dark:border-slate-600 flex items-center justify-center text-xs font-black text-stone-700 dark:text-stone-300">
          LVL {profile.level}
        </div>
      </div>

      {/* Main Task Title & Description */}
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-1">
          {t('Rèn Luyện Kỹ Năng & Phản Xạ CBT', 'CBT Skills & Speed Training')}
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          {t(
            'Luyện tập chuyên sâu từng dạng đề thi Reading, Collocation Writing Task 2 và cấu trúc ngữ pháp HSK.',
            'Deep practice for Reading question types, Task 2 Collocations, and HSK grammar patterns.'
          )}
        </p>
      </div>

      {/* Today's Target Progress Bar */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-stone-500 dark:text-stone-400">
            {t('Tiến độ hoàn thành', 'Progression')}
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
            {completedCount}/{totalNodes} trạm
          </span>
        </div>
        <div className="h-2 w-full bg-stone-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.round((completedCount / (totalNodes || 1)) * 100)}%` }}
          />
        </div>
      </div>

      {/* XP Earned Today & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-slate-700/60">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
          <Sparkles className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>{t(`+${currentNode?.xpReward || 30} XP sau khi hoàn thành`, `+${currentNode?.xpReward || 30} XP upon completion`)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={targetLink}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{t('Luyện tập ngay', 'Start Practice')}</span>
          </Link>

          <Link
            href="/mock-exams"
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-stone-700 dark:text-stone-200 font-bold text-sm transition"
          >
            {t('Thi thử CBT', 'Mock Exams')}
          </Link>
        </div>
      </div>
    </div>
  );
}
