import React, { useState } from 'react';
import { BookOpen, Map, Archive, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { KOREAN_DOCS, JAPANESE_DOCS, MAP_FACTS, TIMELINE_EVENTS } from '../data/lessons';

export default function LessonHistory() {
  const [activeDocTab, setActiveDocTab] = useState<'korea' | 'japan'>('korea');
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [timelineStep, setTimelineStep] = useState<number>(0);

  const docsToRender = activeDocTab === 'korea' ? KOREAN_DOCS : JAPANESE_DOCS;
  const activeDoc = docsToRender[selectedIdx] || docsToRender[0];

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* 2.1 & 2.2 고문서 검토 및 대조 */}
      <section className="bg-[#111111] rounded-2xl border border-white/5 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-xl font-light text-white flex items-center gap-2 font-serif">
              <Archive className="w-5 h-5 text-[#A1824A]" />
              2.1 &amp; 2.2 한·일 고문서 역설과 사실 검정
            </h3>
            <p className="text-white/50 text-xs mt-1 font-light">
              양측의 국가 공식 관찬 고문서를 객관적으로 정렬하고 독도의 실효적 영속 주권을 사료 검증합니다.
            </p>
          </div>

          <div className="flex bg-[#1A1A1A] p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => { setActiveDocTab('korea'); setSelectedIdx(0); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${activeDocTab === 'korea' ? 'bg-[#A1824A] text-black shadow-xs' : 'text-white/40 hover:text-white'}`}
            >
              대한민국 사료 증명
            </button>
            <button 
              onClick={() => { setActiveDocTab('japan'); setSelectedIdx(0); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${activeDocTab === 'japan' ? 'bg-[#A1824A] text-black shadow-xs' : 'text-white/40 hover:text-white'}`}
            >
              일본 관찬문서 고백
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 사료 버튼 셀렉터 */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {docsToRender.map((doc, idx) => (
              <button
                key={doc.title}
                onClick={() => setSelectedIdx(idx)}
                className={`text-left p-3.5 rounded-xl border transition text-xs flex flex-col justify-center gap-1.5 cursor-pointer ${
                  selectedIdx === idx 
                    ? 'bg-[#1A1A1A] border-[#A1824A] text-white shadow-2xs font-semibold' 
                    : 'bg-[#161616]/40 border-white/5 text-white/50 hover:bg-[#1A1A1A]'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-display font-medium text-white">{doc.title}</span>
                  <span className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-mono text-white/40">
                    {doc.year}
                  </span>
                </div>
                <span className="text-[11px] text-white/35 font-light line-clamp-1">{doc.context}</span>
              </button>
            ))}
          </div>

          {/* 사료 분석 뷰어 */}
          <div className="lg:col-span-8 bg-[#0D0D0D] rounded-2xl border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#A1824A]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs text-[#A1824A] font-semibold uppercase tracking-wider font-mono">
                <BookOpen className="w-3.5 h-3.5" />
                <span>PRIMARY SOURCES RECORD</span>
              </div>

              <div>
                <span className="text-xs text-white/30 font-mono block">{activeDoc.context}</span>
                <h4 className="text-xl font-light text-white font-serif mt-0.5">{activeDoc.title} ({activeDoc.year})</h4>
              </div>

              {/* 원문 번역 구절 */}
              <div className="bg-[#161616] border-l-3 border-[#A1824A] rounded-r-xl p-4 shadow-3xs">
                <p className="text-white/80 text-sm leading-relaxed italic font-serif">
                  {activeDoc.content}
                </p>
              </div>

              {/* 사료의 핵심 가치 / 의의 */}
              <div className="pt-2">
                <span className="text-xs font-medium text-[#A1824A] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A1824A] shrink-0" />
                  역사적 핵심 입증 의의:
                </span>
                <p className="text-white/60 text-xs mt-1.5 leading-relaxed bg-[#161616]/40 border border-white/5 p-3 rounded-lg font-light">
                  {activeDoc.significance}
                </p>
              </div>
            </div>

            {/* 교차 분석 대조 팁 */}
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-white/40 flex items-center gap-1.5 font-light">
              <span className="bg-[#A1824A]/10 text-[#C5A870] font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-wide text-[9px] border border-[#A1824A]/20">CROSS ANALYSIS</span>
              <span>
                {activeDocTab === 'korea' 
                  ? '조선 조정 및 대한제국은 국제법상 명백한 관할 지배권을 주도하여 문헌화했습니다.' 
                  : '메이지 외무성 보고서 및 총리 기관 지령은 자진하여 독도 영유를 원천 부인하고 있습니다.'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2.3 고지도(Map) 대조 분석 */}
      <section className="bg-[#111111] rounded-2xl border border-white/5 p-6 shadow-sm">
        <h3 className="text-xl font-light text-white flex items-center gap-2 mb-4 font-serif">
          <Map id="map-icon" className="w-5 h-5 text-[#A1824A]" />
          2.3 역사적 고지도(Old Map) 대조 분석
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
          고지도는 당대 국가 관료와 학자들이 한반도 주변 해안과 영토적 영역을 어떻게 시각적으로 인식했는지 가감 없이 증명하는 지질학적 기록입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          {MAP_FACTS.map((map, index) => (
            <div 
              key={map.title} 
              className="bg-[#161616]/40 rounded-xl border border-white/5 p-5 hover:border-[#A1824A]/30 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className="text-[10px] font-mono text-[#C5A870] font-bold tracking-wider uppercase bg-[#A1824A]/10 px-2 py-0.5 rounded border border-[#A1824A]/25">
                    {map.year} · {map.author}
                  </span>
                </div>
                <h4 className="text-base font-medium text-white font-serif mb-1">{map.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed mb-4 font-light">{map.description}</p>
              </div>

              <div className="bg-[#0D0D0D] border border-white/5 rounded-xl p-3.5 shadow-3xs mt-2">
                <span className="text-xs font-medium text-[#C5A870] flex items-center gap-1 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A1824A]" />
                  영유권 입증 증거
                </span>
                <p className="text-[11px] leading-relaxed text-white/50 font-light">
                  {map.sovereigntyProof}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.4 안용복 사건과 한·일 외교 교섭 */}
      <section className="bg-[#111111] rounded-2xl border border-white/5 p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-light text-white flex items-center gap-2 font-serif">
            <HelpCircle className="w-5 h-5 text-[#A1824A]" />
            2.4 민간 의인 안용복의 도일(渡日) 외교 투쟁과 공백의 해법
          </h3>
          <p className="text-white/50 text-xs mt-1 font-light">
            평범한 조선 어부 안용복의 자주적 도일 항의는 막부의 수평적 법정 답변 및 독도 공식 배제 금지령을 이끌어냈습니다.
          </p>
        </div>

        {/* 가로형 타임라인 노드 */}
        <div className="grid grid-cols-4 gap-2 mb-6 bg-[#161616] p-1.5 rounded-xl border border-white/5">
          {TIMELINE_EVENTS.map((evt, idx) => (
            <button
              key={evt.step}
              onClick={() => setTimelineStep(idx)}
              className={`py-2 px-1 text-center rounded-lg transition duration-200 flex flex-col items-center justify-center cursor-pointer ${
                timelineStep === idx 
                  ? 'bg-[#A1824A] text-black font-semibold shadow-sm' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-[9px] font-mono tracking-wider opacity-80">{evt.step}</span>
              <span className="text-xs font-medium hidden sm:inline whitespace-nowrap overflow-hidden text-ellipsis w-full max-w-[120px]">
                {evt.title}
              </span>
            </button>
          ))}
        </div>

        {/* 활성화된 타임라인 설명 바디 */}
        <div className="bg-[#0D0D0D] rounded-xl border border-white/5 p-5 flex flex-col md:flex-row gap-5 items-stretch">
          <div className="md:w-1/3 bg-[#161616] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-white/30 block tracking-wider uppercase font-semibold">HISTORICAL TIMELINE</span>
              <h4 className="text-base font-medium text-white font-serif mt-1">{TIMELINE_EVENTS[timelineStep].title}</h4>
              <span className="inline-block bg-[#A1824A]/10 text-[#C5A870] text-xs font-mono font-bold px-2.5 py-0.5 rounded border border-[#A1824A]/25 mt-2">
                {TIMELINE_EVENTS[timelineStep].year}
              </span>
            </div>
            
            <div className="mt-6 flex items-center justify-between text-xs text-white/30 font-light pt-4 border-t border-white/5">
              <span>단계 Progression:</span>
              <strong className="text-[#A1824A] font-mono">{timelineStep + 1} / 4</strong>
            </div>
          </div>

          <div className="md:w-2/3 flex flex-col justify-between">
            <p className="text-white/60 text-xs leading-[1.65] font-light">
              {TIMELINE_EVENTS[timelineStep].description}
            </p>

            <div className="mt-4 flex justify-between items-center bg-[#161616] p-3 rounded-lg border border-white/5">
              <span className="text-[10px] text-[#A1824A] font-semibold font-mono tracking-wider">NEXT STAGE PROGRESS</span>
              <button 
                onClick={() => setTimelineStep((prev) => (prev + 1) % 4)}
                className="text-xs text-[#C5A870] font-medium flex items-center gap-1 hover:text-[#A1824A] transition cursor-pointer"
              >
                다음 사건 확인하기
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
