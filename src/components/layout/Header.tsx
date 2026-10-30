'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { GoogleAuthModal } from '@/components/auth/GoogleAuthModal';
import {
  Flame,
  Moon,
  Sun,
  Globe,
  Zap,
  Shield,
  Sparkles,
  Heart,
  Cloud,
  LogOut,
  RefreshCw,
  User,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

export function Header() {
  const {
    profile,
    toggleStreakFreeze,
    currentUser,
    isGoogleAuthModalOpen,
    setIsGoogleAuthModalOpen,
    logoutGoogle,
    syncToCloud,
    playAudioCue
  } = useLearner();
  const { language, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleTheme = () => {
    playAudioCue('click');
    toggleTheme();
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    playAudioCue('click');
    await syncToCloud();
    setTimeout(() => setIsSyncing(false), 800);
  };

  const userEmail = currentUser?.email || profile.email;
  const userName = currentUser?.name || profile.name;

  return (
    <>
      <header className="w-full border-b border-[#E8E3D7] dark:border-slate-800 bg-[#FDFCFA]/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-3.5 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4">
        {/* Left side: Tag badges & Welcome Greeting (Matching Image 1) */}
        <div className="flex items-center gap-3">
          {/* Level badge circle */}
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-stone-300 font-bold text-xs shrink-0">
            LVL {profile.level}
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-400 font-bold text-[11px] tracking-wide uppercase">
                LV. {profile.level}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-bold text-[11px] tracking-wide uppercase">
                {profile.track === 'ielts' ? `IELTS ${profile.targetIeltsBand}` : profile.track === 'hsk' ? `HSK ${profile.targetHskLevel}` : `IELTS & HSK`}
              </span>
              {mounted && userEmail && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] tracking-wide">
                  <Cloud className="w-3 h-3 text-emerald-500" />
                  <span>Google Synced</span>
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white tracking-tight" suppressHydrationWarning>
              {t('Chào mừng trở lại', 'Welcome back')}, {userName}
            </h2>
          </div>
        </div>

        {/* Right side controls: XP bar, Hearts, Streak, Google Auth, Theme, Lang */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap ml-auto">
          {/* XP progress bar to next level */}
          <div className="hidden lg:flex flex-col gap-1 min-w-[130px] px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700">
            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 dark:text-stone-400">
              <span>XP to Lvl {profile.level + 1}</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{profile.xp}/{profile.nextLevelXp}</span>
            </div>
            <div className="h-1.5 w-full bg-stone-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.round((profile.xp / profile.nextLevelXp) * 100))}%` }}
              />
            </div>
          </div>

          {/* Duolingo Hearts Counter */}
          <div
            title={t('Số mạng học tập còn lại', 'Remaining hearts')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/70 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold text-xs"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{profile.hearts ?? 5}</span>
          </div>

          {/* Streak Button with Freeze indicator */}
          <button
            onClick={toggleStreakFreeze}
            title={t('Bấm để kích hoạt đóng băng chuỗi', 'Click to toggle streak freeze')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition active:scale-95 ${
              profile.streakFrozenToday
                ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 text-blue-700 dark:text-blue-300'
                : 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/40 text-orange-600 dark:text-orange-400'
            }`}
          >
            {profile.streakFrozenToday ? (
              <>
                <Shield className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                <span>{profile.streak} {t('NGÀY (BẢO VỆ)', 'DAYS (FROZEN)')}</span>
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 animate-flame" />
                <span>{profile.streak} {t('NGÀY', 'DAYS')}</span>
              </>
            )}
          </button>

          {/* Google Login / Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {userEmail ? (
              // Logged in with Google: User pill button
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 active:scale-95 transition shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <div className="font-extrabold text-stone-900 dark:text-white leading-tight truncate max-w-[110px]">
                    {userName}
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono leading-none truncate max-w-[110px]">
                    {userEmail}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-0.5" />
              </button>
            ) : (
              // Not logged in: Official Google Sign-In Button
              <button
                onClick={() => setIsGoogleAuthModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-stone-200 dark:border-slate-700 hover:border-indigo-500 text-stone-800 dark:text-stone-100 font-extrabold text-xs shadow-2xs active:scale-95 transition"
              >
                {/* Google G icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Đăng nhập Gmail</span>
              </button>
            )}

            {/* Account Details Dropdown Menu */}
            {isUserMenuOpen && userEmail && (
              <div className="absolute right-0 mt-2 w-72 rounded-3xl bg-white dark:bg-slate-900 border-2 border-stone-200 dark:border-slate-800 p-4 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* User card header */}
                <div className="flex items-center gap-3 pb-3 border-b border-stone-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white text-base font-black shadow-xs shrink-0">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-black text-stone-900 dark:text-white truncate">
                      {userName}
                    </h4>
                    <p className="text-[11px] font-mono text-stone-500 dark:text-stone-400 truncate">
                      {userEmail}
                    </p>
                  </div>
                </div>

                {/* Cloud Sync Status */}
                <div className="py-3 border-b border-stone-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-300">
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <Cloud className="w-3.5 h-3.5" />
                      <span>Đồng bộ máy chủ</span>
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {profile.lastSyncedAt ? 'Vừa xong' : 'Sẵn sàng'}
                    </span>
                  </div>

                  <button
                    onClick={handleManualSync}
                    disabled={isSyncing}
                    className="w-full py-2 px-3 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-600' : ''}`} />
                    <span>{isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ dữ liệu ngay'}</span>
                  </button>
                </div>

                {/* Account Actions */}
                <div className="pt-2 space-y-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsGoogleAuthModalOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center gap-2 transition text-left"
                  >
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Chuyển tài khoản Gmail khác</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logoutGoogle();
                      playAudioCue('click');
                    }}
                    className="w-full py-2 px-3 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 font-bold text-xs flex items-center gap-2 transition text-left"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Đăng xuất tài khoản</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Win Practice Button */}
          <Link
            href="/practice"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-slate-700/60 text-xs font-bold transition active:scale-95 shadow-2xs"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Quick win</span>
          </Link>

          {/* Night/Day mode switch */}
          <button
            onClick={handleToggleTheme}
            aria-label="Toggle theme"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-slate-700 text-xs font-bold transition"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Day</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-stone-600" />
                <span>Night</span>
              </>
            )}
          </button>

          {/* Language switch */}
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 text-xs font-bold uppercase transition"
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span>{language}</span>
          </button>
        </div>
      </header>

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={isGoogleAuthModalOpen}
        onClose={() => setIsGoogleAuthModalOpen(false)}
      />
    </>
  );
}
