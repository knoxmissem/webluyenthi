'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  FileCheck2,
  Clock,
  Sparkles,
  ArrowRight,
  Headphones,
  BookOpen,
  Award,
  Shield,
  HelpCircle,
  Database,
  PenTool,
  Play
} from 'lucide-react';

interface ExamItem {
  id: string;
  track: 'ielts' | 'hsk';
  title: string;
  titleVi: string;
  level: string;
  type: string;
  durationMinutes: number;
  totalQuestions: number;
  sectionsCount: number;
  skills: string[];
  isMiniMock?: boolean;
  isOfficialSimulation?: boolean;
}

export default function MockExamsCatalogPage() {
  const { t } = useLanguage();
  const [filterTrack, setFilterTrack] = useState<'all' | 'ielts' | 'hsk'>('all');
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadExams() {
      setIsLoading(true);
      try {
        const query = filterTrack !== 'all' ? `?track=${filterTrack}` : '';
        const res = await fetch(`/api/exams${query}`);
        const data = await res.json();
        if (data.success && data.data) {
          setExams(data.data);
        }
      } catch (err) {
        console.error('Failed to load exams from API:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadExams();
  }, [filterTrack]);

  return (
    <div className="space-y-6">
      {/* Catalog Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            {t('PHÒNG THI THỬ MÔ PHỎNG MÁY TÍNH CBT • OFFICIAL SIMULATION', 'COMPUTER-BASED EXAMINATION ENGINE')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight mt-1">
            {t('Trung Tâm Khảo Thí Mock Exams', 'Official-Standard Mock Tests')}
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            {t(
              'Các đề thi IELTS Cambridge và HSK chuẩn được cấp phát trực tiếp từ API nội bộ (/api/exams), hỗ trợ đồng thời chế độ Luyện tập linh hoạt và chế độ Thi thử bấm giờ nghiêm ngặt.',
              'IELTS and HSK tests served via internal API (/api/exams) with server-side grading and diagnostics.'
            )}
          </p>
        </div>

        {/* Track Filter Buttons */}
        <div className="flex rounded-2xl bg-stone-100 dark:bg-slate-800 p-1 border border-stone-200 dark:border-slate-700">
          {[
            { id: 'all', label: 'Tất cả đề' },
            { id: 'ielts', label: 'IELTS Academic' },
            { id: 'hsk', label: 'HSK Chinese' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterTrack(f.id as typeof filterTrack)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filterTrack === f.id
                  ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-2xs font-black'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/50">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-xs font-bold text-stone-400">Đang tải danh mục đề thi từ API /api/exams...</p>
        </div>
      ) : (
        /* Mock Exams Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map(exam => {
            const isIelts = exam.track === 'ielts';
            return (
              <div
                key={exam.id}
                className="rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-all hover:border-indigo-300 dark:hover:border-indigo-800"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                        isIelts
                          ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}>
                        {exam.level}
                      </span>

                      {exam.isMiniMock ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300">
                          Mini-Mock
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                          Standard Test
                        </span>
                      )}
                    </div>

                    <span className="flex items-center gap-1 text-xs font-bold text-stone-500 dark:text-stone-400">
                      <Clock className="w-3.5 h-3.5" />
                      {exam.durationMinutes} phút
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-stone-900 dark:text-white mb-2">
                    {t(exam.titleVi, exam.title)}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-5 leading-relaxed">
                    {isIelts
                      ? 'Đề thi chuẩn hóa bao gồm Listening audio sóng nhạc và Reading học thuật True/False/Not Given, định dạng đề thi chuẩn Cambridge.'
                      : 'Đề thi chuẩn hóa bao gồm Nghe hiểu đối thoại tình huống thực tế và Đọc hiểu phân tích văn bản đời sống văn hóa Trung Hoa.'}
                  </p>

                  {/* Section breakdown badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exam.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300 font-bold text-[11px] flex items-center gap-1.5"
                      >
                        {skill === 'listening' ? (
                          <Headphones className="w-3.5 h-3.5 text-indigo-500" />
                        ) : skill === 'reading' ? (
                          <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <PenTool className="w-3.5 h-3.5 text-violet-500" />
                        )}
                        <span className="capitalize">{skill}</span>
                      </span>
                    ))}
                    <span className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-bold text-[11px]">
                      {exam.totalQuestions} câu hỏi
                    </span>
                  </div>
                </div>

                {/* Dual Action Buttons (Practice Mode vs Mock Mode) */}
                <div className="flex items-center gap-2 pt-2">
                  <Link
                    href={`/mock-exams/${exam.id}?mode=practice`}
                    className="flex-1 py-3 px-4 rounded-2xl border border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-800 text-stone-800 dark:text-stone-200 font-bold text-xs text-center transition"
                  >
                    Luyện Tập (Practice)
                  </Link>

                  <Link
                    href={`/mock-exams/${exam.id}?mode=mock`}
                    className="flex-1 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs text-center shadow-md shadow-indigo-500/20 active:scale-95 transition flex items-center justify-center gap-1.5"
                  >
                    <span>Vào Thi (Mock Exam)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
