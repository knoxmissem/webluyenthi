import { FlashcardItem, MockExam, GoogleUser, ParaphrasePair } from '@/types';
import { initialFlashcards } from '@/data/flashcards';
import { allMockExams } from '@/data/mockExams';

export interface UserAccountData {
  user: GoogleUser;
  profile?: any;
  islandNodes?: any[];
  mistakes?: any[];
  studyPlan?: any;
  lastSyncedAt: string;
}

export interface ExamSubmissionPayload {
  answers: Record<string, string>;
  timeSpentSeconds: number;
  mode?: 'practice' | 'mock';
  writingDrafts?: Record<string, string>;
}

export interface GradedQuestionResult {
  questionId: string;
  number: number;
  prompt: string;
  promptVi?: string;
  userAnswer: string;
  correctAnswer: string;
  acceptedAnswers?: string[];
  isCorrect: boolean;
  explanation: string;
  explanationVi: string;
  sectionSkill: string;
  questionType?: string;
  evidenceText?: string;
  evidenceParagraph?: string;
  paraphrasePairs?: ParaphrasePair[];
  distractorExplanations?: Record<string, string>;
  trapNoteVi?: string;
  isWriting?: boolean;
}

export interface QuestionTypeBreakdown {
  type: string;
  score: number;
  total: number;
  accuracy: number;
}

export interface ExamResultRecord {
  id: string;
  examId: string;
  examTitle: string;
  examTitleVi: string;
  track: 'ielts' | 'hsk';
  level: string;
  mode: 'practice' | 'mock';
  isMiniMock?: boolean;
  dateCompleted: string;
  score: number;
  total: number;
  accuracyPercentage: number;
  estimatedBand: string;
  timeSpentSeconds: number;
  sectionBreakdown: {
    skill: string;
    score: number;
    total: number;
    accuracy: number;
  }[];
  questionTypeBreakdown?: QuestionTypeBreakdown[];
  questions: GradedQuestionResult[];
  feedback: {
    strengths: string[];
    improvements: string[];
    recommendations?: string[];
  };
}

// Global server in-memory singleton for self-hosted data
declare global {
  // eslint-disable-next-line no-var
  var __LINGORA_FLASHCARDS__: FlashcardItem[] | undefined;
  // eslint-disable-next-line no-var
  var __LINGORA_EXAMS__: MockExam[] | undefined;
  // eslint-disable-next-line no-var
  var __LINGORA_EXAM_RESULTS__: Map<string, ExamResultRecord> | undefined;
  // eslint-disable-next-line no-var
  var __LINGORA_USERS__: Map<string, UserAccountData> | undefined;
  // eslint-disable-next-line no-var
  var __LINGORA_CURRENT_SESSION__: GoogleUser | null | undefined;
}

// -------------------------------------------------------------
// SEED FLASHCARDS DATA
// -------------------------------------------------------------
const initialSeedFlashcards: FlashcardItem[] = [
  // --- IELTS BAND 7.0 - 8.5 ACADEMIC VOCABULARY ---
  {
    id: 'fc-ielts-1',
    track: 'ielts',
    level: 'IELTS Band 7.0+',
    term: 'ubiquitous',
    phonetic: '/juːˈbɪk.wə.təs/',
    partOfSpeech: 'adjective',
    meaningVi: 'Có mặt ở khắp nơi, phổ biến rộng rãi',
    meaningEn: 'Present, appearing, or found everywhere simultaneously',
    exampleSentence: 'Smartphones have become ubiquitous in modern urban environments.',
    exampleVi: 'Điện thoại thông minh đã trở nên phổ biến ở khắp mọi nơi trong môi trường đô thị hiện đại.',
    intervalDays: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-ielts-2',
    track: 'ielts',
    level: 'IELTS Band 7.0+',
    term: 'mitigate',
    phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
    partOfSpeech: 'verb',
    meaningVi: 'Giảm nhẹ, làm dịu bớt mức độ nghiêm trọng',
    meaningEn: 'Make something less severe, serious, or painful',
    exampleSentence: 'Governments should invest in renewable energy to mitigate climate risks.',
    exampleVi: 'Chính phủ nên đầu tư vào năng lượng tái tạo nhằm giảm thiểu các rủi ro khí hậu.',
    intervalDays: 2,
    repetition: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-ielts-3',
    track: 'ielts',
    level: 'IELTS Band 7.5+',
    term: 'detrimental',
    phonetic: '/ˌdet.rɪˈmen.təl/',
    partOfSpeech: 'adjective',
    meaningVi: 'Gây hại, có tác động tiêu cực',
    meaningEn: 'Tending to cause harm, damaging',
    exampleSentence: 'Excessive consumption of processed sugars produces detrimental effects on cognition.',
    exampleVi: 'Tiêu thụ quá nhiều đường chế biến gây ra những ảnh hưởng tiêu cực tới nhận thức.',
    intervalDays: 1,
    repetition: 0,
    easeFactor: 2.4,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-ielts-4',
    track: 'ielts',
    level: 'IELTS Band 7.5+',
    term: 'substantiate',
    phonetic: '/səbˈstæn.ʃi.eɪt/',
    partOfSpeech: 'verb',
    meaningVi: 'Cung cấp bằng chứng chứng minh, làm sáng tỏ',
    meaningEn: 'Provide evidence to support or prove the truth of something',
    exampleSentence: 'The researcher cited multiple double-blind trials to substantiate her hypothesis.',
    exampleVi: 'Nhà nghiên cứu đã trích dẫn nhiều thử nghiệm mù đôi để chứng minh giả thuyết của mình.',
    intervalDays: 3,
    repetition: 2,
    easeFactor: 2.6,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-ielts-5',
    track: 'ielts',
    level: 'IELTS Band 8.0+',
    term: 'ephemeral',
    phonetic: '/ɪˈfem.ər.əl/',
    partOfSpeech: 'adjective',
    meaningVi: 'Phù du, chóng tàn, ngắn ngủi',
    meaningEn: 'Lasting for a very short time',
    exampleSentence: 'Social media trends are often ephemeral, dissipating within weeks.',
    exampleVi: 'Các trào lưu mạng xã hội thường ngắn ngủi, tiêu tan chỉ trong vòng vài tuần.',
    intervalDays: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-ielts-6',
    track: 'ielts',
    level: 'IELTS Band 7.5+',
    term: 'pragmatic',
    phonetic: '/præɡˈmæt.ɪk/',
    partOfSpeech: 'adjective',
    meaningVi: 'Thực dụng, mang tính thực tiễn cao',
    meaningEn: 'Dealing with things sensibly and realistically based on practical considerations',
    exampleSentence: 'A pragmatic approach is necessary when allocating limited municipal budgets.',
    exampleVi: 'Một cách tiếp cận thực tế là rất cần thiết khi phân bổ ngân sách thành phố có hạn.',
    intervalDays: 2,
    repetition: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-ielts-7',
    track: 'ielts',
    level: 'IELTS Band 8.0+',
    term: 'exacerbate',
    phonetic: '/ɪɡˈzæs.ə.beɪt/',
    partOfSpeech: 'verb',
    meaningVi: 'Làm trầm trọng thêm (vấn đề, tình trạng bệnh)',
    meaningEn: 'Make a problem, bad situation, or negative feeling worse',
    exampleSentence: 'Rising inflation will only exacerbate the existing poverty crisis.',
    exampleVi: 'Lạm phát gia tăng sẽ chỉ làm trầm trọng thêm cuộc khủng hoảng nghèo đói hiện nay.',
    intervalDays: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-ielts-8',
    track: 'ielts',
    level: 'IELTS Band 7.5+',
    term: 'disseminate',
    phonetic: '/dɪˈsem.ɪ.neɪt/',
    partOfSpeech: 'verb',
    meaningVi: 'Lan truyền, phổ biến thông tin rộng rãi',
    meaningEn: 'Spread or disperse something, especially information, widely',
    exampleSentence: 'Universities play an indispensable role in disseminating scientific knowledge.',
    exampleVi: 'Các trường đại học đóng vai trò thiết yếu trong việc phổ biến tri thức khoa học.',
    intervalDays: 2,
    repetition: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },

  // --- HSK 3 - 5 CHINESE VOCABULARY ---
  {
    id: 'fc-hsk-1',
    track: 'hsk',
    level: 'HSK 3',
    term: '坚持',
    pinyin: 'jiānchí',
    phonetic: '[kiên trì]',
    partOfSpeech: 'verb',
    meaningVi: 'Kiên trì, giữ vững quyết tâm',
    meaningEn: 'Persist in, insist on, persevere',
    exampleSentence: '只要坚持努力，我们就能顺利通过考试。',
    examplePinyin: 'Zhǐyào jiānchí nǔlì, wǒmen jiù néng shùnlì tōngguò kǎoshì.',
    exampleVi: 'Chỉ cần kiên trì nỗ lực, chúng ta sẽ có thể thuận lợi vượt qua kỳ thi.',
    intervalDays: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-hsk-2',
    track: 'hsk',
    level: 'HSK 4',
    term: '按照',
    pinyin: 'ànzhào',
    phonetic: '[án chiếu]',
    partOfSpeech: 'preposition',
    meaningVi: 'Dựa theo, chiếu theo, căn cứ vào',
    meaningEn: 'According to, on the basis of',
    exampleSentence: '请大家按照会议要求准时提交工作报告。',
    examplePinyin: 'Qǐng dàjiā ànzhào huìyì yāoqiú zhǔnshí tíjiāo gōngzuò bàogào.',
    exampleVi: 'Xin mọi người căn cứ theo yêu cầu cuộc họp nộp báo cáo công việc đúng giờ.',
    intervalDays: 2,
    repetition: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-hsk-3',
    track: 'hsk',
    level: 'HSK 4',
    term: '丰富',
    pinyin: 'fēngfù',
    phonetic: '[phong phú]',
    partOfSpeech: 'adjective / verb',
    meaningVi: 'Phong phú, dồi dào; làm phong phú thêm',
    meaningEn: 'Rich, plentiful, abundant; enrich',
    exampleSentence: '多读书可以丰富我们的精神世界。',
    examplePinyin: 'Duō dúshū kěyǐ fēngfù wǒmen de jīngshén shìjiè.',
    exampleVi: 'Đọc nhiều sách có thể làm phong phú thế giới tinh thần của chúng ta.',
    intervalDays: 1,
    repetition: 0,
    easeFactor: 2.4,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-hsk-4',
    track: 'hsk',
    level: 'HSK 4',
    term: '责任',
    pinyin: 'zérèn',
    phonetic: '[trách nhiệm]',
    partOfSpeech: 'noun',
    meaningVi: 'Trách nhiệm, bổn phận',
    meaningEn: 'Duty, responsibility',
    exampleSentence: '保护大自然是我们每个人的共同责任。',
    examplePinyin: 'Bǎohù dàzìrán shì wǒmen měi gèrén de gòngtóng zérèn.',
    exampleVi: 'Bảo vệ tự nhiên là trách nhiệm chung của mỗi chúng ta.',
    intervalDays: 3,
    repetition: 2,
    easeFactor: 2.6,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-hsk-5',
    track: 'hsk',
    level: 'HSK 5',
    term: '谨慎',
    pinyin: 'jǐnshèn',
    phonetic: '[cẩn thận]',
    partOfSpeech: 'adjective',
    meaningVi: 'Cẩn trọng, thận trọng, dè dặt',
    meaningEn: 'Cautious, prudent, circumspect',
    exampleSentence: '在签署商业合同之前，我们需要保持谨慎态度。',
    examplePinyin: 'Zài qiānshǔ shāngyè hétóng zhīqián, wǒmen xūyào bǎochí jǐnshèn tàidù.',
    exampleVi: 'Trước khi ký hợp đồng thương mại, chúng ta cần giữ thái độ thận trọng.',
    intervalDays: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  },
  {
    id: 'fc-hsk-6',
    track: 'hsk',
    level: 'HSK 5',
    term: '关键',
    pinyin: 'guānjiàn',
    phonetic: '[quan kiện]',
    partOfSpeech: 'noun / adjective',
    meaningVi: 'Mấu chốt, điểm then chốt, mang tính quyết định',
    meaningEn: 'Crucial point, key, essential factor',
    exampleSentence: '团队沟通是决定项目成败的关键因素。',
    examplePinyin: 'Tuánduì gōutōng shì juédìng xiàngmù chéngbài de guānjiàn yīnsù.',
    exampleVi: 'Giao tiếp nhóm là nhân tố then chốt quyết định sự thành bại của dự án.',
    intervalDays: 2,
    repetition: 1,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  }
];

// -------------------------------------------------------------
// SEED MOCK EXAMS DATA
// -------------------------------------------------------------
const initialSeedExams: MockExam[] = [
  // 1. IELTS Mock Test 1
  {
    id: 'ielts-mock-01',
    track: 'ielts',
    title: 'IELTS Academic Practice Test 1',
    titleVi: 'Đề thi thử IELTS Academic Chuẩn Quốc Tế 1',
    level: 'Target Band 6.0 - 8.5',
    type: 'academic',
    durationMinutes: 60,
    totalQuestions: 10,
    sections: [
      {
        id: 'sec-lis-01',
        skill: 'listening',
        title: 'Listening Module: Section 2 Campus Accommodation',
        titleVi: 'Phần Nghe: Section 2 Giới thiệu khu Ký túc xá',
        instructions: 'Complete the notes and answer multiple choice questions 1-5 while the audio plays.',
        instructionsVi: 'Hoàn thành bản ghi chú và trả lời câu hỏi 1-5 trong lúc nghe đoạn băng.',
        audioDurationSeconds: 180,
        audioTranscript: `Hello students, welcome to the university campus accommodation briefing. My name is Alan Roberts, the head warden. I will guide you through the key regulations for this academic year. 

First, regarding communal dining: the main dining hall serves breakfast between 7:00 and 9:30 AM. For lunch and dinner, you can either dine at the cafeteria or prepare your own meals in the kitchen pod on each floor. Remember that all cooking equipment must be switched off after use to prevent fire alarms.

Second, your room keys and electronic keycards: your keycard grants 24-hour access to your residential block, the computer laboratory, and the study library. If you happen to misplace your card, please report immediately to the administration desk on Level 1. A replacement card costs fifteen pounds.

Third, quiet hours are strictly enforced between 11:00 PM and 7:00 AM on weekdays, and after midnight on weekends. Visitors must register at the reception lobby and are not permitted to stay overnight without prior written permission from the warden.

Finally, for parcel deliveries, all packages will be held at the central post room opposite the sports center. You will receive an automated email notification when a package arrives under your student registration number. Have a pleasant and productive year ahead!`,
        questions: [
          {
            id: 'mock-q1',
            number: 1,
            type: 'fill_blank',
            prompt: '1. Breakfast is served in the main dining hall until _____ AM.',
            correctAnswer: '9:30',
            explanation: 'Alan Roberts states: "the main dining hall serves breakfast between 7:00 and 9:30 AM."',
            explanationVi: 'Diễn giả nêu rõ bữa sáng phục vụ từ 7:00 đến 9:30 AM.'
          },
          {
            id: 'mock-q2',
            number: 2,
            type: 'fill_blank',
            prompt: '2. The cost to replace a lost electronic keycard is _____ pounds.',
            correctAnswer: '15',
            explanation: 'Alan Roberts confirms: "A replacement card costs fifteen pounds."',
            explanationVi: 'Phí cấp lại thẻ khóa bị mất là 15 bảng.'
          },
          {
            id: 'mock-q3',
            number: 3,
            type: 'mcq',
            prompt: '3. Where is the administration desk located for reporting lost keycards?',
            options: [
              { key: 'A', text: 'In the basement next to laundry', textVi: 'Tầng hầm cạnh phòng giặt' },
              { key: 'B', text: 'On Level 1', textVi: 'Trên tầng 1' },
              { key: 'C', text: 'At the main university security gate', textVi: 'Cổng bảo vệ chính trường' },
              { key: 'D', text: 'Inside the sports center', textVi: 'Bên trong trung tâm thể thao' },
            ],
            correctAnswer: 'B',
            explanation: 'The speaker states: "please report immediately to the administration desk on Level 1."',
            explanationVi: 'Báo cáo ngay tại bàn quản lý trên Tầng 1 (Level 1).'
          },
          {
            id: 'mock-q4',
            number: 4,
            type: 'mcq',
            prompt: '4. On weekdays, quiet hours commence at:',
            options: [
              { key: 'A', text: '10:00 PM', textVi: '10:00 tối' },
              { key: 'B', text: '10:30 PM', textVi: '10:30 tối' },
              { key: 'C', text: '11:00 PM', textVi: '11:00 tối' },
              { key: 'D', text: 'Midnight', textVi: 'Nửa đêm' },
            ],
            correctAnswer: 'C',
            explanation: 'Alan says: "quiet hours are strictly enforced between 11:00 PM and 7:00 AM on weekdays"',
            explanationVi: 'Giờ yên tĩnh bắt đầu từ 11:00 PM (11 giờ tối) các ngày trong tuần.'
          },
          {
            id: 'mock-q5',
            number: 5,
            type: 'fill_blank',
            prompt: '5. Student parcel deliveries are collected from the central post room opposite the _____ center.',
            correctAnswer: 'sports',
            explanation: 'He notes: "all packages will be held at the central post room opposite the sports center."',
            explanationVi: 'Bưu kiện được nhận tại phòng bưu điện trung tâm đối diện trung tâm thể thao (sports center).'
          }
        ]
      },
      {
        id: 'sec-read-01',
        skill: 'reading',
        title: 'Reading Module: The Renewable Energy Transition',
        titleVi: 'Phần Đọc: Bước chuyển dịch Năng lượng Tái tạo Toàn cầu',
        instructions: 'Read the passage below and answer Questions 6-10 according to the information provided.',
        instructionsVi: 'Đọc đoạn văn dưới đây và trả lời các câu hỏi 6-10.',
        passageText: `Paragraph A: The global transition away from fossil fuels toward sustainable energy vectors is frequently characterized as the most intricate technological undertaking of modern civilization. Unlike the shift from coal to petroleum during the early twentieth century, which was propelled primarily by energy density and extraction economics, the contemporary impetus is predominantly environmental and geopolitical.

Paragraph B: Wind and solar photovoltaic generation have achieved unprecedented cost parity with conventional thermoelectric plants across most equatorial and temperate latitudes. However, their fundamental intermittency introduces grid instability. Without grid-scale electrical storage solutions, sudden shifts in atmospheric meteorological conditions can precipitate severe frequency fluctuations across high-voltage transmission networks.

Paragraph C: Lithium-ion battery installations, while technologically mature, suffer from supply-chain constraints involving cobalt and lithium purification. Consequently, alternative mechanisms such as pumped hydro storage, compressed air energy storage (CAES), and green hydrogen synthesis via electrolysis are experiencing accelerated deployment. Hydro storage currently accounts for over ninety percent of global bulk storage capacity due to its extended operational lifecycle of over six decades.`,
        questions: [
          {
            id: 'mock-q6',
            number: 6,
            type: 'tfng',
            prompt: '6. The historical transition from coal to petroleum was primarily driven by ecological regulations.',
            options: [
              { key: 'TRUE', text: 'TRUE if the statement agrees with the information' },
              { key: 'FALSE', text: 'FALSE if the statement contradicts the information' },
              { key: 'NOT GIVEN', text: 'NOT GIVEN if there is no information on this' },
            ],
            correctAnswer: 'FALSE',
            explanation: 'Paragraph A specifies it was propelled primarily by "energy density and extraction economics", not ecological regulations.',
            explanationVi: 'Đoạn A nói rõ nguyên nhân là mật độ năng lượng và kinh tế khai thác chứ không phải quy định môi trường.'
          },
          {
            id: 'mock-q7',
            number: 7,
            type: 'tfng',
            prompt: '7. Solar photovoltaics currently cost roughly the same as traditional thermoelectric facilities in many regions.',
            options: [
              { key: 'TRUE', text: 'TRUE if the statement agrees with the information' },
              { key: 'FALSE', text: 'FALSE if the statement contradicts the information' },
              { key: 'NOT GIVEN', text: 'NOT GIVEN if there is no information on this' },
            ],
            correctAnswer: 'TRUE',
            explanation: 'Paragraph B explicitly highlights that "Wind and solar photovoltaic generation have achieved unprecedented cost parity with conventional thermoelectric plants".',
            explanationVi: 'Đoạn B khẳng định đã đạt mức ngang giá chi phí (cost parity).'
          },
          {
            id: 'mock-q8',
            number: 8,
            type: 'fill_blank',
            prompt: '8. Hydro storage systems feature an operational lifespan exceeding _____ decades.',
            correctAnswer: 'six',
            explanation: 'Paragraph C states: "due to its extended operational lifecycle of over six decades."',
            explanationVi: 'Đoạn C nêu rõ vòng đời vận hành trên 6 thập kỷ (six decades).'
          },
          {
            id: 'mock-q9',
            number: 9,
            type: 'mcq',
            prompt: '9. What is identified as the chief drawback of pure lithium-ion grid storage?',
            options: [
              { key: 'A', text: 'Short cable length', textVi: 'Chiều dài dây ngắn' },
              { key: 'B', text: 'Supply-chain constraints for raw minerals', textVi: 'Hạn chế chuỗi cung ứng khoáng sản' },
              { key: 'C', text: 'Inability to operate under rain', textVi: 'Không hoạt động dưới mưa' },
              { key: 'D', text: 'Excessive weight for foundations', textVi: 'Trọng lượng quá nặng' },
            ],
            correctAnswer: 'B',
            explanation: 'Paragraph C mentions "suffer from supply-chain constraints involving cobalt and lithium purification".',
            explanationVi: 'Hạn chế chuỗi cung ứng coban và tinh chế lithium.'
          },
          {
            id: 'mock-q10',
            number: 10,
            type: 'fill_blank',
            prompt: '10. Pumped hydro storage represents more than _____ percent of worldwide bulk electrical storage.',
            correctAnswer: 'ninety',
            explanation: 'Paragraph C states: "Hydro storage currently accounts for over ninety percent of global bulk storage capacity."',
            explanationVi: 'Chiếm trên 90% (ninety percent).'
          }
        ]
      }
    ]
  },

  // 2. IELTS Mock Test 2
  {
    id: 'ielts-mock-02',
    track: 'ielts',
    title: 'IELTS Academic Practice Test 2',
    titleVi: 'Đề thi thử IELTS Academic Chuẩn Quốc Tế 2',
    level: 'Target Band 6.5 - 9.0',
    type: 'academic',
    durationMinutes: 60,
    totalQuestions: 6,
    sections: [
      {
        id: 'sec-lis-02',
        skill: 'listening',
        title: 'Listening Module: Coral Reef Marine Biology Seminar',
        titleVi: 'Phần Nghe: Hội thảo Sinh thái Rạn san hô Biển',
        instructions: 'Listen and answer questions 1-3.',
        instructionsVi: 'Nghe đoạn ghi âm và trả lời câu hỏi 1-3.',
        audioDurationSeconds: 150,
        audioTranscript: `Welcome everyone to this marine biology lecture. Today, Dr. Evelyn Vance will discuss the symbiotic relationship between scleractinian corals and photosynthetic dinoflagellates, commonly known as zooxanthellae. When thermal anomalies exceed 1.5 degrees Celsius above seasonal maxima for prolonged periods, the coral host expels these algae, resulting in mass bleaching events. If ambient temperatures return to baseline within three weeks, partial recovery can occur; otherwise, mortality exceeds eighty percent.`,
        questions: [
          {
            id: 'm2-q1',
            number: 1,
            type: 'mcq',
            prompt: '1. What are the photosynthetic algae living in corals called?',
            options: [
              { key: 'A', text: 'Zooxanthellae', textVi: 'Tảo Zooxanthellae' },
              { key: 'B', text: 'Phytoplankton', textVi: 'Sinh vật phù du' },
              { key: 'C', text: 'Cyanobacteria', textVi: 'Vi khuẩn lam' },
              { key: 'D', text: 'Kelp', textVi: 'Tảo bẹ' }
            ],
            correctAnswer: 'A',
            explanation: 'The speaker explicitly mentions "photosynthetic dinoflagellates, commonly known as zooxanthellae."',
            explanationVi: 'Dẫn chứng: "commonly known as zooxanthellae".'
          },
          {
            id: 'm2-q2',
            number: 2,
            type: 'fill_blank',
            prompt: '2. Bleaching is triggered when thermal anomalies surpass _____ degrees Celsius above seasonal maxima.',
            correctAnswer: '1.5',
            explanation: 'Transcript states: "When thermal anomalies exceed 1.5 degrees Celsius above seasonal maxima".',
            explanationVi: 'Nhiệt độ bất thường vượt ngưỡng 1.5 độ C.'
          },
          {
            id: 'm2-q3',
            number: 3,
            type: 'fill_blank',
            prompt: '3. Partial recovery is feasible if baseline temperatures are restored within _____ weeks.',
            correctAnswer: 'three',
            explanation: 'Dr. Vance notes: "If ambient temperatures return to baseline within three weeks, partial recovery can occur."',
            explanationVi: 'Thời gian phục hồi trong vòng 3 tuần (three weeks).'
          }
        ]
      },
      {
        id: 'sec-read-02',
        skill: 'reading',
        title: 'Reading Module: Artificial Intelligence and Memory Consolidation',
        titleVi: 'Phần Đọc: Trí tuệ Nhân tạo và Quá trình Củng cố Trí nhớ Não bộ',
        instructions: 'Read and answer questions 4-6.',
        instructionsVi: 'Đọc và trả lời các câu hỏi 4-6.',
        passageText: `Recent neuromorphic computing architectures emulate the dual-memory system observed in mammalian brains. In humans, the hippocampus acts as a temporary buffer storing episodic experiences throughout waking hours, while slow-wave sleep enables the neocortex to integrate these memories into long-term schemas without catastrophic forgetting. Similarly, modern deep neural networks incorporate experience replay buffers to prevent catastrophic interference when acquiring sequential tasks.`,
        questions: [
          {
            id: 'm2-q4',
            number: 4,
            type: 'mcq',
            prompt: '4. Which mammalian brain structure serves as the temporary episodic buffer?',
            options: [
              { key: 'A', text: 'Hippocampus (Hải mã)', textVi: 'Vùng hải mã' },
              { key: 'B', text: 'Neocortex (Vỏ não mới)', textVi: 'Vỏ não mới' },
              { key: 'C', text: 'Cerebellum (Tiểu não)', textVi: 'Tiểu não' },
              { key: 'D', text: 'Amygdala (Hạch hạnh nhân)', textVi: 'Hạch hạnh nhân' }
            ],
            correctAnswer: 'A',
            explanation: 'Passage affirms: "the hippocampus acts as a temporary buffer storing episodic experiences."',
            explanationVi: 'Vùng hải mã (hippocampus) đóng vai trò bộ đệm tạm thời.'
          },
          {
            id: 'm2-q5',
            number: 5,
            type: 'tfng',
            prompt: '5. Deep neural networks use experience replay to avoid forgetting prior knowledge.',
            options: [
              { key: 'TRUE', text: 'TRUE' },
              { key: 'FALSE', text: 'FALSE' },
              { key: 'NOT GIVEN', text: 'NOT GIVEN' }
            ],
            correctAnswer: 'TRUE',
            explanation: 'Passage confirms neural nets incorporate experience replay to "prevent catastrophic interference when acquiring sequential tasks".',
            explanationVi: 'Dẫn chứng: dùng experience replay để tránh quên kiến thức cũ.'
          },
          {
            id: 'm2-q6',
            number: 6,
            type: 'mcq',
            prompt: '6. During which phase do neocortical networks consolidate long-term memory in humans?',
            options: [
              { key: 'A', text: 'Slow-wave sleep', textVi: 'Giấc ngủ sóng chậm' },
              { key: 'B', text: 'Intense aerobic exercise', textVi: 'Vận động thể chất mạnh' },
              { key: 'C', text: 'REM eye movement', textVi: 'Giấc ngủ mắt chuyển động nhanh' },
              { key: 'D', text: 'Meal consumption', textVi: 'Khi ăn' }
            ],
            correctAnswer: 'A',
            explanation: 'Passage states: "slow-wave sleep enables the neocortex to integrate these memories into long-term schemas".',
            explanationVi: 'Giai đoạn giấc ngủ sóng chậm (slow-wave sleep).'
          }
        ]
      }
    ]
  },

  // 3. HSK Mock Test 1 (HSK 4)
  {
    id: 'hsk-mock-01',
    track: 'hsk',
    title: 'HSK Level 4 Standard Mock Examination',
    titleVi: 'Đề thi thử Chuẩn Quốc Tế HSK Cấp 4 (Đề 1)',
    level: 'HSK 4 (1200 Từ vựng)',
    type: 'hsk',
    durationMinutes: 45,
    totalQuestions: 6,
    sections: [
      {
        id: 'sec-hsk-lis-01',
        skill: 'listening',
        title: 'HSK 4 听力 (Listening Comprehension)',
        titleVi: 'Phần Nghe Hiểu HSK 4',
        instructions: 'Listen to short dialogues and choose the best option.',
        instructionsVi: 'Nghe đoạn hội thoại và chọn đáp án chính xác nhất.',
        audioDurationSeconds: 120,
        audioTranscript: `男：王经理，这份合同需要您签字确认一下。
女：好的，你先放在桌上吧。我刚开完两个小时的部门会议，嗓子有点疼，先喝口水再看。
问：女的刚才在做什么？(Người phụ nữ vừa làm gì?)`,
        questions: [
          {
            id: 'hsk-q1',
            number: 1,
            type: 'mcq',
            prompt: '1. 女的刚才在做什么？(Người phụ nữ vừa làm gì?)',
            options: [
              { key: 'A', text: '开会 (Họp)', textVi: 'Họp hội nghị' },
              { key: 'B', text: '喝茶 (Uống trà)', textVi: 'Uống trà' },
              { key: 'C', text: '看电影 (Xem phim)', textVi: 'Xem phim' },
              { key: 'D', text: '跑步 (Chạy bộ)', textVi: 'Chạy bộ' },
            ],
            correctAnswer: 'A',
            explanation: '女的说: "我刚开完两个小时的部门会议" -> Cô ấy vừa họp xong cuộc họp phòng ban kéo dài 2 tiếng.',
            explanationVi: 'Người phụ nữ nói rõ vừa họp xong 2 tiếng (开会).'
          },
          {
            id: 'hsk-q2',
            number: 2,
            type: 'mcq',
            prompt: '2. 女的身体现在怎么了？(Sức khỏe cô ấy đang thế nào?)',
            options: [
              { key: 'A', text: '头疼 (Đau đầu)', textVi: 'Đau đầu' },
              { key: 'B', text: '嗓子疼 (Đau họng)', textVi: 'Đau họng' },
              { key: 'C', text: '肚子疼 (Đau bụng)', textVi: 'Đau bụng' },
              { key: 'D', text: '眼睛累 (Mỏi mắt)', textVi: 'Mỏi mắt' },
            ],
            correctAnswer: 'B',
            explanation: '女的说: "嗓子有点疼，先喝口水再看" -> Cổ họng hơi đau nên muốn uống nước trước.',
            explanationVi: 'Nhân vật nói: 嗓子有点疼 (họng hơi đau).'
          },
          {
            id: 'hsk-q3',
            number: 3,
            type: 'mcq',
            prompt: '3. 男的希望女的做什么？(Người nam muốn người nữ làm gì?)',
            options: [
              { key: 'A', text: '签字确认合同 (Ký xác nhận hợp đồng)', textVi: 'Ký hợp đồng' },
              { key: 'B', text: '一起去吃午饭 (Cùng đi ăn trưa)', textVi: 'Đi ăn trưa' },
              { key: 'C', text: '借一份文件 (Mượn một tập tài liệu)', textVi: 'Mượn tài liệu' },
              { key: 'D', text: '提前下班 (Tan làm sớm)', textVi: 'Tan làm sớm' }
            ],
            correctAnswer: 'A',
            explanation: '男的说: "这份合同需要您签字确认一下" -> Cần sếp ký xác nhận hợp đồng.',
            explanationVi: 'Người nam nói: "cần ký xác nhận hợp đồng".'
          }
        ]
      },
      {
        id: 'sec-hsk-read-01',
        skill: 'reading',
        title: 'HSK 4 阅读 (Reading Comprehension)',
        titleVi: 'Phần Đọc Hiểu HSK 4',
        instructions: 'Read each sentence and select the most appropriate option.',
        instructionsVi: 'Đọc câu và chọn phương án chính xác nhất.',
        passageText: `在中国，绿色出行越来越受到人们的欢迎。共享单车不仅方便了市民的日常出行，解决了"最后一公里"的交通难题，而且对保护城市环境、减少空气污染起到了积极的作用。如今，不仅是年轻人，很多老人也开始学会用手机扫码骑车。`,
        questions: [
          {
            id: 'hsk-q4',
            number: 4,
            type: 'mcq',
            prompt: '4. 共享单车解决了什么问题？(Xe đạp chia sẻ giải quyết được vấn đề gì?)',
            options: [
              { key: 'A', text: '买车太贵 (Mua xe quá đắt)', textVi: 'Mua xe quá đắt' },
              { key: 'B', text: '"最后一公里"的交通难题 (Bài toán giao thông "chặng cuối cùng")', textVi: 'Vấn đề giao thông chặng cuối' },
              { key: 'C', text: '没有手机 (Không có điện thoại)', textVi: 'Không có điện thoại' },
              { key: 'D', text: '城市道路狭窄 (Đường sá thành phố chật hẹp)', textVi: 'Đường chật' },
            ],
            correctAnswer: 'B',
            explanation: 'Đoạn văn viết: "解决了\'最后一公里\'的交通难题" -> Giải quyết bài toán chặng cuối.',
            explanationVi: 'Dẫn chứng: 解决了"最后一公里"的交通难题.'
          },
          {
            id: 'hsk-q5',
            number: 5,
            type: 'mcq',
            prompt: '5. 根据短文，现在谁也开始骑共享单车了？(Theo bài viết, đối tượng nào hiện nay cũng bắt đầu đi xe đạp chia sẻ?)',
            options: [
              { key: 'A', text: '外国游客 (Khách du lịch nước ngoài)', textVi: 'Khách nước ngoài' },
              { key: 'B', text: '小学生 (Học sinh tiểu học)', textVi: 'Học sinh tiểu học' },
              { key: 'C', text: '很多老人 (Nhiều người cao tuổi)', textVi: 'Nhiều người già' },
              { key: 'D', text: '出租车司机 (Tài xế taxi)', textVi: 'Tài xế taxi' },
            ],
            correctAnswer: 'C',
            explanation: 'Đoạn cuối viết: "不仅是年轻人，很多老人也开始学会用手机扫码骑车。"',
            explanationVi: 'Dẫn chứng: 很多老人也开始学会用手机扫码骑车.'
          },
          {
            id: 'hsk-q6',
            number: 6,
            type: 'mcq',
            prompt: '6. 这段话主要介绍共享单车的什么？(Đoạn văn này chủ yếu giới thiệu điều gì về xe đạp chia sẻ?)',
            options: [
              { key: 'A', text: '价格和费用 (Giá cả và chi phí)', textVi: 'Giá cả' },
              { key: 'B', text: '制造和维修 (Chế tạo và sửa chữa)', textVi: 'Chế tạo' },
              { key: 'C', text: '便利与环保作用 (Tiện ích và tác dụng bảo vệ môi trường)', textVi: 'Lợi ích tiện lợi và môi trường' },
              { key: 'D', text: '公司经营历史 (Lịch sử kinh doanh công ty)', textVi: 'Lịch sử' }
            ],
            correctAnswer: 'C',
            explanation: 'Đoạn văn nhấn mạnh cả hai khía cạnh: "方便了市民日常出行" (tiện lợi) và "保护城市环境、减少空气污染" (bảo vệ môi trường).',
            explanationVi: 'Bài viết nói về cả sự tiện lợi và bảo vệ môi trường.'
          }
        ]
      }
    ]
  },

  // 4. HSK Mock Test 2 (HSK 5)
  {
    id: 'hsk-mock-02',
    track: 'hsk',
    title: 'HSK Level 5 Comprehensive Mock Examination',
    titleVi: 'Đề thi thử Chuẩn Quốc Tế HSK Cấp 5 (Đề 2)',
    level: 'HSK 5 (2500 Từ vựng)',
    type: 'hsk',
    durationMinutes: 60,
    totalQuestions: 4,
    sections: [
      {
        id: 'sec-hsk5-lis',
        skill: 'listening',
        title: 'HSK 5 听力理解 (Listening Comprehension)',
        titleVi: 'Phần Nghe Hiểu HSK 5',
        instructions: 'Listen and analyze speaker intentions.',
        instructionsVi: 'Nghe và phân tích ý đồ người nói.',
        audioDurationSeconds: 120,
        audioTranscript: `中国的高铁网络不仅缩短了城市之间的时空距离，更深刻改变了区域经济格局。许多生活在大城市的上班族，选择在高铁沿线的中小城市安家，形成了独特的"双城生活"模式。`,
        questions: [
          {
            id: 'hsk5-q1',
            number: 1,
            type: 'mcq',
            prompt: '1. "双城生活"主要指什么现象？("Cuộc sống hai thành phố" chỉ hiện tượng gì?)',
            options: [
              { key: 'A', text: '在大城市工作，在沿线中小城市居住 (Làm việc ở thành phố lớn, sống ở thành phố vệ tinh)', textVi: 'Làm việc một nơi, sống một nơi' },
              { key: 'B', text: '一年在两个不同城市旅游 (Mỗi năm du lịch 2 thành phố)', textVi: 'Du lịch' },
              { key: 'C', text: '同时在两家跨国公司兼职 (Làm thêm cùng lúc 2 công ty)', textVi: 'Làm thêm' },
              { key: 'D', text: '拥有两所大学学位 (Có 2 bằng đại học)', textVi: 'Bằng cấp' }
            ],
            correctAnswer: 'A',
            explanation: 'Đoạn văn nêu rõ: "许多生活在大城市的上班族，选择在高铁沿线的中小城市安家".',
            explanationVi: 'Đi làm ở thành phố lớn và mua nhà sống ở thành phố lân cận kết nối bằng tàu cao tốc.'
          },
          {
            id: 'hsk5-q2',
            number: 2,
            type: 'mcq',
            prompt: '2. 根据材料，中国高铁主要带来了哪两方面的变化？(Tàu cao tốc mang lại thay đổi ở 2 khía cạnh nào?)',
            options: [
              { key: 'A', text: '时空距离与区域经济格局 (Khoảng cách không gian - thời gian và cục diện kinh tế vùng)', textVi: 'Khoảng cách & kinh tế vùng' },
              { key: 'B', text: '机票价格与汽车销量 (Giá vé máy bay và doanh số ô tô)', textVi: 'Giá vé' },
              { key: 'C', text: '旅游景点门票与酒店预订 (Vé tham quan và đặt phòng)', textVi: 'Khách sạn' },
              { key: 'D', text: '外国语学院招生人数 (Số lượng tuyển sinh ngoại ngữ)', textVi: 'Tuyển sinh' }
            ],
            correctAnswer: 'A',
            explanation: 'Dẫn chứng: "缩短了城市之间的时空距离，更深刻改变了区域经济格局".',
            explanationVi: 'Rút ngắn khoảng cách thời gian và thay đổi cục diện kinh tế.'
          }
        ]
      },
      {
        id: 'sec-hsk5-read',
        skill: 'reading',
        title: 'HSK 5 阅读理解 (Reading Comprehension)',
        titleVi: 'Phần Đọc Hiểu HSK 5',
        instructions: 'Read and answer cultural comprehension questions.',
        instructionsVi: 'Đọc và trả lời câu hỏi đọc hiểu văn hóa.',
        passageText: `茶道在中国不仅是一种饮茶艺术，更蕴含着深厚的人生哲理。"茶"字拆开，为"人"在"草木"之间，寓意人应当顺应自然、返璞归真。品茶讲究心平气和，在快节奏的现代生活中，沏一壶清茶往往能让人慢下脚步，体悟内心的宁静。`,
        questions: [
          {
            id: 'hsk5-q3',
            number: 3,
            type: 'mcq',
            prompt: '3. 根据短文，"茶"字拆开后表达了怎样的哲学意蕴？(Chữ "Trà" tách ra mang ý nghĩa triết học gì?)',
            options: [
              { key: 'A', text: '人应当顺应自然、返璞归真 (Con người thuận theo tự nhiên, trở về sự mộc mạc nguyên bản)', textVi: 'Thuận theo tự nhiên' },
              { key: 'B', text: '草木生长需要大量雨水 (Cây cỏ cần nhiều nước mưa)', textVi: 'Cây cỏ' },
              { key: 'C', text: '现代生活必须加快效率 (Cuộc sống hiện đại cần nhanh hơn)', textVi: 'Tốc độ' },
              { key: 'D', text: '茶具必须用名贵木材制作 (Dụng cụ pha trà phải làm bằng gỗ quý)', textVi: 'Dụng cụ' }
            ],
            correctAnswer: 'A',
            explanation: 'Đoạn văn viết: "为\'人\'在\'草木\'之间，寓意人应当顺应自然、返璞归真".',
            explanationVi: 'Dẫn chứng: Con người ở giữa cỏ cây, ngụ ý sống hòa hợp với thiên nhiên.'
          },
          {
            id: 'hsk5-q4',
            number: 4,
            type: 'mcq',
            prompt: '4. 品茶在现代生活中的独特价值是什么？(Giá trị độc đáo của thưởng trà trong cuộc sống hiện đại?)',
            options: [
              { key: 'A', text: '让人慢下脚步，体悟内心宁静 (Giúp con người sống chậm lại, cảm nhận sự an yên nội tâm)', textVi: 'Sống chậm và bình yên' },
              { key: 'B', text: '替代一日三餐 (Thay thế bữa ăn chính)', textVi: 'Thay bữa ăn' },
              { key: 'C', text: '提高运动心率 (Tăng nhịp tim khi vận động)', textVi: 'Vận động' },
              { key: 'D', text: '节省日常开支 (Tiết kiệm chi tiêu)', textVi: 'Tiết kiệm' }
            ],
            correctAnswer: 'A',
            explanation: 'Đoạn kết viết: "在快节奏的现代生活中，沏一壶清茶往往能让人慢下脚步，体悟内心的宁静。"',
            explanationVi: 'Dẫn chứng: Giúp con người chậm lại và tìm thấy sự bình an.'
          }
        ]
      }
    ]
  }
];

// -------------------------------------------------------------
// IN-MEMORY SINGLETON REPOSITORY INSTANCE
// -------------------------------------------------------------
function getFlashcardsStore(): FlashcardItem[] {
  if (!global.__LINGORA_FLASHCARDS__ || global.__LINGORA_FLASHCARDS__.length === 0) {
    global.__LINGORA_FLASHCARDS__ = [...initialFlashcards];
  }
  return global.__LINGORA_FLASHCARDS__;
}

function getExamsStore(): MockExam[] {
  if (!global.__LINGORA_EXAMS__ || global.__LINGORA_EXAMS__.length === 0) {
    global.__LINGORA_EXAMS__ = [...allMockExams];
  }
  return global.__LINGORA_EXAMS__;
}

function getExamResultsStore(): Map<string, ExamResultRecord> {
  if (!global.__LINGORA_EXAM_RESULTS__) {
    global.__LINGORA_EXAM_RESULTS__ = new Map<string, ExamResultRecord>();
  }
  return global.__LINGORA_EXAM_RESULTS__;
}

// -------------------------------------------------------------
// FLASHCARD METHODS
// -------------------------------------------------------------
export function getAllFlashcards(filters?: {
  track?: string;
  category?: string;
  level?: string;
  search?: string;
  status?: string;
}) {
  const store = getFlashcardsStore();
  let result = [...store];

  if (filters?.track && filters.track !== 'all') {
    result = result.filter(card => card.track === filters.track);
  }

  if (filters?.category && filters.category !== 'all') {
    result = result.filter(card => card.category === filters.category);
  }

  if (filters?.level) {
    result = result.filter(card => card.level.toLowerCase().includes(filters.level!.toLowerCase()));
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(card =>
      card.term.toLowerCase().includes(q) ||
      card.meaningVi.toLowerCase().includes(q) ||
      card.meaningEn.toLowerCase().includes(q) ||
      (card.pinyin && card.pinyin.toLowerCase().includes(q))
    );
  }

  if (filters?.status === 'mastered') {
    result = result.filter(card => card.mastered);
  } else if (filters?.status === 'learning') {
    result = result.filter(card => !card.mastered);
  }

  const masteredCount = store.filter(c => c.mastered).length;
  const learningCount = store.filter(c => !c.mastered).length;

  return {
    total: result.length,
    overallTotal: store.length,
    masteredCount,
    learningCount,
    data: result
  };
}

export function getFlashcardById(id: string) {
  const store = getFlashcardsStore();
  return store.find(c => c.id === id) || null;
}

export function createFlashcard(data: Omit<FlashcardItem, 'id' | 'intervalDays' | 'repetition' | 'easeFactor' | 'nextReviewDate' | 'mastered'>) {
  const store = getFlashcardsStore();
  const newCard: FlashcardItem = {
    ...data,
    id: `fc-user-${Date.now()}`,
    intervalDays: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  };
  store.unshift(newCard);
  return newCard;
}

// SM-2 Spaced Repetition calculation
export function reviewFlashcardSM2(id: string, rating: 1 | 2 | 3 | 4 | 5) {
  const store = getFlashcardsStore();
  const cardIndex = store.findIndex(c => c.id === id);
  if (cardIndex === -1) return null;

  const card = store[cardIndex];
  let { repetition, intervalDays, easeFactor } = card;

  if (rating >= 3) {
    if (repetition === 0) {
      intervalDays = 1;
    } else if (repetition === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetition += 1;
    easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;
  } else {
    repetition = 0;
    intervalDays = 1;
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + intervalDays);

  const updatedCard: FlashcardItem = {
    ...card,
    repetition,
    intervalDays,
    easeFactor: Number(easeFactor.toFixed(2)),
    nextReviewDate: nextDate.toISOString(),
    mastered: repetition >= 4
  };

  store[cardIndex] = updatedCard;
  return updatedCard;
}

export function deleteFlashcard(id: string) {
  const store = getFlashcardsStore();
  const cardIndex = store.findIndex(c => c.id === id);
  if (cardIndex === -1) return false;
  store.splice(cardIndex, 1);
  return true;
}

// -------------------------------------------------------------
// EXAM METHODS
// -------------------------------------------------------------
export function getAllExams(filters?: {
  track?: string;
  type?: string;
  skill?: string;
  isMiniMock?: boolean;
  questionType?: string;
  search?: string;
}) {
  const exams = getExamsStore();
  let result = [...exams];

  if (filters?.track && filters.track !== 'all') {
    result = result.filter(e => e.track === filters.track);
  }
  if (filters?.type) {
    result = result.filter(e => e.type === filters.type);
  }
  if (filters?.isMiniMock !== undefined) {
    result = result.filter(e => Boolean(e.isMiniMock) === filters.isMiniMock);
  }
  if (filters?.skill && filters.skill !== 'all') {
    result = result.filter(e => e.sections.some(s => s.skill === filters.skill));
  }
  if (filters?.questionType) {
    result = result.filter(e =>
      e.sections.some(s => s.questions.some(q => q.type === filters.questionType))
    );
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.titleVi.toLowerCase().includes(q) ||
      e.level.toLowerCase().includes(q)
    );
  }

  return result.map(e => ({
    id: e.id,
    track: e.track,
    title: e.title,
    titleVi: e.titleVi,
    level: e.level,
    type: e.type,
    durationMinutes: e.durationMinutes,
    totalQuestions: e.sections.reduce((acc, s) => acc + s.questions.length, 0),
    sectionsCount: e.sections.length,
    skills: Array.from(new Set(e.sections.map(s => s.skill))),
    isMiniMock: Boolean(e.isMiniMock),
    isOfficialSimulation: Boolean(e.isOfficialSimulation),
    syllabusVersion: e.syllabusVersion || 'cambridge'
  }));
}

export function getExamById(id: string) {
  const exams = getExamsStore();
  return exams.find(e => e.id === id) || null;
}

// Helper: Normalize answer string
function normalizeAnswer(str: string): string {
  return (str || '')
    .trim()
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    .replace(/\s+/g, ' ');
}

// Grade exam server-side and calculate Band / HSK Score
export function submitExamSubmission(examId: string, payload: ExamSubmissionPayload): ExamResultRecord | null {
  const exam = getExamById(examId);
  if (!exam) return null;

  const userAnswers = payload.answers || {};
  let totalScore = 0;
  const gradedQuestions: GradedQuestionResult[] = [];
  const sectionBreakdown: { skill: string; score: number; total: number; accuracy: number }[] = [];
  const typeMap = new Map<string, { score: number; total: number }>();

  for (const section of exam.sections) {
    let sectionScore = 0;
    const sectionTotal = section.questions.length;

    for (const q of section.questions) {
      const rawUserVal = userAnswers[q.number.toString()] || '';
      const normUser = normalizeAnswer(rawUserVal);
      const normCorrect = normalizeAnswer(q.correctAnswer);

      let isCorrect = false;
      const isWriting = q.type.startsWith('writing_');

      if (isWriting) {
        // For writing: count words, award full completion credit if word target approached
        const words = rawUserVal.trim().split(/\s+/).filter(Boolean).length;
        const target = q.wordCountTarget || 150;
        isCorrect = words >= Math.round(target * 0.7); // 70%+ of minimum target length
      } else if (q.type === 'hsk_sentence_reorder') {
        const cleanUser = rawUserVal.replace(/\s+/g, '');
        const cleanCorrect = q.correctAnswer.replace(/\s+/g, '');
        isCorrect = cleanUser === cleanCorrect;
        if (!isCorrect && q.acceptedAnswers) {
          isCorrect = q.acceptedAnswers.some(a => a.replace(/\s+/g, '') === cleanUser);
        }
      } else {
        isCorrect = normUser === normCorrect;

        // Check accepted alternatives if not exact match
        if (!isCorrect && q.acceptedAnswers && q.acceptedAnswers.length > 0) {
          isCorrect = q.acceptedAnswers.some(ans => normalizeAnswer(ans) === normUser);
        }

        // Built-in lexical heuristics
        if (!isCorrect) {
          if (normCorrect === '15' && normUser === 'fifteen') isCorrect = true;
          if (normCorrect === 'six' && normUser === '6') isCorrect = true;
          if (normCorrect === '930' && (normUser === '930 am' || normUser === '930am')) isCorrect = true;
          if (normCorrect === 'true' && normUser === 't') isCorrect = true;
          if (normCorrect === 'false' && normUser === 'f') isCorrect = true;
          if (normCorrect === 'yes' && normUser === 'y') isCorrect = true;
          if (normCorrect === 'no' && normUser === 'n') isCorrect = true;
        }
      }

      if (isCorrect) {
        totalScore += 1;
        sectionScore += 1;
      }

      // Track accuracy by question type
      const qType = q.type || 'mcq';
      const existingType = typeMap.get(qType) || { score: 0, total: 0 };
      existingType.total += 1;
      if (isCorrect) existingType.score += 1;
      typeMap.set(qType, existingType);

      gradedQuestions.push({
        questionId: q.id,
        number: q.number,
        prompt: q.prompt,
        promptVi: q.promptVi,
        userAnswer: rawUserVal || 'Chưa trả lời',
        correctAnswer: q.correctAnswer,
        acceptedAnswers: q.acceptedAnswers,
        isCorrect,
        explanation: q.explanation,
        explanationVi: q.explanationVi,
        sectionSkill: section.skill,
        questionType: q.type,
        evidenceText: q.evidenceText,
        evidenceParagraph: q.evidenceParagraph,
        paraphrasePairs: q.paraphrasePairs,
        distractorExplanations: q.distractorExplanations,
        trapNoteVi: q.trapNoteVi,
        isWriting
      });
    }

    sectionBreakdown.push({
      skill: section.skill,
      score: sectionScore,
      total: sectionTotal,
      accuracy: Math.round((sectionScore / (sectionTotal || 1)) * 100)
    });
  }

  const questionTypeBreakdown: QuestionTypeBreakdown[] = Array.from(typeMap.entries()).map(([type, stats]) => ({
    type,
    score: stats.score,
    total: stats.total,
    accuracy: Math.round((stats.score / (stats.total || 1)) * 100)
  }));

  const totalQuestions = gradedQuestions.length;
  const accuracyPercentage = Math.round((totalScore / (totalQuestions || 1)) * 100);

  // Band Score calculation with authentic IELTS & HSK scale
  let estimatedBand = '0.0';
  if (exam.track === 'ielts') {
    if (totalScore <= 0) {
      estimatedBand = '0.0';
    } else if (accuracyPercentage >= 96) {
      estimatedBand = '9.0';
    } else if (accuracyPercentage >= 90) {
      estimatedBand = '8.5';
    } else if (accuracyPercentage >= 85) {
      estimatedBand = '8.0';
    } else if (accuracyPercentage >= 78) {
      estimatedBand = '7.5';
    } else if (accuracyPercentage >= 70) {
      estimatedBand = '7.0';
    } else if (accuracyPercentage >= 63) {
      estimatedBand = '6.5';
    } else if (accuracyPercentage >= 55) {
      estimatedBand = '6.0';
    } else if (accuracyPercentage >= 48) {
      estimatedBand = '5.5';
    } else if (accuracyPercentage >= 40) {
      estimatedBand = '5.0';
    } else if (accuracyPercentage >= 32) {
      estimatedBand = '4.5';
    } else if (accuracyPercentage >= 25) {
      estimatedBand = '4.0';
    } else if (accuracyPercentage >= 18) {
      estimatedBand = '3.5';
    } else if (accuracyPercentage >= 12) {
      estimatedBand = '3.0';
    } else if (accuracyPercentage >= 7) {
      estimatedBand = '2.5';
    } else if (accuracyPercentage >= 3) {
      estimatedBand = '2.0';
    } else {
      estimatedBand = '1.0';
    }
  } else {
    // HSK /300 scale
    const scaledScore = Math.round((accuracyPercentage / 100) * 300);
    estimatedBand = `${scaledScore}/300 (${scaledScore >= 180 ? 'Đạt' : 'Chưa đạt'})`;
  }

  const strengths: string[] = [];
  const improvements: string[] = [];
  const recommendations: string[] = [];

  sectionBreakdown.forEach(s => {
    if (s.accuracy >= 70) {
      strengths.push(`Kỹ năng ${s.skill.toUpperCase()} đạt độ chính xác cao (${s.accuracy}%). Bạn nắm vững từ khóa và phản xạ tốt.`);
    } else {
      improvements.push(`Kỹ năng ${s.skill.toUpperCase()} cần bổ sung luyện tập (${s.accuracy}%). Xem lại các câu sai trong Sổ tay lỗi.`);
    }
  });

  // Targeted recommendations based on weak question types
  questionTypeBreakdown.forEach(qb => {
    if (qb.accuracy < 60) {
      if (qb.type.includes('matching')) {
        recommendations.push('Cải thiện dạng bài Nối (Matching): Chú ý tìm từ đồng nghĩa thay vì tìm từ giống hệt trong bài đọc.');
      } else if (qb.type.includes('tfng') || qb.type.includes('ynng')) {
        recommendations.push('Cải thiện dạng True/False/Not Given: Phân biệt rõ mâu thuẫn trực tiếp (False) và thiếu thông tin (Not Given).');
      } else if (qb.type.includes('completion')) {
        recommendations.push('Cải thiện dạng Điền từ (Completion): Chú ý giới hạn từ (Word Limit) và dạng từ (danh/động/tính từ).');
      } else if (qb.type.includes('reorder')) {
        recommendations.push('Cải thiện Sắp xếp câu HSK: Ôn tập kỹ cấu trúc câu chữ 把, 被 và bổ ngữ kết quả.');
      }
    }
  });

  if (strengths.length === 0) {
    strengths.push('Bạn đã nỗ lực hoàn thành trọn vẹn thời gian bài thi theo đúng quy chế.');
  }

  const resultId = `res-${exam.id}-${Date.now()}`;
  const examResult: ExamResultRecord = {
    id: resultId,
    examId: exam.id,
    examTitle: exam.title,
    examTitleVi: exam.titleVi,
    track: exam.track,
    level: exam.level,
    mode: payload.mode || 'mock',
    isMiniMock: Boolean(exam.isMiniMock),
    dateCompleted: new Date().toISOString(),
    score: totalScore,
    total: totalQuestions,
    accuracyPercentage,
    estimatedBand,
    timeSpentSeconds: payload.timeSpentSeconds || 0,
    sectionBreakdown,
    questionTypeBreakdown,
    questions: gradedQuestions,
    feedback: {
      strengths,
      improvements,
      recommendations
    }
  };

  const resultsStore = getExamResultsStore();
  resultsStore.set(resultId, examResult);
  resultsStore.set(exam.id, examResult);

  return examResult;
}

export function getExamResultById(resultId: string): ExamResultRecord | null {
  const resultsStore = getExamResultsStore();
  const record = resultsStore.get(resultId);
  if (!record) return null;
  // Dynamic recalibration: Ensure 0 correct answers is never inflated
  if (record.track === 'ielts' && (record.score === 0 || record.accuracyPercentage === 0)) {
    record.estimatedBand = '0.0';
  }
  return record;
}

// -------------------------------------------------------------
// GOOGLE AUTH & USER ACCOUNT CLOUD SYNC METHODS
// -------------------------------------------------------------
function getUserAccountsStore(): Map<string, UserAccountData> {
  if (!global.__LINGORA_USERS__) {
    global.__LINGORA_USERS__ = new Map<string, UserAccountData>();
  }
  return global.__LINGORA_USERS__;
}

export function loginGoogleAccount(payload: { email: string; name?: string; avatar?: string }): { user: GoogleUser; accountData: UserAccountData } {
  const store = getUserAccountsStore();
  const normalizedEmail = payload.email.trim().toLowerCase();
  
  let account = store.get(normalizedEmail);
  const now = new Date().toISOString();

  if (!account) {
    const user: GoogleUser = {
      id: `usr-google-${Date.now()}`,
      email: normalizedEmail,
      name: payload.name || normalizedEmail.split('@')[0],
      avatar: payload.avatar || 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      provider: 'google',
      lastLoginAt: now
    };

    account = {
      user,
      lastSyncedAt: now
    };
    store.set(normalizedEmail, account);
  } else {
    account.user.lastLoginAt = now;
    if (payload.name) account.user.name = payload.name;
    if (payload.avatar) account.user.avatar = payload.avatar;
  }

  global.__LINGORA_CURRENT_SESSION__ = account.user;
  return { user: account.user, accountData: account };
}

export function loginOrRegisterEmailAccount(payload: { email: string; name?: string; password?: string; isRegister?: boolean }): { user: GoogleUser; accountData: UserAccountData; isNewUser: boolean } {
  const store = getUserAccountsStore();
  const normalizedEmail = payload.email.trim().toLowerCase();
  let account = store.get(normalizedEmail);
  const now = new Date().toISOString();
  let isNew = false;

  if (!account) {
    isNew = true;
    const user: GoogleUser = {
      id: `usr-${Date.now()}`,
      email: normalizedEmail,
      name: payload.name || normalizedEmail.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(normalizedEmail)}`,
      provider: 'google',
      lastLoginAt: now
    };
    account = {
      user,
      lastSyncedAt: now
    };
    store.set(normalizedEmail, account);
  } else {
    account.user.lastLoginAt = now;
    if (payload.name) account.user.name = payload.name;
  }

  global.__LINGORA_CURRENT_SESSION__ = account.user;
  return { user: account.user, accountData: account, isNewUser: isNew };
}

export function getCurrentSession(): GoogleUser | null {
  return global.__LINGORA_CURRENT_SESSION__ || null;
}

export function logoutGoogleSession(): void {
  global.__LINGORA_CURRENT_SESSION__ = null;
}

export function syncUserProgress(email: string, data: { profile?: any; islandNodes?: any[]; mistakes?: any[]; studyPlan?: any }): UserAccountData | null {
  const store = getUserAccountsStore();
  const normalizedEmail = email.trim().toLowerCase();
  let account = store.get(normalizedEmail);

  if (!account) {
    const { accountData } = loginGoogleAccount({ email: normalizedEmail });
    account = accountData;
  }

  account.profile = data.profile || account.profile;
  account.islandNodes = data.islandNodes || account.islandNodes;
  account.mistakes = data.mistakes || account.mistakes;
  account.studyPlan = data.studyPlan || account.studyPlan;
  account.lastSyncedAt = new Date().toISOString();

  store.set(normalizedEmail, account);
  return account;
}

export function getUserProgress(email: string): UserAccountData | null {
  const store = getUserAccountsStore();
  const normalizedEmail = email.trim().toLowerCase();
  return store.get(normalizedEmail) || null;
}

