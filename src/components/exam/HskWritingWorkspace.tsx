'use client';

import React, { useState, useEffect } from 'react';
import { ExamSection, ExamQuestion } from '@/types';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  Sparkles,
  PenTool,
  Check
} from 'lucide-react';

interface HskWritingWorkspaceProps {
  section: ExamSection;
  userAnswers: Record<string, string>;
  onAnswerChange: (questionNumber: number, value: string) => void;
  isMockMode?: boolean;
  flaggedQuestions?: Set<number>;
  onToggleFlag?: (questionNumber: number) => void;
}

export function HskWritingWorkspace({
  section,
  userAnswers,
  onAnswerChange,
  isMockMode = false,
  flaggedQuestions = new Set(),
  onToggleFlag
}: HskWritingWorkspaceProps) {
  // Store per-question active tokens state: assembled vs remaining
  const [questionTokens, setQuestionTokens] = useState<Record<number, { assembled: string[]; remaining: string[] }>>({});
  const [practiceChecks, setPracticeChecks] = useState<Record<number, boolean>>({});

  // Initialize tokens from question definition and existing answers
  useEffect(() => {
    const initial: Record<number, { assembled: string[]; remaining: string[] }> = {};

    section.questions.forEach(q => {
      const currentAns = userAnswers[q.number.toString()] || '';
      const defaultTokens = q.reorderTokens || (q.prompt.includes(':') ? q.prompt.split(':')[1]?.trim().split(/\s+/) : []);

      if (currentAns.trim()) {
        const assembled = currentAns.split(/\s+/).filter(Boolean);
        // Remaining tokens are those in defaultTokens not in assembled
        const remaining = [...defaultTokens];
        assembled.forEach(tok => {
          const idx = remaining.indexOf(tok);
          if (idx !== -1) remaining.splice(idx, 1);
        });
        initial[q.number] = { assembled, remaining };
      } else {
        initial[q.number] = {
          assembled: [],
          remaining: [...defaultTokens]
        };
      }
    });

    setQuestionTokens(initial);
  }, [section.questions]);

  const handlePickToken = (questionNumber: number, token: string, tokenIndex: number) => {
    setQuestionTokens(prev => {
      const current = prev[questionNumber] || { assembled: [], remaining: [] };
      const nextRemaining = current.remaining.filter((_, i) => i !== tokenIndex);
      const nextAssembled = [...current.assembled, token];

      // Update answer
      onAnswerChange(questionNumber, nextAssembled.join(' '));

      return {
        ...prev,
        [questionNumber]: {
          assembled: nextAssembled,
          remaining: nextRemaining
        }
      };
    });
  };

  const handleRemoveToken = (questionNumber: number, token: string, tokenIndex: number) => {
    setQuestionTokens(prev => {
      const current = prev[questionNumber] || { assembled: [], remaining: [] };
      const nextAssembled = current.assembled.filter((_, i) => i !== tokenIndex);
      const nextRemaining = [...current.remaining, token];

      // Update answer
      onAnswerChange(questionNumber, nextAssembled.join(' '));

      return {
        ...prev,
        [questionNumber]: {
          assembled: nextAssembled,
          remaining: nextRemaining
        }
      };
    });
  };

  const handleReset = (questionNumber: number, defaultTokens: string[]) => {
    setQuestionTokens(prev => ({
      ...prev,
      [questionNumber]: {
        assembled: [],
        remaining: [...defaultTokens]
      }
    }));
    onAnswerChange(questionNumber, '');
    setPracticeChecks(prev => ({ ...prev, [questionNumber]: false }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#EBE5DA] dark:border-[#262D38] bg-white dark:bg-[#1A202C] p-5 shadow-xs">
        <span className="text-[10px] font-black uppercase text-teal-800 dark:text-teal-400 tracking-wider">
          PHẦN THI VIẾT & SẮP XẾP CÂU (HSK WRITING)
        </span>
        <h3 className="text-lg font-black text-[#1C1917] dark:text-white  mt-0.5">
          {section.titleVi || section.title}
        </h3>
        <p className="text-xs text-[#57534E] dark:text-[#94A3B8] mt-1 leading-relaxed">
          {section.instructionsVi || section.instructions || 'Sắp xếp các từ thành câu đúng ngữ pháp tiếng Trung.'}
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {section.questions.map(q => {
          const currentTokenState = questionTokens[q.number] || {
            assembled: [],
            remaining: q.reorderTokens || []
          };
          const isFlagged = flaggedQuestions.has(q.number);
          const hasChecked = practiceChecks[q.number];
          const userVal = userAnswers[q.number.toString()] || '';
          
          // Check correctness for practice mode
          const cleanUser = userVal.replace(/\s+/g, '');
          const cleanCorrect = (q.correctAnswer || '').replace(/\s+/g, '');
          const isCorrect = cleanUser === cleanCorrect || (q.acceptedAnswers && q.acceptedAnswers.some(a => a.replace(/\s+/g, '') === cleanUser));

          return (
            <div
              key={q.id}
              className={`p-6 rounded-3xl bg-white dark:bg-[#1A202C] border transition shadow-xs space-y-4 ${
                isFlagged
                  ? 'border-amber-400 ring-2 ring-amber-400/20'
                  : 'border-[#EBE5DA] dark:border-[#262D38]'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {q.number}
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-[#1C1917] dark:text-white ">
                      {q.prompt}
                    </h4>
                    {q.promptVi && (
                      <p className="text-xs text-[#78716C] dark:text-[#94A3B8] mt-0.5">
                        {q.promptVi}
                      </p>
                    )}
                  </div>
                </div>

                {onToggleFlag && (
                  <button
                    onClick={() => onToggleFlag(q.number)}
                    className={`p-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 ${
                      isFlagged
                        ? 'border-amber-300 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        : 'border-[#EBE5DA] dark:border-[#262D38] text-[#78716C] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500' : ''}`} />
                    <span className="hidden sm:inline">Xem lại</span>
                  </button>
                )}
              </div>

              {/* Drop / Assembled sentence zone */}
              <div className="min-h-[72px] p-4 rounded-2xl border-2 border-dashed border-teal-300 dark:border-teal-800 bg-teal-50/30 dark:bg-teal-950/20 flex flex-wrap items-center gap-2">
                {currentTokenState.assembled.length === 0 ? (
                  <span className="text-xs font-medium text-[#A8A29E] italic">
                    Chạm vào các mảnh ghép từ bên dưới để ghép thành câu vào đây...
                  </span>
                ) : (
                  currentTokenState.assembled.map((tok, idx) => (
                    <span
                      key={idx}
                      onClick={() => handleRemoveToken(q.number, tok, idx)}
                      className="cursor-pointer px-3.5 py-2 rounded-xl bg-teal-800 text-white font-bold text-sm shadow-xs hover:bg-teal-900 active:scale-95 transition"
                    >
                      {tok}
                    </span>
                  ))
                )}
              </div>

              {/* Available Tokens to Pick */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {currentTokenState.remaining.map((tok, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePickToken(q.number, tok, idx)}
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#242C38] border border-[#EBE5DA] dark:border-[#2D3748] hover:border-teal-600 text-sm font-bold text-[#1C1917] dark:text-[#E2E8F0] shadow-xs active:scale-95 transition"
                  >
                    {tok}
                  </button>
                ))}
              </div>

              {/* Reset & Practice Check Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE1] dark:border-[#242C38]">
                <button
                  onClick={() => handleReset(q.number, q.reorderTokens || [])}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EBE5DA] dark:border-[#2D3748] text-xs font-bold text-[#57534E] hover:bg-[#F5F2EB] transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Xếp lại</span>
                </button>

                {!isMockMode && currentTokenState.assembled.length > 0 && (
                  <button
                    onClick={() => setPracticeChecks(prev => ({ ...prev, [q.number]: true }))}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-xs transition"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Kiểm tra câu này</span>
                  </button>
                )}
              </div>

              {/* Practice Feedback Box */}
              {!isMockMode && hasChecked && (
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
                }`}>
                  <p className="font-bold flex items-center gap-1.5">
                    {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                    <span>{isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}</span>
                  </p>
                  <p>Đáp án đúng: <span className="font-bold ">{q.correctAnswer}</span></p>
                  {q.explanationVi && (
                    <p className="text-[11px] opacity-90">{q.explanationVi}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
