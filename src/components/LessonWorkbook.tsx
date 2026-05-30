import React, { useState, useEffect } from 'react';
import { FileText, Save, RefreshCw, PenTool, Award, Share2, Printer, Check } from 'lucide-react';
import { WorkbookState } from '../types';

const INITIAL_STATE: WorkbookState = {
  koreanStudent: '',
  japaneseStudent: '',
  unitTitle: '',
  jointText: '',
  evaluatorFeedback: '',
  evaluatorName: '대한민국 역사·지리 평화교육위원회',
  discussionAnswers: {
    q1: '',
    q2: '',
    q3: ''
  }
};

const DEFAULT_EXAMPLE = {
  koreanStudent: '한민우 (서울고등학교)',
  japaneseStudent: '사토 다케시 (도쿄중학교)',
  unitTitle: '하늘과 바다로 이어진 동해의 보석, 독도와 상생의 평화지대',
  jointText: `동해의 평화로운 섬 독도는 역사적 사료를 통해 그 지위가 증명된다. 한국의 『세종실록지리지(1454년)』에는 울릉도와 독도(우산)가 서로 거리가 멀지 않아 날씨가 맑으면 육안으로 관측 가능하다고 기록되어 양국의 고대 생활권과 인식을 보여준다. 또한, 일본 메이지 정부 최고 기관이 내린 『태정관 지령(1877년)』에서도 울릉도와 독도가 일본과 관계없는 조선의 영역임을 분명히 명시했다. 러일전쟁 중 일본에 의해 불법 편입되는 아픔을 겪기도 했으나, 2차 대전 후 연합국의 조치를 통해 한국의 관할로 환원되었다. 오늘날 양국은 배타적 경제수역(EEZ) 설정 과정에서 어업 갈등을 겪고 있으나, 영토 대립을 넘어 역사적 진실을 직시하고 동해를 평화와 공동 번영의 바다로 만들기 위해 상호 협력해야 한다.`,
  evaluatorFeedback: '지리적 육안 관측성과 태정관 지령이라는 명확한 1차 한일 사료를 교차 대조하여 설득력을 극대화했습니다. 감정론을 넘어 객관적 사료와 미래 상생을 도출한 모범적인 공동 집필 제안서입니다. 매우 훌륭합니다.',
  discussionAnswers: {
    q1: '일본 메이지 최고 권력 기관인 태정관 스스로가 주권조사 후 공식 국가 명령어로 ‘독도가 자국 영토가 아님’을 널리 명문화했기 때문에, 현대 일본이 당대부터 그것을 주권 영역으로 인지했다는 모순적인 성명을 무력화하는 최고 수위의 공적 부인 증거가 됩니다.',
    q2: '당시 UN해양법협약 발효로 200해리 EEZ 제도가 중첩되었는데, 어 자원 확보 및 시급한 경제 질서 조정을 완료하기 위해 독도 영유 다툼의 직접 타협은 유보(보류)한 채 어업 자원만을 보존 규제하고자 불가피하게 타협한 산물입니다.',
    q3: '왜곡된 학습 지도나 정치 선동을 넘어, 양국의 중학생들이 한자리에서 직접 역사 사료 원문을 교차 대조해 보면서 스스로 진실을 성찰하고 평화적인 해법의 공동 교안을 만들 수 있기 때문입니다.'
  }
};

export default function LessonWorkbook() {
  const [formData, setFormData] = useState<WorkbookState>(INITIAL_STATE);
  const [saved, setSaved] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    const savedData = localStorage.getItem('dokdo_workbook');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved workbook data', e);
      }
    }
  }, []);

  const handleInputChange = (field: keyof WorkbookState, value: any) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    localStorage.setItem('dokdo_workbook', JSON.stringify(next));
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const handleNestedInputChange = (qKey: 'q1' | 'q2' | 'q3', value: string) => {
    const nextAnswers = { ...formData.discussionAnswers, [qKey]: value };
    const next = { ...formData, discussionAnswers: nextAnswers };
    setFormData(next);
    localStorage.setItem('dokdo_workbook', JSON.stringify(next));
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const handleLoadExample = () => {
    setFormData(DEFAULT_EXAMPLE);
    localStorage.setItem('dokdo_workbook', JSON.stringify(DEFAULT_EXAMPLE));
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    localStorage.removeItem('dokdo_workbook');
    setShowCertificate(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const isWorkbookComplete = 
    formData.koreanStudent && 
    formData.japaneseStudent && 
    formData.unitTitle && 
    formData.jointText.length > 50;

  return (
    <div className="space-y-8 animate-fade-in font-sans print:bg-white print:p-0">
      {/* 활동지 개요 */}
      <section className="bg-[#111111] rounded-2xl border border-white/5 p-6 shadow-sm no-print">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#A1824A]/10 border border-[#A1824A]/20 p-2 rounded-lg text-[#A1824A]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-light text-white font-serif flex items-center gap-1.5">4.0 [수업 활동지] 한·일 평화 공동 교과서 집필관</h3>
              <p className="text-white/40 text-xs mt-0.5 font-light">사실(Fact)에 기반한 상호이해와 미래 지향적인 공동 초안을 작성하고 수료 하세요.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleLoadExample}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 text-xs font-medium rounded-lg flex items-center gap-1.5 transition border border-white/5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              모범 자습안 로드
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 text-xs font-semibold rounded-lg transition border border-rose-500/15 cursor-pointer"
            >
              초기화
            </button>
          </div>
        </div>

        {/* 작성 가이드라인 조항 */}
        <div className="bg-[#161616] rounded-xl p-4 border border-white/5 text-xs text-white/50 space-y-2 leading-relaxed font-light">
          <span className="font-semibold text-white/80 block font-serif">✦ 서술 제안서 집필 수칙:</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="bg-[#0D0D0D] p-2.5 rounded border border-white/5">
              <strong className="text-white font-medium">1. 고문서 제시</strong>: 태정관 지령, 세종실록지리지 등 중세기 사문서 최소 2개 이상을 반드시 역사적 논지로 인용할 것.
            </div>
            <div className="bg-[#0D0D0D] p-2.5 rounded border border-white/5">
              <strong className="text-white font-medium">2. 감정성 배제</strong>: 일방적인 왜곡 비난에 치우치지 않고 객관적 팩트 위주와 평화 번영적 관점 유지를 지향할 것.
            </div>
            <div className="bg-[#0D0D0D] p-2.5 rounded border border-white/5">
              <strong className="text-white font-medium">3. 분량 통제</strong>: 제안 한계를 준수해 핵심 10줄 이내(약 300자) 내외로 선별적 서술할 것.
            </div>
          </div>
        </div>
      </section>

      {/* 활동 일지 본문 쓰기 영역 */}
      <section className="bg-[#111111] rounded-2xl border border-white/5 p-6 shadow-sm relative print:border-none print:shadow-none print:p-0">
        <div className="absolute top-4 right-4 text-xs font-mono text-white/30 flex items-center gap-1.5 no-print">
          {saved && (
            <span className="text-[#C5A870] flex items-center gap-1 bg-[#A1824A]/10 border border-[#A1824A]/20 px-2 py-0.5 rounded font-semibold font-sans animate-fade-in transition">
              <Check className="w-3 h-3" />
              자동 저장됨
            </span>
          )}
          <Save className="w-4 h-4 text-white/20" />
        </div>

        <div className="border-b border-white/10 pb-3 mb-6">
          <h4 className="text-[#F5F5F5] font-serif tracking-wider text-center text-lg uppercase">한·일 학생 공동 역사 교과서 - 독도 서술 제안서</h4>
          <span className="text-[10px] text-white/30 block text-center font-mono mt-0.5">JOINT PEACE TEXTBOOK PROPOSAL ON THE EAST SEA BOUNDARY</span>
        </div>

        {/* 모둠명 인풋 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-white/70 uppercase tracking-wide mb-1.5">✍ 모둠 대표 이름 (한국 학생)</label>
            <input 
              type="text" 
              placeholder="예: 김민수 (서울고등학교)"
              value={formData.koreanStudent}
              onChange={(e) => handleInputChange('koreanStudent', e.target.value)}
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-medium placeholder-white/20 focus:bg-[#1C1C1C] focus:ring-1 focus:ring-[#A1824A] focus:border-[#A1824A] transition outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/70 uppercase tracking-wide mb-1.5">✍ 모둠 대표 이름 (일본 학생)</label>
            <input 
              type="text" 
              placeholder="예: 다나카 켄 (도쿄중학교)"
              value={formData.japaneseStudent}
              onChange={(e) => handleInputChange('japaneseStudent', e.target.value)}
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-medium placeholder-white/20 focus:bg-[#1C1C1C] focus:ring-1 focus:ring-[#A1824A] focus:border-[#A1824A] transition outline-none"
            />
          </div>
        </div>

        {/* 제안 제목 단원 */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-white/70 uppercase tracking-wide mb-1.5">■ 우리가 제안하는 독도 단원 제목</label>
          <input 
            type="text" 
            placeholder="예: 동해의 평화적 등대 독도, 대결을 넘어선 미래 상생의 가교"
            value={formData.unitTitle}
            onChange={(e) => handleInputChange('unitTitle', e.target.value)}
            className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-semibold placeholder-white/20 focus:bg-[#1C1C1C] focus:ring-1 focus:ring-[#A1824A] focus:border-[#A1824A] transition outline-none"
          />
        </div>

        {/* 제안 독도 10줄 이내 서술 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-medium text-white/70 uppercase tracking-wide">■ 공동 집필 본문 (사료 2종 이상 결합 추천)</label>
            <span className="text-[10px] font-mono text-white/30">
              글자수: <strong className="text-[#A1824A]">{formData.jointText.length}</strong> 자 (권장 300~500자)
            </span>
          </div>
          <textarea 
            rows={10}
            placeholder="상단의 학습 조건에 의거하여 역사적 고문서 2가지 전말(예: 세종실록지리지, 태정관지령)을 근거로 제시해 가며, 상호 비방성 표현이 없는 미래 지향적인 실천 지문 10줄을 작성하세요..."
            value={formData.jointText}
            onChange={(e) => handleInputChange('jointText', e.target.value)}
            className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white/90 leading-relaxed font-sans placeholder-white/20 focus:bg-[#1C1C1C] focus:ring-1 focus:ring-[#A1824A] focus:border-[#A1824A] transition outline-none resize-none"
          />
        </div>

        {/* 평가 위원 의견 (의회 혹은 위원회 피드백) */}
        <div className="bg-[#0D0D0D] rounded-xl p-5 border border-dashed border-[#A1824A]/30 mt-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#A1824A]/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-start gap-1.5 text-xs text-[#C5A870] font-medium uppercase tracking-wide mb-3 font-serif">
            <PenTool className="w-4 h-4 text-[#A1824A]" />
            <span>평가기구 의견 및 성취인증 심사 (Evaluator Review &amp; Signature)</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">인증 기구 / 담당 교사 명의 (Evaluator Organ)</label>
              <input 
                type="text" 
                value={formData.evaluatorName}
                onChange={(e) => handleInputChange('evaluatorName', e.target.value)}
                className="bg-[#161616] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white/80 font-medium focus:ring-1 focus:ring-[#A1824A]/30 focus:border-[#A1824A]/50 transition outline-none no-print"
              />
              <span className="hidden print:inline text-xs font-semibold text-slate-800">{formData.evaluatorName}</span>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">심사관 평가 주석 및 서면 의견 (도해적 종합 의견)</label>
              <textarea 
                rows={4}
                placeholder="평가위원의 전문 피드백을 기록하는 공란입니다. (모범안 자습 로드 단추로 채울 수 있습니다)"
                value={formData.evaluatorFeedback}
                onChange={(e) => handleInputChange('evaluatorFeedback', e.target.value)}
                className="w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white/70 leading-relaxed focus:ring-1 focus:ring-[#A1824A]/30 focus:border-[#A1824A]/50 transition outline-none resize-none no-print"
              />
              <p className="hidden print:block text-xs italic text-slate-600 bg-white p-3 border border-slate-100 rounded leading-relaxed">
                {formData.evaluatorFeedback || '(담당 지도 평가관의 종합 서명 의견 공란)'}
              </p>
            </div>
          </div>

          {/* 인쇄 및 발급 공란 */}
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/30">
            <span>집필 성취 수준: <strong className={isWorkbookComplete ? "text-[#C5A870]" : "text-amber-500/80"}>{isWorkbookComplete ? "우수 합격 (Verified)" : "작성 대기 중"}</strong></span>
            <div className="flex gap-2 no-print">
              {isWorkbookComplete && (
                <button
                  type="button"
                  onClick={() => setShowCertificate(true)}
                  className="bg-[#A1824A] hover:bg-[#b0965d] text-black font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  평화집필인증서 확인
                </button>
              )}
              <button
                type="button"
                onClick={handlePrint}
                className="bg-white/10 hover:bg-white/15 text-white/90 font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer border border-white/5"
              >
                <Printer className="w-3.5 h-3.5 animate-pulse" />
                지면 인쇄
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4.2 토론 및 성찰 질문 리스트 */}
      <section className="bg-[#111111] rounded-2xl border border-white/5 p-6 shadow-sm no-print font-sans">
        <h4 className="text-lg font-light text-white font-serif mb-2 flex items-center gap-1.5">
          <PenTool className="w-5 h-5 text-[#A1824A]" />
          4.2 토론 및 성찰 주관식 워크북
        </h4>
        <p className="text-white/40 text-xs mb-6 font-light">주제 학습 완료 단계에서 개별 또는 모둠 서술 성찰을 통해 주체적 역사관을 완성합니다.</p>

        <div className="space-y-6">
          {/* Q1 */}
          <div className="bg-[#161616]/40 rounded-xl p-4 border border-white/5">
            <span className="text-[9px] font-mono text-[#A1824A] font-bold tracking-wider block">QUESTION 01</span>
            <p className="text-xs font-semibold text-white/80 leading-relaxed mt-1 mb-2.5">
              1. 일본의 1877년 『태정관 지령』과 첨부된 『기죽도약도』가 현대 일본 정부의 &ldquo;에도시대부터 독도를 자국 영토로 인지했다&rdquo;는 주장을 반박하는 가장 결정적인 카드인 이유는 무엇인지 토론해 봅시다.
            </p>
            <textarea 
              rows={3}
              placeholder="본인의 역사적 근거를 바탕으로 기입해 주세요..."
              value={formData.discussionAnswers.q1}
              onChange={(e) => handleNestedInputChange('q1', e.target.value)}
              className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-xs text-white/80 leading-relaxed focus:ring-1 focus:ring-[#A1824A]/40 outline-none resize-none"
            />
          </div>

          {/* Q2 */}
          <div className="bg-[#161616]/40 rounded-xl p-4 border border-white/5">
            <span className="text-[9px] font-mono text-[#A1824A] font-bold tracking-wider block">QUESTION 02</span>
            <p className="text-xs font-semibold text-white/80 leading-relaxed mt-1 mb-2.5">
              2. 1998년 체결된 &lsquo;신한일어업협정&rsquo;에서 왜 독도가 한국의 독자적 EEZ 기점이 되지 못하고 중간수역에 놓이게 되었는지, 당시의 타협 배경과 어업권 보호 측면에서 평가해 봅시다.
            </p>
            <textarea 
              rows={3}
              placeholder="교재 제3차시 내용과 지도 타협 배경을 참고하여 기입해 주세요..."
              value={formData.discussionAnswers.q2}
              onChange={(e) => handleNestedInputChange('q2', e.target.value)}
              className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-xs text-white/80 leading-relaxed focus:ring-1 focus:ring-[#A1824A]/40 outline-none resize-none"
            />
          </div>

          {/* Q3 */}
          <div className="bg-[#161616]/40 rounded-xl p-4 border border-white/5">
            <span className="text-[9px] font-mono text-[#A1824A] font-bold tracking-wider block">QUESTION 03</span>
            <p className="text-xs font-semibold text-white/80 leading-relaxed mt-1 mb-2.5 font-sans">
              3. 미래 세대인 우리가 독도 갈등을 평화적으로 해결하기 위해, 한일 청소년 역사 캠프나 역사 학술 교류 활성화가 필요한 이유에 대해 본인의 생각을 정리해 봅시다.
            </p>
            <textarea 
              rows={3}
              placeholder="청소년 평화 연합 관점 및 공동 교과서 집필 의의를 고려해 진솔한 문장으로 기입하세요..."
              value={formData.discussionAnswers.q3}
              onChange={(e) => handleNestedInputChange('q3', e.target.value)}
              className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-xs text-white/80 leading-relaxed focus:ring-1 focus:ring-[#A1824A]/40 outline-none resize-none"
            />
          </div>
        </div>
      </section>

      {/* 수료증/인증서 오버레이 모달 */}
      {showCertificate && isWorkbookComplete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in no-print">
          <div className="bg-[#111111] rounded-2xl border border-[#A1824A]/30 max-w-lg w-full p-8 text-center relative overflow-hidden shadow-2xl">
            {/* Certificate styling lines */}
            <div className="absolute inset-4 border-2 border-dashed border-[#A1824A]/25 rounded-xl pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#A1824A]/5 rounded-full blur-2xl pointer-events-none" />

            <span className="inline-block bg-[#A1824A]/10 text-[#C5A870] text-[9px] font-bold font-mono tracking-widest px-3 py-1 rounded-full uppercase mb-4 border border-[#A1824A]/25">
              PEACE EDUCATION FELLOW
            </span>

            <h4 className="text-2xl font-light font-display text-white mb-1 font-serif">독도 역사평화 공동집필 수료증</h4>
            <span className="text-[10px] font-mono text-white/30 block mb-6 font-light">CERTIFICATE OF DEMOCRATIC HISTORICAL WRITING</span>

            <div className="space-y-3 my-6 max-w-sm mx-auto bg-[#0D0D0D] p-4 rounded-xl text-xs text-white/60 leading-relaxed border border-white/5">
              <p className="font-light leading-relaxed">
                귀 모둠(한국 대표: <strong className="font-medium text-white">{formData.koreanStudent}</strong> / 일본 대표: <strong className="font-medium text-white">{formData.japaneseStudent}</strong>)은 한·일 고문서의 역사적 진실과 소중한 국경적 주권을 바르게 분석하여 <strong className="text-[#C5A870] font-serif">&ldquo;{formData.unitTitle}&rdquo;</strong>라는 숭고한 평화 상생의 단원을 훌륭히 완수 집필하였음을 인증합니다.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <span className="text-[10px] font-medium text-white/40 font-mono uppercase tracking-widest">대한민국 역사·지리 평화교육위원회 인증</span>
              <div className="w-12 h-12 rounded-full bg-[#A1824A]/10 border border-[#A1824A]/30 flex items-center justify-center mt-3 text-[#A1824A] font-serif text-sm font-light shadow-xs shadow-[#A1824A]/10">
                인증
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <button 
                onClick={handlePrint}
                className="bg-[#A1824A] hover:bg-[#b0965d] text-black font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
              >
                지면 출력
              </button>
              <button 
                onClick={() => setShowCertificate(false)}
                className="bg-white/5 hover:bg-white/10 text-white/80 font-medium text-xs px-4 py-2 rounded-lg transition cursor-pointer border border-white/5"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
