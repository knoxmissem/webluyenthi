'use client';

import React, { useState, useMemo } from 'react';
import {
  FileText,
  Sparkles,
  Info,
  Type,
  BookOpen,
  User,
  MessageSquare,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface WaveformAudioProps {
  transcript: string;
  audioUrl?: string;
  audioSourceType?: 'recorded' | 'tts' | 'none';
  playbackPolicy?: 'single_pass' | 'flexible';
  isMockMode?: boolean;
  totalDurationSeconds?: number;
  audioDurationSeconds?: number;
  title?: string;
  onAudioComplete?: () => void;
}

interface DialogueTurn {
  speaker: string;
  speakerType: 'male' | 'female' | 'narrator' | 'other';
  speakerLabelVi: string;
  text: string;
}

export function WaveformAudio({
  transcript,
  totalDurationSeconds = 120,
  audioDurationSeconds,
  title = 'Kịch Bản Lời Thoại & Ngữ Cảnh Bài Thi',
  isMockMode = false
}: WaveformAudioProps) {
  const effectiveDuration = audioDurationSeconds || totalDurationSeconds || 120;
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Parse lines to detect structured dialogue (e.g., 男：, 女：, Speaker:, etc.)
  const parsedTurns = useMemo<DialogueTurn[]>(() => {
    if (!transcript) return [];

    const lines = transcript.split('\n').map(l => l.trim()).filter(Boolean);
    const turns: DialogueTurn[] = [];

    for (const line of lines) {
      if (line.startsWith('男：') || line.startsWith('男:')) {
        turns.push({
          speaker: '男',
          speakerType: 'male',
          speakerLabelVi: 'Người Nam (Male Speaker)',
          text: line.replace(/^男[：:]\s*/, '')
        });
      } else if (line.startsWith('女：') || line.startsWith('女:')) {
        turns.push({
          speaker: '女',
          speakerType: 'female',
          speakerLabelVi: 'Người Nữ (Female Speaker)',
          text: line.replace(/^女[：:]\s*/, '')
        });
      } else if (line.startsWith('问：') || line.startsWith('问:')) {
        turns.push({
          speaker: '问',
          speakerType: 'narrator',
          speakerLabelVi: 'Câu Hỏi Tình Huống (Question)',
          text: line.replace(/^问[：:]\s*/, '')
        });
      } else if (line.includes(':')) {
        const [speakerPart, ...rest] = line.split(':');
        const text = rest.join(':').trim();
        turns.push({
          speaker: speakerPart.trim(),
          speakerType: 'other',
          speakerLabelVi: speakerPart.trim(),
          text
        });
      } else {
        // Plain narrative paragraph
        turns.push({
          speaker: '',
          speakerType: 'narrator',
          speakerLabelVi: '',
          text: line
        });
      }
    }

    return turns;
  }, [transcript]);

  const wordCount = useMemo(() => {
    if (!transcript) return 0;
    // Count both English words and Chinese characters
    const hanziCount = (transcript.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = transcript.replace(/[\u4e00-\u9fa5]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    return hanziCount + englishWords;
  }, [transcript]);

  const fontSizeClasses = {
    sm: 'text-xs leading-relaxed',
    base: 'text-sm leading-relaxed',
    lg: 'text-base leading-loose'
  };

  return (
    <div className="rounded-3xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
      {/* Top Banner Header */}
      <div className="p-4 sm:p-5 border-b border-[#ECE7DE] dark:border-slate-800 bg-gradient-to-r from-teal-50/60 via-white to-indigo-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-900">
                <BookOpen className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                Mô Phỏng Văn Bản (Non-Audio CBT)
              </span>
              <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400">
                ~{wordCount} từ/ký tự • {Math.max(1, Math.ceil(effectiveDuration / 60))} phút đọc
              </span>
            </div>

            <h4 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
              <span>{title}</span>
            </h4>
          </div>

          {/* Controls: Font Size & Collapse */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Font Size Selector */}
            <div className="flex items-center bg-stone-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold text-stone-600 dark:text-stone-300">
              <Type className="w-3.5 h-3.5 mx-1.5 text-stone-400" />
              <button
                type="button"
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
                type="button"
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
                type="button"
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

            {/* Collapse / Expand Toggle */}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-xl border border-stone-200 dark:border-slate-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition"
              title={isCollapsed ? 'Mở rộng kịch bản' : 'Thu gọn kịch bản'}
            >
              {isCollapsed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Guide Briefing Box */}
      <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/20 border-b border-amber-200/60 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Chế độ mô phỏng văn bản CBT:</strong> Bạn hãy đọc kỹ kịch bản hội thoại hoặc bài nói bên dưới để phân tích thông tin, định vị từ khóa và trả lời hệ thống câu hỏi tương ứng ở bảng bên phải.
        </p>
      </div>

      {/* Script & Dialogue Body */}
      {!isCollapsed ? (
        <div className="p-5 space-y-4 max-h-[600px] overflow-y-auto">
          {parsedTurns.length > 0 ? (
            parsedTurns.map((turn, idx) => {
              // Dialogue turn with specific speaker
              if (turn.speaker) {
                const isMale = turn.speakerType === 'male';
                const isFemale = turn.speakerType === 'female';
                const isNarrator = turn.speakerType === 'narrator';

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isMale
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/70 dark:border-blue-900/40'
                        : isFemale
                        ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/70 dark:border-rose-900/40'
                        : isNarrator
                        ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/70 dark:border-amber-900/40 font-semibold'
                        : 'bg-stone-50/60 dark:bg-slate-800/40 border-stone-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                          isMale
                            ? 'bg-blue-600 text-white'
                            : isFemale
                            ? 'bg-rose-600 text-white'
                            : isNarrator
                            ? 'bg-amber-600 text-white'
                            : 'bg-stone-600 text-white'
                        }`}
                      >
                        {turn.speaker.slice(0, 1)}
                      </span>
                      <span className="text-xs font-black uppercase tracking-wide text-stone-700 dark:text-stone-300">
                        {turn.speakerLabelVi || turn.speaker}
                      </span>
                    </div>

                    <p className={`text-stone-800 dark:text-stone-100 ${fontSizeClasses[fontSize]}`}>
                      {turn.text}
                    </p>
                  </div>
                );
              }

              // Narrative paragraph
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl bg-stone-50/50 dark:bg-slate-800/30 border border-stone-200/70 dark:border-slate-800 text-stone-800 dark:text-stone-100 ${fontSizeClasses[fontSize]}`}
                >
                  <p>{turn.text}</p>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-stone-400 italic">
              Không có kịch bản văn bản cho phần thi này.
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 text-center">
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            Nhấn để mở kịch bản hội thoại
          </button>
        </div>
      )}
    </div>
  );
}
