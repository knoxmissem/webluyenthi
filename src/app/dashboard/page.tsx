'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  CheckCircle2,
  Target,
  Zap,
  BookOpen,
  FileCheck2,
  Compass,
  Check,
  TrendingUp,
  Circle,
  Award
} from 'lucide-react';

export default function DashboardPage() {
  const { profile, playAudioCue, addXp } = useLearner();
  const { t } = useLanguage();

  // Daily goals interactive checklist
  const [dailyGoals, setDailyGoals] = useState([
    { id: 1, text: 'Ôn 15 từ vựng mới trên OpenQuiz', completed: true, link: '/flashcards' },
    { id: 2, text: 'Làm 1 bài Reading mini test chuẩn CBT', completed: false, link: '/mock-exams' },
    { id: 3, text: 'Rèn 5 câu Collocations Writing Task 2', completed: false, link: '/practice' }
  ]);

  const toggleGoal = (id: number) => {
    playAudioCue('click');
    setDailyGoals(prev =>
      prev.map(g => {
        if (g.id === id) {
          const next = !g.completed;
          if (next) addXp(20);
          return { ...g, completed: next };
        }
        return g;
      })
    );
  };

  const completedGoalsCount = dailyGoals.filter(g => g.completed).length;

  return (
    <div className="space-y-8 pb-16">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER — HÀNH TRÌNH CỦA BẠN · 2026 */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#246B5A] via-[#1D5749] to-[#164439] text-white p-6 sm:p-8 md:p-10 shadow-xl border border-teal-700/40">
        {/* Ambient decorative glowing circles */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute right-12 -top-6 w-56 h-56 rounded-full border border-white/15 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-black tracking-widest uppercase text-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>HÀNH TRÌNH CỦA BẠN · 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Học có chiến lược.<br />
              <span className="text-[#F1B863]">Tiến bộ mỗi ngày.</span>
            </h1>

            <p className="text-xs sm:text-sm text-teal-100/85 max-w-xl leading-relaxed">
              Luyện thi IELTS Academic và HSK 1–6 trong một không gian gọn gàng — làm bài chuẩn CBT, tra cứu từ vựng thông minh, xem giải thích chi tiết và tự tạo bộ từ vựng riêng.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/mock-exams"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#F1B863] hover:bg-[#e4ad57] text-[#2B2115] font-black text-xs shadow-lg shadow-amber-900/20 transition transform active:scale-95"
              >
                <span>Bắt đầu luyện đề CBT</span>
                <span>↗</span>
              </Link>

              <Link
                href="/flashcards"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs border border-white/25 backdrop-blur-md transition active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Luyện từ vựng OpenQuiz</span>
              </Link>

              <Link
                href="/mock-exams/hsk"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 backdrop-blur-md transition active:scale-95"
              >
                <span>Khám phá HSK 1–6</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Study Board */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900/90 text-stone-900 dark:text-white p-5 shadow-2xl border border-teal-600/30 rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
                <span className="text-[11px] font-black tracking-wider text-teal-800 dark:text-teal-400 uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  WEEKLY OVERVIEW
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Đang tiến bộ
                </span>
              </div>

              <div className="my-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
                  <span>Mục tiêu tuần này</span>
                  <span className="text-teal-800 dark:text-teal-300 font-black">4 / 6 phiên học</span>
                </div>
                <div className="h-2 w-full bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full w-[67%] transition-all" />
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-100 dark:border-slate-700/60 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                      ▤
                    </span>
                    <div>
                      <strong className="block text-[11px] font-bold text-stone-800 dark:text-stone-200">
                        IELTS CBT Reading
                      </strong>
                      <span className="text-[10px] text-stone-400">2 phiên làm bài</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    +12%
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-100 dark:border-slate-700/60 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
                      文
                    </span>
                    <div>
                      <strong className="block text-[11px] font-bold text-stone-800 dark:text-stone-200">
                        HSK Vocabulary
                      </strong>
                      <span className="text-[10px] text-stone-400">24 từ đã ôn</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                    +8%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 4 CORE STAT CARDS */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Stat 1: Study Time */}
        <div className="rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 text-xs font-bold mb-2">
            <span>Thời gian học</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            {Math.max(1.8, Math.round((profile.totalStudyMinutes / 60) * 10) / 10)}h
          </div>
          <div className="text-[11px] text-stone-400 font-semibold mt-1">
            <span className="text-emerald-600 font-bold">↗ +18%</span> so với tuần trước
          </div>
        </div>

        {/* Stat 2: Completed tests */}
        <div className="rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 text-xs font-bold mb-2">
            <span>Bài đã hoàn thành</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            {profile.completedLessonsCount + 12}
          </div>
          <div className="text-[11px] text-stone-400 font-semibold mt-1">
            Bài thi CBT và mini test
          </div>
        </div>

        {/* Stat 3: Accuracy */}
        <div className="rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 text-xs font-bold mb-2">
            <span>Độ chính xác</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            {profile.quizAccuracyAverage || 76}%
          </div>
          <div className="text-[11px] text-stone-400 font-semibold mt-1">
            Dựa trên câu đã chấm điểm
          </div>
        </div>

        {/* Stat 4: Streak */}
        <div className="rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 text-xs font-bold mb-2">
            <span>Ngày học liên tiếp</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-orange-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight flex items-baseline gap-1.5">
            <span>{profile.streak || 3}</span>
            <span className="text-sm font-bold text-stone-400">ngày</span>
          </div>
          <div className="text-[11px] text-stone-400 font-semibold mt-1">
            Giữ nhịp học đều đặn nhé
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE PILLARS GRID — HÔM NAY BẠN MUỐN LUYỆN GÌ? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-black uppercase text-[#246B5A] dark:text-teal-400 tracking-wider">
              CHỌN ĐƯỜNG ĐI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-0.5">
              Hôm nay bạn muốn luyện gì?
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Chọn kỹ năng phù hợp với mục tiêu và thời gian hiện tại của bạn.
            </p>
          </div>

          <Link
            href="/mock-exams"
            className="text-xs font-bold text-[#246B5A] dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>Xem toàn bộ kho đề</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1: OpenQuiz Vocabulary */}
          <Link
            href="/flashcards"
            className="group rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-[#246B5A] dark:hover:border-teal-500 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-[#246B5A] dark:text-teal-300 flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition">
                🗂️
              </div>
              <div>
                <span className="text-[10px] font-black text-teal-700 dark:text-teal-400 uppercase tracking-wide">
                  OPENQUIZ · MỚI
                </span>
                <h3 className="text-base font-black text-stone-900 dark:text-white mt-0.5">
                  Luyện Từ Vựng OpenQuiz
                </h3>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Lật thẻ 3D, trắc nghiệm nhanh, gõ từ chính tả, game ghép thẻ và tính năng <strong>tự tạo bộ từ riêng</strong> để ôn tập.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
              <span className="text-stone-400">5+ bộ đề & Tự tạo</span>
              <span className="text-[#246B5A] dark:text-teal-400 flex items-center gap-1">
                <span>Vào học</span>
                <span>→</span>
              </span>
            </div>
          </Link>

          {/* Pillar 2: Writing & Reading Lab */}
          <Link
            href="/practice"
            className="group rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-rose-400 dark:hover:border-rose-600 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition">
                ✍️
              </div>
              <div>
                <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                  WRITING & COLLOCATIONS
                </span>
                <h3 className="text-base font-black text-stone-900 dark:text-white mt-0.5">
                  Writing & Reading Lab
                </h3>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Điền khuyết Collocations Task 2, nâng cấp câu Band 8.0+, rèn kỹ năng Reading chia đôi màn hình chuẩn thi thật.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
              <span className="text-stone-400">Band 7.5+ Lexical</span>
              <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <span>Mở Lab</span>
                <span>→</span>
              </span>
            </div>
          </Link>

          {/* Pillar 3: CBT Mock Exams */}
          <Link
            href="/mock-exams"
            className="group rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition">
                📝
              </div>
              <div>
                <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  IELTS ACADEMIC
                </span>
                <h3 className="text-base font-black text-stone-900 dark:text-white mt-0.5">
                  Phòng Thi Thử Máy Tính CBT
                </h3>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Đề thi Cambridge IELTS chuẩn format thi máy tính (CBT), đồng hồ bấm giờ nghiêm ngặt và phân tích kết quả tức thì.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
              <span className="text-stone-400">Official Mock Engine</span>
              <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <span>Vào thi</span>
                <span>→</span>
              </span>
            </div>
          </Link>

          {/* Pillar 4: HSK Exam Center */}
          <Link
            href="/mock-exams/hsk"
            className="group rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-amber-400 dark:hover:border-amber-600 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition">
                文
              </div>
              <div>
                <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                  HSK 1–6 (ĐỀ CƯƠNG 3.0)
                </span>
                <h3 className="text-base font-black text-stone-900 dark:text-white mt-0.5">
                  Học Viện Khảo Thí HSK
                </h3>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Luyện từ vựng 300 đến 5.400 từ theo cấp độ, đọc hiểu câu mẫu, chấm điểm tức thì và lưu từ vựng để ôn tập.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
              <span className="text-stone-400">6 Cấp độ HSK</span>
              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span>Khám phá</span>
                <span>→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BOTTOM GRID — RECENT RUNS & WEEKLY GOALS */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Activity (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-stone-900 dark:text-white">
                Gần đây của bạn
              </h3>
              <p className="text-xs text-stone-400">
                Các bài luyện tập và phiên thi thử đã làm
              </p>
            </div>
            <Link
              href="/mock-exams"
              className="text-xs font-bold text-[#246B5A] dark:text-teal-400 hover:underline"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-3">
            {/* Recent Item 1 */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50/80 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-700/60 transition hover:bg-stone-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#246B5A] dark:text-teal-400 flex items-center justify-center font-bold text-sm">
                  文
                </div>
                <div>
                  <h4 className="text-xs font-black text-stone-900 dark:text-white">
                    HSK 1 · Vocabulary Mini Test
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    HSK Standard · 3 câu hỏi hoàn tất
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-black text-xs">
                  100%
                </span>
                <Link
                  href="/mock-exams/hsk"
                  className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 hover:bg-white text-xs font-bold text-stone-700 dark:text-stone-300 transition"
                >
                  Luyện lại
                </Link>
              </div>
            </div>

            {/* Recent Item 2 */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50/80 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-700/60 transition hover:bg-stone-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                  ▤
                </div>
                <div>
                  <h4 className="text-xs font-black text-stone-900 dark:text-white">
                    Urban Gardens: A New City Habit
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    IELTS CBT Reading · Environment
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-black text-xs">
                  80%
                </span>
                <Link
                  href="/mock-exams"
                  className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 hover:bg-white text-xs font-bold text-stone-700 dark:text-stone-300 transition"
                >
                  Luyện lại
                </Link>
              </div>
            </div>

            {/* Recent Item 3 */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50/80 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-700/60 transition hover:bg-stone-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                  🗂️
                </div>
                <div>
                  <h4 className="text-xs font-black text-stone-900 dark:text-white">
                    IELTS Band 7.5+ Core Academic
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    OpenQuiz Flashcard · Đã ôn 15 từ
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-black text-xs">
                  Hoàn tất
                </span>
                <Link
                  href="/flashcards"
                  className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 hover:bg-white text-xs font-bold text-stone-700 dark:text-stone-300 transition"
                >
                  Học tiếp
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Goals & Smart AI Suggestions (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
              <h3 className="text-base font-black text-stone-900 dark:text-white">
                Mục tiêu hôm nay
              </h3>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {completedGoalsCount}/{dailyGoals.length} đã xong
              </span>
            </div>

            {/* Daily goals checklist */}
            <div className="space-y-2.5 my-4">
              {dailyGoals.map(goal => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer ${
                    goal.completed
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40'
                      : 'bg-stone-50 dark:bg-slate-800/40 border-stone-200/70 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {goal.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300 dark:text-stone-600 shrink-0" />
                    )}
                    <span
                      className={`text-xs font-bold ${
                        goal.completed
                          ? 'line-through text-emerald-800/70 dark:text-emerald-400/70'
                          : 'text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      {goal.text}
                    </span>
                  </div>

                  <Link
                    href={goal.link}
                    onClick={e => e.stopPropagation()}
                    className="text-[11px] font-bold text-teal-700 dark:text-teal-400 hover:underline"
                  >
                    Vào →
                  </Link>
                </div>
              ))}
            </div>

            {/* Smart Suggestion Callout */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-black text-amber-900 dark:text-amber-200">
                <span>✦</span>
                <span>Gợi ý chiến lược hôm nay</span>
              </div>
              <p className="text-amber-800 dark:text-amber-300/90 leading-relaxed text-[11px]">
                Dành 10 phút lướt qua bộ thẻ flashcard trên OpenQuiz, sau đó bấm giờ làm 1 bài Reading ngắn và ghi chú các collocations mới vào bộ thẻ tự tạo của bạn.
              </p>
            </div>
          </div>

          <Link
            href="/practice"
            className="w-full py-3 px-4 rounded-2xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-extrabold text-xs text-center shadow-md shadow-teal-900/20 transition active:scale-95"
          >
            Đi tới Phòng Luyện Tập Ngay
          </Link>
        </div>
      </section>
    </div>
  );
}
