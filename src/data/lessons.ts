import { Lesson } from '@/types';

export const sampleLessons: Lesson[] = [
  // 1. IELTS Listening Lesson
  {
    id: 'ielts-lis-01',
    track: 'ielts',
    skill: 'listening',
    level: 'IELTS 5.5 - 6.5',
    title: 'Campus Accommodation & Facilities',
    titleVi: 'Ký túc xá Đại học & Cơ sở vật chất',
    description: 'Master Section 2 listening with note completion, map labeling, and distraction recognition.',
    descriptionVi: 'Chinh phục Section 2 với dạng bài điền ghi chú, xác định vị trí sơ đồ và nhận diện bẫy gây nhiễu.',
    durationMinutes: 12,
    xpReward: 60,
    exercise: {
      id: 'ex-lis-01',
      title: 'University Housing Induction',
      titleVi: 'Hướng dẫn nhận phòng ký túc xá đại học',
      instruction: 'Listen to the housing officer briefing new international students and answer Questions 1-5.',
      instructionVi: 'Nghe cán bộ quản lý ký túc xá hướng dẫn sinh viên quốc tế mới và trả lời câu hỏi 1-5.',
      type: 'listening',
      audioTranscript: `Good morning everyone and welcome to Westlake University student accommodation. My name is Sandra and I will be your residence officer this term. Before you head to your blocks, I want to clarify a few essential points. First, regarding the communal kitchens: each floor has one shared kitchen equipped with electric cookers and microwave ovens. Please make sure all personal food items in the refrigerator are labeled clearly with your student ID number. If you need replacement keys or have maintenance issues, our office is located on the ground floor next to the student lounge, open from 8:30 AM to 5:00 PM on weekdays. For weekend emergencies like electrical faults, contact security via extension 404. Lastly, laundry facilities are situated in the basement of Block B; tokens can be purchased from the automatic machine using contactless card payment only. Thank you and have a wonderful semester!`,
      questions: [
        {
          id: 'q-lis-1',
          number: 1,
          prompt: 'What must students write on food stored in the communal refrigerator?',
          promptVi: 'Sinh viên phải ghi thông tin gì lên thực phẩm để trong tủ lạnh chung?',
          type: 'mcq',
          options: [
            { key: 'A', text: 'Room number and name', textVi: 'Số phòng và tên' },
            { key: 'B', text: 'Student ID number', textVi: 'Mã số sinh viên' },
            { key: 'C', text: 'Expiration date', textVi: 'Hạn sử dụng' },
            { key: 'D', text: 'Arrival date', textVi: 'Ngày đến' },
          ],
          correctAnswer: 'B',
          explanation: 'Sandra mentions: "Please make sure all personal food items in the refrigerator are labeled clearly with your student ID number."',
          explanationVi: 'Sandra nói rõ: "Hãy đảm bảo tất cả đồ ăn cá nhân trong tủ lạnh được ghi rõ mã số sinh viên."',
          evidenceText: 'labeled clearly with your student ID number',
          category: 'comprehension'
        },
        {
          id: 'q-lis-2',
          number: 2,
          prompt: 'Where is the residence officer’s office located?',
          promptVi: 'Văn phòng cán bộ quản lý ký túc xá nằm ở đâu?',
          type: 'mcq',
          options: [
            { key: 'A', text: 'In the basement of Block B', textVi: 'Dưới tầng hầm tòa B' },
            { key: 'B', text: 'On the first floor of the library', textVi: 'Tầng 1 thư viện' },
            { key: 'C', text: 'On the ground floor next to the student lounge', textVi: 'Tầng trệt cạnh phòng sinh hoạt chung' },
            { key: 'D', text: 'Opposite the main cafeteria', textVi: 'Đối diện nhà ăn chính' },
          ],
          correctAnswer: 'C',
          explanation: 'Sandra states: "our office is located on the ground floor next to the student lounge, open from 8:30 AM to 5:00 PM"',
          explanationVi: 'Sandra nêu: "văn phòng chúng tôi nằm ở tầng trệt cạnh phòng sinh hoạt chung."',
          evidenceText: 'located on the ground floor next to the student lounge',
          category: 'comprehension'
        },
        {
          id: 'q-lis-3',
          number: 3,
          prompt: 'For weekend maintenance emergencies, students should contact extension: _____',
          promptVi: 'Trường hợp khẩn cấp cuối tuần, sinh viên gọi số máy lẻ: _____',
          type: 'fill_blank',
          correctAnswer: '404',
          explanation: 'Sandra mentions: "For weekend emergencies like electrical faults, contact security via extension 404."',
          explanationVi: 'Sandra thông báo: "Nếu gặp sự cố cuối tuần, liên hệ bảo vệ qua số máy lẻ 404."',
          evidenceText: 'contact security via extension 404',
          category: 'comprehension'
        },
        {
          id: 'q-lis-4',
          number: 4,
          prompt: 'Laundry tokens can only be purchased using:',
          promptVi: 'Xèng giặt là chỉ có thể mua bằng hình thức nào:',
          type: 'mcq',
          options: [
            { key: 'A', text: 'Cash only', textVi: 'Chỉ tiền mặt' },
            { key: 'B', text: 'Student credit account', textVi: 'Tài khoản thẻ sinh viên' },
            { key: 'C', text: 'Contactless card payment', textVi: 'Thẻ thanh toán không tiếp xúc' },
            { key: 'D', text: 'Mobile banking transfer', textVi: 'Chuyển khoản ngân hàng' },
          ],
          correctAnswer: 'C',
          explanation: 'Sandra explains: "tokens can be purchased from the automatic machine using contactless card payment only."',
          explanationVi: 'Sandra nêu: "chỉ có thể mua xèng tại máy tự động bằng thẻ không tiếp xúc."',
          evidenceText: 'using contactless card payment only',
          category: 'evidence'
        }
      ]
    }
  },

  // 2. IELTS Reading Lesson
  {
    id: 'ielts-read-01',
    track: 'ielts',
    skill: 'reading',
    level: 'IELTS 6.0 - 7.0',
    title: 'The Psychology of Habit Formation',
    titleVi: 'Tâm lý học về Sự hình thành Thói quen',
    description: 'Learn skimming and scanning strategies for True/False/Not Given and matching arguments.',
    descriptionVi: 'Luyện kỹ năng Skimming & Scanning cho dạng câu hỏi True/False/Not Given và ghép luận điểm.',
    durationMinutes: 15,
    xpReward: 70,
    exercise: {
      id: 'ex-read-01',
      title: 'Academic Reading: Neurological Habit Loops',
      titleVi: 'Đọc học thuật: Vòng lặp thói quen trong hệ thần kinh',
      instruction: 'Read the academic text below and answer Questions 1-4 based on textual evidence.',
      instructionVi: 'Đọc đoạn văn học thuật dưới đây và trả lời câu hỏi 1-4 dựa trên dẫn chứng trong bài.',
      type: 'reading',
      passageText: `In recent neurological research, habits are identified not as conscious decisions, but as automated behavioral sequences stored in the basal ganglia, a primitive structure situated deep within the human brain. Dr. Ann Graybiel at the Massachusetts Institute of Technology discovered that when a laboratory rat navigates a newly designed maze, its neural activity surges across the prefrontal cortex as it actively deliberates every left and right turn. However, once the route becomes thoroughly familiar, cortical activity dramatically subsides while the basal ganglia assumes operational control.

This biological economy allows human ancestors to preserve cognitive energy for unexpected perils rather than spending mental bandwidth remembering how to walk or ignite fire. Charles Duhigg formulated this neurological loop into three sequential stages: the cue (a sensory or situational trigger), the routine (the physical or cognitive action performed), and the reward (a neurochemical feedback such as dopamine release that signals the brain to encode the pattern for future utility).

Significantly, contemporary research reveals that habits can never be entirely eradicated; instead, they can only be supplanted. When individuals attempt to extinguish an undesirable habit solely through willpower, failure rates exceed seventy percent because the underlying neural pathways remain physically etched. The golden rule of habit modification requires retaining the original cue and the subsequent reward while deliberately engineering a substitute routine in between.`,
      questions: [
        {
          id: 'q-read-1',
          number: 1,
          prompt: 'Neural activity in the prefrontal cortex decreases once an animal becomes accustomed to a route.',
          promptVi: 'Hoạt động thần kinh ở vỏ não trước trán giảm xuống khi động vật đã quen thuộc với lộ trình.',
          type: 'tfng',
          options: [
            { key: 'TRUE', text: 'TRUE (Đúng theo bài)' },
            { key: 'FALSE', text: 'FALSE (Sai theo bài)' },
            { key: 'NOT GIVEN', text: 'NOT GIVEN (Không được đề cập)' },
          ],
          correctAnswer: 'TRUE',
          explanation: 'The passage explicitly says: "once the route becomes thoroughly familiar, cortical activity dramatically subsides while the basal ganglia assumes operational control."',
          explanationVi: 'Đoạn văn viết: "once the route becomes thoroughly familiar, cortical activity dramatically subsides" (hoạt động vỏ não giảm đáng kể khi đã quen đường).',
          evidenceText: 'once the route becomes thoroughly familiar, cortical activity dramatically subsides',
          category: 'comprehension'
        },
        {
          id: 'q-read-2',
          number: 2,
          prompt: 'Human ancestors spent more mental bandwidth on routine tasks than on survival instincts.',
          promptVi: 'Tổ tiên loài người tiêu tốn nhiều năng lượng tinh thần cho các hoạt động thường ngày hơn là bản năng sinh tồn.',
          type: 'tfng',
          options: [
            { key: 'TRUE', text: 'TRUE' },
            { key: 'FALSE', text: 'FALSE' },
            { key: 'NOT GIVEN', text: 'NOT GIVEN' },
          ],
          correctAnswer: 'FALSE',
          explanation: 'The passage says biological economy allows humans to "preserve cognitive energy for unexpected perils rather than spending mental bandwidth remembering how to walk or ignite fire."',
          explanationVi: 'Bài viết khẳng định cơ chế này giúp "tiết kiệm năng lượng cho các hiểm nguy bất ngờ thay vì tiêu tốn cho việc nhớ cách đi lại hay nhóm lửa".',
          evidenceText: 'preserve cognitive energy for unexpected perils rather than spending mental bandwidth',
          category: 'evidence'
        },
        {
          id: 'q-read-3',
          number: 3,
          prompt: 'Dr. Graybiel received an international award for her maze experiment.',
          promptVi: 'Tiến sĩ Graybiel đã nhận được giải thưởng quốc tế cho thí nghiệm mê cung của mình.',
          type: 'tfng',
          options: [
            { key: 'TRUE', text: 'TRUE' },
            { key: 'FALSE', text: 'FALSE' },
            { key: 'NOT GIVEN', text: 'NOT GIVEN' },
          ],
          correctAnswer: 'NOT GIVEN',
          explanation: 'The passage mentions Dr. Ann Graybiel discovered the phenomenon at MIT, but nowhere does it mention whether she received an international award.',
          explanationVi: 'Bài viết chỉ đề cập nghiên cứu của bà tại MIT, không hề nói đến việc bà có nhận giải thưởng quốc tế hay không.',
          evidenceText: '',
          category: 'comprehension'
        },
        {
          id: 'q-read-4',
          number: 4,
          prompt: 'According to the golden rule of habit change, which component must be altered?',
          promptVi: 'Theo quy tắc vàng thay đổi thói quen, thành phần nào cần được thay thế?',
          type: 'mcq',
          options: [
            { key: 'A', text: 'The Cue (Tín hiệu)', textVi: 'Tín hiệu kích hoạt' },
            { key: 'B', text: 'The Routine (Hành vi thường lệ)', textVi: 'Hành vi thường lệ' },
            { key: 'C', text: 'The Reward (Phần thưởng)', textVi: 'Phần thưởng dopamine' },
            { key: 'D', text: 'All three components simultaneously', textVi: 'Cả ba thành phần cùng lúc' },
          ],
          correctAnswer: 'B',
          explanation: 'The passage specifies: "The golden rule of habit modification requires retaining the original cue and the subsequent reward while deliberately engineering a substitute routine in between."',
          explanationVi: 'Bài nêu rõ: giữ nguyên cue và reward, đồng thời chủ động tạo ra một hành vi thay thế (substitute routine) ở giữa.',
          evidenceText: 'deliberately engineering a substitute routine in between',
          category: 'comprehension'
        }
      ]
    }
  },

  // 3. IELTS Writing Lesson
  {
    id: 'ielts-wri-01',
    track: 'ielts',
    skill: 'writing',
    level: 'IELTS 6.0 - 7.5',
    title: 'Writing Task 2: Remote Work & Society',
    titleVi: 'Writing Task 2: Làm việc từ xa và Tác động Xã hội',
    description: 'Learn cohesive essay structuring, Task Achievement, and Lexical Resource with instant AI rubric evaluation.',
    descriptionVi: 'Học cách xây dựng luận điểm mạch lạc, đạt chuẩn Task Achievement và vốn từ vựng học thuật với bộ tiêu chí chấm điểm AI.',
    durationMinutes: 20,
    xpReward: 90,
    exercise: {
      id: 'ex-wri-01',
      title: 'Opinion Essay: Advantages & Disadvantages',
      titleVi: 'Bài luận nêu quan điểm: Thuận lợi & Bất lợi',
      instruction: 'Write at least 250 words on the prompt below. Your draft will be evaluated against the 4 official IELTS criteria.',
      instructionVi: 'Viết bài luận tối thiểu 250 từ về chủ đề dưới đây. Bài làm sẽ được đối chiếu theo 4 tiêu chí chấm thi IELTS.',
      type: 'writing',
      passageText: `PROMPT: In many countries, an increasing number of people are choosing to work from home rather than in a traditional office environment. Do you think the advantages of this development outweigh its disadvantages? Give reasons for your answer and include any relevant examples from your knowledge or experience.`,
      questions: []
    }
  },

  // 4. IELTS Speaking Lesson
  {
    id: 'ielts-spk-01',
    track: 'ielts',
    skill: 'speaking',
    level: 'IELTS 5.5 - 7.5',
    title: 'Speaking Part 2: Describe an Unforgettable Journey',
    titleVi: 'Speaking Part 2: Miêu tả một chuyến đi đáng nhớ',
    description: 'Practice the 1-minute cue card preparation, 2-minute speaking timer, and analyze Band 7.5 vs 8.5 model answers.',
    descriptionVi: 'Thực hành 1 phút chuẩn bị dàn ý thẻ gợi ý, 2 phút nói liên tục và phân tích bài mẫu Band 7.5 và 8.5.',
    durationMinutes: 10,
    xpReward: 65,
    exercise: {
      id: 'ex-spk-01',
      title: 'Cue Card Speaking Simulator',
      titleVi: 'Mô phỏng bài thi nói thẻ gợi ý Part 2',
      instruction: 'You have 1 minute to take notes, then speak for 1 to 2 minutes into your microphone.',
      instructionVi: 'Bạn có 1 phút để ghi chú dàn ý, sau đó nói từ 1 đến 2 phút qua microphone.',
      type: 'speaking',
      passageText: `CUE CARD:
Describe an unforgettable journey you have taken.
You should say:
- Where you went and who you traveled with
- How you traveled there
- What you did during the trip
And explain why this journey was so memorable to you.`,
      questions: []
    }
  },

  // 5. HSK 3 Grammar Lesson: 把 Câu chữ bǎ
  {
    id: 'hsk-gram-01',
    track: 'hsk',
    skill: 'grammar',
    level: 'HSK 3 - 4',
    title: 'HSK 3-4 Grammar: The 把 (bǎ) Sentence Structure',
    titleVi: 'Ngữ pháp HSK 3-4: Cấu trúc câu chữ 把 (bǎ)',
    description: 'Master the disposal structure 把 to express actions causing changes to objects in Chinese.',
    descriptionVi: 'Nắm vững câu chữ 把 diễn tả hành động tác động làm biến đổi hoặc dịch chuyển tân ngữ trong tiếng Trung.',
    durationMinutes: 15,
    xpReward: 60,
    exercise: {
      id: 'ex-hsk-g01',
      title: 'Understanding & Applying 把',
      titleVi: 'Hiểu và vận dụng cấu trúc câu chữ 把',
      instruction: 'Analyze the formula: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác (了/到/在...). Then answer questions.',
      instructionVi: 'Phân tích công thức: S + 把 + O + V + Thành phần khác. Sau đó hoàn thành các câu hỏi trắc nghiệm và sắp xếp từ.',
      type: 'grammar',
      passageText: `【CÔNG THỨC CHUẨN】:
Chủ ngữ (S) + [Phó từ/Thời gian] + 把 + Tân ngữ (O) + Động từ (V) + Thành phần khác (了, 在..., 到..., 给...)

Ví dụ:
1. 我把作业做完了。(Wǒ bǎ zuòyè zuò wán le.) — Tôi đã làm xong bài tập về nhà.
2. 请把书放在桌子上。(Qǐng bǎ shū fàng zài zhuōzi shang.) — Xin hãy để cuốn sách lên bàn.
3. 他把钥匙忘在家里了。(Tā bǎ yàoshi wàng zài jiā lǐ le.) — Anh ấy bỏ quên chìa khóa ở nhà rồi.

Lưu ý quan trọng:
- Động từ trong câu chữ 把 phải là ngoại động từ mang tính xử lý, KHÔNG dùng các động từ tri giác như 知道, 喜欢, 觉得.
- Sau động từ bắt buộc phải có thành phần khác (bổ ngữ, trợ từ 了, tân ngữ gián tiếp), không thể đứng trơ trọi một động từ đơn.`,
      questions: [
        {
          id: 'q-hsk-g1',
          number: 1,
          prompt: 'Chọn câu đúng ngữ pháp tiếng Trung biểu đạt "Hãy đưa hộ chiếu cho tôi":',
          promptVi: 'Chọn câu dùng đúng chữ 把:',
          type: 'mcq',
          options: [
            { key: 'A', text: '请把护照给我。(Qǐng bǎ hùzhào gěi wǒ.)', textVi: 'Đúng chuẩn cấu trúc 把 + O + V + 给' },
            { key: 'B', text: '请给我把护照。(Qǐng gěi wǒ bǎ hùzhào.)', textVi: 'Sai vị trí cụm tân ngữ' },
            { key: 'C', text: '把请护照给我。(Bǎ qǐng hùzhào gěi wǒ.)', textVi: 'Sai vị trí từ 请' },
            { key: 'D', text: '护照给我请把。(Hùzhào gěi wǒ qǐng bǎ.)', textVi: 'Lộn xộn trật tự từ' },
          ],
          correctAnswer: 'A',
          explanation: 'Công thức: Chủ ngữ (ngầm định) + 请 + 把 + Tân ngữ (护照) + Động từ/giới từ (给) + Tân ngữ (我). Đáp án A chính xác.',
          explanationVi: 'Đáp án A tuân thủ chuẩn S + 把 + O + V + Thành phần khác.',
          category: 'grammar'
        },
        {
          id: 'q-hsk-g2',
          number: 2,
          prompt: 'Trong các câu sau, câu nào KHÔNG THỂ dùng cấu trúc câu chữ 把?',
          promptVi: 'Câu nào vi phạm quy tắc động từ câu chữ 把?',
          type: 'mcq',
          options: [
            { key: 'A', text: '他吃了那个苹果。(Anh ấy đã ăn quả táo đó)', textVi: 'Có thể chuyển thành 他把那个苹果吃了' },
            { key: 'B', text: '我很喜欢这部中国电影。(Tôi rất thích bộ phim Trung Quốc này)', textVi: 'Động từ tâm lý/tri giác "喜欢" không dùng 把' },
            { key: 'C', text: '我关上了窗户。(Tôi đã đóng cửa sổ)', textVi: 'Có thể chuyển thành 我把窗户关上了' },
            { key: 'D', text: '服务员打扫了房间。(Nhân viên đã dọn dẹp phòng)', textVi: 'Có thể chuyển thành 服务员把房间打扫了' },
          ],
          correctAnswer: 'B',
          explanation: 'Các động từ chỉ tâm lý, cảm xúc, tri giác như 喜欢 (thích), 知道 (biết), 觉得 (cảm thấy) không biểu thị tác động vật lý làm thay đổi trạng thái của tân ngữ, do đó KHÔNG được dùng trong câu chữ 把.',
          explanationVi: 'Động từ "喜欢" là trạng thái tình cảm, không gây tác động biến đổi đối tượng nên không dùng chữ 把.',
          category: 'grammar'
        },
        {
          id: 'q-hsk-g3',
          number: 3,
          prompt: 'Điền từ thích hợp vào chỗ trống: 他把空调_____了。(Anh ấy đã tắt điều hòa rồi)',
          promptVi: 'Động từ nào phù hợp với hành động xử lý điều hòa?',
          type: 'mcq',
          options: [
            { key: 'A', text: '关 (guān - tắt/đóng)', textVi: 'Tắt điều hòa' },
            { key: 'B', text: '买 (mǎi - mua)', textVi: 'Mua' },
            { key: 'C', text: '看 (kàn - xem)', textVi: 'Xem' },
            { key: 'D', text: '去 (qù - đi)', textVi: 'Đi' },
          ],
          correctAnswer: 'A',
          explanation: '关 (guān) nghĩa là tắt thiết bị điện (关空调 / 关灯). Câu hoàn chỉnh: 他把空调关了。',
          explanationVi: '关 (tắt) kết hợp với 空调 (điều hòa) và trợ từ 了 diễn tả hoàn tất hành động.',
          category: 'vocab'
        }
      ]
    }
  },

  // 6. HSK Reading & Vocabulary Lesson
  {
    id: 'hsk-read-01',
    track: 'hsk',
    skill: 'reading',
    level: 'HSK 4',
    title: 'HSK 4 Reading: Healthy Lifestyle & Habits',
    titleVi: 'Đọc hiểu HSK 4: Lối sống lành mạnh & Thói quen',
    description: 'Read Chinese short essays with toggleable Pinyin and instant character lookup.',
    descriptionVi: 'Đọc đoạn văn ngắn tiếng Trung có bật/tắt Pinyin và tra cứu nghĩa từng từ vựng.',
    durationMinutes: 12,
    xpReward: 55,
    exercise: {
      id: 'ex-hsk-r01',
      title: 'Reading Comprehension: 健康的生活方式',
      titleVi: 'Bài đọc: Lối sống lành mạnh',
      instruction: 'Read the passage below. You can toggle Pinyin on/off to test your character recognition.',
      instructionVi: 'Đọc đoạn văn dưới đây. Bạn có thể bật/tắt Pinyin để rèn luyện khả năng nhận diện mặt chữ Hán.',
      type: 'reading',
      passageText: `现在很多年轻人都非常重视健康。研究表明，每天坚持散步半个小时，不仅对身体有好处，而且能让人心情愉快。另外，保证充足的睡眠也是保持活力的关键。如果你总是熬夜，第二天的学习和工作效率就会大大降低。

除了运动和睡眠，合理的饮食也很重要。我们应该少吃油腻和含糖量高的食物，多吃新鲜的蔬菜和水果。养成良好的生活习惯，是对自己健康最好的投资。`,
      pinyinText: `Xiànzài hěnduō niánqīng rén dōu fēicháng zhòngshì jiànkāng. Yánjiū biǎomíng, měitiān jiānchí sànbù bàn gè xiǎoshí, bùjǐn duì shēntǐ yǒu hǎochu, érqiě néng ràng rén xīnqíng yúkuài. Lìngwài, bǎozhèng chōngzú de shuìmián yě shì bǎochí huólì de guānjiàn. Rúguǒ nǐ zǒngshì áoyè, dì-èr tiān de xuéxí hé gōngzuò xiàolǜ jiù huì dàdà jiàngdī.

Chúle yùndòng hé shuìmián, hélǐ de yǐnshí yě hěn zhòngyào. Wǒmen yīnggāi shǎo chī yóunì hé hán táng liàng gāo de shíwù, duō chī xīnxiān de shūcài hé shuǐguǒ. Yǎng chéng liánghǎo de shēnghuó xíguàn, shì duì zìjǐ jiànkāng zuì hǎo de tóuzī.`,
      questions: [
        {
          id: 'q-hsk-r1',
          number: 1,
          prompt: '根据短文，每天坚持散步半小时有什么好处？(Theo đoạn văn, kiên trì đi bộ 30 phút mỗi ngày có lợi ích gì?)',
          promptVi: 'Theo đoạn văn, đi bộ mỗi ngày giúp ích gì?',
          type: 'mcq',
          options: [
            { key: 'A', text: '对身体有益且心情愉快 (Tốt cho sức khỏe và tâm trạng vui vẻ)', textVi: 'Tốt cho cơ thể và tâm trạng' },
            { key: 'B', text: '可以认识更多的新朋友 (Có thể làm quen nhiều bạn mới)', textVi: 'Làm quen bạn mới' },
            { key: 'C', text: '能立刻减肥 (Có thể giảm cân ngay lập tức)', textVi: 'Giảm cân ngay' },
            { key: 'D', text: '不需要注意饮食 (Không cần chú ý ăn uống)', textVi: 'Không cần ăn kiêng' },
          ],
          correctAnswer: 'A',
          explanation: 'Bài viết nêu rõ: "每天坚持散步半个小时，不仅对身体有好处，而且能让人心情愉快。"',
          explanationVi: 'Trong bài có câu: "bùjǐn duì shēntǐ yǒu hǎochu, érqiě néng ràng rén xīnqíng yúkuài".',
          category: 'comprehension'
        },
        {
          id: 'q-hsk-r2',
          number: 2,
          prompt: '经常熬夜会导致什么后果？(Hay thức khuya sẽ dẫn đến hậu quả gì?)',
          promptVi: 'Thức khuya thường xuyên dẫn đến hậu quả gì?',
          type: 'mcq',
          options: [
            { key: 'A', text: '体重增加 (Tăng cân)', textVi: 'Tăng cân' },
            { key: 'B', text: '第二天的学习和工作效率大大降低 (Hiệu suất làm việc và học tập ngày hôm sau giảm mạnh)', textVi: 'Hiệu suất giảm mạnh' },
            { key: 'C', text: '睡得更香 (Ngủ ngon hơn)', textVi: 'Ngủ ngon hơn' },
            { key: 'D', text: '变得更聪明 (Thông minh hơn)', textVi: 'Thông minh hơn' },
          ],
          correctAnswer: 'B',
          explanation: 'Đoạn văn viết: "如果你总是熬夜，第二天的学习和工作效率就会大大降低。"',
          explanationVi: 'Dẫn chứng: "dì-èr tiān de xuéxí hé gōngzuò xiàolǜ jiù huì dàdà jiàngdī".',
          category: 'comprehension'
        }
      ]
    }
  }
];
