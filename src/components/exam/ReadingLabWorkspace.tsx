'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ExamQuestion, ExamSection, ParaphrasePair } from '@/types';
import { lookupWord, VocabLookupResult } from '@/lib/dictionaryService';
import { useLearner } from '@/context/LearnerContext';
import {
  BookOpen,
  HelpCircle,
  Bookmark,
  CheckCircle2,
  XCircle,
  Sparkles,
  Plus,
  Check,
  Columns,
  Maximize2,
  X,
  FileText,
  AlertCircle,
  Highlighter,
  Type
} from 'lucide-react';

export function getQuestionTypeTip(type?: string): string {
  switch (type) {
    case 'tfng':
      return 'Mẹo TFNG: TRUE = thông tin trong bài khẳng định rõ; FALSE = bài đọc khẳng định ngược lại hoàn toàn; NOT GIVEN = bài đọc không đề cập hoặc chỉ suy đoán không có căn cứ.';
    case 'ynng':
      return 'Mẹo YNNG: Đối chiếu quan điểm của tác giả. YES = đồng tình; NO = phản bác trực tiếp; NOT GIVEN = tác giả không đưa ra lập trường về ý này.';
    case 'matching_headings':
      return 'Mẹo Matching Headings: Đọc câu chủ đề (thường ở đầu hoặc cuối đoạn). Chú ý từ đồng nghĩa, cảnh giác bẫy từ vựng lặp lại y hệt nhưng sai nội hàm.';
    case 'matching_features':
      return 'Mẹo Matching Features: Quét tên riêng / năm / nhân vật xuất hiện trong bài đọc trước khi tiến hành đối chiếu quan điểm.';
    case 'matching_sentence_endings':
      return 'Mẹo Sentence Endings: Kiểm tra sự hòa hợp ngữ pháp (chủ - vị, thì) và đối chiếu nghĩa logic tương đương trong văn bản.';
    case 'summary_completion':
      return 'Mẹo Summary Completion: Xác định từ loại cần điền (danh/động/tính/số liệu) và tuân thủ chặt chẽ giới hạn từ (Word Limit).';
    case 'sentence_completion':
      return 'Mẹo Sentence Completion: Tìm từ khóa định vị trong bài đọc, giữ nguyên dạng từ lấy từ bài.';
    case 'table_completion':
    case 'note_completion':
      return 'Mẹo Điền Bảng / Note: Dựa vào tiêu đề các cột và hàng để định vị nhanh dòng thông tin tương ứng trong văn bản.';
    case 'short_answer':
      return 'Mẹo Trả lời ngắn: Trả lời đúng trọng tâm câu hỏi, không thêm thắt từ thừa vượt quá số lượng từ quy định.';
    default:
      return 'Mẹo làm bài: Định vị từ khóa trong bài đọc và đối chiếu bảng từ đồng nghĩa (Paraphrase) cẩn thận.';
  }
}

interface ReadingLabWorkspaceProps {
  section: ExamSection;
  userAnswers: Record<string, string>;
  onAnswerChange: (questionNumber: number, value: string) => void;
  isMockMode?: boolean;
  isSubmitted?: boolean;
  gradedQuestions?: {
    questionId: string;
    number: number;
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
    explanationVi: string;
    evidenceText?: string;
    evidenceParagraph?: string;
    paraphrasePairs?: ParaphrasePair[];
    trapNoteVi?: string;
  }[];
  flaggedQuestions?: Set<number>;
  onToggleFlag?: (questionNumber: number) => void;
}

export function ReadingLabWorkspace({
  section,
  userAnswers,
  onAnswerChange,
  isMockMode = false,
  isSubmitted = false,
  gradedQuestions = [],
  flaggedQuestions = new Set(),
  onToggleFlag
}: ReadingLabWorkspaceProps) {
  const { addFlashcard, playAudioCue } = useLearner();

  // Layout view: 'split' | 'passage_only' | 'questions_only'
  const [layoutMode, setLayoutMode] = useState<'split' | 'passage' | 'questions'>('split');
  const [activeMobileTab, setActiveMobileTab] = useState<'passage' | 'questions'>('passage');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Study4-grade Highlighting System
  const [highlights, setHighlights] = useState<Array<{ id: string; text: string; color: 'yellow' | 'teal' }>>([]);
  const [selectionToolbar, setSelectionToolbar] = useState<{ text: string; x: number; y: number } | null>(null);

  // Text selection & vocabulary popup state
  const passageContainerRef = useRef<HTMLDivElement | null>(null);
  const [vocabPopup, setVocabPopup] = useState<{
    result: VocabLookupResult;
    x: number;
    y: number;
    isSaved: boolean;
  } | null>(null);

  // Handle word selection inside the passage for Highlighting and Vocab Lookup
  const handlePassageMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setSelectionToolbar(null);
      return;
    }

    const selectedText = selection.toString().trim();
    if (selectedText.length < 2 || selectedText.length > 80) {
      setSelectionToolbar(null);
      return;
    }

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionToolbar({
        text: selectedText,
        x: Math.max(16, Math.min(window.innerWidth - 280, rect.left)),
        y: rect.bottom + window.scrollY + 6
      });
    } catch {
      setSelectionToolbar(null);
    }
  };

  const addHighlight = (color: 'yellow' | 'teal') => {
    if (!selectionToolbar) return;
    const text = selectionToolbar.text;
    playAudioCue('click');
    setHighlights(prev => [...prev.filter(h => h.text !== text), { id: Date.now().toString(), text, color }]);
    setSelectionToolbar(null);
    window.getSelection()?.removeAllRanges();
  };

  const removeHighlight = (targetText?: string) => {
    const textToRemove = targetText || selectionToolbar?.text;
    if (!textToRemove) return;
    playAudioCue('click');
    setHighlights(prev => prev.filter(h => !textToRemove.includes(h.text) && !h.text.includes(textToRemove)));
    setSelectionToolbar(null);
    window.getSelection()?.removeAllRanges();
  };

  const handleLookupVocab = () => {
    if (!selectionToolbar) return;
    const lookup = lookupWord(selectionToolbar.text);
    setVocabPopup({
      result: lookup,
      x: selectionToolbar.x,
      y: selectionToolbar.y,
      isSaved: false
    });
    setSelectionToolbar(null);
  };

  const handleSaveToFlashcards = (lookup: VocabLookupResult) => {
    if (!vocabPopup) return;
    playAudioCue('correct');
    addFlashcard({
      track: 'ielts',
      level: 'IELTS Academic Reading',
      term: lookup.word,
      phonetic: lookup.phonetic || '',
      partOfSpeech: lookup.partOfSpeech,
      meaningVi: lookup.meaningVi,
      meaningEn: lookup.meaningEn,
      exampleSentence: lookup.exampleSentence || '',
      exampleVi: lookup.contextNote || 'Được lưu từ bài đọc IELTS Reading Lab',
      category: 'academic'
    });
    setVocabPopup({ ...vocabPopup, isSaved: true });
  };

  return (
    <div className="relative">
      {/* Workspace Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-stone-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
            IELTS CBT Reading Workspace
          </span>
          <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
            {section.passageTitle || section.title}
          </h3>
        </div>

        {/* Desktop Split View & Font Controls (Study4 CBT Style) */}
        <div className="hidden md:flex items-center gap-2">
          {/* Font Size Adjuster */}
          <div className="flex items-center bg-stone-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold text-stone-600 dark:text-stone-300">
            <Type className="w-3.5 h-3.5 mx-1.5 text-stone-400" />
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-0.5 rounded-lg transition ${
                fontSize === 'sm'
                  ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-2xs font-black'
                  : 'hover:text-stone-900 dark:hover:text-white'
              }`}
              title="Cỡ chữ nhỏ"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-0.5 rounded-lg transition ${
                fontSize === 'base'
                  ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-2xs font-black'
                  : 'hover:text-stone-900 dark:hover:text-white'
              }`}
              title="Cỡ chữ chuẩn"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 rounded-lg transition ${
                fontSize === 'lg'
                  ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-2xs font-black'
                  : 'hover:text-stone-900 dark:hover:text-white'
              }`}
              title="Cỡ chữ lớn"
            >
              A+
            </button>
          </div>

          {/* Split Mode Controls */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setLayoutMode('split')}
              className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${
                layoutMode === 'split'
                  ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-2xs font-black'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Chia đôi (Split 50/50)</span>
            </button>

            <button
              onClick={() => setLayoutMode('passage')}
              className={`px-3 py-1 rounded-lg transition ${
                layoutMode === 'passage'
                  ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-2xs font-black'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Đọc bài văn (Passage)
            </button>

            <button
              onClick={() => setLayoutMode('questions')}
              className={`px-3 py-1 rounded-lg transition ${
                layoutMode === 'questions'
                  ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-2xs font-black'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Làm câu hỏi (Questions)
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden w-full rounded-xl bg-stone-100 dark:bg-slate-800 p-1 text-xs font-bold">
          <button
            onClick={() => setActiveMobileTab('passage')}
            className={`flex-1 py-1.5 rounded-lg transition ${
              activeMobileTab === 'passage'
                ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-2xs font-black'
                : 'text-stone-500'
            }`}
          >
            Văn bản đọc
          </button>
          <button
            onClick={() => setActiveMobileTab('questions')}
            className={`flex-1 py-1.5 rounded-lg transition ${
              activeMobileTab === 'questions'
                ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-2xs font-black'
                : 'text-stone-500'
            }`}
          >
            Câu hỏi ({section.questions.length})
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 min-h-[560px]">
        {/* LEFT PANE: Reading Passage */}
        <div
          ref={passageContainerRef}
          onMouseUp={handlePassageMouseUp}
          className={`rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs overflow-y-auto max-h-[750px] leading-relaxed transition-all ${
            layoutMode === 'split'
              ? 'md:col-span-6 block'
              : layoutMode === 'passage'
              ? 'md:col-span-12 block'
              : 'hidden'
          } ${activeMobileTab === 'passage' ? 'block' : 'hidden md:block'}`}
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-100 dark:border-slate-800">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Reading Passage
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Highlighter className="w-3 h-3" /> Bôi đen để Highlight
              </span>
            </div>
          </div>

          {/* Paragraph Jump Navigation Bar (Study4 Feature) */}
          {(() => {
            const paras = (section.passageText || '').split('\n\n').filter(Boolean);
            if (paras.length <= 1) return null;
            return (
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 mb-4 text-xs border-b border-stone-100 dark:border-slate-800 pb-2">
                <span className="text-[10px] uppercase font-bold text-stone-400 shrink-0">Định vị đoạn:</span>
                {paras.map((_, i) => {
                  const letter = String.fromCharCode(65 + i);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(`para-${i}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-stone-700 dark:text-stone-300 font-bold transition text-[11px]"
                    >
                      Đoạn {letter}
                    </button>
                  );
                })}
                {highlights.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setHighlights([])}
                    className="ml-auto text-[10px] font-bold text-rose-500 hover:underline shrink-0"
                  >
                    Xóa tất cả highlight ({highlights.length})
                  </button>
                )}
              </div>
            );
          })()}

          {/* Passage Content formatted by paragraphs with Highlighting */}
          <div className={`prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 space-y-4 ${
            fontSize === 'sm' ? 'text-xs sm:text-sm leading-relaxed' : fontSize === 'lg' ? 'text-base sm:text-lg leading-loose' : 'text-sm sm:text-base leading-relaxed'
          }`}>
            {(section.passageText || '')
              .split('\n\n')
              .filter(Boolean)
              .map((para, idx) => {
                const paraLetter = String.fromCharCode(65 + idx);
                // Check if paragraph already starts with Paragraph A/B...
                const hasLabel = para.startsWith('Paragraph ');

                // Highlight renderer
                const renderWithHighlights = () => {
                  if (!highlights.length) return para;
                  const sorted = [...highlights].filter(h => h.text.trim().length > 0).sort((a, b) => b.text.length - a.text.length);
                  if (!sorted.length) return para;

                  const pattern = new RegExp(`(${sorted.map(h => h.text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
                  const parts = para.split(pattern);

                  return parts.map((part, pIdx) => {
                    const matched = sorted.find(h => h.text.toLowerCase() === part.toLowerCase());
                    if (matched) {
                      return (
                        <mark
                          key={pIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeHighlight(matched.text);
                          }}
                          className={`px-1 py-0.5 rounded cursor-pointer transition select-text ${
                            matched.color === 'yellow'
                              ? 'bg-amber-200 dark:bg-amber-900/80 text-stone-900 dark:text-stone-100 font-medium'
                              : 'bg-cyan-200 dark:bg-cyan-900/80 text-stone-900 dark:text-stone-100 font-medium'
                          }`}
                          title="Bấm để xóa highlight này"
                        >
                          {part}
                        </mark>
                      );
                    }
                    return part;
                  });
                };

                return (
                  <div key={idx} id={`para-${idx}`} className="relative pl-1">
                    {!hasLabel && (
                      <span className="inline-block text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 mr-2">
                        [{paraLetter}]
                      </span>
                    )}
                    <span className="selection:bg-indigo-100 dark:selection:bg-indigo-950/80">
                      {renderWithHighlights()}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* RIGHT PANE: Questions Workspace */}
        <div
          className={`rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs overflow-y-auto max-h-[750px] transition-all space-y-6 ${
            layoutMode === 'split'
              ? 'md:col-span-6 block'
              : layoutMode === 'questions'
              ? 'md:col-span-12 block'
              : 'hidden'
          } ${activeMobileTab === 'questions' ? 'block' : 'hidden md:block'}`}
        >
          {/* Instructions Box */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200/80 dark:border-slate-800 text-xs text-stone-700 dark:text-stone-300">
            <p className="font-extrabold text-stone-900 dark:text-white mb-0.5">
              {section.instructions}
            </p>
            {section.instructionsVi && (
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {section.instructionsVi}
              </p>
            )}
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {section.questions.map(q => {
              const currentVal = userAnswers[q.number.toString()] || '';
              const isFlagged = flaggedQuestions.has(q.number);
              const graded = gradedQuestions.find(g => g.number === q.number);

              return (
                <div
                  key={q.id}
                  id={`q-${q.number}`}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                    isSubmitted && graded
                      ? graded.isCorrect
                        ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : 'border-rose-300 dark:border-rose-800/80 bg-rose-50/40 dark:bg-rose-950/20'
                      : isFlagged
                      ? 'border-amber-400/80 bg-amber-50/30 dark:bg-amber-950/20 ring-1 ring-amber-400/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] hover:border-slate-300 dark:hover:border-slate-700/80 shadow-xs'
                  }`}
                >
                  {/* Question Header & Flag button */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs shadow-indigo-500/20">
                        {q.number}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                        {q.type.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleFlag && onToggleFlag(q.number)}
                      title="Đánh dấu câu hỏi để xem lại"
                      className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isFlagged
                          ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                      <span className="text-[11px] hidden sm:inline">Review</span>
                    </button>
                  </div>

                  {/* Question Prompt */}
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
                    {q.prompt}
                  </p>
                  {q.promptVi && (
                    <div className="mt-2 border-l-2 border-indigo-500/40 pl-3 py-0.5">
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                        {q.promptVi}
                      </p>
                    </div>
                  )}

                  {/* Interactive Input Formats */}
                  {(() => {
                    const effectiveOptions = q.options && q.options.length > 0
                      ? q.options
                      : q.type === 'tfng'
                        ? [
                            { key: 'TRUE', text: 'TRUE' },
                            { key: 'FALSE', text: 'FALSE' },
                            { key: 'NOT GIVEN', text: 'NOT GIVEN' }
                          ]
                        : q.type === 'ynng'
                          ? [
                              { key: 'YES', text: 'YES' },
                              { key: 'NO', text: 'NO' },
                              { key: 'NOT GIVEN', text: 'NOT GIVEN' }
                            ]
                          : null;

                    if (effectiveOptions && effectiveOptions.length > 0) {
                      const count = effectiveOptions.length;
                      const isThreeOptions = count === 3;
                      const isMatching = q.type?.includes('matching');
                      const isSingleColumn = isMatching || count > 4;

                      // Grid layout:
                      // If 3 options (like TFNG/YNNG) -> grid-cols-1 sm:grid-cols-3 (100% balanced!)
                      // If single column -> grid-cols-1
                      // Otherwise -> grid-cols-1 sm:grid-cols-2
                      const gridClass = isThreeOptions
                        ? 'grid grid-cols-1 sm:grid-cols-3 gap-3'
                        : isSingleColumn
                        ? 'grid grid-cols-1 gap-2.5'
                        : 'grid grid-cols-1 sm:grid-cols-2 gap-3';

                      return (
                        <div className={`${gridClass} mt-4`}>
                          {effectiveOptions.map(opt => {
                            const isSelected = currentVal === opt.key;
                            const isKeySameAsText = opt.key.trim().toLowerCase() === opt.text.trim().toLowerCase();
                            const isLongKey = opt.key.length > 2;

                            return (
                              <button
                                key={opt.key}
                                disabled={isSubmitted}
                                onClick={() => onAnswerChange(q.number, opt.key)}
                                className={`group relative p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all duration-150 active:scale-[0.99] ${
                                  isSelected
                                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/70 text-indigo-950 dark:text-white font-bold ring-2 ring-indigo-500/25 shadow-xs'
                                    : 'border-slate-200/90 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {/* Only show badge if key is distinct and short (like A, B, C, D) */}
                                  {!isKeySameAsText && !isLongKey ? (
                                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 transition ${
                                      isSelected
                                        ? 'bg-indigo-600 text-white shadow-xs'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                                    }`}>
                                      {opt.key}
                                    </span>
                                  ) : (
                                    /* Radio indicator circle for TFNG/YNNG */
                                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                                      isSelected
                                        ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-600 dark:border-indigo-400'
                                        : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400'
                                    }`}>
                                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </span>
                                  )}

                                  <span className="text-xs font-bold tracking-wide leading-snug break-words">
                                    {opt.text}
                                  </span>
                                </div>

                                {isSelected && (
                                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 ml-1.5" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    }

                    /* 2. Sentence / Note / Summary / Table Completion / Short answer text input */
                    return (
                      <div className="mt-3">
                        <div className="relative">
                          <input
                            type="text"
                            disabled={isSubmitted}
                            placeholder={q.wordLimit ? `Điền câu trả lời (Tối đa ${q.wordLimit} từ)...` : 'Nhập câu trả lời...'}
                            value={currentVal}
                            onChange={e => onAnswerChange(q.number, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Submission Review & Deep Analysis */}
                  {isSubmitted && graded && (
                    <div className="mt-4 pt-3 border-t border-stone-200/80 dark:border-slate-800/80 space-y-2.5 text-xs">
                      {/* Status row */}
                      <div className="flex items-center gap-2">
                        {graded.isCorrect ? (
                          <span className="inline-flex items-center gap-1 font-black text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" /> Chính xác
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-black text-rose-600 dark:text-rose-400">
                            <XCircle className="w-4 h-4" /> Chưa chính xác
                          </span>
                        )}
                        <span className="text-stone-400">•</span>
                        <span className="text-stone-700 dark:text-stone-300 font-semibold">
                          Đáp án đúng: <strong className="text-emerald-600 dark:text-emerald-400">{graded.correctAnswer}</strong>
                        </span>
                      </div>

                      {/* Direct Evidence Quote */}
                      {graded.evidenceText && (
                        <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/40 text-[11px] text-indigo-950 dark:text-indigo-200">
                          <strong className="block text-[10px] uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-0.5">
                            Dẫn chứng bài đọc ({graded.evidenceParagraph || 'Đoạn văn'}):
                          </strong>
                          "{graded.evidenceText}"
                        </div>
                      )}

                      {/* Paraphrase Pairs Table */}
                      {graded.paraphrasePairs && graded.paraphrasePairs.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-[11px]">
                          <strong className="block text-[10px] uppercase text-stone-500 mb-1">
                            Bảng đối chiếu Paraphrase (Từ đồng nghĩa):
                          </strong>
                          {graded.paraphrasePairs.map((pair, pIdx) => (
                            <div key={pIdx} className="flex items-center justify-between py-0.5 text-stone-700 dark:text-stone-300">
                              <span className="font-semibold text-rose-600 dark:text-rose-400">"{pair.questionPhrase}"</span>
                              <span className="text-stone-400">⇔</span>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">"{pair.passagePhrase}"</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Explanation in Vietnamese */}
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-[11px]">
                        <strong>Giải thích chi tiết:</strong> {graded.explanationVi}
                      </p>

                      {/* Trap note if available */}
                      {graded.trapNoteVi && (
                        <p className="text-amber-700 dark:text-amber-400 text-[11px] font-medium bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200 dark:border-amber-900/50">
                          ⚠️ <strong>Bẫy thường gặp:</strong> {graded.trapNoteVi}
                        </p>
                      )}

                      {/* Question Type Tip */}
                      <p className="text-indigo-700 dark:text-indigo-300 text-[11px] font-medium bg-indigo-50/70 dark:bg-indigo-950/30 p-2 rounded-lg border border-indigo-200/60 dark:border-indigo-900/40">
                        💡 <strong>{getQuestionTypeTip(q.type)}</strong>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Inline Vocabulary Popup */}
      {vocabPopup && !isMockMode && (
        <div
          style={{ top: `${vocabPopup.y}px`, left: `${vocabPopup.x}px` }}
          className="absolute z-50 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 p-4 shadow-xl shadow-indigo-500/10 text-xs animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-stone-900 dark:text-white capitalize">
                  {vocabPopup.result.word}
                </span>
                <span className="text-[10px] font-bold text-stone-400 italic">
                  ({vocabPopup.result.partOfSpeech})
                </span>
              </div>
              {vocabPopup.result.phonetic && (
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                  {vocabPopup.result.phonetic}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold">
                {vocabPopup.result.phonetic || 'Academic'}
              </span>
              <button
                onClick={() => setVocabPopup(null)}
                className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-stone-800 dark:text-stone-200 font-bold mb-1">
            {vocabPopup.result.meaningVi}
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug mb-3">
            {vocabPopup.result.meaningEn}
          </p>

          {vocabPopup.result.contextNote && (
            <p className="text-[10px] text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 p-2 rounded-lg mb-3">
              {vocabPopup.result.contextNote}
            </p>
          )}

          {/* Add to Flashcards Button */}
          <button
            onClick={() => handleSaveToFlashcards(vocabPopup.result)}
            disabled={vocabPopup.isSaved}
            className={`w-full py-1.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition ${
              vocabPopup.isSaved
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
            }`}
          >
            {vocabPopup.isSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Đã lưu vào Sổ từ vựng</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Lưu vào Sổ từ vựng (Flashcard)</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Floating Selection Toolbar for Highlighting (Study4 CBT Feature) */}
      {selectionToolbar && (
        <div
          style={{ left: `${selectionToolbar.x}px`, top: `${selectionToolbar.y}px` }}
          className="fixed z-50 rounded-2xl bg-stone-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white p-1.5 shadow-xl flex items-center gap-1 text-xs border border-stone-700/80 animate-in fade-in zoom-in-95 duration-150"
        >
          <button
            type="button"
            onClick={() => addHighlight('yellow')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-stone-800 dark:hover:bg-slate-700 transition font-bold"
            title="Highlight Vàng"
          >
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-xs" />
            <span className="text-[11px]">Tô Vàng</span>
          </button>

          <button
            type="button"
            onClick={() => addHighlight('teal')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-stone-800 dark:hover:bg-slate-700 transition font-bold"
            title="Highlight Xanh"
          >
            <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block shadow-xs" />
            <span className="text-[11px]">Tô Xanh</span>
          </button>

          <button
            type="button"
            onClick={() => removeHighlight()}
            className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-rose-400 transition"
            title="Xóa highlight"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {!isMockMode && (
            <>
              <div className="w-[1px] h-4 bg-stone-700 mx-0.5" />
              <button
                type="button"
                onClick={handleLookupVocab}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition text-[11px]"
              >
                <BookOpen className="w-3 h-3" />
                <span>Tra từ</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
