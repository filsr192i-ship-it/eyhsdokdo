import React, { useState } from 'react';
import { History, Shield, CheckCircle, AlertTriangle, ChevronRight, HelpCircle } from 'lucide-react';
import { MODERN_EVENTS } from '../data/lessons';

interface QuizCard {
  myth: string;
  fact: string;
  explanation: string;
}

const MYTH_FACTS: QuizCard[] = [
  {
    myth: '“샌프란시스코 강화조약 반환 리스트 조문에 ‘독도’가 누락되었으니 일본 영토에 머무는 것이 맞다?”',
    fact: '명확한 역사적 왜곡입니다.',
    explanation: '강화조약 초기 수차례의 연합국 실무 초안 양식에는 분명히 반환 영토 리스트에 독도가 기록되어 있었습니다. 최종안에서 주변 수많은 섬 중 대표 3대 도서(제주도, 거문도, 울릉도)만 요약적으로 병기하면서 빠진 조항적 생략일 뿐이며, 2차 대전 종전 및 연합국 SCAPIN 677 영토 획정의 원칙을 그대로 수용한 한국 고유 영토의 반환 연장선입니다.',
  },
  {
    myth: '“1998년 신한일어업협정에서 독도를 공동 어업 통제 구역인 ‘중간수역’에 편입한 것은 영토 주권 포기다?”',
    fact: '법률적 왜곡입니다.',
    explanation: '어업 협정(Fisheries Agreement)은 배타적 자원 확보 수역에 관련하여 조정한 어업 실무 조약일 뿐이며, 주권(Sovereignty, 영토의 고유 한계)의 향배와는 법적으로 완전히 무관함을 조약서 자체에 제15조 명문으로 규정하고 있습니다. 독도는 여전히 대한민국 영토 관할이며 우리 경찰이 상주하고 있습니다.',
  },
  {
    myth: '“대한민국이 법적 권원 없이 독도를 무단 점거하고 분쟁 지역화하고 있다?”',
    fact: '사실무근인 선동적 주장입니다.',
    explanation: '대한민국은 512년 이래 역사적 무중단 실효지배, 대한제국 칙령 제41호 근대 국가적 법제화, 패전국 일본을 규제한 연합국 SCAPIN 677 행정령 복귀 조치에 의거해 자국 영토를 합법적이고 평화적으로 사수하고 있는 것입니다.'
  }
];

export default function LessonModern() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [showFact, setShowFact] = useState<boolean>(false);
  const [mythIdx, setMythIdx] = useState<number>(0);

  const activeEvent = MODERN_EVENTS[activeIdx] || MODERN_EVENTS[0];

  const handleNextMyth = () => {
    setShowFact(false);
    setMythIdx((prev) => (prev + 1) % MYTH_FACTS.length);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* 3.1 ~ 3.3 현대 사건 상세 검토 */}
      <section className="bg-[#111111] rounded-2xl border border-white/5 p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-light text-white flex items-center gap-2 font-serif">
            <History className="w-5 h-5 text-[#A1824A]" />
            3.0 현대 독도 갈등의 전개와 주권 수호 노력
          </h3>
          <p className="text-white/50 text-xs mt-1 font-light">
            2차 대전 전후 영토 처리에서 비롯된 국제 조약적 틈새와, 200해리 EEZ 체제 도입으로 인한 영유 갈등 역사를 입체적으로 규명합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 타임라인 목록 사이드 */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {MODERN_EVENTS.map((evt, idx) => (
              <button
                key={evt.title}
                onClick={() => setActiveIdx(idx)}
                className={`text-left p-3 rounded-xl border transition text-xs flex items-center justify-between cursor-pointer ${
                  activeIdx === idx 
                    ? 'bg-[#A1824A] border-[#A1824A] text-black font-semibold shadow-xs' 
                    : 'bg-[#161616]/40 border-white/5 text-[#F5F5F5]/60 hover:bg-[#1A1A1A]/80'
                }`}
              >
                <div className="space-y-0.5 max-w-[90%]">
                  <div className={`text-[9px] font-mono uppercase tracking-wider ${activeIdx === idx ? 'text-black/70' : 'text-white/30'}`}>
                    {evt.period}
                  </div>
                  <div className="font-semibold font-display truncate">{evt.title}</div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 ${activeIdx === idx ? 'text-black/75' : 'text-white/30'}`} />
              </button>
            ))}
          </div>

          {/* 타임라인 바디 상세 */}
          <div className="lg:col-span-8 bg-[#0D0D0D] rounded-2xl border border-white/5 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-[#A1824A] font-bold tracking-wider uppercase block">{activeEvent.period}</span>
                <h4 className="text-lg font-light text-white font-serif mt-0.5">{activeEvent.title}</h4>
              </div>

              <div className="text-xs text-white/60 leading-relaxed font-light">
                {activeEvent.description}
              </div>

              {/* 핵심 요약 포인트 */}
              <div className="bg-[#161616]/50 border border-white/5 rounded-xl p-4 mt-2">
                <span className="text-xs font-medium text-white flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2 font-serif">
                  <Shield className="w-4 h-4 text-[#A1824A]" />
                  주요 핵심 쟁점과 실효 팩트:
                </span>
                <ul className="space-y-2">
                  {activeEvent.keyPoints.map((point, pIndex) => (
                    <li key={pIndex} className="text-xs text-white/60 flex items-start gap-2 font-light">
                      <CheckCircle className="w-3.5 h-3.5 text-[#A1824A] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 대조 팩트체커 코너 */}
      <section className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#0A0A0A] rounded-2xl text-white p-6 border border-white/5 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#A1824A]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-[#A1824A]" />
          <div>
            <h4 className="text-base font-medium font-serif uppercase tracking-wide">현대 독도 루머 &amp; 팩트 체커 <span className="italic text-[#A1824A]">(Myth vs Fact)</span></h4>
            <p className="text-[11px] text-white/40 font-light">잘못 전달되는 자구 오독이나 억지 쟁점을 팩트 사료에 비추어 바로잡습니다.</p>
          </div>
        </div>

        <div className="bg-[#0D0D0D] border border-white/5 rounded-xl p-5 flex flex-col justify-between min-h-[180px]">
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-xs text-[#C5A870] font-light">
              <AlertTriangle className="w-4 h-4 text-[#A1824A] shrink-0 mt-0.5" />
              <span>
                <strong className="font-serif italic text-white mr-1">주장 / 왜곡 (Myth):</strong> {MYTH_FACTS[mythIdx].myth}
              </span>
            </div>

            {showFact ? (
              <div className="bg-[#161616] border border-white/5 rounded-lg p-3 text-xs leading-relaxed animate-fade-in text-white/70 font-light scale-98 transition-all">
                <span className="font-semibold text-[#A1824A] block mb-1">✓ 진실 사료 증명 (Fact): {MYTH_FACTS[mythIdx].fact}</span>
                {MYTH_FACTS[mythIdx].explanation}
              </div>
            ) : (
              <div className="h-10 flex items-center justify-center">
                <span className="text-[11px] text-white/30 font-light">아래 검정 버튼을 눌러 역사적 사실 관계를 도출하세요.</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
            <span className="text-[10px] font-mono text-white/30 font-light">진실 검정 카드 {mythIdx + 1} / {MYTH_FACTS.length}</span>
            <div className="flex gap-2">
              {!showFact ? (
                <button 
                  onClick={() => setShowFact(true)}
                  className="bg-[#A1824A] hover:bg-[#b0965d] text-black font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition cursor-pointer"
                >
                  팩트 검정하기
                </button>
              ) : (
                <button 
                  onClick={handleNextMyth}
                  className="bg-white/5 hover:bg-white/10 text-white/80 font-medium text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition cursor-pointer border border-white/5"
                >
                  다음 반박 보기
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
