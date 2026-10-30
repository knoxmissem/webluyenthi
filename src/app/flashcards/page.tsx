'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sparkles,
  Plus,
  Search,
  RotateCw,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Flame,
  BookOpen,
  Edit3,
  Trash2,
  Copy,
  FileText,
  Check,
  Layers,
  Volume2,
  Shuffle,
  Timer,
  Trophy,
  Play,
  Lightbulb,
  X,
  Compass,
  AlertCircle
} from 'lucide-react';

export interface OpenQuizCard {
  id: string;
  term: string; // English word or Hanzi
  phonetic?: string; // IPA or Pinyin
  partOfSpeech?: string;
  meaningVi: string;
  exampleSentence?: string;
  exampleVi?: string;
  collocations?: string[];
  mastered?: boolean;
}

export interface OpenQuizDeck {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  track: 'ielts' | 'hsk' | 'both';
  level: string;
  icon: string;
  isCustom?: boolean;
  cards: OpenQuizCard[];
}

// Default Curated Decks
const defaultDecks: OpenQuizDeck[] = [
  {
    id: 'deck-ielts-core',
    title: 'IELTS Band 7.5+ Core Academic',
    titleVi: 'Từ Vựng Học Thuật Cốt Lõi IELTS Band 7.5+',
    description: 'Các từ vựng đắt giá giúp nâng tầm Lexical Resource trong Writing & Speaking.',
    track: 'ielts',
    level: 'Band 7.5+',
    icon: '💎',
    cards: [
      {
        id: 'c1',
        term: 'ubiquitous',
        phonetic: '/juːˈbɪk.wə.təs/',
        partOfSpeech: 'adjective',
        meaningVi: 'Có mặt ở khắp nơi, phổ biến rộng rãi',
        exampleSentence: 'Smartphones have become ubiquitous in modern urban environments.',
        exampleVi: 'Điện thoại thông minh đã trở nên phổ biến ở khắp nơi trong đô thị hiện đại.',
        collocations: ['ubiquitous phenomenon', 'become ubiquitous']
      },
      {
        id: 'c2',
        term: 'mitigate',
        phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
        partOfSpeech: 'verb',
        meaningVi: 'Giảm nhẹ, xoa dịu mức độ nghiêm trọng',
        exampleSentence: 'Governments should invest in renewable energy to mitigate climate risks.',
        exampleVi: 'Chính phủ cần đầu tư năng lượng tái tạo nhằm giảm nhẹ các rủi ro khí hậu.',
        collocations: ['mitigate the impact', 'mitigate climate change']
      },
      {
        id: 'c3',
        term: 'exacerbate',
        phonetic: '/ɪɡˈzæs.ə.beɪt/',
        partOfSpeech: 'verb',
        meaningVi: 'Làm trầm trọng thêm, làm tệ hơn',
        exampleSentence: 'Uncontrolled deforestation will inevitably exacerbate global warming.',
        exampleVi: 'Nạn phá rừng không kiểm soát chắc chắn sẽ làm trầm trọng thêm sự nóng lên toàn cầu.',
        collocations: ['exacerbate the problem', 'exacerbate tensions']
      },
      {
        id: 'c4',
        term: 'paramount',
        phonetic: '/ˈpær.ə.maʊnt/',
        partOfSpeech: 'adjective',
        meaningVi: 'Tối quan trọng, có tầm quan trọng tối cao',
        exampleSentence: 'Ensuring food safety is of paramount importance to public health.',
        exampleVi: 'Bảo đảm an toàn thực phẩm là điều có tầm quan trọng tối cao đối với sức khỏe cộng đồng.',
        collocations: ['of paramount importance', 'paramount concern']
      },
      {
        id: 'c5',
        term: 'detrimental',
        phonetic: '/ˌdet.rɪˈmen.təl/',
        partOfSpeech: 'adjective',
        meaningVi: 'Có hại, gây tổn hại lớn',
        exampleSentence: 'Excessive screen time has a detrimental effect on children’s sleep patterns.',
        exampleVi: 'Thời gian dùng màn hình quá mức gây ảnh hưởng có hại đến giấc ngủ của trẻ.',
        collocations: ['detrimental effect', 'detrimental to health']
      },
      {
        id: 'c6',
        term: 'substantiate',
        phonetic: '/səbˈstæn.ʃi.eɪt/',
        partOfSpeech: 'verb',
        meaningVi: 'Chứng minh bằng chứng cứ xác thực',
        exampleSentence: 'The researcher provided empirical data to substantiate her hypothesis.',
        exampleVi: 'Nhà nghiên cứu đã cung cấp số liệu thực nghiệm để chứng minh giả thuyết của mình.',
        collocations: ['substantiate the claim', 'substantiate findings']
      }
    ]
  },
  {
    id: 'deck-ielts-collocations',
    title: 'Writing Task 2 Academic Collocations',
    titleVi: 'Collocations Vàng Cho IELTS Writing Task 2',
    description: 'Các cụm từ cố định tự nhiên thay thế các diễn đạt mộc mạc.',
    track: 'ielts',
    level: 'Band 8.0',
    icon: '✍️',
    cards: [
      {
        id: 'cl1',
        term: 'pose a severe threat to',
        phonetic: '/poʊz ə sɪˈvɪr θret tuː/',
        partOfSpeech: 'phrase',
        meaningVi: 'Gây ra mối đe dọa nghiêm trọng đối với...',
        exampleSentence: 'Plastic pollution poses a severe threat to marine ecosystems.',
        exampleVi: 'Ô nhiễm rác thải nhựa gây ra mối đe dọa nghiêm trọng cho hệ sinh thái biển.',
        collocations: ['pose a threat', 'severe threat']
      },
      {
        id: 'cl2',
        term: 'play a pivotal role in',
        phonetic: '/pleɪ ə ˈpɪv.ə.t̬əl roʊl ɪn/',
        partOfSpeech: 'phrase',
        meaningVi: 'Đóng vai trò then chốt, cốt tử trong...',
        exampleSentence: 'Early childhood education plays a pivotal role in shaping cognitive abilities.',
        exampleVi: 'Giáo dục mầm non đóng vai trò then chốt trong việc hình thành năng lực nhận thức.',
        collocations: ['pivotal role', 'play a crucial role']
      },
      {
        id: 'cl3',
        term: 'bridge the gap between',
        phonetic: '/brɪdʒ ðə ɡæp bɪˈtwiːn/',
        partOfSpeech: 'phrase',
        meaningVi: 'Thu hẹp khoảng cách giữa...',
        exampleSentence: 'Government subsidies can help bridge the gap between affluent and poor students.',
        exampleVi: 'Các khoản trợ cấp có thể giúp thu hẹp khoảng cách giữa học sinh khá giả và nghèo khó.',
        collocations: ['bridge the divide', 'narrow the gap']
      },
      {
        id: 'cl4',
        term: 'reap substantial benefits',
        phonetic: '/riːp səbˈstæn.ʃəl ˈben.ə.fɪts/',
        partOfSpeech: 'phrase',
        meaningVi: 'Gặt hái được những lợi ích to lớn',
        exampleSentence: 'Countries investing in green energy will reap substantial economic benefits.',
        exampleVi: 'Các quốc gia đầu tư vào năng lượng xanh sẽ gặt hái được những lợi ích kinh tế to lớn.',
        collocations: ['reap benefits', 'reap rewards']
      },
      {
        id: 'cl5',
        term: 'exert upward pressure on',
        phonetic: '/ɪɡˈzɝːt ˈʌp.wɚd ˈpreʃ.ɚ ɑːn/',
        partOfSpeech: 'phrase',
        meaningVi: 'Gây áp lực tăng lên đối với...',
        exampleSentence: 'Population growth exerts upward pressure on housing prices in metropolitan areas.',
        exampleVi: 'Sự gia tăng dân số gây áp lực tăng giá đối với thị trường nhà ở tại các đô thị lớn.',
        collocations: ['exert pressure', 'upward pressure']
      }
    ]
  },
  {
    id: 'deck-hsk-foundation',
    title: 'HSK 1–2 Từ Vựng Nền Tảng (3.0)',
    titleVi: 'Từ Vựng Giao Tiếp HSK 1–2 Cơ Bản',
    description: 'Chữ Hán, pinyin và các câu giao tiếp đời sống chuẩn đề cương HSK 3.0.',
    track: 'hsk',
    level: 'HSK 1-2',
    icon: '🐼',
    cards: [
      {
        id: 'h1',
        term: '你好',
        phonetic: 'nǐ hǎo',
        partOfSpeech: 'phrase',
        meaningVi: 'Xin chào',
        exampleSentence: '你好！很高兴认识你。',
        exampleVi: 'Xin chào! Rất vui được làm quen với bạn.'
      },
      {
        id: 'h2',
        term: '谢谢',
        phonetic: 'xièxie',
        partOfSpeech: 'verb',
        meaningVi: 'Cảm ơn',
        exampleSentence: '太谢谢你的帮助了。',
        exampleVi: 'Rất cảm ơn sự giúp đỡ của bạn.'
      },
      {
        id: 'h3',
        term: '帮助',
        phonetic: 'bāngzhù',
        partOfSpeech: 'verb / noun',
        meaningVi: 'Giúp đỡ, sự hỗ trợ',
        exampleSentence: '我们需要互相帮助。',
        exampleVi: 'Chúng ta cần phải giúp đỡ lẫn nhau.'
      },
      {
        id: 'h4',
        term: '已经',
        phonetic: 'yǐjīng',
        partOfSpeech: 'adverb',
        meaningVi: 'Đã, rồi',
        exampleSentence: '我已经准备好出发了。',
        exampleVi: 'Tôi đã chuẩn bị sẵn sàng để xuất phát rồi.'
      },
      {
        id: 'h5',
        term: '觉得',
        phonetic: 'juéde',
        partOfSpeech: 'verb',
        meaningVi: 'Cảm thấy, cho rằng',
        exampleSentence: '我觉得中文很有意思。',
        exampleVi: 'Tôi cảm thấy tiếng Trung rất thú vị.'
      },
      {
        id: 'h6',
        term: '学校',
        phonetic: 'xuéxiào',
        partOfSpeech: 'noun',
        meaningVi: 'Trường học',
        exampleSentence: '我们的学校非常漂亮。',
        exampleVi: 'Trường học của chúng tôi rất đẹp.'
      }
    ]
  },
  {
    id: 'deck-hsk-intermediate',
    title: 'HSK 3–4 Từ Vựng Trung Cấp (3.0)',
    titleVi: 'Từ Vựng HSK 3–4 Đọc Báo & Đời Sống',
    description: 'Cấu trúc câu dài, liên từ logic và từ trừu tượng thường gặp trong đề thi.',
    track: 'hsk',
    level: 'HSK 3-4',
    icon: '🐉',
    cards: [
      {
        id: 'h3-1',
        term: '坚持',
        phonetic: 'jiānchí',
        partOfSpeech: 'verb',
        meaningVi: 'Kiên trì, bền bỉ',
        exampleSentence: '只要坚持练习，你的汉语水平就会显著提高。',
        exampleVi: 'Chỉ cần kiên trì luyện tập, trình độ tiếng Trung của bạn sẽ tiến bộ rõ rệt.'
      },
      {
        id: 'h3-2',
        term: '环境',
        phonetic: 'huánjìng',
        partOfSpeech: 'noun',
        meaningVi: 'Môi trường',
        exampleSentence: '保护生态环境是每个公民的责任。',
        exampleVi: 'Bảo vệ môi trường sinh thái là trách nhiệm của mỗi công dân.'
      },
      {
        id: 'h3-3',
        term: '改善',
        phonetic: 'gǎishàn',
        partOfSpeech: 'verb',
        meaningVi: 'Cải thiện, làm cho tốt hơn',
        exampleSentence: '坚持跑步运动可以显著改善睡眠质量。',
        exampleVi: 'Kiên trì chạy bộ có thể cải thiện rõ rệt chất lượng giấc ngủ.'
      },
      {
        id: 'h3-4',
        term: '逐渐',
        phonetic: 'zhújiàn',
        partOfSpeech: 'adverb',
        meaningVi: 'Dần dần, từ từ',
        exampleSentence: '随着春天的到来，天气逐渐变暖和了。',
        exampleVi: 'Cùng với mùa xuân tới, thời tiết dần dần trở nên ấm áp.'
      },
      {
        id: 'h3-5',
        term: '终于',
        phonetic: 'zhōngyú',
        partOfSpeech: 'adverb',
        meaningVi: 'Cuối cùng (sau nhiều nỗ lực)',
        exampleSentence: '经过几个月的努力，他终于通过了HSK考试。',
        exampleVi: 'Trải qua nhiều tháng nỗ lực, cuối cùng anh ấy cũng đã đỗ kỳ thi HSK.'
      }
    ]
  }
];

export default function OpenQuizVocabHubPage() {
  const { playAudioCue, addXp } = useLearner();
  const { t } = useLanguage();

  // Storage for custom decks
  const [customDecks, setCustomDecks] = useState<OpenQuizDeck[]>([]);
  const [mounted, setMounted] = useState(false);

  // Deck category filter: 'all' | 'ielts' | 'hsk' | 'custom'
  const [activeCategory, setActiveCategory] = useState<'all' | 'ielts' | 'hsk' | 'custom'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Currently Active Deck in Studio
  const [selectedDeck, setSelectedDeck] = useState<OpenQuizDeck | null>(null);

  // Active Quiz / Practice Mode inside selected deck:
  // 'flashcard' | 'quiz' | 'spell' | 'match' | 'list'
  const [studyMode, setStudyMode] = useState<'flashcard' | 'quiz' | 'spell' | 'match' | 'list'>('flashcard');

  // Flashcard mode state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardScores, setCardScores] = useState<Record<string, 'mastered' | 'learning'>>({});

  // Multiple Choice Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Spell / Write mode state
  const [spellIndex, setSpellIndex] = useState(0);
  const [spellInput, setSpellInput] = useState('');
  const [spellChecked, setSpellChecked] = useState(false);
  const [spellIsCorrect, setSpellIsCorrect] = useState(false);
  const [spellShowHint, setSpellShowHint] = useState(false);
  const [spellScore, setSpellScore] = useState(0);

  // Match Pairs Game state
  const [matchCards, setMatchCards] = useState<Array<{ id: string; text: string; pairId: string; type: 'term' | 'meaning'; matched: boolean }>>([]);
  const [matchSelected, setMatchSelected] = useState<number | null>(null);
  const [matchSeconds, setMatchSeconds] = useState(0);
  const [matchCompleted, setMatchCompleted] = useState(false);
  const matchTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Create / Edit Deck Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editDeckId, setEditDeckId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');
  const [modalTrack, setModalTrack] = useState<'ielts' | 'hsk' | 'both'>('ielts');
  const [modalCards, setModalCards] = useState<OpenQuizCard[]>([
    { id: '1', term: '', phonetic: '', meaningVi: '', exampleSentence: '' },
    { id: '2', term: '', phonetic: '', meaningVi: '', exampleSentence: '' }
  ]);
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkBox, setShowBulkBox] = useState(false);

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Load custom decks from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('lingora_custom_vocab_decks');
      if (saved) {
        setCustomDecks(JSON.parse(saved));
      } else {
        // Initialize with a starter custom deck
        const starterCustom: OpenQuizDeck = {
          id: 'deck-custom-my-notes',
          title: 'Từ Vựng Ghi Chú Cá Nhân (Mẫu)',
          titleVi: 'Bộ Thẻ Tự Tạo Của Tôi',
          description: 'Các từ vựng bạn tự thu thập từ bài đọc báo và đề thi.',
          track: 'both',
          level: 'Personal',
          icon: '⭐',
          isCustom: true,
          cards: [
            {
              id: 'my-1',
              term: 'comprehensive',
              phonetic: '/ˌkɑːm.prəˈhen.sɪv/',
              meaningVi: 'Toàn diện, bao quát mọi khía cạnh',
              exampleSentence: 'The report provides a comprehensive overview of the issue.'
            },
            {
              id: 'my-2',
              term: 'pragmatic',
              phonetic: '/præɡˈmæt̬.ɪk/',
              meaningVi: 'Thực tế, thực dụng, coi trọng hiệu quả',
              exampleSentence: 'We need to take a pragmatic approach to solve this challenge.'
            },
            {
              id: 'my-3',
              term: '知行合一',
              phonetic: 'zhī xíng hé yī',
              meaningVi: 'Học đi đôi với hành, hiểu biết và thực hành thống nhất',
              exampleSentence: '学习最重要的原则是知行合一。'
            }
          ]
        };
        setCustomDecks([starterCustom]);
        localStorage.setItem('lingora_custom_vocab_decks', JSON.stringify([starterCustom]));
      }
    } catch (err) {
      console.error('Failed to load custom decks:', err);
    }
  }, []);

  // Save custom decks to localStorage when updated
  const saveCustomDecksToStorage = (updated: OpenQuizDeck[]) => {
    setCustomDecks(updated);
    try {
      localStorage.setItem('lingora_custom_vocab_decks', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save custom decks:', e);
    }
  };

  // All Decks combined (Curated + Custom)
  const allDecks = useMemo(() => {
    return [...customDecks, ...defaultDecks];
  }, [customDecks]);

  // Filtered Decks
  const filteredDecks = useMemo(() => {
    return allDecks.filter(d => {
      const matchCat =
        activeCategory === 'all'
          ? true
          : activeCategory === 'custom'
          ? d.isCustom
          : d.track === activeCategory || d.track === 'both';

      const matchSearch =
        searchQuery.trim() === ''
          ? true
          : (d.title + ' ' + d.description + ' ' + d.cards.map(c => c.term).join(' '))
              .toLowerCase()
              .includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [allDecks, activeCategory, searchQuery]);

  // Open a Deck into Studio
  const handleOpenDeck = (deck: OpenQuizDeck, mode: typeof studyMode = 'flashcard') => {
    playAudioCue('click');
    setSelectedDeck(deck);
    setStudyMode(mode);
    setCardIndex(0);
    setIsFlipped(false);
    resetQuiz(deck);
    resetSpell(deck);
    initMatchGame(deck);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Flashcard Helpers
  const currentCard = selectedDeck?.cards[cardIndex];

  const handleNextCard = () => {
    if (!selectedDeck) return;
    playAudioCue('click');
    setIsFlipped(false);
    setCardIndex(prev => (prev + 1) % selectedDeck.cards.length);
  };

  const handlePrevCard = () => {
    if (!selectedDeck) return;
    playAudioCue('click');
    setIsFlipped(false);
    setCardIndex(prev => (prev - 1 + selectedDeck.cards.length) % selectedDeck.cards.length);
  };

  const handleRateCard = (rating: 'mastered' | 'learning') => {
    if (!currentCard) return;
    if (rating === 'mastered') {
      playAudioCue('correct');
      addXp(10);
      showToast('✓ Đã đánh dấu nhớ từ!');
    } else {
      playAudioCue('wrong');
      showToast('↺ Sẽ ôn tập lại từ này');
    }
    setCardScores(prev => ({ ...prev, [currentCard.id]: rating }));
    handleNextCard();
  };

  // Multiple Choice Quiz Logic
  const resetQuiz = (deck: OpenQuizDeck) => {
    setQuizIndex(0);
    setQuizSelected(null);
    setQuizChecked(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const currentQuizCard = selectedDeck?.cards[quizIndex];

  const quizOptions = useMemo(() => {
    if (!selectedDeck || !currentQuizCard) return [];
    const correct = currentQuizCard.meaningVi;
    // Pick 3 distractors
    const others = selectedDeck.cards
      .filter(c => c.id !== currentQuizCard.id)
      .map(c => c.meaningVi);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const all = [correct, ...shuffledOthers].sort(() => 0.5 - Math.random());
    return all;
  }, [selectedDeck, currentQuizCard]);

  const handleSelectQuizOption = (optIdx: number) => {
    if (quizChecked) return;
    playAudioCue('click');
    setQuizSelected(optIdx);
  };

  const handleCheckQuizAnswer = () => {
    if (quizSelected === null || quizChecked || !currentQuizCard) return;
    const isCorrect = quizOptions[quizSelected] === currentQuizCard.meaningVi;
    if (isCorrect) {
      playAudioCue('correct');
      addXp(15);
      setQuizScore(prev => prev + 1);
    } else {
      playAudioCue('wrong');
    }
    setQuizChecked(true);
  };

  const handleNextQuizQuestion = () => {
    if (!selectedDeck) return;
    playAudioCue('click');
    if (quizIndex < selectedDeck.cards.length - 1) {
      setQuizIndex(prev => prev + 1);
      setQuizSelected(null);
      setQuizChecked(false);
    } else {
      setQuizCompleted(true);
      playAudioCue('quest');
    }
  };

  // Spell / Write Mode Logic
  const resetSpell = (deck: OpenQuizDeck) => {
    setSpellIndex(0);
    setSpellInput('');
    setSpellChecked(false);
    setSpellIsCorrect(false);
    setSpellShowHint(false);
    setSpellScore(0);
  };

  const currentSpellCard = selectedDeck?.cards[spellIndex];

  const handleCheckSpell = () => {
    if (!currentSpellCard || spellChecked) return;
    const cleanUser = spellInput.trim().toLowerCase();
    const cleanCorrect = currentSpellCard.term.trim().toLowerCase();
    const isRight = cleanUser === cleanCorrect;
    setSpellIsCorrect(isRight);
    setSpellChecked(true);
    if (isRight) {
      playAudioCue('correct');
      addXp(20);
      setSpellScore(prev => prev + 1);
    } else {
      playAudioCue('wrong');
    }
  };

  const handleNextSpellQuestion = () => {
    if (!selectedDeck) return;
    playAudioCue('click');
    if (spellIndex < selectedDeck.cards.length - 1) {
      setSpellIndex(prev => prev + 1);
      setSpellInput('');
      setSpellChecked(false);
      setSpellShowHint(false);
    } else {
      showToast(`Hoàn tất gõ từ! Điểm: ${spellScore + (spellIsCorrect ? 1 : 0)}/${selectedDeck.cards.length}`);
      setStudyMode('list');
    }
  };

  // Match Pairs Game Logic
  const initMatchGame = (deck: OpenQuizDeck) => {
    if (matchTimerRef.current) clearInterval(matchTimerRef.current);
    const chosenCards = deck.cards.slice(0, 6);
    const items: Array<{ id: string; text: string; pairId: string; type: 'term' | 'meaning'; matched: boolean }> = [];
    chosenCards.forEach(c => {
      items.push({ id: `t-${c.id}`, text: c.term, pairId: c.id, type: 'term', matched: false });
      items.push({ id: `m-${c.id}`, text: c.meaningVi, pairId: c.id, type: 'meaning', matched: false });
    });
    // Shuffle
    setMatchCards(items.sort(() => 0.5 - Math.random()));
    setMatchSelected(null);
    setMatchSeconds(0);
    setMatchCompleted(false);

    matchTimerRef.current = setInterval(() => {
      setMatchSeconds(prev => prev + 1);
    }, 1000);
  };

  const handleMatchClick = (idx: number) => {
    if (matchCards[idx].matched) return;
    playAudioCue('click');

    if (matchSelected === null) {
      setMatchSelected(idx);
      return;
    }

    if (matchSelected === idx) {
      setMatchSelected(null);
      return;
    }

    const first = matchCards[matchSelected];
    const second = matchCards[idx];

    // Check if matching pair
    if (first.pairId === second.pairId && first.type !== second.type) {
      playAudioCue('correct');
      addXp(15);
      const updated = matchCards.map((card, i) =>
        i === matchSelected || i === idx ? { ...card, matched: true } : card
      );
      setMatchCards(updated);
      setMatchSelected(null);

      // Check if all matched
      if (updated.every(c => c.matched)) {
        if (matchTimerRef.current) clearInterval(matchTimerRef.current);
        setMatchCompleted(true);
        playAudioCue('quest');
        addXp(50);
      }
    } else {
      playAudioCue('wrong');
      setMatchSelected(null);
    }
  };

  // Create & Edit Custom Deck Logic
  const handleOpenCreateModal = (deckToEdit?: OpenQuizDeck) => {
    playAudioCue('click');
    if (deckToEdit) {
      setEditDeckId(deckToEdit.id);
      setModalTitle(deckToEdit.title);
      setModalDesc(deckToEdit.description);
      setModalTrack(deckToEdit.track);
      setModalCards([...deckToEdit.cards]);
    } else {
      setEditDeckId(null);
      setModalTitle('');
      setModalDesc('');
      setModalTrack('ielts');
      setModalCards([
        { id: '1', term: '', phonetic: '', meaningVi: '', exampleSentence: '' },
        { id: '2', term: '', phonetic: '', meaningVi: '', exampleSentence: '' },
        { id: '3', term: '', phonetic: '', meaningVi: '', exampleSentence: '' }
      ]);
    }
    setBulkInput('');
    setShowBulkBox(false);
    setShowCreateModal(true);
  };

  const handleAddCardRow = () => {
    setModalCards(prev => [
      ...prev,
      { id: String(Date.now() + Math.random()), term: '', phonetic: '', meaningVi: '', exampleSentence: '' }
    ]);
  };

  const handleRemoveCardRow = (idx: number) => {
    setModalCards(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCardFieldChange = (idx: number, field: keyof OpenQuizCard, val: string) => {
    setModalCards(prev =>
      prev.map((card, i) => (i === idx ? { ...card, [field]: val } : card))
    );
  };

  // Bulk Import Parser
  const handleParseBulk = () => {
    if (!bulkInput.trim()) return;
    const lines = bulkInput.split('\n').filter(l => l.trim().length > 0);
    const newCards: OpenQuizCard[] = [];

    lines.forEach((line, idx) => {
      // Supports delimiters: " - ", " : ", " | ", "\t"
      const parts = line.split(/\s*[-:|]\s*|\t+/);
      if (parts.length >= 2) {
        const term = parts[0].trim();
        const meaning = parts[parts.length - 1].trim();
        const phonetic = parts.length > 2 ? parts[1].trim() : '';
        newCards.push({
          id: `bulk-${Date.now()}-${idx}`,
          term,
          phonetic,
          meaningVi: meaning,
          exampleSentence: ''
        });
      }
    });

    if (newCards.length > 0) {
      setModalCards(prev => [...prev.filter(c => c.term.trim()), ...newCards]);
      setBulkInput('');
      setShowBulkBox(false);
      showToast(`Đã tự động tạo ${newCards.length} thẻ từ!`);
    } else {
      showToast('Không nhận diện được định dạng. Vui lòng nhập: Từ - Nghĩa');
    }
  };

  // Save Deck
  const handleSaveDeck = () => {
    if (!modalTitle.trim()) {
      showToast('Vui lòng nhập tên bộ thẻ!');
      return;
    }

    const validCards = modalCards.filter(c => c.term.trim() && c.meaningVi.trim());
    if (validCards.length === 0) {
      showToast('Vui lòng nhập ít nhất 1 từ kèm nghĩa!');
      return;
    }

    playAudioCue('correct');
    addXp(30);

    if (editDeckId) {
      // Update existing
      const updated = customDecks.map(d =>
        d.id === editDeckId
          ? {
              ...d,
              title: modalTitle,
              titleVi: modalTitle,
              description: modalDesc || 'Bộ từ tự tạo cá nhân',
              track: modalTrack,
              cards: validCards
            }
          : d
      );
      saveCustomDecksToStorage(updated);
      showToast('Đã lưu thay đổi bộ thẻ!');
      if (selectedDeck?.id === editDeckId) {
        setSelectedDeck(updated.find(d => d.id === editDeckId) || null);
      }
    } else {
      // Create new
      const newDeck: OpenQuizDeck = {
        id: `custom-${Date.now()}`,
        title: modalTitle,
        titleVi: modalTitle,
        description: modalDesc || 'Bộ từ vựng do bạn tự tạo',
        track: modalTrack,
        level: 'Tự tạo',
        icon: modalTrack === 'hsk' ? '🐼' : '⭐',
        isCustom: true,
        cards: validCards
      };
      const updated = [newDeck, ...customDecks];
      saveCustomDecksToStorage(updated);
      showToast('🎉 Đã tạo thành công bộ từ mới!');
      handleOpenDeck(newDeck);
    }

    setShowCreateModal(false);
  };

  const handleDeleteDeck = (deckId: string) => {
    if (!confirm('Bạn có chắc muốn xóa bộ thẻ tự tạo này không?')) return;
    playAudioCue('wrong');
    const updated = customDecks.filter(d => d.id !== deckId);
    saveCustomDecksToStorage(updated);
    if (selectedDeck?.id === deckId) {
      setSelectedDeck(null);
    }
    showToast('Đã xóa bộ thẻ.');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BANNER */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-[#246B5A] dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              OPENQUIZ · VOCABULARY ENGINE
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-900/60">
              Spaced Repetition SM-2
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight mt-1.5">
            Luyện Từ Vựng Thông Minh
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-2xl mt-1 leading-relaxed">
            Học từ vựng IELTS Academic & HSK theo chuẩn OpenQuiz: Flashcard lật 3D, Trắc nghiệm, Gõ chính tả, Ghép thẻ và <strong>tự tạo bộ từ của riêng bạn</strong> để ôn thi cấp tốc.
          </p>
        </div>

        {/* Action Button: Create Custom Deck */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleOpenCreateModal()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-extrabold text-xs shadow-md shadow-teal-900/20 active:scale-95 transition"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tạo bộ từ mới</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. IF A DECK IS SELECTED: OPENQUIZ STUDIO WORKSPACE */}
      {/* ========================================================================= */}
      {selectedDeck ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Deck Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setSelectedDeck(null)}
                className="w-10 h-10 rounded-2xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 flex items-center justify-center text-stone-600 dark:text-stone-300 transition"
                title="Quay lại danh mục bộ thẻ"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedDeck.icon}</span>
                  <h2 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white">
                    {selectedDeck.title}
                  </h2>
                  {selectedDeck.isCustom && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      Tự tạo
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {selectedDeck.cards.length} thuật ngữ · {selectedDeck.description}
                </p>
              </div>
            </div>

            {/* Custom Deck Management Actions */}
            <div className="flex items-center gap-2">
              {selectedDeck.isCustom && (
                <>
                  <button
                    onClick={() => handleOpenCreateModal(selectedDeck)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 text-stone-700 dark:text-stone-200 font-bold text-xs transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Sửa / Thêm từ</span>
                  </button>

                  <button
                    onClick={() => handleDeleteDeck(selectedDeck.id)}
                    className="p-2 rounded-xl border border-stone-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-stone-400 hover:text-rose-500 transition"
                    title="Xóa bộ thẻ này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 5 OpenQuiz Mode Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'flashcard', label: 'Flashcard 3D', icon: Layers },
              { id: 'quiz', label: 'Trắc Nghiệm', icon: CheckCircle2 },
              { id: 'spell', label: 'Gõ Từ & Chính Tả', icon: FileText },
              { id: 'match', label: 'Ghép Thẻ Thần Tốc', icon: Timer },
              { id: 'list', label: 'Danh Sách Thuật Ngữ', icon: BookOpen }
            ].map(m => {
              const Icon = m.icon;
              const isActive = studyMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    playAudioCue('click');
                    setStudyMode(m.id as typeof studyMode);
                    if (m.id === 'quiz') resetQuiz(selectedDeck);
                    if (m.id === 'spell') resetSpell(selectedDeck);
                    if (m.id === 'match') initMatchGame(selectedDeck);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition whitespace-nowrap ${
                    isActive
                      ? 'bg-[#246B5A] text-white shadow-md shadow-teal-900/20'
                      : 'bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* MODE 1: FLASHCARD 3D */}
          {/* ========================================================================= */}
          {studyMode === 'flashcard' && currentCard && (
            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                <span>Thẻ {cardIndex + 1} / {selectedDeck.cards.length}</span>
                <span>Nhấn thẻ hoặc Space để lật</span>
              </div>

              {/* 3D Flip Card Container */}
              <div
                onClick={() => {
                  playAudioCue('click');
                  setIsFlipped(!isFlipped);
                }}
                className="relative w-full h-[340px] sm:h-[380px] rounded-3xl cursor-pointer perspective-1000 select-none group"
              >
                <div
                  className={`relative w-full h-full rounded-3xl transition-transform duration-500 transform-style-3d border-2 shadow-xl ${
                    isFlipped
                      ? 'rotate-y-180 border-amber-300 dark:border-amber-800'
                      : 'border-teal-500/50 hover:border-teal-500'
                  }`}
                >
                  {/* FRONT SIDE (Term) */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-white dark:bg-slate-900 p-8 flex flex-col justify-between backface-hidden">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-400">
                      <span className="uppercase tracking-widest text-[#246B5A] font-black">
                        Thuật ngữ
                      </span>
                      <span>Bấm để xem nghĩa ↺</span>
                    </div>

                    <div className="text-center space-y-2 my-auto">
                      <h3 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
                        {currentCard.term}
                      </h3>
                      {currentCard.phonetic && (
                        <p className="text-sm font-mono text-amber-700 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/60 inline-block px-3 py-1 rounded-xl">
                          {currentCard.phonetic}
                        </p>
                      )}
                    </div>

                    <div className="text-center text-[11px] text-stone-400 font-semibold">
                      Chạm để lật thẻ xem định nghĩa & câu ví dụ
                    </div>
                  </div>

                  {/* BACK SIDE (Definition & Context) */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-[#F5F7F4] via-white to-teal-50/40 dark:from-slate-900 dark:to-teal-950/30 p-8 flex flex-col justify-between rotate-y-180 backface-hidden border border-teal-200 dark:border-teal-900">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-black">
                        Định nghĩa tiếng Việt
                      </span>
                      {currentCard.partOfSpeech && (
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[10px] font-bold">
                          {currentCard.partOfSpeech}
                        </span>
                      )}
                    </div>

                    <div className="space-y-4 my-auto">
                      <p className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white leading-snug">
                        {currentCard.meaningVi}
                      </p>

                      {currentCard.exampleSentence && (
                        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                          <p className="font-bold text-stone-900 dark:text-white leading-relaxed">
                            "{currentCard.exampleSentence}"
                          </p>
                          {currentCard.exampleVi && (
                            <p className="text-stone-500 italic text-[11px]">
                              {currentCard.exampleVi}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-center text-[11px] text-stone-400 font-semibold">
                      Chạm để lật lại mặt trước
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Rating Buttons & Navigation */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => handleRateCard('learning')}
                  className="flex-1 py-3 px-4 rounded-2xl border-2 border-orange-300 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-black text-xs hover:bg-orange-100 transition active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>↺ Chưa nhớ (Học lại)</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevCard}
                    className="w-10 h-10 rounded-2xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 flex items-center justify-center text-stone-700 dark:text-stone-200 font-bold"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextCard}
                    className="w-10 h-10 rounded-2xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 flex items-center justify-center text-stone-700 dark:text-stone-200 font-bold"
                  >
                    →
                  </button>
                </div>

                <button
                  onClick={() => handleRateCard('mastered')}
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-black text-xs shadow-md shadow-teal-900/20 transition active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>✓ Đã nhớ (Thuần thục)</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 2: TRẮC NGHIỆM NHANH (QUIZ MODE) */}
          {/* ========================================================================= */}
          {studyMode === 'quiz' && (
            <div className="max-w-2xl mx-auto space-y-4">
              {quizCompleted ? (
                <div className="rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-4 shadow-lg animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-950 text-[#246B5A] dark:text-teal-400 text-3xl font-black flex items-center justify-center mx-auto">
                    🏆
                  </div>
                  <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                    Hoàn thành bài Trắc nghiệm!
                  </h3>
                  <p className="text-sm text-stone-500">
                    Điểm số: <strong className="text-[#246B5A] text-lg">{quizScore} / {selectedDeck.cards.length}</strong> câu đúng ({Math.round((quizScore / selectedDeck.cards.length) * 100)}%)
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => resetQuiz(selectedDeck)}
                      className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 font-bold text-xs"
                    >
                      Làm lại bài này
                    </button>
                    <button
                      onClick={() => setStudyMode('flashcard')}
                      className="px-5 py-2.5 rounded-xl bg-[#246B5A] text-white font-extrabold text-xs shadow-md"
                    >
                      Trở về Flashcards
                    </button>
                  </div>
                </div>
              ) : currentQuizCard ? (
                <div className="rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 space-y-6 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-400">
                    <span className="uppercase text-[#246B5A] font-black">
                      Câu hỏi {quizIndex + 1} / {selectedDeck.cards.length}
                    </span>
                    <span>Điểm hiện tại: {quizScore}</span>
                  </div>

                  <div className="space-y-1 text-center py-4">
                    <span className="text-xs font-bold text-stone-400 block">Chọn nghĩa đúng của từ:</span>
                    <h3 className="text-3xl font-black text-stone-900 dark:text-white">
                      {currentQuizCard.term}
                    </h3>
                    {currentQuizCard.phonetic && (
                      <p className="text-xs font-mono text-amber-700 dark:text-amber-400">
                        {currentQuizCard.phonetic}
                      </p>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {quizOptions.map((opt, idx) => {
                      const isSelected = quizSelected === idx;
                      const isCorrect = opt === currentQuizCard.meaningVi;
                      const isWrong = quizChecked && isSelected && !isCorrect;

                      let cls = 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-teal-500';
                      if (isSelected && !quizChecked) cls = 'border-[#246B5A] bg-teal-50/50 dark:bg-teal-950/40 text-[#246B5A] font-bold';
                      if (quizChecked && isCorrect) cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold';
                      if (isWrong) cls = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300';

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectQuizOption(idx)}
                          disabled={quizChecked}
                          className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between ${cls}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg border border-stone-200 dark:border-slate-700 flex items-center justify-center font-mono font-bold text-xs">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {quizChecked && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {quizChecked && isWrong && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-2 flex justify-end">
                    {!quizChecked ? (
                      <button
                        onClick={handleCheckQuizAnswer}
                        disabled={quizSelected === null}
                        className="px-6 py-2.5 rounded-xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-extrabold text-xs disabled:opacity-40 shadow-xs"
                      >
                        Kiểm tra đáp án
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuizQuestion}
                        className="px-6 py-2.5 rounded-xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-extrabold text-xs shadow-xs"
                      >
                        {quizIndex === selectedDeck.cards.length - 1 ? 'Xem kết quả ✓' : 'Câu tiếp theo →'}
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 3: GÕ TỪ & CHÍNH TẢ (SPELL MODE) */}
          {/* ========================================================================= */}
          {studyMode === 'spell' && currentSpellCard && (
            <div className="max-w-xl mx-auto space-y-4">
              <div className="rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 space-y-6 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-stone-400">
                  <span className="uppercase text-[#246B5A] font-black">
                    Luyện gõ từ {spellIndex + 1} / {selectedDeck.cards.length}
                  </span>
                  <span>Đúng: {spellScore}</span>
                </div>

                <div className="space-y-2 text-center py-2">
                  <span className="text-xs text-stone-400 font-bold block">Gõ từ tương ứng với nghĩa:</span>
                  <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                    {currentSpellCard.meaningVi}
                  </h3>
                  {currentSpellCard.phonetic && (
                    <p className="text-xs font-mono text-amber-700 dark:text-amber-400">
                      Gợi ý phát âm: {currentSpellCard.phonetic}
                    </p>
                  )}
                </div>

                {/* Input form */}
                <div className="space-y-3">
                  <input
                    type="text"
                    value={spellInput}
                    onChange={e => setSpellInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        if (!spellChecked) handleCheckSpell();
                        else handleNextSpellQuestion();
                      }
                    }}
                    disabled={spellChecked}
                    placeholder="Gõ từ vào đây và nhấn Enter..."
                    className="w-full p-4 rounded-2xl border-2 border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-center text-lg font-black tracking-wide text-stone-900 dark:text-white focus:outline-none focus:border-[#246B5A]"
                  />

                  {spellShowHint && (
                    <p className="text-xs text-center text-amber-600 font-mono font-bold">
                      Gợi ý: Bắt đầu bằng chữ "{currentSpellCard.term.charAt(0)}" ({currentSpellCard.term.length} ký tự)
                    </p>
                  )}
                </div>

                {/* Feedback */}
                {spellChecked && (
                  <div
                    className={`p-4 rounded-2xl border text-xs text-center font-bold space-y-1 ${
                      spellIsCorrect
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-rose-50 text-rose-800 border-rose-300'
                    }`}
                  >
                    <div>{spellIsCorrect ? '✓ Chính xác hoàn hảo!' : '↺ Chưa chính xác!'}</div>
                    <div className="text-sm font-black text-stone-900">
                      Đáp án đúng: <span className="underline">{currentSpellCard.term}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setSpellShowHint(true)}
                    className="text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Xem gợi ý</span>
                  </button>

                  {!spellChecked ? (
                    <button
                      onClick={handleCheckSpell}
                      disabled={!spellInput.trim()}
                      className="px-6 py-2.5 rounded-xl bg-[#246B5A] text-white font-extrabold text-xs disabled:opacity-40"
                    >
                      Kiểm tra
                    </button>
                  ) : (
                    <button
                      onClick={handleNextSpellQuestion}
                      className="px-6 py-2.5 rounded-xl bg-[#246B5A] text-white font-extrabold text-xs"
                    >
                      Từ tiếp theo →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 4: GHÉP THẺ THẦN TỐC (MATCH GAME) */}
          {/* ========================================================================= */}
          {studyMode === 'match' && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-teal-800 dark:text-teal-300">
                  <Timer className="w-4 h-4" />
                  <span>Thời gian: {matchSeconds}s</span>
                </span>
                <button
                  onClick={() => initMatchGame(selectedDeck)}
                  className="text-stone-400 hover:text-stone-700 flex items-center gap-1"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Chơi lại ván mới</span>
                </button>
              </div>

              {matchCompleted ? (
                <div className="rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-4 shadow-xl animate-in zoom-in-95">
                  <div className="text-4xl">⚡</div>
                  <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                    Ghép thẻ hoàn tất xuất sắc!
                  </h3>
                  <p className="text-sm text-stone-500">
                    Thời gian kỷ lục: <strong className="text-teal-700 font-black">{matchSeconds} giây</strong>
                  </p>
                  <button
                    onClick={() => initMatchGame(selectedDeck)}
                    className="px-6 py-3 rounded-2xl bg-[#246B5A] text-white font-extrabold text-xs shadow-md"
                  >
                    Chơi lại ván khác
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {matchCards.map((card, idx) => {
                    if (card.matched) {
                      return (
                        <div
                          key={card.id}
                          className="h-28 rounded-2xl border-2 border-dashed border-emerald-300/40 bg-emerald-50/20 flex items-center justify-center opacity-30 select-none"
                        >
                          <Check className="w-6 h-6 text-emerald-600" />
                        </div>
                      );
                    }

                    const isSelected = matchSelected === idx;

                    return (
                      <div
                        key={card.id}
                        onClick={() => handleMatchClick(idx)}
                        className={`h-28 rounded-2xl p-3 border-2 flex items-center justify-center text-center cursor-pointer transition select-none shadow-xs hover:shadow-md ${
                          isSelected
                            ? 'border-[#246B5A] bg-teal-50 dark:bg-teal-950/60 font-black scale-105'
                            : 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-teal-400'
                        }`}
                      >
                        <span className={`text-xs font-bold leading-snug ${card.type === 'term' ? 'text-stone-900 dark:text-white text-sm' : 'text-stone-600 dark:text-stone-300'}`}>
                          {card.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 5: DANH SÁCH THUẬT NGỮ (TERM LIST) */}
          {/* ========================================================================= */}
          {studyMode === 'list' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                <span>Tổng cộng {selectedDeck.cards.length} thuật ngữ trong bộ thẻ</span>
                {selectedDeck.isCustom && (
                  <button
                    onClick={() => handleOpenCreateModal(selectedDeck)}
                    className="text-[#246B5A] dark:text-teal-400 hover:underline flex items-center gap-1 font-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm từ mới vào bộ thẻ này</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedDeck.cards.map((c, i) => (
                  <div
                    key={c.id || i}
                    className="p-4 rounded-2xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-black text-stone-900 dark:text-white">
                            {c.term}
                          </h4>
                          {c.phonetic && (
                            <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                              {c.phonetic}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-teal-800 dark:text-teal-300 mt-1">
                          {c.meaningVi}
                        </p>
                      </div>
                    </div>

                    {c.exampleSentence && (
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 italic pt-1 border-t border-stone-100 dark:border-slate-800">
                        "{c.exampleSentence}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* 3. CATALOG VIEW: TẤT CẢ CÁC BỘ THẺ & TỰ TẠO */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* Filter Tabs & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-100 dark:bg-slate-800/60 p-2 rounded-2xl border border-stone-200/80 dark:border-slate-800">
            {/* Category tabs */}
            <div className="flex rounded-xl bg-white dark:bg-slate-900 p-1 border border-stone-200/60 dark:border-slate-700">
              {[
                { id: 'all', label: 'Tất cả bộ thẻ' },
                { id: 'custom', label: `Bộ từ của tôi (${customDecks.length})` },
                { id: 'ielts', label: 'IELTS Academic' },
                { id: 'hsk', label: 'HSK Tiếng Trung' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playAudioCue('click');
                    setActiveCategory(cat.id as typeof activeCategory);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeCategory === cat.id
                      ? 'bg-[#246B5A] text-white shadow-2xs font-black'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search filter */}
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Tìm bộ từ, chữ Hán, nghĩa..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Decks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Quick Create Card for User */}
            <div
              onClick={() => handleOpenCreateModal()}
              className="rounded-3xl border-2 border-dashed border-teal-400/60 dark:border-teal-700/60 bg-teal-50/40 dark:bg-teal-950/20 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-950/40 transition group hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#246B5A] text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition">
                <Plus className="w-7 h-7 stroke-[3]" />
              </div>
              <h3 className="text-base font-black text-stone-900 dark:text-white mt-3">
                Tạo Bộ Thẻ Mới Của Bạn
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mt-1">
                Tự thêm các từ vựng cần ôn từ đề thi, bài đọc hoặc nhập nhanh danh sách hàng loạt.
              </p>
            </div>

            {/* Rendered Decks */}
            {filteredDecks.map(deck => (
              <div
                key={deck.id}
                className="rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:border-[#246B5A] dark:hover:border-teal-500 transition hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{deck.icon}</span>
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        deck.isCustom
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          : 'bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                      }`}
                    >
                      {deck.level}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-stone-900 dark:text-white leading-snug">
                      {deck.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                      {deck.description}
                    </p>
                  </div>

                  <div className="text-xs text-stone-400 font-semibold pt-1">
                    {deck.cards.length} thuật ngữ từ vựng
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenDeck(deck, 'flashcard')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-extrabold text-xs text-center shadow-xs transition"
                  >
                    Luyện thẻ 3D
                  </button>

                  <button
                    onClick={() => handleOpenDeck(deck, 'quiz')}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-800 text-stone-800 dark:text-stone-200 font-bold text-xs text-center transition"
                  >
                    Quiz nhanh
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CREATE / EDIT CUSTOM DECK MODAL */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={e => {
            if (e.target === e.currentTarget) setShowCreateModal(false);
          }}
        >
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-stone-900 dark:text-white">
                  {editDeckId ? 'Chỉnh Sửa Bộ Thẻ Của Bạn' : 'Tạo Bộ Thẻ Từ Vựng Mới'}
                </h3>
                <p className="text-xs text-stone-400">
                  Tự thêm các từ vựng cần nhớ để ôn tập theo phương pháp OpenQuiz
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full border border-stone-200 dark:border-slate-700 flex items-center justify-center text-sm font-bold text-stone-500"
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Tên bộ thẻ *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Từ vựng Reading Cam 19 Test 1, HSK 4 từ khó..."
                  value={modalTitle}
                  onChange={e => setModalTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-xs font-semibold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Mô tả bộ thẻ
                  </label>
                  <input
                    type="text"
                    placeholder="Mô tả ngắn gọn về chủ đề..."
                    value={modalDesc}
                    onChange={e => setModalDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Chương trình
                  </label>
                  <select
                    value={modalTrack}
                    onChange={e => setModalTrack(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-xs font-semibold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="ielts">IELTS Academic</option>
                    <option value="hsk">HSK Tiếng Trung</option>
                    <option value="both">Tổng hợp (Chung)</option>
                  </select>
                </div>
              </div>

              {/* Bulk import tool toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowBulkBox(!showBulkBox)}
                  className="text-xs font-bold text-teal-800 dark:text-teal-400 hover:underline flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{showBulkBox ? 'Ẩn ô nhập nhanh' : 'Nhập nhanh hàng loạt từ (Paste list) ⚡'}</span>
                </button>

                {showBulkBox && (
                  <div className="mt-2 p-3.5 rounded-2xl bg-teal-50/70 dark:bg-slate-800/80 border border-teal-200 dark:border-slate-700 space-y-2">
                    <p className="text-[11px] text-teal-900 dark:text-teal-200">
                      Dán danh sách từ theo cú pháp: <code>Từ - Nghĩa</code> (mỗi từ một dòng)
                    </p>
                    <textarea
                      rows={4}
                      value={bulkInput}
                      onChange={e => setBulkInput(e.target.value)}
                      placeholder={`ubiquitous - phổ biến khắp nơi\nmitigate - giảm nhẹ rủi ro\n你好 - xin chào`}
                      className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-stone-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={handleParseBulk}
                      className="px-4 py-1.5 rounded-lg bg-[#246B5A] text-white text-xs font-bold"
                    >
                      Nhập vào danh sách
                    </button>
                  </div>
                )}
              </div>

              {/* Card rows */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-400">
                  <span>Danh sách thẻ từ ({modalCards.length})</span>
                  <button
                    type="button"
                    onClick={handleAddCardRow}
                    className="text-[#246B5A] dark:text-teal-400 hover:underline flex items-center gap-1 font-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Thêm thẻ từ</span>
                  </button>
                </div>

                <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1">
                  {modalCards.map((card, idx) => (
                    <div
                      key={card.id || idx}
                      className="p-3 rounded-2xl border border-stone-200 dark:border-slate-700 bg-stone-50/80 dark:bg-slate-800/50 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-stone-400">
                        <span>Thẻ #{idx + 1}</span>
                        {modalCards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCardRow(idx)}
                            className="text-stone-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Từ / Chữ Hán *"
                          value={card.term}
                          onChange={e => handleCardFieldChange(idx, 'term', e.target.value)}
                          className="px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                        />
                        <input
                          type="text"
                          placeholder="Phát âm / Pinyin / IPA"
                          value={card.phonetic || ''}
                          onChange={e => handleCardFieldChange(idx, 'phonetic', e.target.value)}
                          className="px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                        />
                        <input
                          type="text"
                          placeholder="Nghĩa tiếng Việt *"
                          value={card.meaningVi}
                          onChange={e => handleCardFieldChange(idx, 'meaningVi', e.target.value)}
                          className="px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-teal-800 dark:text-teal-300"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Câu ví dụ minh họa (tùy chọn)..."
                        value={card.exampleSentence || ''}
                        onChange={e => handleCardFieldChange(idx, 'exampleSentence', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 text-xs font-bold"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleSaveDeck}
                className="px-6 py-2.5 rounded-xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-extrabold text-xs shadow-md shadow-teal-900/20"
              >
                Lưu bộ thẻ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D3026] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-3">
          <span>✦</span>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
