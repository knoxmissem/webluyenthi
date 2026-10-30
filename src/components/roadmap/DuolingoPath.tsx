'use client';

import React, { useState, useMemo } from 'react';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import { VocabSession } from '@/types';
import { getSessionByDay, ieltsSessionTemplates, hskThemePools } from '@/data/vocabCurriculum';
import {
  Star,
  Crown,
  Lock,
  Check,
  Sparkles,
  Trophy,
  BookOpen,
  Zap,
  Play,
  Gift,
  ChevronRight,
  X,
  Heart,
  Flame
} from 'lucide-react';

export type DuolingoNodeType = 'lesson' | 'writing' | 'chest' | 'quiz' | 'boss';

export interface PathNode {
  id: string;
  unitId: string;
  unitIndex: number;
  nodeIndex: number; // 0 to 5
  type: DuolingoNodeType;
  titleVi: string;
  titleEn: string;
  dayNumber: number;
  xpReward: number;
  session: VocabSession;
  status: 'completed' | 'current' | 'locked';
  x: number; // in px inside 360px width
  y: number; // in px inside 640px height
}

export interface PathUnit {
  id: string;
  unitNumber: number;
  titleVi: string;
  titleEn: string;
  level: string;
  themeColor: 'emerald' | 'indigo' | 'purple' | 'amber' | 'rose' | 'sky';
  guidebookTip: string;
  nodes: PathNode[];
}

interface DuolingoPathProps {
  track: 'ielts' | 'hsk';
  onStartSession: (session: VocabSession) => void;
  onOpenPracticeLab?: () => void;
}

export function DuolingoPath({ track, onStartSession }: DuolingoPathProps) {
  const { profile, addXp, playAudioCue } = useLearner();
  const { t } = useLanguage();

  // Number of units to render initially (expandable infinitely)
  const [renderedUnitsCount, setRenderedUnitsCount] = useState<number>(12);
  
  // Selected Node for Duolingo Popover Card
  const [selectedNode, setSelectedNode] = useState<PathNode | null>(null);

  // Guidebook Modal State
  const [activeGuidebookUnit, setActiveGuidebookUnit] = useState<PathUnit | null>(null);

  // Opened chest rewards tracker
  const [openedChests, setOpenedChests] = useState<Record<string, boolean>>({});
  const [chestModal, setChestModal] = useState<{ open: boolean; xp: number; gems: number } | null>(null);

  // Mascot fun speech bubbles
  const speechQuotes = [
    'Bắt đầu nào! 🚀',
    'Chỉ 5 phút thôi! ⏱️',
    'Chinh phục 8.0! 🎯',
    'Cố lên bạn ơi! 💪',
    'Đang có chuỗi đẹp! 🔥'
  ];
  const [speechIdx, setSpeechIdx] = useState(0);

  // Set of completed session IDs
  const completedSet = useMemo(() => {
    return new Set(profile.completedVocabSessionIds || []);
  }, [profile.completedVocabSessionIds]);

  // Color schemes for units
  const colorThemes: Array<'emerald' | 'indigo' | 'purple' | 'amber' | 'rose' | 'sky'> = [
    'emerald',
    'indigo',
    'purple',
    'amber',
    'rose',
    'sky'
  ];

  // Standard coordinates for 6 nodes in a unit (w=360px container)
  // Perfectly smooth winding S-curve with clean headroom
  const standardCoords = [
    { x: 180, y: 75 },
    { x: 110, y: 180 },
    { x: 130, y: 285 },
    { x: 235, y: 390 },
    { x: 250, y: 495 },
    { x: 180, y: 600 }
  ];

  // Generate Infinite Units based on track
  const units = useMemo<PathUnit[]>(() => {
    const list: PathUnit[] = [];
    let currentGlobalDay = 1;
    let foundCurrent = false;

    for (let u = 1; u <= renderedUnitsCount; u++) {
      const themeColor = colorThemes[(u - 1) % colorThemes.length];
      const unitId = `unit-${track}-${u}`;

      let titleVi = '';
      let titleEn = '';
      let level = '';
      let guidebookTip = '';

      if (track === 'ielts') {
        const template = ieltsSessionTemplates[(u - 1) % ieltsSessionTemplates.length];
        const theme = template.themes[0];
        titleVi = theme.titleVi;
        titleEn = theme.title;
        level = theme.level;

        if (level.includes('5.0') || level.includes('5.5')) {
          guidebookTip = `Trọng tâm Band 5.0 - 5.5: Nắm chắc nghĩa và phát âm chuẩn của các từ cốt lõi như "${theme.words[0]?.term}" và "${theme.words[1]?.term}". Luyện đặt câu đơn và câu ghép chuẩn ngữ pháp.`;
        } else if (level.includes('6.0')) {
          guidebookTip = `Trọng tâm Band 6.0 - 6.5: Vận dụng các thuật ngữ học thuật đời sống & công sở như "${theme.words[0]?.term}" và "${theme.words[1]?.term}" để lập luận rõ ràng, mạch lạc.`;
        } else if (level.includes('6.5') || level.includes('7.0')) {
          guidebookTip = `Trọng tâm Band 6.5 - 7.0: Sử dụng linh hoạt các cụm từ truyền thông và công nghệ như "${theme.words[0]?.cols[0] || 'consumer behavior'}" để phân tích đa chiều.`;
        } else if (level.includes('7.0') || level.includes('7.5')) {
          guidebookTip = `Trọng tâm Band 7.0 - 7.5: Vận dụng cụm Collocation học thuật như "${theme.words[0]?.cols[0] || 'mitigate climate risks'}" vào phân tích nguyên nhân và giải pháp Task 2.`;
        } else {
          guidebookTip = `Trọng tâm Band 8.0+: Sử dụng các collocations và thành ngữ học thuật tinh tế như "${theme.words[0]?.cols[0] || 'ubiquitous'}" để tạo văn phong trang trọng chuẩn bản xứ.`;
        }
      } else {
        const pool = hskThemePools[(u - 1) % hskThemePools.length];
        titleVi = pool.titleVi;
        titleEn = pool.title;
        level = pool.level;

        if (level === 'HSK 1') {
          guidebookTip = `Trọng tâm HSK 1: Ghi nhớ chuẩn 4 thanh điệu Pinyin, thứ tự các nét cơ bản của chữ Hán như "${pool.words[0]?.term} [${pool.words[0]?.pinyin}]" và luyện tập chào hỏi hằng ngày.`;
        } else if (level === 'HSK 2') {
          guidebookTip = `Trọng tâm HSK 2: Nắm vững từ vựng đời sống, mua sắm và mẫu câu so sánh, khoảng cách như "${pool.words[0]?.term} [${pool.words[0]?.pinyin}]" và cấu trúc "离...近/远".`;
        } else if (level === 'HSK 3') {
          guidebookTip = `Trọng tâm HSK 3: Mở rộng vốn từ biểu đạt cảm xúc, tính cách và các liên từ ghép nối như "${pool.words[0]?.term} [${pool.words[0]?.pinyin}]" để giao tiếp trôi chảy.`;
        } else if (level === 'HSK 4') {
          guidebookTip = `Trọng tâm HSK 4: Nắm vững thuật ngữ công sở, phỏng vấn tuyển dụng và văn phong đàm phán thương mại với các từ như "${pool.words[0]?.term} [${pool.words[0]?.pinyin}]".`;
        } else if (level === 'HSK 5') {
          guidebookTip = `Trọng tâm HSK 5: Rèn luyện lập luận logic, nghị luận xã hội và các cặp từ nối quan hệ nhân quả phức tạp như "${pool.words[0]?.term} [${pool.words[0]?.pinyin}]".`;
        } else {
          guidebookTip = `Trọng tâm HSK 6: Chinh phục thành ngữ 4 chữ Chengyu, phân biệt sắc thái từ cận nghĩa (近义词) và cú pháp câu điểm tuyệt đối với "${pool.words[0]?.term}".`;
        }
      }

      // 6 structured nodes along the winding path (short, punchy titles)
      const nodePatterns: Array<{ type: DuolingoNodeType; titleSuffixVi: string; titleSuffixEn: string }> = [
        { type: 'lesson', titleSuffixVi: 'Từ Vựng', titleSuffixEn: 'Vocabulary' },
        { type: 'writing', titleSuffixVi: 'Luyện Viết', titleSuffixEn: 'Writing Lab' },
        { type: 'chest', titleSuffixVi: 'Rương Quà', titleSuffixEn: 'Treasure Chest' },
        { type: 'lesson', titleSuffixVi: 'Tăng Tốc', titleSuffixEn: 'Speed Up' },
        { type: 'quiz', titleSuffixVi: 'Thử Thách', titleSuffixEn: 'Quiz Challenge' },
        { type: 'boss', titleSuffixVi: 'Vượt Ải', titleSuffixEn: 'Boss Final' }
      ];

      const nodes: PathNode[] = [];
      for (let n = 0; n < nodePatterns.length; n++) {
        const pattern = nodePatterns[n];
        const dayNumber = currentGlobalDay;
        const session = getSessionByDay(track, dayNumber);
        const coord = standardCoords[n];

        // Status calculation
        let status: 'completed' | 'current' | 'locked' = 'locked';
        const isSessionDone = completedSet.has(session.id);

        if (isSessionDone) {
          status = 'completed';
        } else if (!foundCurrent) {
          status = 'current';
          foundCurrent = true;
        } else {
          status = 'locked';
        }

        nodes.push({
          id: `node-${track}-${u}-${n}`,
          unitId,
          unitIndex: u,
          nodeIndex: n,
          type: pattern.type,
          titleVi: `${pattern.titleSuffixVi} (Bài ${dayNumber})`,
          titleEn: `${pattern.titleSuffixEn} (Lesson ${dayNumber})`,
          dayNumber,
          xpReward: pattern.type === 'chest' ? 30 : pattern.type === 'boss' ? 80 : 50,
          session,
          status,
          x: coord.x,
          y: coord.y
        });

        if (pattern.type !== 'chest') {
          currentGlobalDay++;
        }
      }

      list.push({
        id: unitId,
        unitNumber: u,
        titleVi,
        titleEn,
        level,
        themeColor,
        guidebookTip,
        nodes
      });
    }

    return list;
  }, [track, renderedUnitsCount, completedSet]);

  // Handle clicking a node
  const handleNodeClick = (node: PathNode) => {
    if (node.type === 'chest') {
      if (openedChests[node.id]) {
        playAudioCue('click');
        return;
      }
      playAudioCue('quest');
      addXp(30);
      setOpenedChests(prev => ({ ...prev, [node.id]: true }));
      setChestModal({ open: true, xp: 30, gems: 10 });
      return;
    }

    if (node.status === 'locked') {
      playAudioCue('wrong');
      setSelectedNode(node);
      return;
    }

    // Direct 1-click start for the active current lesson!
    if (node.status === 'current') {
      playAudioCue('click');
      onStartSession(node.session);
      return;
    }

    // Completed lesson: open preview/review modal
    playAudioCue('click');
    setSelectedNode(node);
  };

  // Unit Theme Color Classes with Biome Identity
  const getUnitThemeStyles = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          biomeName: 'Rừng Xanh Khởi Đầu',
          biomeIcon: '🌲',
          headerBg: 'bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 border-b-[6px] border-emerald-800',
          badgeBg: 'bg-emerald-900/60 text-white',
          glowColor: 'rgba(16, 185, 129, 0.15)',
          pathColor: '#10b981'
        };
      case 'indigo':
        return {
          biomeName: 'Thành Cổ Ngữ Pháp',
          biomeIcon: '🏰',
          headerBg: 'bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-700 border-b-[6px] border-indigo-800',
          badgeBg: 'bg-indigo-900/60 text-white',
          glowColor: 'rgba(99, 102, 241, 0.15)',
          pathColor: '#6366f1'
        };
      case 'purple':
        return {
          biomeName: 'Thung Lũng Tinh Hoa',
          biomeIcon: '🔮',
          headerBg: 'bg-gradient-to-r from-purple-600 via-purple-600 to-violet-700 border-b-[6px] border-purple-800',
          badgeBg: 'bg-purple-900/60 text-white',
          glowColor: 'rgba(168, 85, 247, 0.15)',
          pathColor: '#a855f7'
        };
      case 'amber':
        return {
          biomeName: 'Ốc Đảo Sa Mạc',
          biomeIcon: '🏜️',
          headerBg: 'bg-gradient-to-r from-amber-500 via-amber-500 to-orange-600 border-b-[6px] border-amber-700',
          badgeBg: 'bg-amber-900/60 text-white',
          glowColor: 'rgba(245, 158, 11, 0.15)',
          pathColor: '#f59e0b'
        };
      case 'rose':
        return {
          biomeName: 'Vườn Hoa Hoàng Gia',
          biomeIcon: '🌹',
          headerBg: 'bg-gradient-to-r from-rose-500 via-rose-500 to-pink-700 border-b-[6px] border-rose-700',
          badgeBg: 'bg-rose-900/60 text-white',
          glowColor: 'rgba(244, 63, 94, 0.15)',
          pathColor: '#f43f5e'
        };
      default:
        return {
          biomeName: 'Đại Dương Vô Tận',
          biomeIcon: '🌊',
          headerBg: 'bg-gradient-to-r from-sky-500 via-sky-500 to-cyan-700 border-b-[6px] border-sky-700',
          badgeBg: 'bg-sky-900/60 text-white',
          glowColor: 'rgba(14, 165, 233, 0.15)',
          pathColor: '#0ea5e9'
        };
    }
  };

  // Environment Scenery Elements for Biomes
  const getSceneryDecor = (unitNumber: number, nodeIndex: number) => {
    const biome = (unitNumber - 1) % 6;
    // Biome 0: Emerald Forest, 1: Sky Citadel, 2: Crystal Caves, 3: Desert Oasis, 4: Rose Garden, 5: Ocean Isle
    const decorMap = [
      ['🌲', '🍄', '🌸', '🏕️', '🌿'],
      ['🏰', '☁️', '🕊️', '🌈', '⭐'],
      ['🔮', '✨', '🏮', '💎', '🕯️'],
      ['🌴', '🏺', '⛺', '☀️', '🌵'],
      ['🌹', '🏛️', '🦋', '⛲', '🌷'],
      ['⛵', '🐚', '🐬', '🌊', '🏝️']
    ];
    const items = decorMap[biome];
    return items[nodeIndex % items.length];
  };

  // Smooth SVG S-Curve Path String
  const svgCurvePath = useMemo(() => {
    return 'M 180 75 C 180 127.5, 110 127.5, 110 180 C 110 232.5, 130 232.5, 130 285 C 130 337.5, 235 337.5, 235 390 C 235 442.5, 250 442.5, 250 495 C 250 547.5, 180 547.5, 180 600';
  }, []);

  // Find the active current node across the whole roadmap
  const currentNode = useMemo(() => {
    return units.flatMap(u => u.nodes).find(n => n.status === 'current') || units[0]?.nodes[0];
  }, [units]);

  return (
    <div className="relative max-w-xl mx-auto pb-24 select-none animate-fade-in-up">
      {/* Sleek Duolingo Sticky HUD */}
      <div className="sticky top-16 z-30 mb-8 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-stone-200/90 dark:border-slate-800 shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            onClick={() => {
              playAudioCue('click');
              setSpeechIdx((prev) => (prev + 1) % speechQuotes.length);
            }}
            className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-lg shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition"
            title="Nhấn để trò chuyện cùng Linh vật Cú Lingora!"
          >
            🦉
          </div>
          <span className="text-xs font-bold text-stone-800 dark:text-stone-100 uppercase tracking-tight hidden sm:inline">
            {track === 'ielts' ? 'Hải Trình IELTS' : 'Hải Trình HSK'}
          </span>

          {/* Direct 1-Click Start Lesson Button */}
          {currentNode && (
            <button
              onClick={() => {
                playAudioCue('click');
                onStartSession(currentNode.session);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#58cc02] hover:bg-[#46a302] active:scale-95 text-white font-extrabold text-xs shadow-sm shadow-emerald-500/20 border-b-2 border-[#3d8c01] transition-all cursor-pointer"
              title={`Bắt đầu học ngay: ${currentNode.titleVi}`}
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Học Bài {currentNode.dayNumber}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 font-bold text-xs">
            <Crown className="w-3.5 h-3.5 fill-amber-500" />
            <span>{completedSet.size} bài</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 font-bold text-xs">
            <Flame className="w-3.5 h-3.5 fill-rose-500 animate-flame" />
            <span>{profile.streak} ngày</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/40 text-sky-600 dark:text-sky-400 font-bold text-xs">
            <span>💎 {profile.xp}</span>
          </div>
        </div>
      </div>

      {/* Render All Units Continuously */}
      <div className="space-y-12">
        {units.map((unit) => {
          const theme = getUnitThemeStyles(unit.themeColor);
          const unitCompletedCount = unit.nodes.filter(n => n.status === 'completed').length;

          return (
            <div key={unit.id} className="relative">
              {/* Unit Header Card (Adventure Island Banner) */}
              <div className={`rounded-3xl p-5 text-white shadow-lg ${theme.headerBg} relative overflow-hidden mb-8`}>
                {/* Ambient Soft Glow Behind Banner */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${theme.badgeBg}`}>
                        {theme.biomeIcon} Chương {unit.unitNumber} • {theme.biomeName}
                      </span>
                      <span className="text-[11px] font-medium text-white/85">
                        {unit.level}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight leading-snug">
                      {unit.titleVi}
                    </h3>
                    
                    {/* Chapter Progress Bar */}
                    <div className="flex items-center gap-2 pt-1 max-w-xs">
                      <div className="flex-1 h-2 bg-black/25 rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${Math.round((unitCompletedCount / unit.nodes.length) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-white/90">
                        {unitCompletedCount}/{unit.nodes.length} bài
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: Quick Start (if contains current) + Guidebook */}
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    {unit.nodes.some(n => n.status === 'current') && (
                      <button
                        onClick={() => {
                          const curr = unit.nodes.find(n => n.status === 'current');
                          if (curr) {
                            playAudioCue('click');
                            onStartSession(curr.session);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#58cc02] hover:bg-[#46a302] text-white font-extrabold text-xs border-b-[3px] border-[#3d8c01] active:border-b-0 active:translate-y-[3px] transition shadow-md cursor-pointer"
                        title="Bắt đầu học ngay bài hiện tại của chương này!"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Bắt Đầu Học</span>
                      </button>
                    )}

                    {/* Guidebook Button */}
                    <button
                      onClick={() => {
                        playAudioCue('click');
                        setActiveGuidebookUnit(unit);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-stone-900 font-bold text-xs hover:bg-stone-50 border-b-[3px] border-stone-300 active:border-b-0 active:translate-y-[3px] transition shadow-md shrink-0 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>Cẩm Nang</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Winding Snake Path Stage */}
              <div className="relative w-[360px] h-[670px] mx-auto my-2">
                {/* SVG Connecting Cobblestone Road */}
                <svg
                  className="absolute inset-0 w-[360px] h-[670px] pointer-events-none z-0"
                  viewBox="0 0 360 670"
                  fill="none"
                >
                  {/* Layer 1: Ground Trail Soft Shadow */}
                  <path
                    d={svgCurvePath}
                    stroke="#cbd5e1"
                    strokeWidth="32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-slate-800/90"
                  />
                  {/* Layer 2: Cobblestone Road Bed */}
                  <path
                    d={svgCurvePath}
                    stroke="#f8fafc"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dark:stroke-slate-700"
                  />
                  {/* Layer 3: Flowing Cobblestone Dashes */}
                  <path
                    d={svgCurvePath}
                    stroke="#94a3b8"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="6 14"
                    className="dark:stroke-slate-400 animate-road-flow opacity-70"
                  />
                </svg>

                {/* Render Nodes & Scenery positioned exactly along the road */}
                {unit.nodes.map((node, nodeIdx) => {
                  const isCurrent = node.status === 'current';
                  const isCompleted = node.status === 'completed';
                  const isLocked = node.status === 'locked';
                  const isChest = node.type === 'chest';
                  const isBoss = node.type === 'boss';
                  const isChestOpened = isChest && openedChests[node.id];

                  // Scenery sticker positioned opposite to the node
                  const isLeftNode = node.x < 180;
                  const decorEmoji = getSceneryDecor(unit.unitNumber, nodeIdx);
                  const decorX = isLeftNode ? 275 : 70;

                  return (
                    <React.Fragment key={node.id}>
                      {/* Scenery Flora / Fauna / Architecture on opposite side */}
                      {node.type !== 'boss' && (
                        <div
                          className="absolute z-0 pointer-events-none flex flex-col items-center justify-center transition-transform hover:scale-125 duration-300"
                          style={{
                            left: `${decorX}px`,
                            top: `${node.y}px`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <span
                            className="text-2xl drop-shadow-sm filter select-none animate-float-slow"
                            style={{ animationDelay: `${nodeIdx * 0.4}s` }}
                          >
                            {decorEmoji}
                          </span>
                        </div>
                      )}

                      {/* 3D Duolingo Button Node Container */}
                      <div
                        className="absolute z-10"
                        style={{
                          left: `${node.x}px`,
                          top: `${node.y}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {/* Intelligent Mascot Owl Placement beside CURRENT node */}
                        {isCurrent && (
                          <div
                            onClick={() => {
                              playAudioCue('click');
                              setSpeechIdx((prev) => (prev + 1) % speechQuotes.length);
                            }}
                            className={`absolute -top-3 z-30 flex items-center gap-2 animate-float-slow cursor-pointer select-none ${
                              isLeftNode ? 'left-20' : '-left-48'
                            }`}
                          >
                            {isLeftNode ? (
                              <>
                                <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-xl border-2 border-white dark:border-slate-800 hover:scale-110 active:scale-95 transition-transform shrink-0">
                                  🦉
                                </div>
                                <div className="px-3 py-1.5 rounded-2xl bg-stone-900 text-white text-[11px] font-semibold whitespace-nowrap shadow-xl relative border border-stone-700">
                                  {speechQuotes[speechIdx]}
                                  <div className="absolute top-1/2 -left-1 w-2 h-2 bg-stone-900 rotate-45 -translate-y-1/2 border-l border-b border-stone-700" />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="px-3 py-1.5 rounded-2xl bg-stone-900 text-white text-[11px] font-semibold whitespace-nowrap shadow-xl relative border border-stone-700">
                                  {speechQuotes[speechIdx]}
                                  <div className="absolute top-1/2 -right-1 w-2 h-2 bg-stone-900 rotate-45 -translate-y-1/2 border-r border-t border-stone-700" />
                                </div>
                                <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-xl border-2 border-white dark:border-slate-800 hover:scale-110 active:scale-95 transition-transform shrink-0">
                                  🦉
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        {/* Floating "BẮT ĐẦU" Badge Tag pointing directly down to CURRENT node - Fully interactive */}
                        {isCurrent && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playAudioCue('click');
                              onStartSession(node.session);
                            }}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 cursor-pointer animate-bounce-subtle focus:outline-none group/badge"
                            title="Bắt đầu học ngay bài này!"
                          >
                            <div className="px-3.5 py-1.5 rounded-full bg-[#58cc02] group-hover/badge:bg-[#46a302] active:scale-95 text-white text-[11px] font-black uppercase tracking-wider shadow-lg whitespace-nowrap flex items-center gap-1.5 border-2 border-white dark:border-slate-800 transition-all">
                              <span>BẮT ĐẦU</span>
                              <span className="text-xs animate-pulse">⚡</span>
                            </div>
                            <div className="w-2.5 h-2.5 bg-[#58cc02] rotate-45 mx-auto -mt-1.5 border-r border-b border-white dark:border-slate-800" />
                          </button>
                        )}

                        {/* 3D Tactile Button */}
                        <button
                          onClick={() => handleNodeClick(node)}
                          className={`group relative flex items-center justify-center transition-all duration-150 active:translate-y-[6px] active:border-b-[2px] ${
                            isBoss ? 'w-20 h-20' : 'w-16 h-16'
                          } rounded-full font-bold text-white select-none ${
                            isCompleted
                              ? 'bg-[#ffc800] border-b-[8px] border-[#d49700] hover:brightness-105 shadow-md hover:scale-105'
                              : isCurrent
                              ? 'bg-[#58cc02] border-b-[8px] border-[#46a302] hover:brightness-105 shadow-lg animate-pulse-glow ring-4 ring-emerald-400/50 hover:scale-105'
                              : isChest
                              ? isChestOpened
                                ? 'bg-amber-100 dark:bg-amber-950/40 border-b-[6px] border-amber-300 dark:border-amber-800 text-amber-700'
                                : 'bg-gradient-to-b from-amber-400 to-amber-500 border-b-[8px] border-amber-700 hover:brightness-105 shadow-lg hover-wiggle'
                              : 'bg-stone-200 dark:bg-slate-700 border-b-[8px] border-stone-300 dark:border-slate-800 text-stone-400 dark:text-stone-500 cursor-pointer hover:bg-stone-300 dark:hover:bg-slate-600'
                          }`}
                        >
                          {/* Glossy Top Glass Crescent Highlight */}
                          <div className="absolute top-1.5 left-2.5 right-2.5 h-3.5 rounded-full bg-white/30 pointer-events-none" />

                          {/* Node Icon */}
                          {isCompleted ? (
                            isBoss ? (
                              <Trophy className="w-8 h-8 fill-white text-white drop-shadow" />
                            ) : (
                              <Crown className="w-7 h-7 fill-white text-white drop-shadow" />
                            )
                          ) : isCurrent ? (
                            isBoss ? (
                              <Trophy className="w-8 h-8 fill-white text-white animate-pulse" />
                            ) : (
                              <Star className="w-7 h-7 fill-white text-white drop-shadow" />
                            )
                          ) : isChest ? (
                            <Gift className={`w-7 h-7 ${isChestOpened ? 'text-amber-500' : 'text-white'}`} />
                          ) : isLocked ? (
                            <Lock className="w-6 h-6 text-stone-400 dark:text-stone-500" />
                          ) : (
                            <Star className="w-6 h-6 text-white" />
                          )}

                          {/* 3 Golden Stars floating above completed nodes */}
                          {isCompleted && (
                            <div className="absolute -top-3 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-stone-900 text-amber-400 text-[10px] font-bold shadow-xs">
                              <Star className="w-2.5 h-2.5 fill-amber-400" />
                              <Star className="w-2.5 h-2.5 fill-amber-400" />
                              <Star className="w-2.5 h-2.5 fill-amber-400" />
                            </div>
                          )}
                        </button>

                        {/* Node Label Below */}
                        <button
                          type="button"
                          onClick={() => handleNodeClick(node)}
                          className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 tracking-tight whitespace-nowrap cursor-pointer focus:outline-none"
                        >
                          {isChest ? 'Rương Quà' : isBoss ? 'Về Đích' : `Bài ${node.nodeIndex + 1}`}
                        </button>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Milestone Checkpoint Archway between Units */}
              <div className="my-8 flex items-center justify-center">
                <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-amber-50 dark:from-slate-800/90 dark:via-slate-800 dark:to-slate-800/90 border border-amber-300/80 dark:border-amber-700/60 text-stone-800 dark:text-stone-200 text-xs font-semibold shadow-sm hover:scale-[1.02] transition-transform">
                  <span className="text-xl">🏆</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-stone-900 dark:text-stone-100">Hoàn Thành Chương {unit.unitNumber}</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400">Mốc kiểm tra kiến thức toàn diện</span>
                  </div>
                  <span className="text-amber-600 dark:text-amber-400 font-bold bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 rounded-xl text-xs ml-2 border border-amber-200 dark:border-amber-900/50">
                    +80 XP
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Infinite Load More Units Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            playAudioCue('click');
            setRenderedUnitsCount((prev) => prev + 6);
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#58cc02] border-b-[6px] border-[#46a302] hover:brightness-105 active:border-b-0 active:translate-y-[6px] text-white font-bold text-sm shadow-lg transition"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Tải Thêm 6 Chương Tiếp Theo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Duolingo Interactive Node Popup Card */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border-2 border-stone-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 animate-pop-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon & Title */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase">
                  {selectedNode.status === 'completed'
                    ? '✓ Đã hoàn thành'
                    : selectedNode.status === 'current'
                    ? '🎯 Đang học'
                    : '🔒 Đang khóa'}
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  +{selectedNode.xpReward} XP
                </span>
              </div>

              <h4 className="text-lg font-bold text-stone-900 dark:text-white leading-tight">
                {selectedNode.titleVi}
              </h4>
            </div>

            {/* Target Words Preview Chips */}
            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700 space-y-1.5">
              <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                {track === 'ielts' ? 'Từ vựng & Collocations mục tiêu:' : 'Chữ Hán & Thành ngữ mục tiêu:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.session.cards.slice(0, 5).map((c) => (
                  <span
                    key={c.id}
                    className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-700 text-stone-700 dark:text-stone-200 text-xs font-semibold border border-stone-200 dark:border-slate-600 shadow-2xs"
                  >
                    {c.term}
                  </span>
                ))}
                {selectedNode.session.cards.length > 5 && (
                  <span className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-slate-700 text-stone-500 text-xs font-semibold">
                    +{selectedNode.session.cards.length - 5} từ nữa
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {selectedNode.status === 'locked' ? (
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-center text-xs font-semibold text-rose-600 dark:text-rose-400">
                🔒 Hãy hoàn thành các bài trước để mở khóa bước này!
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  playAudioCue('click');
                  const s = selectedNode.session;
                  setSelectedNode(null);
                  onStartSession(s);
                }}
                className="w-full py-4 rounded-2xl bg-[#58cc02] hover:bg-[#46a302] border-b-[5px] border-[#3a8402] active:border-b-0 active:translate-y-[5px] text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>{selectedNode.status === 'completed' ? 'ÔN TẬP BÀI NÀY (+10 XP)' : 'VÀO HỌC NGAY (+50 XP)'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Treasure Chest Reward Modal */}
      {chestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-xs rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-400 p-6 text-center shadow-2xl space-y-4 animate-pop-in">
            <div className="text-5xl animate-bounce">
              🎁
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-stone-900 dark:text-white">
                Mở Rương Thành Công!
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Phần thưởng khích lệ của bạn:
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="px-3.5 py-1.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-sm">
                +{chestModal.xp} XP
              </div>
              <div className="px-3.5 py-1.5 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 font-bold text-sm">
                +{chestModal.gems} 💎 Đá Quý
              </div>
            </div>

            <button
              onClick={() => setChestModal(null)}
              className="w-full py-3 rounded-2xl bg-[#58cc02] border-b-[4px] border-[#46a302] active:border-b-0 active:translate-y-[4px] text-white font-bold text-xs shadow-md transition"
            >
              TUYỆT VỜI!
            </button>
          </div>
        </div>
      )}

      {/* Guidebook Modal */}
      {activeGuidebookUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border-2 border-stone-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-pop-in">
            <button
              onClick={() => setActiveGuidebookUnit(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase">
                📖 Cẩm Nang Kiến Thức
              </span>
              <h4 className="text-lg font-bold text-stone-900 dark:text-white">
                {activeGuidebookUnit.titleVi}
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              {activeGuidebookUnit.guidebookTip}
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                Mẫu câu học thuật trọng tâm:
              </h5>
              <div className="space-y-2">
                {activeGuidebookUnit.nodes[0]?.session.cards.slice(0, 3).map((card) => (
                  <div key={card.id} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                      {card.term} {card.phonetic || card.pinyin ? `[${card.phonetic || card.pinyin}]` : ''}: {card.meaningVi}
                    </span>
                    <p className="text-stone-600 dark:text-stone-300 italic text-[11px]">
                      &quot;{card.exampleSentence}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveGuidebookUnit(null)}
              className="w-full py-3 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs shadow-md transition"
            >
              ĐÃ HIỂU
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
