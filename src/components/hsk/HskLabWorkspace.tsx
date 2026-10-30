'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';

// Exact HSK Data from LingoDeck — IELTS & HSK Practice.html
export interface HskWordItem {
  hanzi: string;
  pinyin: string;
  meaning: string;
  opts: string[];
  ans: number;
  example: string;
}

export interface HskLevelData {
  title: string;
  desc: string;
  vocab: number;
  words: HskWordItem[];
}

export interface HskReadingQuestion {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface HskReadingPassage {
  title: string;
  passage: string;
  questions: HskReadingQuestion[];
}

export const hskData: Record<number, HskLevelData> = {
  1: {
    title: 'HSK 1 · 入门',
    desc: 'Làm quen với từ vựng nền tảng, đại từ, số đếm và câu giao tiếp đơn giản. HSK 3.0: 300 từ cộng dồn, gồm 300 từ mới ở cấp 1.',
    vocab: 300,
    words: [
      { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'xin chào', opts: ['tạm biệt', 'xin chào', 'cảm ơn', 'xin lỗi'], ans: 1, example: '你好！你好吗？' },
      { hanzi: '谢谢', pinyin: 'xièxie', meaning: 'cảm ơn', opts: ['không có gì', 'xin lỗi', 'cảm ơn', 'ngày mai'], ans: 2, example: '谢谢你。' },
      { hanzi: '学校', pinyin: 'xuéxiào', meaning: 'trường học', opts: ['bệnh viện', 'trường học', 'nhà hàng', 'cửa hàng'], ans: 1, example: '我在学校学习。' }
    ]
  },
  2: {
    title: 'HSK 2 · 初级',
    desc: 'Mở rộng câu giao tiếp hằng ngày, thời gian, địa điểm và hoạt động thường gặp. HSK 3.0: 500 từ cộng dồn, gồm 200 từ mới ở cấp 2.',
    vocab: 500,
    words: [
      { hanzi: '帮助', pinyin: 'bāngzhù', meaning: 'giúp đỡ', opts: ['giúp đỡ', 'bắt đầu', 'chuẩn bị', 'nghỉ ngơi'], ans: 0, example: '谢谢你帮助我。' },
      { hanzi: '已经', pinyin: 'yǐjīng', meaning: 'đã, rồi', opts: ['đang', 'sẽ', 'đã, rồi', 'có lẽ'], ans: 2, example: '我已经吃饭了。' },
      { hanzi: '觉得', pinyin: 'juéde', meaning: 'cảm thấy, cho rằng', opts: ['nghe thấy', 'cảm thấy', 'đọc', 'đợi'], ans: 1, example: '我觉得中文很有意思。' }
    ]
  },
  3: {
    title: 'HSK 3 · 中级',
    desc: 'Đọc câu dài hơn, diễn đạt trải nghiệm, kế hoạch và lý do trong tình huống quen thuộc. HSK 3.0: 1.000 từ cộng dồn, gồm 500 từ mới ở cấp 3.',
    vocab: 1000,
    words: [
      { hanzi: '坚持', pinyin: 'jiānchí', meaning: 'kiên trì', opts: ['thay đổi', 'kiên trì', 'so sánh', 'quên'], ans: 1, example: '只要坚持练习，你就会进步。' },
      { hanzi: '环境', pinyin: 'huánjìng', meaning: 'môi trường', opts: ['môi trường', 'thói quen', 'kết quả', 'nhiệm vụ'], ans: 0, example: '我们应该保护环境。' },
      { hanzi: '终于', pinyin: 'zhōngyú', meaning: 'cuối cùng', opts: ['ngay lập tức', 'thường xuyên', 'cuối cùng', 'đặc biệt'], ans: 2, example: '他终于完成了作业。' }
    ]
  },
  4: {
    title: 'HSK 4 · 中高级',
    desc: 'Luyện từ trừu tượng, ý kiến, nguyên nhân-kết quả và đọc đoạn văn nhiều thông tin. HSK 3.0: 2.000 từ cộng dồn, gồm 1.000 từ mới ở cấp 4.',
    vocab: 2000,
    words: [
      { hanzi: '改善', pinyin: 'gǎishàn', meaning: 'cải thiện', opts: ['cải thiện', 'tưởng tượng', 'giải thích', 'phân biệt'], ans: 0, example: '运动可以改善睡眠质量。' },
      { hanzi: '逐渐', pinyin: 'zhújiàn', meaning: 'dần dần', opts: ['vội vàng', 'dần dần', 'chắc chắn', 'hầu như'], ans: 1, example: '天气逐渐变暖了。' },
      { hanzi: '支持', pinyin: 'zhīchí', meaning: 'ủng hộ, hỗ trợ', opts: ['từ chối', 'ủng hộ', 'tranh luận', 'thông báo'], ans: 1, example: '我支持这个计划。' }
    ]
  },
  5: {
    title: 'HSK 5 · 高级',
    desc: 'Phát triển khả năng đọc bài dài, nắm sắc thái từ và phân biệt các cách diễn đạt gần nghĩa. HSK 3.0: 3.600 từ cộng dồn, gồm 1.600 từ mới ở cấp 5.',
    vocab: 3600,
    words: [
      { hanzi: '趋势', pinyin: 'qūshì', meaning: 'xu hướng', opts: ['xu hướng', 'điều kiện', 'khả năng', 'quy mô'], ans: 0, example: '这个行业出现了新的发展趋势。' },
      { hanzi: '承担', pinyin: 'chéngdān', meaning: 'đảm nhận, gánh vác', opts: ['phân phối', 'đảm nhận', 'tránh né', 'chứng minh'], ans: 1, example: '每个人都应该承担自己的责任。' },
      { hanzi: '显著', pinyin: 'xiǎnzhù', meaning: 'rõ rệt, đáng kể', opts: ['mơ hồ', 'tạm thời', 'rõ rệt', 'bình thường'], ans: 2, example: '经过练习，他的水平有了显著提高。' }
    ]
  },
  6: {
    title: 'HSK 6 · 高级进阶',
    desc: 'Ôn cách diễn đạt nâng cao, thành ngữ thường gặp, suy luận và đọc văn bản có lập luận. HSK 3.0: 5.400 từ cộng dồn, gồm 1.800 từ mới ở cấp 6.',
    vocab: 5400,
    words: [
      { hanzi: '权衡', pinyin: 'quánhéng', meaning: 'cân nhắc, cân đối', opts: ['cân nhắc', 'thuyết phục', 'tóm tắt', 'đề xuất'], ans: 0, example: '做决定之前，需要权衡利弊。' },
      { hanzi: '诠释', pinyin: 'quánshì', meaning: 'diễn giải, giải thích', opts: ['phản đối', 'diễn giải', 'bổ sung', 'đơn giản hóa'], ans: 1, example: '这部作品诠释了人与自然的关系。' },
      { hanzi: '不言而喻', pinyin: 'bù yán ér yù', meaning: 'không cần nói cũng hiểu', opts: ['khó以理解', '不再重要', '不言而喻', '出乎意料'], ans: 2, example: '长期练习的重要性不言而喻。' }
    ]
  }
};

export const hskReadingData: Record<number, HskReadingPassage> = {
  1: {
    title: 'HSK 1 · 短文阅读：周末的公园',
    passage: '明天是星期天，天气很好。我和朋友想去公园踢足球。公园里有很多漂亮的花和高大的树，还可以看到很多小鸟。我们约好下午两点在学校门口见。',
    questions: [
      {
        prompt: '他们明天打算去做什么？',
        options: ['踢足球', '买衣服', '去医院', '在家里睡觉'],
        answer: 0,
        explanation: 'Đoạn văn nêu rõ: “我和朋友想去公园踢足球” (Tôi và bạn muốn đến công viên đá bóng).'
      },
      {
        prompt: '他们下午几点在什么地方见面？',
        options: ['上午十点在公园', '下午两点在学校门口', '下午三点在商店', '晚上八点在地铁站'],
        answer: 1,
        explanation: 'Đoạn văn viết: “我们约好下午两点在学校门口见” (Chúng tôi hẹn 2 giờ chiều ở cổng trường).'
      },
      {
        prompt: '明天公园的天气怎么样？',
        options: ['会下大雪', '天气很冷', '天气很好', '有很大的风'],
        answer: 2,
        explanation: 'Câu đầu tiên khẳng định: “明天是星期天，天气很好” (Ngày mai là Chủ Nhật, thời tiết rất đẹp).'
      }
    ]
  },
  2: {
    title: 'HSK 2 · 短文阅读：李医生的日常生活',
    passage: '小李在一家大医院当医生。他每天早晨六点半起床，吃完早饭后就坐公共汽车去上班。虽然每天接待很多病人、工作非常忙碌，但他非常喜欢帮助别人。医生建议大家：平时多喝温水、适量运动，对身体健康最有益。',
    questions: [
      {
        prompt: '小李在什么地方工作？',
        options: ['医院', '图书馆', '银行', '火车站'],
        answer: 0,
        explanation: 'Bài viết nêu: “小李在一家大医院当医生” (Tiểu Lý làm bác sĩ ở một bệnh viện lớn).'
      },
      {
        prompt: '小李每天怎么去上班？',
        options: ['骑自行车', '坐公共汽车', '自己开车', '跑步走路'],
        answer: 1,
        explanation: 'Bài viết chỉ rõ: “吃完早饭后就坐公共汽车去上班” (Ăn sáng xong thì đi xe buýt đi làm).'
      },
      {
        prompt: '李医生给出的健康建议是什么？',
        options: ['每天多喝奶茶', '多喝温水适量运动', '常常熬夜看手机', '少吃青菜多吃肉'],
        answer: 1,
        explanation: 'Đoạn cuối viết: “平时多喝温水、适量运动，对身体健康最有益”.'
      }
    ]
  },
  3: {
    title: 'HSK 3 · 短文阅读：绿色出行的城市生活',
    passage: '随着现代生活节奏不断加快，越来越多的人开始重视环境保护。很多上班族不再独自开私家车，而是选择骑共享单车或乘坐地铁出行。这不仅能够有效减少尾气排放与空气污染，还能在通勤途中锻炼身体，让城市交通更加通畅宜居。',
    questions: [
      {
        prompt: '市民选择绿色出行的主要原因是什么？',
        options: ['为了多买几辆汽车', '重视环境保护并减少空气污染', '因为城市里没有汽车了', '为了在路上看电影'],
        answer: 1,
        explanation: 'Bài viết nêu rõ nguyên nhân: “越来越多人开始重视环境保护... 减少尾气排放与空气污染”.'
      },
      {
        prompt: '骑单车或乘坐地铁给市民带来的额外益处是什么？',
        options: ['在通勤途中锻炼身体', '学会开汽车', '节省所有生活开销', '提高外语水平'],
        answer: 0,
        explanation: 'Bài viết viết: “还能在通勤途中锻炼身体” (còn có thể rèn luyện sức khỏe trên đường đi làm).'
      },
      {
        prompt: '这段短文的核心主题是什么？',
        options: ['城市二手车交易', '环境保护与绿色低碳出行', '地铁票价调整政策', '如何修理自行车'],
        answer: 1,
        explanation: 'Đoạn văn thảo luận về thói quen bảo vệ môi trường thông qua phương tiện di chuyển xanh.'
      }
    ]
  },
  4: {
    title: 'HSK 4 · 短文阅读：职场中的有效沟通',
    passage: '在现代职场中，良好的人际沟通往往比单纯的个人业务能力更为关键。一个善于倾听同事意见、并能用恰当语言表达自己观点的人，更容易获得团队的支持与深厚信任。相反，若在合作中固执己见、忽视他人反馈，往往会导致无谓的误解与工作效率低下。',
    questions: [
      {
        prompt: '作者认为在职场中比单纯个人能力更关键的是什么？',
        options: ['每天加班的时间长度', '良好的人际沟通能力', '是否拥有高档办公电脑', '掌握多少种体育技能'],
        answer: 1,
        explanation: 'Câu đầu tiên nhấn mạnh: “良好的人际沟通往往比单纯的个人业务能力更为关键”.'
      },
      {
        prompt: '善于倾听并恰当表达的人往往能收获什么？',
        options: ['团队的支持与信任', '免试升职的保证', '所有的工作奖金', '永远不需要再沟通'],
        answer: 0,
        explanation: 'Bài viết chỉ ra: “更容易获得团队的支持与深厚信任”.'
      },
      {
        prompt: '“固执己见、忽视反馈”最容易引起什么负面后果？',
        options: ['导致误解与工作效率低下', '身体立刻发烧生病', '手机丢失无法联络', '公司电脑系统损坏'],
        answer: 0,
        explanation: 'Bài viết kết luận: “往往会导致无谓的误解与工作效率低下”.'
      }
    ]
  },
  5: {
    title: 'HSK 5 · 短文阅读：数字阅读时代的思考',
    passage: '数字信息技术的迅猛发展深刻改变了大众的传统阅读习惯。电子书与移动阅读终端的普及，使得读者能够随时随地获取海量文献与学术资讯。然而，碎片化的信息浏览也引发了学术界对深度专注力与批判性思考能力退化的担忧。如何在海量信息洪流中保持独立思考与深度阅读，已成为当代人亟待探讨的重要课题。',
    questions: [
      {
        prompt: '数字阅读终端的普及给读者带来的最大便利是什么？',
        options: ['可以彻底放弃所有纸质书', '随时随地获取海量文献资讯', '保证每次考试都拿满分', '不需要花时间阅读全文'],
        answer: 1,
        explanation: 'Bài viết nêu: “使得读者能够随时随地获取海量文献与学术资讯”.'
      },
      {
        prompt: '学界对“碎片化信息浏览”最担忧的问题是什么？',
        options: ['电子设备耗电速度过快', '深度专注力与批判性思考能力退化', '图书出版行业完全倒闭', '读者眼睛容易疲劳'],
        answer: 1,
        explanation: 'Bài viết chỉ ra: “引发了学术界对深度专注力与批判性思考能力退化的担忧”.'
      },
      {
        prompt: '本文旨在提醒当代读者注意什么？',
        options: ['全面禁止使用电子产品阅读', '在海量信息中保持独立思考与深度阅读', '只阅读小说不看专业书籍', '只在晚上进行纸质阅读'],
        answer: 1,
        explanation: 'Đoạn kết nhấn mạnh: “如何在海量信息洪流中保持独立思考与深度阅读，已成为当代人亟待探讨的重要课题”.'
      }
    ]
  },
  6: {
    title: 'HSK 6 · 短文阅读：艺术创作与时代脉搏',
    passage: '真正的艺术创作从来不是对客观现实的机械临摹，而是艺术家主观审美情感与客体物象深层交融后的精神升华。一部能够超越时空藩篱、引起历代读者强烈精神共鸣的传世经典，其核心无不蕴含着对人类共同命运与人性本质的深沉叩问。清代画论大师石涛曾提出“笔墨当随时代”，唯有紧跟时代步伐、深植本土文化根基，艺术生命才能历久弥新。',
    questions: [
      {
        prompt: '作者如何定义“真正的艺术创作”？',
        options: ['对客观现实机械复制的照相机记录', '主观审美情感与客体物象交融的精神升华', '脱离任何文化土壤的凭空臆想', '为了追求高昂拍卖价格的商品'],
        answer: 1,
        explanation: 'Bài viết định nghĩa: “是艺术家主观审美情感与客体物象深层交融后的精神升华”.'
      },
      {
        prompt: '传世经典之所以能超越时空引起共鸣，根本原因是什么？',
        options: ['得到了大量权威媒体的宣传', '蕴含对人类共同命运与人性本质的深沉叩问', '使用了极其古老难懂的生僻字词', '创作者出身名门望族'],
        answer: 1,
        explanation: 'Văn bản nêu: “其核心无不蕴含着对人类共同命运与人性本质的深沉叩问”.'
      },
      {
        prompt: '引用石涛“笔墨当随时代”旨在阐明什么创作哲理？',
        options: ['古代艺术手法已经毫无价值', '艺术需紧跟时代步伐并深植文化根基', '画家只能使用最新的现代画笔', '传统文化必然会被时代淘汰'],
        answer: 1,
        explanation: 'Tác giả lý giải: “唯有紧跟时代步伐、深植本土文化根基，艺术生命才能历久弥新”.'
      }
    ]
  }
};

interface SessionQuestion {
  type: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  hanzi?: string;
  pinyin?: string;
  meaning?: string;
}

interface ActiveSession {
  id: string;
  title: string;
  desc: string;
  duration: number;
  passageTitle: string;
  passage: string;
  questions: SessionQuestion[];
  kind: 'vocab' | 'reading';
}

interface SavedWordItem {
  hanzi?: string;
  pinyin?: string;
  meaning?: string;
  term?: string;
}

export function HskLabWorkspace() {
  const { addXp, playAudioCue } = useLearner();
  const { t } = useLanguage();

  const [currentHsk, setCurrentHsk] = useState<number>(1);
  const [recentRuns, setRecentRuns] = useState<Array<{ id: string; title: string; score: number; at: string }>>([
    { id: 'hsk1', title: 'HSK 1 · Vocabulary Mini Test', score: 100, at: 'Hôm nay' }
  ]);
  const [savedWords, setSavedWords] = useState<SavedWordItem[]>([
    { hanzi: '坚持', pinyin: 'jiānchí', meaning: 'kiên trì' },
    { hanzi: '趋势', pinyin: 'qūshì', meaning: 'xu hướng' }
  ]);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Session State
  const [currentSession, setCurrentSession] = useState<ActiveSession | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [timerSeconds, setTimerSeconds] = useState(720);
  const [isPaused, setIsPaused] = useState(false);
  const [finishResult, setFinishResult] = useState<{
    title: string;
    right: number;
    total: number;
    score: number;
    feedback: string;
  } | null>(null);

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Timer countdown
  useEffect(() => {
    if (!currentSession || isPaused) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          showToast('Đã hết thời gian làm bài!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentSession, isPaused]);

  // Build Questions for Vocabulary Test
  const buildVocabQuestions = (level: number): SessionQuestion[] => {
    return hskData[level].words.map(w => ({
      type: `HSK ${level} Vocabulary`,
      prompt: `${w.hanzi} (${w.pinyin}) có nghĩa là gì?`,
      options: w.opts,
      answer: w.ans,
      explanation: `Nghĩa: “${w.meaning}”. Ví dụ câu mẫu: ${w.example}`,
      hanzi: w.hanzi,
      pinyin: w.pinyin,
      meaning: w.meaning
    }));
  };

  // Build Questions for Reading Test
  const buildReadingQuestions = (level: number): SessionQuestion[] => {
    const rd = hskReadingData[level];
    return rd.questions.map(q => ({
      type: `HSK ${level} Reading Comprehension`,
      prompt: q.prompt,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation
    }));
  };

  // Start Vocabulary Mini Test
  const handleStartVocabTest = () => {
    playAudioCue('click');
    const questions = buildVocabQuestions(currentHsk);
    const session: ActiveSession = {
      id: `hsk${currentHsk}-vocab`,
      title: `HSK ${currentHsk} · Vocabulary Mini Test`,
      desc: `HSK ${currentHsk} · nội dung luyện tập tự biên soạn`,
      duration: 12,
      passageTitle: `HSK ${currentHsk} · 词汇 (${hskData[currentHsk].title})`,
      passage: `${hskData[currentHsk].desc}\n\nTrong mỗi câu hỏi, hãy đọc chữ Hán và pinyin, sau đó chọn nghĩa phù hợp nhất. Sau khi bấm "Kiểm tra đáp án", bạn sẽ thấy nghĩa tiếng Việt chuẩn và câu ví dụ minh họa kèm pinyin.`,
      questions,
      kind: 'vocab'
    };
    initSession(session);
  };

  // Start Reading Comprehension Test
  const handleStartReadingTest = () => {
    playAudioCue('click');
    const rd = hskReadingData[currentHsk];
    const questions = buildReadingQuestions(currentHsk);
    const session: ActiveSession = {
      id: `hsk${currentHsk}-reading`,
      title: `HSK ${currentHsk} · Reading Comprehension`,
      desc: `HSK ${currentHsk} · Đọc hiểu đoạn văn chuẩn CBT`,
      duration: 8,
      passageTitle: rd.title,
      passage: rd.passage,
      questions,
      kind: 'reading'
    };
    initSession(session);
  };

  const initSession = (session: ActiveSession) => {
    setCurrentSession(session);
    setQIndex(0);
    setAnswers({});
    setChecked({});
    setMarked({});
    setTimerSeconds(session.duration * 60);
    setIsPaused(false);
    setFinishResult(null);
  };

  const handleSelectOption = (optIndex: number) => {
    if (checked[qIndex]) return;
    playAudioCue('click');
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleCheckAnswer = () => {
    if (answers[qIndex] === undefined || checked[qIndex]) return;
    const isCorrect = answers[qIndex] === currentSession?.questions[qIndex].answer;
    if (isCorrect) {
      playAudioCue('correct');
      addXp(15);
    } else {
      playAudioCue('wrong');
    }
    setChecked(prev => ({ ...prev, [qIndex]: true }));
  };

  const handleToggleMarked = () => {
    playAudioCue('click');
    setMarked(prev => ({ ...prev, [qIndex]: !prev[qIndex] }));
    showToast(!marked[qIndex] ? '★ Đã đánh dấu xem lại câu này' : '☆ Đã bỏ đánh dấu');
  };

  const handleSaveWord = () => {
    if (!currentSession) return;
    playAudioCue('click');
    const q = currentSession.questions[qIndex];
    const item: SavedWordItem = q.hanzi
      ? { hanzi: q.hanzi, pinyin: q.pinyin, meaning: q.meaning }
      : { term: q.prompt, meaning: q.explanation };

    const exists = savedWords.some(
      x => (x.hanzi && x.hanzi === item.hanzi) || (x.term && x.term === item.term)
    );
    if (!exists) {
      setSavedWords(prev => [item, ...prev]);
      showToast('Đã lưu vào danh sách ôn tập.');
    } else {
      showToast('Mục này đã nằm trong danh sách ôn tập.');
    }
  };

  const handleMoveQuestion = (dir: number) => {
    playAudioCue('click');
    if (!currentSession) return;
    if (dir < 0) {
      setQIndex(prev => Math.max(0, prev - 1));
    } else {
      if (qIndex < currentSession.questions.length - 1) {
        setQIndex(prev => prev + 1);
      } else {
        finishSession();
      }
    }
  };

  const finishSession = () => {
    if (!currentSession) return;
    playAudioCue('quest');

    const total = currentSession.questions.length;
    const right = currentSession.questions.reduce(
      (n, q, i) => n + (answers[i] === q.answer ? 1 : 0),
      0
    );
    const score = Math.round((100 * right) / total);

    // Give completion bonus XP
    addXp(score >= 80 ? 50 : 30);

    const feedback =
      score >= 80
        ? 'Rất tốt! Bạn đã làm chủ vững vàng từ vựng và cấu trúc câu cấp độ này.'
        : score >= 50
        ? 'Bạn đã có nền tảng khá tốt; hãy đọc kỹ lại giải thích ở các câu sai để ghi nhớ sâu hơn.'
        : 'Đừng nản lòng! Hãy ôn lại các chữ Hán và ví dụ trong danh sách ôn tập rồi thử lại nhé.';

    setRecentRuns(prev => [
      {
        id: currentSession.id,
        title: currentSession.title,
        score,
        at: new Date().toLocaleDateString('vi-VN')
      },
      ...prev.slice(0, 5)
    ]);

    setFinishResult({
      title: currentSession.title,
      right,
      total,
      score,
      feedback
    });
  };

  const handleCloseSession = () => {
    playAudioCue('click');
    setCurrentSession(null);
    setFinishResult(null);
  };

  const currentLevelData = hskData[currentHsk];
  const levelAccuracy = recentRuns.find(r => r.id.startsWith(`hsk${currentHsk}`))?.score;

  return (
    <div className="hsk-lab-wrapper">
      {/* Scope CSS from LingoDeck — IELTS & HSK Practice.html */}
      <style jsx global>{`
        :root {
          --site-primary: #246B5A;
          --site-on-primary: #FFFFFF;
          --site-secondary: #F1B863;
          --site-on-secondary: #2B2115;
          --site-background: #F5F7F4;
          --site-on-background: #19231F;
          --green: #246B5A;
          --green-soft: #E4F2E9;
          --amber-soft: #FFF1D8;
          --red-soft: #FCEAE7;
          --blue-soft: #E8F0FC;
          --line: #DEE6E0;
          --surface: #FFFFFF;
          --surface-2: #EFF4EF;
          --muted: #68766F;
          --ink: #19231F;
          --shadow: 0 12px 36px rgba(25, 44, 33, .07);
        }
        .dark {
          --line: #313C36;
          --surface: #202A25;
          --surface-2: #27332D;
          --muted: #A3B1AA;
          --ink: #F3F5F2;
          --green-soft: #263E32;
          --amber-soft: #493924;
          --red-soft: #4A302D;
          --blue-soft: #29384D;
        }
        .eyebrow {
          color: var(--green);
          font-size: 11px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          font-weight: 900;
          margin-bottom: 10px;
        }
        .heading-tag {
          background: var(--green-soft);
          color: var(--green);
          padding: 7px 12px;
          white-space: nowrap;
          border-radius: 9px;
          font-size: 11px;
          font-weight: 900;
        }
        .hsk-levels {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
          margin: 18px 0;
        }
        .level-btn {
          padding: 14px 6px;
          border: 1px solid var(--line);
          border-radius: 14px;
          background: var(--surface);
          color: var(--muted);
          text-align: center;
          font-weight: 800;
          font-size: 13px;
          transition: all 0.18s ease;
          cursor: pointer;
        }
        .level-btn span {
          display: block;
          font-size: 10px;
          font-weight: 600;
          margin-top: 4px;
        }
        .level-btn.active {
          border-color: var(--site-primary);
          color: var(--green);
          background: var(--green-soft);
          box-shadow: inset 0 0 0 1.5px var(--site-primary);
        }
        .level-overview {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 16px;
          margin-bottom: 22px;
        }
        .level-hero {
          padding: 24px;
          border-radius: 20px;
          background: var(--site-primary);
          color: var(--site-on-primary);
          position: relative;
          overflow: hidden;
        }
        .level-hero h2 {
          margin: 8px 0;
          font-size: 24px;
          font-weight: 900;
        }
        .level-hero p {
          font-size: 13px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.85);
          max-width: 540px;
          margin-bottom: 16px;
        }
        .level-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .level-badges span {
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 5px 10px;
          font-size: 10px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
        }
        .level-stat {
          display: grid;
          gap: 12px;
        }
        .level-stat .stat-panel {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border: 1px solid var(--line);
          border-radius: 16px;
          background: var(--surface);
        }
        .level-stat .stat-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: var(--surface-2);
          font-size: 18px;
          font-weight: 900;
          flex: 0 0 auto;
        }
        .level-stat strong {
          display: block;
          font-size: 17px;
          font-weight: 900;
          margin-bottom: 3px;
          color: var(--ink);
        }
        .level-stat small {
          color: var(--muted);
          font-size: 11px;
        }
        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 14px;
          margin: 24px 0 16px;
        }
        .section-head h2 {
          font-size: 20px;
          font-weight: 900;
          margin: 0 0 4px;
          color: var(--ink);
        }
        .section-head p {
          color: var(--muted);
          font-size: 12px;
          margin: 0;
        }
        .library-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 250px;
          gap: 18px;
          align-items: start;
        }
        .set-list {
          display: grid;
          gap: 12px;
        }
        .set-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 18px;
          min-width: 0;
          transition: all 0.2s ease;
        }
        .set-card:hover {
          border-color: var(--site-primary);
          box-shadow: var(--shadow);
          transform: translateY(-2px);
        }
        .set-art {
          flex: 0 0 auto;
          width: 68px;
          height: 68px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          font-size: 28px;
          font-weight: 900;
        }
        .set-art.gold {
          background: var(--amber-soft);
          color: #96601D;
        }
        .set-art.blue {
          background: var(--blue-soft);
          color: #246B5A;
        }
        .set-info {
          min-width: 0;
          flex: 1;
        }
        .set-type {
          font-size: 10px;
          color: var(--green);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }
        .set-info h3 {
          font-size: 15px;
          font-weight: 800;
          margin: 0 0 6px;
          color: var(--ink);
        }
        .set-info p {
          color: var(--muted);
          font-size: 12px;
          margin: 0 0 10px;
          line-height: 1.5;
        }
        .chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .chip {
          font-size: 10px;
          color: var(--muted);
          background: var(--surface-2);
          border-radius: 6px;
          padding: 4px 8px;
          font-weight: 600;
        }
        .set-action {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }
        .set-duration {
          font-size: 11px;
          color: var(--muted);
          white-space: nowrap;
          font-weight: 600;
        }
        .sidebar-panel {
          background: var(--surface);
          border: 1px solid var(--line);
          padding: 18px;
          border-radius: 18px;
        }
        .sidebar-panel + .sidebar-panel {
          margin-top: 14px;
        }
        .sidebar-panel h3 {
          font-size: 14px;
          font-weight: 800;
          margin: 0 0 12px;
          color: var(--ink);
        }
        .guide-step {
          display: flex;
          gap: 10px;
          margin: 12px 0;
          font-size: 11px;
          line-height: 1.55;
        }
        .step-no {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          background: var(--green-soft);
          color: var(--green);
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          font-weight: 900;
          font-size: 11px;
        }
        .guide-step strong {
          display: block;
          font-size: 11px;
          margin-bottom: 2px;
          color: var(--ink);
        }
        .guide-step span {
          color: var(--muted);
        }
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 60;
          background: rgba(13, 23, 17, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          backdrop-filter: blur(5px);
        }
        .practice-modal {
          width: min(1080px, 100%);
          max-height: 94vh;
          display: flex;
          flex-direction: column;
          background: var(--surface);
          color: var(--ink);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 35px 100px rgba(0, 0, 0, 0.35);
          border: 1px solid var(--line);
        }
        .practice-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 18px 22px;
          border-bottom: 1px solid var(--line);
          background: var(--surface);
        }
        .practice-sub {
          color: var(--muted);
          font-size: 11px;
          margin-top: 4px;
        }
        .timer {
          font-variant-numeric: tabular-nums;
          border-radius: 9px;
          background: var(--amber-soft);
          color: #805719;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 900;
        }
        .practice-body {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
          gap: 0;
          overflow: auto;
          min-height: 0;
          flex: 1;
        }
        .passage-pane {
          padding: 24px;
          background: var(--surface);
          border-right: 1px solid var(--line);
          overflow-y: auto;
        }
        .passage-text {
          font-size: 13px;
          line-height: 1.95;
          color: var(--ink);
          white-space: pre-line;
        }
        .question-pane {
          padding: 24px;
          overflow-y: auto;
          background: var(--surface-2);
        }
        .q-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          color: var(--muted);
          font-size: 11px;
          margin-bottom: 16px;
        }
        .q-number {
          background: var(--green-soft);
          color: var(--green);
          border-radius: 8px;
          padding: 6px 10px;
          font-weight: 900;
          font-size: 11px;
        }
        .q-prompt {
          font-size: 16px;
          line-height: 1.55;
          font-weight: 800;
          margin-bottom: 18px;
          color: var(--ink);
        }
        .answers {
          display: grid;
          gap: 10px;
        }
        .answer-option {
          border: 1px solid var(--line);
          background: var(--surface);
          color: var(--ink);
          border-radius: 12px;
          padding: 13px;
          font-size: 13px;
          line-height: 1.5;
          text-align: left;
          display: flex;
          gap: 11px;
          align-items: flex-start;
          transition: all 0.16s ease;
          cursor: pointer;
          width: 100%;
        }
        .answer-option:hover:not(:disabled) {
          border-color: var(--site-primary);
          background: var(--surface-2);
        }
        .answer-option.selected {
          border-color: var(--site-primary);
          background: var(--green-soft);
        }
        .answer-option.correct {
          border-color: #39976C !important;
          background: var(--green-soft) !important;
          color: #246B5A;
        }
        .answer-option.wrong {
          border-color: #D57D6A !important;
          background: var(--red-soft) !important;
          color: #A0382A;
        }
        .option-letter {
          width: 24px;
          height: 24px;
          border: 1px solid var(--line);
          border-radius: 7px;
          display: grid;
          place-items: center;
          font-size: 11px;
          font-weight: 900;
          flex: 0 0 auto;
        }
        .explanation {
          margin-top: 14px;
          border-radius: 12px;
          background: var(--surface);
          border: 1px solid var(--line);
          padding: 14px;
          font-size: 12px;
          line-height: 1.65;
        }
        .practice-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 22px;
          border-top: 1px solid var(--line);
          background: var(--surface);
        }
        .question-dots {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .q-dot {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid var(--line);
          background: var(--surface);
          color: var(--muted);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          display: grid;
          place-items: center;
        }
        .q-dot.done {
          background: var(--green-soft);
          border-color: var(--site-primary);
          color: var(--green);
          font-weight: 900;
        }
        .q-dot.active {
          outline: 2px solid var(--site-primary);
          outline-offset: 1px;
        }
        .toast-banner {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 100;
          background: #1D3026;
          color: #FFFFFF;
          padding: 14px 20px;
          border-radius: 14px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
          font-size: 13px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: slideUp 0.2s ease;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 840px) {
          .hsk-levels { grid-template-columns: repeat(3, 1fr); }
          .level-overview { grid-template-columns: 1fr; }
          .library-layout { grid-template-columns: 1fr; }
          .practice-body { grid-template-columns: 1fr; }
          .passage-pane { display: none; }
        }
      `}</style>

      {/* Main Page Content */}
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="eyebrow">中文 · 汉语水平考试</div>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight mb-2">
              Luyện thi HSK 1–6
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
              Đã cập nhật theo đề cương HSK 3.0 (công bố 2025). Theo thông báo chính thức, kỳ thi mới triển khai toàn cầu từ 13/12/2026. Số trong thẻ là tổng từ cộng dồn; phần mô tả ghi số từ mới của từng cấp.
            </p>
          </div>
          <span className="heading-tag">Đề cương HSK 3.0 · 2026</span>
        </div>

        {/* Level Switcher (HSK 1 - 6) */}
        <div className="hsk-levels">
          {[1, 2, 3, 4, 5, 6].map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                playAudioCue('click');
                setCurrentHsk(lvl);
              }}
              className={`level-btn ${lvl === currentHsk ? 'active' : ''}`}
            >
              HSK {lvl}
              <span>{lvl <= 2 ? 'Sơ cấp' : lvl <= 4 ? 'Trung cấp' : 'Nâng cao'}</span>
            </button>
          ))}
        </div>

        {/* Level Overview Grid */}
        <div className="level-overview">
          {/* Level Hero Card */}
          <div className="level-hero shadow-md">
            <div className="eyebrow" style={{ color: '#CDE6D7' }}>YOUR CHINESE PATH</div>
            <h2>{currentLevelData.title}</h2>
            <p>{currentLevelData.desc}</p>
            <div className="level-badges">
              <span>{currentHsk <= 2 ? 'Từ vựng cơ bản' : currentHsk <= 4 ? 'Từ vựng trung cấp' : 'Từ vựng nâng cao'}</span>
              <span>Câu ngắn</span>
              <span>Đọc hiểu</span>
            </div>
            <button
              onClick={handleStartVocabTest}
              className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F1B863] hover:bg-[#e4ad57] text-[#2B2115] font-black text-xs shadow-md transition transform active:scale-95"
            >
              <span>Bắt đầu mini test</span>
              <span>↗</span>
            </button>
          </div>

          {/* Level Stat Cards */}
          <div className="level-stat">
            <div className="stat-panel">
              <div className="stat-icon text-[#246B5A]">文</div>
              <div>
                <strong>{currentLevelData.vocab.toLocaleString('en-US')}</strong>
                <small>Tổng số từ theo HSK 3.0 (cộng dồn)</small>
              </div>
            </div>

            <div className="stat-panel">
              <div className="stat-icon text-emerald-600">✓</div>
              <div>
                <strong>{levelAccuracy !== undefined ? `${levelAccuracy}%` : 'Chưa có'}</strong>
                <small>Độ chính xác của bạn</small>
              </div>
            </div>

            <div className="stat-panel">
              <div className="stat-icon text-amber-600">◷</div>
              <div>
                <strong>8–12 phút</strong>
                <small>Thời lượng mini test</small>
              </div>
            </div>
          </div>
        </div>

        {/* Section Head */}
        <div className="section-head">
          <div>
            <h2>Bài luyện {currentLevelData.title}</h2>
            <p>Chọn đáp án, xem giải thích và lưu từ mới để ôn tập.</p>
          </div>
          <button
            onClick={handleStartVocabTest}
            className="px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-xs font-bold text-stone-800 dark:text-stone-200 transition"
          >
            Làm mini test
          </button>
        </div>

        {/* Practice Sets & Aside Guide */}
        <div className="library-layout">
          {/* Main 2 Cards */}
          <div className="set-list">
            {/* Card 1: Vocabulary */}
            <article className="set-card">
              <div className="set-art gold">字</div>
              <div className="set-info">
                <div className="set-type">HSK {currentHsk} · VOCABULARY</div>
                <h3>Từ vựng trọng tâm cấp {currentHsk}</h3>
                <p>Chọn nghĩa phù hợp, xem pinyin và câu ví dụ để ghi nhớ từ trong ngữ cảnh.</p>
                <div className="chips">
                  <span className="chip">{currentLevelData.words.length} câu mẫu</span>
                  <span className="chip">Có giải thích</span>
                  <span className="chip">Pinyin chuẩn</span>
                </div>
              </div>
              <div className="set-action">
                <span className="set-duration">◷ 5 phút</span>
                <button
                  onClick={handleStartVocabTest}
                  className="px-4 py-2 rounded-xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-extrabold text-xs shadow-xs transition"
                >
                  Làm bài ↗
                </button>
              </div>
            </article>

            {/* Card 2: Reading */}
            <article className="set-card">
              <div className="set-art blue">阅</div>
              <div className="set-info">
                <div className="set-type">HSK {currentHsk} · READING</div>
                <h3>Đọc hiểu ngắn cấp {currentHsk}</h3>
                <p>Luyện nhận diện ý chính và hiểu câu qua ngữ cảnh. Bản demo sử dụng các câu ngắn theo cấp độ.</p>
                <div className="chips">
                  <span className="chip">Câu ngắn</span>
                  <span className="chip">Tự kiểm tra</span>
                  <span className="chip">{hskReadingData[currentHsk].questions.length} câu hỏi</span>
                </div>
              </div>
              <div className="set-action">
                <span className="set-duration">◷ 8 phút</span>
                <button
                  onClick={handleStartReadingTest}
                  className="px-4 py-2 rounded-xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-extrabold text-xs shadow-xs transition"
                >
                  Làm bài ↗
                </button>
              </div>
            </article>
          </div>

          {/* Aside Guide & Saved Words */}
          <aside className="space-y-4">
            <div className="sidebar-panel">
              <h3>Phương pháp gợi ý</h3>
              <div className="guide-step">
                <div className="step-no">1</div>
                <div>
                  <strong>Ôn từ trong ngữ cảnh</strong>
                  <span>Đọc cả câu thay vì học một từ rời rạc.</span>
                </div>
              </div>
              <div className="guide-step">
                <div className="step-no">2</div>
                <div>
                  <strong>Tự nhớ trước khi xem đáp án</strong>
                  <span>Che nghĩa tiếng Việt rồi tự giải thích.</span>
                </div>
              </div>
              <div className="guide-step">
                <div className="step-no">3</div>
                <div>
                  <strong>Ôn lại từ sai</strong>
                  <span>Ghi từ mới và quay lại sau một ngày.</span>
                </div>
              </div>
            </div>

            <div className="sidebar-panel">
              <h3>Đã lưu để ôn ({savedWords.length})</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
                Từ/câu bạn đánh dấu trong mini test sẽ được giữ trong danh sách ôn tập của phiên demo.
              </p>
              <button
                onClick={() => {
                  playAudioCue('click');
                  setShowSavedModal(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 font-bold text-xs text-stone-800 dark:text-stone-200 transition"
              >
                Xem từ đã lưu ({savedWords.length})
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRACTICE TEST WORKSPACE MODAL */}
      {/* ========================================================================= */}
      {currentSession && (
        <div
          className="modal-backdrop"
          onClick={e => {
            if (e.target === e.currentTarget) handleCloseSession();
          }}
        >
          <div className="practice-modal">
            {/* Header */}
            <div className="practice-header">
              <div>
                <h3 className="text-base font-black text-stone-900 dark:text-white">
                  {currentSession.title}
                </h3>
                <div className="practice-sub">
                  {currentSession.desc} · {currentSession.questions.length} câu hỏi
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="timer">
                  {String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:
                  {String(timerSeconds % 60).padStart(2, '0')}
                </div>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-100 dark:bg-slate-800 text-xs font-bold"
                >
                  {isPaused ? '▶ Tiếp tục' : 'Ⅱ Tạm dừng'}
                </button>
                <button
                  onClick={handleCloseSession}
                  className="w-8 h-8 rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-200 text-base font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="practice-body">
              {/* Left Pane: Passage or Context */}
              <div className="passage-pane">
                <div className="eyebrow">READING PASSAGE / BỐI CẢNH</div>
                <h2 className="text-lg font-black text-stone-900 dark:text-white mb-3">
                  {currentSession.passageTitle}
                </h2>
                <div className="passage-text">
                  {currentSession.passage}
                </div>
              </div>

              {/* Right Pane: Active Question */}
              <div className="question-pane">
                <div className="q-top">
                  <span className="q-number">
                    QUESTION {qIndex + 1} / {currentSession.questions.length}
                  </span>
                  <span className="font-bold text-stone-500">
                    {currentSession.questions[qIndex].type}
                  </span>
                </div>

                <div className="q-prompt">
                  {currentSession.questions[qIndex].prompt}
                </div>

                {/* Answer Options */}
                <div className="answers">
                  {currentSession.questions[qIndex].options.map((opt, i) => {
                    const isSelected = answers[qIndex] === i;
                    const isChecked = !!checked[qIndex];
                    const isCorrect = i === currentSession.questions[qIndex].answer;
                    const isWrong = isChecked && isSelected && !isCorrect;

                    let optClass = 'answer-option';
                    if (isSelected && !isChecked) optClass += ' selected';
                    if (isChecked && isCorrect) optClass += ' correct';
                    if (isWrong) optClass += ' wrong';

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(i)}
                        disabled={isChecked}
                        className={optClass}
                      >
                        <span className="option-letter">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="font-semibold text-xs">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Reveal */}
                {checked[qIndex] && (
                  <div className="explanation">
                    <strong className="block font-black text-xs mb-1">
                      {answers[qIndex] === currentSession.questions[qIndex].answer
                        ? '✓ Chính xác!'
                        : '↺ Hãy xem lại bằng chứng và ngữ cảnh'}
                    </strong>
                    <p className="text-xs text-stone-700 dark:text-stone-300">
                      {currentSession.questions[qIndex].explanation}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap mt-4 pt-2">
                  <button
                    onClick={handleToggleMarked}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-stone-700 dark:text-stone-200"
                  >
                    {marked[qIndex] ? '★ Đã đánh dấu' : '☆ Đánh dấu xem lại'}
                  </button>

                  <button
                    onClick={handleSaveWord}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-stone-700 dark:text-stone-200"
                  >
                    ＋ Lưu để ôn
                  </button>

                  <button
                    onClick={handleCheckAnswer}
                    disabled={answers[qIndex] === undefined || checked[qIndex]}
                    className={`ml-auto px-4 py-1.5 rounded-lg text-xs font-black transition ${
                      answers[qIndex] === undefined || checked[qIndex]
                        ? 'bg-stone-200 dark:bg-slate-800 text-stone-400 cursor-not-allowed'
                        : 'bg-[#246B5A] text-white shadow-xs hover:bg-[#1d5749]'
                    }`}
                  >
                    Kiểm tra đáp án
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="practice-footer">
              <div>
                <div className="question-dots">
                  {currentSession.questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setQIndex(i)}
                      className={`q-dot ${answers[i] !== undefined ? 'done' : ''} ${
                        qIndex === i ? 'active' : ''
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="text-[10px] text-stone-400 font-semibold mt-1.5">
                  {Object.keys(answers).length}/{currentSession.questions.length} câu đã trả lời
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMoveQuestion(-1)}
                  disabled={qIndex === 0}
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold disabled:opacity-40"
                >
                  ← Trước
                </button>
                <button
                  onClick={() => handleMoveQuestion(1)}
                  className="px-5 py-2 rounded-xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-extrabold text-xs shadow-xs"
                >
                  {qIndex === currentSession.questions.length - 1 ? 'Hoàn thành ✓' : 'Tiếp theo →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TEST COMPLETION MODAL */}
      {/* ========================================================================= */}
      {finishResult && (
        <div className="modal-backdrop">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#E4F2E9] text-[#246B5A] mx-auto flex items-center justify-center text-3xl font-black shadow-inner">
                {finishResult.score >= 80 ? '🏆' : finishResult.score >= 50 ? '🌟' : '📚'}
              </div>
              <h3 className="text-xl font-black text-stone-900 dark:text-white">
                Hoàn thành bài luyện tập!
              </h3>
              <p className="text-xs text-stone-500 font-bold">
                {finishResult.title}
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 text-center">
              <div>
                <span className="text-[11px] text-stone-400 font-bold block">Số câu đúng</span>
                <span className="text-2xl font-black text-[#246B5A]">
                  {finishResult.right} / {finishResult.total}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-stone-400 font-bold block">Độ chính xác</span>
                <span className="text-2xl font-black text-[#F1B863]">
                  {finishResult.score}%
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed text-center px-2">
              {finishResult.feedback}
            </p>

            <button
              onClick={handleCloseSession}
              className="w-full py-3 rounded-2xl bg-[#246B5A] hover:bg-[#1d5749] text-white font-extrabold text-sm shadow-md transition"
            >
              Trở về không gian luyện thi HSK
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SAVED WORDS MODAL */}
      {/* ========================================================================= */}
      {showSavedModal && (
        <div
          className="modal-backdrop"
          onClick={e => {
            if (e.target === e.currentTarget) setShowSavedModal(false);
          }}
        >
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-stone-900 dark:text-white">
                  Danh sách từ vựng đã lưu để ôn
                </h3>
                <p className="text-xs text-stone-400 font-semibold">
                  Tổng cộng: {savedWords.length} mục đã đánh dấu
                </p>
              </div>
              <button
                onClick={() => setShowSavedModal(false)}
                className="w-8 h-8 rounded-full border border-stone-200 dark:border-slate-700 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {savedWords.length === 0 ? (
                <div className="text-center py-10 text-stone-400 text-xs">
                  Chưa có từ nào được lưu. Khi làm mini test, hãy bấm "＋ Lưu để ôn".
                </div>
              ) : (
                savedWords.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-stone-50 dark:bg-slate-800/40 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-[#246B5A]">
                          {item.hanzi || item.term}
                        </span>
                        {item.pinyin && (
                          <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md">
                            {item.pinyin}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 font-medium">
                        {item.meaning}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSavedWords(prev => prev.filter((_, i) => i !== idx));
                        showToast('Đã xóa khỏi danh sách ôn tập.');
                      }}
                      className="text-stone-400 hover:text-rose-500 text-xs font-bold p-1"
                    >
                      Xóa
                    </button>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setShowSavedModal(false)}
              className="w-full py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-100 dark:bg-slate-800 text-stone-800 dark:text-stone-200 font-bold text-xs"
            >
              Đóng danh sách
            </button>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-banner">
          <span>✦</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
