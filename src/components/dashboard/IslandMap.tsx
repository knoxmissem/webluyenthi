'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Trophy,
  Flag,
  Trees,
  Mountain,
  Sparkles,
  CheckCircle2,
  Circle,
  Volume2,
  ArrowRight,
  Lock,
  Play
} from 'lucide-react';

export function IslandMap() {
  const { profile, islandNodes, quests, setShowLevelUpModal, playAudioCue } = useLearner();
  const { t } = useLanguage();
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  const sampleThemeWords = [
    { word: 'Adventure', wordVi: 'Phiêu lưu', phonetic: '/ədˈven.tʃər/', color: 'from-emerald-400 to-green-500', icon: '🎒', hsk: '冒险 (màoxiǎn)' },
    { word: 'Journey', wordVi: 'Hành trình', phonetic: '/ˈdʒɜː.ni/', color: 'from-cyan-400 to-teal-500', icon: '🧭', hsk: '旅程 (lǚchéng)' },
    { word: 'Discover', wordVi: 'Khám phá', phonetic: '/dɪˈskʌv.ər/', color: 'from-amber-400 to-orange-500', icon: '🔭', hsk: '发现 (fāxiàn)' },
    { word: 'Camp', wordVi: 'Trại hè', phonetic: '/kæmp/', color: 'from-yellow-400 to-amber-500', icon: '⛺', hsk: '露营 (lùyíng)' },
    { word: 'Knowledge', wordVi: 'Tri thức', phonetic: '/ˈnɒl.ɪdʒ/', color: 'from-sky-400 to-blue-500', icon: '📖', hsk: '知识 (zhīshi)' },
    { word: 'Global', wordVi: 'Toàn cầu', phonetic: '/ˈɡləʊ.bəl/', color: 'from-purple-400 to-indigo-500', icon: '🌍', hsk: '全球 (quánqiú)' },
  ];

  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    playAudioCue('click');
  };

  const getRankTitle = (lvl: number) => {
    if (lvl >= 32) return 'Thám Hiểm Gia';
    if (lvl >= 10) return 'Chiến Binh';
    if (lvl >= 5) return 'Tập Sự';
    return 'Tân Binh';
  };

  return (
    <div className="space-y-6 mb-6">
      {/* 1. Tropical Island Journey Map Card (Matching Image 2 + Duolingo Unlocking) */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-sky-300 dark:border-sky-700 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-400 dark:from-sky-950 dark:via-blue-900 dark:to-cyan-950 p-6 sm:p-8 shadow-md">
        {/* Sky Clouds Graphic */}
        <div className="absolute top-4 left-8 w-24 h-8 bg-white/40 rounded-full blur-xs" />
        <div className="absolute top-8 right-20 w-36 h-10 bg-white/30 rounded-full blur-xs" />

        {/* Level Banner Pill at Top Center (Real user level!) */}
        <div className="flex justify-center mb-6 relative z-10">
          <div
            onClick={() => {
              playAudioCue('level_up');
              setShowLevelUpModal(true);
            }}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/95 dark:bg-slate-900/90 text-stone-900 dark:text-white font-extrabold text-sm shadow-md border border-white hover:scale-105 active:scale-95 transition"
          >
            <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Cấp độ {profile.level}: {getRankTitle(profile.level)}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
              {profile.xp}/{profile.nextLevelXp} XP
            </span>
          </div>
        </div>

        {/* Locked alert notice */}
        {lockedNotice && (
          <div className="mb-4 text-center animate-in fade-in duration-200">
            <span className="inline-block px-4 py-1.5 rounded-full bg-stone-900/90 text-white text-xs font-bold shadow-md">
              🔒 {lockedNotice}
            </span>
          </div>
        )}

        {/* Interactive Ocean Islands with Dashed Trail */}
        <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto py-4 px-2">
          {islandNodes.map((node, index) => {
            const isLast = index === islandNodes.length - 1;

            return (
              <React.Fragment key={node.id}>
                {/* Island Node */}
                <div className="flex flex-col items-center group shrink-0">
                  {node.isLocked ? (
                    // Locked node
                    <div
                      onClick={() => {
                        setLockedNotice(`Đảo ${node.stepNumber} đang khóa! Hãy hoàn thành đảo trước đó.`);
                        playAudioCue('wrong');
                        setTimeout(() => setLockedNotice(null), 2500);
                      }}
                      className="cursor-not-allowed relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-b from-stone-300 to-stone-400 border-4 border-stone-200 flex items-center justify-center shadow-md opacity-60 hover:opacity-80 transition"
                    >
                      <Lock className="w-7 h-7 text-stone-600" />
                    </div>
                  ) : (
                    // Unlocked or Active or Completed Node
                    <Link
                      href={node.routeLink}
                      onClick={() => playAudioCue('click')}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center shadow-lg ${
                        node.isCompleted
                          ? 'bg-gradient-to-b from-emerald-400 to-green-600 border-4 border-amber-300 ring-4 ring-emerald-300/40'
                          : node.isCurrent
                          ? 'bg-gradient-to-b from-amber-300 to-orange-500 border-4 border-white animate-bounce ring-4 ring-orange-300/60'
                          : 'bg-gradient-to-b from-yellow-300 to-amber-500 border-4 border-yellow-200'
                      }`}
                    >
                      {node.isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 text-white drop-shadow" />
                      ) : node.isCurrent ? (
                        <div className="flex flex-col items-center">
                          <Play className="w-7 h-7 text-white fill-white drop-shadow ml-0.5" />
                        </div>
                      ) : node.type === 'trophy' ? (
                        <Trophy className="w-8 h-8 text-amber-950 fill-amber-300 drop-shadow" />
                      ) : (
                        <Flag className="w-7 h-7 text-white fill-white drop-shadow" />
                      )}
                    </Link>
                  )}

                  <span className="mt-2 text-[11px] sm:text-xs font-black text-slate-800 dark:text-white bg-white/90 dark:bg-slate-900/80 px-2.5 py-0.5 rounded-md shadow-xs text-center whitespace-nowrap">
                    {t(node.titleVi, node.title)}
                  </span>

                  {node.isCurrent && (
                    <span className="mt-1 px-2 py-0.5 rounded-full bg-orange-500 text-white font-black text-[9px] uppercase tracking-wider animate-pulse shadow-xs">
                      HỌC NGAY
                    </span>
                  )}
                </div>

                {/* Connecting Dashed Line */}
                {!isLast && (
                  <div className="flex-1 min-w-[24px] sm:min-w-[40px] flex items-center justify-center">
                    <div className={`w-full border-t-4 border-dashed ${
                      node.isCompleted ? 'border-amber-300 dark:border-amber-400' : 'border-white/80 dark:border-white/40'
                    }`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 2. Grid split: Daily Goals (Left) & Vocabulary Themed Cards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Goals Checklist Card (Matching Image 2) */}
        <div className="rounded-3xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
                <span>{t('Mục tiêu hàng ngày', 'Daily Goals')}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {quests.filter(q => q.completed).length}/{quests.length} {t('xong', 'done')}
                </span>
              </h4>
              <Link
                href="/practice"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>{t('Luyện tập ngay', 'Practice now')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                    quest.completed
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                      : 'bg-stone-50/70 dark:bg-slate-700/30 border-stone-200/70 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {quest.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-900/60 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300 dark:text-stone-500 shrink-0" />
                    )}
                    <div>
                      <p className={`text-xs font-bold ${quest.completed ? 'text-emerald-900 dark:text-emerald-200' : 'text-stone-800 dark:text-stone-200'}`}>
                        {t(quest.titleVi, quest.title)}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        {quest.progress}/{quest.target} • {t(quest.descriptionVi, quest.description)}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 shrink-0">
                    +{quest.xpReward} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vocabulary Cards 6-Pack Grid (Matching Image 2) */}
        <div className="rounded-3xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
              <span>{t('Thẻ từ vựng chủ đề', 'Vocabulary Cards')}</span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                {t('Bấm để phát âm & xem nghĩa', 'Tap to speak & translate')}
              </span>
            </h4>
            <Link
              href="/flashcards"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>SRS Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {sampleThemeWords.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveWord(item.word);
                  handleSpeak(item.word);
                }}
                className={`cursor-pointer rounded-2xl bg-gradient-to-br ${item.color} p-3 text-white shadow-xs flex flex-col items-center justify-center text-center transition-all hover:scale-105 active:scale-95 group`}
              >
                <span className="text-3xl mb-1.5 drop-shadow">{item.icon}</span>
                <span className="text-xs font-black tracking-tight drop-shadow-xs">
                  {item.word}
                </span>
                <span className="text-[10px] font-semibold text-white/90">
                  {item.wordVi}
                </span>
                <div className="mt-1 flex items-center gap-1 text-[9px] opacity-0 group-hover:opacity-100 transition">
                  <Volume2 className="w-3 h-3" />
                  <span>{item.phonetic}</span>
                </div>
              </div>
            ))}
          </div>

          {activeWord && (
            <div className="mt-3 p-2.5 rounded-xl bg-stone-100 dark:bg-slate-700/50 text-center text-xs font-medium text-stone-700 dark:text-stone-300">
              {t(`Đang phát âm: "${activeWord}" • HSK tương đương: `, `Pronouncing: "${activeWord}" • Chinese equiv: `)}
              <strong>{sampleThemeWords.find(w => w.word === activeWord)?.hsk}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
