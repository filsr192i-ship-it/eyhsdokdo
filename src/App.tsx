import React, { useState, useEffect } from 'react';
import { LessonId } from './types';
import LessonsList from './components/LessonsList';
import LessonGeographics from './components/LessonGeographics';
import LessonHistory from './components/LessonHistory';
import LessonModern from './components/LessonModern';
import LessonWorkbook from './components/LessonWorkbook';
import { Library, CheckCircle2, BookOpen, AlertCircle, Compass, Sparkles, X, Clipboard, Check, Loader2, RefreshCw } from 'lucide-react';

const DOKDO_KEYWORDS = [
  { term: '세종실록지리지', category: '역사 사료', desc: '울진 우산무릉 2도 명확하게 규정' },
  { term: '태정관지령', category: '역사 사료', desc: '독도는 주권 영역 외지대임 선언' },
  { term: '안용복 도일 교섭', category: '민간 축쟁', desc: '에도 막부로부터 국경 표지 확보 공적' },
  { term: '배타적경제수역(EEZ)', category: '국제해양법', desc: '어업 무대를 둘러싼 한일 조율과 협량' },
  { term: '지리적 인접성', category: '지리 요건', desc: '맑은 날 울릉도에서 관측 가능한 필연성' },
  { term: 'SCAPIN 677', category: '전후 정리', desc: '연합국 사령부가 일본 영토 분할 배제' },
  { term: '실효적 지배', category: '통치 실체', desc: '경비대 상주 및 공적 주민생활 인프라 구축' },
  { term: '한일 청소년 평화상생', category: '미래 세대', desc: '상호 비방을 넘어 공동 번영 교육 성찰' }
];

export default function App() {
  const [activeLesson, setActiveLesson] = useState<LessonId>('lesson1');
  const [completedLessons, setCompletedLessons] = useState<Set<LessonId>>(new Set());

  // Google AI Reflection helper states
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');
  const [copied, setCopied] = useState(false);

  // Load progress from local storage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('dokdo_lessons_completed');
    if (savedProgress) {
      try {
        setCompletedLessons(new Set(JSON.parse(savedProgress)));
      } catch (e) {
        console.error('Failed to parse completed lessons', e);
      }
    } else {
      // By default, start with lesson1 as uncompleted
    }
  }, []);

  // Update completed lessons when viewing a topic
  const handleSelectLesson = (id: LessonId) => {
    setActiveLesson(id);
    
    // Mark the previous active lesson as completed when switching from it
    if (id !== activeLesson) {
      const nextCompleted = new Set(completedLessons);
      nextCompleted.add(activeLesson);
      setCompletedLessons(nextCompleted);
      localStorage.setItem('dokdo_lessons_completed', JSON.stringify(Array.from(nextCompleted)));
    }
  };

  // Google AI Generation methods
  const handleGenerateReflection = async () => {
    if (!keywords.trim()) {
      setAiError('배운 키워드를 입력하거나 아래의 클래스 추천 키워드를 클릭해 채워 주세요.');
      return;
    }
    
    setIsGenerating(true);
    setAiError('');
    setGeneratedText('');
    setCopied(false);
    
    try {
      const response = await fetch('/api/generate-reflection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || '소감문을 생성하는 중 에러가 발생했습니다.');
      }
      
      setGeneratedText(data.text || '');
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || '서버와 연결을 실패했거나 알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleImportToWorkbook = () => {
    if (!generatedText) return;
    // Dispatch custom event to share state with Workbook
    window.dispatchEvent(new CustomEvent('dokdo_import_text', { detail: { text: generatedText } }));
    setIsAiModalOpen(false);
    setActiveLesson('workbook');
  };

  const progressPct = Math.round((completedLessons.size / 4) * 100);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans antialiased flex flex-col justify-between selection:bg-gold/20 selection:text-gold-light print:bg-white print:text-black">
      {/* 2026-05-30: Dokdo Sovereignty Education Unified Dashboard Header */}
      <header className="bg-[#0A0A0A] border-b border-white/10 py-6 px-4 sm:px-6 sticky top-0 z-40 shadow-xs no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#111111] text-[#A1824A] text-[9px] font-bold font-mono tracking-widest px-2.5 py-1 rounded border border-[#A1824A]/20 uppercase">
                2026년 5월 최신 개정판
              </span>
              <span className="bg-[#111111] text-white/60 text-[9px] px-2 py-1 rounded border border-white/10 font-medium">
                중·고등 역사 및 지리 융합 보조 교재
              </span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-serif font-light text-[#F5F5F5] tracking-wide flex items-center gap-2">
              <Library className="w-5 h-5 text-[#A1824A]" />
              독도 영토 주권 교육 <span className="italic text-[#A1824A]">종합 플랫폼</span>
            </h1>
            
            <p className="text-white/40 text-xs font-light">
              지리적 특성, 역사적 사료 및 한일 갈등의 객관적 증명 및 평화적 해결 협력론
            </p>
          </div>

          <div className="text-xs bg-[#111111] p-3 rounded-xl border border-white/10 flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A1824A] animate-pulse" />
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-mono text-white/30 block tracking-wider">주권 수호 교육기관</span>
              <span className="font-medium text-white/80 font-serif">대한민국 역사·지리 평화교육위원회</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Educational Application Workspace Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column - Nav & Study Status Indicator */}
        <aside className="lg:col-span-4 space-y-6 no-print">
          
          <LessonsList 
            activeLesson={activeLesson}
            onSelectLesson={handleSelectLesson}
            completedLessons={completedLessons}
          />

          {/* Gamified Study Progress Container */}
          <div className="bg-gradient-to-br from-[#111111] to-[#0A0A0A] text-white rounded-2xl p-5 border border-white/10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A1824A]/5 rounded-full blur-2xl pointer-events-none" />
            
            <h5 className="text-[10px] font-bold font-mono tracking-widest text-[#A1824A] uppercase">
              학습 주권 달성 지표
            </h5>
            
            <div className="flex justify-between items-baseline mt-4 mb-2">
              <span className="text-3xl font-light font-serif italic text-white">{progressPct}%</span>
              <span className="text-xs text-white/50 font-medium">
                {completedLessons.size} / 4 완료됨
              </span>
            </div>

            {/* Slider track progress */}
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-5">
              <div 
                className="bg-[#A1824A] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="space-y-3 font-light text-xs text-white/60">
              <div className="flex items-start gap-2 bg-[#1A1A1A]/40 border border-white/5 p-3 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A1824A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  각 차시별 주안점들을 차례로 읽고 워크북을 다 써서 평화집필 수료 서명을 발급하세요.
                </span>
              </div>

              <div className="p-3 bg-[#1A1A1A]/20 border border-white/5 rounded-xl flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-white/30 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed text-white/40">
                  본 교재 일체는 국가 수준의 공인 고문서(태정관 지령, 세종실록) 및 시각 사료에 의거해 엄정하게 직조되어 교육적 논점을 지원합니다.
                </span>
              </div>
            </div>
          </div>

          {/* 구글 AI 소감문 도우미 trigger button */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="w-full bg-[#111111] hover:bg-[#161616] border border-[#A1824A]/30 hover:border-[#A1824A]/60 rounded-2xl p-4 transition-all duration-300 flex items-center gap-3 shadow-lg group relative overflow-hidden cursor-pointer no-print font-sans"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#A1824A]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#A1824A]/10 transition" />
            <div className="w-9 h-9 rounded-xl bg-[#A1824A]/10 text-[#A1824A] flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Sparkles className="w-4 h-4 animate-pulse text-[#C5A870]" />
            </div>
            <div className="text-left">
              <h5 className="text-xs font-semibold text-white flex items-center gap-1.5 font-serif">
                구글 AI 소감문 작성기
                <span className="bg-[#A1824A]/15 text-[#C5A870] text-[8px] font-bold px-1.5 py-0.5 rounded-sm shrink-0">AI 교사</span>
              </h5>
              <p className="text-[10px] text-white/40 mt-1 font-light leading-normal pr-2">
                배운 키워드로 평화 성찰 소감문 쓰기
              </p>
            </div>
          </button>
        </aside>

        {/* Right Column - Active Classroom Panel */}
        <section className="lg:col-span-8 space-y-6 print:col-span-12">
          {activeLesson === 'lesson1' && <LessonGeographics />}
          {activeLesson === 'lesson2' && <LessonHistory />}
          {activeLesson === 'lesson3' && <LessonModern />}
          {activeLesson === 'workbook' && <LessonWorkbook />}
        </section>

      </main>

      {/* Global Sandbox Application Footer */}
      <footer className="bg-[#0A0A0A] border-t border-white/10 py-6 px-4 text-center text-xs text-white/40 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className="font-light">
            © 2026 대한민국 역사·지리 평화교육위원회. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white/30">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#A1824A]" />
              학술 보조 자료 국문본
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#A1824A]" />
              미래 상생 교육연대
            </span>
          </div>
        </div>
      </footer>

      {/* Google AI Reflection Assistant Modal Overlay */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in no-print font-sans select-none">
          <div className="bg-[#111111] rounded-2xl border border-[#A1824A]/20 max-w-2xl w-full p-6 text-left relative overflow-hidden shadow-2xl flex flex-col md:max-h-[90vh] max-h-[95vh]">
            {/* Modal top gold accent banner */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A1824A] to-transparent" />
            <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#A1824A]/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-4 pb-3 border-b border-white/10 shrink-0">
              <div className="space-y-1 pr-6">
                <span className="bg-[#A1824A]/10 text-[#C5A870] text-[9px] font-bold font-mono tracking-widest px-2.5 py-0.5 rounded-full uppercase border border-[#A1824A]/25 inline-flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#C5A870]" /> Google Gemini AI
                </span>
                <h4 className="text-lg font-light text-white font-serif mt-1">
                  독도 역사평화 수업 <span className="italic text-[#A1824A]">소감문 작문기</span>
                </h4>
                <p className="text-white/40 text-[11px] font-light">
                  차시 수업에서 발견한 핵심 단어를 입력하고, 주권 수호와 미래지향적 평화성찰을 고백하는 소감문을 써보세요.
                </p>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="text-white/40 hover:text-white p-1 hover:bg-white/5 rounded-lg transition duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">
              {/* Keyword preset selector block */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold block">클래스 추천 키워드 (클릭하여 신속 추가)</span>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-0.5">
                  {DOKDO_KEYWORDS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        // Add keyword
                        const trimmed = keywords.trim();
                        if (!trimmed) {
                          setKeywords(item.term);
                        } else {
                          const list = trimmed.split(',').map(s => s.trim()).filter(Boolean);
                          if (!list.includes(item.term)) {
                            setKeywords([...list, item.term].join(', '));
                          }
                        }
                      }}
                      className="group/pill text-left bg-white/5 hover:bg-[#A1824A]/10 hover:border-[#A1824A]/30 border border-white/5 rounded-lg px-2.5 py-1.5 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#C5A870] text-[10px] font-semibold tracking-wide font-sans">{item.term}</span>
                        <span className="text-[8px] bg-white/10 text-white/50 px-1 py-0.1 select-none font-mono rounded-sm font-light uppercase">{item.category}</span>
                      </div>
                      <p className="text-[8px] text-white/30 group-hover/pill:text-white/50 leading-none mt-1 pl-0.5 font-light max-w-[200px] truncate">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyword Textarea input field */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">입력할 소감문 학습 키워드들</label>
                <textarea
                  rows={2}
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="예: 태정관지령, 배타적경제수역, 안용복 도일 교섭 (자유롭게 입력하거나 위 키워드들을 클릭해 채우세요)"
                  className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:bg-[#1C1C1C] focus:ring-1 focus:ring-[#A1824A] focus:border-[#A1824A] transition outline-none resize-none font-sans"
                />
              </div>

              {/* Error messages if any */}
              {aiError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-4 py-3 rounded-xl flex items-start gap-2 animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-light">{aiError}</span>
                </div>
              )}

              {/* Action Buttons to trigger generation */}
              <div className="flex gap-2 justify-end shrink-0 pt-1">
                <button
                  type="button"
                  onClick={() => setKeywords('')}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 text-xs rounded-xl border border-white/5 transition cursor-pointer"
                >
                  입력 초기화
                </button>
                <button
                  type="button"
                  disabled={isGenerating || !keywords.trim()}
                  onClick={handleGenerateReflection}
                  className="px-5 py-2.5 bg-[#A1824A] hover:bg-[#b0965d] disabled:bg-[#A1824A]/25 disabled:text-white/30 text-black font-bold text-xs rounded-xl transition duration-200 flex items-center gap-2 cursor-pointer shadow-sm shadow-[#A1824A]/10"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      구글 AI가 소감문 집필 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      소감문 초안 생성하기
                    </>
                  )}
                </button>
              </div>

              {/* Render generation result or loader mockup */}
              {(isGenerating || generatedText) && (
                <div className="bg-[#161616]/40 border border-white/5 rounded-xl p-5 relative overflow-hidden min-h-[160px] flex flex-col justify-between">
                  <div className="absolute top-2 right-2 text-[8px] font-mono tracking-widest text-[#A1824A] uppercase selection:bg-transparent">
                    GENERATED DRAFT BY GOOGLE AI
                  </div>
                  
                  <div className="flex-1 mt-2">
                    {isGenerating ? (
                      <div className="space-y-4 animate-pulse mt-4">
                        <div className="h-3.5 bg-white/10 rounded-xs w-4/5" />
                        <div className="h-3.5 bg-white/5 rounded-xs w-[92%]" />
                        <div className="h-3.5 bg-white/5 rounded-xs w-2/3" />
                        <p className="text-[10px] text-[#A1824A]/70 text-center italic mt-1 font-sans">
                          구글 제미나이(Gemini 3.5 Flash)가 역사 논조와 공문서 교차 고찰 수칙을 분석 중...
                        </p>
                      </div>
                    ) : (
                      <div className="text-white/90 text-xs leading-relaxed whitespace-pre-line font-serif pr-2 animate-fade-in max-h-[180px] overflow-y-auto">
                        {generatedText}
                      </div>
                    )}
                  </div>

                  {!isGenerating && generatedText && (
                    <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap justify-between items-center gap-2">
                      <span className="text-[10px] text-white/30 font-light font-sans">
                        작성 글자수: <strong className="text-[#A1824A]/80 font-medium">{generatedText.length}</strong> 자 (워크북 공동집필란에 최적화됨)
                      </span>
                      
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 font-medium text-[11px] rounded-lg border border-white/5 flex items-center gap-1 transition duration-200 cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              복사되었습니다
                            </>
                          ) : (
                            <>
                              <Clipboard className="w-3 h-3 text-white/60" />
                              클립보드 복사
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleImportToWorkbook}
                          className="px-3.5 py-1.5 bg-[#A1824A]/15 hover:bg-[#A1824A]/25 text-[#C5A870] font-bold text-[11px] rounded-lg border border-[#A1824A]/30 flex items-center gap-1 transition duration-200 cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3 text-[#A1824A]" />
                          활동지 본문에 채우기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
