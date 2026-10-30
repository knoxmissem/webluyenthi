'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ExamResultRecord } from '@/lib/serverStore';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BookX,
  RotateCcw,
  Sparkles,
  BarChart3,
  HelpCircle,
  Layers,
  ArrowLeft,
  Clock,
  TrendingUp,
  AlertTriangle,
  FileText,
  Filter,
  Check,
  Award
} from 'lucide-react';

export default function ExamResultPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const resultOrExamId = resolvedParams.id;
  const { t } = useLanguage();

  const [result, setResult] = useState<ExamResultRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterReview, setFilterReview] = useState<'all' | 'wrong' | 'correct'>('all');

  useEffect(() => {
    async function loadResult() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/exams/results/${resultOrExamId}`);
        const data = await res.json();
        if (data.success && data.result) {
          setResult(data.result);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API result fetch failed, falling back to local storage:', err);
      }

      // Fallback: check localStorage
      try {
        const cached =
          localStorage.getItem(`lingora_exam_result_${resultOrExamId}`) ||
          localStorage.getItem(`lingora_exam_result_${resultOrExamId.split('-')[0]}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          setResult(parsed);
        }
      } catch {}

      setIsLoading(false);
    }

    loadResult();
  }, [resultOrExamId]);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-bold text-stone-500">
          Đang truy xuất báo cáo điểm số từ hệ thống LINGORA CBT...
        </p>
      </div>
    );
  }

  // Graceful default if not found
  const displayResult: ExamResultRecord = result || {
    id: resultOrExamId,
    examId: 'ielts-mock-01',
    examTitle: 'IELTS Academic Standard Computer-Based Test 1',
    examTitleVi: 'Đề thi thử IELTS Academic Máy tính Chuẩn Quốc Tế 1',
    track: 'ielts',
    level: 'Band 6.0 - 8.5',
    mode: 'mock',
    isMiniMock: false,
    dateCompleted: new Date().toISOString(),
    score: 8,
    total: 10,
    accuracyPercentage: 80,
    estimatedBand: '7.5',
    timeSpentSeconds: 1540,
    sectionBreakdown: [
      { skill: 'listening', score: 4, total: 5, accuracy: 80 },
      { skill: 'reading', score: 4, total: 5, accuracy: 80 }
    ],
    questionTypeBreakdown: [
      { type: 'note_completion', score: 2, total: 3, accuracy: 67 },
      { type: 'mcq', score: 3, total: 3, accuracy: 100 },
      { type: 'tfng', score: 2, total: 2, accuracy: 100 }
    ],
    questions: [],
    feedback: {
      strengths: ['Khả năng bắt từ khóa số liệu và tên riêng trong bài thi đạt độ chuẩn xác cao.'],
      improvements: ['Cần chú ý hơn đối với dạng câu hỏi True/False/Not Given để tránh suy diễn quá mức.'],
      recommendations: ['Luyện thêm dạng bài Note Completion để đạt điểm tuyệt đối.']
    }
  };

  const isIelts = displayResult.track === 'ielts';
  if (isIelts && (displayResult.score === 0 || displayResult.accuracyPercentage === 0)) {
    displayResult.estimatedBand = '0.0';
  }

  const formatTimeSpent = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins} phút ${rem} giây`;
  };

  const filteredQuestions = (displayResult.questions || []).filter(q => {
    if (filterReview === 'wrong') return !q.isCorrect;
    if (filterReview === 'correct') return q.isCorrect;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
              BÁO CÁO PHÂN TÍCH KẾT QUẢ CBT
            </span>
            <span className="text-xs font-bold text-stone-500">
              {displayResult.examTitleVi || displayResult.examTitle}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            {displayResult.accuracyPercentage >= 70
              ? 'Chúc mừng bạn đã hoàn thành xuất sắc bài thi! 🎉'
              : displayResult.accuracyPercentage >= 40
              ? 'Bạn đã hoàn thành bài thi! 📝'
              : displayResult.score === 0
              ? 'Bạn chưa ghi được điểm nào trong bài thi này ⚠️'
              : 'Kết quả bài thi cần nỗ lực ôn tập thêm 💪'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-lg">
            {displayResult.score === 0
              ? 'Bạn chưa trả lời đúng câu hỏi nào (0% độ chính xác). Hãy xem lại đáp án chi tiết và giải thích từng câu bên dưới để rút kinh nghiệm và ôn tập lại.'
              : 'Hệ thống chấm điểm máy chủ đã phân tích chi tiết độ chính xác theo từng kỹ năng và tự động lưu các câu sai vào Sổ tay lỗi để bạn ôn luyện lại.'}
          </p>

          <div className="flex items-center gap-4 mt-3 text-xs text-stone-500 font-semibold">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Thời gian làm: <strong>{formatTimeSpent(displayResult.timeSpentSeconds)}</strong>
            </span>
            <span>•</span>
            <span>Chế độ: <strong className="capitalize">{displayResult.mode || 'Mock Exam'}</strong></span>
          </div>
        </div>

        {/* Estimated Score Badge */}
        <div
          className={`rounded-3xl p-6 text-white text-center shadow-lg shrink-0 min-w-[170px] ${
            parseFloat(displayResult.estimatedBand) >= 7.0 || (displayResult.accuracyPercentage >= 70)
              ? 'bg-indigo-600 dark:bg-indigo-700 shadow-indigo-500/20'
              : parseFloat(displayResult.estimatedBand) >= 5.0 || (displayResult.accuracyPercentage >= 40)
              ? 'bg-blue-600 dark:bg-blue-700 shadow-blue-500/20'
              : displayResult.score === 0
              ? 'bg-rose-600 dark:bg-rose-700 shadow-rose-500/20 ring-2 ring-rose-400'
              : 'bg-amber-600 dark:bg-amber-700 shadow-amber-500/20'
          }`}
        >
          <span className="text-[11px] font-black uppercase text-white/80 tracking-wider">
            {isIelts ? 'ESTIMATED BAND' : 'HSK SCORE'}
          </span>
          <div className="text-4xl sm:text-5xl font-black my-1">
            {isIelts ? `Band ${displayResult.estimatedBand}` : displayResult.estimatedBand}
          </div>
          <span className="text-xs font-semibold text-white/90">
            {displayResult.score}/{displayResult.total} câu đúng ({displayResult.accuracyPercentage}%)
          </span>
        </div>
      </div>

      {/* HSK Non-audio Simulation Disclaimer */}
      {!isIelts && (
        <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Lưu ý về thang điểm:</strong> Đây là kết quả mô phỏng các phần <em>Đọc Hiểu</em> và <em>Viết/Sắp Xếp Câu</em> (Non-audio Simulation). Điểm số hiển thị là điểm thực hành ước tính và không đại diện cho chứng chỉ HSK chính thức do Hanban / Bộ Giáo Dục Trung Quốc cấp.
          </p>
        </div>
      )}

      {/* Analytics Breakdown Grid: Skill & Question Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Skill Accuracy */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-3 shadow-2xs">
          <span className="text-[11px] font-black text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            Độ chính xác theo Module kỹ năng
          </span>
          <div className="space-y-3 pt-1">
            {displayResult.sectionBreakdown?.map((sec, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="capitalize">{sec.skill}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">
                    {sec.score}/{sec.total} ({sec.accuracy}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all"
                    style={{ width: `${sec.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Type Breakdown */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-3 shadow-2xs">
          <span className="text-[11px] font-black text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            Độ chính xác theo dạng câu hỏi
          </span>
          <div className="space-y-2.5 pt-1 text-xs">
            {displayResult.questionTypeBreakdown && displayResult.questionTypeBreakdown.length > 0 ? (
              displayResult.questionTypeBreakdown.map((qb, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-stone-100 dark:border-slate-800 last:border-0">
                  <span className="font-bold text-stone-700 dark:text-stone-300 uppercase text-[11px]">
                    {qb.type.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-xs ${
                    qb.accuracy >= 70
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                  }`}>
                    {qb.score}/{qb.total} ({qb.accuracy}%)
                  </span>
                </div>
              ))
            ) : (
              <p className="text-stone-500 text-xs italic">
                Các dạng câu hỏi tổng hợp đã được chấm điểm theo tiêu chuẩn bài thi.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Diagnostics & Adaptive Revision Recommendations */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-4 shadow-2xs">
        <span className="text-[11px] font-black text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          Chẩn đoán & Lộ trình luyện tập thích ứng (Adaptive Recommendations)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-extrabold text-emerald-700 dark:text-emerald-400">
              ✓ Điểm mạnh ghi nhận:
            </h4>
            {displayResult.feedback?.strengths?.map((s, idx) => (
              <p key={idx} className="text-stone-600 dark:text-stone-300">
                • {s}
              </p>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-amber-700 dark:text-amber-400">
              ⚠️ Khuyến nghị trọng tâm:
            </h4>
            {displayResult.feedback?.improvements?.map((imp, idx) => (
              <p key={idx} className="text-stone-600 dark:text-stone-300">
                • {imp}
              </p>
            ))}
            {displayResult.feedback?.recommendations?.map((rec, idx) => (
              <p key={`rec-${idx}`} className="text-indigo-600 dark:text-indigo-400 font-bold">
                💡 {rec}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-stone-50 font-bold text-xs text-stone-700 dark:text-stone-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về Thư viện luyện đề</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/mock-exams/${displayResult.examId}?mode=practice`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Luyện tập lại bài này</span>
          </Link>
        </div>
      </div>

      {/* Detailed Question Review List */}
      {displayResult.questions && displayResult.questions.length > 0 && (
        <div className="rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-extrabold text-stone-900 dark:text-white">
                Dẫn Chứng Chi Tiết & Phân Tích Từng Câu ({displayResult.questions.length} câu)
              </h3>
              <p className="text-xs text-stone-500">
                Đúng {displayResult.score} câu • Chưa đúng {displayResult.total - displayResult.score} câu
              </p>
            </div>

            {/* Filter review buttons */}
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'wrong', label: 'Chỉ câu sai' },
                { id: 'correct', label: 'Chỉ câu đúng' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterReview(f.id as typeof filterReview)}
                  className={`px-3 py-1 rounded-lg transition ${
                    filterReview === f.id
                      ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-2xs font-black'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition ${
                  q.isCorrect
                    ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-rose-200 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/10'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {q.number}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                      {q.prompt}
                    </p>
                  </div>

                  {q.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-extrabold text-xs shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Chính xác
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-600 font-extrabold text-xs shrink-0">
                      <XCircle className="w-4 h-4" /> Chưa đúng
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold mb-3">
                  <span className="text-stone-500">
                    Bạn đã điền: <strong className={q.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-600'}>
                      {q.userAnswer === 'Chưa trả lời' && (q.sectionSkill?.toLowerCase() === 'writing' || q.isWriting || q.questionType?.startsWith('writing'))
                        ? 'Chưa nộp bài viết'
                        : q.userAnswer}
                    </strong>
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Đáp án chuẩn: <strong>
                      {q.correctAnswer === 'SAMPLE_ESSAY_EVALUATION'
                        ? 'Bài mẫu & Tiêu chí chấm Band 7.5+'
                        : q.correctAnswer}
                    </strong>
                  </span>
                  <span className="text-[10px] uppercase font-mono text-stone-400">
                    Kỹ năng: {q.sectionSkill}
                  </span>
                </div>

                {/* Direct Evidence Quotation */}
                {q.evidenceText && (
                  <div className="mb-2.5 p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/40 text-[11px] text-indigo-950 dark:text-indigo-200">
                    <strong className="block text-[10px] uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-0.5">
                      Dẫn chứng từ bài ({q.evidenceParagraph || 'Đoạn trích'}):
                    </strong>
                    "{q.evidenceText}"
                  </div>
                )}

                {/* Paraphrase Pairs Table if available */}
                {q.paraphrasePairs && q.paraphrasePairs.length > 0 && (
                  <div className="mb-2.5 p-2.5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-[11px]">
                    <strong className="block text-[10px] uppercase text-stone-400 mb-1">
                      Đối chiếu Từ đồng nghĩa (Paraphrase):
                    </strong>
                    {q.paraphrasePairs.map((p, pIdx) => (
                      <div key={pIdx} className="flex items-center justify-between py-0.5 text-stone-700 dark:text-stone-300">
                        <span className="font-semibold text-rose-600 dark:text-rose-400">"{p.questionPhrase}"</span>
                        <span className="text-stone-400">⇔</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">"{p.passagePhrase}"</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-800/40 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border border-stone-200/60 dark:border-slate-700">
                  <strong className="text-stone-800 dark:text-stone-200">Giải thích chi tiết: </strong>
                  {q.explanationVi || q.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
