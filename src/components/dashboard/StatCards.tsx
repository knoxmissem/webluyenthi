'use client';

import React from 'react';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import { Clock, Flame, BookCheck, Target } from 'lucide-react';

export function StatCards() {
  const { profile } = useLearner();
  const { t } = useLanguage();

  const stats = [
    {
      title: t('THỜI GIAN HỌC', 'STUDY TIME'),
      value: `${profile.totalStudyMinutes}`,
      unit: t('PHÚT', 'MIN'),
      icon: Clock,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      borderColor: 'border-emerald-200/60 dark:border-emerald-800/30'
    },
    {
      title: t('CHUỖI NGÀY', 'STREAK'),
      value: `${profile.streak}`,
      unit: t('NGÀY', 'DAYS'),
      icon: Flame,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200/60 dark:border-orange-900/30'
    },
    {
      title: t('BÀI ĐÃ XONG', 'LESSONS DONE'),
      value: `${profile.completedLessonsCount}`,
      unit: t('BÀI', 'DONE'),
      icon: BookCheck,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
      borderColor: 'border-indigo-200/60 dark:border-indigo-900/30'
    },
    {
      title: t('ĐỘ CHÍNH XÁC', 'QUIZ ACCURACY'),
      value: profile.completedLessonsCount > 0 ? `${profile.quizAccuracyAverage}%` : '--',
      unit: '',
      icon: Target,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-200/60 dark:border-amber-900/30'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/80 p-4 shadow-xs flex flex-col justify-between transition-all hover:translate-y-[-1px] hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-400 dark:text-stone-500 tracking-wider uppercase">
                {stat.title}
              </span>
              <div className={`p-1.5 rounded-lg ${stat.bgColor} ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
                  {stat.unit}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
