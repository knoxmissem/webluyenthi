'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ExamQuestion, ExamSection, WritingEvaluationResult } from '@/types';
import { evaluateEssaySubmission } from '@/lib/writingEvaluationService';
import { useLearner } from '@/context/LearnerContext';
import {
  PenTool,
  Clock,
  Sparkles,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCheck2,
  Layers,
  ChevronRight,
  BarChart3,
  BookOpen,
  ArrowRight,
  TrendingUp,
  X,
  Lock,
  Unlock,
  ShieldAlert,
  Check
} from 'lucide-react';

interface WritingLabWorkspaceProps {
  section: ExamSection;
  question: ExamQuestion;
  isMockMode?: boolean;
  onWritingSubmit?: (essayText: string, evaluation: WritingEvaluationResult) => void;
}

export function WritingLabWorkspace({
  section,
  question,
  isMockMode = false,
  onWritingSubmit
}: WritingLabWorkspaceProps) {
  const { addXp, playAudioCue } = useLearner();

  const taskType = section.taskType || (question.type === 'writing_academic_task1' ? 'task1_academic' : 'task2_essay');
  const targetWords = question.wordCountTarget || (taskType === 'task2_essay' ? 250 : 150);

  const [essayText, setEssayText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [showGuidedWorkflow, setShowGuidedWorkflow] = useState(!isMockMode);
  const [guidedStep, setGuidedStep] = useState<number>(1);
  const [evaluationResult, setEvaluationResult] = useState<WritingEvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [activeDiffTab, setActiveDiffTab] = useState<'feedback' | 'comparison' | 'paragraphs'>('feedback');
  const [preventPaste, setPreventPaste] = useState(true);
  const [leftTab, setLeftTab] = useState<'prompt' | 'model'>('prompt');

  const draftKey = `lingora_writing_draft_${question.id}`;

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        setEssayText(saved);
        const words = saved.trim().split(/\s+/).filter(Boolean).length;
        setWordCount(words);
        setLastSavedTime('Bản nháp được khôi phục');
      }
    } catch {}
  }, [draftKey]);

  // Autosave to localStorage
  useEffect(() => {
    if (!essayText) return;
    const interval = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, essayText);
        const now = new Date();
        setLastSavedTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
      } catch {}
    }, 3000);

    return () => clearTimeout(interval);
  }, [essayText, draftKey]);

  const handleTextChange = (text: string) => {
    setEssayText(text);
    const count = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(count);
  };

  const handleEvaluate = () => {
    if (wordCount < 10) {
      alert('Vui lòng viết ít nhất 10 từ trước khi gửi đánh giá.');
      return;
    }

    setIsEvaluating(true);
    playAudioCue('correct');
    addXp(60);

    setTimeout(() => {
      const result = evaluateEssaySubmission({
        essayText,
        taskType,
        targetWordCount: targetWords
      });
      setEvaluationResult(result);
      setIsEvaluating(false);
      setShowEvaluationModal(true);

      if (onWritingSubmit) {
        onWritingSubmit(essayText, result);
      }
    }, 600);
  };

  const currentModelEssay = question.modelEssay || (
    taskType === 'task1_academic'
      ? {
          band: 8.5,
          title: "Bài Mẫu Band 8.5+: Desalination / Process Report",
          essay: `The diagram illustrates the sequential stages of the industrial conversion process. Overall, the system operates across multiple clearly defined phases, commencing with raw intake and culminating in distribution.\n\nInitially, raw input is routed into primary containment facilities where initial separation occurs. Subsequently, high-pressure filtration purifies the fluid, eliminating particulate contaminants.\n\nIn the concluding stage, essential minerals are stabilized, and the final output is safely transferred into municipal storage reservoirs.`,
          paragraphs: [
            {
              title: "1. Introduction & Overview (Mở bài & Tổng quan)",
              content: "The diagram depicts the multi-phase industrial process through which seawater is converted into potable drinking water via reverse-osmosis desalination.\n\nOverall, the conversion comprises five distinct operational stages: raw water intake, preliminary particulate filtration, high-pressure semi-permeable membrane separation, post-treatment chemical stabilization, and municipal water distribution."
            },
            {
              title: "2. Body 1: Pre-treatment & High-Pressure Osmosis (Thân bài 1)",
              content: "Initially, ocean water is drawn through deep offshore intake pipes into a primary sedimentation tank, where suspended sand and coarse debris are screened out. The pre-clarified liquid then undergoes micro-filtration before being routed into high-pressure reverse osmosis vessels. Here, powerful pumps force saline water against semi-permeable membranes at pressures reaching 70 bars, successfully stripping away approximately 99% of dissolved sodium chloride and trace contaminants."
            },
            {
              title: "3. Body 2: Stabilization, Remineralization & Storage (Thân bài 2)",
              content: "The hypersaline byproduct, termed concentrated brine, is discharged safely back into deep ocean currents to minimize coastal salinity imbalances. Simultaneously, the demineralized permeate enters a remineralization tower, where calcium and essential mineral carbonates are reintroduced alongside chlorine disinfection. Finally, the potable water is pumped into pressurized municipal storage reservoirs for domestic consumption."
            }
          ],
          keyVocabulary: [
            { term: "Reverse-osmosis desalination", meaningVi: "Khử muối bằng công nghệ thẩm thấu ngược", band: "8.5" },
            { term: "Semi-permeable membrane", meaningVi: "Màng bán thấm lọc áp lực cao", band: "8.5" },
            { term: "Hypersaline brine", meaningVi: "Nước muối cô đặc đậm đặc", band: "8.5" },
            { term: "Demineralized permeate", meaningVi: "Dòng nước đã tách bỏ hoàn toàn muối", band: "8.5" },
            { term: "Remineralization tower", meaningVi: "Tháp tái bổ sung khoáng chất tự nhiên", band: "8.5" }
          ],
          structureAnalysis: [
            "Đoạn Overview gồm 2 câu chuẩn xác, thâu tóm toàn bộ chu trình từ khâu hút nước đến phân phối.",
            "Sử dụng từ nối tuần hoàn mượt mà: Initially, Subsequently, Simultaneously, Finally.",
            "Từ vựng chuyên ngành công nghiệp xử lý nước đạt chuẩn Band 8.5 - 9.0."
          ]
        }
      : {
          band: 8.5,
          title: "Bài Mẫu Band 8.5+: Academic Task 2 Essay",
          essay: `It is often argued that tertiary education should cater exclusively to the pragmatic demands of the labor market by equipping graduates with job-specific skills. While vocational proficiency undeniably enhances immediate employability, I firmly believe that universities must cultivate holistic intellectual growth and analytical reasoning alongside specialized career training.\n\nOn the one hand, advocates of vocational-centric higher education contend that economies require specialized technical capital to sustain industrial and economic growth. In competitive sectors such as software engineering, medicine, and corporate finance, employers seek candidates capable of executing sophisticated tasks with minimal initial onboarding. When academic institutions align their syllabi directly with corporate demands, graduates experience significantly smoother school-to-work transitions and reduced risks of graduate underemployment.\n\nOn the other hand, an exclusively career-oriented curriculum risks obsolescence in a rapidly evolving technological landscape where automated systems displace routine tasks. A broader humanities and scientific curriculum nurtures cognitive agility, moral discernment, and interdisciplinary problem-solving—competencies that cannot be easily replaced by artificial intelligence. Furthermore, university education serves a higher societal purpose beyond mere workforce production; it fosters enlightened citizens capable of critically interrogating complex socio-political phenomena.\n\nIn conclusion, although practical skill acquisition is indispensable for economic productivity, it should not supersede universal intellectual enrichment. Rather than choosing between narrow vocational training and abstract scholarship, higher education institutions should adopt an integrated pedagogy that harmonizes market-ready expertise with overarching cognitive resilience.`,
          paragraphs: [
            {
              title: "1. Introduction (Mở bài)",
              content: "It is often argued that tertiary education should cater exclusively to the pragmatic demands of the labor market by equipping graduates with job-specific skills. While vocational proficiency undeniably enhances immediate employability, I firmly believe that universities must cultivate holistic intellectual growth and analytical reasoning alongside specialized career training."
            },
            {
              title: "2. Body 1: Vocational Focus & Employability (Thân bài 1: Nhu cầu thị trường)",
              content: "On the one hand, advocates of vocational-centric higher education contend that economies require specialized technical capital to sustain industrial and economic growth. In competitive sectors such as software engineering, medicine, and corporate finance, employers seek candidates capable of executing sophisticated tasks with minimal initial onboarding. When academic institutions align their syllabi directly with corporate demands, graduates experience significantly smoother school-to-work transitions and reduced risks of graduate underemployment."
            },
            {
              title: "3. Body 2: Broad Academic Curriculum & Adaptability (Thân bài 2: Tư duy thích ứng)",
              content: "On the other hand, an exclusively career-oriented curriculum risks obsolescence in a rapidly evolving technological landscape where automated systems displace routine tasks. A broader humanities and scientific curriculum nurtures cognitive agility, moral discernment, and interdisciplinary problem-solving—competencies that cannot be easily replaced by artificial intelligence. Furthermore, university education serves a higher societal purpose beyond mere workforce production; it fosters enlightened citizens capable of critically interrogating complex socio-political phenomena."
            },
            {
              title: "4. Conclusion (Kết luận)",
              content: "In conclusion, although practical skill acquisition is indispensable for economic productivity, it should not supersede universal intellectual enrichment. Rather than choosing between narrow vocational training and abstract scholarship, higher education institutions should adopt an integrated pedagogy that harmonizes market-ready expertise with overarching cognitive resilience."
            }
          ],
          keyVocabulary: [
            { term: "Pragmatic demands", meaningVi: "Nhu cầu thực tiễn của thị trường", band: "8.5" },
            { term: "Holistic intellectual growth", meaningVi: "Sự phát triển trí tuệ toàn diện", band: "8.5" },
            { term: "Cognitive agility", meaningVi: "Sự linh hoạt trong tư duy nhận thức", band: "8.5" },
            { term: "Technological obsolescence", meaningVi: "Sự đào thải do công nghệ thay đổi nhanh", band: "8.5" },
            { term: "Enlightened citizens", meaningVi: "Những công dân có tri thức khai phóng", band: "8.5" },
            { term: "Integrated pedagogy", meaningVi: "Phương pháp giáo dục tích hợp hài hòa", band: "8.5" }
          ],
          structureAnalysis: [
            "Mở bài trực tiếp diễn giải hai luồng ý kiến với luận điểm rõ ràng (balanced thesis statement).",
            "Thân bài 1 sử dụng vốn từ vựng kinh tế & thị trường lao động sắc sảo (underemployment, specialized technical capital).",
            "Thân bài 2 bảo vệ giáo dục khai phóng bằng lý lẽ về tư duy thích ứng trước làn sóng tự động hóa/AI.",
            "Kết luận súc tích, đúc kết giải pháp dung hòa (integrated pedagogy)."
          ]
        }
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Mode Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center gap-1.5">
            <PenTool className="w-3.5 h-3.5" />
            {taskType === 'task1_academic' ? 'IELTS Academic Writing Task 1' : 'IELTS Writing Task 2 Essay'}
          </span>
          <h3 className="text-lg font-black text-stone-900 dark:text-white mt-0.5">
            Phòng Viết & Đánh Giá Tiêu Chuẩn Quốc Tế
          </h3>
        </div>

        {/* Guided Learning Mode Toggle (Practice Only) */}
        {!isMockMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGuidedWorkflow(!showGuidedWorkflow)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                showGuidedWorkflow
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-black'
                  : 'bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 text-stone-600 dark:text-stone-300'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showGuidedWorkflow ? 'Đang bật Hướng Dẫn Từng Bước' : 'Bật Hướng Dẫn Step-by-Step'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Guided Learning Workflow Stepper (If enabled) */}
      {showGuidedWorkflow && !isMockMode && (
        <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-white dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Khung Phương Pháp Làm Bài 4 Bước (Band 7.5+ Protocol)
            </span>
            <span className="text-[11px] font-bold text-stone-500">
              Bước {guidedStep} / 4
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
            {[
              { num: 1, title: 'Phân tích đề', desc: 'Xác định yêu cầu' },
              { num: 2, title: 'Lập dàn ý', desc: 'Cấu trúc 4 đoạn' },
              { num: 3, title: 'Viết bài', desc: 'Từ vựng & liên từ' },
              { num: 4, title: 'Kiểm tra', desc: 'Checklist soát lỗi' }
            ].map(step => (
              <button
                key={step.num}
                onClick={() => setGuidedStep(step.num)}
                className={`p-2.5 rounded-xl border text-left transition ${
                  guidedStep === step.num
                    ? 'border-indigo-600 bg-white dark:bg-slate-800 text-indigo-950 dark:text-white shadow-2xs font-black ring-1 ring-indigo-500'
                    : 'border-stone-200/60 dark:border-slate-700/60 hover:bg-white/60 dark:hover:bg-slate-800/60 text-stone-600 dark:text-stone-300'
                }`}
              >
                <div className="text-[10px] font-extrabold text-indigo-500">BƯỚC {step.num}</div>
                <div className="font-bold">{step.title}</div>
                <div className="text-[10px] text-stone-400">{step.desc}</div>
              </button>
            ))}
          </div>

          {/* Guidance details for active step */}
          <div className="p-3 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-indigo-100 dark:border-indigo-950 text-xs text-stone-700 dark:text-stone-300 space-y-1">
            {guidedStep === 1 && (
              <p>
                🎯 <strong>Bước 1 - Phân tích đề:</strong> Xác định từ khóa (Keywords), chủ đề chính, và dạng câu hỏi (Agree/Disagree, Discuss Both Views, hay Problem & Solution). Đừng vội viết ngay; hãy dành 3-5 phút đầu định hình lập trường.
              </p>
            )}
            {guidedStep === 2 && (
              <p>
                📋 <strong>Bước 2 - Lập dàn ý 4 đoạn:</strong>
                <br />• <em>Mở bài (Intro):</em> Paraphrase câu hỏi + Nêu rõ quan điểm (Thesis Statement).
                <br />• <em>Thân bài 1 (Body 1):</em> Phân tích khía cạnh thứ nhất kèm ví dụ minh họa.
                <br />• <em>Thân bài 2 (Body 2):</em> Phân tích khía cạnh thứ hai hoặc phản biện.
                <br />• <em>Kết luận (Conclusion):</em> Khẳng định lại quan điểm bằng từ ngữ mới, không đưa ý mới.
              </p>
            )}
            {guidedStep === 3 && (
              <p>
                ✍️ <strong>Bước 3 - Viết bài:</strong> Sử dụng các liên từ mạch lạc (Furthermore, Consequently, In contrast) và các cụm collocation học thuật thay thế các từ ngữ thông dụng.
              </p>
            )}
            {guidedStep === 4 && (
              <p>
                ✅ <strong>Bước 4 - Kiểm tra lại:</strong> Soát lỗi chia động từ số ít/nhiều, mạo từ (a/an/the), chính tả (spelling), và kiểm tra xem tổng số từ đã vượt mốc {targetWords} từ hay chưa.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Split-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[580px]">
        {/* LEFT PANEL: Study4 Style Tabs (Prompt vs Model Essay) */}
        <div className="lg:col-span-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs overflow-y-auto max-h-[750px] space-y-4 flex flex-col">
          {/* Study4 Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setLeftTab('prompt')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                leftTab === 'prompt'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Đề bài & Yêu cầu</span>
            </button>
            <button
              type="button"
              onClick={() => setLeftTab('model')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                leftTab === 'model'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Bài Mẫu Band 8.5+</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-black">
                CBT
              </span>
            </button>
          </div>

          {/* TAB 1: Prompt & Requirements */}
          {leftTab === 'prompt' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-stone-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-black uppercase text-stone-500 tracking-wider flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-indigo-600" />
                  Chi tiết đề thi
                </span>
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-full">
                  Tối thiểu {targetWords} từ
                </span>
              </div>

              {/* Instructions Box */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200/80 dark:border-slate-800 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                <p className="font-extrabold text-stone-900 dark:text-white mb-1">
                  {section.instructions}
                </p>
                {section.instructionsVi && (
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {section.instructionsVi}
                  </p>
                )}
              </div>

              {/* Chart Display for Task 1 */}
              {taskType === 'task1_academic' && (
                <div className="rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                    <BarChart3 className="w-4 h-4 text-indigo-600" />
                    <span>Biểu Đồ Số Liệu: Tỷ Trọng Điện Năng Lượng Tái Tạo (2010 - 2020)</span>
                  </div>

                  {/* SVG Visual Bar Chart */}
                  <div className="mb-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-stone-200/80 dark:border-slate-800">
                    <svg viewBox="0 0 420 180" className="w-full h-auto">
                      <line x1="40" y1="20" x2="400" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <text x="32" y="24" fontSize="9" fill="#94A3B8" textAnchor="end">100%</text>
                      <line x1="40" y1="60" x2="400" y2="60" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <text x="32" y="64" fontSize="9" fill="#94A3B8" textAnchor="end">75%</text>
                      <line x1="40" y1="100" x2="400" y2="100" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <text x="32" y="104" fontSize="9" fill="#94A3B8" textAnchor="end">50%</text>
                      <line x1="40" y1="140" x2="400" y2="140" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <text x="32" y="144" fontSize="9" fill="#94A3B8" textAnchor="end">25%</text>
                      <line x1="40" y1="160" x2="400" y2="160" stroke="#64748B" strokeWidth="1.5" />
                      <text x="32" y="164" fontSize="9" fill="#94A3B8" textAnchor="end">0%</text>

                      {/* Norway */}
                      <g transform="translate(60, 0)">
                        <rect x="0" y="27" width="16" height="133" fill="#6366F1" rx="2" />
                        <rect x="18" y="25" width="16" height="135" fill="#4F46E5" rx="2" />
                        <rect x="36" y="23" width="16" height="137" fill="#4338CA" rx="2" />
                        <text x="26" y="174" fontSize="10" fontWeight="bold" fill="#334155" textAnchor="middle">Norway</text>
                      </g>

                      {/* Germany */}
                      <g transform="translate(150, 0)">
                        <rect x="0" y="137" width="16" height="23" fill="#6366F1" rx="2" />
                        <rect x="18" y="116" width="16" height="44" fill="#4F46E5" rx="2" />
                        <rect x="36" y="98" width="16" height="62" fill="#4338CA" rx="2" />
                        <text x="26" y="174" fontSize="10" fontWeight="bold" fill="#334155" textAnchor="middle">Germany</text>
                      </g>

                      {/* Australia */}
                      <g transform="translate(240, 0)">
                        <rect x="0" y="147" width="16" height="13" fill="#6366F1" rx="2" />
                        <rect x="18" y="140" width="16" height="20" fill="#4F46E5" rx="2" />
                        <rect x="36" y="130" width="16" height="30" fill="#4338CA" rx="2" />
                        <text x="26" y="174" fontSize="10" fontWeight="bold" fill="#334155" textAnchor="middle">Australia</text>
                      </g>

                      {/* Japan */}
                      <g transform="translate(330, 0)">
                        <rect x="0" y="146" width="16" height="14" fill="#6366F1" rx="2" />
                        <rect x="18" y="139" width="16" height="21" fill="#4F46E5" rx="2" />
                        <rect x="36" y="133" width="16" height="27" fill="#4338CA" rx="2" />
                        <text x="26" y="174" fontSize="10" fontWeight="bold" fill="#334155" textAnchor="middle">Japan</text>
                      </g>
                    </svg>

                    <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-stone-500 pt-2 border-t border-stone-100 dark:border-slate-800">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#6366F1]" /> 2010</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#4F46E5]" /> 2015</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#4338CA]" /> 2020</span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 dark:border-slate-800 text-stone-500">
                          <th className="py-1.5 px-2">Quốc Gia</th>
                          <th className="py-1.5 px-2">2010</th>
                          <th className="py-1.5 px-2">2015</th>
                          <th className="py-1.5 px-2">2020</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 dark:divide-slate-800 text-stone-800 dark:text-stone-200 font-medium">
                        <tr>
                          <td className="py-1.5 px-2 font-bold text-indigo-600 dark:text-indigo-400">Norway (Na Uy)</td>
                          <td className="py-1.5 px-2">95%</td>
                          <td className="py-1.5 px-2">96%</td>
                          <td className="py-1.5 px-2 font-black">98%</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 font-bold text-emerald-600 dark:text-emerald-400">Germany (Đức)</td>
                          <td className="py-1.5 px-2">16%</td>
                          <td className="py-1.5 px-2">31%</td>
                          <td className="py-1.5 px-2 font-black">44%</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 font-bold text-amber-600 dark:text-amber-400">Australia (Úc)</td>
                          <td className="py-1.5 px-2">9%</td>
                          <td className="py-1.5 px-2">14%</td>
                          <td className="py-1.5 px-2 font-black">21%</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 font-bold text-purple-600 dark:text-purple-400">Japan (Nhật Bản)</td>
                          <td className="py-1.5 px-2">10%</td>
                          <td className="py-1.5 px-2">15%</td>
                          <td className="py-1.5 px-2 font-black">19%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Essay Question Prompt */}
              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 text-xs leading-relaxed">
                <h4 className="font-extrabold text-stone-900 dark:text-white text-sm mb-1">
                  Câu hỏi chính thức:
                </h4>
                <p className="text-stone-800 dark:text-stone-200 font-medium mb-2">
                  "{question.prompt}"
                </p>
                {question.promptVi && (
                  <p className="text-stone-500 dark:text-stone-400 italic">
                    {question.promptVi}
                  </p>
                )}
              </div>

              {/* Model Outline Suggestion */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200/80 dark:border-slate-800 text-xs space-y-2">
                <strong className="block text-[11px] font-black uppercase tracking-wider text-stone-500">
                  Gợi ý triển khai từ ban giám khảo:
                </strong>
                <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                  {question.explanationVi}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Study4 Band 8.5+ Model Essay */}
          {leftTab === 'model' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Official Cambridge Band 8.5+ Model
                  </div>
                  <h4 className="text-sm font-extrabold text-stone-900 dark:text-white">
                    {currentModelEssay.title}
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-600 text-white shadow-xs">
                  Band {currentModelEssay.band}
                </span>
              </div>

              {/* Paragraph Breakdown */}
              <div className="space-y-3">
                {(currentModelEssay.paragraphs || []).map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/70 dark:bg-slate-950 text-xs space-y-1.5"
                  >
                    <div className="font-extrabold text-indigo-600 dark:text-indigo-400 text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {p.title}
                    </div>
                    <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                      {p.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Key High-Band Vocabulary */}
              {currentModelEssay.keyVocabulary && currentModelEssay.keyVocabulary.length > 0 && (
                <div className="p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2">
                  <div className="text-[11px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Từ vựng & Cụm Collocation Band 8.5+
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentModelEssay.keyVocabulary.map((voc, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 text-xs"
                      >
                        <div className="font-bold text-stone-900 dark:text-white flex items-center justify-between">
                          <span>{voc.term}</span>
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                            Band {voc.band}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                          {voc.meaningVi}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Structural Analysis */}
              {currentModelEssay.structureAnalysis && currentModelEssay.structureAnalysis.length > 0 && (
                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 text-xs space-y-1.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-stone-500">
                    Phân tích chiến thuật của Giám khảo:
                  </div>
                  <ul className="space-y-1 text-stone-700 dark:text-stone-300 text-[11px]">
                    {currentModelEssay.structureAnalysis.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Writing Editor & Study4 Controls */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3 flex-1 flex flex-col">
            {/* Editor Toolbar & Word Counter */}
            <div className="flex flex-col gap-2.5 pb-3 border-b border-stone-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Khung Soạn Thảo (Writing Pad)
                  </span>
                  {lastSavedTime && (
                    <span className="text-[10px] text-stone-400 flex items-center gap-1">
                      <Save className="w-3 h-3 text-emerald-500" />
                      {lastSavedTime}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Anti-Paste CBT Mode Toggle (Study4 CBT Hall) */}
                  <button
                    type="button"
                    onClick={() => setPreventPaste(!preventPaste)}
                    title={preventPaste ? 'Đang bật chế độ phòng thi CBT: Chặn dán văn bản' : 'Cho phép dán văn bản tự do'}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition flex items-center gap-1.5 ${
                      preventPaste
                        ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 shadow-xs'
                        : 'bg-stone-50 dark:bg-slate-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-slate-700'
                    }`}
                  >
                    {preventPaste ? (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>🛡️ Chặn Paste (CBT: Bật)</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>🔓 Cho phép Paste</span>
                      </>
                    )}
                  </button>

                  {/* Word Count Indicator */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black transition ${
                      wordCount >= targetWords
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800'
                    }`}
                  >
                    {wordCount} / {targetWords} từ
                  </span>
                </div>
              </div>

              {/* Dynamic Target Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-stone-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      wordCount >= targetWords
                        ? 'bg-emerald-500'
                        : wordCount >= targetWords * 0.6
                        ? 'bg-indigo-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.round((wordCount / targetWords) * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-stone-400 font-semibold px-0.5">
                  <span>0 từ</span>
                  <span>Mốc 50% ({Math.round(targetWords * 0.5)} từ)</span>
                  <span className={wordCount >= targetWords ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                    {wordCount >= targetWords ? `✓ Đạt mục tiêu (${wordCount} từ)` : `Mục tiêu ${targetWords} từ (còn ${targetWords - wordCount})`}
                  </span>
                </div>
              </div>
            </div>

            {/* Textarea Editor with Study4 Anti-Paste Enforcement */}
            <textarea
              value={essayText}
              onChange={e => handleTextChange(e.target.value)}
              onPaste={e => {
                if (preventPaste) {
                  e.preventDefault();
                  alert(
                    "🛡️ QUY CHẾ THI CBT STUDY4:\n\nTính năng Dán văn bản (Paste) đã được khóa để bạn tự gõ phím rèn luyện tốc độ thực tế trong phòng thi IELTS on Computer.\n\n(Bạn có thể bấm nút '🛡️ Chặn Paste (CBT)' trên thanh công cụ để tạm mở khóa nếu muốn dán văn bản)."
                  );
                }
              }}
              placeholder={`Bắt đầu soạn thảo bài viết của bạn tại đây... Hãy chú ý phân tách thành các đoạn văn rõ ràng (nhấn Enter hai lần để xuống dòng mới). Đạt tối thiểu ${targetWords} từ để bài viết được đánh giá đầy đủ thang điểm.`}
              className="w-full flex-1 min-h-[380px] p-4 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-950 text-stone-900 dark:text-white text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-4 mt-3 border-t border-stone-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                if (confirm('Bạn có chắc muốn xóa toàn bộ nội dung đang viết để làm lại từ đầu?')) {
                  setEssayText('');
                  setWordCount(0);
                  localStorage.removeItem(draftKey);
                }
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại từ đầu</span>
            </button>

            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition flex items-center gap-2"
            >
              {isEvaluating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang chấm điểm 4 tiêu chí IELTS...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Nộp Bài & Đánh Giá Tiêu Chuẩn IELTS</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Structured Writing Evaluation Modal */}
      {showEvaluationModal && evaluationResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
              <div>
                <span className="text-[11px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Báo Cáo Phân Tích Chuyên Sâu IELTS Writing
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                    Ước tính Điểm Tổng: Band {evaluationResult.overallBand.toFixed(1)}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    Điểm ước tính rèn luyện
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowEvaluationModal(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Tabs */}
            <div className="px-6 pt-3 border-b border-stone-200 dark:border-slate-800 flex gap-4 text-xs font-bold">
              {[
                { id: 'feedback', label: 'Chi tiết 4 tiêu chí chính thức' },
                { id: 'comparison', label: 'Đối chiếu Bài viết & Bài mẫu Band 8.5' },
                { id: 'paragraphs', label: 'Phân tích cấu trúc từng đoạn' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDiffTab(tab.id as typeof activeDiffTab)}
                  className={`pb-3 border-b-2 transition ${
                    activeDiffTab === tab.id
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-black'
                      : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              {activeDiffTab === 'feedback' && (
                <>
                  {/* 4 Official Dimensions Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 1. Task Response */}
                    <div className="p-4 rounded-2xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-950/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-stone-900 dark:text-white">
                          Task Achievement / Response
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 font-black text-indigo-700 dark:text-indigo-300">
                          Band {evaluationResult.taskResponseOrAchievement.band.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                        {evaluationResult.taskResponseOrAchievement.feedbackVi}
                      </p>
                    </div>

                    {/* 2. Coherence and Cohesion */}
                    <div className="p-4 rounded-2xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-950/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-stone-900 dark:text-white">
                          Coherence and Cohesion
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 font-black text-indigo-700 dark:text-indigo-300">
                          Band {evaluationResult.coherenceAndCohesion.band.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                        {evaluationResult.coherenceAndCohesion.feedbackVi}
                      </p>
                    </div>

                    {/* 3. Lexical Resource */}
                    <div className="p-4 rounded-2xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-950/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-stone-900 dark:text-white">
                          Lexical Resource (Từ vựng)
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 font-black text-indigo-700 dark:text-indigo-300">
                          Band {evaluationResult.lexicalResource.band.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                        {evaluationResult.lexicalResource.feedbackVi}
                      </p>
                    </div>

                    {/* 4. Grammatical Range and Accuracy */}
                    <div className="p-4 rounded-2xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-950/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-stone-900 dark:text-white">
                          Grammatical Range & Accuracy
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 font-black text-indigo-700 dark:text-indigo-300">
                          Band {evaluationResult.grammaticalRangeAndAccuracy.band.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                        {evaluationResult.grammaticalRangeAndAccuracy.feedbackVi}
                      </p>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                      <h4 className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Điểm mạnh ghi nhận:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-emerald-900 dark:text-emerald-200 text-[11px]">
                        {evaluationResult.strengths.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
                      <h4 className="font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" /> Điểm cần ưu tiên cải thiện:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-amber-900 dark:text-amber-200 text-[11px]">
                        {evaluationResult.weaknesses.map((w, idx) => (
                          <li key={idx}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {activeDiffTab === 'comparison' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Learner's Draft */}
                  <div className="p-4 rounded-2xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 space-y-2">
                    <strong className="block text-xs uppercase tracking-wider text-stone-500">
                      Bản thảo của bạn ({wordCount} từ):
                    </strong>
                    <div className="text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed font-sans text-xs">
                      {essayText}
                    </div>
                  </div>

                  {/* Band 8.5 Model Revision */}
                  <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-2">
                    <strong className="block text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Bài mẫu đối chiếu Band 8.5 (Model Essay):
                    </strong>
                    <div className="text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed font-sans text-xs">
                      {evaluationResult.modelRevision}
                    </div>
                  </div>
                </div>
              )}

              {activeDiffTab === 'paragraphs' && (
                <div className="space-y-3">
                  {evaluationResult.paragraphAnalysis.map(pa => (
                    <div
                      key={pa.paragraphIndex}
                      className="p-3.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/60 dark:bg-slate-950/60 space-y-1"
                    >
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-xs">
                        {pa.role}
                      </span>
                      <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                        {pa.feedbackVi}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between bg-stone-50 dark:bg-slate-950 text-xs">
              <span className="text-[11px] text-stone-500 italic">
                * Thang điểm trên là kết quả chẩn đoán tự động của LINGORA, không thay thế chứng chỉ chính thức của IDP / British Council.
              </span>
              <button
                onClick={() => setShowEvaluationModal(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Đóng báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
