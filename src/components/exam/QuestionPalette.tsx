'use client';

import React from 'react';
import { Bookmark, Check } from 'lucide-react';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentQuestionNumber: number;
  userAnswers: Record<string | number, string>;
  flaggedQuestionNumbers?: Set<number>;
  onSelectQuestion: (num: number) => void;
  onToggleCollapse?: () => void;
  className?: string;
}

export function QuestionPalette({
  totalQuestions,
  currentQuestionNumber,
  userAnswers,
  flaggedQuestionNumbers = new Set(),
  onSelectQuestion,
  onToggleCollapse,
  className = ''
}: QuestionPaletteProps) {
  const numbers = Array.from({ length: totalQuestions }, (_, i) => i + 1);
  const answeredCount = Object.entries(userAnswers).filter(([_, val]) => val && val.trim() !== '').length;

  return (
    <div className={`rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs ${className}`}>
      {/* Header & Legend */}
      <div className="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="uppercase tracking-wider text-[11px] font-black text-stone-800 dark:text-stone-200">
            Bảng Câu Hỏi
          </span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-extrabold text-[11px]">
            ({answeredCount}/{totalQuestions})
          </span>
        </div>

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs transition"
            title="Thu gọn bảng câu hỏi"
          >
            Thu gọn ➔
          </button>
        )}
      </div>

      {/* Grid of question buttons (5 columns optimized for sidebar) */}
      <div className="grid grid-cols-5 gap-1.5 max-h-[340px] overflow-y-auto pr-1">
        {numbers.map((num) => {
          const isAnswered = !!userAnswers[num.toString()] && userAnswers[num.toString()].trim() !== '';
          const isFlagged = flaggedQuestionNumbers.has(num);
          const isActive = num === currentQuestionNumber;

          return (
            <button
              key={num}
              onClick={() => onSelectQuestion(num)}
              title={`Câu ${num}: ${isAnswered ? 'Đã trả lời' : 'Chưa trả lời'}${isFlagged ? ' (Đang gắn cờ xem lại)' : ''}`}
              className={`relative h-9 rounded-xl font-mono text-xs font-black transition-all active:scale-95 flex items-center justify-center ${
                isActive
                  ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 bg-indigo-600 text-white shadow-xs'
                  : isFlagged
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
                  : isAnswered
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-2xs'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-700'
              }`}
            >
              {num}

              {/* Flag marker dot */}
              {isFlagged && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-1 ring-white dark:ring-slate-900" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend Footer */}
      <div className="mt-3 pt-3 border-t border-stone-100 dark:border-slate-800 grid grid-cols-2 gap-x-2 gap-y-1.5 text-[10px] text-stone-500 dark:text-stone-400 font-bold">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0 inline-block" />
          <span>Đã trả lời</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-slate-700 shrink-0 inline-block" />
          <span>Chưa làm</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 inline-block" />
          <span>Đánh dấu</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full ring-2 ring-indigo-500 shrink-0 inline-block" />
          <span>Đang chọn</span>
        </span>
      </div>
    </div>
  );
}
