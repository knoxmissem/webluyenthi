'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import { TrackType, ProficiencyLevel } from '@/types';
import confetti from 'canvas-confetti';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Bot,
  Calendar,
  Layers,
  Award,
  Zap,
  Target,
  Flame,
  Globe,
  Headphones,
  BookOpen,
  GraduationCap,
  Briefcase,
  Plane,
  Brain,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, currentUser, completeOnboarding, playAudioCue } = useLearner();
  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Form State
  const [track, setTrack] = useState<TrackType>(profile.track || 'ielts');
  const [level, setLevel] = useState<ProficiencyLevel>('beginner');
  const [currentIelts, setCurrentIelts] = useState<number>(profile.currentIeltsBand || 4.5);
  const [targetIelts, setTargetIelts] = useState<number>(profile.targetIeltsBand || 6.5);
  const [currentHsk, setCurrentHsk] = useState<number>(profile.currentHskLevel || 1);
  const [targetHsk, setTargetHsk] = useState<number>(profile.targetHskLevel || 4);
  const [dailyMinutes, setDailyMinutes] = useState<number>(profile.dailyMinutes || 30);
  const [learningGoalReason, setLearningGoalReason] = useState<string>('study_abroad');
  const [targetDate, setTargetDate] = useState<string>('2026-12-31');
  const [preferences, setPreferences] = useState<string[]>([
    'short_lessons',
    'games',
    'exam_simulations'
  ]);
  const [selectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNextStep = () => {
    playAudioCue('click');
    setStep(prev => Math.min(totalSteps, prev + 1));
  };

  const handlePrevStep = () => {
    playAudioCue('click');
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    playAudioCue('click');

    const steps = [
      t('Đang phân tích trình độ xuất phát...', 'Analyzing starting level...'),
      t('Đang tính toán phân bổ thời lượng học...', 'Calculating optimal daily time allocation...'),
      t('Đang lập lịch lặp lại ngắt quãng SRS cho từ vựng...', 'Scheduling spaced-repetition loops...'),
      t('Khởi tạo lộ trình 4 tuần & Mở khóa Đảo học tập!', 'Finalizing roadmap & unlocking first island node!')
    ];

    steps.forEach((_, idx) => {
      setTimeout(() => {
        setGenerationStep(idx + 1);
        if (idx === steps.length - 1) {
          // Finalize onboarding and commit to context + cloud
          completeOnboarding({
            track,
            diagnosticLevel: level,
            currentIeltsBand: currentIelts,
            targetIeltsBand: targetIelts,
            currentHskLevel: currentHsk,
            targetHskLevel: targetHsk,
            dailyMinutes,
            priorExperience: level,
            learningGoalReason,
            learningPreferences: preferences,
            selectedDays,
            targetDate
          });

          setIsGenerating(false);
          setIsCompleted(true);

          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {}
        }
      }, (idx + 1) * 750);
    });
  };

  const userName = currentUser?.name || profile.name || 'Học viên';
  const userEmail = currentUser?.email || profile.email;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 max-w-3xl mx-auto flex flex-col justify-between">
      {/* Top Header & Progress Indicator */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-black text-lg text-stone-900 dark:text-white">
              LINGORA
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {userEmail ? (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">{userEmail}</span>
              </span>
            ) : (
              <Link
                href="/login"
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Đăng nhập để đồng bộ
              </Link>
            )}

            <span className="text-xs font-bold text-stone-400 dark:text-stone-500">
              {t(`Bước ${step} / ${totalSteps}`, `Step ${step} of ${totalSteps}`)}
            </span>
          </div>
        </div>

        {/* Step Progress Line */}
        <div className="h-1.5 w-full bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Welcome Banner for logged in user */}
        {step === 1 && (
          <div className="mb-6 p-4 rounded-2xl bg-indigo-50/70 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-base flex items-center justify-center shrink-0">
              {profile.avatar || '🦁'}
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-stone-800 dark:text-white">
                Chào mừng <span className="text-indigo-600">{userName}</span> đến với LINGORA!
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Hãy cho LINGORA biết một chút về mục tiêu của bạn để thiết kế lộ trình học tối ưu nhất nhé.
              </p>
            </div>
          </div>
        )}

        {/* ================= STEP 1: BẠN MUỐN HỌC IELTS HAY HSK? ================= */}
        {step === 1 && (
          <div className="animate-in fade-in duration-200">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-2">
              {t('Bạn muốn học IELTS hay HSK?', 'What do you want to learn: IELTS or HSK?')}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              {t('Chọn mục tiêu học tập chính của bạn. Bạn luôn có thể chuyển đổi hoặc học song song bất cứ lúc nào.', 'Choose your main focus. You can switch or combine them anytime.')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  id: 'ielts',
                  title: 'IELTS English',
                  subtitle: 'Tiếng Anh Học Thuật',
                  desc: 'Rèn luyện 4 kỹ năng Listening, Reading, Writing, Speaking theo chuẩn đề Cambridge.',
                  badge: 'Band 4.0 - 9.0',
                  icon: Headphones,
                  color: 'text-blue-600'
                },
                {
                  id: 'hsk',
                  title: 'HSK Chinese',
                  subtitle: 'Tiếng Trung Quốc Tế',
                  desc: 'Học chữ Hán giản thể, phát âm Pinyin, ngữ pháp câu chữ 把 và luyện đề HSK 1 - 6.',
                  badge: 'HSK 1 - 6',
                  icon: Globe,
                  color: 'text-rose-600'
                },
                {
                  id: 'both',
                  title: 'Cả IELTS & HSK',
                  subtitle: 'Song Ngữ Anh - Trung',
                  desc: 'Học song song cả tiếng Anh và tiếng Trung với thời gian phân bổ cân đối mỗi ngày.',
                  badge: 'Song Ngữ',
                  icon: Layers,
                  color: 'text-indigo-600'
                },
              ].map(item => {
                const IconComponent = item.icon;
                const isSelected = track === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setTrack(item.id as TrackType);
                      playAudioCue('click');
                    }}
                    className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-md scale-102'
                        : 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-stone-300">
                          {item.badge}
                        </span>
                        <IconComponent className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        {item.subtitle}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-5 flex justify-end">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100 dark:fill-indigo-950" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-stone-300 dark:border-slate-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 2: BẠN ĐÃ CÓ KINH NGHIỆM GÌ CHƯA? ================= */}
        {step === 2 && (
          <div className="animate-in fade-in duration-200">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-2">
              {t('Bạn đã có kinh nghiệm gì chưa?', 'What is your prior experience & current level?')}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              {t('Giúp LINGORA sắp xếp các bài tập vừa sức, không gây áp lực và bám sát thực tế xuất phát điểm của bạn.', 'Helps us tailor exercises to your exact starting point without overwhelm.')}
            </p>

            <div className="space-y-3 mb-6">
              {[
                {
                  id: 'beginner',
                  title: '🐣 Chưa biết gì / Mới bắt đầu (Mất gốc)',
                  desc: 'Bắt đầu từ con số 0. Muốn học phát âm, bảng chữ cái/pinyin và từ vựng cốt lõi.',
                  scoreHint: track === 'hsk' ? 'Chưa học tiếng Trung' : 'IELTS 0 - 3.5'
                },
                {
                  id: 'elementary',
                  title: '📖 Sơ cấp (Đã có chút kiến thức cơ bản)',
                  desc: 'Nắm được các câu giao tiếp đơn giản và từ vựng thông dụng hàng ngày.',
                  scoreHint: track === 'hsk' ? 'HSK 1 - 2' : 'IELTS 4.0 - 5.0'
                },
                {
                  id: 'intermediate',
                  title: '🚀 Trung cấp (Đã có nền tảng vững)',
                  desc: 'Có thể đọc hiểu đoạn văn vừa phải và giao tiếp, muốn bứt phá band điểm cao hơn.',
                  scoreHint: track === 'hsk' ? 'HSK 3 - 4' : 'IELTS 5.5 - 6.5'
                },
                {
                  id: 'advanced',
                  title: '🏆 Nâng cao (Muốn luyện đề & tối ưu điểm)',
                  desc: 'Đã thi hoặc có trình độ cao, muốn tinh chỉnh kỹ năng và đạt điểm xuất sắc.',
                  scoreHint: track === 'hsk' ? 'HSK 5 - 6' : 'IELTS 7.0+'
                },
              ].map(lvl => (
                <div
                  key={lvl.id}
                  onClick={() => {
                    setLevel(lvl.id as ProficiencyLevel);
                    playAudioCue('click');
                  }}
                  className={`cursor-pointer rounded-2xl p-4 border-2 transition flex items-center justify-between ${
                    level === lvl.id
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-stone-300'
                  }`}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                        {lvl.title}
                      </h4>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-stone-300">
                        {lvl.scoreHint}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {lvl.desc}
                    </p>
                  </div>
                  {level === lvl.id && <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />}
                </div>
              ))}
            </div>

            {/* Score calibration slider */}
            {(track === 'ielts' || track === 'both') && (
              <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Band điểm IELTS ước tính hiện tại:
                  </span>
                  <span className="font-black text-indigo-600 text-lg">
                    Band {currentIelts.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="8.5"
                  step="0.5"
                  value={currentIelts}
                  onChange={e => setCurrentIelts(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            )}

            {(track === 'hsk' || track === 'both') && (
              <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Cấp độ HSK ước tính hiện tại:
                  </span>
                  <span className="font-black text-rose-600 text-lg">
                    HSK Cấp {currentHsk}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={currentHsk}
                  onChange={e => setCurrentHsk(parseInt(e.target.value))}
                  className="w-full accent-rose-600"
                />
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 3: BẠN HỌC ĐƯỢC BAO LÂU MỖI NGÀY? ================= */}
        {step === 3 && (
          <div className="animate-in fade-in duration-200">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-2">
              {t('Bạn có thể dành bao lâu để học mỗi ngày?', 'How much time can you commit daily?')}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              {t('Học đều đặn 15–30 phút mỗi ngày mang lại hiệu quả bền vững hơn học dồn dập nhiều tiếng.', 'Short, daily sessions outperform marathon cramming.')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                {
                  min: 15,
                  tag: 'Nhẹ nhàng',
                  label: '15 phút / ngày',
                  desc: '1 bài từ vựng trên đảo + 1 bài nghe ngắn. Thích hợp cho người bận rộn duy trì thói quen.'
                },
                {
                  min: 30,
                  tag: 'Tiêu chuẩn (Khuyên dùng)',
                  label: '30 phút / ngày',
                  desc: 'Hoàn thành 2-3 bài học đảo + 10 thẻ flashcards SM-2. Tiến bộ nhanh và vững chắc.'
                },
                {
                  min: 45,
                  tag: 'Tập trung',
                  label: '45 phút / ngày',
                  desc: 'Luyện 2 kỹ năng chuyên sâu + ôn tập toàn bộ sổ lỗi sai. Tăng band rõ rệt sau 4 tuần.'
                },
                {
                  min: 60,
                  tag: 'Tăng tốc',
                  label: '60+ phút / ngày',
                  desc: 'Học ngữ pháp + luyện đề thi thử toàn diện. Dành cho người muốn đạt chứng chỉ cấp tốc.'
                },
              ].map(opt => (
                <div
                  key={opt.min}
                  onClick={() => {
                    setDailyMinutes(opt.min);
                    playAudioCue('click');
                  }}
                  className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                    dailyMinutes === opt.min
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-md scale-102'
                      : 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        dailyMinutes === opt.min
                          ? 'bg-indigo-600 text-white'
                          : 'bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-stone-300'
                      }`}>
                        {opt.tag}
                      </span>
                      <Clock className="w-4 h-4 text-stone-400" />
                    </div>
                    <h3 className="text-xl font-black text-stone-900 dark:text-white mt-1">
                      {opt.label}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    {dailyMinutes === opt.min ? (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100 dark:fill-indigo-950" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-stone-300 dark:border-slate-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= STEP 4: MỤC TIÊU ĐIỂM SỐ BẠN MUỐN ĐẠT ĐƯỢC? ================= */}
        {step === 4 && (
          <div className="animate-in fade-in duration-200">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-2">
              {t('Mục tiêu điểm số bạn muốn đạt được?', 'What score do you want to achieve?')}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              {t('Mỗi bài tập và kỳ thi thử sẽ điều chỉnh độ khó để đưa bạn đến mục tiêu này.', 'Every task and mock exam will calibrate to target this milestone.')}
            </p>

            {(track === 'ielts' || track === 'both') && (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border-2 border-indigo-200 dark:border-indigo-900/60 shadow-xs mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-black text-indigo-600 uppercase">MỤC TIÊU IELTS</span>
                    <p className="text-[11px] text-stone-500">Mức điểm cần để xét tốt nghiệp, du học hoặc định cư</p>
                  </div>
                  <span className="text-3xl font-black text-indigo-600">Band {targetIelts.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="9.0"
                  step="0.5"
                  value={targetIelts}
                  onChange={e => setTargetIelts(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 h-2.5"
                />
                <div className="flex justify-between text-[11px] font-bold text-stone-400 mt-2">
                  <span>Band 5.0</span>
                  <span>Band 6.5 (Chuẩn)</span>
                  <span>Band 7.5 (Học thuật)</span>
                  <span>Band 9.0 (Master)</span>
                </div>
              </div>
            )}

            {(track === 'hsk' || track === 'both') && (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border-2 border-rose-200 dark:border-rose-900/60 shadow-xs mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-black text-rose-600 uppercase">MỤC TIÊU HSK</span>
                    <p className="text-[11px] text-stone-500">Chuẩn năng lực Hán ngữ quốc tế</p>
                  </div>
                  <span className="text-3xl font-black text-rose-600">HSK Cấp {targetHsk}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={targetHsk}
                  onChange={e => setTargetHsk(parseInt(e.target.value))}
                  className="w-full accent-rose-600 h-2.5"
                />
                <div className="flex justify-between text-[11px] font-bold text-stone-400 mt-2">
                  <span>HSK 1</span>
                  <span>HSK 3</span>
                  <span>HSK 4 (Du học)</span>
                  <span>HSK 6 (Cao cấp)</span>
                </div>
              </div>
            )}

            {/* Target Exam Date */}
            <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('Dự kiến ngày thi (tùy chọn):', 'Target examination date (optional):')}</span>
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 5: ĐỘNG LỰC & LÝ DO HỌC ================= */}
        {step === 5 && (
          <div className="animate-in fade-in duration-200">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-2">
              {t('Động lực chính thúc đẩy bạn học ngoại ngữ?', 'What is your primary motivation?')}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              {t('Giúp LINGORA nhắc nhở và giữ lửa tinh thần học tập cho bạn mỗi ngày.', 'Helps us keep you motivated on your journey.')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                {
                  id: 'study_abroad',
                  title: 'Đi du học / Xét tuyển đại học',
                  desc: 'Đạt điều kiện tiếng Anh/Trung để nộp hồ sơ học bổng và xin visa du học.',
                  icon: GraduationCap,
                  color: 'text-indigo-600'
                },
                {
                  id: 'career',
                  title: 'Thăng tiến sự nghiệp & Xin việc',
                  desc: 'Mở rộng cơ hội tại các tập đoàn đa quốc gia và nâng cao thu nhập.',
                  icon: Briefcase,
                  color: 'text-blue-600'
                },
                {
                  id: 'travel_culture',
                  title: 'Du lịch & Yêu thích văn hóa',
                  desc: 'Tự tin giao tiếp khi đi nước ngoài, xem phim và đọc sách nguyên bản.',
                  icon: Plane,
                  color: 'text-emerald-600'
                },
                {
                  id: 'self_improvement',
                  title: 'Nâng cao bản thân & Rèn luyện trí não',
                  desc: 'Tạo dựng thói quen kỷ luật và mở rộng vốn hiểu biết về thế giới.',
                  icon: Brain,
                  color: 'text-amber-600'
                },
              ].map(reason => {
                const IconComp = reason.icon;
                const isSelected = learningGoalReason === reason.id;
                return (
                  <div
                    key={reason.id}
                    onClick={() => {
                      setLearningGoalReason(reason.id);
                      playAudioCue('click');
                    }}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition flex items-start justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                        : 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <IconComp className={`w-4 h-4 ${reason.color}`} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 dark:text-white">
                          {reason.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                          {reason.desc}
                        </p>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 6: TẠO LỘ TRÌNH & CHÚC MỪNG ================= */}
        {step === 6 && (
          <div className="text-center py-6 animate-in fade-in duration-200">
            {!isGenerating && !isCompleted && (
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-500/25">
                  <Sparkles className="w-10 h-10 animate-pulse" />
                </div>
                <h2 className="text-2xl font-black text-stone-900 dark:text-white mb-2">
                  {t('Sẵn sàng tạo Lộ trình Cá nhân hóa!', 'Ready to Generate Your AI Roadmap!')}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
                  {t(
                    `Hệ thống sẽ tổng hợp mục tiêu ${track.toUpperCase()}, quỹ thời gian ${dailyMinutes} phút/ngày và trình độ xuất phát để thiết kế lộ trình 4 tuần phù hợp nhất.`,
                    `We will craft your customized 4-week study roadmap based on your preferences.`
                  )}
                </p>

                {/* Summary Card */}
                <div className="p-4 rounded-2xl bg-stone-100/80 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Mục tiêu chính:</span>
                    <span className="font-bold text-indigo-600">{track.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Thời gian học:</span>
                    <span className="font-bold">{dailyMinutes} phút / ngày</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Trình độ xuất phát:</span>
                    <span className="font-bold capitalize">{level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Phần thưởng ban đầu:</span>
                    <span className="font-bold text-amber-600">+50 XP Khởi Động</span>
                  </div>
                </div>

                <button
                  onClick={handleGeneratePlan}
                  className="w-full py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Bot className="w-5 h-5" />
                  <span>{t('Khởi Tạo Lộ Trình & Nhận +50 XP Ngay', 'Generate AI Plan & Get +50 XP')}</span>
                </button>
              </div>
            )}

            {isGenerating && (
              <div className="max-w-md mx-auto py-12">
                <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border-4 border-indigo-600 border-t-transparent animate-spin mx-auto mb-6" />
                <h3 className="text-xl font-black text-stone-900 dark:text-white mb-2">
                  {t('AI đang thiết kế lộ trình cho bạn...', 'AI is crafting your study roadmap...')}
                </h3>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-pulse">
                  {generationStep === 1 && t('Đang phân tích trình độ xuất phát...', 'Analyzing starting level...')}
                  {generationStep === 2 && t('Đang phân bổ bài học và thời lượng 4 tuần...', 'Allocating skill weights & tasks...')}
                  {generationStep === 3 && t('Đang lập lịch Spaced Repetition SRS...', 'Setting up spaced-repetition schedules...')}
                  {generationStep >= 4 && t('Hoàn tất! Đang kích hoạt tài khoản...', 'Ready! Preparing dashboard...')}
                </p>
              </div>
            )}

            {isCompleted && (
              <div className="max-w-md mx-auto py-6 animate-in zoom-in-95">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-700 dark:text-amber-300 font-extrabold text-xs mb-3">
                  <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
                  <span>Chúc mừng bạn đã nhận +50 XP Thưởng!</span>
                </div>
                <h2 className="text-2xl font-black text-stone-900 dark:text-white mb-2">
                  Lộ Trình Của Bạn Đã Sẵn Sàng!
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-6 leading-relaxed">
                  Trạm học đầu tiên đã mở khóa. Hãy bắt đầu chinh phục Hải Trình Vô Tận ngay bây giờ!
                </p>

                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{t('Bắt đầu bài học đầu tiên ngay →', 'Start Your First Lesson Now →')}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation Buttons (Back & Next) */}
      {!isGenerating && !isCompleted && (
        <div className="pt-6 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handlePrevStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 font-bold text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Quay lại', 'Back')}</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps && (
            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 active:scale-95 transition"
            >
              <span>{t('Tiếp tục', 'Next')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
