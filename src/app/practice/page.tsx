'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import { HskLabWorkspace } from '@/components/hsk/HskLabWorkspace';
import {
  BookOpen,
  Headphones,
  PenTool,
  Clock,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  Layers,
  Award,
  Zap,
  Play,
  HelpCircle,
  FileText,
  AlertCircle,
  RotateCcw,
  Check,
  ChevronRight
} from 'lucide-react';

interface ExerciseCardItem {
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

export default function PracticeLibraryPage() {
  const { addXp, playAudioCue } = useLearner();
  const { t } = useLanguage();

  const [activeTrack, setActiveTrack] = useState<'all' | 'ielts' | 'hsk'>('all');
  const [activeSkill, setActiveSkill] = useState<'all' | 'listening' | 'reading' | 'writing' | 'collocation'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'foundation' | 'advanced'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [readingFormat, setReadingFormat] = useState<'all' | 'academic' | 'general'>('all');
  const [readingPassage, setReadingPassage] = useState<'all' | '1' | '2' | '3'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exercises, setExercises] = useState<ExerciseCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Collocation module state (preserved from existing features)
  const [clozeIndex, setClozeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [clozeScore, setClozeScore] = useState(0);

  const clozeQuestions = [
    {
      id: 'cloze-1',
      sentenceBefore: 'Rapid deforestation poses a severe ',
      blankTarget: 'threat',
      sentenceAfter: ' to the survival of endangered species.',
      sentenceVi: 'Nạn phá rừng nhanh chóng gây ra mối đe dọa nghiêm trọng đối với sự sống còn của các loài.',
      options: ['threat', 'danger', 'hazard', 'trouble'],
      correctOption: 'threat',
      explanation: 'Collocation học thuật chuẩn: "pose a severe threat to" (gây ra mối đe dọa nghiêm trọng).',
      bandAnalysis: 'Band 7.5+ Lexical Resource: Thay thế hoàn hảo cho cụm từ thông thường "is very dangerous for".'
    },
    {
      id: 'cloze-2',
      sentenceBefore: 'Early childhood education plays a pivotal ',
      blankTarget: 'role',
      sentenceAfter: ' in shaping cognitive abilities.',
      sentenceVi: 'Giáo dục mầm non đóng một vai trò then chốt trong việc hình thành năng lực nhận thức.',
      options: ['role', 'part', 'action', 'point'],
      correctOption: 'role',
      explanation: 'Collocation kinh điển: "play a pivotal role in" (đóng vai trò then chốt).',
      bandAnalysis: 'Band 8.0 Lexical Resource: Cụm từ đắt giá nhấn mạnh vai trò cốt tử.'
    },
    {
      id: 'cloze-3',
      sentenceBefore: 'Government subsidies can help bridge the ',
      blankTarget: 'gap',
      sentenceAfter: ' between affluent and disadvantaged students.',
      sentenceVi: 'Các khoản trợ cấp giúp thu hẹp khoảng cách giàu nghèo trong giáo dục.',
      options: ['gap', 'distance', 'space', 'divide'],
      correctOption: 'gap',
      explanation: 'Collocation vàng: "bridge the gap between" (thu hẹp khoảng cách).',
      bandAnalysis: 'Band 8.0: Nâng cấp vượt bậc so với câu mộc mạc "make rich and poor more equal".'
    }
  ];

  // Fetch exercises from API
  useEffect(() => {
    async function loadLibrary() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeTrack !== 'all') params.set('track', activeTrack);
        if (activeSkill !== 'all' && activeSkill !== 'collocation') params.set('skill', activeSkill);
        if (filterType !== 'all') params.set('questionType', filterType);
        if (readingFormat !== 'all') params.set('type', readingFormat);
        if (searchQuery) params.set('search', searchQuery);

        const res = await fetch(`/api/exams?${params.toString()}`);
        const data = await res.json();
        if (data.success && data.data) {
          setExercises(data.data);
        }
      } catch (err) {
        console.error('Failed to load practice library:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLibrary();
  }, [activeTrack, activeSkill, filterType, readingFormat, readingPassage, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            LINGORA PRACTICE ENGINE • NGÂN HÀNG BÀI TẬP & THI THỬ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-1">
            Thư Viện Luyện Đề & Kỹ Năng CBT
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Tập trung rèn luyện từng dạng câu hỏi hoặc thi thử mô phỏng máy tính (Computer-Based Test) với hai chế độ rõ ràng: <strong>Luyện tập tự do</strong> và <strong>Thi tính giờ chuẩn</strong>.
          </p>
        </div>
      </div>

      {/* Primary Track Filter (IELTS vs HSK) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-100 dark:bg-slate-900/60 p-2 rounded-2xl border border-stone-200/80 dark:border-slate-800">
        <div className="flex rounded-xl bg-white dark:bg-slate-800 p-1 border border-stone-200/60 dark:border-slate-700">
          {[
            { id: 'all', label: 'Tất cả chương trình' },
            { id: 'ielts', label: 'IELTS Academic' },
            { id: 'hsk', label: 'HSK Chuẩn Quốc Tế' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTrack(t.id as typeof activeTrack)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTrack === t.id
                  ? 'bg-indigo-600 text-white shadow-2xs font-black'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Tìm kiếm bài tập, chủ đề..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {activeTrack === 'hsk' ? (
        <HskLabWorkspace />
      ) : (
        <>
          {/* Skill Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Tất cả kỹ năng', icon: Layers },
          { id: 'listening', label: 'Listening Lab', icon: Headphones },
          { id: 'reading', label: 'Reading Lab', icon: BookOpen },
          { id: 'writing', label: 'Writing Lab', icon: PenTool },
          { id: 'collocation', label: 'Collocation & Idioms', icon: Sparkles }
        ].map(s => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSkill(s.id as typeof activeSkill)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeSkill === s.id
                  ? 'bg-indigo-600 text-white shadow-xs font-black'
                  : 'bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Reading Lab Detailed Sub-Filter Toolbar (When Reading is active or All) */}
      {(activeSkill === 'reading' || activeSkill === 'all') && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-slate-800 text-xs">
            {/* Academic vs General Training */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-500 uppercase text-[10px]">Hình thức:</span>
              <div className="flex rounded-lg bg-stone-100 dark:bg-slate-800 p-0.5">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'academic', label: 'Academic Reading' },
                  { id: 'general', label: 'General Training' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setReadingFormat(f.id as typeof readingFormat)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                      readingFormat === f.id
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Passage Selection */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-500 uppercase text-[10px]">Phần đọc:</span>
              <div className="flex rounded-lg bg-stone-100 dark:bg-slate-800 p-0.5">
                {[
                  { id: 'all', label: 'Tất cả Passage' },
                  { id: '1', label: 'Passage 1' },
                  { id: '2', label: 'Passage 2' },
                  { id: '3', label: 'Passage 3' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setReadingPassage(p.id as typeof readingPassage)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                      readingPassage === p.id
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 12 Question Types Chip Row */}
          <div className="space-y-1.5">
            <span className="font-bold text-stone-500 uppercase text-[10px] block">
              Dạng câu hỏi IELTS Reading (12 Question Types):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'Tất cả dạng bài' },
                { id: 'tfng', label: 'True / False / Not Given' },
                { id: 'ynng', label: 'Yes / No / Not Given' },
                { id: 'mcq', label: 'Multiple Choice' },
                { id: 'matching_headings', label: 'Matching Headings' },
                { id: 'matching_features', label: 'Matching Features' },
                { id: 'matching_information', label: 'Matching Information' },
                { id: 'matching_sentence_endings', label: 'Matching Sentence Endings' },
                { id: 'sentence_completion', label: 'Sentence Completion' },
                { id: 'summary_completion', label: 'Summary Completion' },
                { id: 'note_completion', label: 'Note Completion' },
                { id: 'table_completion', label: 'Table Completion' },
                { id: 'short_answer', label: 'Short-answer Questions' }
              ].map(qt => (
                <button
                  key={qt.id}
                  onClick={() => setFilterType(qt.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    filterType === qt.id
                      ? 'bg-indigo-600 text-white shadow-xs font-black'
                      : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {qt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CASE 1: COLLOCATION & IDIOMS PRACTICE MODULE */}
      {activeSkill === 'collocation' && (
        <div className="rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                IELTS Writing Lexical Booster
              </span>
              <h3 className="text-xl font-black text-stone-900 dark:text-white mt-0.5">
                Luyện Tập Collocations & Thành Ngữ Học Thuật Band 7.5+
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              Câu {clozeIndex + 1} / {clozeQuestions.length}
            </span>
          </div>

          {/* Active Cloze Question Card */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-stone-200 dark:border-slate-800 space-y-4">
            <p className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-relaxed">
              {clozeQuestions[clozeIndex].sentenceBefore}
              <span className="px-3 py-0.5 mx-1 rounded-lg border-2 border-dashed border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono font-black">
                {selectedOption || '_____'}
              </span>
              {clozeQuestions[clozeIndex].sentenceAfter}
            </p>

            <p className="text-xs text-stone-500 dark:text-stone-400 italic">
              Dịch nghĩa: {clozeQuestions[clozeIndex].sentenceVi}
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {clozeQuestions[clozeIndex].options.map(opt => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === clozeQuestions[clozeIndex].correctOption;

                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedOption(opt);
                      setShowExplanation(true);
                      if (isCorrect) {
                        playAudioCue('correct');
                        addXp(20);
                        setClozeScore(prev => prev + 1);
                      } else {
                        playAudioCue('wrong');
                      }
                    }}
                    className={`py-3 px-4 rounded-xl border text-xs font-black transition ${
                      showExplanation
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : isSelected
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                          : 'border-stone-200 dark:border-slate-800 opacity-60'
                        : isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-black'
                        : 'border-stone-200 dark:border-slate-800 hover:border-indigo-400 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation reveal */}
            {showExplanation && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 space-y-2 text-xs animate-in fade-in">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Đáp án đúng: <strong>{clozeQuestions[clozeIndex].correctOption}</strong></span>
                </div>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  {clozeQuestions[clozeIndex].explanation}
                </p>
                <div className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 p-2.5 rounded-lg border border-indigo-200/60 dark:border-indigo-900/40">
                  {clozeQuestions[clozeIndex].bandAnalysis}
                </div>

                <div className="text-right pt-2">
                  <button
                    onClick={() => {
                      if (clozeIndex < clozeQuestions.length - 1) {
                        setClozeIndex(prev => prev + 1);
                        setSelectedOption(null);
                        setShowExplanation(false);
                      } else {
                        alert(`Chúc mừng bạn đã hoàn thành bài tập Collocation! Điểm số: ${clozeScore + 1}/${clozeQuestions.length}`);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                  >
                    Câu tiếp theo →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASE 2: MAIN EXAM & PRACTICE EXERCISE CATALOG */}
      {activeSkill !== 'collocation' && (
        <>
          {isLoading ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : exercises.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-stone-300 dark:border-slate-800">
              <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-stone-700 dark:text-stone-300">
                Không tìm thấy bài tập phù hợp với bộ lọc
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Hãy thử đổi kỹ năng hoặc tìm kiếm bằng từ khóa khác.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {exercises.map(item => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Badges row */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/40">
                        {item.track === 'ielts' ? 'IELTS Academic' : 'HSK Standard'}
                      </span>

                      {item.isMiniMock ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200">
                          Mini-Mock
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
                          Full Test
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-base font-black text-stone-900 dark:text-white leading-snug">
                        {item.titleVi}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                        {item.title}
                      </p>
                    </div>

                    {/* Stats pills */}
                    <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 font-semibold pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.durationMinutes} phút</span>
                      </span>
                      <span>•</span>
                      <span>{item.totalQuestions} câu hỏi</span>
                      <span>•</span>
                      <span className="capitalize">{item.skills.join(', ')}</span>
                    </div>
                  </div>

                  {/* Dual Action Entry Points (Practice Mode vs Mock Mode) */}
                  <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800 flex items-center gap-2">
                    {/* Practice Mode Link */}
                    <Link
                      href={`/mock-exams/${item.id}?mode=practice`}
                      className="flex-1 py-2 px-3 rounded-xl border border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-800 text-stone-800 dark:text-stone-200 font-bold text-xs text-center transition"
                    >
                      Luyện Tập (Practice)
                    </Link>

                    {/* Timed Mock Exam Link */}
                    <Link
                      href={`/mock-exams/${item.id}?mode=mock`}
                      className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs text-center shadow-xs transition"
                    >
                      Thi Thử (Mock Exam)
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
        </>
      )}
    </div>
  );
}
