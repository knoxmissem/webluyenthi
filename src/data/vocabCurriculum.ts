import { VocabTopic, FlashcardItem, VocabSession } from '@/types';

// Helper to construct flashcard items cleanly
function makeCard(
  id: string,
  track: 'ielts' | 'hsk',
  category: 'academic' | 'collocation' | 'idiom' | 'chengyu' | 'general',
  level: string,
  term: string,
  partOfSpeech: string,
  meaningVi: string,
  meaningEn: string,
  exampleSentence: string,
  exampleVi: string,
  options?: {
    phonetic?: string;
    pinyin?: string;
    examplePinyin?: string;
    collocations?: string[];
    writingContext?: string;
    topicId?: string;
    sessionId?: string;
    sessionNumber?: number;
  }
): FlashcardItem {
  return {
    id,
    track,
    category,
    level,
    term,
    phonetic: options?.phonetic,
    pinyin: options?.pinyin,
    partOfSpeech,
    meaningVi,
    meaningEn,
    exampleSentence,
    examplePinyin: options?.examplePinyin,
    exampleVi,
    collocations: options?.collocations || [],
    writingContext: options?.writingContext,
    topicId: options?.topicId,
    sessionId: options?.sessionId,
    sessionNumber: options?.sessionNumber,
    intervalDays: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    mastered: false
  };
}

// ============================================================================
// 10 RICH IELTS THEMATIC DOMAINS (Band 7.5 - 9.0 Lexical Resource)
// ============================================================================

export interface IeltsWordTemplate {
  term: string;
  pos: string;
  vi: string;
  en: string;
  phonetic: string;
  cols: string[];
  ex: string;
  exVi: string;
  tip: string;
}

export interface IeltsThemeGroup {
  topicKey: string;
  topicTitleVi: string;
  badge: string;
  icon: string;
  themes: {
    title: string;
    titleVi: string;
    descVi: string;
    level: string;
    words: IeltsWordTemplate[];
  }[];
}

export const ieltsSessionTemplates: IeltsThemeGroup[] = [
  // TIER 1: FOUNDATIONAL ACADEMIC ESSENTIALS (Band 5.0 - 5.5)
  {
    topicKey: 'ielts-foundations',
    topicTitleVi: 'Chuyên Đề Nền Tảng Cốt Lõi: Đời Sống Học Đường & Bày Tỏ Quan Điểm',
    badge: 'IELTS Band 5.0 - 5.5 Core',
    icon: 'BookOpen',
    themes: [
      {
        title: 'Core Academic Vocabulary & Everyday Expression',
        titleVi: 'Từ Vựng Cốt Lõi: Đời Sống, Học Tập & Bày Tỏ Quan Điểm',
        descVi: 'Nắm chắc 18 từ vựng học thuật cơ bản nhất giúp diễn đạt ý kiến, giải pháp và nguyên nhân chuẩn xác trong IELTS.',
        level: 'IELTS Band 5.0 - 5.5',
        words: [
          { term: 'essential', pos: 'adjective', vi: 'Cần thiết, cốt lõi, không thể thiếu', en: 'Completely necessary; extremely important', phonetic: '/ɪˈsen.ʃəl/', cols: ['essential role', 'play an essential part'], ex: 'Good communication skills are essential for career success.', exVi: 'Kỹ năng giao tiếp tốt là điều cốt lõi cho thành công sự nghiệp.', tip: 'Từ căn bản thay thế cho "very necessary".' },
          { term: 'beneficial', pos: 'adjective', vi: 'Có lợi, mang lại hiệu quả tốt', en: 'Helpful or advantageous', phonetic: '/ˌben.əˈfɪʃ.əl/', cols: ['beneficial to health', 'highly beneficial'], ex: 'Regular physical exercise is beneficial to overall physical health.', exVi: 'Tập thể dục thường xuyên rất có lợi cho sức khỏe thể chất toàn diện.', tip: 'Từ học thuật thay cho từ đơn giản "good".' },
          { term: 'convenient', pos: 'adjective', vi: 'Tiện lợi, thuận tiện', en: 'Suitable for your purposes and needs', phonetic: '/kənˈviː.ni.ənt/', cols: ['convenient location', 'convenient method'], ex: 'Online shopping has made purchasing goods much more convenient.', exVi: 'Mua sắm trực tuyến giúp việc mua hàng thuận tiện hơn rất nhiều.', tip: 'Dùng khi bàn về ưu điểm của công nghệ đời sống.' },
          { term: 'encourage', pos: 'verb', vi: 'Khuyến khích, động viên', en: 'Give support, confidence, or hope to', phonetic: '/ɪnˈkɝː.ɪdʒ/', cols: ['encourage students', 'encourage innovation'], ex: 'Parents should encourage their children to read books independently.', exVi: 'Cha mẹ nên khuyến khích con cái đọc sách một cách độc lập.', tip: 'Động từ thường dùng trong chủ đề gia đình và giáo dục.' },
          { term: 'significant', pos: 'adjective', vi: 'Quan trọng, đáng chú ý', en: 'Important, large, or noticeable', phonetic: '/sɪɡˈnɪf.ə.kənt/', cols: ['significant change', 'significant difference'], ex: 'The government has made significant investments in public transportation.', exVi: 'Chính phủ đã đầu tư đáng kể vào hệ thống giao thông công cộng.', tip: 'Từ nâng cấp thay thế từ đơn giản "big / important".' },
          { term: 'maintain', pos: 'verb', vi: 'Duy trì, giữ vững', en: 'Keep in existence or continue to hold', phonetic: '/meɪnˈteɪn/', cols: ['maintain balance', 'maintain a healthy weight'], ex: 'It is difficult to maintain a healthy work-life balance in modern cities.', exVi: 'Rất khó để duy trì sự cân bằng giữa công việc và đời sống ở thành thị hiện đại.', tip: 'Thường dùng trong các chủ đề lối sống và áp lực công việc.' },
          { term: 'opportunity', pos: 'noun', vi: 'Cơ hội, thời cơ tốt', en: 'A time or set of circumstances that makes it possible to do something', phonetic: '/ˌɑː.pɚˈtuː.nə.t̬i/', cols: ['career opportunity', 'provide opportunities'], ex: 'Studying abroad provides students with the opportunity to experience cultures.', exVi: 'Du học đem lại cho sinh viên cơ hội trải nghiệm các nền văn hóa mới.', tip: 'Từ vựng cốt lõi thay thế cho "chance".' },
          { term: 'challenge', pos: 'noun', vi: 'Thử thách, thách thức', en: 'A demanding or stimulating situation', phonetic: '/ˈtʃæl.ɪndʒ/', cols: ['face challenges', 'major challenge'], ex: 'Finding affordable housing is a major challenge for young workers.', exVi: 'Tìm nhà ở giá hợp lý là một thách thức lớn đối với lao động trẻ.', tip: 'Dùng thay từ đơn giản "difficult problem".' },
          { term: 'positive impact', pos: 'noun phrase', vi: 'Tác động tích cực', en: 'A constructive or favorable influence', phonetic: '/ˈpɑː.zə.t̬ɪv ˈɪm.pækt/', cols: ['have a positive impact on', 'exert a positive impact'], ex: 'Green energy adoption exerts a positive impact on environmental preservation.', exVi: 'Áp dụng năng lượng xanh mang lại tác động tích cực đến bảo tồn môi trường.', tip: 'Cụm liên kết điểm cao cho câu phân tích lợi ích.' },
          { term: 'negative consequence', pos: 'noun phrase', vi: 'Hậu quả tiêu cực', en: 'An undesirable or harmful result', phonetic: '/ˈneɡ.ə.t̬ɪv ˈkɑːn.sə.kwens/', cols: ['suffer negative consequences', 'lead to consequences'], ex: 'Excessive smartphone use often brings negative consequences to sleep quality.', exVi: 'Sử dụng điện thoại quá đà thường dẫn đến hậu quả tiêu cực cho chất lượng giấc ngủ.', tip: 'Cụm từ then chốt khi viết câu phân tích tác hại.' },
          { term: 'play a vital role in', pos: 'phrase', vi: 'Đóng vai trò sống còn trong', en: 'Be of the greatest importance in something', phonetic: '/pleɪ ə ˈvaɪ.t̬əl roʊl ɪn/', cols: ['play a vital role in education', 'play a crucial role'], ex: 'Primary educators play a vital role in cultivating student character.', exVi: 'Giáo viên tiểu học đóng vai trò sống còn trong việc bồi dưỡng nhân cách học sinh.', tip: 'Mẫu câu kinh điển mở đầu đoạn thân bài IELTS.' },
          { term: 'improve', pos: 'verb', vi: 'Cải thiện, nâng cao chất lượng', en: 'Make or become better', phonetic: '/ɪmˈpruːv/', cols: ['improve quality of life', 'improve academic performance'], ex: 'Building more parks will considerably improve the quality of urban life.', exVi: 'Xây thêm nhiều công viên sẽ cải thiện đáng kể chất lượng đời sống thành thị.', tip: 'Động từ chỉ sự tiến bộ tích cực.' },
          { term: 'effective solution', pos: 'noun phrase', vi: 'Giải pháp hiệu quả', en: 'A successful way to deal with a problem', phonetic: '/ɪˈfek.tɪv səˈluː.ʃən/', cols: ['propose an effective solution', 'find effective solutions'], ex: 'Upgrading subway networks is an effective solution to traffic congestion.', exVi: 'Nâng cấp mạng lưới tàu điện ngầm là giải pháp hiệu quả giải quyết tắc nghẽn giao thông.', tip: 'Dùng trong câu mở đoạn Solution của Task 2.' },
          { term: 'acquire knowledge', pos: 'phrase', vi: 'Tiếp thu, lĩnh hội kiến thức', en: 'Gain information, skills, or learning', phonetic: '/əˈkwaɪr ˈnɑː.lɪdʒ/', cols: ['acquire knowledge and skills', 'rapidly acquire'], ex: 'Tertiary education allows students to acquire specialized scientific knowledge.', exVi: 'Giáo dục đại học cho phép sinh viên tiếp thu kiến thức khoa học chuyên sâu.', tip: 'Từ "acquire" học thuật hơn nhiều so với "get / learn knowledge".' },
          { term: 'traditional culture', pos: 'noun phrase', vi: 'Văn hóa truyền thống lâu đời', en: 'Customs and beliefs passed down through generations', phonetic: '/trəˈdɪʃ.ən.əl ˈkʌl.tʃɚ/', cols: ['preserve traditional culture', 'value culture'], ex: 'Folk festivals help young generations respect their traditional culture.', exVi: 'Lễ hội dân gian giúp thế hệ trẻ trân trọng văn hóa truyền thống của mình.', tip: 'Dùng cho chủ đề văn hóa và bản sắc.' },
          { term: 'daily routine', pos: 'noun phrase', vi: 'Thói quen, lịch trình sinh hoạt hằng ngày', en: 'A regular way of doing things in everyday life', phonetic: '/ˈdeɪ.li ruːˈtiːn/', cols: ['establish a daily routine', 'disrupt routines'], ex: 'Having a healthy daily routine helps people manage stress effectively.', exVi: 'Có một thói quen sinh hoạt lành mạnh hằng ngày giúp kiểm soát căng thẳng tốt hơn.', tip: 'Dùng miêu tả nhịp sống hiện đại.' },
          { term: 'develop skills', pos: 'phrase', vi: 'Phát triển và trau dồi các kỹ năng', en: 'Grow or improve competencies', phonetic: '/dɪˈvel.əp skɪlz/', cols: ['develop practical skills', 'develop interpersonal skills'], ex: 'Team sports help adolescents develop essential interpersonal skills.', exVi: 'Thể thao đồng đội giúp thanh thiếu niên phát triển kỹ năng giao tiếp thiết yếu.', tip: 'Thay thế cho "learn skills".' },
          { term: 'in my perspective', pos: 'phrase', vi: 'Theo góc nhìn / quan điểm của tôi', en: 'From my personal viewpoint', phonetic: '/ɪn maɪ pɚˈspek.tɪv/', cols: ['in my perspective, this is true', 'from this perspective'], ex: 'In my perspective, the benefits of modern technology far outweigh the drawbacks.', exVi: 'Theo quan điểm của tôi, lợi ích của công nghệ vượt xa các điểm hạn chế.', tip: 'Cụm từ bày tỏ quan điểm trang trọng hơn "I think".' }
        ]
      }
    ]
  },

  // TIER 2: EXPANDING LEXICON & URBAN TRENDS (Band 5.5 - 6.0)
  {
    topicKey: 'ielts-trends',
    topicTitleVi: 'Chuyên Đề Đời Sống Đô Thị, Công Nghệ Căn Bản & Xu Hướng Xã Hội',
    badge: 'IELTS Band 5.5 - 6.0 Core',
    icon: 'Compass',
    themes: [
      {
        title: 'Urban Trends, Digital Habits & Social Expansion',
        titleVi: 'Giao Tiếp Đô Thị, Công Nghệ & Xu Hướng Xã Hội',
        descVi: 'Luyện 18 từ vựng và collocations Band 5.5 - 6.0 về lối sống thành thị, làm việc từ xa và xu hướng số hóa.',
        level: 'IELTS Band 5.5 - 6.0',
        words: [
          { term: 'collaborate', pos: 'verb', vi: 'Hợp tác, làm việc chung', en: 'Work jointly with others on an activity', phonetic: '/kəˈlæb.ə.reɪt/', cols: ['collaborate effectively', 'collaborate on projects'], ex: 'Digital platforms enable colleagues to collaborate smoothly across time zones.', exVi: 'Các nền tảng số cho phép đồng nghiệp hợp tác trơn tru bất chấp múi giờ.', tip: 'Dùng cho chủ đề môi trường làm việc hiện đại.' },
          { term: 'flexible', pos: 'adjective', vi: 'Linh hoạt, uyển chuyển', en: 'Able to adjust to new conditions', phonetic: '/ˈflek.sə.bəl/', cols: ['flexible working hours', 'flexible schedule'], ex: 'Many young professionals prefer companies that provide flexible working hours.', exVi: 'Nhiều người trẻ chuộng công ty có chế độ giờ giấc linh hoạt.', tip: 'Từ khóa then chốt cho đề tài việc làm linh hoạt.' },
          { term: 'innovation', pos: 'noun', vi: 'Sự đổi mới, sáng kiến mới', en: 'A new method, idea, or product', phonetic: '/ˌɪn.əˈveɪ.ʃən/', cols: ['technological innovation', 'foster innovation'], ex: 'Continuous technological innovation drives economic growth in metropolitan hubs.', exVi: 'Đổi mới công nghệ liên tục thúc đẩy tăng trưởng kinh tế tại các đô thị lớn.', tip: 'Dùng cho cả bài Task 1 và Task 2.' },
          { term: 'consequence', pos: 'noun', vi: 'Hệ quả, kết quả tất yếu', en: 'A result or effect of an action', phonetic: '/ˈkɑːn.sə.kwens/', cols: ['direct consequence', 'unforeseen consequences'], ex: 'Traffic pollution is an unfortunate consequence of rapid urbanization.', exVi: 'Ô nhiễm giao thông là hệ quả đáng tiếc của quá trình đô thị hóa nhanh chóng.', tip: 'Từ chỉ kết quả khách quan học thuật.' },
          { term: 'enhance', pos: 'verb', vi: 'Gia tăng, tăng cường chất lượng', en: 'Intensify, increase, or further improve', phonetic: '/ɪnˈhæns/', cols: ['enhance efficiency', 'enhance user experience'], ex: 'Installing fiber-optic broadband will enhance administrative productivity.', exVi: 'Lắp đặt cáp quang băng thông rộng sẽ tăng cường hiệu suất hành chính.', tip: 'Nâng cấp từ "increase/improve".' },
          { term: 'proportion', pos: 'noun', vi: 'Tỷ lệ, tỷ trọng phân bổ', en: 'A part, share, or number in comparative relation', phonetic: '/prəˈpɔːr.ʃən/', cols: ['significant proportion', 'large proportion of'], ex: 'A substantial proportion of university graduates enter the services sector.', exVi: 'Một tỷ lệ đáng kể sinh viên tốt nghiệp gia nhập ngành dịch vụ.', tip: 'Từ không thể thiếu khi viết biểu đồ Writing Task 1.' },
          { term: 'fluctuate', pos: 'verb', vi: 'Dao động, biến động lên xuống', en: 'Rise and fall irregularly in number or amount', phonetic: '/ˈflʌk.tʃu.eɪt/', cols: ['fluctuate wildly', 'fluctuate between'], ex: 'Seasonal energy prices fluctuate depending on regional temperatures.', exVi: 'Giá điện năng theo mùa dao động tùy thuộc vào nhiệt độ khu vực.', tip: 'Từ vựng cốt lõi miêu tả biến động số liệu trong Task 1.' },
          { term: 'dramatic increase', pos: 'noun phrase', vi: 'Sự gia tăng đột biến, tăng vọt', en: 'A sudden and extreme rise', phonetic: '/drəˈmæt̬.ɪk ˈɪn.kriːs/', cols: ['witness a dramatic increase', 'experience an increase'], ex: 'The city witnessed a dramatic increase in bicycle commuters over the decade.', exVi: 'Thành phố chứng kiến sự gia tăng đột biến người đi làm bằng xe đạp qua thập kỷ.', tip: 'Cụm từ biểu thị xu hướng mạnh trong biểu đồ.' },
          { term: 'reliable', pos: 'adjective', vi: 'Đáng tin cậy, chuẩn xác', en: 'Consistently good in quality or performance', phonetic: '/rɪˈlaɪ.ə.bəl/', cols: ['reliable source', 'reliable transport system'], ex: 'Access to reliable public transit reduces private automobile dependency.', exVi: 'Tiếp cận phương tiện công cộng đáng tin cậy giúp giảm phụ thuộc vào xe cá nhân.', tip: 'Từ khen ngợi chất lượng dịch vụ.' },
          { term: 'interact with', pos: 'verb phrase', vi: 'Tương tác, giao tiếp với', en: 'Act together with others or communicate', phonetic: '/ˌɪn.t̬ɚˈækt wɪð/', cols: ['interact with peers', 'interact with technology'], ex: 'Children need opportunities to interact with peers in outdoor playgrounds.', exVi: 'Trẻ em cần cơ hội để tương tác với bạn bè đồng trang lứa tại sân chơi ngoài trời.', tip: 'Chủ đề giao tiếp và mạng xã hội.' },
          { term: 'urban lifestyle', pos: 'noun phrase', vi: 'Lối sống đô thị hiện đại', en: 'Way of living characteristic of cities', phonetic: '/ˈɝː.bən ˈlaɪf.staɪl/', cols: ['embrace an urban lifestyle', 'pace of urban life'], ex: 'The fast-paced urban lifestyle often limits leisure time with family.', exVi: 'Lối sống đô thị nhịp độ nhanh thường hạn chế thời gian thư giãn với gia đình.', tip: 'Dùng cho đề tài cuộc sống thành phố so với nông thôn.' },
          { term: 'remote working', pos: 'noun phrase', vi: 'Làm việc từ xa qua mạng', en: 'Working from home or outside traditional offices', phonetic: '/rɪˈmoʊt ˈwɝː.kɪŋ/', cols: ['adopt remote working', 'benefits of remote work'], ex: 'Remote working cuts daily commute stress and saves workplace overhead costs.', exVi: 'Làm việc từ xa cắt giảm căng thẳng đi lại và tiết kiệm chi phí văn phòng.', tip: 'Chủ đề rất thịnh hành trong các đề thi gần đây.' },
          { term: 'face-to-face interaction', pos: 'noun phrase', vi: 'Giao tiếp tương tác trực tiếp mặt đối mặt', en: 'Direct personal communication in person', phonetic: '/ˌfeɪs.təˈfeɪs ˌɪn.t̬ɚˈæk.ʃən/', cols: ['value face-to-face interaction', 'lack of direct contact'], ex: 'Virtual meetings cannot entirely replace the warmth of face-to-face interaction.', exVi: 'Các cuộc họp trực tuyến không thể thay thế hoàn toàn sự ấm áp của gặp gỡ trực tiếp.', tip: 'Luận điểm đối lập khi bàn về làm việc qua mạng.' },
          { term: 'bridge the gap', pos: 'phrase', vi: 'Rút ngắn khoảng cách, thu hẹp khoảng cách', en: 'Connect or reduce the difference between two things', phonetic: '/brɪdʒ ðə ɡæp/', cols: ['bridge the digital gap', 'bridge economic disparity'], ex: 'Subsidized computers bridge the digital gap between rich and poor households.', exVi: 'Máy tính trợ giá giúp thu hẹp khoảng cách số giữa hộ giàu và hộ nghèo.', tip: 'Cụm Collocation điểm cao mang nghĩa ẩn dụ.' },
          { term: 'academic performance', pos: 'noun phrase', vi: 'Thành tích học tập ở trường lớp', en: 'Level of achievement in educational studies', phonetic: '/ˌæk.əˈdem.ɪk pɚˈfɔːr.məns/', cols: ['improve academic performance', 'evaluate performance'], ex: 'Adequate sleep directly correlates with enhanced student academic performance.', exVi: 'Ngủ đủ giấc có mối tương quan trực tiếp với việc nâng cao thành tích học tập.', tip: 'Cụm chuẩn xác cho Task 2 chủ đề trường học.' },
          { term: 'considerable', pos: 'adjective', vi: 'Đáng kể, to lớn', en: 'Notably large in size, amount, or extent', phonetic: '/kənˈsɪd.ɚ.ə.bəl/', cols: ['considerable amount', 'considerable impact'], ex: 'E-commerce has made a considerable impact on consumer shopping behavior.', exVi: 'Thương mại điện tử đã tạo ra tác động to lớn lên hành vi mua sắm người tiêu dùng.', tip: 'Từ thay thế cho "big / a lot of".' },
          { term: 'crucial factor', pos: 'noun phrase', vi: 'Yếu tố mang tính quyết định, mấu chốt', en: 'An extremely important element', phonetic: '/ˈkruː.ʃəl ˈfæk.tɚ/', cols: ['a crucial factor in success', 'identify crucial factors'], ex: 'Patience and self-discipline are crucial factors in mastering foreign languages.', exVi: 'Kiên nhẫn và kỷ luật tự giác là những yếu tố mấu chốt để thành thạo ngoại ngữ.', tip: 'Dùng làm câu khẳng định tầm quan trọng.' },
          { term: 'lead to', pos: 'verb phrase', vi: 'Dẫn đến, đưa tới kết quả', en: 'Cause or result in something', phonetic: '/liːd tuː/', cols: ['lead to improvements', 'lead to problems'], ex: 'Regular practice and feedback lead to steady band score improvements.', exVi: 'Luyện tập thường xuyên và nhận phản hồi sẽ dẫn tới điểm số cải thiện vững chắc.', tip: 'Cụm động từ nhân quả cơ bản nhưng rất tự nhiên.' }
        ]
      }
    ]
  },

  // TIER 3: EDUCATION, WORKPLACE FOUNDATIONS & CITIZENSHIP (Band 6.0 - 6.5)
  {
    topicKey: 'ielts-edu-work',
    topicTitleVi: 'Chuyên Đề Giáo Dục, Môi Trường Công Sở & Kỹ Năng Xã Hội',
    badge: 'IELTS Band 6.0 - 6.5 Intermediate',
    icon: 'GraduationCap',
    themes: [
      {
        title: 'Education, Employment & Life Skills',
        titleVi: 'Giáo Dục, Nghề Nghiệp & Kỹ Năng Đời Sống',
        descVi: 'Luyện 18 từ vựng và collocations Band 6.0 - 6.5 về chương trình học, cơ hội việc làm và quản lý thời gian.',
        level: 'IELTS Band 6.0 - 6.5',
        words: [
          { term: 'compulsory', pos: 'adjective', vi: 'Bắt buộc theo luật định hoặc quy định', en: 'Mandatory or required by law', phonetic: '/kəmˈpʌl.sɚ.i/', cols: ['compulsory education', 'compulsory subject'], ex: 'Primary and lower secondary schooling is compulsory in most developed countries.', exVi: 'Giáo dục tiểu học và trung học cơ sở là bắt buộc tại hầu hết các quốc gia phát triển.', tip: 'Từ học thuật thay thế cho "must do / required".' },
          { term: 'curriculum', pos: 'noun', vi: 'Khung chương trình giảng dạy chính khóa', en: 'The subjects comprising a course of study', phonetic: '/kəˈrɪk.jə.ləm/', cols: ['school curriculum', 'core curriculum'], ex: 'Schools should update their national curriculum to include digital skills.', exVi: 'Các trường học nên cập nhật chương trình giảng dạy quốc gia để bao gồm kỹ năng số.', tip: 'Từ vựng không thể thiếu trong chủ đề giáo dục.' },
          { term: 'discipline', pos: 'noun', vi: 'Kỷ luật, tinh thần tự giác rèn luyện', en: 'Training people to obey rules or self-control', phonetic: '/ˈdɪs.ə.plɪn/', cols: ['maintain discipline', 'strict discipline'], ex: 'Strict classroom discipline enables students to concentrate on academic tasks.', exVi: 'Kỷ luật lớp học nghiêm ngặt cho phép học sinh tập trung vào bài vở học tập.', tip: 'Thường dùng trong các bài về quản lý lớp học.' },
          { term: 'productive', pos: 'adjective', vi: 'Năng suất cao, làm việc hiệu quả', en: 'Producing good or helpful results', phonetic: '/prəˈdʌk.tɪv/', cols: ['productive workforce', 'highly productive'], ex: 'A supportive work environment helps employees become more productive.', exVi: 'Môi trường làm việc tương trợ giúp nhân viên làm việc năng suất hơn.', tip: 'Từ khen ngợi hiệu quả làm việc.' },
          { term: 'employment opportunity', pos: 'noun phrase', vi: 'Cơ hội việc làm, thời cơ nghề nghiệp', en: 'Possibility of obtaining a job', phonetic: '/ɪmˈplɔɪ.mənt ˌɑː.pɚˈtuː.nə.t̬i/', cols: ['create employment opportunities', 'expand opportunities'], ex: 'Vocational institutes provide immediate employment opportunities for local youths.', exVi: 'Các trường nghề đem lại cơ hội việc làm tức thì cho thanh niên địa phương.', tip: 'Dùng khi viết về lợi ích của phát triển kinh tế.' },
          { term: 'financial independence', pos: 'noun phrase', vi: 'Sự độc lập tự chủ về tài chính', en: 'The state of having enough money to live without relying on others', phonetic: '/faɪˈnæn.ʃəl ˌɪn.dɪˈpen.dəns/', cols: ['achieve financial independence', 'seek independence'], ex: 'Learning personal budgeting early helps young adults achieve financial independence.', exVi: 'Học cách chi tiêu ngân sách sớm giúp người trẻ đạt được sự tự chủ tài chính.', tip: 'Chủ đề thanh niên và sự trưởng thành.' },
          { term: 'cope with', pos: 'verb phrase', vi: 'Ứng phó, đối phó hiệu quả với khó khăn', en: 'Deal effectively with something difficult', phonetic: '/koʊp wɪð/', cols: ['cope with academic pressure', 'cope with difficulties'], ex: 'Counselors teach pupils practical strategies to cope with exam stress.', exVi: 'Chuyên viên tư vấn dạy học sinh các phương pháp thực tế để đối phó áp lực thi cử.', tip: 'Tự nhiên hơn cụm "solve with / fight".' },
          { term: 'contribute to', pos: 'verb phrase', vi: 'Đóng góp, góp phần tích cực vào', en: 'Help to cause or bring about an event', phonetic: '/kənˈtrɪb.juːt tuː/', cols: ['contribute to economic growth', 'contribute to society'], ex: 'Skilled human resources significantly contribute to sustainable national growth.', exVi: 'Nguồn nhân lực có tay nghề đóng góp đáng kể vào sự phát triển quốc gia bền vững.', tip: 'Cụm động từ chỉ quan hệ nhân quả rất quen thuộc.' },
          { term: 'lead to success', pos: 'phrase', vi: 'Dẫn lối tới thành công', en: 'Result in favorable achievements', phonetic: '/liːd tuː səkˈses/', cols: ['qualities that lead to success', 'perseverance leads to success'], ex: 'Continuous dedication and analytical thinking are traits that lead to career success.', exVi: 'Sự cống hiến bền bỉ và tư duy phân tích là những phẩm chất dẫn tới thành công sự nghiệp.', tip: 'Dùng làm câu khẳng định giá trị bản thân.' },
          { term: 'practical experience', pos: 'noun phrase', vi: 'Kinh nghiệm thực tiễn, cọ xát thực tế', en: 'Direct involvement in real-world activity', phonetic: '/ˈpræk.tɪ.kəl ɪkˈspɪr.i.əns/', cols: ['gain practical experience', 'hands-on experience'], ex: 'Internships give university undergraduates invaluable practical experience.', exVi: 'Các kỳ thực tập mang lại cho sinh viên đại học kinh nghiệm thực tiễn vô giá.', tip: 'Dùng đối lập với "theoretical knowledge".' },
          { term: 'social interaction', pos: 'noun phrase', vi: 'Giao lưu tương tác xã hội', en: 'Communication and reaction between people', phonetic: '/ˈsoʊ.ʃəl ˌɪn.t̬ɚˈæk.ʃən/', cols: ['foster social interaction', 'frequent interaction'], ex: 'Extracurricular clubs foster rich social interaction among diverse peer groups.', exVi: 'Các câu lạc bộ ngoại khóa thúc đẩy sự tương tác xã hội phong phú giữa bạn bè.', tip: 'Chủ đề phát triển kỹ năng mềm.' },
          { term: 'equal opportunity', pos: 'noun phrase', vi: 'Cơ hội bình đẳng, công bằng', en: 'Fair access without discrimination', phonetic: '/ˈiː.kwəl ˌɑː.pɚˈtuː.nə.t̬i/', cols: ['promote equal opportunity', 'guarantee equal access'], ex: 'Modern democratic legislation must guarantee equal opportunity for all genders.', exVi: 'Luật pháp hiện đại phải đảm bảo cơ hội bình đẳng cho mọi giới tính.', tip: 'Khái niệm then chốt trong bình đẳng xã hội.' },
          { term: 'overcome difficulties', pos: 'phrase', vi: 'Vượt qua những khó khăn trở ngại', en: 'Succeed in dealing with challenges', phonetic: '/ˌoʊ.vɚˈkʌm ˈdɪf.ə.kəl.tiz/', cols: ['ability to overcome difficulties', 'overcome adversity'], ex: 'Teamwork empowers students to overcome complex research difficulties together.', exVi: 'Làm việc nhóm giúp học sinh cùng nhau vượt qua các khó khăn nghiên cứu phức tạp.', tip: 'Cụm diễn đạt bản lĩnh con người.' },
          { term: 'broaden horizons', pos: 'idiom', vi: 'Mở rộng tầm mắt và thế giới quan', en: 'Expand the limit of one\'s knowledge and outlook', phonetic: '/ˈbrɑː.dən həˈraɪ.zənz/', cols: ['travel broadens horizons', 'reading broadens your outlook'], ex: 'Studying international history helps youngsters broaden their cultural horizons.', exVi: 'Học lịch sử quốc tế giúp người trẻ mở rộng tầm nhìn văn hóa của bản thân.', tip: 'Cụm Collocation thành ngữ điểm cao phổ biến.' },
          { term: 'play a key role', pos: 'phrase', vi: 'Đóng vai trò then chốt quyết định', en: 'Have a decisive influence on something', phonetic: '/pleɪ ə kiː roʊl/', cols: ['play a key role in development', 'play a critical role'], ex: 'Early childhood parenting plays a key role in emotional development.', exVi: 'Nuôi dạy từ ấu thơ đóng vai trò then chốt trong sự phát triển cảm xúc của trẻ.', tip: 'Mẫu câu lập luận mở đầu đoạn thân bài.' },
          { term: 'heavy workload', pos: 'noun phrase', vi: 'Khối lượng công việc/bài tập nặng nề', en: 'An excessive amount of work to complete', phonetic: '/ˈhev.i ˈwɝːk.loʊd/', cols: ['manage a heavy workload', 'suffer from heavy workloads'], ex: 'Prolonged overtime under a heavy workload compromises employee wellness.', exVi: 'Tăng ca kéo dài dưới khối lượng công việc nặng nề làm tổn hại sức khỏe nhân viên.', tip: 'Dùng cho chủ đề áp lực công sở hiện đại.' },
          { term: 'time management', pos: 'noun phrase', vi: 'Kỹ năng quản lý và phân bổ thời gian', en: 'The ability to plan and control hours spent on tasks', phonetic: '/ˈtaɪm ˌmæn.ədʒ.mənt/', cols: ['effective time management', 'master time management'], ex: 'Mastering time management prevents procrastination and reduces exam anxiety.', exVi: 'Làm chủ kỹ năng quản lý thời gian giúp ngăn trì hoãn và giảm lo âu thi cử.', tip: 'Kỹ năng thiết yếu cho học sinh sinh viên.' },
          { term: 'valuable experience', pos: 'noun phrase', vi: 'Kinh nghiệm quý báu và đáng giá', en: 'Very useful and worthwhile knowledge gained', phonetic: '/ˈvæl.jə.bəl ɪkˈspɪr.i.əns/', cols: ['gain valuable experience', 'provide valuable insight'], ex: 'Part-time student jobs offer valuable experience in customer communication.', exVi: 'Các công việc làm thêm đem lại cho sinh viên kinh nghiệm quý báu trong giao tiếp khách hàng.', tip: 'Cụm tính từ + danh từ rất tự nhiên.' }
        ]
      }
    ]
  },

  // TIER 4: MEDIA, DIGITAL PLATFORMS & CONSUMER HABITS (Band 6.5 - 7.0)
  {
    topicKey: 'ielts-media',
    topicTitleVi: 'Chuyên Đề Truyền Thông, Nền Tảng Số & Hành Vi Người Tiêu Dùng',
    badge: 'IELTS Band 6.5 - 7.0 Upper-Intermediate',
    icon: 'Radio',
    themes: [
      {
        title: 'Media Influence, Digital Consumption & Privacy',
        titleVi: 'Ảnh Hưởng Truyền Thông, Tiêu Dùng Số & Quyền Riêng Tư',
        descVi: 'Luyện 18 từ vựng và collocations Band 6.5 - 7.0 về chiến dịch quảng cáo, quyền riêng tư và thói quen tiêu dùng mạng.',
        level: 'IELTS Band 6.5 - 7.0',
        words: [
          { term: 'consumer behavior', pos: 'noun phrase', vi: 'Hành vi và thói quen mua sắm của người tiêu dùng', en: 'The study of how people make purchasing decisions', phonetic: '/kənˈsuː.mɚ bɪˈheɪ.vjɚ/', cols: ['analyze consumer behavior', 'shift in consumer behavior'], ex: 'Social media influencers exert considerable power over youth consumer behavior.', exVi: 'Người có sức ảnh hưởng trên mạng xã hội tạo tác động đáng kể lên hành vi người tiêu dùng trẻ.', tip: 'Thuật ngữ kinh tế - xã hội phổ biến trong đề thi.' },
          { term: 'accessible', pos: 'adjective', vi: 'Dễ dàng tiếp cận, tiện lợi sử dụng', en: 'Easy to approach, reach, enter, or use', phonetic: '/əkˈses.ə.bəl/', cols: ['readily accessible', 'make resources accessible'], ex: 'Public libraries make scientific journals freely accessible to citizens.', exVi: 'Các thư viện công cộng giúp các tạp chí khoa học tiếp cận người dân một cách miễn phí.', tip: 'Từ học thuật thay cho "easy to get".' },
          { term: 'misinformation', pos: 'noun', vi: 'Thông tin sai lệch, tin giả lan truyền', en: 'False or inaccurate information spread abroad', phonetic: '/ˌmɪs.ɪn.fɚˈmeɪ.ʃən/', cols: ['combat online misinformation', 'spread of misinformation'], ex: 'Social media algorithms inadvertently amplify sensational misinformation.', exVi: 'Các thuật toán mạng xã hội vô tình khuếch đại thông tin sai lệch giật gân.', tip: 'Chủ đề tin giả và báo chí trực tuyến.' },
          { term: 'advertising campaign', pos: 'noun phrase', vi: 'Chiến dịch quảng cáo tiếp thị', en: 'A coordinated series of promotional messages', phonetic: '/ˈæd.vɚ.taɪ.zɪŋ kæmˈpeɪn/', cols: ['launch an advertising campaign', 'targeted campaign'], ex: 'Beverage firms invest millions in an advertising campaign aimed at young demographics.', exVi: 'Các hãng đồ uống đầu tư hàng triệu đô vào chiến dịch quảng cáo nhắm đến giới trẻ.', tip: 'Chủ đề tác động của quảng cáo đối với trẻ em.' },
          { term: 'digital literacy', pos: 'noun phrase', vi: 'Năng lực và hiểu biết công nghệ số', en: 'The ability to find, evaluate, and use info on digital devices', phonetic: '/ˈdɪdʒ.ə.t̬əl ˈlɪt̬.ɚ.ə.si/', cols: ['enhance digital literacy', 'essential literacy skills'], ex: 'Senior citizens require tailored tutoring to develop vital digital literacy.', exVi: 'Người cao tuổi cần sự hướng dẫn phù hợp để phát triển năng lực số thiết yếu.', tip: 'Thuật ngữ hiện đại rất được chuộng trong Task 2.' },
          { term: 'privacy concern', pos: 'noun phrase', vi: 'Mối lo ngại về quyền riêng tư và dữ liệu cá nhân', en: 'Worries regarding the safety of personal information', phonetic: '/ˈpraɪ.və.si kənˈsɝːn/', cols: ['address privacy concerns', 'heightened privacy worries'], ex: 'Facial recognition technology raises understandable privacy concerns among residents.', exVi: 'Công nghệ nhận diện khuôn mặt làm dấy lên những mối lo ngại về quyền riêng tư.', tip: 'Luận điểm phản biện khi bàn về camera giám sát.' },
          { term: 'target audience', pos: 'noun phrase', vi: 'Khán giả / Nhóm khách hàng mục tiêu', en: 'The specific group of people targeted by content or ads', phonetic: '/ˈtɑːr.ɡɪt ˈɑː.di.əns/', cols: ['reach the target audience', 'appeal to target audiences'], ex: 'Documentaries must adapt their vocabulary to engage their target audience.', exVi: 'Phim tài liệu phải điều chỉnh từ ngữ để thu hút đối tượng khán giả mục tiêu.', tip: 'Dùng khi bàn về truyền thông và tiếp thị.' },
          { term: 'virtual platform', pos: 'noun phrase', vi: 'Nền tảng ảo trực tuyến trên không gian số', en: 'Online digital systems for interaction and learning', phonetic: '/ˈvɝː.tʃu.əl ˈplæt.fɔːrm/', cols: ['interact on virtual platforms', 'virtual meeting platform'], ex: 'Virtual platforms allow global specialists to debate urgent research issues.', exVi: 'Các nền tảng ảo cho phép chuyên gia toàn cầu thảo luận các vấn đề nghiên cứu cấp bách.', tip: 'Dùng thay thế từ "online website / software".' },
          { term: 'instant access', pos: 'noun phrase', vi: 'Khả năng tiếp cận tức thì, lập tức', en: 'Immediate ability to view or retrieve information', phonetic: '/ˈɪn.stənt ˈæk.ses/', cols: ['provide instant access to', 'gain instant access'], ex: 'Smartphones provide pupils with instant access to boundless world encyclopedias.', exVi: 'Điện thoại thông minh đem lại cho học sinh sự tiếp cận tức thì đến bách khoa toàn thư.', tip: 'Nhấn mạnh tốc độ vượt trội của kỷ nguyên số.' },
          { term: 'distraction', pos: 'noun', vi: 'Nguồn gây sao nhãng, làm mất tập trung', en: 'A thing that diverts attention from an activity', phonetic: '/dɪˈstræk.ʃən/', cols: ['constant distraction', 'source of distraction'], ex: 'Notification pings represent a frequent distraction during concentrated desk study.', exVi: 'Chuông thông báo thể hiện nguồn gây sao nhãng thường trực khi đang tập trung học.', tip: 'Mặt trái của việc lạm dụng điện thoại.' },
          { term: 'over-reliance on', pos: 'noun phrase', vi: 'Sự phụ thuộc quá mức vào', en: 'Excessive dependence on something', phonetic: '/ˌoʊ.vɚ.rɪˈlaɪ.əns ɑːn/', cols: ['over-reliance on algorithms', 'reduce over-reliance'], ex: 'Over-reliance on navigation apps weakens human spatial memorization.', exVi: 'Sự phụ thuộc thái quá vào ứng dụng bản đồ làm suy giảm khả năng ghi nhớ không gian.', tip: 'Cụm liên kết nhân quả chỉ tác hại của công nghệ.' },
          { term: 'boost productivity', pos: 'phrase', vi: 'Gia tăng và thúc đẩy năng suất lao động', en: 'Significantly increase output efficiency', phonetic: '/buːst ˌproʊ.dʌkˈtɪv.ə.t̬i/', cols: ['tools to boost productivity', 'boost overall performance'], ex: 'Automating inventory counts helps retailers boost store productivity.', exVi: 'Tự động hóa kiểm đếm hàng tồn kho giúp nhà bán lẻ gia tăng năng suất cửa hàng.', tip: 'Cụm động từ + danh từ chuẩn điểm cao.' },
          { term: 'social networking', pos: 'noun phrase', vi: 'Mạng lưới kết nối và giao lưu xã hội trực tuyến', en: 'Use of internet-based platforms to stay connected', phonetic: '/ˈsoʊ.ʃəl ˈnet.wɝː.kɪŋ/', cols: ['social networking websites', 'excessive social networking'], ex: 'Prolonged social networking may replace real-life recreational hobbies.', exVi: 'Lướt mạng xã hội kéo dài có thể thay thế các sở thích giải trí đời thực.', tip: 'Chủ đề thịnh hành trong phần thi Speaking & Writing.' },
          { term: 'shape public opinion', pos: 'phrase', vi: 'Định hình và dẫn dắt dư luận công chúng', en: 'Influence what the general population thinks', phonetic: '/ʃeɪp ˈpʌb.lɪk əˈpɪn.jən/', cols: ['media shapes public opinion', 'power to shape opinion'], ex: 'Investigative journalism plays an essential role in shaping informed public opinion.', exVi: 'Báo chí điều tra đóng vai trò thiết yếu trong việc định hình dư luận công chúng sáng suốt.', tip: 'Vai trò tối thượng của báo chí truyền thông.' },
          { term: 'ethical consideration', pos: 'noun phrase', vi: 'Cân nhắc và đắn đo về mặt đạo đức', en: 'Moral principles taken into thoughtful reflection', phonetic: '/ˈeθ.ɪ.kəl kənˌsɪd.əˈreɪ.ʃən/', cols: ['take into ethical consideration', 'ethical issues'], ex: 'Commercial algorithms targeted at teenagers warrant careful ethical consideration.', exVi: 'Các thuật toán thương mại nhắm vào thanh thiếu niên đòi hỏi sự cân nhắc đạo đức cẩn trọng.', tip: 'Dùng cho các bài nghị luận về chuẩn mực xã hội.' },
          { term: 'transform daily life', pos: 'phrase', vi: 'Thay đổi và biến đổi căn bản đời sống hằng ngày', en: 'Fundamentally change day-to-day human habits', phonetic: '/trænsˈfɔːrm ˈdeɪ.li laɪf/', cols: ['innovations transform daily life', 'dramatically transform'], ex: 'High-speed mobile payments have transformed daily life in major metropolitan cities.', exVi: 'Thanh toán di động tốc độ cao đã thay đổi căn bản đời sống hằng ngày tại các đô thị lớn.', tip: 'Câu khẳng định sức ảnh hưởng của đổi mới sáng tạo.' },
          { term: 'commercial influence', pos: 'noun phrase', vi: 'Tầm ảnh hưởng mang tính thương mại', en: 'The persuasive power of corporate marketing', phonetic: '/kəˈmɝː.ʃəl ˈɪn.fluː.əns/', cols: ['resist commercial influence', 'under corporate influence'], ex: 'Public broadcasters remain free from private corporate commercial influence.', exVi: 'Các đài truyền hình công duy trì sự độc lập trước ảnh hưởng thương mại doanh nghiệp tư nhân.', tip: 'Tính khách quan của tin tức.' },
          { term: 'reliable information', pos: 'noun phrase', vi: 'Thông tin đáng tin cậy đã qua xác minh', en: 'Accurate, verified, and dependable knowledge', phonetic: '/rɪˈlaɪ.ə.bəl ˌɪn.fɚˈmeɪ.ʃən/', cols: ['source of reliable information', 'access reliable news'], ex: 'Citizens need access to reliable information to make wise democratic decisions.', exVi: 'Người dân cần tiếp cận thông tin đáng tin cậy để đưa ra các quyết định sáng suốt.', tip: 'Dùng đối lập với "unverified rumors".' }
        ]
      }
    ]
  },

  // TIER 5: ENVIRONMENT, CLIMATE & CLEAN ENERGY (Band 7.0 - 7.5)
  {
    topicKey: 'ielts-env',
    topicTitleVi: 'Chuyên Đề Môi Trường & Khủng Hoảng Khí Hậu Toàn Cầu',
    badge: 'IELTS Writing Task 2 Focus',
    icon: 'Trees',
    themes: [
      {
        title: 'Ecological Crisis & Severe Threats',
        titleVi: 'Khủng Hoảng Sinh Thái & Các Hiểm Họa Khí Hậu',
        descVi: 'Luyện các từ vựng và cụm Collocations Band 7.0 - 7.5 về thảm họa sinh thái và suy giảm đa dạng sinh học.',
        level: 'IELTS Band 7.0 - 7.5',
        words: [
          { term: 'ubiquitous', pos: 'adjective', vi: 'Có mặt ở khắp nơi, tràn lan', en: 'Present everywhere simultaneously', phonetic: '/juːˈbɪk.wə.təs/', cols: ['ubiquitous pollution', 'become ubiquitous'], ex: 'Plastic contamination is ubiquitous across marine environments.', exVi: 'Ô nhiễm nhựa đã trở nên tràn lan khắp môi trường biển.', tip: 'Dùng câu mở bài hoặc mở đoạn thân bài về quy mô ô nhiễm rác thải.' },
          { term: 'pose a severe threat to', pos: 'phrase', vi: 'Gây ra mối đe dọa nghiêm trọng cho', en: 'Present a dangerous risk to', phonetic: '/poʊz ə səˈvɪr θret tuː/', cols: ['pose an existential threat', 'pose grave threats'], ex: 'Deforestation poses a severe threat to indigenous ecosystems.', exVi: 'Phá rừng gây ra hiểm họa nghiêm trọng cho hệ sinh thái bản địa.', tip: 'Cụm Collocation điểm cao thay cho "is very bad for".' },
          { term: 'exacerbate', pos: 'verb', vi: 'Làm trầm trọng thêm vấn đề', en: 'Make a problem worse', phonetic: '/ɪɡˈzæs.ɚ.beɪt/', cols: ['exacerbate the crisis', 'exacerbate global warming'], ex: 'Rising temperatures exacerbate agricultural droughts.', exVi: 'Nhiệt độ tăng làm trầm trọng thêm hạn hán nông nghiệp.', tip: 'Dùng trong chuỗi nhân quả Cause & Effect của bài viết.' },
          { term: 'detrimental', pos: 'adjective', vi: 'Gây hại, có tác động tiêu cực', en: 'Causing damage or harm', phonetic: '/ˌdet.rɪˈmen.təl/', cols: ['detrimental effect on', 'highly detrimental'], ex: 'Fossil combustion produces detrimental impacts on air quality.', exVi: 'Đốt nhiên liệu hóa thạch gây tác hại tiêu cực đến chất lượng không khí.', tip: 'Thay thế từ vựng đơn giản "harmful" để ghi điểm Lexical Resource.' },
          { term: 'exert a profound impact on', pos: 'phrase', vi: 'Tác động sâu sắc/nặng nề lên', en: 'Have a deep and far-reaching effect on', phonetic: '/ɪɡˈzɝːt ə prəˈfaʊnd ˈɪm.pækt/', cols: ['exert a damaging impact', 'exert a considerable influence'], ex: 'Rising ocean acidity exerts a profound impact on marine biodiversity.', exVi: 'Độ axit đại dương gia tăng tác động sâu sắc lên đa dạng sinh học biển.', tip: 'Cụm liên kết câu hoàn hảo cho câu phân tích hệ quả.' },
          { term: 'the tip of the iceberg', pos: 'idiom', vi: 'Chỉ là phần nổi của tảng băng chìm', en: 'A small noticeable part of a much larger problem', phonetic: '/ðə tɪp əv ðiː ˈaɪs.bɝːɡ/', cols: ['merely the tip of the iceberg', 'represent the tip of the iceberg'], ex: 'Current coastal flooding is merely the tip of the iceberg.', exVi: 'Ngập lụt ven biển hiện nay chỉ là phần nổi của tảng băng chìm.', tip: 'Thành ngữ học thuật dùng làm câu kết đoạn thân bài nhấn mạnh mức độ khẩn cấp.' },
          { term: 'biodiversity loss', pos: 'noun phrase', vi: 'Sự suy giảm đa dạng sinh học', en: 'The extinction and decline of species', phonetic: '/ˌbaɪ.oʊ.daɪˈvɝː.sə.ti lɑːs/', cols: ['accelerate biodiversity loss', 'combat biodiversity loss'], ex: 'Habitat destruction is the primary catalyst for terrestrial biodiversity loss.', exVi: 'Mất môi trường sống là tác nhân hàng đầu của suy giảm đa dạng sinh học trên cạn.', tip: 'Thuật ngữ sinh thái chuẩn học thuật cho Task 2.' },
          { term: 'irreversible damage', pos: 'noun phrase', vi: 'Tổn hại vĩnh viễn không thể phục hồi', en: 'Harm that cannot be undone', phonetic: '/ˌɪr.ɪˈvɝː.sə.bəl ˈdæm.ɪdʒ/', cols: ['inflict irreversible damage', 'suffer irreversible damage'], ex: 'Greenhouse gas buildup risks inflicting irreversible damage on the ozone layer.', exVi: 'Sự tích tụ khí nhà kính có nguy cơ gây tổn hại không thể đảo ngược lên tầng ozon.', tip: 'Từ ngữ mang sắc thái cảnh báo mạnh mẽ và thuyết phục.' },
          { term: 'deplete', pos: 'verb', vi: 'Làm cạn kiệt tài nguyên', en: 'Exhaust the supply or quantity of', phonetic: '/dɪˈpliːt/', cols: ['deplete natural resources', 'deplete water reserves'], ex: 'Unregulated groundwater pumping continues to deplete aquifers worldwide.', exVi: 'Bơm nước ngầm vô tội vạ tiếp tục làm cạn kiệt các tầng ngậm nước toàn cầu.', tip: 'Chuộng dùng khi viết về khủng hoảng khoáng sản hoặc nước ngọt.' },
          { term: 'carbon footprint', pos: 'noun phrase', vi: 'Dấu chân phát thải carbon', en: 'Total greenhouse emissions generated by an entity', phonetic: '/ˈkɑːr.bən ˈfʊt.prɪnt/', cols: ['reduce carbon footprint', 'measure personal footprint'], ex: 'Adopting plant-based diets considerably reduces household carbon footprints.', exVi: 'Chế độ ăn dựa trên thực vật giúp giảm đáng kể dấu chân carbon của hộ gia đình.', tip: 'Dùng trong đề tài trách nhiệm cá nhân (Individual responsibility).' },
          { term: 'ecological catastrophe', pos: 'noun phrase', vi: 'Thảm họa sinh thái quy mô lớn', en: 'A disastrous ecological disruption', phonetic: '/ˌiː.kəˈlɑː.dʒɪ.kəl kəˈtæs.trə.fi/', cols: ['avert an ecological catastrophe', 'trigger a catastrophe'], ex: 'Marine oil spills often trigger an ecological catastrophe along coastal estuaries.', exVi: 'Sự cố tràn dầu trên biển thường kích hoạt thảm họa sinh thái dọc các cửa sông ven biển.', tip: 'Từ vựng Band 8.0 thể hiện văn phong học thuật trang trọng.' },
          { term: 'habitat destruction', pos: 'noun phrase', vi: 'Sự phá hủy nơi cư trú hoang dã', en: 'Damaging native natural habitats', phonetic: '/ˈhæb.ə.tæt dɪˈstrʌk.ʃən/', cols: ['lead to habitat destruction', 'widespread habitat loss'], ex: 'Agricultural expansion remains the foremost cause of habitat destruction.', exVi: 'Mở rộng nông nghiệp vẫn là nguyên nhân hàng đầu gây phá hủy môi trường sống.', tip: 'Kết hợp cùng "culminate in" hoặc "result in".' },
          { term: 'at an unprecedented rate', pos: 'phrase', vi: 'Ở tốc độ nhanh chưa từng thấy trong lịch sử', en: 'Faster than ever recorded', phonetic: '/æt ən ʌnˈpres.ə.den.t̬ɪd reɪt/', cols: ['grow at an unprecedented rate', 'melt at an unprecedented rate'], ex: 'Alpine glaciers are melting at an unprecedented rate.', exVi: 'Băng trên các đỉnh núi cao đang tan chảy ở một tốc độ chưa từng có tiền lệ.', tip: 'Cụm trạng từ diễn đạt sự biến động dữ dội trong cả Task 1 và Task 2.' },
          { term: 'inflict serious harm on', pos: 'phrase', vi: 'Gây tổn hại nghiêm trọng lên', en: 'Cause severe damage or injury to', phonetic: '/ɪnˈflɪkt ˈsɪr.i.əs hɑːrm ɑːn/', cols: ['inflict long-term harm', 'inflict irreparable harm'], ex: 'Heavy industrial runoff inflicts serious harm on river biomes.', exVi: 'Nước thải công nghiệp nặng gây tổn hại nghiêm trọng cho hệ sinh vật sông ngòi.', tip: 'Cụm Collocation thay thế cho "damage badly".' },
          { term: 'extreme weather patterns', pos: 'noun phrase', vi: 'Các hình thái thời tiết cực đoan', en: 'Unusual, dangerous weather events', phonetic: '/ɪkˈstriːm ˈweð.ɚ ˈpæt̬.ɚnz/', cols: ['frequency of extreme weather', 'cope with weather patterns'], ex: 'Fossil emissions fuel the proliferation of extreme weather patterns.', exVi: 'Khí thải hóa thạch làm bùng phát các hình thái thời tiết cực đoan.', tip: 'Dẫn chứng thực tế về bão lũ, hạn hán trong bài viết.' },
          { term: 'bear the brunt of', pos: 'idiom', vi: 'Gánh chịu phần nặng nề nhất của', en: 'Endure the worst part of something bad', phonetic: '/ber ðə brʌnt əv/', cols: ['bear the brunt of the crisis', 'bear the full brunt'], ex: 'Low-income coastal communities bear the brunt of rising sea surges.', exVi: 'Các cộng đồng ven biển thu nhập thấp gánh chịu phần nặng nề nhất từ triều cường dâng.', tip: 'Thành ngữ tự nhiên chuẩn bản xứ Band 8.0+.' },
          { term: 'vulnerable ecosystems', pos: 'noun phrase', vi: 'Các hệ sinh thái mỏng manh dễ bị tổn thương', en: 'Fragile ecological networks', phonetic: '/ˈvʌl.nɚ.ə.bəl ˈiː.koʊˌsɪs.təmz/', cols: ['protect vulnerable ecosystems', 'fragile biomes'], ex: 'Wetland biomes are among the most vulnerable ecosystems globally.', exVi: 'Các quần xã đất ngập nước nằm trong số những hệ sinh thái dễ tổn thương nhất địa cầu.', tip: 'Dùng khi miêu tả đối tượng chịu ảnh hưởng của biến đổi khí hậu.' },
          { term: 'accelerate deforestation', pos: 'phrase', vi: 'Đẩy nhanh tốc độ tàn phá rừng', en: 'Speed up the clearing of forests', phonetic: '/əkˈsel.ɚ.eɪt diːˌfɔːr.əˈsteɪ.ʃən/', cols: ['curb rampant deforestation', 'halt deforestation'], ex: 'Illegal timber logging continues to accelerate deforestation in tropical belts.', exVi: 'Khai thác gỗ lậu tiếp tục đẩy nhanh nạn phá rừng tại các vành đai nhiệt đới.', tip: 'Động từ "accelerate" mang tính chính xác học thuật cao hơn "increase".' }
        ]
      },
      {
        title: 'Green Transition & Renewable Solutions',
        titleVi: 'Năng Lượng Tái Tạo & Lời Giải Chuyển Dịch Xanh',
        descVi: 'Luyện 18 từ vựng và collocations về giải pháp năng lượng sạch, kinh tế tuần hoàn và công nghệ xanh.',
        level: 'IELTS Band 7.5 - 8.5',
        words: [
          { term: 'mitigate', pos: 'verb', vi: 'Giảm thiểu, xoa dịu mức độ rủi ro', en: 'Make something less severe or painful', phonetic: '/ˈmɪt.ɪ.ɡeɪt/', cols: ['mitigate climate risks', 'mitigate the impact'], ex: 'Investing in grid batteries helps mitigate renewable supply volatility.', exVi: 'Đầu tư pin lưu trữ lưới điện giúp giảm thiểu biến động nguồn năng lượng tái tạo.', tip: 'Từ then chốt trong phần giải pháp (Solution) của Task 2.' },
          { term: 'pave the way for', pos: 'idiom', vi: 'Mở đường, tạo tiền đề thuận lợi cho', en: 'Create conditions that enable something to happen', phonetic: '/peɪv ðə weɪ fɔːr/', cols: ['pave the way for clean tech', 'pave the way for future reform'], ex: 'Government green subsidies pave the way for widespread solar rollout.', exVi: 'Các gói trợ cấp xanh của chính phủ mở đường cho việc phủ rộng điện mặt trời.', tip: 'Cụm liên kết câu triển vọng tương lai rất tự nhiên.' },
          { term: 'pragmatic', pos: 'adjective', vi: 'Mang tính thực tế và khả thi cao', en: 'Dealing with matters sensibly and realistically', phonetic: '/præɡˈmæt̬.ɪk/', cols: ['pragmatic solution', 'take a pragmatic approach'], ex: 'Imposing carbon tariffs offers a pragmatic remedy for cross-border carbon leakage.', exVi: 'Áp thuế carbon biên giới đem lại một biện pháp thực tế chống rò rỉ carbon.', tip: 'Từ khen ngợi chính sách vượt trội hơn từ "good/practical".' },
          { term: 'harness renewable energy', pos: 'phrase', vi: 'Khai thác triệt để nguồn năng lượng tái tạo', en: 'Capture and utilize clean power', phonetic: '/ˈhɑːr.nəs rɪˈnuː.ə.bəl ˈen.ɚ.dʒi/', cols: ['harness offshore wind', 'harness solar radiation'], ex: 'Coastal regions can readily harness renewable energy from tidal flow.', exVi: 'Các vùng duyên hải có thể dễ dàng khai thác năng lượng tái tạo từ dòng thủy triều.', tip: 'Dùng động từ "harness" thay vì "use renewable energy".' },
          { term: 'strike a balance between', pos: 'idiom', vi: 'Thiết lập thế cân bằng hài hòa giữa', en: 'Find an acceptable compromise between opposing priorities', phonetic: '/straɪk ə ˈbæl.əns bɪˈtwiːn/', cols: ['strike a delicate balance', 'strike a sustainable balance'], ex: 'Economies must strike a balance between industrial output and conservation.', exVi: 'Các nền kinh tế phải thiết lập thế cân bằng giữa sản lượng công nghiệp và bảo tồn.', tip: 'Dùng hoàn hảo cho câu kết bài Discussion (Discuss both views).' },
          { term: 'circular economy', pos: 'noun phrase', vi: 'Nền kinh tế tuần hoàn (tái chế tối đa)', en: 'An economic model focused on waste elimination', phonetic: '/ˈsɝː.kjə.lɚ iˈkɑː.nə.mi/', cols: ['adopt a circular economy', 'transition to circular systems'], ex: 'A circular economy repurposes industrial byproducts into raw materials.', exVi: 'Nền kinh tế tuần hoàn tái sử dụng phụ phẩm công nghiệp thành nguyên liệu thô.', tip: 'Khái niệm hiện đại được giám khảo IELTS đánh giá cao về tư duy thời sự.' },
          { term: 'phase out fossil fuels', pos: 'phrase', vi: 'Từng bước loại bỏ hoàn toàn nhiên liệu hóa thạch', en: 'Gradually discontinue reliance on coal and oil', phonetic: '/feɪz aʊt ˈfɑː.səl fjuː.əlz/', cols: ['schedule to phase out coal', 'commit to phasing out'], ex: 'Global treaties mandate signatories to phase out fossil fuels by mid-century.', exVi: 'Các hiệp ước toàn cầu yêu cầu các bên ký kết từng bước loại bỏ nhiên liệu hóa thạch.', tip: 'Dùng "phase out" thay vì "stop using" để thể hiện tính lộ trình.' },
          { term: 'substantiate', pos: 'verb', vi: 'Chứng minh bằng chứng cứ khoa học xác thực', en: 'Provide proof to support or validate a claim', phonetic: '/səbˈstæn.ʃi.eɪt/', cols: ['substantiate an assertion', 'substantiate claims with data'], ex: 'Peer-reviewed studies substantiate the correlation between emissions and temperature spikes.', exVi: 'Các nghiên cứu bình duyệt chứng minh mối tương quan giữa khí thải và mức tăng nhiệt độ.', tip: 'Dùng khi trích dẫn dữ liệu nghiên cứu khoa học.' },
          { term: 'incentivize clean energy', pos: 'phrase', vi: 'Tạo cơ chế khuyến khích/ưu đãi năng lượng sạch', en: 'Provide motives to adopt renewable power', phonetic: '/ɪnˈsen.t̬ə.vaɪz kliːn ˈen.ɚ.dʒi/', cols: ['incentivize green investments', 'financially incentivize'], ex: 'Feed-in tariffs incentivize clean energy installation across residential rooftops.', exVi: 'Biểu giá mua điện hỗ trợ khuyến khích lắp đặt năng lượng sạch trên mái nhà dân.', tip: 'Cụm từ chủ chốt trong các bài về can thiệp của chính phủ.' },
          { term: 'viable solution', pos: 'noun phrase', vi: 'Giải pháp khả thi và có thể duy trì được', en: 'A workable and feasible resolution', phonetic: '/ˈvaɪ.ə.bəl səˈluː.ʃən/', cols: ['economically viable solution', 'a commercially viable option'], ex: 'Geothermal heating provides an economically viable solution for cold climates.', exVi: 'Hệ thống sưởi địa nhiệt cung cấp một giải pháp khả thi về kinh tế cho vùng khí hậu lạnh.', tip: 'Nâng cấp từ ngữ thay cho "good way/effective method".' },
          { term: 'carbon neutral', pos: 'adjective', vi: 'Đạt mức trung hòa phát thải carbon', en: 'Achieving net-zero greenhouse gas release', phonetic: '/ˌkɑːr.bən ˈnuː.trəl/', cols: ['achieve carbon neutral status', 'carbon neutral supply chains'], ex: 'Automakers aim to make entire manufacturing operations carbon neutral by 2035.', exVi: 'Các hãng xe đặt mục tiêu đưa toàn bộ chuỗi sản xuất đạt mức trung hòa carbon vào năm 2035.', tip: 'Cụm từ không thể thiếu trong bài viết về phát triển bền vững.' },
          { term: 'eco-friendly alternatives', pos: 'noun phrase', vi: 'Các giải pháp thay thế thân thiện môi trường', en: 'Products minimizing environmental harm', phonetic: '/ˌiː.koʊˈfrend.li ɑːlˈtɝː.nə.t̬ɪvz/', cols: ['substitute with eco-friendly alternatives', 'viable green substitutes'], ex: 'Algae-based plastics offer compelling eco-friendly alternatives to petroleum polymers.', exVi: 'Nhựa gốc tảo đem lại giải pháp thay thế thân thiện môi trường cho polyme dầu mỏ.', tip: 'Dùng khi bàn về hành vi tiêu dùng xanh.' },
          { term: 'energy conservation', pos: 'noun phrase', vi: 'Sự bảo tồn và tiết kiệm điện năng', en: 'Reducing energy consumption through efficiency', phonetic: '/ˈen.ɚ.dʒi ˌkɑːn.sɚˈveɪ.ʃən/', cols: ['promote energy conservation', 'prioritize conservation'], ex: 'Smart building management algorithms maximize workplace energy conservation.', exVi: 'Thuật toán quản lý tòa nhà thông minh tối đa hóa việc tiết kiệm năng lượng công sở.', tip: 'Dùng khi nói về giải pháp nâng cao hiệu quả sử dụng điện.' },
          { term: 'sustainable development', pos: 'noun phrase', vi: 'Phát triển bền vững', en: 'Growth that meets present needs without depleting the future', phonetic: '/səˈsteɪ.nə.bəl dɪˈvel.əp.mənt/', cols: ['pillars of sustainable development', 'foster long-term sustainability'], ex: 'Economic progress must align with United Nations sustainable development targets.', exVi: 'Tiến bộ kinh tế phải phù hợp với các mục tiêu phát triển bền vững của Liên Hợp Quốc.', tip: 'Cụm từ cốt lõi trong thang điểm Band 7.5 - 8.5.' },
          { term: 'long-term viability', pos: 'noun phrase', vi: 'Tính khả thi/bền vững dài hạn trong tương lai', en: 'Ability to survive and succeed over time', phonetic: '/ˈlɑːŋ.tɝːm vaɪ.əˈbɪl.ə.t̬i/', cols: ['ensure long-term viability', 'compromise viability'], ex: 'Over-reliance on seasonal rain compromises the long-term viability of cash crop farms.', exVi: 'Quá dựa vào mưa mùa làm tổn hại tính bền vững lâu dài của các nông trại cây công nghiệp.', tip: 'Dùng khi đánh giá rủi ro trong tương lai.' },
          { term: 'environmentally conscious', pos: 'adjective', vi: 'Có ý thức sâu sắc về môi trường', en: 'Aware of and concerned about nature preservation', phonetic: '/ɪnˌvaɪ.rənˈmen.t̬əl.i ˈkɑːn.ʃəs/', cols: ['environmentally conscious consumers', 'eco-conscious choices'], ex: 'Young demographic cohorts are increasingly environmentally conscious.', exVi: 'Các nhóm thế hệ trẻ ngày càng có ý thức sâu sắc về môi trường.', tip: 'Dùng để miêu tả xu hướng xã hội hiện đại.' },
          { term: 'transition to green economy', pos: 'phrase', vi: 'Chuyển dịch sang nền kinh tế xanh', en: 'Shift resource models toward low-carbon trade', phonetic: '/trænˈzɪʃ.ən tuː ə ɡriːn iˈkɑː.nə.mi/', cols: ['accelerate the transition', 'equitable transition'], ex: 'A fair transition to a green economy must retrain fossil fuel workers.', exVi: 'Chuyển dịch công bằng sang kinh tế xanh cần đào tạo lại công nhân năng lượng hóa thạch.', tip: 'Giải pháp toàn diện kết hợp kinh tế và việc làm.' },
          { term: 'technological breakthroughs', pos: 'noun phrase', vi: 'Những đột phá công nghệ vượt bậc', en: 'Major innovations in science and machinery', phonetic: '/ˌtek.nəˈlɑː.dʒɪ.kəl ˈbreɪk.θruːz/', cols: ['pioneer technological breakthroughs', 'usher in breakthroughs'], ex: 'Technological breakthroughs in green hydrogen are decarbonizing heavy transport.', exVi: 'Các đột phá công nghệ trong hydro xanh đang khử carbon ngành vận tải nặng.', tip: 'Dùng làm luận điểm giải thích tại sao năng lượng xanh ngày càng rẻ.' }
        ]
      }
    ]
  },

  // THEME 2: TECHNOLOGY, ARTIFICIAL INTELLIGENCE & ETHICS
  {
    topicKey: 'ielts-tech',
    topicTitleVi: 'Chuyên Đề Công Nghệ, Trí Tuệ Nhân Tạo & Đạo Đức Số',
    badge: 'IELTS Band 8.0+ Lexical Resource',
    icon: 'Cpu',
    themes: [
      {
        title: 'Automation & Future Workforce',
        titleVi: 'Tự Động Hóa & Tái Cấu Trúc Thị Trường Việc Làm',
        descVi: 'Luyện 18 từ vựng và collocations về AI, sự thay thế sức lao động con người và kỹ năng số tương lai.',
        level: 'IELTS Band 7.5 - 8.5',
        words: [
          { term: 'disruptive technology', pos: 'noun phrase', vi: 'Công nghệ đột phá làm thay đổi thị trường', en: 'Innovation drastically transforming industries', phonetic: '/dɪsˈrʌp.tɪv tekˈnɑː.lə.dʒi/', cols: ['embrace disruptive technology', 'disruptive potential'], ex: 'Generative AI represents a highly disruptive technology across knowledge industries.', exVi: 'AI tạo sinh thể hiện một công nghệ đột phá sâu rộng khắp các ngành kinh tế tri thức.', tip: 'Mở đầu bài luận về làn sóng chuyển đổi số.' },
          { term: 'revolutionize the industry', pos: 'phrase', vi: 'Cách mạng hóa toàn bộ ngành công nghiệp', en: 'Fundamentally transform a market sector', phonetic: '/ˌrev.əˈluː.ʃən.aɪz ðiː ˈɪn.də.stri/', cols: ['revolutionize manufacturing', 'revolutionize diagnostics'], ex: 'Autonomous driving systems will revolutionize the commercial transport industry.', exVi: 'Hệ thống tự lái sẽ cách mạng hóa ngành vận tải thương mại.', tip: 'Động từ mạnh biểu thị tác động lớn.' },
          { term: 'streamline operations', pos: 'phrase', vi: 'Tinh gọn hóa và tối ưu quy trình vận hành', en: 'Make processes much more efficient and simpler', phonetic: '/ˈstriːm.laɪn ˌɑː.pəˈreɪ.ʃənz/', cols: ['streamline workflows', 'streamline logistics'], ex: 'Enterprise automation tools streamline operations by cutting redundant paperwork.', exVi: 'Công cụ tự động hóa doanh nghiệp tinh gọn hóa vận hành bằng cách cắt giảm giấy tờ thừa.', tip: 'Giải thích lợi ích của máy móc đối với năng suất.' },
          { term: 'supplant human labor', pos: 'phrase', vi: 'Thay thế và chiếm chỗ sức lao động con người', en: 'Take the place of human workers', phonetic: '/səˈplænt ˈhjuː.mən ˈleɪ.bɚ/', cols: ['supplant manual operators', 'supplant workforce'], ex: 'Advanced neural networks threaten to supplant human labor in content generation.', exVi: 'Các mạng nơ-ron tiên tiến đe dọa thay thế sức lao động con người trong sáng tạo nội dung.', tip: 'Từ vựng Band 8.5 cao cấp hơn "replace workers".' },
          { term: 'cutting-edge innovation', pos: 'noun phrase', vi: 'Đổi mới sáng tạo tiên tiến hàng đầu', en: 'The most modern stage of development', phonetic: '/ˌkʌt̬.ɪŋˈedʒ ˌɪn.əˈveɪ.ʃən/', cols: ['pioneer cutting-edge innovations', 'invest in cutting-edge tech'], ex: 'Leading tech hubs rely on cutting-edge innovation to dominate cloud services.', exVi: 'Các trung tâm công nghệ hàng đầu dựa vào đổi mới tiên tiến để thống trị dịch vụ đám mây.', tip: 'Từ ngữ trang trọng khen ngợi tiến bộ công nghệ.' },
          { term: 'paradigm shift', pos: 'noun phrase', vi: 'Bước chuyển dịch hệ tư tưởng/mô hình căn bản', en: 'A fundamental change in approach or belief', phonetic: '/ˈper.ə.daɪm ʃɪft/', cols: ['trigger a paradigm shift', 'represent a paradigm shift'], ex: 'Telemedicine marks a significant paradigm shift in primary patient care.', exVi: 'Y tế từ xa đánh dấu một bước chuyển mô hình căn bản trong chăm sóc ban đầu.', tip: 'Cụm danh từ học thuật cực kỳ sang trọng.' },
          { term: 'digital footprint', pos: 'noun phrase', vi: 'Dấu chân kỹ thuật số (dữ liệu lưu lại trên mạng)', en: 'The record of one’s internet activity trail', phonetic: '/ˌdɪdʒ.ə.t̬əl ˈfʊt.prɪnt/', cols: ['leave a digital footprint', 'minimize online footprint'], ex: 'Users rarely realize that every mobile click expands their personal digital footprint.', exVi: 'Người dùng ít khi nhận ra rằng mỗi cú nhấp chuột đều mở rộng dấu chân số của mình.', tip: 'Trọng tâm bài viết về quyền riêng tư dữ liệu.' },
          { term: 'redefine the job market', pos: 'phrase', vi: 'Định hình và tái cấu trúc lại thị trường việc làm', en: 'Change the fundamental nature of employment', phonetic: '/ˌriː.dɪˈfaɪn ðə dʒɑːb ˈmɑːr.kɪt/', cols: ['redefine employment trends', 'redefine career options'], ex: 'Cognitive computing will redefine the job market by valuing creative problem-solving.', exVi: 'Điện toán nhận thức sẽ định hình lại thị trường lao động bằng cách coi trọng tư duy sáng tạo.', tip: 'Dùng khi dự đoán xu hướng tương lai.' },
          { term: 'obsolescence of skills', pos: 'noun phrase', vi: 'Sự lỗi thời đào thải của kỹ năng lao động', en: 'The state of proficiencies becoming useless', phonetic: '/ˌɑːb.səˈles.əns əv skɪlz/', cols: ['accelerate obsolescence', 'rapid skill obsolescence'], ex: 'Fast-paced algorithmic updates speed up the obsolescence of technical skills.', exVi: 'Cập nhật thuật toán liên tục đẩy nhanh sự lỗi thời của các kỹ năng kỹ thuật.', tip: 'Từ vựng Band 8.5 rất ít thí sinh biết sử dụng.' },
          { term: 'unprecedented efficiency', pos: 'noun phrase', vi: 'Hiệu suất vượt trội chưa từng có trong lịch sử', en: 'Efficiency higher than ever recorded', phonetic: '/ʌnˈpres.ə.den.t̬ɪd ɪˈfɪʃ.ən.si/', cols: ['operate with unprecedented efficiency', 'deliver efficiency'], ex: 'Quantum processors compute vast molecular models with unprecedented efficiency.', exVi: 'Bộ xử lý lượng tử tính toán các mô hình phân tử khổng lồ với hiệu suất chưa từng có.', tip: 'So sánh sức mạnh máy tính với xử lý thủ công.' },
          { term: 'technological prowess', pos: 'noun phrase', vi: 'Năng lực và vị thế công nghệ vượt bậc', en: 'Superior skill and power in technology', phonetic: '/ˌtek.nəˈlɑː.dʒɪ.kəl ˈpraʊ.es/', cols: ['showcase technological prowess', 'compete in prowess'], ex: 'Global superpowers compete to consolidate technological prowess in microchips.', exVi: 'Các siêu cường cạnh tranh củng cố vị thế công nghệ vượt bậc trong chip bán dẫn.', tip: 'Từ "prowess" biểu thị năng lực đỉnh cao.' },
          { term: 'integrate seamlessly into', pos: 'phrase', vi: 'Tích hợp một cách trơn tru mượt mà vào', en: 'Combine smoothly without difficulty', phonetic: '/ˈɪn.t̬ə.ɡreɪt ˈsiːm.ləs.li ˈɪn.tuː/', cols: ['integrate seamlessly with apps', 'seamless integration'], ex: 'Digital wallet applications integrate seamlessly into urban retail transactions.', exVi: 'Các ứng dụng ví điện tử tích hợp trơn tru vào giao dịch bán lẻ đô thị.', tip: 'Diễn tả sự thuận tiện của ứng dụng công nghệ.' },
          { term: 'state-of-the-art', pos: 'adjective', vi: 'Tối tân, hiện đại nhất hiện nay', en: 'Using the most modern ideas and features', phonetic: '/ˌsteɪt.əv.ðiːˈɑːrt/', cols: ['state-of-the-art laboratories', 'state-of-the-art security'], ex: 'Research campuses require state-of-the-art laboratories to isolate novel pathogens.', exVi: 'Các khu nghiên cứu đòi hỏi phòng thí nghiệm tối tân để phân lập mầm bệnh mới.', tip: 'Thay thế từ "modern" hoặc "new".' },
          { term: 'foster innovation', pos: 'phrase', vi: 'Nuôi dưỡng và thúc đẩy đổi mới sáng tạo', en: 'Encourage creative new thinking', phonetic: '/ˈfɑː.stɚ ˌɪn.əˈveɪ.ʃən/', cols: ['foster a culture of innovation', 'foster digital innovation'], ex: 'Open-source communities foster innovation by sharing underlying codebase libraries.', exVi: 'Cộng đồng mã nguồn mở nuôi dưỡng đổi mới bằng cách chia sẻ các thư viện mã gốc.', tip: 'Dùng khi khen ngợi môi trường sáng tạo.' },
          { term: 'automated workflows', pos: 'noun phrase', vi: 'Các quy trình làm việc tự động hóa', en: 'Machine-driven business procedures', phonetic: '/ˈɔː.t̬ə.meɪ.t̬ɪd ˈwɝːk.floʊz/', cols: ['implement automated workflows', 'design workflows'], ex: 'Deploying automated workflows frees knowledge workers from clerical repetition.', exVi: 'Triển khai quy trình tự động giúp giải phóng nhân viên khỏi việc hành chính lặp lại.', tip: 'Dùng trong chủ đề năng suất lao động.' },
          { term: 'algorithmic decision-making', pos: 'noun phrase', vi: 'Ra quyết định dựa trên thuật toán máy tính', en: 'Decisions executed by algorithms without human interference', phonetic: '/ˌæl.ɡəˈrɪð.mɪk dɪˈsɪʒ.ən ˌmeɪ.kɪŋ/', cols: ['rely on algorithmic decision-making', 'flaws in algorithmic systems'], ex: 'Relying exclusively on algorithmic decision-making risks reinforcing historical systemic biases.', exVi: 'Dựa hoàn toàn vào ra quyết định bằng thuật toán có nguy cơ củng cố định kiến lịch sử.', tip: 'Chủ đề đạo đức công nghệ rất thịnh hành.' },
          { term: 'a double-edged sword', pos: 'idiom', vi: 'Con dao hai lưỡi (vừa lợi vừa hại)', en: 'Something having both benefits and harms', phonetic: '/ə ˌdʌb.əl.edʒd ˈsɔːrd/', cols: ['act as a double-edged sword', 'prove to be a double-edged sword'], ex: 'The democratization of generative AI is undeniably a double-edged sword.', exVi: 'Việc phổ cập AI tạo sinh không thể phủ nhận là một con dao hai lưỡi.', tip: 'Mở đầu bài luận Advantages & Disadvantages.' },
          { term: 'upskill the workforce', pos: 'phrase', vi: 'Đào tạo nâng cao kỹ năng cho lực lượng lao động', en: 'Train employees in higher capabilities', phonetic: '/ʌpˈskɪl ðə ˈwɝːk.fɔːrs/', cols: ['programs to upskill workers', 'upskilling and reskilling'], ex: 'Governments must co-fund corporate academies to upskill the workforce for automation.', exVi: 'Chính phủ phải đồng tài trợ các học viện doanh nghiệp để nâng cao kỹ năng cho người lao động.', tip: 'Giải pháp căn bản cho nguy cơ thất nghiệp do máy móc.' }
        ]
      }
    ]
  },

  // THEME 3: EDUCATION, REFORM & SOCIAL EQUALITY
  {
    topicKey: 'ielts-edu',
    topicTitleVi: 'Chuyên Đề Giáo Dục, Việc Làm & Bình Đẳng Xã Hội',
    badge: 'IELTS Academic Writing Core',
    icon: 'GraduationCap',
    themes: [
      {
        title: 'Higher Education & Curricular Reform',
        titleVi: 'Đổi Mới Giáo Dục Đại Học & Kỹ Năng Thế Kỷ 21',
        descVi: 'Luyện 18 từ vựng và collocations về cải cách giáo trình, học vẹt, học tập suốt đời và học phí đại học.',
        level: 'IELTS Band 7.5+',
        words: [
          { term: 'holistic education', pos: 'noun phrase', vi: 'Nền giáo dục toàn diện cả nhân cách và trí tuệ', en: 'Education addressing the whole person', phonetic: '/hoʊˈlɪs.tɪk ˌedʒ.əˈkeɪ.ʃən/', cols: ['pursue holistic education', 'holistic curriculum'], ex: 'Progressive schools prioritize holistic education over rote exam drills.', exVi: 'Các trường tiến bộ ưu tiên giáo dục toàn diện hơn là luyện thi học vẹt.', tip: 'Dùng khi bàn về mục đích thực sự của nhà trường.' },
          { term: 'rote learning', pos: 'noun phrase', vi: 'Phương pháp học vẹt, học thuộc lòng thụ động', en: 'Memorization without true understanding', phonetic: '/roʊt ˈlɝː.nɪŋ/', cols: ['rely on rote learning', 'discourage rote learning'], ex: 'Over-reliance on rote learning stifles student critical questioning.', exVi: 'Quá dựa dẫm vào học vẹt bóp nghẹt tư duy phản biện của học sinh.', tip: 'Chỉ trích phương pháp dạy học truyền thống lạc hậu.' },
          { term: 'foster critical thinking', pos: 'phrase', vi: 'Nuôi dưỡng và rèn luyện tư duy phản biện', en: 'Cultivate reasoned analytical reasoning', phonetic: '/ˈfɑː.stɚ ˈkrɪt̬.ɪ.kəl ˈθɪŋ.kɪŋ/', cols: ['foster critical thinking skills', 'encourage independent thought'], ex: 'Interactive seminars foster critical thinking through lively academic debates.', exVi: 'Các buổi hội thảo tương tác nuôi dưỡng tư duy phản biện qua tranh luận sôi nổi.', tip: 'Cụm Collocation điểm cao kinh điển cho đề tài giáo dục.' },
          { term: 'well-rounded individual', pos: 'noun phrase', vi: 'Con người phát triển toàn diện mọi mặt', en: 'A person with varied skills and sound character', phonetic: '/ˌwel.raʊn.dɪd ˌɪn.dəˈvɪdʒ.u.əl/', cols: ['nurture well-rounded individuals', 'develop well-rounded citizens'], ex: 'Co-curricular sports develop students into well-rounded individuals.', exVi: 'Thể thao ngoại khóa phát triển học sinh thành những con người toàn diện.', tip: 'Mục tiêu tối thượng của nền giáo dục hiện đại.' },
          { term: 'vocational training', pos: 'noun phrase', vi: 'Đào tạo nghề thực hành thực tiễn', en: 'Training focused on specific hands-on trades', phonetic: '/voʊˈkeɪ.ʃən.əl ˈtreɪ.nɪŋ/', cols: ['expand vocational training', 'vocational apprenticeships'], ex: 'Secondary schools should elevate vocational training alongside university tracks.', exVi: 'Trường phổ thông nên coi trọng đào tạo nghề ngang hàng với đại học.', tip: 'Đề tài "Học đại học hay đi học nghề".' },
          { term: 'subsidize tuition fees', pos: 'phrase', vi: 'Trợ cấp và bao cấp học phí đại học', en: 'Pay part of the educational cost with state funds', phonetic: '/ˈsʌb.sə.daɪz tuːˈɪʃ.ən fiːz/', cols: ['heavily subsidize tuition', 'state-subsidized education'], ex: 'Nordic welfare states heavily subsidize tuition fees for tertiary students.', exVi: 'Các nhà nước phúc lợi Bắc Âu bao cấp phần lớn học phí cho sinh viên đại học.', tip: 'Dùng trong đề tài "Chính phủ có nên miễn học phí?".' },
          { term: 'incur heavy student debt', pos: 'phrase', vi: 'Gánh khoản nợ học phí sinh viên nặng nề', en: 'Accumulate massive debt from degree costs', phonetic: '/ɪnˈkɝː ˈhev.i ˈstuː.dənt det/', cols: ['burdened with debt', 'incur debt for college'], ex: 'Graduates often incur heavy student debt before securing stable employment.', exVi: 'Sinh viên tốt nghiệp thường gánh khoản nợ nặng nề trước khi có việc làm ổn định.', tip: 'Hệ quả tiêu cực của việc thương mại hóa đại học.' },
          { term: 'bridge the gap between theory and practice', pos: 'phrase', vi: 'Rút ngắn khoảng cách giữa lý thuyết và thực tiễn', en: 'Connect academic concepts to practical application', phonetic: '/brɪdʒ ðə ɡæp/', cols: ['bridge the theory-practice divide', 'close the skill gap'], ex: 'Mandatory company internships bridge the gap between classroom theory and industry practice.', exVi: 'Kỳ thực tập doanh nghiệp bắt buộc giúp rút ngắn khoảng cách giữa lý thuyết và thực hành.', tip: 'Cụm liên kết điểm cao xuất sắc cho giáo dục đại học.' },
          { term: 'equal educational opportunities', pos: 'noun phrase', vi: 'Cơ hội tiếp cận giáo dục bình đẳng', en: 'Fair educational access regardless of background', phonetic: '/ˈiː.kwəl ˌedʒ.əˈkeɪ.ʃən.əl ˌɑː.pɚˈtuː.nə.t̬iz/', cols: ['guarantee equal opportunities', 'promote educational equality'], ex: 'Universal digital broadband guarantees equal educational opportunities for remote rural youths.', exVi: 'Internet băng thông rộng phổ cập đảm bảo cơ hội giáo dục bình đẳng cho thanh niên vùng sâu.', tip: 'Luận điểm về công bằng và bình đẳng xã hội.' },
          { term: 'democratize education', pos: 'phrase', vi: 'Bình dân hóa và đại chúng hóa giáo dục', en: 'Make education widely accessible to everyone', phonetic: '/dɪˈmɑː.krə.taɪz ˌedʒ.əˈkeɪ.ʃən/', cols: ['democratize access to knowledge', 'democratize learning'], ex: 'Massive open online courses democratize education for learners worldwide.', exVi: 'Các khóa học trực tuyến mở đại chúng hóa giáo dục cho người học toàn cầu.', tip: 'Động từ "democratize" rất đắt giá.' },
          { term: 'pedagogical approach', pos: 'noun phrase', vi: 'Phương pháp luận sư phạm giảng dạy', en: 'The instructional method of teaching', phonetic: '/ˌped.əˈɡɑː.dʒɪ.kəl əˈproʊtʃ/', cols: ['adopt modern pedagogical approaches', 'innovative pedagogy'], ex: 'Project-based learning represents a dynamic pedagogical approach.', exVi: 'Dạy học theo dự án thể hiện một phương pháp sư phạm năng động.', tip: 'Thuật ngữ học thuật chuyên sâu về giáo dục.' },
          { term: 'meritocracy', pos: 'noun', vi: 'Chế độ trọng dụng nhân tài thực lực', en: 'A system where ability and talent dictate success', phonetic: '/ˌmer.ɪˈtɑː.krə.si/', cols: ['uphold meritocracy', 'principles of meritocracy'], ex: 'Standardized blind admissions preserve academic meritocracy.', exVi: 'Tuyển sinh ẩn danh chuẩn hóa bảo vệ chế độ trọng dụng nhân tài thực lực.', tip: 'Từ vựng Band 8.0 về triết lý công bằng.' },
          { term: 'lifelong learning', pos: 'noun phrase', vi: 'Tinh thần học tập suốt đời', en: 'Ongoing, voluntary pursuit of knowledge', phonetic: '/ˌlaɪf.lɑːŋ ˈlɝː.nɪŋ/', cols: ['embrace lifelong learning', 'commit to lifelong education'], ex: 'Technological shifts require professionals to embrace lifelong learning.', exVi: 'Những chuyển dịch công nghệ đòi hỏi người đi làm phải duy trì học tập suốt đời.', tip: 'Lời khuyên tương lai trong phần kết bài.' },
          { term: 'extracurricular activities', pos: 'noun phrase', vi: 'Các hoạt động ngoại khóa ngoài giờ lên lớp', en: 'Non-academic activities conducted outside class', phonetic: '/ˌek.strə.kəˈrɪk.jə.lɚ ækˈtɪv.ə.t̬iz/', cols: ['participate in extracurriculars', 'balance with activities'], ex: 'Participating in extracurricular activities instills leadership competencies in adolescents.', exVi: 'Tham gia hoạt động ngoại khóa rèn luyện năng lực lãnh đạo cho thanh thiếu niên.', tip: 'Dẫn chứng về việc phát triển kỹ năng mềm.' },
          { term: 'nurture creative talents', pos: 'phrase', vi: 'Nuôi dưỡng các tài năng sáng tạo', en: 'Foster and encourage artistic and innovative gifts', phonetic: '/ˈnɝː.tʃɚ kriˈeɪ.t̬ɪv ˈtæl.ənts/', cols: ['nurture youthful talents', 'cultivate creativity'], ex: 'Arts education is essential to nurture creative talents in early childhood.', exVi: 'Giáo dục nghệ thuật là thiết yếu để nuôi dưỡng tài năng sáng tạo từ thơ ấu.', tip: 'Dùng cho đề tài "Nên dạy nghệ thuật hay khoa học?".' },
          { term: 'standardized testing', pos: 'noun phrase', vi: 'Hệ thống thi cử và kiểm tra chuẩn hóa', en: 'Uniform exams administered identically to all', phonetic: '/ˈstæn.dɚ.daɪzd ˈtes.tɪŋ/', cols: ['rely on standardized testing', 'limitations of testing'], ex: 'Critics contend that standardized testing evaluates test-taking tricks rather than genuine intellect.', exVi: 'Các nhà phê bình cho rằng thi cử chuẩn hóa chỉ đánh giá mẹo làm bài hơn là trí tuệ thực sự.', tip: 'Phản biện các kỳ thi quá nặng tính điểm số.' },
          { term: 'equip students with skills', pos: 'phrase', vi: 'Trang bị cho học sinh những kỹ năng thiết yếu', en: 'Provide learners with essential competencies', phonetic: '/ɪˈkwɪp ˈstuː.dənts wɪð skɪlz/', cols: ['equip for the workforce', 'equip with practical tools'], ex: 'Universities must equip students with data literacy skills before graduation.', exVi: 'Trường đại học phải trang bị cho sinh viên kỹ năng hiểu biết dữ liệu trước khi ra trường.', tip: 'Cụm Collocation mẫu mực cho câu giải pháp.' },
          { term: 'academic rigor', pos: 'noun phrase', vi: 'Tính nghiêm ngặt và chuẩn mực học thuật', en: 'High academic standards and challenging demands', phonetic: '/ˌæk.əˈdem.ɪk ˈrɪɡ.ɚ/', cols: ['maintain academic rigor', 'uphold rigor'], ex: 'Online universities must maintain academic rigor to protect degree credibility.', exVi: 'Các trường đại học trực tuyến phải duy trì chuẩn mực học thuật nghiêm ngặt để bảo vệ giá trị bằng cấp.', tip: 'Từ vựng Band 8.0 đánh giá chất lượng đào tạo.' }
        ]
      }
    ]
  },

  // THEME 4: CRIME, PENAL REFORM & JUDICIARY
  {
    topicKey: 'ielts-crime',
    topicTitleVi: 'Chuyên Đề Tư Pháp, Tội Phạm & Hoàn Lương Xã Hội',
    badge: 'IELTS Band 8.0+ Criminal Law',
    icon: 'Shield',
    themes: [
      {
        title: 'Penal System & Recidivism Prevention',
        titleVi: 'Hệ Thống Trừng Phạt & Biện Pháp Giảm Tái Phạm',
        descVi: '18 từ vựng và collocations về chế tài tù giam, lao động công ích, tội phạm vị thành niên và cải tạo nhân phẩm.',
        level: 'IELTS Band 8.0+',
        words: [
          { term: 'recidivism', pos: 'noun', vi: 'Hiện tượng tái phạm tội sau khi ra tù', en: 'The tendency of a convicted criminal to reoffend', phonetic: '/rɪˈsɪd.ə.vɪ.zəm/', cols: ['reduce recidivism rates', 'high recidivism'], ex: 'Vocational training inside prisons significantly reduces recidivism rates.', exVi: 'Đào tạo nghề trong trại giam giúp giảm đáng kể tỷ lệ tái phạm tội.', tip: 'Thuật ngữ đắt giá nhất trong chủ đề tội phạm.' },
          { term: 'deterrent', pos: 'noun', vi: 'Biện pháp răn đe, ngăn ngừa phạm pháp', en: 'A thing that discourages someone from doing something', phonetic: '/dɪˈter.ənt/', cols: ['act as a deterrent', 'effective deterrent'], ex: 'Severe financial penalties serve as an effective deterrent against corporate tax evasion.', exVi: 'Phạt tài chính nặng đóng vai trò răn đe hiệu quả trước hành vi trốn thuế doanh nghiệp.', tip: 'Cụm Collocation kinh điển: "act as a strong deterrent".' },
          { term: 'rehabilitate offenders', pos: 'phrase', vi: 'Cải tạo và giáo dục người phạm tội', en: 'Restore convicts to a useful and constructive place in society', phonetic: '/ˌriː.həˈbɪl.ə.teɪt əˈfen.dɚz/', cols: ['rehabilitate prisoners', 'rehabilitation programs'], ex: 'Modern penal philosophy prioritizes rehabilitating offenders over retributive punishment.', exVi: 'Triết lý tư pháp hiện đại ưu tiên cải tạo người phạm tội hơn là trừng phạt trả thù.', tip: 'Dùng khi bàn về mục đích nhân đạo của nhà tù.' },
          { term: 'custodial sentence', pos: 'noun phrase', vi: 'Bản án tù giam cách ly xã hội', en: 'A judicial sentence involving imprisonment', phonetic: '/kʌsˈtoʊ.di.əl ˈsen.təns/', cols: ['impose a custodial sentence', 'serve a custodial sentence'], ex: 'Judges should reserve custodial sentences for violent offenders who pose public danger.', exVi: 'Thẩm phán nên dành án tù giam cho những tội phạm bạo lực gây nguy hiểm xã hội.', tip: 'Nâng cấp từ vựng thay cho "prison/jail".' },
          { term: 'community service', pos: 'noun phrase', vi: 'Hình phạt lao động công ích phục vụ xã hội', en: 'Unpaid work beneficial to the public', phonetic: '/kəˈmjuː.nə.t̬i ˈsɝː.vɪs/', cols: ['sentence to community service', 'perform community service'], ex: 'Mandating community service encourages young offenders to appreciate civic responsibility.', exVi: 'Bắt buộc lao động công ích khuyên khích người phạm tội trẻ hiểu trách nhiệm công dân.', tip: 'Giải pháp thay thế tù giam cho tội nhẹ.' },
          { term: 'break the cycle of crime', pos: 'phrase', vi: 'Cắt đứt chuỗi vòng luẩn quẩn tội phạm', en: 'Stop crime from repeating over generations', phonetic: '/breɪk ðə ˈsaɪ.kəl əv kraɪm/', cols: ['intervene to break the cycle', 'break intergenerational poverty'], ex: 'Early neighborhood youth clubs help break the vicious cycle of gang crime.', exVi: 'Các câu lạc bộ thanh thiếu niên giúp cắt đứt chuỗi tội phạm băng nhóm luẩn quẩn.', tip: 'Cụm thành ngữ liên kết nhân quả điểm cao.' },
          { term: 'juvenile delinquency', pos: 'noun phrase', vi: 'Tình trạng phạm pháp ở tuổi vị thành niên', en: 'Antisocial behavior committed by minors', phonetic: '/ˈdʒuː.vən.aɪl dɪˈlɪŋ.kwən.si/', cols: ['tackle juvenile delinquency', 'combat delinquency'], ex: 'Truancy in secondary schools is frequently correlated with juvenile delinquency.', exVi: 'Trốn học ở trường phổ thông thường có mối tương quan với phạm pháp vị thành niên.', tip: 'Từ vựng học thuật chuẩn quốc tế.' },
          { term: 'stringent penalties', pos: 'noun phrase', vi: 'Các chế tài và khung hình phạt nghiêm khắc', en: 'Strict and severe punishments', phonetic: '/ˈstrɪn.dʒənt ˈpen.əl.tiz/', cols: ['enforce stringent penalties', 'subject to penalties'], ex: 'Governments should enact stringent penalties for reckless drunken driving.', exVi: 'Chính phủ nên ban hành những chế tài nghiêm khắc đối với lái xe say rượu liều lĩnh.', tip: 'Thay thế cụm thông thường "strict punishments".' },
          { term: 'capital punishment', pos: 'noun phrase', vi: 'Án tử hình', en: 'The legally authorized killing of someone as punishment', phonetic: '/ˌkæp.ə.t̬əl ˈpʌn.ɪʃ.mənt/', cols: ['abolish capital punishment', 'retain capital punishment'], ex: 'Human rights organizations consistently campaign to abolish capital punishment worldwide.', exVi: 'Các tổ chức nhân quyền liên tục vận động bãi bỏ án tử hình trên toàn thế giới.', tip: 'Đề tài tranh luận kinh điển trong Task 2.' },
          { term: 'reintegrate into society', pos: 'phrase', vi: 'Tái hòa nhập vào đời sống xã hội', en: 'Successfully fit back into community life', phonetic: '/ˌriː.ˈɪn.t̬ə.ɡreɪt ˈɪn.tuː səˈsaɪ.ə.t̬i/', cols: ['help ex-convicts reintegrate', 'smooth reintegration'], ex: 'Post-release counseling assists ex-offenders to reintegrate into society peacefully.', exVi: 'Tư vấn sau khi mãn hạn tù hỗ trợ người từng phạm tội tái hòa nhập xã hội hòa bình.', tip: 'Cụm từ then chốt cho đề tài hoàn lương.' },
          { term: 'heinous crimes', pos: 'noun phrase', vi: 'Những tội ác đặc biệt dã man ghê rợn', en: 'Extremely wicked and shocking criminal acts', phonetic: '/ˈheɪ.nəs kraɪmz/', cols: ['commit heinous crimes', 'heinous offenses'], ex: 'Perpetrators of heinous crimes deserve lifelong solitary confinement.', exVi: 'Kẻ thủ ác phạm các tội ác ghê rợn xứng đáng chịu án biệt giam chung thân.', tip: 'Từ vựng Band 8.5 nhấn mạnh tính chất tội phạm đặc biệt.' },
          { term: 'mitigating circumstances', pos: 'noun phrase', vi: 'Các tình tiết giảm nhẹ trách nhiệm hình sự', en: 'Factors that lessen the blame or gravity of a crime', phonetic: '/ˈmɪt̬.ə.ɡeɪ.t̬ɪŋ ˈsɝː.kəm.stæns.ɪz/', cols: ['consider mitigating circumstances', 'plead circumstances'], ex: 'Courts must carefully review mitigating circumstances like psychological trauma before verdict.', exVi: 'Tòa án phải xem xét kỹ tình tiết giảm nhẹ như chấn thương tâm lý trước khi tuyên án.', tip: 'Thuật ngữ luật pháp chuyên nghiệp.' },
          { term: 'law enforcement agencies', pos: 'noun phrase', vi: 'Các cơ quan thực thi pháp luật và cảnh sát', en: 'Police and governmental bodies enforcing order', phonetic: '/lɑː ɪnˈfɔːrs.mənt ˈeɪ.dʒən.siz/', cols: ['cooperation among agencies', 'empower agencies'], ex: 'Cross-border smuggling requires tighter coordination among national law enforcement agencies.', exVi: 'Buôn lậu xuyên biên giới đòi hỏi phối hợp chặt chẽ giữa các cơ quan thực thi pháp luật.', tip: 'Cụm danh từ trang trọng thay cho "the police".' },
          { term: 'restorative justice', pos: 'noun phrase', vi: 'Công lý phục hồi (hàn gắn nạn nhân và thủ phạm)', en: 'System focusing on rehabilitation and reconciliation', phonetic: '/rɪˈstɔːr.ə.tɪv ˈdʒʌs.tɪs/', cols: ['principles of restorative justice', 'champion justice'], ex: 'Restorative justice empowers victims to express their pain directly to the perpetrator.', exVi: 'Công lý phục hồi cho phép nạn nhân bày tỏ nỗi đau trực tiếp trước người phạm tội.', tip: 'Tư duy hiện đại gây ấn tượng mạnh với giám khảo.' },
          { term: 'preventative measures', pos: 'noun phrase', vi: 'Các biện pháp phòng ngừa từ sớm', en: 'Steps taken to stop crime before it occurs', phonetic: '/prɪˈven.t̬ə.tɪv ˈmeʒ.ɚz/', cols: ['implement preventative measures', 'adopt proactive measures'], ex: 'Community policing serves as one of the best preventative measures against urban burglary.', exVi: 'Cảnh sát khu vực đóng vai trò là một trong những biện pháp phòng ngừa trộm cắp tốt nhất.', tip: 'Dùng khi đưa ra giải pháp toàn diện.' },
          { term: 'corporal punishment', pos: 'noun phrase', vi: 'Hình phạt thể xác (đánh đập, đòn roi)', en: 'Physical punishment like caning or spanking', phonetic: '/ˌkɔːr.pɚ.əl ˈpʌn.ɪʃ.mənt/', cols: ['ban corporal punishment', 'inflict corporal punishment'], ex: 'Most developed nations have banned corporal punishment in public educational institutions.', exVi: 'Đa số các quốc gia phát triển đã cấm hình phạt thể xác trong các cơ sở giáo dục.', tip: 'Dùng cho đề tài kỷ luật trẻ em và học sinh.' },
          { term: 'white-collar crime', pos: 'noun phrase', vi: 'Tội phạm cổ cồn trắng (tội phạm tài chính, tham nhũng)', en: 'Non-violent financial crime committed by professionals', phonetic: '/ˌwaɪtˈkɑː.lɚ kraɪm/', cols: ['prosecute white-collar crime', 'embezzlement and fraud'], ex: 'White-collar crime inflicts immense damage on national public treasuries.', exVi: 'Tội phạm cổ cồn trắng gây tổn thất khổng lồ cho ngân khố quốc gia.', tip: 'Phân loại tội phạm kinh tế.' },
          { term: 'uphold the rule of law', pos: 'phrase', vi: 'Duy trì và thượng tôn pháp luật', en: 'Ensure laws are obeyed and fairly applied to all', phonetic: '/ʌpˈhoʊld ðə ruːl əv lɑː/', cols: ['commitment to uphold the rule of law', 'bedrock of justice'], ex: 'A prosperous civil democracy must rigorously uphold the rule of law without favoritism.', exVi: 'Một nền dân chủ phồn vinh bắt buộc phải thượng tôn pháp luật nghiêm minh không thiên vị.', tip: 'Cụm kết bài đắt giá cho chủ đề xã hội và pháp luật.' }
        ]
      }
    ]
  },

  // THEME 5: PUBLIC HEALTH, AGING DEMOGRAPHICS & WELLBEING
  {
    topicKey: 'ielts-health',
    topicTitleVi: 'Chuyên Đề Y Tế Công Cộng, Sức Khỏe Tinh Thần & Già Hóa Dân Số',
    badge: 'IELTS Band 8.0+ Healthcare',
    icon: 'HeartPulse',
    themes: [
      {
        title: 'Preventative Healthcare & Demographic Shifts',
        titleVi: 'Y Tế Dự Phòng & Chuyển Dịch Nhân Khẩu Học',
        descVi: 'Luyện 18 từ vựng và collocations về gánh nặng y tế, tuổi thọ, lối sống thụ động và bảo hiểm toàn dân.',
        level: 'IELTS Band 7.5 - 8.5',
        words: [
          { term: 'preventative healthcare', pos: 'noun phrase', vi: 'Hệ thống y tế dự phòng (phòng bệnh hơn chữa bệnh)', en: 'Healthcare focusing on disease prevention', phonetic: '/prɪˈven.t̬ə.tɪv ˈhelθ.ker/', cols: ['invest in preventative healthcare', 'preventative medicine'], ex: 'Allocating national budgets to preventative healthcare reduces hospital crowding.', exVi: 'Phân bổ ngân sách quốc gia cho y tế dự phòng giúp giảm quá tải bệnh viện.', tip: 'Luận điểm vàng cho câu hỏi chính phủ nên chi tiền thế nào.' },
          { term: 'sedentary lifestyle', pos: 'noun phrase', vi: 'Lối sống thụ động, lười vận động, ngồi nhiều', en: 'A lifestyle with very little physical activity', phonetic: '/ˈsed.ən.ter.i ˈlaɪf.staɪl/', cols: ['lead a sedentary lifestyle', 'combating sedentary habits'], ex: 'Modern desk jobs predispose urban populations to a sedentary lifestyle.', exVi: 'Công việc bàn giấy hiện đại khiến người thành thị dễ sa vào lối sống ít vận động.', tip: 'Nguyên nhân hàng đầu của bệnh mãn tính.' },
          { term: 'life expectancy', pos: 'noun phrase', vi: 'Tuổi thọ trung bình kỳ vọng', en: 'The average period a person may expect to live', phonetic: '/ˈlaɪf ɪkˌspek.tən.si/', cols: ['increase life expectancy', 'average life expectancy'], ex: 'Sanitation advances have dramatically lengthened life expectancy globally.', exVi: 'Tiến bộ vệ sinh dịch tễ đã kéo dài đáng kể tuổi thọ trung bình trên toàn cầu.', tip: 'Thuật ngữ quen thuộc trong Task 1 và Task 2.' },
          { term: 'strain on public infrastructure', pos: 'phrase', vi: 'Gánh nặng đè nặng lên hạ tầng công cộng', en: 'Severe pressure placed on state systems', phonetic: '/streɪn ɑːn ˈpʌb.lɪk ˈɪn.frəˌstrʌk.tʃɚ/', cols: ['exert an unbearable strain', 'relieve the strain'], ex: 'An aging population exerts a formidable strain on pension and healthcare infrastructure.', exVi: 'Dân số già hóa tạo ra một gánh nặng to lớn lên hạ tầng hưu trí và y tế.', tip: 'Cụm diễn đạt hệ quả xuất sắc.' },
          { term: 'universal healthcare coverage', pos: 'noun phrase', vi: 'Bảo hiểm và chăm sóc y tế toàn dân', en: 'System providing all citizens with health services', phonetic: '/ˌjuː.nəˈvɝː.səl ˈhelθ.ker ˈkʌv.ɚ.ɪdʒ/', cols: ['achieve universal healthcare', 'subsidized coverage'], ex: 'Progressive societies consider universal healthcare coverage a fundamental human right.', exVi: 'Xã hội tiến bộ coi bảo hiểm y tế toàn dân là một quyền con người cơ bản.', tip: 'Chủ đề trách nhiệm của nhà nước.' },
          { term: 'obesity epidemic', pos: 'noun phrase', vi: 'Đại dịch béo phì lan rộng', en: 'Widespread rapid rise of extreme overweightness', phonetic: '/oʊˈbiː.sə.ti ˌep.əˈdem.ɪk/', cols: ['tackle the obesity epidemic', 'childhood obesity'], ex: 'Subsidizing sugar-laden beverages directly fuels the childhood obesity epidemic.', exVi: 'Trợ giá đồ uống nhiều đường trực tiếp tiếp tay cho đại dịch béo phì ở trẻ em.', tip: 'Dùng từ "epidemic" để nhấn mạnh quy mô.' },
          { term: 'demographic aging', pos: 'noun phrase', vi: 'Hiện tượng già hóa dân số', en: 'Shift in distribution towards older ages', phonetic: '/ˌdem.əˈɡræf.ɪk ˈeɪ.dʒɪŋ/', cols: ['confront demographic aging', 'rapid aging trends'], ex: 'East Asian nations are confronting unprecedented demographic aging.', exVi: 'Các quốc gia Đông Á đang đối diện với hiện tượng già hóa dân số chưa từng thấy.', tip: 'Từ ngữ học thuật chuẩn nhân khẩu học.' },
          { term: 'silver economy', pos: 'noun phrase', vi: 'Nền kinh tế hướng tới người cao tuổi', en: 'Economic activities tailored to seniors', phonetic: '/ˈsɪl.vɚ iˈkɑː.nə.mi/', cols: ['thrive on the silver economy', 'cater to silver consumers'], ex: 'Entrepreneurs are pivoting toward the silver economy through elderly care tech.', exVi: 'Các doanh nhân đang chuyển hướng sang nền kinh tế người già qua công nghệ dưỡng lão.', tip: 'Tư duy kinh tế mới lạ gây điểm cộng.' },
          { term: 'mental wellbeing', pos: 'noun phrase', vi: 'Sức khỏe tinh thần và cảm xúc lành mạnh', en: 'The state of psychological health and peace', phonetic: '/ˈmen.təl ˌwelˈbiː.ɪŋ/', cols: ['safeguard mental wellbeing', 'foster emotional wellness'], ex: 'Workplace stress-relief initiatives safeguard employee mental wellbeing.', exVi: 'Sáng kiến giảm căng thẳng nơi công sở bảo vệ sức khỏe tinh thần của nhân viên.', tip: 'Rất thời sự trong các đề thi gần đây.' },
          { term: 'subsidize essential medications', pos: 'phrase', vi: 'Trợ cấp và bình ổn giá thuốc thiết yếu', en: 'Help pay for vital drugs with public money', phonetic: '/ˈsʌb.sə.daɪz ɪˈsen.ʃəl ˌmed.əˈkeɪ.ʃənz/', cols: ['policy to subsidize medicines', 'essential pharmaceutical subsidies'], ex: 'Developing nations should subsidize essential medications for chronic ailments.', exVi: 'Các nước đang phát triển nên trợ cấp thuốc thiết yếu cho các bệnh mãn tính.', tip: 'Câu giải pháp cho đề tài y tế.' },
          { term: 'inadequate medical facilities', pos: 'phrase', vi: 'Cơ sở vật chất y tế thiếu thốn yếu kém', en: 'Insufficient and poor hospitals/clinics', phonetic: '/ɪnˈæd.ə.kwət ˈmed.ɪ.kəl fəˈsɪl.ə.t̬iz/', cols: ['suffer from inadequate facilities', 'upgrade rundown clinics'], ex: 'Rural populations frequently suffer from inadequate medical facilities during epidemics.', exVi: 'Người dân nông thôn thường xuyên chịu cảnh cơ sở y tế thiếu thốn khi có dịch bệnh.', tip: 'Phân tích nguyên nhân chênh lệch vùng miền.' },
          { term: 'exorbitant healthcare expenses', pos: 'noun phrase', vi: 'Chi phí chăm sóc y tế đắt đỏ quá mức', en: 'Extremely high and burdensome medical costs', phonetic: '/ɪɡˈzɔːr.bə.tənt ˈhelθ.ker ɪkˈspen.sɪz/', cols: ['burdened by exorbitant costs', 'crippling hospital bills'], ex: 'Private clinics charge exorbitant healthcare expenses that bankrupt middle-class families.', exVi: 'Bệnh viện tư thu chi phí đắt đỏ đẩy các gia đình trung lưu vào cảnh phá sản.', tip: 'Từ "exorbitant" nâng tầm câu văn lên Band 8.5.' },
          { term: 'longevity', pos: 'noun', vi: 'Sự sống lâu, tuổi thọ cao', en: 'Long life or existence', phonetic: '/lɑːnˈdʒev.ə.t̬i/', cols: ['promote human longevity', 'achieve healthy longevity'], ex: 'Balanced nutrition and social interaction remain the twin pillars of longevity.', exVi: 'Dinh dưỡng cân bằng và giao tiếp xã hội là hai trụ cột song sinh của sự sống thọ.', tip: 'Từ vựng cao cấp thay cho "living long".' },
          { term: 'curb the transmission', pos: 'phrase', vi: 'Kiểm soát và ngăn chặn sự lây truyền', en: 'Halt the spread of infectious agents', phonetic: '/kɝːb ðə trænzˈmɪʃ.ən/', cols: ['curb airborne transmission', 'slow down viral contagion'], ex: 'Early quarantine protocols help curb the transmission of seasonal contagions.', exVi: 'Các quy trình cách ly sớm giúp kiểm soát sự lây truyền của mầm bệnh theo mùa.', tip: 'Động từ "curb" mang nghĩa kìm hãm kiểm soát.' },
          { term: 'chronic ailments', pos: 'noun phrase', vi: 'Các bệnh mãn tính kéo dài', en: 'Long-lasting illnesses and disorders', phonetic: '/ˈkrɑː.nɪk ˈeɪl.mənts/', cols: ['suffer from chronic ailments', 'manage chronic conditions'], ex: 'Cardiovascular disease and diabetes are prevalent chronic ailments among adults.', exVi: 'Bệnh tim mạch và tiểu đường là những bệnh mãn tính phổ biến ở người trưởng thành.', tip: 'Từ vựng y khoa chính xác.' },
          { term: 'prevention is better than cure', pos: 'idiom', vi: 'Phòng bệnh hơn chữa bệnh (Tục ngữ)', en: 'It is easier to stop problems before they arise', phonetic: '/prɪˈven.ʃən ɪz ˈbet̬.ɚ ðæn kjʊr/', cols: ['abide by prevention is better than cure', 'golden medical maxim'], ex: 'Public health ministers should remember that prevention is always better than cure.', exVi: 'Các bộ trưởng y tế nên nhớ rằng phòng bệnh lúc nào cũng tốt hơn chữa bệnh.', tip: 'Thành ngữ tục ngữ kinh điển ghi điểm Lexical Resource.' },
          { term: 'holistic wellbeing', pos: 'noun phrase', vi: 'Sức khỏe toàn diện cả thể chất lẫn tâm trí', en: 'Complete physical, mental, and social health', phonetic: '/hoʊˈlɪs.tɪk ˌwelˈbiː.ɪŋ/', cols: ['cultivate holistic wellbeing', 'integrated wellness'], ex: 'Yoga and mindfulness promote holistic wellbeing by aligning breath and physiology.', exVi: 'Yoga và chánh niệm thúc đẩy sức khỏe toàn diện bằng cách gắn kết hơi thở và thể chất.', tip: 'Cụm từ rất được ưa chuộng hiện nay.' },
          { term: 'compromise immune defenses', pos: 'phrase', vi: 'Làm suy yếu hệ miễn dịch cơ thể', en: 'Weaken bodily disease resistance', phonetic: '/ˈkɑːm.prə.maɪz ɪˈmjuːn dɪˈfen.sɪz/', cols: ['compromise bodily defenses', 'severely compromised immunity'], ex: 'Chronic insomnia can severely compromise immune defenses against seasonal viruses.', exVi: 'Mất ngủ kinh niên có thể làm suy yếu nghiêm trọng hệ miễn dịch trước virus.', tip: 'Cách dùng động từ "compromise" điểm cao.' }
        ]
      }
    ]
  },

  // THEME 6: GLOBALIZATION, CULTURAL PRESERVATION & HERITAGE
  {
    topicKey: 'ielts-culture',
    topicTitleVi: 'Chuyên Đề Toàn Cầu Hóa, Bản Sắc Dân Tộc & Bảo Tồn Di Sản',
    badge: 'IELTS Band 8.5+ Culture',
    icon: 'Globe',
    themes: [
      {
        title: 'Cultural Assimilation & Language Loss',
        titleVi: 'Sự Đồng Hóa Văn Hóa & Nguy Cơ Mai Một Ngôn Ngữ',
        descVi: 'Luyện 18 từ vựng và collocations về giữ gìn bản sắc địa phương, sự thống trị của văn hóa phương Tây và tiếng mẹ đẻ.',
        level: 'IELTS Band 8.0 - 8.5',
        words: [
          { term: 'cultural homogenization', pos: 'noun phrase', vi: 'Sự đồng nhất hóa văn hóa (mất đi sự đa dạng)', en: 'The process of cultures becoming identical', phonetic: '/ˈkʌl.tʃɚ.əl həˌmɑː.dʒə.nəˈzeɪ.ʃən/', cols: ['resist cultural homogenization', 'threat of global homogenization'], ex: 'Western fast food franchises risk driving widespread cultural homogenization.', exVi: 'Các chuỗi đồ ăn nhanh phương Tây có nguy cơ dẫn đến sự đồng nhất hóa văn hóa lan rộng.', tip: 'Thuật ngữ xuất sắc nhất khi bàn về tác hại toàn cầu hóa.' },
          { term: 'preserve intangible heritage', pos: 'phrase', vi: 'Bảo tồn di sản văn hóa phi vật thể', en: 'Protect folklore, rituals, and oral arts', phonetic: '/prɪˈzɝːv ɪnˈtæn.dʒə.bəl ˈher.ə.t̬ɪdʒ/', cols: ['preserve customs and heritage', 'safeguard folk traditions'], ex: 'Communities must preserve intangible heritage like traditional puppetry for posterity.', exVi: 'Cộng đồng phải gìn giữ di sản phi vật thể như múa rối truyền thống cho hậu thế.', tip: 'Từ ngữ chuẩn UNESCO.' },
          { term: 'linguistic diversity', pos: 'noun phrase', vi: 'Sự đa dạng ngôn ngữ', en: 'The variety of languages spoken in the world', phonetic: '/lɪŋˈɡwɪs.tɪk daɪˈvɝː.sə.ti/', cols: ['celebrate linguistic diversity', 'threat to indigenous dialects'], ex: 'When a minority tongue dies out, global linguistic diversity suffers an irreparable blow.', exVi: 'Khi một thứ tiếng thiểu số biến mất, sự đa dạng ngôn ngữ toàn cầu chịu tổn thất khôn hàn.', tip: 'Dùng cho đề tài "Có nên dùng một ngôn ngữ chung toàn cầu?".' },
          { term: 'indigenous customs', pos: 'noun phrase', vi: 'Phong tục tập quán bản địa lâu đời', en: 'Native traditions practiced for generations', phonetic: '/ɪnˈdɪdʒ.ə.nəs ˈkʌs.təmz/', cols: ['respect indigenous customs', 'ancient native rituals'], ex: 'Eco-tourists are urged to respect indigenous customs when visiting tribal highlands.', exVi: 'Khách du lịch sinh thái được khuyến cáo tôn trọng phong tục bản địa khi đến vùng cao.', tip: 'Từ "indigenous" cao cấp hơn "local/traditional".' },
          { term: 'cultural assimilation', pos: 'noun phrase', vi: 'Sự đồng hóa văn hóa của người nhập cư', en: 'The integration of a minority into mainstream culture', phonetic: '/ˈkʌl.tʃɚ.əl əˌsɪm.əˈleɪ.ʃən/', cols: ['speed up cultural assimilation', 'resist assimilation'], ex: 'Migrant families often grapple with rapid cultural assimilation among their youth.', exVi: 'Các gia đình nhập cư thường chật vật trước sự đồng hóa văn hóa nhanh của con cái họ.', tip: 'Chủ đề người nhập cư và cộng đồng hải ngoại.' },
          { term: 'erosion of local traditions', pos: 'phrase', vi: 'Sự mai một xói mòn truyền thống bản địa', en: 'Gradual destruction of folk heritage', phonetic: '/ɪˈroʊ.ʒən əv ˈloʊ.kəl trəˈdɪʃ.ənz/', cols: ['halt the erosion of folklore', 'prevent cultural decay'], ex: 'Hyper-commercial holidays contribute to the steady erosion of local harvest traditions.', exVi: 'Các ngày lễ siêu thương mại hóa góp phần làm xói mòn dần truyền thống mùa gặt địa phương.', tip: 'Dùng danh từ hóa "erosion of...".' },
          { term: 'foster cross-cultural empathy', pos: 'phrase', vi: 'Thúc đẩy sự thấu cảm hiểu biết xuyên văn hóa', en: 'Encourage understanding between different peoples', phonetic: '/ˈfɑː.stɚ krɑːsˈkʌl.tʃɚ.əl ˈem.pə.θi/', cols: ['student exchanges foster empathy', 'mutual understanding'], ex: 'International student exchanges foster cross-cultural empathy among global youth.', exVi: 'Trao đổi sinh viên quốc tế thúc đẩy sự thấu cảm đa văn hóa giữa thế hệ trẻ.', tip: 'Lợi ích tích cực hàng đầu của toàn cầu hóa.' },
          { term: 'national identity', pos: 'noun phrase', vi: 'Bản sắc và lòng tự tôn dân tộc', en: 'The sense of a nation as a cohesive whole', phonetic: '/ˈnæʃ.nəl aɪˈden.t̬ə.t̬i/', cols: ['forge a strong national identity', 'preserve civic identity'], ex: 'Teaching national history equips younger generations with a cohesive national identity.', exVi: 'Dạy lịch sử dân tộc trang bị cho thế hệ trẻ một bản sắc dân tộc gắn kết.', tip: 'Luận điểm bảo tồn môn Lịch sử trong trường học.' },
          { term: 'ancestral heritage', pos: 'noun phrase', vi: 'Di sản kế thừa từ tổ tiên cha ông', en: 'Traditions inherited from forefathers', phonetic: '/ænˈses.trəl ˈher.ə.t̬ɪdʒ/', cols: ['revere ancestral heritage', 'cherish family lineage'], ex: 'Architectural restorations honor the ancestral heritage of old trading quarters.', exVi: 'Trùng tu kiến trúc tôn vinh di sản cha ông của những khu thương cảng cổ.', tip: 'Từ ngữ trang trọng và thiêng liêng.' },
          { term: 'commercialization of folklore', pos: 'phrase', vi: 'Sự thương mại hóa các lễ hội dân gian', en: 'Turning cultural festivals into money-making schemes', phonetic: '/kəˌmɝː.ʃəl.əˈzeɪ.ʃən əv ˈfoʊk.lɔːr/', cols: ['excessive commercialization', 'strip rituals of sacredness'], ex: 'The commercialization of folklore risks turning sacred rites into hollow tourist spectacles.', exVi: 'Thương mại hóa văn hóa dân gian có nguy cơ biến nghi lễ thiêng thành trò diễn du lịch sáo rỗng.', tip: 'Góc nhìn phản biện sắc sảo về du lịch đại trà.' },
          { term: 'dominant lingua franca', pos: 'noun phrase', vi: 'Ngôn ngữ chung thống trị giao dịch quốc tế', en: 'A prevailing common bridging language', phonetic: '/ˈdɑː.mə.nənt ˌlɪŋ.ɡwə ˈfræŋ.kə/', cols: ['serve as the global lingua franca', 'adopt a lingua franca'], ex: 'English currently operates as the undisputed dominant lingua franca in aviation and science.', exVi: 'Tiếng Anh hiện vận hành như ngôn ngữ chung thống trị không thể bàn cãi trong hàng không và khoa học.', tip: 'Cụm thuật ngữ "lingua franca" cực kỳ sang trọng.' },
          { term: 'language extinction', pos: 'noun phrase', vi: 'Sự tuyệt chủng ngôn ngữ', en: 'The complete disappearance of a dialect', phonetic: '/ˈlæŋ.ɡwɪdʒ ɪkˈstɪŋk.ʃən/', cols: ['on the brink of extinction', 'prevent language death'], ex: 'Digital archives record elder storytellers to stave off imminent language extinction.', exVi: 'Kho lưu trữ số ghi âm những người kể chuyện cao niên để ngăn nguy cơ tuyệt chủng ngôn ngữ.', tip: 'Dùng khi bàn về số phận các ngôn ngữ thiểu số.' },
          { term: 'cultural relics', pos: 'noun phrase', vi: 'Các cổ vật và hiện vật di tích văn hóa', en: 'Valuable ancient objects of historical worth', phonetic: '/ˈkʌl.tʃɚ.əl ˈrel.ɪks/', cols: ['repatriate cultural relics', 'unearth ancient relics'], ex: 'Governments demand foreign museums repatriate looted cultural relics.', exVi: 'Các chính phủ yêu cầu bảo tàng nước ngoài hồi hương các cổ vật văn hóa bị cướp bóc.', tip: 'Chủ đề hồi hương cổ vật lịch sử.' },
          { term: 'deep-seated traditions', pos: 'noun phrase', vi: 'Các truyền thống ăn sâu bám rễ lâu đời', en: 'Firmly established cultural rituals', phonetic: '/ˌdiːpˈsiː.t̬ɪd trəˈdɪʃ.ənz/', cols: ['uphold deep-seated traditions', 'ingrained values'], ex: 'Lunar festive feasts reflect deep-seated traditions of family reunion and gratitude.', exVi: 'Cơm tất niên ngày Tết phản ánh truyền thống ăn sâu bám rễ về đoàn tụ và tri ân.', tip: 'Miêu tả sức sống mãnh liệt của phong tục.' },
          { term: 'cross-cultural communication', pos: 'noun phrase', vi: 'Giao lưu và giao tiếp giữa các nền văn hóa', en: 'Interaction among distinct cultures', phonetic: '/ˌkrɑːsˈkʌl.tʃɚ.əl kəˌmjuː.nəˈkeɪ.ʃən/', cols: ['facilitate communication', 'cultural barriers'], ex: 'Multinational corporations train executives in effective cross-cultural communication.', exVi: 'Tập đoàn đa quốc gia đào tạo lãnh đạo về giao tiếp liên văn hóa hiệu quả.', tip: 'Kỹ năng làm việc trong môi trường quốc tế.' },
          { term: 'when in Rome, do as the Romans do', pos: 'idiom', vi: 'Nhập gia tùy tục (Tục ngữ)', en: 'Conform to local customs when visiting abroad', phonetic: '/wen ɪn roʊm/', cols: ['abide by the rule of when in Rome', 'golden rule of travel'], ex: 'Travelers should remember: when in Rome, do as the Romans do, and honor dining etiquette.', exVi: 'Khách du lịch nên nhớ: nhập gia tùy tục và tôn trọng phép tắc ăn uống bản địa.', tip: 'Tục ngữ áp dụng hoàn hảo cho đề tài du lịch thế giới.' },
          { term: 'cultural appropriation', pos: 'noun phrase', vi: 'Chiếm đoạt văn hóa (sao chép thiếu tôn trọng)', en: 'Inappropriate adoption of elements of one culture', phonetic: '/ˈkʌl.tʃɚ.əl əˌproʊ.priˈeɪ.ʃən/', cols: ['accused of cultural appropriation', 'insensitive appropriation'], ex: 'Fashion brands face public outcry when accused of insensitive cultural appropriation.', exVi: 'Các hãng thời trang đối diện phản ứng dữ dội khi bị cáo buộc chiếm đoạt văn hóa thiếu nhạy cảm.', tip: 'Chủ đề thời sự đạo đức văn hóa phương Tây.' },
          { term: 'safeguard intangible treasures', pos: 'phrase', vi: 'Che chở và bảo tồn các kho báu tinh thần', en: 'Protect vital oral and ritual heritages', phonetic: '/ˈseɪf.ɡɑːrd ɪnˈtæn.dʒə.bəl ˈtreʒ.ɚz/', cols: ['commit to safeguarding treasures', 'living treasures'], ex: 'Generous state grants safeguard intangible treasures from dying with their aging masters.', exVi: 'Các khoản tài trợ nhà nước bảo vệ những kho báu phi vật thể khỏi thất truyền theo các nghệ nhân già.', tip: 'Câu giải pháp kết bài giàu tính nhân văn.' }
        ]
      }
    ]
  }
];

// ============================================================================
// 6 RICH HSK THEME POOLS (HSK 3 - 6 + 300 成语 + 近义词辨析)
// ============================================================================

export interface HskWordTemplate {
  term: string;
  pos: string;
  vi: string;
  en: string;
  pinyin: string;
  cols: string[];
  ex: string;
  exVi: string;
  tip: string;
}

export interface HskThemePool {
  title: string;
  titleVi: string;
  descVi: string;
  level: string;
  words: HskWordTemplate[];
}

export const hskThemePools: HskThemePool[] = [
  // POOL 1: HSK 1 Foundations & Greetings
  {
    title: 'HSK 1: Greetings, Numbers & Daily Basics',
    titleVi: 'HSK 1: Chào Hỏi, Số Đếm, Gia Đình & Giao Tiếp Cơ Bản',
    descVi: 'Nắm vững 18 chữ Hán và từ vựng HSK 1 căn bản nhất: chào hỏi, giới thiệu bản thân, số đếm và cảm ơn.',
    level: 'HSK 1',
    words: [
      { term: '你好', pos: 'phrase', vi: 'Xin chào', en: 'Hello', pinyin: 'nǐhǎo', cols: ['你好吗', '您好'], ex: '你好！很高兴在这里认识你。', exVi: 'Xin chào! Rất vui được quen biết bạn ở đây.', tip: 'Lời chào thông dụng nhất trong tiếng Trung.' },
      { term: '谢谢', pos: 'v', vi: 'Cảm ơn', en: 'Thank you', pinyin: 'xièxie', cols: ['太谢谢了', '多谢'], ex: '太谢谢你的热情帮助了。', exVi: 'Rất cảm ơn sự giúp đỡ nhiệt tình của bạn.', tip: 'Đáp lại thường dùng 不客气 (không có chi).' },
      { term: '再见', pos: 'phrase', vi: 'Tạm biệt, hẹn gặp lại', en: 'Goodbye', pinyin: 'zàijiàn', cols: ['明天再见', '说再见'], ex: '放学了，同学们向老师说再见。', exVi: 'Tan học rồi, các bạn học sinh nói lời tạm biệt thầy giáo.', tip: 'Chữ 再 (lại) + 见 (gặp).' },
      { term: '朋友', pos: 'n', vi: 'Bạn bè, người bạn', en: 'Friend', pinyin: 'péngyou', cols: ['好朋友', '新朋友'], ex: '王明是我在大学最好的中国朋友。', exVi: 'Vương Minh là người bạn Trung Quốc thân nhất của tôi ở đại học.', tip: 'Chữ 朋 gồm hai bộ Nguyệt (月).' },
      { term: '喜欢', pos: 'v', vi: 'Thích, yêu thích', en: 'Like, enjoy', pinyin: 'xǐhuan', cols: ['很喜欢', '不喜欢'], ex: '我非常喜欢学习汉语和中国书法。', exVi: 'Tôi vô cùng thích học tiếng Hán và thư pháp Trung Quốc.', tip: 'Biểu thị sự yêu thích sở thích cá nhân.' },
      { term: '认识', pos: 'v', vi: 'Quen biết, nhận ra', en: 'Know, recognize', pinyin: 'rènshi', cols: ['很高兴认识你', '互相认识'], ex: '认识你我也感到非常高兴。', exVi: 'Quen biết bạn tôi cũng cảm thấy vô cùng vui mừng.', tip: 'Dùng trong câu chào hỏi lần đầu gặp gỡ.' },
      { term: '学习', pos: 'v/n', vi: 'Học tập, rèn luyện', en: 'Study, learn', pinyin: 'xuéxí', cols: ['学习汉语', '努力学习'], ex: '他每天都在图书馆认真学习两个小时。', exVi: 'Cậu ấy ngày nào cũng chăm chỉ học 2 tiếng trong thư viện.', tip: 'Từ cốt lõi cho mọi học viên ngôn ngữ.' },
      { term: '工作', pos: 'v/n', vi: 'Công việc, làm việc', en: 'Work, job', pinyin: 'gōngzuò', cols: ['找工作', '参加工作'], ex: '我的爸爸在市中心的一家大医院工作。', exVi: 'Bố tôi làm việc ở một bệnh viện lớn tại trung tâm thành phố.', tip: 'Vừa là danh từ (việc làm) vừa là động từ.' },
      { term: '家', pos: 'n', vi: 'Nhà, gia đình', en: 'Home, family', pinyin: 'jiā', cols: ['我家', '回家'], ex: '欢迎你周末来我家做客。', exVi: 'Hoan nghênh bạn cuối tuần đến nhà tôi chơi.', tip: 'Bộ Miên (宀 - mái nhà) che chở bên trên.' },
      { term: '高兴', pos: 'adj', vi: 'Vui vẻ, hân hoan', en: 'Happy, glad', pinyin: 'gāoxìng', cols: ['很高兴', '感到高兴'], ex: '听到考试通过的消息，大家都十分高兴。', exVi: 'Nghe tin thi đỗ, mọi người đều hết sức vui mừng.', tip: 'Chữ 高 (cao) + 兴 (hứng khởi).' },
      { term: '今天', pos: 'n', vi: 'Hôm nay', en: 'Today', pinyin: 'jīntiān', cols: ['今天天气', '从今天起'], ex: '今天天气晴朗，我们一起去公园散步吧。', exVi: 'Hôm nay trời nắng đẹp, chúng mình cùng đi dạo công viên nhé.', tip: 'Từ chỉ thời gian đứng trước hoặc sau chủ ngữ.' },
      { term: '明天', pos: 'n', vi: 'Ngày mai', en: 'Tomorrow', pinyin: 'míngtiān', cols: ['明天见', '明天上午'], ex: '明天上午我们班有一堂汉语口语课。', exVi: 'Sáng mai lớp chúng tôi có một tiết học khẩu ngữ tiếng Hán.', tip: 'Chữ 明 gồm bộ Nhật (日) và Nguyệt (月).' },
      { term: '吃', pos: 'v', vi: 'Ăn', en: 'Eat', pinyin: 'chī', cols: ['吃饭', '吃苹果'], ex: '中午你想和我们一起去食堂吃饭吗？', exVi: 'Buổi trưa bạn có muốn cùng chúng tôi đến nhà ăn dùng bữa không?', tip: 'Có bộ Khẩu (口) ở bên trái chỉ hành động miệng.' },
      { term: '喝', pos: 'v', vi: 'Uống', en: 'Drink', pinyin: 'hē', cols: ['喝茶', '喝水'], ex: '请坐，请喝一杯热绿茶。', exVi: 'Xin mời ngồi, xin mời dùng một tách trà xanh nóng.', tip: 'Đi với các loại đồ uống: 喝水, 喝咖啡.' },
      { term: '多少', pos: 'pron', vi: 'Bao nhiêu', en: 'How many, how much', pinyin: 'duōshao', cols: ['多少钱', '多少个'], ex: '请问这本中文词典一共多少钱？', exVi: 'Xin hỏi cuốn từ điển tiếng Trung này giá bao nhiêu tiền?', tip: 'Dùng hỏi số lượng trên 10 hoặc hỏi giá cả.' },
      { term: '中国', pos: 'proper n', vi: 'Trung Quốc', en: 'China', pinyin: 'Zhōngguó', cols: ['去中国', '中国文化'], ex: '许多外国留学生来到中国学习汉语。', exVi: 'Rất nhiều du học sinh nước ngoài đến Trung Quốc học tiếng Hán.', tip: 'Danh từ riêng luôn viết hoa chữ cái đầu.' },
      { term: '大', pos: 'adj', vi: 'To, lớn', en: 'Big, large', pinyin: 'dà', cols: ['很大', '大声'], ex: '北京是一座历史悠久的大城市。', exVi: 'Bắc Kinh là một thành phố lớn có lịch sử lâu đời.', tip: 'Hình người dang rộng hai tay hai chân.' },
      { term: '老师', pos: 'n', vi: 'Thầy giáo, cô giáo', en: 'Teacher', pinyin: 'lǎoshī', cols: ['汉语老师', '王老师'], ex: '李老师对待每一位学生都非常有耐心。', exVi: 'Thầy Lý đối với mỗi một học sinh đều vô cùng kiên nhẫn.', tip: 'Danh xưng tôn kính trong văn hóa Á Đông.' }
    ]
  },

  // POOL 2: HSK 2 Daily Life & Shopping
  {
    title: 'HSK 2: Daily Life, Shopping & Movement',
    titleVi: 'HSK 2: Đời Sống, Mua Sắm, Thời Gian & Di Chuyển',
    descVi: 'Nắm chắc 18 từ vựng HSK 2 thiết yếu về mua sắm đồ đạc, phương tiện đi lại, sức khỏe và đời sống hằng ngày.',
    level: 'HSK 2',
    words: [
      { term: '商店', pos: 'n', vi: 'Cửa hàng, tiệm buôn', en: 'Store, shop', pinyin: 'shāngdiàn', cols: ['去商店', '商店买东西'], ex: '学校门外有一家卖文具的小商店。', exVi: 'Bên ngoài cổng trường có một cửa hàng nhỏ bán đồ dùng học tập.', tip: 'Từ cơ bản chỉ nơi mua sắm.' },
      { term: '便宜', pos: 'adj', vi: 'Rẻ, giá cả phải chăng', en: 'Cheap, inexpensive', pinyin: 'piányi', cols: ['很便宜', '便宜一点儿'], ex: '这家超市的水果不仅新鲜而且很便宜。', exVi: 'Trái cây ở siêu thị này không những tươi mà còn rất rẻ.', tip: 'Trái nghĩa với 贵 (guì - đắt).' },
      { term: '衣服', pos: 'n', vi: 'Quần áo, y phục', en: 'Clothes, garment', pinyin: 'yīfu', cols: ['穿衣服', '买新衣服'], ex: '冬天到了，出门前记得多穿两件厚衣服。', exVi: 'Mùa đông đến rồi, trước khi ra ngoài nhớ mặc thêm áo ấm.', tip: 'Lượng từ đi kèm là 件 (jiàn).' },
      { term: '准备', pos: 'v', vi: 'Chuẩn bị, trù bị', en: 'Prepare, get ready', pinyin: 'zhǔnbèi', cols: ['准备考试', '准备好'], ex: '同学们正在全力准备即将到来的汉语考试。', exVi: 'Các bạn học sinh đang dốc sức chuẩn bị cho kỳ thi tiếng Hán sắp tới.', tip: 'Vừa chỉ hành động cụ thể vừa chỉ kế hoạch dự định.' },
      { term: '运动', pos: 'v/n', vi: 'Vận động, thể dục thể thao', en: 'Exercise, sports', pinyin: 'yùndòng', cols: ['做运动', '喜欢运动'], ex: '每天坚持运动半小时能让身体更加健康。', exVi: 'Hằng ngày kiên trì vận động nửa tiếng giúp cơ thể khỏe mạnh hơn.', tip: 'Chủ đề sức khỏe thể chất.' },
      { term: '跑步', pos: 'v phrase', vi: 'Chạy bộ', en: 'Run, jog', pinyin: 'pǎobù', cols: ['去跑步', '跑步锻炼'], ex: '早晨空气新鲜，很多老人在操场上跑步。', exVi: 'Sáng sớm không khí trong lành, rất nhiều người già chạy bộ trên sân tập.', tip: 'Từ ly hợp (跑 + 步).' },
      { term: '身体', pos: 'n', vi: 'Thân thể, sức khỏe', en: 'Body, health', pinyin: 'shēntǐ', cols: ['身体好', '身体健康'], ex: '工作再忙也要照顾好自己的身体。', exVi: 'Công việc dù bận rộn cũng phải chăm sóc tốt sức khỏe của bản thân.', tip: 'Thường dùng trong lời chúc: 祝您身体健康.' },
      { term: '帮助', pos: 'v/n', vi: 'Giúp đỡ, tương trợ', en: 'Help, assist', pinyin: 'bāngzhù', cols: ['互相帮助', '得到帮助'], ex: '朋友之间应当在遇到困难时互相帮助。', exVi: 'Giữa bạn bè nên giúp đỡ lẫn nhau khi gặp khó khăn.', tip: 'Vừa là động từ vừa là danh từ.' },
      { term: '懂', pos: 'v', vi: 'Hiểu, thông suốt', en: 'Understand, know', pinyin: 'dǒng', cols: ['听懂了', '懂礼貌'], ex: '老师讲得非常明白，全班同学都听懂了。', exVi: 'Thầy giáo giảng rất rõ ràng, học sinh cả lớp đều đã nghe hiểu.', tip: 'Thường làm bổ ngữ kết quả: 听懂, 看懂.' },
      { term: '旅游', pos: 'v/n', vi: 'Du lịch, đi tham quan', en: 'Travel, tour', pinyin: 'lǚyóu', cols: ['去旅游', '旅游景点'], ex: '今年暑假我计划和全家人一起去北京旅游。', exVi: 'Kỳ nghỉ hè năm nay tôi dự định cùng cả nhà đi du lịch Bắc Kinh.', tip: 'Chủ đề giải trí văn hóa thường gặp.' },
      { term: '问题', pos: 'n', vi: 'Vấn đề, câu hỏi thắc mắc', en: 'Question, problem', pinyin: 'wèntí', cols: ['回答问题', '没问题'], ex: '如果你在学习中遇到不懂的问题，随时可以问我。', exVi: 'Nếu bạn gặp câu hỏi không hiểu trong học tập, bất cứ lúc nào cũng có thể hỏi tôi.', tip: 'Khẩu ngữ: 没问题 (không thành vấn đề).' },
      { term: '欢迎', pos: 'v', vi: 'Hoan nghênh, nhiệt liệt chào đón', en: 'Welcome', pinyin: 'huānyíng', cols: ['热烈欢迎', '欢迎光临'], ex: '我们热烈欢迎各位新同学加入这个大家庭。', exVi: 'Chúng tôi nhiệt liệt hoan nghênh các bạn học sinh mới gia nhập đại gia đình này.', tip: 'Thường gặp ở cửa tiệm: 欢迎光临.' },
      { term: '服务', pos: 'v/n', vi: 'Phục vụ, dịch vụ', en: 'Serve, service', pinyin: 'fúwù', cols: ['服务员', '服务态度'], ex: '这家酒店的服务员态度非常亲切和蔼。', exVi: 'Nhân viên phục vụ của khách sạn này thái độ rất ân cần hòa nhã.', tip: 'Từ phái sinh: 服务员 (nhân viên phục vụ).' },
      { term: '找', pos: 'v', vi: 'Tìm kiếm / Thối lại tiền', en: 'Find, seek / give change', pinyin: 'zhǎo', cols: ['找工作', '找钱'], ex: '我找了半天也没找到自己的钥匙。', exVi: 'Tôi tìm nửa ngày trời cũng chưa thấy chìa khóa của mình.', tip: 'Có hai nghĩa: tìm đồ và thối tiền thừa.' },
      { term: '希望', pos: 'v/n', vi: 'Hy vọng, kỳ vọng', en: 'Hope, wish', pinyin: 'xīwàng', cols: ['充满希望', '希望你成功'], ex: '老师希望每一个学生都能实现自己的理想。', exVi: 'Thầy cô hy vọng mỗi một học trò đều có thể thực hiện được lý tưởng của mình.', tip: 'Bày tỏ mong muốn tích cực.' },
      { term: '回答', pos: 'v/n', vi: 'Trả lời, giải đáp', en: 'Answer, reply', pinyin: 'huídá', cols: ['回答清楚', '回答问题'], ex: '听到提问后，他毫不犹豫地做出了准确回答。', exVi: 'Sau khi nghe câu hỏi, cậu ấy không do dự đưa ra câu trả lời chuẩn xác.', tip: 'Trái nghĩa với 提问 (đặt câu hỏi).' },
      { term: '离', pos: 'prep', vi: 'Cách (khoảng cách không gian/thời gian)', en: 'Away from', pinyin: 'lí', cols: ['离学校很近', '离我家不远'], ex: '我家离地铁站很近，走五分钟就到了。', exVi: 'Nhà tôi cách ga tàu điện ngầm rất gần, đi bộ 5 phút là tới.', tip: 'Cấu trúc: A 离 B + tính từ khoảng cách.' },
      { term: '远', pos: 'adj', vi: 'Xa, cách xa', en: 'Far, distant', pinyin: 'yuǎn', cols: ['很远', '不算太远'], ex: '虽然路途遥远，但他依然坚持每天准时上课。', exVi: 'Tuy đường sá xa xôi, cậu ấy vẫn kiên trì đi học đúng giờ mỗi ngày.', tip: 'Trái nghĩa với 近 (jìn - gần).' }
    ]
  },

  // POOL 3: HSK 3-4 Daily Life & Communication
  {
    title: 'HSK 3-4 Daily Life & Communication',
    titleVi: 'HSK 3: Giao Tiếp, Tình Cảm & Thói Quen Thường Ngày',
    descVi: 'Nắm vững từ vựng HSK 3 cốt lõi trong hội thoại, tính cách, cảm xúc và quan hệ xã hội.',
    level: 'HSK 3',
    words: [
      { term: '热情', pos: 'adj', vi: 'Nhiệt tình, hiếu khách', en: 'Enthusiastic, warm-hearted', pinyin: 'rèqíng', cols: ['热情好客', '态度热情'], ex: '李阿姨对邻居总是十分热情。', exVi: 'Dì Lý đối với hàng xóm lúc nào cũng hết sức nhiệt tình.', tip: 'Miêu tả tính cách con người trong tranh vẽ HSK.' },
      { term: '耐心', pos: 'adj/n', vi: 'Kiên nhẫn, lòng kiên nhẫn', en: 'Patient; patience', pinyin: 'nàixīn', cols: ['有耐心', '耐心解释'], ex: '医生耐心地听取病人的述说。', exVi: 'Bác sĩ kiên nhẫn lắng nghe lời thuật lại của bệnh nhân.', tip: 'Rất hay gặp trong bài đọc hiểu HSK.' },
      { term: '诚实', pos: 'adj', vi: 'Thành thật, trung thực', en: 'Honest, truthful', pinyin: 'chéngshí', cols: ['诚实守信', '做人诚实'], ex: '诚实是维持长久友谊的基石。', exVi: 'Trung thực là nền tảng để duy trì tình bạn lâu dài.', tip: 'Phẩm chất đạo đức tích cực.' },
      { term: '幽默', pos: 'adj', vi: 'Hài hước, hóm hỉnh', en: 'Humorous', pinyin: 'yōumò', cols: ['幽默感', '语言幽默'], ex: '他说话幽默，大家都很喜欢和他聊天。', exVi: 'Anh ấy nói chuyện hài hước, ai cũng thích trò chuyện cùng anh.', tip: 'Dùng khi nói về tính cách hòa đồng.' },
      { term: '马虎', pos: 'adj', vi: 'Cẩu thả, đoảng, bất cẩn', en: 'Careless, sloppy', pinyin: 'mǎhu', cols: ['做事马虎', '马马虎虎'], ex: '填写表格时千万不能马虎。', exVi: 'Khi điền biểu mẫu tuyệt đối không được cẩu thả.', tip: 'Từ trái nghĩa với "认真".' },
      { term: '积极', pos: 'adj', vi: 'Tích cực, chủ động', en: 'Active, positive', pinyin: 'jījí', cols: ['积极参与', '积极态度'], ex: '同学们积极参加学校组织的环保公益活动。', exVi: 'Các bạn học sinh tích cực tham gia hoạt động công ích môi trường.', tip: 'Đi với động từ tham gia hoạt động.' },
      { term: '害羞', pos: 'adj', vi: 'Xấu hổ, e thẹn', en: 'Shy, timid', pinyin: 'hàixiū', cols: ['感到害羞', '害羞地笑了'], ex: '那个小姑娘一说话就容易害羞。', exVi: 'Cô bé ấy hễ nói chuyện là dễ xấu hổ.', tip: 'Miêu tả tâm trạng người trẻ tuổi.' },
      { term: '怀疑', pos: 'v/n', vi: 'Hoài nghi, nghi ngờ', en: 'Doubt, suspect', pinyin: 'huáiyí', cols: ['毫无怀疑', '表示怀疑'], ex: '没有调查研究，就不能随便怀疑别人。', exVi: 'Chưa điều tra nghiên cứu thì không thể tùy tiện nghi ngờ người khác.', tip: 'Từ vựng tâm lý thường gặp.' },
      { term: '同情', pos: 'v/n', vi: 'Đồng cảm, cảm thương', en: 'Sympathize; sympathy', pinyin: 'tóngqíng', cols: ['同情心', '值得同情'], ex: '全社会都应该同情和帮助弱势群体。', exVi: 'Toàn xã hội đều nên cảm thông và giúp đỡ người yếu thế.', tip: 'Thường xuất hiện trong văn nghị luận nhân văn.' },
      { term: '羡慕', pos: 'v', vi: 'Ngưỡng mộ (tích cực)', en: 'Admire, envy warmly', pinyin: 'xiànmù', cols: ['令人羡慕', '羡慕不已'], ex: '我很羡慕他能够自由自在地环游世界。', exVi: 'Tôi rất ngưỡng mộ anh ấy có thể tự do tự tại chu du thế giới.', tip: 'Phân biệt với ghen tị xấu (嫉妒).' },
      { term: '尊重', pos: 'v/n', vi: 'Tôn trọng, kính trọng', en: 'Respect', pinyin: 'zūnzhòng', cols: ['互相尊重', '尊重选择'], ex: '我们要学会尊重不同国家的文化风俗。', exVi: 'Chúng ta phải học cách tôn trọng phong tục văn hóa của các nước khác nhau.', tip: 'Chủ đề giao lưu quốc tế.' },
      { term: '礼貌', pos: 'adj/n', vi: 'Lịch sự, lễ phép', en: 'Polite; manners', pinyin: 'lǐmào', cols: ['讲礼貌', '有礼貌'], ex: '文明礼貌体现了一个人的家庭修养。', exVi: 'Văn minh lịch sự thể hiện sự giáo dục gia đình của một người.', tip: 'Đi với cấu trúc "对...很有礼貌".' },
      { term: '感动', pos: 'v/adj', vi: 'Xúc động, cảm động', en: 'Moved, touched', pinyin: 'gǎndòng', cols: ['令人感动', '深感感动'], ex: '老师无私的关爱深深地感动了我。', exVi: 'Tình yêu thương vô tư của thầy cô đã làm tôi cảm động sâu sắc.', tip: 'Dùng viết đoạn văn kể chuyện.' },
      { term: '脾气', pos: 'n', vi: 'Tính khí, tâm tính', en: 'Temper', pinyin: 'píqi', cols: ['发脾气', '好脾气'], ex: '遇到烦心事不要随意对家人发脾气。', exVi: 'Gặp chuyện bực mình chớ có tùy tiện nổi cáu với người nhà.', tip: 'Cụm cố định: 发脾气 (nổi nóng).' },
      { term: '亲切', pos: 'adj', vi: 'Ân cần, thân thiết', en: 'Warm, cordial', pinyin: 'qīnqiè', cols: ['态度亲切', '亲切问候'], ex: '校长亲切地与即将毕业的同学握手告别。', exVi: 'Hiệu trưởng ân cần bắt tay từ biệt các bạn học sinh sắp tốt nghiệp.', tip: 'Miêu tả cử chỉ ấm áp.' },
      { term: '安慰', pos: 'v/n', vi: 'An ủi, dỗ dành', en: 'Comfort, console', pinyin: 'ānwèi', cols: ['安慰朋友', '感到安慰'], ex: '母亲轻声安慰因考试失利而落泪的儿子。', exVi: 'Người mẹ nhỏ nhẹ an ủi đứa con rơi lệ vì thi trượt.', tip: 'Chủ đề tình cảm gia đình.' },
      { term: '理解', pos: 'v/n', vi: 'Thấu hiểu, thông cảm', en: 'Understand, comprehend', pinyin: 'lǐjiě', cols: ['互相理解', '加深理解'], ex: '多站在对方的角度思考，才能真正理解他人。', exVi: 'Đặt mình vào góc nhìn của đối phương mới thật sự hiểu được người khác.', tip: 'Từ khóa then chốt giải quyết mâu thuẫn.' },
      { term: '骄傲', pos: 'adj', vi: 'Tự hào / Kiêu ngạo', en: 'Proud; arrogant', pinyin: 'jiāo\'ào', cols: ['感到骄傲', '戒骄戒躁'], ex: '中国航天事业的飞速发展令全体国人感到无比骄傲。', exVi: 'Sự phát triển vượt bậc của hàng không vũ trụ Trung Quốc khiến quốc dân tự hào.', tip: 'Chú ý hai tầng nghĩa tích cực và tiêu cực.' }
    ]
  },

  // POOL 4: HSK 4 Workplace, Recruitment & Commerce
  {
    title: 'HSK 4: Workplace, Recruitment & Commerce',
    titleVi: 'HSK 4: Công Sở, Phỏng Vấn, Đàm Phán & Thương Mại',
    descVi: '18 từ vựng HSK 4 chuyên sâu về phỏng vấn tuyển dụng, quản lý hợp đồng, tiếp thị và sự nghiệp.',
    level: 'HSK 4',
    words: [
      { term: '应聘', pos: 'v', vi: 'Ứng tuyển, nộp hồ sơ xin việc', en: 'Apply for a job', pinyin: 'yìngpìn', cols: ['应聘职位', '前来应聘'], ex: '数百名大学毕业生前来应聘这家跨国企业。', exVi: 'Hàng trăm sinh viên đại học tốt nghiệp đến ứng tuyển vào doanh nghiệp đa quốc gia này.', tip: 'Từ vựng cốt lõi phần tuyển dụng.' },
      { term: '简历', pos: 'n', vi: 'Sơ yếu lý lịch, CV', en: 'Resume, CV', pinyin: 'jiǎnlì', cols: ['投递简历', '修改简历'], ex: '求职者应当在简历中突出自己的专业技能。', exVi: 'Người tìm việc nên làm nổi bật kỹ năng chuyên môn trong CV.', tip: 'Đi với động từ 投递 (nộp).' },
      { term: '优势', pos: 'n', vi: 'Thế mạnh, ưu thế cạnh tranh', en: 'Advantage, superiority', pinyin: 'yōushì', cols: ['竞争优势', '占据优势'], ex: '精通多门外语是他在跨国求职中的核心优势。', exVi: 'Thành thạo nhiều ngoại ngữ là ưu thế cốt lõi của anh ấy khi xin việc.', tip: 'Từ quan trọng trong phân tích năng lực.' },
      { term: '具备', pos: 'v', vi: 'Trang bị đủ, sở hữu đầy đủ', en: 'Possess, be equipped with', pinyin: 'jùbèi', cols: ['具备条件', '具备能力'], ex: '优秀的管理者必须具备出色的沟通协调能力。', exVi: 'Người quản lý xuất sắc bắt buộc phải sở hữu năng lực giao tiếp điều phối tốt.', tip: 'Dùng trước các danh từ năng lực, điều kiện.' },
      { term: '效率', pos: 'n', vi: 'Hiệu suất, năng suất làm việc', en: 'Efficiency', pinyin: 'xiàolǜ', cols: ['提高效率', '工作效率'], ex: '科学的时间管理能够成倍提高团队的工作效率。', exVi: 'Quản lý thời gian khoa học có thể tăng gấp bội hiệu suất làm việc nhóm.', tip: 'Luôn đi cùng "提高效率" (nâng cao hiệu suất).' },
      { term: '谈判', pos: 'v/n', vi: 'Đàm phán, thương lượng', en: 'Negotiate; negotiation', pinyin: 'tánpàn', cols: ['商务谈判', '艰苦谈判'], ex: '经过三轮艰苦谈判，双方最终达成了合作共识。', exVi: 'Trải qua 3 vòng đàm phán gian khổ, đôi bên cuối cùng đã đạt được nhận thức chung hợp tác.', tip: 'Chủ đề thương mại kinh doanh.' },
      { term: '协议', pos: 'n', vi: 'Thỏa thuận, hiệp ước ký kết', en: 'Agreement, pact', pinyin: 'xiéyì', cols: ['签署协议', '达成协议'], ex: '两国代表在人民大会堂签署了经贸合作协议。', exVi: 'Đại diện hai nước đã ký kết thỏa thuận hợp tác kinh tế tại Đại lễ đường.', tip: 'Đi với 签署协议 (ký thỏa thuận).' },
      { term: '投资', pos: 'v/n', vi: 'Đầu tư vốn', en: 'Invest; investment', pinyin: 'tóuzī', cols: ['投资项目', '吸引投资'], ex: '政府出台优惠政策以吸引更多外资高科技企业。', exVi: 'Chính phủ ban hành chính sách ưu đãi nhằm thu hút thêm doanh nghiệp công nghệ đầu tư.', tip: 'Chủ đề tài chính kinh tế.' },
      { term: '利润', pos: 'n', vi: 'Lợi nhuận kinh doanh', en: 'Profit', pinyin: 'lìrùn', cols: ['获取利润', '净利润'], ex: '企业在追求合理利润的同时应当承担社会责任。', exVi: 'Doanh nghiệp khi theo đuổi lợi nhuận hợp lý phải gánh vác trách nhiệm xã hội.', tip: 'Thường xuất hiện trong bài đọc hiểu kinh doanh.' },
      { term: '风险', pos: 'n', vi: 'Rủi ro, mạo hiểm', en: 'Risk, hazard', pinyin: 'fēngxiǎn', cols: ['规避风险', '承担风险'], ex: '投资往往伴随着风险，必须做好风险防控预案。', exVi: 'Đầu tư luôn đi kèm với rủi ro, bắt buộc phải làm tốt phương án phòng ngừa.', tip: 'Đi cùng 降低风险 (hạ rủi ro).' },
      { term: '核心', pos: 'n/adj', vi: 'Cốt lõi, trọng tâm', en: 'Core, nucleus', pinyin: 'héxīn', cols: ['核心竞争力', '核心价值'], ex: '自主创新技术是高新制造企业的核心生命力。', exVi: 'Công nghệ đổi mới tự chủ là sức sống cốt lõi của doanh nghiệp chế tạo.', tip: 'Cụm nổi tiếng: 核心竞争力.' },
      { term: '克服', pos: 'v', vi: 'Khắc phục khó khăn', en: 'Overcome, conquer', pinyin: 'kèfú', cols: ['克服困难', '克服缺点'], ex: '只要坚定信心，我们完全有能力克服眼前的阻碍。', exVi: 'Chỉ cần giữ vững niềm tin, chúng ta hoàn toàn có năng lực khắc phục trở ngại trước mắt.', tip: 'Luôn kết hợp với 克服困难.' },
      { term: '珍惜', pos: 'v', vi: 'Trân quý, biết nâng niu', en: 'Cherish, treasure', pinyin: 'zhēnxī', cols: ['珍惜时间', '珍惜机会'], ex: '我们要珍惜当下和平美好的学习生活环境。', exVi: 'Chúng ta phải biết trân quý môi trường sống và học tập hòa bình tốt đẹp hiện tại.', tip: 'Dùng cho lời khuyên răn quý trọng thời gian.' },
      { term: '安排', pos: 'v/n', vi: 'Sắp xếp, bố trí lịch trình', en: 'Arrange; schedule', pinyin: 'ānpái', cols: ['合理安排', '听从安排'], ex: '合理安排每日工作计划能够防止临阵手忙脚乱。', exVi: 'Bố trí hợp lý kế hoạch làm việc hằng ngày có thể phòng ngừa luống cuống.', tip: 'Từ vựng công sở thông dụng nhất.' },
      { term: '总结', pos: 'v/n', vi: 'Tổng kết, đúc kết kinh nghiệm', en: 'Summarize; summary', pinyin: 'zǒngjié', cols: ['总结经验', '年终总结'], ex: '定期总结复盘是个人能力飞速成长的秘密武器。', exVi: 'Định kỳ tổng kết đánh giá lại là vũ khí bí mật giúp năng lực cá nhân tiến bộ vượt bậc.', tip: 'Thường xuất hiện trong phần viết HSK.' },
      { term: '推迟', pos: 'v', vi: 'Hoãn lại, dời lịch lại sau', en: 'Postpone, delay', pinyin: 'tuīchí', cols: ['推迟举行', '推迟会议'], ex: '由于极端暴雨天气，原定的露天展览不得不推迟举办。', exVi: 'Do thời tiết mưa bão cực đoan, triển lãm ngoài trời buộc phải hoãn tổ chức.', tip: 'Trái nghĩa với 提前 (làm trước).' },
      { term: '合格', pos: 'adj', vi: 'Đạt chuẩn, hợp quy cách', en: 'Qualified, up to standard', pinyin: 'hégé', cols: ['质量合格', '合格产品'], ex: '未经质检合格的商品严禁流入消费市场。', exVi: 'Hàng hóa chưa qua kiểm định đạt chuẩn nghiêm cấm lưu thông ra thị trường.', tip: 'Dùng trong sản xuất và thi cử.' },
      { term: '成就', pos: 'n/v', vi: 'Thành tựu to lớn; tác thành', en: 'Achievement, accomplishment', pinyin: 'chéngjiù', cols: ['取得成就', '伟大成就'], ex: '中国在脱贫攻坚战中取得了举世瞩目的非凡成就。', exVi: 'Trung Quốc trong cuộc chiến xóa đói giảm nghèo đã đạt được thành tựu phi thường khiến thế giới chú ý.', tip: 'Từ vựng trang trọng tôn vinh thành quả.' }
    ]
  },

  // POOL 5: HSK 5 Social Discussion & Academic Reasoning
  {
    title: 'HSK 5: Social Topics, Debate & Reasoning',
    titleVi: 'HSK 5: Thảo Luận Xã Hội, Tranh Luận & Tư Duy Học Thuật',
    descVi: 'Nắm chắc 18 từ vựng HSK 5 mấu chốt để phân tích các vấn đề xã hội, viết luận văn và diễn giải quan điểm logic.',
    level: 'HSK 5',
    words: [
      { term: '辩论', pos: 'v/n', vi: 'Biện luận, tranh luận học thuật', en: 'Debate, argue rationally', pinyin: 'biànlùn', cols: ['激烈辩论', '辩论赛'], ex: '双方辩手就人工智能利弊展开了极为激烈的辩论。', exVi: 'Người tranh biện hai bên đã mở màn cuộc tranh luận vô cùng nảy lửa về lợi và hại của AI.', tip: 'Từ vựng then chốt trong văn nghị luận.' },
      { term: '措施', pos: 'n', vi: 'Biện pháp, giải pháp chính sách', en: 'Measure, policy step', pinyin: 'cuòshī', cols: ['采取有效措施', '安全措施'], ex: '市政府采取了一系列坚决措施治理城市空气污染。', exVi: 'Chính quyền thành phố đã áp dụng một loạt biện pháp kiên quyết để xử lý ô nhiễm không khí.', tip: 'Luôn đi cùng "采取措施" (áp dụng biện pháp).' },
      { term: '趋势', pos: 'n', vi: 'Xu thế, chiều hướng phát triển', en: 'Trend, tendency', pinyin: 'qūshì', cols: ['发展趋势', '必然趋势'], ex: '绿色低碳出行已成为全球未来城市发展的必然趋势。', exVi: 'Di chuyển xanh phát thải thấp đã trở thành xu thế tất yếu của phát triển đô thị toàn cầu.', tip: 'Dùng khi phân tích xu hướng tương lai.' },
      { term: '深刻', pos: 'adj', vi: 'Sâu sắc, thâm thúy', en: 'Deep, profound', pinyin: 'shēnkè', cols: ['深刻印象', '深刻理解'], ex: '这次跨国文化交流给他的人生留下了极为深刻的印记。', exVi: 'Chuyến giao lưu văn hóa quốc tế này đã để lại dấu ấn vô cùng sâu sắc trong cuộc đời anh ấy.', tip: 'Từ nâng cấp thay cho "很深".' },
      { term: '面临', pos: 'v', vi: 'Đối mặt, đứng trước thử thách', en: 'Be faced with, confront', pinyin: 'miànlín', cols: ['面临挑战', '面临抉择'], ex: '传统实体书店正在面临数字化浪潮带来的严峻考验。', exVi: 'Hiệu sách truyền thống đang đối mặt với thử thách nghiêm ngặt do làn sóng số hóa mang lại.', tip: 'Đi với "面临困难 / 面临挑战".' },
      { term: '政策', pos: 'n', vi: 'Chính sách nhà nước, đường lối', en: 'Policy, guideline', pinyin: 'zhèngcè', cols: ['优惠政策', '出台新政策'], ex: '国家出台了多项鼓励青年回乡创业的扶持政策。', exVi: 'Nhà nước đã ban hành nhiều chính sách hỗ trợ khuyến khích thanh niên về quê khởi nghiệp.', tip: 'Chủ đề quản lý nhà nước.' },
      { term: '促进', pos: 'v', vi: 'Thúc đẩy, xúc tiến phát triển', en: 'Promote, advance, boost', pinyin: 'cùjìn', cols: ['促进经济增长', '促进文化交流'], ex: '国际学术会议极大促进了各国青年学者之间的前沿合作。', exVi: 'Hội nghị học thuật quốc tế thúc đẩy to lớn sự hợp tác tiên phong giữa các học giả trẻ.', tip: 'Động từ quan hệ nguyên nhân kết quả tích cực.' },
      { term: '结构', pos: 'n', vi: 'Kết cấu, cơ cấu tổ chức', en: 'Structure, composition', pinyin: 'jiégòu', cols: ['经济结构', '优化结构'], ex: '优化产业结构是提升国家经济抗风险能力的关键。', exVi: 'Tối ưu cơ cấu ngành nghề là chìa khóa nâng cao năng lực chống chịu rủi ro kinh tế.', tip: 'Thuật ngữ học thuật phân tích hệ thống.' },
      { term: '体现', pos: 'v', vi: 'Thể hiện, phản ánh rõ nét', en: 'Embody, reflect, manifest', pinyin: 'tǐxiàn', cols: ['充分体现', '体现价值'], ex: '这些细致入微的关怀举措充分体现了以人为本的理念。', exVi: 'Những biện pháp quan tâm tỉ mỉ này thể hiện rõ nét triết lý lấy con người làm gốc.', tip: 'Dùng khẳng định ý nghĩa biểu징.' },
      { term: '观念', pos: 'n', vi: 'Quan niệm, tư tưởng nhận thức', en: 'Concept, notion, mindset', pinyin: 'guānniàn', cols: ['传统观念', '更新消费观念'], ex: '随着社会进步，公众的环保观念和消费理念发生了深刻改变。', exVi: 'Cùng với sự tiến bộ của xã hội, quan niệm môi trường và tiêu dùng của công chúng đã thay đổi sâu sắc.', tip: 'Dùng cho đề tài thay đổi nhận thức.' },
      { term: '比例', pos: 'n', vi: 'Tỷ lệ, tỷ trọng phân bổ', en: 'Proportion, scale, ratio', pinyin: 'bǐlì', cols: ['占很大比例', '失衡比例'], ex: '高等教育中女性研究生的比例在过去十年间稳步提升。', exVi: 'Tỷ lệ nữ nghiên cứu sinh trong giáo dục đại học tăng đều đặn trong 10 năm qua.', tip: 'Cần thiết trong đọc hiểu số liệu.' },
      { term: '协调', pos: 'v/adj', vi: 'Điều phối, phối hợp nhịp nhàng', en: 'Coordinate, harmonize; coordinated', pinyin: 'xiétiáo', cols: ['协调各方利益', '协调发展'], ex: '项目负责人必须善于协调各技术部门之间的进度分工。', exVi: 'Trưởng dự án bắt buộc phải giỏi điều phối tiến độ phân công giữa các bộ phận kỹ thuật.', tip: 'Kỹ năng lãnh đạo và quản lý.' },
      { term: '综合', pos: 'adj/v', vi: 'Tổng hợp, toàn diện đa chiều', en: 'Comprehensive, synthesize', pinyin: 'zōnghé', cols: ['综合素质', '综合考虑'], ex: '高校选拔人才不仅看考试分数，更注重学生的综合素养。', exVi: 'Tuyển chọn nhân tài đại học không chỉ nhìn điểm thi mà chú trọng tố chất toàn diện.', tip: 'Từ vựng đánh giá chuẩn mực HSK 5.' },
      { term: '因素', pos: 'n', vi: 'Nhân tố, yếu tố ảnh hưởng', en: 'Factor, element', pinyin: 'yīnsù', cols: ['决定性因素', '主要因素'], ex: '科学的生活方式是决定个人寿命与健康的核心内在因素。', exVi: 'Lối sống khoa học là nhân tố cốt lõi bên trong quyết định tuổi thọ và sức khỏe.', tip: 'Dùng trong câu phân tích nguyên nhân.' },
      { term: '资源', pos: 'n', vi: 'Tài nguyên, nguồn lực', en: 'Natural or human resources', pinyin: 'zīyuán', cols: ['合理利用资源', '人力资源'], ex: '合理开发利用水能和风能资源是实现可持续发展的基石。', exVi: 'Khai thác sử dụng hợp lý tài nguyên thủy điện và gió là nền tảng phát triển bền vững.', tip: 'Chủ đề sinh thái và kinh tế.' },
      { term: '改善', pos: 'v', vi: 'Cải thiện, làm cho tốt đẹp hơn', en: 'Improve, ameliorate', pinyin: 'gǎishàn', cols: ['改善生活品质', '改善医疗条件'], ex: '基层医疗设施的普及大幅改善了边远山区村民的看病条件。', exVi: 'Phổ cập y tế cơ sở đã cải thiện đáng kể điều kiện khám chữa bệnh của bà con vùng sâu.', tip: 'Động từ chỉ sự thay đổi tích cực.' },
      { term: '建立', pos: 'v', vi: 'Thiết lập, xây dựng nền móng', en: 'Establish, set up, construct', pinyin: 'jiànlì', cols: ['建立深厚友谊', '建立合作机制'], ex: '两所顶尖大学建立了长期的学者互访与学术联合科研机制。', exVi: 'Hai trường đại học hàng đầu đã thiết lập cơ chế hợp tác nghiên cứu và trao đổi học giả dài hạn.', tip: 'Dùng cho các quan hệ đối tác trang trọng.' },
      { term: '逻辑', pos: 'n', vi: 'Tư duy logic, tính mạch lạc', en: 'Logic, reasoned structure', pinyin: 'luóji', cols: ['逻辑严密', '富有逻辑性'], ex: '优秀的学术论文必须立论清晰、论据翔实、逻辑严密。', exVi: 'Bài luận học thuật xuất sắc bắt buộc phải luận điểm rõ ràng, dẫn chứng xác thực, tư duy logic chặt chẽ.', tip: 'Tiêu chuẩn đánh giá bài thi HSK 5 & 6.' }
    ]
  },

  // POOL 6: HSK 6 Classical 成语 Idioms Part 1
  {
    title: 'HSK 6 成语 Classical Idioms Part 1',
    titleVi: 'HSK 6 Tuyển Tập Thành Ngữ 4 Chữ & Điển Tích (Tập 1)',
    descVi: '15 thành ngữ 4 chữ kinh điển xuất hiện nhiều nhất trong phần thi Đọc hiểu và Viết luận HSK 6.',
    level: 'HSK 6',
    words: [
      { term: '坚持不懈', pos: 'idiom', vi: 'Kiên trì bền bỉ không ngừng', en: 'Persevere unremittingly', pinyin: 'jiānchíbùxiè', cols: ['坚持不懈的努力', '坚持不懈地训练'], ex: '科研工作者坚持不懈地攻坚克难，终获重大突破。', exVi: 'Người làm nghiên cứu bền bỉ vượt khó, rốt cuộc thu được đột phá trọng đại.', tip: 'Thành ngữ điểm 10 cho bài viết nghị luận thành công.' },
      { term: '半途而废', pos: 'idiom', vi: 'Bỏ dở nửa chừng', en: 'Give up halfway', pinyin: 'bàntú\'érfèi', cols: ['切忌半途而废', '中途放弃半途而废'], ex: '做事最怕半途而废，只有持之以恒才能到达终点。', exVi: 'Làm việc sợ nhất bỏ dở giữa chừng, chỉ có kiên trì mới đến được đích.', tip: 'Làm phản đề đối lập với 坚持到底.' },
      { term: '自强不息', pos: 'idiom', vi: 'Tự lực tự cường vươn lên', en: 'Constantly strive for self-reliance', pinyin: 'zìqiángbùxī', cols: ['自强不息的精神', '艰苦奋斗自强不息'], ex: '正是自强不息的民族气节引领我们走过坎坷历史。', exVi: 'Chính khí tiết dân tộc tự cường vươn lên đã dẫn lối chúng ta qua thăng trầm lịch sử.', tip: 'Dùng ca ngợi phẩm chất dân tộc.' },
      { term: '全力以赴', pos: 'idiom', vi: 'Dốc toàn tâm toàn lực', en: 'Go all out, spare no effort', pinyin: 'quánlìyǐfù', cols: ['全力以赴争取胜利', '全力以赴投入'], ex: '面临即将到来的高考，学子们都在全力以赴复习迎考。', exVi: 'Trước kỳ thi đại học cận kề, các sĩ tử đều dốc toàn lực ôn luyện.', tip: 'Biểu thị sự nỗ lực 100% công suất.' },
      { term: '持之以恒', pos: 'idiom', vi: 'Bền chí kiên tâm', en: 'Persist with continuous perseverance', pinyin: 'chízhīyǐhéng', cols: ['持之以恒的恒心', '持之以恒的积累'], ex: '读书积累需要持之以恒，一日不可松懈。', exVi: 'Đọc sách tích lũy cần kiên tâm bền chí, một ngày cũng không thể lơ là.', tip: 'Khuyên răn việc học tập hằng ngày.' },
      { term: '脚踏实地', pos: 'idiom', vi: 'Làm việc vững chắc thực tế', en: 'Be grounded, work earnestly', pinyin: 'jiǎotàshídì', cols: ['脚踏实地做事', '脚踏实地走好每一步'], ex: '不慕虚荣，脚踏实地才能成就一番真正的事业。', exVi: 'Không màng hư vinh, bước đi vững chắc mới làm nên sự nghiệp đích thực.', tip: 'Cặp từ đối xứng hoàn hảo với 仰望星空.' },
      { term: '专心致志', pos: 'idiom', vi: 'Toàn tâm toàn ý tập trung', en: 'Wholly absorbed with devotion', pinyin: 'zhuānxīnzhìzhì', cols: ['专心致志地钻研', '专心致志学习'], ex: '他在实验台前专心致志地记录着仪器的细微变化。', exVi: 'Anh ấy toàn tâm toàn ý ghi chép sự biến thiên tinh vi của máy đo.', tip: 'Miêu tả độ tập trung không xao nhãng.' },
      { term: '废寝忘食', pos: 'idiom', vi: 'Quên ăn quên ngủ vì say mê', en: 'Forget sleep and food due to passion', pinyin: 'fèiqǐnwàngshí', cols: ['废寝忘食地奋战', '废寝忘食工作'], ex: '程序员们废寝忘食地修复系统出现的安全漏洞。', exVi: 'Các lập trình viên quên ăn quên ngủ vá lỗ hổng bảo mật của hệ thống.', tip: 'Ca ngợi tấm gương lao động hăng say.' },
      { term: '苦尽甘来', pos: 'idiom', vi: 'Khổ tận cam lai, hết khổ đến sướng', en: 'Sweetness comes after bitterness', pinyin: 'kǔjìngānlái', cols: ['终于苦尽甘来', '迎来苦尽甘来'], ex: '只要挺过这段艰难的岁月，我们定能迎来苦尽甘来的曙光。', exVi: 'Chỉ cần vượt qua năm tháng gian lao này, chúng ta nhất định đón ngày mai tươi sáng.', tip: 'Lời khích lệ giàu tính triết lý.' },
      { term: '精益求精', pos: 'idiom', vi: 'Cầu toàn hoàn mỹ, đã tinh xảo lại muốn tinh xảo hơn', en: 'Strive for continuous perfection', pinyin: 'jīngyìqiújīng', cols: ['精益求精的工匠精神', '对技艺精益求精'], ex: '制造精密钟表需要大师精益求精的手艺。', exVi: 'Chế tác đồng hồ tinh xảo đòi hỏi tay nghề cầu toàn hoàn mỹ của bậc thầy.', tip: 'Thường thi trong chủ đề tinh thần nghệ nhân.' },
      { term: '勇往直前', pos: 'idiom', vi: 'Dũng cảm tiến lên phía trước', en: 'March forward courageously', pinyin: 'yǒngwǎngzhíqián', cols: ['勇往直前的气魄', '不畏艰难勇往直前'], ex: '探索未知领域的先驱者总是不畏艰险、勇往直前。', exVi: 'Những người tiên phong khám phá lĩnh vực chưa biết luôn dũng cảm tiến lên.', tip: 'Tạo khí thế dõng dạc trong kết luận.' },
      { term: '百折不挠', pos: 'idiom', vi: 'Trăm lần gãy không sờn lòng', en: 'Indomitable, unyielding', pinyin: 'bǎizhébùnáo', cols: ['百折不挠的斗志', '百折不挠的精神'], ex: '探险家凭着百折不挠的坚韧毅力，终于成功登顶珠峰。', exVi: 'Nhà thám hiểm nhờ vào nghị lực trăm lần không gục ngã đã chinh phục đỉnh Everest.', tip: 'Khen ngợi tinh thần vượt khó đỉnh cao.' },
      { term: '一举两得', pos: 'idiom', vi: 'Một mũi tên trúng hai đích, một công đôi việc', en: 'Kill two birds with one stone', pinyin: 'yījǔliǎngdé', cols: ['真是一举两得', '收到一举两得的效果'], ex: '利用垃圾焚烧发电既消纳了废物又补充了电网，真是一举两得。', exVi: 'Đốt rác phát điện vừa tiêu hủy phế liệu lại bổ sung điện lưới, thật là một công đôi việc.', tip: 'Thành ngữ dùng cực kỳ phổ biến.' },
      { term: '入乡随俗', pos: 'idiom', vi: 'Nhập gia tùy tục', en: 'When in Rome, do as the Romans do', pinyin: 'rùxiāngsuísú', cols: ['懂得入乡随俗', '学会入乡随俗'], ex: '到少数民族聚居区采风，应当主动入乡随俗、尊重当地禁忌。', exVi: 'Đến vùng đồng bào thiểu số trải nghiệm thực tế, nên chủ động nhập gia tùy tục.', tip: 'Dùng trong bài viết về du lịch và hòa nhập văn hóa.' },
      { term: '亡羊补牢', pos: 'idiom', vi: 'Mất bò mới lo làm chuồng (nhưng biết sửa sai vẫn kịp)', en: 'Better late than never, fix after loss', pinyin: 'wángyángbǔláo', cols: ['亡羊补牢，未为迟也', '采取亡羊补牢之策'], ex: '系统受黑客攻击后立即升级防火墙，亡羊补牢犹未为晚。', exVi: 'Sau khi hệ thống bị hacker tấn công lập tức nâng cấp tường lửa, sửa sai vẫn kịp thời.', tip: 'Điển tích ngụ ngôn quen thuộc trong đề thi.' }
    ]
  },

  // POOL 7: HSK 6 Classical 成语 Idioms Part 2
  {
    title: 'HSK 6 成语 Classical Idioms Part 2',
    titleVi: 'HSK 6 Tuyển Tập Thành Ngữ 4 Chữ & Điển Tích (Tập 2)',
    descVi: '15 thành ngữ 4 chữ mở rộng về trí tuệ xử thế, kiên trì và điển tích ngụ ngôn Trung Hoa.',
    level: 'HSK 6',
    words: [
      { term: '胸有成竹', pos: 'idiom', vi: 'Trong ngực đã có sẵn cây tre (Tự tin nắm chắc phần thắng)', en: 'Have a well-thought-out plan in advance', pinyin: 'xiōngyǒuchéngzhú', cols: ['胸有成竹地应考', '显得胸有成竹'], ex: '经过数月充分准备，他对这次答辩胸有成竹。', exVi: 'Trải qua vài tháng chuẩn bị chu đáo, anh ấy tự tin nắm chắc buổi bảo vệ này.', tip: 'Thành ngữ miêu tả sự tự tin chín chắn.' },
      { term: '画蛇添足', pos: 'idiom', vi: 'Vẽ rắn thêm chân (Làm chuyện thừa thãi hỏng việc)', en: 'Ruin effect by adding what is superfluous', pinyin: 'huàshétiānzú', cols: ['纯属画蛇添足', '切勿画蛇添足'], ex: '这篇短文原本结构严谨，你后加的一段反倒是画蛇添足。', exVi: 'Bài văn ngắn này vốn kết cấu chặt chẽ, đoạn bạn thêm vào sau ngược lại là vẽ rắn thêm chân.', tip: 'Nhắc nhở sự súc tích trong câu văn.' },
      { term: '井底之蛙', pos: 'idiom', vi: 'Ếch ngồi đáy giếng (Tầm nhìn thiển cận)', en: 'A person with very limited outlook', pinyin: 'jǐngdǐzhīwā', cols: ['沦为井底之蛙', '井底之蛙之见'], ex: '闭目塞听只会让人沦为井底之蛙，必须走出国门开阔视野。', exVi: 'Bịt tai bế quan chỉ khiến con người thành ếch ngồi đáy giếng, cần mở rộng tầm mắt.', tip: 'Chỉ trích sự hạn hẹp về tư tưởng.' },
      { term: '对牛弹琴', pos: 'idiom', vi: 'Đàn gảy tai trâu (Nói đạo lý với kẻ không hiểu)', en: 'Cast pearls before swine', pinyin: 'duìniútánqín', cols: ['无异于对牛弹琴', '简直是对牛弹琴'], ex: '跟一个毫无环保意识的人讲生态平衡，简直是对牛弹琴。', exVi: 'Nói cân bằng sinh thái với người không có ý thức môi trường đúng là đàn gảy tai trâu.', tip: 'Thành ngữ khẩu ngữ và văn viết phổ biến.' },
      { term: '塞翁失马', pos: 'idiom', vi: 'Tái ông mất ngựa (Trong họa có phúc, phúc họa khó lường)', en: 'A blessing in disguise', pinyin: 'sàiwēngshīmǎ', cols: ['塞翁失马，焉知非福', '因祸得福塞翁失马'], ex: '这次调职虽然失去了奖金，却结识了良师益友，真可谓塞翁失马。', exVi: 'Đợt điều chuyển này tuy mất tiền thưởng nhưng lại quen thầy tốt bạn hiền, đúng là tái ông mất ngựa.', tip: 'Thành ngữ giàu tính triết lý lạc quan.' },
      { term: '画龙点睛', pos: 'idiom', vi: 'Vẽ rồng điểm mắt (Nét chấm phá xuất thần làm bừng sáng tác phẩm)', en: 'Add the vital finishing touch', pinyin: 'huàlóngdiǎnjīng', cols: ['起到画龙点睛的作用', '画龙点睛之笔'], ex: '结尾这句精炼的总结起到了画龙点睛的作用。', exVi: 'Câu kết luận súc tích cuối bài đã tạo nên nét chấm phá xuất thần làm bừng sáng bài viết.', tip: 'Khen ngợi câu kết bài hay trong văn thi.' },
      { term: '自相矛盾', pos: 'idiom', vi: 'Tự mâu thuẫn (Lời nói việc làm tiền hậu bất nhất)', en: 'Contradict oneself', pinyin: 'zìxiāngmáodùn', cols: ['言行自相矛盾', '陷入自相矛盾'], ex: '他一会儿说没时间，一会儿又在玩手机，真是自相矛盾。', exVi: 'Anh ấy lúc thì bảo không có thời gian, lúc lại chơi điện thoại, thật là tự mâu thuẫn.', tip: 'Chỉ ra sự phi lý trong lập luận.' },
      { term: '守株待兔', pos: 'idiom', vi: 'Ôm cây đợi thỏ (Chờ may mắn không chịu chủ động nỗ lực)', en: 'Wait for windfall without working', pinyin: 'shǒuzhūdàitù', cols: ['不可守株待兔', '守株待兔的心态'], ex: '求职必须主动出击，守株待兔只会错失良机。', exVi: 'Tìm việc phải chủ động xông pha, ôm cây đợi thỏ chỉ làm lỡ mất cơ hội tốt.', tip: 'Phê bình tính ỷ lại thụ động.' },
      { term: '拔苗助长', pos: 'idiom', vi: 'Nhổ mạ giúp lớn (Nóng vội làm hỏng quy luật tự nhiên)', en: 'Spoil things by excessive eagerness', pinyin: 'bámiáozhùzhǎng', cols: ['切忌拔苗助长', '拔苗助长的做法'], ex: '过早强迫幼儿背诵高阶数理公式，往往会拔苗助长、挫伤兴趣。', exVi: 'Bắt trẻ nhỏ học vẹt công thức toán cao cấp quá sớm thường nóng vội hỏng việc, làm thui chột hứng thú.', tip: 'Dùng trong chủ đề giáo dục mầm non.' },
      { term: '杞人忧天', pos: 'idiom', vi: 'Người nước Kỷ lo trời sập (Lo bò trắng răng, lo lắng vô căn cứ)', en: 'Groundless fears and unnecessary anxiety', pinyin: 'qǐrényōutiān', cols: ['纯属杞人忧天', '不必杞人忧天'], ex: '如今的民航安全技术极其成熟，登机前完全不必杞人忧天。', exVi: 'Công nghệ an toàn hàng không ngày nay cực kỳ hoàn thiện, trước khi lên máy bay không cần lo bò trắng răng.', tip: 'Giải tỏa sự lo âu thái quá.' },
      { term: '邯郸学步', pos: 'idiom', vi: 'Học đi ở Hàm Đan (Bắt chước người khác làm mất luôn bản sắc vốn có)', en: 'Imitate others awkwardly and lose original self', pinyin: 'hándānxuébù', cols: ['切勿邯郸学步', '落得邯郸学步的下场'], ex: '企业照搬国外运营模式却不结合本土国情，终将落得邯郸学步的尴尬局面。', exVi: 'Doanh nghiệp bê nguyên mô hình nước ngoài mà không gắn với nội địa sẽ rơi vào cảnh học đi mất bản sắc.', tip: 'Dùng khi bàn về bản sắc độc lập sáng tạo.' },
      { term: '风雨同舟', pos: 'idiom', vi: 'Cùng chung một con thuyền vượt qua mưa gió (Đồng cam cộng khổ)', en: 'Stand together through thick and thin', pinyin: 'fēngyǔtóngzhōu', cols: ['风雨同舟的友谊', '携手风雨同舟'], ex: '两国人民在抗击重大自然灾害中风雨同舟、守望相助。', exVi: 'Nhân dân hai nước trong cuộc chiến chống thiên tai luôn đồng cam cộng khổ, tương thân tương ái.', tip: 'Ca ngợi tình đoàn kết quốc tế.' },
      { term: '见微知著', pos: 'idiom', vi: 'Thấy cái nhỏ mà biết việc lớn (Nhìn một việc biết toàn cục)', en: 'Know the whole by a minor sign', pinyin: 'jiànwēizhīzhù', cols: ['见微知著的洞察力', '善于见微知著'], ex: '高明的战略家总是善于从细微的市场波动中见微知著。', exVi: 'Nhà chiến lược tài ba luôn giỏi quan sát biến động nhỏ để nhìn thấu toàn cục thị trường.', tip: 'Khen ngợi tầm nhìn nhạy bén.' },
      { term: '温故知新', pos: 'idiom', vi: 'Ôn cũ biết mới (Ôn lại kiến thức cũ để ngộ ra tri thức mới)', en: 'Review the past to understand the new', pinyin: 'wēngùzhīxīn', cols: ['温故而知新', '温故知新的道理'], ex: '复习不是简单的重复，而是温故知新的升华过程。', exVi: 'Ôn tập không phải sự lặp lại giản đơn, mà là quá trình ôn cũ biết mới thăng hoa tri thức.', tip: 'Chân lý trong phương pháp học tập.' },
      { term: '水滴石穿', pos: 'idiom', vi: 'Nước chảy đá mòn (Kiên trì bền bỉ ắt thành công)', en: 'Constant dripping wears away the stone', pinyin: 'shuǐdīshíchuān', cols: ['水滴石穿的韧劲', '展现水滴石穿的精神'], ex: '学好一门外语没有捷径，唯有水滴石穿的坚持才能通向流利。', exVi: 'Học giỏi một ngoại ngữ không có đường tắt, chỉ có sự kiên trì nước chảy đá mòn mới đạt tới lưu loát.', tip: 'Khẩu hiệu truyền cảm hứng học ngoại ngữ.' }
    ]
  },

  // POOL 8: HSK 6 Confusing Near-Synonyms (Phân biệt từ cận nghĩa 近义词辨析)
  {
    title: 'HSK 6 近义词辨析 Confusing Synonyms',
    titleVi: 'HSK 6 Phân Biệt Từ Cận Nghĩa & Ngữ Cảnh Chuẩn',
    descVi: 'Chuyên sâu các cặp từ cận nghĩa kinh điển trong phần thi 选词填空 và Sửa câu sai HSK 6.',
    level: 'HSK 6',
    words: [
      { term: '权利', pos: 'n', vi: 'Quyền lợi, quyền hạn công dân', en: 'Rights, legal privileges', pinyin: 'quánlì', cols: ['合法权利', '维护权利'], ex: '宪法庄严赋予每个公民享有受教育的平等权利。', exVi: 'Hiến pháp trao cho mỗi công dân quyền lợi bình đẳng được học hành.', tip: 'Phân biệt với 权力 (Quyền lực nhà nước/chính trị).' },
      { term: '权力', pos: 'n', vi: 'Quyền lực chính trị, quyền cai quản', en: 'Power, authority over others', pinyin: 'quánlì', cols: ['国家权力', '滥用权力'], ex: '公职人员必须依法行使手中的权力，切忌滥用。', exVi: 'Công chức bắt buộc phải thực thi quyền lực trong tay đúng luật, chớ lạm quyền.', tip: 'Phân biệt với 权利 (Quyền lợi cá nhân).' },
      { term: '考查', pos: 'v', vi: 'Khảo tra, kiểm tra đánh giá kiến thức', en: 'Examine, test knowledge', pinyin: 'kǎochá', cols: ['考查能力', '考查重点'], ex: '这张语文期末试卷着重考查学生的阅读理解深度。', exVi: 'Đề thi văn học kỳ này chú trọng khảo tra độ sâu đọc hiểu của học sinh.', tip: 'Phân biệt với 考察 (Khảo sát thực địa, đi điền dã).' },
      { term: '考察', pos: 'v', vi: 'Khảo sát thực địa, điền dã thực tế', en: 'Investigate on site, inspect', pinyin: 'kǎochá', cols: ['实地考察', '考察团'], ex: '专家团队前往长江流域实地考察珍稀江豚的生存环境。', exVi: 'Đội ngũ chuyên gia đến lưu vực sông Trường Giang khảo sát thực địa môi trường cá heo.', tip: 'Đi với 实地考察 (khảo sát thực địa).' },
      { term: '反应', pos: 'n/v', vi: 'Phản ứng sinh hóa, tâm lý tức thì', en: 'Reaction, physiological response', pinyin: 'fǎnyìng', cols: ['不良反应', '化学反应'], ex: '接种疫苗后出现轻微低烧是身体的正常免疫反应。', exVi: 'Sau khi tiêm vaccine sốt nhẹ là phản ứng miễn dịch bình thường của cơ thể.', tip: 'Phân biệt với 反映 (Phản ánh tình hình).' },
      { term: '反映', pos: 'v', vi: 'Phản ánh tình hình, báo cáo lên trên', en: 'Reflect, report upward', pinyin: 'fǎnyìng', cols: ['反映问题', '反映真实面貌'], ex: '市民可以通过市长热线及时反映老旧小区的供暖问题。', exVi: 'Người dân có thể qua đường dây nóng phản ánh vấn đề sưởi ấm khu tập thể cũ.', tip: 'Dùng khi báo cáo hoặc miêu tả hiện thực.' },
      { term: '持续', pos: 'v/adj', vi: 'Kéo dài liên tục không đứt đoạn', en: 'Continue without interruption', pinyin: 'chíxù', cols: ['持续增长', '持续高温'], ex: '受副热带高压影响，南方各省持续出现高温干旱天气。', exVi: 'Do ảnh hưởng của áp cao cận nhiệt đới, các tỉnh miền Nam liên tục chịu nắng nóng.', tip: 'Phân biệt với 继续 (Tiếp tục sau khi tạm dừng).' },
      { term: '继续', pos: 'v', vi: 'Tiếp tục thực hiện (sau khi ngắt quãng)', en: 'Resume, go on with', pinyin: 'jìxù', cols: ['继续努力', '继续开会'], ex: '中场休息十分钟后，下半场篮球比赛继续进行。', exVi: 'Sau 10 phút nghỉ giữa hiệp, hiệp 2 trận bóng rổ tiếp tục diễn ra.', tip: 'Phân biệt với 持续 (kéo dài không ngừng).' },
      { term: '克服', pos: 'v', vi: 'Khắc phục khó khăn ngoại cảnh', en: 'Overcome external obstacles', pinyin: 'kèfú', cols: ['克服困难', '克服阻力'], ex: '工程建设者克服高寒缺氧的极限环境，建成了高原铁路。', exVi: 'Những người thợ vượt qua môi trường rét buốt thiếu oxy để hoàn thành đường sắt cao nguyên.', tip: 'Phân biệt với 克制 (Kiềm chế nội tâm).' },
      { term: '克制', pos: 'v', vi: 'Kiềm chế, tự chủ cảm xúc bản thân', en: 'Restrain internal impulses', pinyin: 'kèzhì', cols: ['克制情绪', '克制欲望'], ex: '谈判陷入僵局时，保持理智、克制冲动至关重要。', exVi: 'Khi đàm phán bế tắc, giữ lý trí và kiềm chế bốc đồng là tối quan trọng.', tip: 'Phân biệt với 克服 (vượt qua khó khăn).' },
      { term: '逐步', pos: 'adv', vi: 'Từng bước có kế hoạch theo lộ trình', en: 'Step by step according to plan', pinyin: 'zhúbù', cols: ['逐步实施', '逐步推进'], ex: '随着疫苗接种率提高，国际客运航班逐步恢复正常运营。', exVi: 'Cùng với tỷ lệ phủ vaccine, các chuyến bay quốc tế từng bước khôi phục bình thường.', tip: 'Phân biệt với 逐渐 (Biến đổi tự nhiên dần dần).' },
      { term: '逐渐', pos: 'adv', vi: 'Dần dần biến đổi theo quy luật tự nhiên', en: 'Gradually over time', pinyin: 'zhújiàn', cols: ['逐渐变冷', '逐渐明白'], ex: '秋风渐起，庭院里的树叶逐渐由翠绿转为金黄。', exVi: 'Gió thu chớm lạnh, lá cây trong sân dần dần chuyển từ xanh biếc sang vàng ruộm.', tip: 'Dùng cho sự biến đổi tự nhiên của sự vật.' },
      { term: '启示', pos: 'n', vi: 'Bài học giác ngộ rút ra từ câu chuyện', en: 'Inspiration, philosophical enlightenment', pinyin: 'qǐshì', cols: ['深刻的启示', '获得启示'], ex: '这则寓言故事给了我们关于诚实守信的深刻启示。', exVi: 'Câu chuyện ngụ ngôn này đem lại cho chúng ta bài học giác ngộ sâu sắc về lòng trung thực.', tip: 'Phân biệt với 启发 (Gợi mở hành động).' },
      { term: '启发', pos: 'v/n', vi: 'Gợi mở, truyền cảm hứng tư duy', en: 'Inspire, stimulate thinking', pinyin: 'qǐfā', cols: ['受到启发', '启发式教学'], ex: '老师巧妙的问题启发了学生们发散思考、探索新解法。', exVi: 'Câu hỏi khéo léo của cô giáo đã gợi mở học sinh tư duy mở rộng và tìm cách giải mới.', tip: 'Dùng cho phương pháp sư phạm kích thích tư duy.' },
      { term: '声明', pos: 'n/v', vi: 'Tuyên bố công khai chính thức', en: 'Public statement, declare officially', pinyin: 'shēngmíng', cols: ['发表联合声明', '严正声明'], ex: '外交部发言人就有关南海问题发表严正立场声明。', exVi: 'Người phát ngôn Bộ Ngoại giao đưa ra bản tuyên bố lập trường nghiêm chính.', tip: 'Từ ngữ trang trọng cấp quốc gia/doanh nghiệp.' }
    ]
  },

  // POOL 9: HSK 6 Advanced Grammatical Structures (把, 被, 比, 存现, 关联词)
  {
    title: 'HSK 6 句型精练 Advanced Structures',
    titleVi: 'HSK 6 Cấu Trúc Ngữ Pháp & Mẫu Câu Điểm Tuyệt Đối',
    descVi: 'Luyện 15 từ và cụm ngữ pháp mấu chốt: câu chữ 把 nâng cao, câu chữ 被, câu tồn hiện và liên từ liên kết.',
    level: 'HSK 6',
    words: [
      { term: '转化为', pos: 'v phrase', vi: 'Chuyển hóa thành, biến thành', en: 'Transform into', pinyin: 'zhuǎnhuà wéi', cols: ['转化为成果', '转化为动能'], ex: '高校应当尽快将尖端科研专利转化为实际生产力。', exVi: 'Các trường đại học nên nhanh chóng chuyển hóa bằng sáng chế nghiên cứu thành năng suất thực tế.', tip: 'Thường kết hợp với câu chữ 把 (把...转化为...).' },
      { term: '归咎于', pos: 'v phrase', vi: 'Đổ lỗi cho, quy trách nhiệm cho', en: 'Attribute fault to', pinyin: 'guījiù yú', cols: ['归咎于他人', '归咎于客观原因'], ex: '企业管理者不应轻易把业绩下滑归咎于外部市场行情。', exVi: 'Người quản lý doanh nghiệp không nên dễ dàng đổ lỗi sụt giảm doanh số cho thị trường khách quan.', tip: 'Công thức: 把 + Vấn đề + 归咎于 + Đối tượng.' },
      { term: '抛在脑后', pos: 'phrase', vi: 'Ném ra sau đầu (Bỏ ngoài tai, lãng quên)', en: 'Cast behind one\'s mind, completely forget', pinyin: 'pāozàinǎohòu', cols: ['把劝告抛在脑后', '把烦恼抛在脑后'], ex: '他玩起网络游戏就把父母的叮嘱彻底抛在脑后了。', exVi: 'Nó hễ chơi game là vứt sạch lời dặn của cha mẹ ra sau đầu.', tip: 'Thành ngữ khẩu ngữ biểu đạt sinh động trong câu chữ 把.' },
      { term: '被广泛应用', pos: 'phrase', vi: 'Được ứng dụng rộng rãi khắp nơi', en: 'Be widely applied across fields', pinyin: 'bèi guǎngfàn yìngyòng', cols: ['被广泛应用于工业', '被广泛采纳'], ex: '轻量化复合碳纤维材料已被广泛应用于航空航天制造。', exVi: 'Vật liệu sợi carbon siêu nhẹ đã được ứng dụng rộng rãi trong chế tạo hàng không.', tip: 'Cấu trúc câu bị động chữ 被 trang trọng trong khoa học.' },
      { term: '被公认为', pos: 'phrase', vi: 'Được công chúng và giới chuyên môn thừa nhận là', en: 'Be universally acknowledged as', pinyin: 'bèi gōngrèn wéi', cols: ['被公认为大师', '被公认为行业标准'], ex: '这部巨著被文学界公认为现实主义小说的巅峰之作。', exVi: 'Bộ sách đồ sộ này được giới văn học thừa nhận là đỉnh cao của tiểu thuyết hiện thực.', tip: 'Dùng khẳng định vị thế đỉnh cao.' },
      { term: '哪怕...也...', pos: 'conjunction', vi: 'Cho dù/Dẫu rằng... thì cũng...', en: 'Even if... still...', pinyin: 'nǎpà...yě...', cols: ['哪怕再苦再累', '哪怕有一线希望'], ex: '哪怕前路充满荆棘坎坷，我们也决不轻言退缩。', exVi: 'Dẫu con đường phía trước đầy chông gai, chúng ta cũng quyết không lùi bước.', tip: 'Cặp liên từ biểu thị sự nhượng bộ kiên cường.' },
      { term: '与其...不如...', pos: 'conjunction', vi: 'Thay vì... chi bằng thà...', en: 'Rather than... it is better to...', pinyin: 'yǔqí...bùrú...', cols: ['与其抱怨不如行动', '与其等待不如创造'], ex: '与其坐在这里无谓叹息，不如立刻动手查找资料。', exVi: 'Thay vì ngồi đây thở dài vô ích, chi bằng lập tức bắt tay tra cứu tài liệu.', tip: 'Mẫu câu so sánh lựa chọn ưu việt trong văn nghị luận.' },
      { term: '宁可...也不...', pos: 'conjunction', vi: 'Thà... quyết không chịu...', en: 'Would rather... than...', pinyin: 'nìngkě...yě bù...', cols: ['宁可吃亏也不失信', '宁可挨饿'], ex: '做生意宁可利润微薄，也绝不能弄虚作假、以次充好。', exVi: 'Làm ăn thà lãi ít chứ quyết không làm giả, lấy đồ kém chất lượng lừa khách.', tip: 'Nhấn mạnh nguyên tắc đạo đức kiên định.' },
      { term: '存现', pos: 'grammar', vi: 'Câu tồn hiện (Nơi chốn + Động từ/Trợ từ + Danh từ)', en: 'Existential sentences', pinyin: 'cúnxiàn', cols: ['桌上放着一本书', '树下坐着老爷爷'], ex: '宁静的湖面上漂浮着几朵含苞待放的白睡莲。', exVi: 'Trên mặt hồ thanh bình đang bồng bềnh mấy đóa hoa súng trắng chớm nở.', tip: 'Mẫu câu miêu tả cảnh vật đặc trưng của tiếng Trung.' },
      { term: '坚持下去', pos: 'directional complement', vi: 'Kiên trì tiếp tục cho tới cùng (Bổ ngữ xu hướng 下去)', en: 'Persevere and keep going continuously', pinyin: 'jiānchí xiàqù', cols: ['一定要坚持下去', '勇敢坚持下去'], ex: '最艰难的关头往往预示着转机，只要坚持下去就是胜利。', exVi: 'Thời khắc gian nan nhất thường báo hiệu bước ngoặt, chỉ cần kiên trì tới cùng ắt thắng lợi.', tip: 'Động từ + 下去 biểu thị hành động tiếp diễn về tương lai.' },
      { term: '流传开来', pos: 'directional complement', vi: 'Lưu truyền và lan tỏa rộng khắp (Bổ ngữ xu hướng 起来)', en: 'Spread widely among people', pinyin: 'liúchuán kāi lái', cols: ['古老歌谣流传开来', '美名流传开来'], ex: '这首优美动听的民谣随着丝绸之路商队逐渐流传开来。', exVi: 'Bài dân ca êm dịu này đã theo đoàn buôn Con đường Tơ lụa lan tỏa rộng khắp.', tip: 'Động từ + 开来 biểu thị sự lan tỏa sang xung quanh.' },
      { term: '想起来了', pos: 'directional complement', vi: 'Nhớ ra rồi (Bổ ngữ xu hướng 起来)', en: 'Recall and bring back to memory', pinyin: 'xiǎng qǐlái le', cols: ['突然想起来了', '终于想起来了'], ex: '看到这张老照片，我立刻想起来了童年时在乡下捉鱼的趣事。', exVi: 'Nhìn bức ảnh cũ này, tôi lập tức nhớ lại chuyện thú vị bắt cá ở quê thời thơ ấu.', tip: 'Biểu thị thông tin trong ký ức được khôi phục.' },
      { term: '冷静下来', pos: 'directional complement', vi: 'Bình tĩnh lại, nguội đầu lại (Bổ ngữ xu hướng 下来)', en: 'Calm down from agitation', pinyin: 'lěngjìng xiàlái', cols: ['迅速冷静下来', '必须冷静下来'], ex: '深呼吸三次能帮助我们在突发险情面前迅速冷静下来。', exVi: 'Hít sâu ba lần có thể giúp chúng ta nhanh chóng bình tĩnh lại trước hiểm nguy bất ngờ.', tip: 'Biểu thị sự chuyển từ trạng thái động sang tĩnh.' },
      { term: '以至于', pos: 'conjunction', vi: 'Đến nỗi mà, đến mức mà (Dẫn ra kết quả nghiêm trọng)', en: 'To such an extent that', pinyin: 'yǐzhìyú', cols: ['以至于无法挽回', '以至于失眠'], ex: '他工作压力过大，以至于连续数周夜晚辗转难眠。', exVi: 'Áp lực công việc của anh ấy quá lớn, đến mức liên tục nhiều tuần đêm trằn trọc mất ngủ.', tip: 'Dẫn ra hệ quả sâu sắc trong câu phức.' },
      { term: '显而易见', pos: 'idiom', vi: 'Rõ ràng hiển nhiên ai cũng thấy', en: 'Obvious and completely apparent', pinyin: 'xiǎn\'éryìjiàn', cols: ['道理显而易见', '显而易见的事实'], ex: '保护绿水青山带来的长远生态红利是显而易见的。', exVi: 'Cổ tức sinh thái lâu dài do bảo vệ sông xanh núi biếc mang lại là vô cùng hiển nhiên.', tip: 'Cụm liên kết câu khẳng định luận điểm đanh thép.' }
    ]
  }
];

// ============================================================================
// DYNAMIC PROCEDURAL GENERATOR FOR SESSIONS (SUPPORTS DAY 1 UP TO DAY 1000)
// ============================================================================

export function getSessionByDay(track: 'ielts' | 'hsk', dayNumber: number): VocabSession {
  // Normalize day number
  const safeDay = Math.max(1, Math.floor(dayNumber));
  const unitNumber = Math.ceil(safeDay / 5);
  const dayInUnit = ((safeDay - 1) % 5) + 1; // 1 to 5

  if (track === 'ielts') {
    // 8 Phases across the curriculum
    const phase =
      safeDay <= 25
        ? 1
        : safeDay <= 50
        ? 2
        : safeDay <= 75
        ? 3
        : safeDay <= 100
        ? 4
        : safeDay <= 150
        ? 5
        : safeDay <= 200
        ? 6
        : safeDay <= 365
        ? 7
        : 8;

    const phaseNames: Record<number, string> = {
      1: 'Chặng 1: Nền Tảng Band 5.0 - 7.5 • Khởi Đầu Cốt Lõi (Ngày 1 - 25)',
      2: 'Chặng 2: Bứt Phá Band 7.5 - 8.5 • Collocations & Lập Luận Sâu (Ngày 26 - 50)',
      3: 'Chặng 3: Tinh Thông Band 8.5+ • Nghị Luận Task 2 & Tư Duy Phản Biện (Ngày 51 - 75)',
      4: 'Chặng 4: Tinh Hoa Band 9.0 • Hoàn Thiện Phong Cách Học Thuật Bản Xứ (Ngày 76 - 100)',
      5: 'Chặng 5: Đột Phá Đa Chuyên Đề: Triết Học, Pháp Quyền & Kinh Tế Tri Thức (Ngày 101 - 150)',
      6: 'Chặng 6: Collocations Học Thuật Chuyên Sâu Band 8.5 - 9.0 (Ngày 151 - 200)',
      7: 'Chặng 7: Bền Bỉ 365 Ngày Master Toàn Diện (Ngày 201 - 365)',
      8: 'Chặng 8: Huyền Thoại 1000 Ngày: Tinh Hoa Ngôn Ngữ Bản Xứ (Ngày 366 - 1000)'
    };

    const phaseNameVi = phaseNames[phase] || `Chặng Master Ngày ${safeDay}`;
    const unitIndex = (unitNumber - 1) % ieltsSessionTemplates.length;
    const templateGroup = ieltsSessionTemplates[unitIndex];
    const theme = templateGroup.themes[0];

    const sessionId = `ielts-session-${safeDay}`;
    const topicId = `${templateGroup.topicKey}-phase${phase}`;

    const lessonTypes = [
      { suffixVi: 'Nhận Diện & Phát Âm', descSuffix: 'Nắm chắc từ vựng cốt lõi và phát âm chuẩn xác.' },
      { suffixVi: 'Luyện Viết & Collocations', descSuffix: 'Vận dụng cụm từ Collocations học thuật vào bài viết Task 2.' },
      { suffixVi: 'Tăng Tốc & Đặt Câu Nâng Cao', descSuffix: 'Rèn luyện phản xạ đặt câu ghép, câu phức và cấu trúc ngữ pháp.' },
      { suffixVi: 'Thử Thách Ôn Tập Toàn Diện', descSuffix: 'Ôn tập và củng cố toàn bộ từ vựng trước kỳ sát hạch.' },
      { suffixVi: 'Vượt Ải Boss Chinh Phục Cột Mốc', descSuffix: 'Sát hạch tổng hợp vượt ải để mở khóa chặng đường tiếp theo!' }
    ];
    const currentLessonType = lessonTypes[dayInUnit - 1] || lessonTypes[0];

    const cards: FlashcardItem[] = theme.words.map((w, idx) =>
      makeCard(
        `fc-ielts-${safeDay}-${idx + 1}`,
        'ielts',
        w.pos === 'phrase' || w.pos === 'idiom' ? 'collocation' : 'academic',
        theme.level,
        w.term,
        w.pos,
        w.vi,
        w.en,
        w.ex,
        w.exVi,
        {
          phonetic: w.phonetic,
          collocations: w.cols,
          writingContext: w.tip,
          topicId,
          sessionId,
          sessionNumber: safeDay
        }
      )
    );

    // Pick quiz target cards dynamically per day in unit
    const q1Idx = ((dayInUnit - 1) * 2) % cards.length;
    const q2Idx = ((dayInUnit - 1) * 2 + 1) % cards.length;
    const cardQ1 = cards[q1Idx] || cards[0];
    const cardQ2 = cards[q2Idx] || cards[1];
    const distractor1 = cards[(q1Idx + 3) % cards.length]?.term || 'mitigate';
    const distractor2 = cards[(q1Idx + 5) % cards.length]?.term || 'exacerbate';
    const distractor3 = cards[(q2Idx + 2) % cards.length]?.term || 'essential';
    const distractor4 = cards[(q2Idx + 4) % cards.length]?.term || 'significant';

    return {
      id: sessionId,
      topicId,
      sessionNumber: safeDay,
      phase,
      phaseNameVi,
      title: `IELTS Writing Day ${safeDay}: ${theme.title}`,
      titleVi: `Buổi ${safeDay}: ${theme.titleVi} • ${currentLessonType.suffixVi}`,
      descriptionVi: `${theme.descVi} (${currentLessonType.descSuffix} • Ngày ${safeDay} • Đơn nguyên ${unitNumber} • ${theme.level}).`,
      track: 'ielts',
      level: theme.level,
      targetCount: cards.length,
      durationMinutes: 15,
      xpReward: dayInUnit === 5 ? 80 : 50,
      cards,
      quizQuestions: [
        {
          id: `q-ielts-${safeDay}-1`,
          question: `Which word or collocation best matches: "${cardQ1.meaningVi}"?`,
          questionVi: `Từ hoặc cụm Collocation nào có nghĩa: "${cardQ1.meaningVi}"?`,
          options: [cardQ1.term, distractor1, distractor2, 'unprecedented'],
          correctAnswer: cardQ1.term,
          explanationVi: `"${cardQ1.term}" [${cardQ1.phonetic || ''}] có nghĩa là: ${cardQ1.meaningVi}.`
        },
        {
          id: `q-ielts-${safeDay}-2`,
          question: `In Task 2, which term means: "${cardQ2.meaningVi}"?`,
          questionVi: `Trong IELTS Writing, cụm từ nào mang nghĩa: "${cardQ2.meaningVi}"?`,
          options: [cardQ2.term, distractor3, distractor4, 'convenient'],
          correctAnswer: cardQ2.term,
          explanationVi: `"${cardQ2.term}" là cụm từ chuẩn học thuật cho trình độ ${theme.level}.`
        }
      ]
    };
  } else {
    // HSK track
    const phase =
      safeDay <= 25
        ? 1
        : safeDay <= 50
        ? 2
        : safeDay <= 75
        ? 3
        : safeDay <= 100
        ? 4
        : safeDay <= 150
        ? 5
        : safeDay <= 200
        ? 6
        : safeDay <= 365
        ? 7
        : 8;

    const phaseNames: Record<number, string> = {
      1: 'Chặng 1: Nền Tảng HSK 1 - HSK 5 • Khởi Đầu Đến Giao Tiếp Thành Thạo (Ngày 1 - 25)',
      2: 'Chặng 2: Chinh Phục HSK 6 • 300 Thành Ngữ 4 Chữ & Điển Tích (Ngày 26 - 50)',
      3: 'Chặng 3: HSK 6 Nâng Cao • Phân Biệt Từ Cận Nghĩa 近义词 (Ngày 51 - 75)',
      4: 'Chặng 4: Cú Pháp Điểm Tuyệt Đối • Câu Chữ 把, 被 & 存现句 (Ngày 76 - 100)',
      5: 'Chặng 5: Văn Nghị Luận Báo Chí & Đọc Hiểu Học Thuật HSK 6 (Ngày 101 - 150)',
      6: 'Chặng 6: Thành Thạo Phản Xạ HSK 6 Chuẩn Bản Xứ (Ngày 151 - 200)',
      7: 'Chặng 7: Bền Bỉ 365 Ngày Master Toàn Diện HSK 6 (Ngày 201 - 365)',
      8: 'Chặng 8: Huyền Thoại 1000 Ngày: Chuẩn New HSK 7 - 9 Cao Cấp (Ngày 366 - 1000)'
    };

    const phaseNameVi = phaseNames[phase] || `Chặng Master HSK Ngày ${safeDay}`;
    const poolIndex = (unitNumber - 1) % hskThemePools.length;
    const pool = hskThemePools[poolIndex];
    const sessionId = `hsk-session-${safeDay}`;
    const topicId = `hsk-topic-phase${phase}`;

    const hskLessonTypes = [
      { suffixVi: 'Nhận Diện Mặt Chữ & Pinyin', descSuffix: 'Nắm chắc nét chữ Hán và phát âm chuẩn thanh điệu Pinyin.' },
      { suffixVi: 'Luyện Cụm Từ & Ghép Câu', descSuffix: 'Ứng dụng các cụm từ và mẫu câu đời sống vào hội thoại.' },
      { suffixVi: 'Tăng Tốc & Ngữ Pháp Nâng Cao', descSuffix: 'Rèn luyện phản xạ ngữ pháp và cấu trúc câu mấu chốt.' },
      { suffixVi: 'Thử Thách Ôn Tập Toàn Diện', descSuffix: 'Củng cố toàn bộ chữ Hán và từ vựng trước kỳ thi vượt ải.' },
      { suffixVi: `Vượt Ải Boss Cột Mốc ${pool.level}`, descSuffix: 'Thử thách tổng hợp khẳng định trình độ và mở khóa đơn nguyên mới!' }
    ];
    const currentLessonType = hskLessonTypes[dayInUnit - 1] || hskLessonTypes[0];

    const cards: FlashcardItem[] = pool.words.map((w, idx) =>
      makeCard(
        `fc-hsk-${safeDay}-${idx + 1}`,
        'hsk',
        w.pos === 'idiom' ? 'chengyu' : 'general',
        pool.level,
        w.term,
        w.pos,
        w.vi,
        w.en,
        w.ex,
        w.exVi,
        {
          pinyin: w.pinyin,
          collocations: w.cols,
          writingContext: w.tip,
          topicId,
          sessionId,
          sessionNumber: safeDay
        }
      )
    );

    const q1Idx = ((dayInUnit - 1) * 2) % cards.length;
    const q2Idx = ((dayInUnit - 1) * 2 + 1) % cards.length;
    const cardQ1 = cards[q1Idx] || cards[0];
    const cardQ2 = cards[q2Idx] || cards[1];
    const distractor1 = cards[(q1Idx + 3) % cards.length]?.term || '朋友';
    const distractor2 = cards[(q1Idx + 5) % cards.length]?.term || '准备';
    const distractor3 = cards[(q2Idx + 2) % cards.length]?.term || '喜欢';
    const distractor4 = cards[(q2Idx + 4) % cards.length]?.term || '运动';

    return {
      id: sessionId,
      topicId,
      sessionNumber: safeDay,
      phase,
      phaseNameVi,
      title: `HSK Day ${safeDay}: ${pool.title}`,
      titleVi: `Buổi ${safeDay}: ${pool.titleVi} • ${currentLessonType.suffixVi}`,
      descriptionVi: `${pool.descVi} (${currentLessonType.descSuffix} • Ngày ${safeDay} • Đơn nguyên ${unitNumber} • ${pool.level}).`,
      track: 'hsk',
      level: pool.level,
      targetCount: cards.length,
      durationMinutes: 15,
      xpReward: dayInUnit === 5 ? 80 : 50,
      cards,
      quizQuestions: [
        {
          id: `q-hsk-${safeDay}-1`,
          question: `Chữ Hán nào có nghĩa là: "${cardQ1.meaningVi}"?`,
          questionVi: `Chữ Hán nào có nghĩa là: "${cardQ1.meaningVi}"?`,
          options: [cardQ1.term, distractor1, distractor2, '高兴'],
          correctAnswer: cardQ1.term,
          explanationVi: `${cardQ1.term} [${cardQ1.pinyin || ''}] = ${cardQ1.meaningVi}.`
        },
        {
          id: `q-hsk-${safeDay}-2`,
          question: `Chọn từ phù hợp với nghĩa: "${cardQ2.meaningVi}"`,
          questionVi: `Chọn từ phù hợp với nghĩa: "${cardQ2.meaningVi}"`,
          options: [cardQ2.term, distractor3, distractor4, '学习'],
          correctAnswer: cardQ2.term,
          explanationVi: `${cardQ2.term} [${cardQ2.pinyin || ''}] có nghĩa là: ${cardQ2.meaningVi}.`
        }
      ]
    };
  }
}

// Generate the full master list of 200 IELTS & 200 HSK sessions (total 400 core sessions in curriculum catalog)
function generateMasterCatalog(countPerTrack = 200): { ieltsSessions: VocabSession[]; hskSessions: VocabSession[] } {
  const ieltsSessions: VocabSession[] = [];
  const hskSessions: VocabSession[] = [];

  for (let i = 1; i <= countPerTrack; i++) {
    ieltsSessions.push(getSessionByDay('ielts', i));
    hskSessions.push(getSessionByDay('hsk', i));
  }

  return { ieltsSessions, hskSessions };
}

// Generate catalog with 200 sessions each
const { ieltsSessions, hskSessions } = generateMasterCatalog(200);

// Export the Master Curriculum Tracks
export const vocabTopics: VocabTopic[] = [
  // 1. IELTS 200-Day Writing & Collocations Track (Extensible to 1000 Days)
  {
    id: 'ielts-master-200',
    track: 'ielts',
    slug: 'ielts-200-days-writing',
    title: 'IELTS Writing 200-Day Mastery (Mở rộng đến 1000 Ngày)',
    titleVi: 'IELTS Writing 200 Ngày: Nâng Band 8.5+ Collocations & Task 2 (Mở rộng đến 1000 Ngày)',
    descriptionVi: 'Trọn bộ 200 buổi học liên tục (18 từ/buổi), 8 chặng chuyên sâu, tích hợp hệ thống sinh bài vô tận tới 1000 Ngày và ôn tập ngắt quãng Spaced Repetition SM-2.',
    badge: '200 Buổi Học • Mở Rộng 1000 Ngày',
    icon: 'Trees',
    sessionsCount: ieltsSessions.length,
    totalWords: ieltsSessions.reduce((acc, s) => acc + s.cards.length, 0),
    sessions: ieltsSessions
  },

  // 2. HSK 200-Day Comprehensive Track (Extensible to 1000 Days)
  {
    id: 'hsk-master-200',
    track: 'hsk',
    slug: 'hsk-200-days-mastery',
    title: 'HSK 200-Day Comprehensive Curriculum (Mở rộng đến 1000 Ngày)',
    titleVi: 'HSK 200 Ngày: Chinh Phục HSK 4 - 6, 300 Thành Ngữ & Cận Nghĩa (Mở rộng đến 1000 Ngày)',
    descriptionVi: 'Trọn bộ 200 buổi học chuyên sâu (15 - 18 từ/buổi), từ giao tiếp, công sở đến 300 thành ngữ 4 chữ, phân biệt từ cận nghĩa và cấu trúc câu điểm tuyệt đối.',
    badge: '200 Buổi Học • Mở Rộng 1000 Ngày',
    icon: 'Flame',
    sessionsCount: hskSessions.length,
    totalWords: hskSessions.reduce((acc, s) => acc + s.cards.length, 0),
    sessions: hskSessions
  }
];

// Flat export of all 400 catalog sessions
export const allCurriculumSessions: VocabSession[] = [...ieltsSessions, ...hskSessions];

// Helper to get all curriculum flashcards in one flat list if needed
export function getAllCurriculumFlashcards(): FlashcardItem[] {
  const allCards: FlashcardItem[] = [];
  vocabTopics.forEach(topic => {
    topic.sessions.forEach(session => {
      allCards.push(...session.cards);
    });
  });
  return allCards;
}
