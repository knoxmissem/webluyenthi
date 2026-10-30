'use client';

import React, { useState, useEffect, use, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { WaveformAudio } from '@/components/exam/WaveformAudio';
import { QuestionPalette } from '@/components/exam/QuestionPalette';
import { ReadingLabWorkspace } from '@/components/exam/ReadingLabWorkspace';
import { WritingLabWorkspace } from '@/components/exam/WritingLabWorkspace';
import { HskWritingWorkspace } from '@/components/exam/HskWritingWorkspace';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import { MockExam, ExamQuestion, ExamSection } from '@/types';
import {
  Clock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Headphones,
  BookOpen,
  Volume2,
  Shield,
  AlertTriangle,
  Play,
  RotateCcw,
  Bookmark,
  Check,
  ChevronRight,
  PenTool,
  Send,
  HelpCircle
} from 'lucide-react';

export default function MockExamInterfacePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'practice' ? 'practice' : 'mock';

  const resolvedParams = use(params);
  const examId = resolvedParams.id;
  const { playAudioCue, addMistake, addXp } = useLearner();
  const { t } = useLanguage();

  const [exam, setExam] = useState<MockExam | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedExam, setHasStartedExam] = useState(initialMode === 'practice'); // Briefing screen for mock mode
  const [examMode, setExamMode] = useState<'practice' | 'mock'>(initialMode);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeQuestionNum, setActiveQuestionNum] = useState(1);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60 * 60);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Storage keys for session persistence
  const sessionTimerKey = `lingora_cbt_timer_${examId}`;
  const sessionAnswersKey = `lingora_cbt_answers_${examId}`;
  const sessionFlaggedKey = `lingora_cbt_flagged_${examId}`;

  // Fetch exam from self-hosted API
  useEffect(() => {
    async function loadExam() {
      setIsLoading(true);
      try {
        const query = examMode === 'mock' ? '?mode=mock' : '?mode=practice';
        const res = await fetch(`/api/exams/${examId}${query}`);
        const data = await res.json();
        if (data.success && data.exam) {
          setExam(data.exam);

          // Restore session answers if present
          try {
            const savedAnswers = sessionStorage.getItem(sessionAnswersKey);
            if (savedAnswers) setUserAnswers(JSON.parse(savedAnswers));

            const savedFlags = sessionStorage.getItem(sessionFlaggedKey);
            if (savedFlags) setFlaggedQuestions(new Set(JSON.parse(savedFlags)));

            const savedSeconds = sessionStorage.getItem(sessionTimerKey);
            if (savedSeconds && examMode === 'mock') {
              setSecondsRemaining(parseInt(savedSeconds, 10));
              setHasStartedExam(true);
            } else {
              setSecondsRemaining(data.exam.durationMinutes * 60);
            }
          } catch {}
        }
      } catch (err) {
        console.error('Failed to load exam from API:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadExam();
  }, [examId, examMode, sessionAnswersKey, sessionFlaggedKey, sessionTimerKey]);

  // Timer countdown
  useEffect(() => {
    if (examMode === 'practice' || !hasStartedExam || !exam) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        const updated = prev - 1;
        try {
          sessionStorage.setItem(sessionTimerKey, updated.toString());
        } catch {}
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examMode, hasStartedExam, exam, sessionTimerKey]);

  // Save answers to sessionStorage
  const handleAnswerChange = (questionNumber: number, value: string) => {
    setUserAnswers(prev => {
      const next = { ...prev, [questionNumber.toString()]: value };
      try {
        sessionStorage.setItem(sessionAnswersKey, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleToggleFlag = (questionNumber: number) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(questionNumber)) next.delete(questionNumber);
      else next.add(questionNumber);
      try {
        sessionStorage.setItem(sessionFlaggedKey, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // Submit to self-hosted grading API
  const handleSubmitExam = async () => {
    if (!exam || isSubmitting) return;
    setIsSubmitting(true);
    playAudioCue('correct');
    addXp(150);

    const timeSpent = exam.durationMinutes * 60 - secondsRemaining;

    try {
      const res = await fetch(`/api/exams/${exam.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: userAnswers,
          timeSpentSeconds: timeSpent,
          mode: examMode
        })
      });
      const data = await res.json();

      if (data.success && data.result) {
        const result = data.result;

        // Clear session storage on successful completion
        sessionStorage.removeItem(sessionTimerKey);
        sessionStorage.removeItem(sessionAnswersKey);
        sessionStorage.removeItem(sessionFlaggedKey);

        // Auto log any wrong questions to Error Notebook
        if (result.questions) {
          result.questions.forEach((q: { isCorrect: boolean; questionId: string; prompt: string; userAnswer: string; correctAnswer: string; explanation: string; explanationVi: string; sectionSkill: string }) => {
            if (!q.isCorrect) {
              addMistake({
                questionId: q.questionId,
                questionPrompt: q.prompt,
                userAnswer: q.userAnswer,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                explanationVi: q.explanationVi,
                skill: q.sectionSkill,
                topic: exam.title,
                category: 'comprehension'
              });
            }
          });
        }

        // Cache attempt locally for redundancy
        localStorage.setItem(`lingora_exam_result_${exam.id}`, JSON.stringify(result));
        localStorage.setItem(`lingora_exam_result_${result.id}`, JSON.stringify(result));

        // Navigate to results page with result ID
        router.push(`/results/${result.id}`);
        return;
      }
    } catch (err) {
      console.error('Server grading failed, using fallback:', err);
    } finally {
      setIsSubmitting(false);
    }

    router.push(`/results/${exam.id}`);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading || !exam) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-stone-600 dark:text-stone-300">
            Đang khởi tạo phòng thi máy tính LINGORA CBT...
          </p>
        </div>
      </div>
    );
  }

  const activeSection: ExamSection = exam.sections[activeSectionIdx] || exam.sections[0];
  const totalQuestions = exam.sections.reduce((acc, s) => acc + s.questions.length, 0);
  const answeredCount = Object.values(userAnswers).filter(val => val && val.trim() !== '').length;
  const unansweredCount = totalQuestions - answeredCount;

  // -------------------------------------------------------------
  // SCREEN 1: PRE-EXAM BRIEFING SCREEN (MOCK MODE ONLY)
  // -------------------------------------------------------------
  if (!hasStartedExam && examMode === 'mock') {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-slate-950 p-4 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-slate-800">
            <Link
              href="/mock-exams"
              className="text-xs font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại thư viện</span>
            </Link>

            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {exam.isMiniMock ? 'Mini-Mock Partial Test' : 'Standard Examination'}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
              Quy Chế Phòng Thi Máy Tính CBT (Computer-Based Test)
            </span>
            <h2 className="text-2xl font-black text-stone-900 dark:text-white mt-1">
              {exam.titleVi}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {exam.title} • {exam.level}
            </p>
          </div>

          {/* Key Examination Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/60 dark:border-slate-700">
              <span className="text-[10px] font-bold text-stone-400 uppercase block">Thời gian thi</span>
              <span className="text-base font-black text-stone-900 dark:text-white">{exam.durationMinutes} phút</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/60 dark:border-slate-700">
              <span className="text-[10px] font-bold text-stone-400 uppercase block">Số câu hỏi</span>
              <span className="text-base font-black text-stone-900 dark:text-white">{totalQuestions} câu</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/60 dark:border-slate-700">
              <span className="text-[10px] font-bold text-stone-400 uppercase block">Số phần thi</span>
              <span className="text-base font-black text-stone-900 dark:text-white">{exam.sections.length} Module</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/60 dark:border-slate-700">
              <span className="text-[10px] font-bold text-stone-400 uppercase block">Hình thức</span>
              <span className="text-base font-black text-indigo-600 dark:text-indigo-400">Strict CBT</span>
            </div>
          </div>

          {/* Strict Rules Checklist */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-2">
            <h4 className="font-extrabold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <Shield className="w-4 h-4" /> Các quy định bắt buộc trong phòng thi:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
              <li>Đồng hồ đếm ngược sẽ tự động nộp bài khi hết giờ ({exam.durationMinutes} phút).</li>
              <li>Định dạng chuẩn CBT: Giao diện chia đôi màn hình giữa đề bài và hệ thống câu hỏi tương tác.</li>
              <li>Tính năng tra cứu từ vựng và gợi ý đáp án bị khóa hoàn toàn trong chế độ thi thử.</li>
              <li>Đáp án đúng và dẫn chứng chi tiết chỉ được giải mã sau khi bạn bấm <strong>Nộp bài</strong>.</li>
            </ul>
          </div>

          {/* Start Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                setHasStartedExam(true);
                playAudioCue('click');
              }}
              className="w-full sm:flex-1 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md shadow-indigo-500/20 active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Bắt Đầu Làm Bài Thi (Start Examination)</span>
            </button>

            <button
              onClick={() => {
                setExamMode('practice');
                setHasStartedExam(true);
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300 font-bold text-xs transition"
            >
              Chuyển sang Chế độ Luyện tập
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: ACTIVE CBT EXAMINATION ROOM
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#090D16] text-stone-900 dark:text-stone-100 p-3 sm:p-5 flex flex-col justify-between">
      {/* Top CBT Navigation Bar */}
      <div className="rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="p-2 rounded-xl border border-stone-200 dark:border-slate-800 hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-500 transition"
              title="Thoát phòng thi"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  {exam.track === 'ielts' ? 'IELTS CBT' : 'HSK CBT'}
                </span>
                <span className="text-sm font-black text-stone-900 dark:text-white">
                  {exam.titleVi}
                </span>
              </div>
            </div>
          </div>

          {/* Mode Badge & Timer */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setExamMode(examMode === 'mock' ? 'practice' : 'mock')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                examMode === 'practice'
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                  : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
              }`}
            >
              {examMode === 'practice' ? 'Chế độ Luyện Tập (Practice)' : 'Chế độ Thi Thử (Timed Mock)'}
            </button>

            {/* Countdown Timer */}
            {examMode === 'mock' ? (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-mono font-black text-sm">
                <Clock className="w-4 h-4 animate-spin text-rose-500" style={{ animationDuration: '6s' }} />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-slate-800 text-stone-500 text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Không giới hạn giờ</span>
              </div>
            )}
          </div>
        </div>

        {/* Section Module Navigation Tabs */}
        <div className="flex items-center gap-2 pt-3 overflow-x-auto">
          {exam.sections.map((sec, idx) => {
            const secQuestions = sec.questions.length;
            const secAnswered = sec.questions.filter(q => userAnswers[q.number.toString()]?.trim()).length;

            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSectionIdx(idx);
                  playAudioCue('click');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition whitespace-nowrap ${
                  activeSectionIdx === idx
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                }`}
              >
                {sec.skill === 'listening' ? (
                  <Headphones className="w-3.5 h-3.5" />
                ) : sec.skill === 'reading' ? (
                  <BookOpen className="w-3.5 h-3.5" />
                ) : (
                  <PenTool className="w-3.5 h-3.5" />
                )}
                <span>{sec.titleVi}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${activeSectionIdx === idx ? 'bg-white/20' : 'bg-stone-200 dark:bg-slate-700 text-stone-600 dark:text-stone-300'}`}>
                  {secAnswered}/{secQuestions}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Body: Test Workspace (Left) + Question Palette & Submit Sidebar (Right) */}
      <div className="flex-1 flex flex-col xl:flex-row gap-5 items-start">
        {/* Main Workspace based on Active Section Skill */}
        <div className="flex-1 min-w-0 w-full">
        {/* CASE A: READING LAB WORKSPACE */}
        {activeSection.skill === 'reading' && (
          <ReadingLabWorkspace
            section={activeSection}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            isMockMode={examMode === 'mock'}
            flaggedQuestions={flaggedQuestions}
            onToggleFlag={handleToggleFlag}
          />
        )}

        {/* CASE B: WRITING LAB WORKSPACE */}
        {activeSection.skill === 'writing' && (
          exam.track === 'hsk' ? (
            <HskWritingWorkspace
              section={activeSection}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              isMockMode={examMode === 'mock'}
              flaggedQuestions={flaggedQuestions}
              onToggleFlag={handleToggleFlag}
            />
          ) : (
            <WritingLabWorkspace
              section={activeSection}
              question={activeSection.questions[0]}
              isMockMode={examMode === 'mock'}
              onWritingSubmit={(text) => handleAnswerChange(activeSection.questions[0].number, text)}
            />
          )
        )}

        {/* CASE C: LISTENING & GENERAL QUESTION WORKSPACE */}
        {activeSection.skill === 'listening' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Pane: Listening Audio Controls */}
            <div className="lg:col-span-6 space-y-4">
              <WaveformAudio
                transcript={
                  (activeSection.audioTranscript && !activeSection.audioTranscript.endsWith('...'))
                    ? activeSection.audioTranscript
                    : (activeSection.audioText || activeSection.audioTranscript || '')
                }
                audioUrl={activeSection.audioUrl}
                audioSourceType={activeSection.audioSourceType || 'tts'}
                playbackPolicy={activeSection.playbackPolicy || 'flexible'}
                isMockMode={examMode === 'mock'}
                totalDurationSeconds={activeSection.audioDurationSeconds || 140}
                title={activeSection.titleVi}
              />

              {/* CBT Rules Briefing Box */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-xs text-stone-600 dark:text-stone-300 space-y-2">
                <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 block tracking-wider">
                  Hướng Dẫn Làm Bài (CBT Simulation Directions)
                </span>
                <p className="leading-relaxed">
                  {activeSection.instructions}
                </p>
                {activeSection.instructionsVi && (
                  <p className="text-[11px] text-stone-500 italic">
                    {activeSection.instructionsVi}
                  </p>
                )}
              </div>
            </div>

            {/* Right Pane: Interactive Question Fields */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-stone-200 dark:border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                  Câu hỏi {activeSection.questions[0]?.number} - {activeSection.questions[activeSection.questions.length - 1]?.number}
                </span>
                <span className="text-xs font-bold text-stone-400">
                  {activeSection.questions.filter(q => userAnswers[q.number.toString()]?.trim()).length} / {activeSection.questions.length} đã làm
                </span>
              </div>

              <div className="space-y-4">
                {activeSection.questions.map(q => {
                  const currentVal = userAnswers[q.number.toString()] || '';
                  const isFlagged = flaggedQuestions.has(q.number);

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border transition ${
                        isFlagged
                          ? 'border-amber-400 bg-amber-50/20 dark:bg-amber-950/20'
                          : 'border-stone-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                          {q.number}
                        </span>

                        <button
                          onClick={() => handleToggleFlag(q.number)}
                          className={`p-1 rounded-md text-xs transition ${
                            isFlagged ? 'text-amber-500 font-bold' : 'text-stone-400 hover:text-stone-700'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500' : ''}`} />
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white mb-2">
                        {q.prompt}
                      </p>

                      {/* Options for MCQ */}
                      {q.options && q.options.length > 0 ? (
                        <div className={`${
                          q.options.length === 3
                            ? 'grid grid-cols-1 sm:grid-cols-3 gap-2.5'
                            : q.options.length === 2
                            ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
                            : 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
                        }`}>
                          {q.options.map(opt => {
                            const isKeySameAsText = opt.key.trim().toLowerCase() === opt.text.trim().toLowerCase();
                            const isLongKey = opt.key.length > 2;

                            return (
                              <label
                                key={opt.key}
                                className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition text-xs select-none ${
                                  currentVal === opt.key
                                    ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 font-black text-indigo-950 dark:text-white shadow-xs'
                                    : 'border-stone-200 dark:border-slate-800 hover:border-stone-400 text-stone-700 dark:text-stone-300 bg-white/50 dark:bg-slate-900/50'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`q-${q.id}`}
                                  value={opt.key}
                                  checked={currentVal === opt.key}
                                  onChange={() => handleAnswerChange(q.number, opt.key)}
                                  className="w-3.5 h-3.5 text-indigo-600 focus:ring-indigo-500 shrink-0"
                                />
                                <span className="truncate">
                                  {!isKeySameAsText && !isLongKey ? (
                                    <><strong>{opt.key}.</strong> {opt.text}</>
                                  ) : (
                                    <strong>{opt.text}</strong>
                                  )}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        /* Text Completion */
                        <input
                          type="text"
                          placeholder={q.wordLimit ? `Điền đáp án (Tối đa ${q.wordLimit} từ)...` : 'Nhập câu trả lời...'}
                          value={currentVal}
                          onChange={e => handleAnswerChange(q.number, e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 text-xs font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        </div>

        {/* RIGHT SIDEBAR: Question Palette & Submit Exam Action */}
        {isSidebarOpen ? (
          <aside className="w-full xl:w-72 2xl:w-80 shrink-0 xl:sticky xl:top-4 space-y-4">
            <QuestionPalette
              totalQuestions={totalQuestions}
              currentQuestionNumber={activeQuestionNum}
              userAnswers={userAnswers}
              flaggedQuestionNumbers={flaggedQuestions}
              onSelectQuestion={(num) => {
                setActiveQuestionNum(num);
                // Jump to section if needed
                let count = 0;
                for (let i = 0; i < exam.sections.length; i++) {
                  count += exam.sections[i].questions.length;
                  if (num <= count) {
                    setActiveSectionIdx(i);
                    break;
                  }
                }
              }}
              onToggleCollapse={() => setIsSidebarOpen(false)}
            />

            {/* Submit Exam Card */}
            <div className="rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-3.5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-stone-500">Tiến độ thi</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">
                    {answeredCount} / {totalQuestions} câu hỏi
                  </span>
                </div>

                <div className="w-full bg-stone-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((answeredCount / totalQuestions) * 100)}%` }}
                  />
                </div>

                {unansweredCount > 0 ? (
                  <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span>Còn {unansweredCount} câu chưa điền</span>
                  </div>
                ) : (
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span>Đã điền đủ {totalQuestions} câu hỏi!</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs shadow-md shadow-indigo-500/20 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Nộp Bài Thi (Submit Exam)</span>
              </button>
            </div>
          </aside>
        ) : (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed right-4 bottom-6 z-40 px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-xl flex items-center gap-2.5 text-xs font-black transition border-2 border-white dark:border-slate-800"
            title="Mở Bảng câu hỏi & Nộp bài"
          >
            <Bookmark className="w-4 h-4" />
            <span>Bảng câu hỏi ({answeredCount}/{totalQuestions})</span>
          </button>
        )}
      </div>

      {/* Unanswered / Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black text-stone-900 dark:text-white">
                  Xác nhận nộp bài thi
                </h4>
                <p className="text-xs text-stone-500">
                  {unansweredCount > 0
                    ? `Bạn vẫn còn ${unansweredCount} câu hỏi chưa trả lời!`
                    : 'Bạn đã hoàn thành đầy đủ tất cả các câu hỏi.'}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Sau khi nộp, hệ thống sẽ chốt thời gian, gửi dữ liệu lên server chấm điểm tự động và xuất báo cáo phân tích chi tiết.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-700 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
              >
                Tiếp tục làm bài
              </button>

              <button
                onClick={() => {
                  setShowSubmitConfirm(false);
                  handleSubmitExam();
                }}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-xs transition"
              >
                {isSubmitting ? 'Đang chấm điểm...' : 'Xác nhận nộp ngay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
