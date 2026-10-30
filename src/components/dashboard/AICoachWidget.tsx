'use client';

import React from 'react';
import Link from 'next/link';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import { Mic, Sparkles, FileCheck2, ArrowUpRight, Flame, BellRing } from 'lucide-react';

export function AICoachWidget() {
  const { profile } = useLearner();
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Guide Pulse Card (Matching Image 1) */}
      <div className="rounded-3xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/80 p-5 shadow-xs">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-500 fill-indigo-500 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
              GUIDE PULSE
            </span>
            <p className="text-xs font-bold text-stone-800 dark:text-stone-200 leading-snug">
              {t(
                'Luyện tập phản xạ CBT mỗi ngày để tối ưu tốc độ làm bài thi.',
                'Practice CBT reflex daily to optimize your test speed.'
              )}
            </p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
              {profile.track === 'ielts' ? 'IELTS Academic · Focus Reading & Writing CBT' : 'HSK Standard · Focus Vocab & Grammar'}
            </p>
          </div>
        </div>

        {/* Today's cue notification box */}
        <div className="rounded-2xl bg-stone-50 dark:bg-slate-700/40 border border-stone-200/70 dark:border-slate-700 p-3 mb-3 flex items-center gap-2.5">
          <BellRing className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-stone-800 dark:text-stone-200">
              {t('Gợi ý hôm nay: ', "Today's cue: ")}
            </span>
            <span className="text-stone-600 dark:text-stone-300">
              {t('Thực hành bài viết Task 2 hoặc rèn luyện Reading Passage 1 chuẩn Cambridge!', 'Practice Task 2 essay or Cambridge Reading Passage 1!')}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/practice"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-stone-800 dark:text-stone-200 font-bold text-xs transition shadow-2xs active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>{t('Vào phòng Luyện Writing & HSK ngay', 'Enter Practice Lab')}</span>
        </Link>
      </div>

      {/* CBT Mock Exam Quick-Access */}
      <div className="rounded-3xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/80 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              {t('Thi thử CBT Trực Tuyến', 'CBT Mock Exams')}
            </h4>
          </div>
          <Link
            href="/mock-exams"
            className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
          >
            <span>{t('Xem đề thi', 'View exams')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-900/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
              📝
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                Cambridge IELTS 19 & 18
              </p>
              <p className="text-[10px] text-stone-500 dark:text-stone-400">
                Reading & Writing chuẩn Study4
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-extrabold text-[10px] uppercase">
            CBT
          </span>
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 dark:border-slate-700/60 text-xs">
          <span className="text-stone-500 dark:text-stone-400 font-medium flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            {t('Chuỗi học tập: ', 'Current streak: ')}
            <strong className="text-stone-800 dark:text-stone-200">{profile.streak} {t('ngày', 'days')}</strong>
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">
            {t('Kỷ lục: ', 'Best: ')}{profile.bestStreak} {t('ngày', 'days')}
          </span>
        </div>
      </div>
    </div>
  );
}
