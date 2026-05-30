import React, { useState, useEffect } from 'react';
import { LessonId } from './types';
import LessonsList from './components/LessonsList';
import LessonGeographics from './components/LessonGeographics';
import LessonHistory from './components/LessonHistory';
import LessonModern from './components/LessonModern';
import LessonWorkbook from './components/LessonWorkbook';
import { Library, CheckCircle2, BookOpen, AlertCircle, Compass } from 'lucide-react';

export default function App() {
  const [activeLesson, setActiveLesson] = useState<LessonId>('lesson1');
  const [completedLessons, setCompletedLessons] = useState<Set<LessonId>>(new Set());

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
    </div>
  );
}
