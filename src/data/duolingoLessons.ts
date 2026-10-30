export interface DuolingoQuestion {
  id: string;
  type: 'mcq' | 'scramble' | 'listen_mcq' | 'pair_match';
  prompt: string;
  promptVi: string;
  audioText?: string;
  audioLang?: 'en-US' | 'zh-CN';
  options?: { key: string; text: string; textVi?: string }[];
  scrambleWords?: string[];
  correctScramble?: string[];
  correctAnswer: string;
  explanationVi: string;
}

export interface DuolingoUnit {
  id: string;
  nodeId: string;
  title: string;
  titleVi: string;
  descriptionVi: string;
  xpReward: number;
  questions: DuolingoQuestion[];
}

export const duolingoUnits: Record<string, DuolingoUnit> = {
  'node-1': {
    id: 'unit-1',
    nodeId: 'node-1',
    title: 'Beginner Horizon: Greetings & Core Phrases',
    titleVi: 'Đảo 1: Khởi Đầu Tân Binh (Chào Hỏi & Từ Vựng Cốt Lõi)',
    descriptionVi: 'Làm quen với các mẫu câu giao tiếp căn bản, phát âm và phản xạ từ vựng ban đầu.',
    xpReward: 30,
    questions: [
      {
        id: 'u1-q1',
        type: 'listen_mcq',
        prompt: 'Listen to the audio and choose the correct Vietnamese meaning:',
        promptVi: 'Nghe phát âm và chọn nghĩa tiếng Việt chính xác:',
        audioText: 'Welcome to our international language campus!',
        audioLang: 'en-US',
        options: [
          { key: 'A', text: 'Chào mừng bạn đến với khuôn viên ngôn ngữ quốc tế!', textVi: 'Nghĩa đúng' },
          { key: 'B', text: 'Hẹn gặp lại bạn vào ngày mai tại lớp học!', textVi: 'Sai nghĩa' },
          { key: 'C', text: 'Xin vui lòng xuất trình thẻ sinh viên của bạn!', textVi: 'Sai nghĩa' },
          { key: 'D', text: 'Cảm ơn bạn đã ghé thăm thư viện trường!', textVi: 'Sai nghĩa' },
        ],
        correctAnswer: 'A',
        explanationVi: '"Welcome to..." có nghĩa là "Chào mừng bạn đến với...".'
      },
      {
        id: 'u1-q2',
        type: 'scramble',
        prompt: 'Arrange the words to form a correct greeting in Chinese:',
        promptVi: 'Sắp xếp các từ để tạo thành câu chào lịch sự trong tiếng Trung:',
        scrambleWords: ['您好', '老师', '！'],
        correctScramble: ['老师', '您好', '！'],
        correctAnswer: '老师您好！',
        explanationVi: 'Trong tiếng Trung, danh xưng (老师 - Thầy/Cô giáo) đặt trước lời chào lịch sự (您好).'
      },
      {
        id: 'u1-q3',
        type: 'mcq',
        prompt: 'Which word means "kiên trì, giữ vững quyết tâm" in Chinese?',
        promptVi: 'Từ nào dưới đây mang nghĩa "kiên trì, giữ vững quyết tâm"?',
        options: [
          { key: 'A', text: '坚持 (jiānchí)', textVi: 'Kiên trì' },
          { key: 'B', text: '放弃 (fàngqì)', textVi: 'Từ bỏ' },
          { key: 'C', text: '休息 (xiūxi)', textVi: 'Nghỉ ngơi' },
          { key: 'D', text: '随便 (suíbiàn)', textVi: 'Tùy tiện' },
        ],
        correctAnswer: 'A',
        explanationVi: '坚持 (jiānchí) là động từ chỉ sự kiên trì, bền bỉ.'
      },
      {
        id: 'u1-q4',
        type: 'scramble',
        prompt: 'Arrange the English words to make a meaningful sentence:',
        promptVi: 'Sắp xếp các từ tiếng Anh để hoàn chỉnh câu:',
        scrambleWords: ['English', 'every', 'day', 'I', 'practice'],
        correctScramble: ['I', 'practice', 'English', 'every', 'day'],
        correctAnswer: 'I practice English every day',
        explanationVi: 'Cấu trúc S + V + O + Trạng ngữ: "I practice English every day" (Tôi luyện tập tiếng Anh mỗi ngày).'
      }
    ]
  },
  'node-2': {
    id: 'unit-2',
    nodeId: 'node-2',
    title: 'Listening Soundwaves: Numbers & Names',
    titleVi: 'Đảo 2: Vịnh Luyện Nghe Phản Xạ (Số Phòng & Địa Điểm)',
    descriptionVi: 'Rèn luyện khả năng bắt số liệu, tên riêng và thông tin chi tiết qua âm thanh.',
    xpReward: 40,
    questions: [
      {
        id: 'u2-q1',
        type: 'listen_mcq',
        prompt: 'Listen and identify the emergency extension number mentioned:',
        promptVi: 'Nghe và xác định số máy lẻ khẩn cấp được nhắc đến:',
        audioText: 'For urgent weekend maintenance, please dial extension 404 immediately.',
        audioLang: 'en-US',
        options: [
          { key: 'A', text: '404', textVi: 'Extension 404' },
          { key: 'B', text: '414', textVi: 'Extension 414' },
          { key: 'C', text: '911', textVi: 'Extension 911' },
          { key: 'D', text: '504', textVi: 'Extension 504' },
        ],
        correctAnswer: 'A',
        explanationVi: 'Đoạn băng đọc rõ: "please dial extension 404".'
      },
      {
        id: 'u2-q2',
        type: 'mcq',
        prompt: 'Trong bài nghe IELTS, để tránh bẫy đổi thông tin (distractors), bạn cần chú ý từ nối nào?',
        promptVi: 'Từ nối nào thường báo hiệu thông tin vừa nói bị phủ định?',
        options: [
          { key: 'A', text: 'However / Actually / But (Tuy nhiên, thực ra)', textVi: 'Báo hiệu sửa lại' },
          { key: 'B', text: 'And / In addition (Và, ngoài ra)', textVi: 'Bổ sung thông tin' },
          { key: 'C', text: 'Because / Since (Bởi vì)', textVi: 'Nêu lý do' },
          { key: 'D', text: 'Therefore (Do đó)', textVi: 'Nêu kết luận' },
        ],
        correctAnswer: 'A',
        explanationVi: 'Người nói thường dùng "However", "Actually", "Sorry, I meant..." để đính chính lại thông tin gây nhiễu.'
      },
      {
        id: 'u2-q3',
        type: 'scramble',
        prompt: 'Arrange the sentence to express meeting time in Chinese:',
        promptVi: 'Sắp xếp câu tiếng Trung biểu đạt thời gian gặp mặt:',
        scrambleWords: ['见', '明天', '早上', '八点', '我们'],
        correctScramble: ['我们', '明天', '早上', '八点', '见'],
        correctAnswer: '我们明天早上八点见',
        explanationVi: 'Trật tự thời gian trong tiếng Trung đi từ lớn đến nhỏ: Chúng ta (我们) + ngày mai (明天) + buổi sáng (早上) + 8 giờ (八点) + gặp (见).'
      }
    ]
  },
  'node-3': {
    id: 'unit-3',
    nodeId: 'node-3',
    title: 'Reading Palm Oasis: Keywords & Evidence',
    titleVi: 'Đảo 3: Ốc Đảo Chiến Thuật Đọc Hiểu',
    descriptionVi: 'Kỹ thuật định vị từ khóa và phân biệt True/False/Not Given.',
    xpReward: 50,
    questions: [
      {
        id: 'u3-q1',
        type: 'mcq',
        prompt: 'Khi làm bài đọc IELTS, sự khác biệt giữa FALSE và NOT GIVEN là gì?',
        promptVi: 'Điểm khác biệt cốt lõi giữa FALSE và NOT GIVEN:',
        options: [
          { key: 'A', text: 'FALSE là bài viết trái ngược hoàn toàn; NOT GIVEN là không đủ thông tin xác minh.', textVi: 'Chính xác' },
          { key: 'B', text: 'Cả hai đều giống nhau, chọn cái nào cũng được.', textVi: 'Sai' },
          { key: 'C', text: 'NOT GIVEN là thông tin bị sai một nửa.', textVi: 'Sai' },
          { key: 'D', text: 'FALSE chỉ dùng cho bài thi General Training.', textVi: 'Sai' },
        ],
        correctAnswer: 'A',
        explanationVi: 'FALSE: bài văn khẳng định ngược lại. NOT GIVEN: bài văn không khẳng định hay phủ định, không thể suy đoán.'
      },
      {
        id: 'u3-q2',
        type: 'listen_mcq',
        prompt: 'Listen to the passage and identify the synonym used for "crucial":',
        promptVi: 'Nghe đoạn đọc và chọn từ đồng nghĩa với "crucial" xuất hiện trong câu:',
        audioText: 'Regular physical activity is vital for maintaining cognitive functions.',
        audioLang: 'en-US',
        options: [
          { key: 'A', text: 'vital (quan trọng, sống còn)', textVi: 'Từ đồng nghĩa' },
          { key: 'B', text: 'trivial (tầm thường)', textVi: 'Từ trái nghĩa' },
          { key: 'C', text: 'optional (tùy chọn)', textVi: 'Từ trái nghĩa' },
          { key: 'D', text: 'temporary (tạm thời)', textVi: 'Không liên quan' },
        ],
        correctAnswer: 'A',
        explanationVi: 'Từ "vital" đồng nghĩa với "crucial / essential / critical" (vô cùng quan trọng).'
      },
      {
        id: 'u3-q3',
        type: 'scramble',
        prompt: 'Arrange the sentence on scanning strategy:',
        promptVi: 'Sắp xếp câu tiếng Anh về kỹ thuật Scanning trong bài đọc:',
        scrambleWords: ['for', 'scan', 'Always', 'names', 'specific'],
        correctScramble: ['Always', 'scan', 'for', 'specific', 'names'],
        correctAnswer: 'Always scan for specific names',
        explanationVi: 'Chiến thuật: "Always scan for specific names" (Luôn quét nhanh tìm các danh từ riêng cụ thể).'
      }
    ]
  },
  'node-4': {
    id: 'unit-4',
    nodeId: 'node-4',
    title: 'Grammar Fortress: Sentence Master',
    titleVi: 'Đảo 4: Pháo Đài Ngữ Pháp',
    descriptionVi: 'Chinh phục câu chữ 把 và cấu trúc câu nâng cao.',
    xpReward: 60,
    questions: [
      {
        id: 'u4-q1',
        type: 'scramble',
        prompt: 'Arrange the words into a correct 把 sentence:',
        promptVi: 'Sắp xếp các từ thành câu chữ 把 hoàn chỉnh:',
        scrambleWords: ['把', '请', '书', '放在', '桌子上'],
        correctScramble: ['请', '把', '书', '放在', '桌子上'],
        correctAnswer: '请把书放在桌子上',
        explanationVi: 'Công thức câu chữ 把: S + 请 + 把 + Tân ngữ (书) + Động từ + Kết cấu giới từ (放在桌子上).'
      },
      {
        id: 'u4-q2',
        type: 'listen_mcq',
        prompt: 'Listen to the Chinese speaker and choose the correct meaning:',
        promptVi: 'Nghe phát âm tiếng Trung và chọn nghĩa câu chính xác:',
        audioText: '虽然汉语很难，但是我非常喜欢。',
        audioLang: 'zh-CN',
        options: [
          { key: 'A', text: 'Tuy tiếng Hán rất khó, nhưng tôi rất thích.', textVi: 'Chính xác' },
          { key: 'B', text: 'Tiếng Hán rất dễ, tôi học rất nhanh.', textVi: 'Sai' },
          { key: 'C', text: 'Tôi không thích học tiếng Hán vì nó khó.', textVi: 'Sai' },
          { key: 'D', text: 'Hôm nay chúng tôi không có lớp tiếng Hán.', textVi: 'Sai' },
        ],
        correctAnswer: 'A',
        explanationVi: 'Cặp liên từ 虽然...但是... nghĩa là "Tuy... nhưng...".'
      },
      {
        id: 'u4-q3',
        type: 'mcq',
        prompt: 'Trong bài viết IELTS Writing Task 2, từ nối nào dưới đây dùng để chỉ sự nhượng bộ (concession)?',
        promptVi: 'Từ nối học thuật chỉ sự nhượng bộ:',
        options: [
          { key: 'A', text: 'Although / Despite / In spite of', textVi: 'Mặc dù, dẫu cho' },
          { key: 'B', text: 'Furthermore / Moreover', textVi: 'Hơn nữa' },
          { key: 'C', text: 'Therefore / Hence', textVi: 'Vì vậy' },
          { key: 'D', text: 'For example / For instance', textVi: 'Ví dụ' },
        ],
        correctAnswer: 'A',
        explanationVi: 'Although, Despite, In spite of là các liên từ / giới từ chỉ sự nhượng bộ mạnh mẽ trong văn viết học thuật.'
      }
    ]
  },
  'node-5': {
    id: 'unit-5',
    nodeId: 'node-5',
    title: 'Explorer Peak: Trophy Island Challenge',
    titleVi: 'Đảo 5: Đỉnh Thám Hiểm Gia (Đảo Cúp Vàng)',
    descriptionVi: 'Thử thách tổng hợp đa kỹ năng để mở khóa vinh danh Explorer!',
    xpReward: 100,
    questions: [
      {
        id: 'u5-q1',
        type: 'mcq',
        prompt: 'Hoàn thành thử thách đỉnh cao: Chọn từ tiếng Anh mang nghĩa "có mặt ở khắp mọi nơi đồng thời"?',
        promptVi: 'Từ vựng học thuật chỉ sự phổ biến khắp nơi:',
        options: [
          { key: 'A', text: 'Ubiquitous', textVi: 'Phổ biến rộng rãi khắp nơi' },
          { key: 'B', text: 'Scarce', textVi: 'Khan hiếm' },
          { key: 'C', text: 'Temporary', textVi: 'Tạm thời' },
          { key: 'D', text: 'Obsolete', textVi: 'Lỗi thời' },
        ],
        correctAnswer: 'A',
        explanationVi: 'Ubiquitous (/juːˈbɪk.wə.təs/) nghĩa là có mặt khắp nơi.'
      },
      {
        id: 'u5-q2',
        type: 'listen_mcq',
        prompt: 'Listen to the closing announcement:',
        promptVi: 'Nghe thông báo bế mạc và chọn thông điệp:',
        audioText: 'Congratulations to all scholars on completing the expedition!',
        audioLang: 'en-US',
        options: [
          { key: 'A', text: 'Chúc mừng tất cả học giả đã hoàn thành chuyến thám hiểm!', textVi: 'Chính xác' },
          { key: 'B', text: 'Thông báo hủy bỏ chuyến thám hiểm do bão.', textVi: 'Sai' },
          { key: 'C', text: 'Yêu cầu nộp lệ phí dự thi trước hạn.', textVi: 'Sai' },
          { key: 'D', text: 'Hẹn gặp lại vào năm học tới.', textVi: 'Sai' },
        ],
        correctAnswer: 'A',
        explanationVi: '"Congratulations to all scholars on completing the expedition!" chúc mừng các học giả hoàn thành hành trình.'
      },
      {
        id: 'u5-q3',
        type: 'scramble',
        prompt: 'Assemble the victory motto in Chinese:',
        promptVi: 'Ghép câu khẩu hiệu chiến thắng trong tiếng Trung (Có công mài sắt có ngày nên kim):',
        scrambleWords: ['铁杵', '成针', '磨'],
        correctScramble: ['铁杵', '磨', '成针'],
        correctAnswer: '铁杵磨成针',
        explanationVi: 'Thành ngữ: 铁杵磨成针 (Tiéc chǔ mó chéng zhēn - Có công mài sắt có ngày nên kim).'
      }
    ]
  }
};
