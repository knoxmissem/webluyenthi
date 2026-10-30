'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  BookOpen,
  Headphones,
  FileCheck2,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  Sun,
  Moon,
  Gift,
  Star,
  Play,
  Heart,
  Crown
} from 'lucide-react';

export default function LandingPage() {
  const { language, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#0B1120] text-stone-900 dark:text-stone-100 flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Top Navbar */}
      <nav className="w-full border-b border-[#E8E3D7] dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '25s' }} />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              LINGORA
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
              IELTS & HSK AI
            </span>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300">
          <Link href="/flashcards" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-emerald-500" />
            <span>Hải Trình Vô Tận</span>
          </Link>
          <Link href="/practice" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-rose-500" />
            <span>Writing & HSK Lab</span>
          </Link>
          <Link href="/mock-exams" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            {t('Phòng Thi Thử', 'Mock Exams')}
          </Link>
          <Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            {t('Bảng Điều Khiển', 'Dashboard')}
          </Link>
        </div>

        {/* Right Side Controls: Nightmode, Language & Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Day/Night Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-slate-700 text-xs font-bold transition shadow-2xs"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Day</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-stone-600" />
                <span className="hidden sm:inline">Night</span>
              </>
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-slate-700 text-xs font-bold uppercase transition shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span>{language}</span>
          </button>

          <Link
            href="/login?mode=login"
            className="px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-stone-50 dark:hover:bg-slate-700 transition"
          >
            {t('Đăng nhập', 'Sign In')}
          </Link>

          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md shadow-indigo-600/25 active:scale-95 transition"
          >
            <span>{t('Vào Học Ngay', 'Go to App')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full text-center">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-indigo-500/15 to-rose-500/10 rounded-full blur-3xl -z-10" />

        {/* Feature Announcement Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 text-xs font-black mb-6 shadow-2xs animate-pulse">
          <Sparkles className="w-3.5 h-3.5 fill-emerald-500" />
          <span>{t('MỚI: Hải Trình Vô Tận 200 — 1000 Ngày • Gamified IELTS & HSK', 'NEW: Infinite Mastery Odyssey 200 — 1000 Days')}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 dark:text-white max-w-4xl mx-auto leading-[1.15] mb-6">
          {t('Chinh phục ', 'Master ')}
          <span className="bg-gradient-to-r from-emerald-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent">
            IELTS & HSK
          </span>
          {t(' qua Hải Trình Vô Tận Gamified.', ' with the Infinite Gamified Odyssey.')}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed mb-8">
          {t(
            'Không còn những danh sách khô khan. Mở khóa từng trạm học trên con đường uốn lượn, rèn Collocations Task 2 Band 8.0+, ghép câu chữ 把 HSK, thi thử Cambridge & đồng bộ đám mây.',
            'No more boring session grids. Unlock interactive stations on the winding adventure path, master Band 8.0+ collocations, HSK grammar, and Cambridge mock exams.'
          )}
        </p>

        {/* 3D Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/flashcards"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#58cc02] border-b-[6px] border-[#46a302] hover:brightness-105 active:border-b-0 active:translate-y-[6px] text-white font-black text-base shadow-xl shadow-emerald-600/25 transition"
          >
            <Compass className="w-5 h-5" />
            <span>{t('Khám Phá Hải Trình Vô Tận', 'Explore Mastery Odyssey')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/practice"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-rose-600 border-b-[6px] border-rose-800 hover:brightness-105 active:border-b-0 active:translate-y-[6px] text-white font-black text-base shadow-lg shadow-rose-600/25 transition"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span>{t('Vào Phòng Luyện Writing & HSK', 'Writing & HSK Lab')}</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-stone-800 dark:text-stone-100 font-extrabold text-sm transition shadow-2xs"
          >
            <span>{t('Xem Bảng Điều Khiển (Demo)', 'Launch Dashboard')}</span>
          </Link>
        </div>

        {/* =================================================================== */}
        {/* INTERACTIVE VISUAL GAMEPLAY SHOWCASE CARD */}
        {/* =================================================================== */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl border-2 border-indigo-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-7 shadow-2xl relative overflow-hidden text-left">
          {/* Card Top HUD Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-stone-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-md shadow-emerald-500/20">
                🦉
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Lộ Trình Gamified Thế Hệ Mới
                </span>
                <h3 className="text-base font-black text-stone-900 dark:text-white">
                  Hải Trình Vô Tận: IELTS Writing & HSK
                </h3>
              </div>
            </div>

            {/* Live Stats Pills */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/40 text-orange-600 dark:text-orange-400 font-black text-xs">
                <Flame className="w-3.5 h-3.5 fill-orange-500" />
                <span>12 Ngày</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 font-black text-xs">
                <Crown className="w-3.5 h-3.5 fill-amber-500" />
                <span>24 Trạm</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/40 text-sky-600 dark:text-sky-400 font-black text-xs">
                <span>💎 350 Ngọc</span>
              </div>
            </div>
          </div>

          {/* Mini Interactive Preview of the Winding Path */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left 7 cols: Miniature Winding Roadmap Representation */}
            <div className="md:col-span-7 p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-700/80 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase">
                    Chương 1
                  </span>
                  <span className="text-xs font-black text-stone-800 dark:text-stone-200">
                    Môi Trường & Đô Thị Hóa
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  Band 8.0+ Collocations
                </span>
              </div>

              {/* Connected Preview Nodes */}
              <div className="flex items-center justify-between gap-2 px-2 py-3 overflow-x-auto">
                {/* Node 1: Completed */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#ffc800] border-b-[5px] border-[#d49700] text-white flex items-center justify-center font-black shadow-sm">
                    <Crown className="w-5 h-5 fill-white" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-500">Bài 1</span>
                </div>

                <div className="h-1 flex-1 bg-amber-300 dark:bg-amber-600 rounded-full" />

                {/* Node 2: Completed */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#ffc800] border-b-[5px] border-[#d49700] text-white flex items-center justify-center font-black shadow-sm">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-500">Luyện Viết</span>
                </div>

                <div className="h-1 flex-1 bg-amber-300 dark:bg-amber-600 rounded-full" />

                {/* Node 3: Current with Owl */}
                <div className="flex flex-col items-center gap-1 shrink-0 relative">
                  <div className="w-12 h-12 rounded-full bg-[#58cc02] border-b-[5px] border-[#46a302] text-white flex items-center justify-center font-black shadow-md ring-4 ring-emerald-400/40 animate-pulse">
                    <Star className="w-5 h-5 fill-white" />
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">Đang học</span>
                </div>

                <div className="h-1 flex-1 bg-stone-200 dark:bg-slate-700 rounded-full" />

                {/* Node 4: Treasure Chest */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-500 border-b-[5px] border-amber-700 text-white flex items-center justify-center font-black shadow-sm">
                    <Gift className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-500">Rương Quà</span>
                </div>

                <div className="h-1 flex-1 bg-stone-200 dark:bg-slate-700 rounded-full" />

                {/* Node 5: Boss Trophy */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-slate-700 border-b-[5px] border-stone-300 dark:border-slate-800 text-stone-400 flex items-center justify-center font-black shadow-sm">
                    <Trophy className="w-5 h-5 text-stone-400" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-400">Về Đích</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Highlights of the feature */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-black text-stone-900 dark:text-white">
                    Học từ từ 15–20 từ/ngày
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Không quá tải, mở khóa từng bài học theo chu kỳ lặp lại ngắt quãng SM-2.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-black text-stone-900 dark:text-white">
                    Rèn Collocations & Viết Câu
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Lắp ghép cụm từ Band 8.0+ (pose a threat, pave the way) và câu chữ 把.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-black text-stone-900 dark:text-white">
                    Bản Đồ Mở Rộng Đến 1.000 Ngày
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Nút tải thêm vô tận, đủ lượng bài tập học liên tục trong 1 đến 3 năm!
                  </p>
                </div>
              </div>

              <Link
                href="/flashcards"
                className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline pt-1"
              >
                <span>Trải nghiệm ngay trên bản đồ thật →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4 CORE PILLARS OF LINGORA (TỨ TRỤ LUYỆN THI) */}
      {/* ===================================================================== */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
            HỆ SINH THÁI TOÀN DIỆN
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight mt-1 mb-3">
            Bốn Trụ Cột Đột Phá Điểm Số
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
            Mọi công cụ cần thiết để bứt phá band điểm IELTS và chinh phục HSK tiếng Trung cấp tốc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <Link
            href="/flashcards"
            className="group p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-emerald-400 dark:hover:border-emerald-600 transition shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-xl shadow-md shadow-teal-600/25 group-hover:scale-105 transition">
                🗂️
              </div>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                Luyện Từ Vựng OpenQuiz
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Flashcard 3D, trắc nghiệm thông minh, gõ từ chính tả, game ghép thẻ và tính năng tự tạo bộ từ vựng cá nhân để ôn thi cấp tốc.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 text-xs font-black text-teal-600 dark:text-teal-400 flex items-center gap-1">
              <span>Vào luyện từ vựng</span>
              <span>→</span>
            </div>
          </Link>

          {/* Pillar 2 */}
          <Link
            href="/practice"
            className="group p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-rose-400 dark:hover:border-rose-600 transition shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-xl shadow-md shadow-rose-500/25 group-hover:scale-105 transition">
                ✍️
              </div>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                Writing & HSK Lab
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Điền khuyết Collocations Task 2, nâng cấp câu Band 8.0+, rèn cấu trúc câu chữ 把 & 选词填空 tự động.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 text-xs font-black text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <span>Vào phòng luyện viết</span>
              <span>→</span>
            </div>
          </Link>

          {/* Pillar 3 */}
          <Link
            href="/mock-exams"
            className="group p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-400 dark:hover:border-indigo-600 transition shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md shadow-indigo-600/25 group-hover:scale-105 transition">
                📝
              </div>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                Phòng Thi Thử Thực Tế
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Đề thi Cambridge IELTS và HSK 1-6 chuẩn format quốc tế, đồng hồ bấm giờ và chấm điểm chi tiết tức thì.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <span>Thi thử ngay</span>
              <span>→</span>
            </div>
          </Link>

          {/* Pillar 4 */}
          <Link
            href="/mock-exams"
            className="group p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-teal-400 dark:hover:border-teal-600 transition shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-xl shadow-md shadow-teal-600/25 group-hover:scale-105 transition">
                ⚡
              </div>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                Mô Phỏng CBT Chuẩn
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Chia đôi màn hình đọc đề & làm bài chuẩn Cambridge, highlight từ khóa, giải thích chi tiết và chấm điểm tức thì.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 text-xs font-black text-teal-600 dark:text-teal-400 flex items-center gap-1">
              <span>Luyện CBT ngay</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E8E3D7] dark:border-slate-800 bg-white dark:bg-slate-900 py-10 px-6 lg:px-12 text-center text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-indigo-600" />
          <span className="font-black text-stone-800 dark:text-stone-200 text-sm">
            LINGORA
          </span>
        </div>
        <p className="max-w-md mx-auto leading-relaxed">
          Nền tảng học luyện thi thông minh IELTS & HSK. Bản đồ Hải Trình Vô Tận gamified, rèn luyện nhịp độ bền vững mỗi ngày.
        </p>
      </footer>
    </div>
  );
}
