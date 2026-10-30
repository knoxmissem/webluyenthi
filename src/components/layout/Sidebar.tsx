'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Home,
  Dumbbell,
  Layers,
  FileCheck2,
  Settings,
  Flame,
  Award,
  Sparkles,
  Compass
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useLearner();
  const { t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: t('Trang chủ', 'Home'), href: '/dashboard', icon: Home },
    { label: t('Luyện Từ Vựng', 'Vocab Quiz'), href: '/flashcards', icon: Sparkles, badge: 'OpenQuiz' },
    { label: t('Luyện Writing & HSK', 'Practice Lab'), href: '/practice', icon: Dumbbell, badge: 'HOT' },
    { label: t('Thi thử CBT', 'Mock Exams'), href: '/mock-exams', icon: FileCheck2 },
    { label: t('Cài đặt', 'Settings'), href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-[#E8E3D7] dark:border-slate-800 bg-[#FDFCFA]/95 dark:bg-slate-900/95 min-h-screen p-4 sticky top-0 h-screen overflow-y-auto">
      {/* Brand & App Logo */}
      <div className="flex items-center gap-3 px-2 py-3 mb-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
          <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            LINGORA
          </h1>
          <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            IELTS & HSK AI
          </p>
        </div>
      </div>

      {/* User Mini Profile Card */}
      <div className="rounded-2xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/60 p-3 mb-3 shadow-xs">
        <div className="flex items-center gap-3 mb-2.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-800/40 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-xl shadow-xs">
              {profile.avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-stone-800 dark:text-stone-100 truncate" suppressHydrationWarning>
              {profile.name}
            </h4>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 truncate" suppressHydrationWarning>
              {profile.track === 'ielts' ? `IELTS ${profile.targetIeltsBand}` : profile.track === 'hsk' ? `HSK ${profile.targetHskLevel}` : `IELTS & HSK`}
            </p>
          </div>
        </div>

        {/* XP Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
              <Sparkles className="w-3 h-3" /> LVL {profile.level}
            </span>
            <span>{profile.xp} / {profile.nextLevelXp} XP</span>
          </div>
          <div className="h-1.5 w-full bg-stone-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((profile.xp / profile.nextLevelXp) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats Pill Row */}
      <div className="grid grid-cols-3 gap-1.5 mb-4 text-center">
        <div className="rounded-xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/30 py-1.5 px-1">
          <div className="flex items-center justify-center gap-1 text-orange-600 dark:text-orange-400 font-bold text-xs">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 animate-flame" />
            <span>{profile.streak}</span>
          </div>
          <p className="text-[9px] font-semibold text-orange-600/80 dark:text-orange-400/80 uppercase" suppressHydrationWarning>
            {t('Chuỗi', 'Streak')}
          </p>
        </div>

        <div className="rounded-xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/30 py-1.5 px-1">
          <div className="flex items-center justify-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
            <span>{profile.level}</span>
          </div>
          <p className="text-[9px] font-semibold text-indigo-600/80 dark:text-indigo-400/80 uppercase" suppressHydrationWarning>
            {t('Cấp', 'Level')}
          </p>
        </div>

        <div className="rounded-xl bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/30 py-1.5 px-1">
          <div className="flex items-center justify-center gap-1 text-teal-600 dark:text-teal-400 font-bold text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>{profile.unlockedAchievementIds.length}</span>
          </div>
          <p className="text-[9px] font-semibold text-teal-600/80 dark:text-teal-400/80 uppercase" suppressHydrationWarning>
            {t('Huy hiệu', 'Badges')}
          </p>
        </div>
      </div>

      {/* Main Navigation Items */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100/70 dark:hover:bg-slate-800/60 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`} />
              <span className="flex-1 truncate" suppressHydrationWarning>{item.label}</span>
              {item.badge && (
                <span suppressHydrationWarning className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                }`}>
                  {item.badge}
                </span>
              )}
              {isActive && !item.badge && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Guide Mode Widget (Matching Image 1 bottom left) */}
      <div className="mt-4 rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-stone-50 dark:bg-slate-800/40 p-3">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>GUIDE MODE</span>
        </div>
        <p className="text-xs font-semibold text-stone-700 dark:text-stone-200 leading-relaxed mb-1">
          {t('Một bước nhỏ mỗi ngày. Bạn đang tiến bộ rất nhanh!', 'One small step at a time. You got this!')}
        </p>
        <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
          {t(`${profile.dailyMinutes} phút/ngày • 5 buổi/tuần`, `${profile.dailyMinutes} mins/day • 5 sessions/wk`)}
        </p>
      </div>
    </aside>
  );
}
