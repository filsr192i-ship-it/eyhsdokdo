import React, { useState } from 'react';
import { Compass, MapPin, Navigation, Eye, EyeOff, Building, Cloud, Sun, Info } from 'lucide-react';
import { DISTANCE_FACTS } from '../data/lessons';

export default function LessonGeographics() {
  const [selectedStation, setSelectedStation] = useState<'ulleungdo' | 'okishima'>('ulleungdo');
  const [weather, setWeather] = useState<'clear' | 'foggy'>('clear');

  const getSights = () => {
    if (selectedStation === 'ulleungdo') {
      return {
        from: '울릉도 (Sadong/Seokpo 고지대)',
        dist: '87.4 km',
        canSee: weather === 'clear',
        reason: weather === 'clear' 
          ? '해발 고도 약 300m 이상의 고지대에서 맑은 날 수평선 너머 독도가 또렷하게 관측됩니다. (자연적 인지 영역 범위 내)'
          : '안개나 구름이 끼면 가시거리 감소로 보이지 않지만, 맑은 날에는 상시 육안 대조가 가능합니다.',
        earthCurvatureFit: '수평선 굴절 영향 및 고도 계산 결과, 관측 가능 범위 이내입니다.',
        maxOcularRadius: '약 90 ~ 95 km'
      };
    } else {
      return {
        from: '일본 오키섬 (최고 고지대)',
        dist: '157.5 km',
        canSee: false,
        reason: '지구 곡률과 두 위치 간의 물리적 한계거리(157.5km) 때문에 날씨가 아무리 맑고 쾌청해도 수평선 밑으로 완전히 가라앉아 절대로 볼 수 없습니다.',
        earthCurvatureFit: '지구의 가시 곡선 공식 계산 상, 독도는 수평선 아래 400m 이상 밑에 존재합니다. (자연적 영토 자각 범위 불가능 영역)',
        maxOcularRadius: '최대 가시 범위 60 ~ 70 km 불가'
      };
    }
  };

  const activeSight = getSights();

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* 1.1 위치 및 지리 정보 카드 */}
      <section className="bg-[#111111] rounded-2xl border border-white/5 p-6 shadow-sm">
        <h3 className="text-xl font-light text-white flex items-center gap-2 mb-4 font-serif">
          <MapPin id="geo-icon" className="w-5 h-5 text-[#A1824A]" />
          1.1 지리적 위치와 물리적 거리 분석
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
          독도는 동해상에 홀로 떠 있는 외로운 섬이 아니라, 울릉도와 자연적·지리학적으로 유기적으로 연결된 우리 영토의 동쪽 끝입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1A1A1A]/40 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
            <span className="text-[10px] text-[#A1824A] font-mono tracking-wider font-semibold">LOCATION COORDS</span>
            <span className="text-lg font-medium text-white mt-2 font-display">동도 우산봉 기준</span>
            <div className="mt-4 space-y-1 text-xs text-white/60 font-light">
              <div className="flex justify-between">
                <span>위도 (Latitude):</span>
                <span className="font-semibold font-mono text-white/80">북위 37° 14′ 26.8″</span>
              </div>
              <div className="flex justify-between">
                <span>경도 (Longitude):</span>
                <span className="font-semibold font-mono text-white/80">동경 131° 52′ 10.4″</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A]/40 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
            <span className="text-[10px] text-[#A1824A] font-mono tracking-wider font-semibold">LAND SIZE</span>
            <span className="text-lg font-medium text-white mt-2 font-display">총면적 187,554 m²</span>
            <div className="mt-4 space-y-1 text-xs text-white/60 font-light">
              <div className="flex justify-between">
                <span>동도 (Dongdo):</span>
                <span className="font-semibold font-mono text-white/80">73,297 m²</span>
              </div>
              <div className="flex justify-between">
                <span>서도 (Seodo):</span>
                <span className="font-semibold font-mono text-white/80">88,740 m²</span>
              </div>
              <div className="flex justify-between">
                <span>기타 부속도서:</span>
                <span className="font-semibold text-right text-white/80">89개의 바위섬</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A]/40 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
            <span className="text-[10px] text-[#A1824A] font-mono tracking-wider font-semibold">SIZE COMPARISON</span>
            <span className="text-lg font-medium text-white mt-2 font-display">잠실종합운동장 2배</span>
            <p className="text-xs text-white/40 mt-4 leading-relaxed font-light">
              서도와 동도의 두 주섬과 주위의 89개 바위섬들을 모두 결합한 크기로, 우리 국민과 경비대가 주둔하는 주권 공간입니다.
            </p>
          </div>
        </div>

        {/* 1.1.1 육안 관측성 시뮬레이터 */}
        <div className="bg-gradient-to-br from-[#121212] to-[#0A0A0A] rounded-xl p-5 border border-white/10 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-white/5">
            <div>
              <h4 className="text-xs font-semibold text-white/90 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                <Compass className="w-4 h-4 text-[#A1824A]" />
                지리적 육안 관측성 역사적 의의 시뮬레이터
              </h4>
              <p className="text-[11px] text-white/40 mt-0.5 font-light">지질학적·역사학적 관점에서 &lt;육안 관측&gt;은 영유적 임계 인식의 필수 요소입니다.</p>
            </div>
            
            {/* 설정 토글 */}
            <div className="flex flex-wrap gap-2 text-xs">
              <button 
                onClick={() => setSelectedStation('ulleungdo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${selectedStation === 'ulleungdo' ? 'bg-[#A1824A] text-black shadow-xs' : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10'}`}
              >
                울릉도 ↔ 독도 (87.4km)
              </button>
              <button 
                onClick={() => setSelectedStation('okishima')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${selectedStation === 'okishima' ? 'bg-[#A1824A] text-black shadow-xs' : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10'}`}
              >
                오키섬 ↔ 독도 (157.5km)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 시뮬레이션 드로잉 (SVG) */}
            <div className="lg:col-span-7 bg-[#0A0A0A] rounded-xl p-4 flex flex-col justify-between items-center relative overflow-hidden min-h-[220px] border border-white/5">
              <div className="absolute top-2 left-2 flex gap-1.5 text-[10px] font-mono text-white/40 z-10">
                <span className="bg-[#111111] px-2 py-0.5 rounded border border-white/5">지구 곡률 시뮬레이션</span>
                {selectedStation === 'ulleungdo' ? (
                  <span className="bg-[#A1824A]/10 text-[#C5A870] px-2 py-0.5 rounded border border-[#A1824A]/20">울릉 고지대 (300m) ↔ 독도</span>
                ) : (
                  <span className="bg-red-950/20 text-red-400 px-2 py-0.5 rounded border border-red-900/30">오키 산 정상 (300m) ↔ 독도</span>
                )}
              </div>

              {/* 날씨 컨트롤 */}
              <div className="absolute top-2 right-2 flex gap-1 bg-[#111111] p-1 rounded-lg border border-white/5 z-10">
                <button 
                  onClick={() => setWeather('clear')}
                  className={`p-1 rounded text-xs flex items-center gap-1 cursor-pointer ${weather === 'clear' ? 'bg-[#A1824A] text-black' : 'text-white/40 hover:bg-white/5'}`}
                  title="맑은 날"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">맑음</span>
                </button>
                <button 
                  onClick={() => setWeather('foggy')}
                  className={`p-1 rounded text-xs flex items-center gap-1 cursor-pointer ${weather === 'foggy' ? 'bg-[#A1824A] text-black' : 'text-white/40 hover:bg-white/5'}`}
                  title="흐린 날"
                >
                  <Cloud className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">흐림</span>
                </button>
              </div>

              {/* Earth Curvature SVG Visualization */}
              <div className="w-full h-36 flex items-end justify-center relative mt-4">
                <svg viewBox="0 0 500 200" className="w-full h-full">
                  {/* Atmospheric gradient reflection */}
                  <defs>
                    <radialGradient id="skyGrad" cx="50%" cy="0%" r="80%">
                      <stop offset="0%" stopColor="#12121e" />
                      <stop offset="100%" stopColor="#08080c" />
                    </radialGradient>
                    <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#091833" />
                      <stop offset="70%" stopColor="#020308" />
                    </linearGradient>
                  </defs>

                  <rect width="500" height="200" fill="url(#skyGrad)" rx="8" />

                  {/* Draw Curving Earth ocean sphere limit */}
                  <path d="M -50,220 Q 250,150 550,220 L 550,210 L -50,210 Z" fill="url(#oceanGrad)" />
                  <path d="M -50,220 Q 250,150 550,220" stroke="#1d4ed8" strokeWidth="2" fill="none" opacity="0.4" />

                  {/* Fog overlay if foggy */}
                  {weather === 'foggy' && (
                    <rect width="500" height="200" fill="#1e1e24" opacity="0.65" rx="8" />
                  )}

                  {/* Left Station (Ulleungdo or Oki Island) */}
                  <g transform="translate(60, 140)">
                    <rect x="-10" y="-12" width="20" height="12" fill="#334155" rx="2" />
                    <line x1="0" y1="-12" x2="0" y2="-35" stroke="#64748b" strokeWidth="2" />
                    <circle cx="0" cy="-35" r="3" fill="#A1824A" />
                    <text x="-4" y="2" fill="#fff" fontSize="8" fontWeight="bold">
                      {selectedStation === 'ulleungdo' ? '울' : '오'}
                    </text>
                    <text x="-35" y="-45" fill="#64748b" fontSize="8" fontFamily="monospace">
                      {selectedStation === 'ulleungdo' ? '울릉도 고지대(300m)' : '오키섬 정상(300m)'}
                    </text>
                  </g>

                  {/* Right Station (Dokdo) */}
                  {selectedStation === 'ulleungdo' ? (
                    /* For Ulleung: Dokdo is above the horizon line clearly */
                    <g transform="translate(420, 145)">
                      {/* Dokdo Peaks */}
                      <polygon points="-12,5 -6,-25 0,-15 10,-32 18,5" fill="#475569" stroke="#334155" strokeWidth="1" />
                      <circle cx="10" cy="-32" r="1.5" fill="#A1824A" /> {/* Lighthouse */}
                      <text x="-10" y="15" fill="#cbd5e1" fontSize="9" fontWeight="bold">독도 (Usanbong)</text>
                      <text x="-10" y="24" fill="#A1824A" fontSize="7" fontFamily="monospace">87.4km</text>

                      {/* Vision Line of sight */}
                      {weather === 'clear' ? (
                        <path d="M -360,-40 L -20,-20" stroke="#A1824A" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.8" />
                      ) : (
                        <path d="M -360,-40 L -200,-31" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />
                      )}
                    </g>
                  ) : (
                    /* For Oki Island: Dokdo is deep below the horizon */
                    <g transform="translate(440, 185)">
                      {/* Dokdo Peaks below curvature limit */}
                      <polygon points="-12,5 -6,-15 0,-10 10,-18 18,5" fill="#1e293b" stroke="#0f172a" opacity="0.3" />
                      <text x="-35" y="15" fill="#f87171" fontSize="9" fontWeight="bold" opacity="0.7">독도 (수평선 아래)</text>
                      <text x="-35" y="24" fill="#64748b" fontSize="7" fontFamily="monospace">157.5km (곡률한계 초과)</text>
                      
                      {/* line of sight hitting water */}
                      <path d="M -380,-80 L -180,-30" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
                      <path d="M -180,-30 L -20,-10" stroke="#ef4444" strokeWidth="1.5" opacity="0.2" />
                      
                      {/* Curve block warning indicator */}
                      <circle cx="215" cy="-45" r="12" fill="#ef4444" opacity="0.1" transform="translate(-410, 15)" />
                      <text x="-205" y="-27" fill="#f87171" fontSize="8" fontWeight="bold">지구 곡률 차단선 발생!</text>
                    </g>
                  )}
                </svg>
              </div>

              {/* 실시간 시뮬레이션 지표 피드백 */}
              <div className="w-full flex justify-between text-[11px] font-mono text-white/40 border-t border-white/5 pt-3 mt-1">
                <span>물리거리: <strong className="text-white font-medium">{activeSight.dist}</strong></span>
                <span>가시 여부: 
                  <strong className={`ml-1 ${activeSight.canSee ? 'text-gold-light' : 'text-red-400'}`}>
                    {activeSight.canSee ? '● 관측 가능 (Visible)' : '■ 관측 불가 (Blocked)'}
                  </strong>
                </span>
                <span className="hidden sm:inline">허용한계선: <strong className="text-[#C5A870]">{activeSight.maxOcularRadius}</strong></span>
              </div>
            </div>

            {/* 시뮬레이션 분석 정보 */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeSight.canSee ? 'bg-[#A1824A]/10 text-[#C5A870]' : 'bg-red-950/20 text-red-400'}`}>
                    {activeSight.canSee ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="font-medium text-white text-sm">{activeSight.from}에서 본 독도</h5>
                    <span className="text-[10px] text-white/30 font-mono">가시 분석 완료</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-white/65">
                  <div className="bg-[#161616] p-3 rounded-lg border border-white/5">
                    <span className="font-medium text-[#A1824A] block">수평선 곡률 및 지리적 한계 분석:</span>
                    <p className="mt-1 text-[11px] text-white/45 font-light">{activeSight.earthCurvatureFit}</p>
                  </div>
                  <div className="bg-[#161616] p-3 rounded-lg border border-white/5">
                    <span className="font-medium text-[#A1824A] block">역사적 자각 증명:</span>
                    <p className="mt-1 text-[11px] text-white/45 font-light">{activeSight.reason}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#A1824A]/5 border border-[#A1824A]/20 rounded-lg p-3.5 mt-4">
                <p className="text-[11px] leading-relaxed text-[#C5A870] flex items-start gap-1.5 font-light">
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#A1824A]" />
                  <span>
                    <strong>지리적 관측의 의의:</strong> 울릉도 고지대에서는 높은 산(성인봉 등)을 통하면 날씨가 좋은 날 육체적 장벽 없이 독도를 또렷이 목격할 수 있으므로, 우리 조상들이 독도를 고대 울릉 생활권으로 편입시킨 것은 당연한 지리학적 역사 사실입니다.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.2 국가 영역의 삼요소와 독도 */}
      <section className="bg-[#111111] rounded-2xl border border-white/5 p-6 shadow-sm">
        <h3 className="text-xl font-light text-white flex items-center gap-2 mb-4 font-serif">
          <Navigation className="w-5 h-5 text-[#A1824A]" />
          1.2 국가 영역(Territory)의 삼요소와 독도
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
          국가 영역은 영토, 영해, 영공으로 나뉩니다. 대한민국은 독도를 엄연한 주권 기점으로 삼고 법령적·관할적 통제를 실행합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-white/5 bg-[#161616]/40 rounded-xl p-4 hover:shadow-xs transition duration-200 hover:border-[#A1824A]/20">
            <span className="inline-block bg-[#A1824A]/10 text-[#C5A870] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3 font-mono border border-[#A1824A]/25">영토 (Territory)</span>
            <h4 className="font-semibold text-white text-sm mb-1.5">지표 주권 범위</h4>
            <p className="text-[11px] leading-relaxed text-white/40 font-light">
              독도는 경상북도 울릉군 울릉읍 독도리 1~96번지에 편입된 엄연한 대한민국의 행정 구역 영토입니다.
            </p>
          </div>

          <div className="border border-white/5 bg-[#161616]/40 rounded-xl p-4 hover:shadow-xs transition duration-200 hover:border-[#A1824A]/20">
            <span className="inline-block bg-[#A1824A]/10 text-[#C5A870] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3 font-mono border border-[#A1824A]/25">영해 (Territorial Sea)</span>
            <h4 className="font-semibold text-white text-sm mb-1.5">기선 기준 12해리</h4>
            <p className="text-[11px] leading-relaxed text-white/40 font-light">
              영토 연근해 12해리 구역을 한국 주권 해역으로 선포하고 해충 및 일본 어선의 불법 어업 행위를 정밀 단속·순찰합니다.
            </p>
          </div>

          <div className="border border-white/5 bg-[#161616]/40 rounded-xl p-4 hover:shadow-xs transition duration-200 hover:border-[#A1824A]/20">
            <span className="inline-block bg-[#A1824A]/10 text-[#C5A870] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3 font-mono border border-[#A1824A]/25">영공 (Airspace)</span>
            <h4 className="font-semibold text-white text-sm mb-1.5">영토·영해 수직 상공</h4>
            <p className="text-[11px] leading-relaxed text-white/40 font-light">
              독도 상공은 대한민국 영토의 연장선으로 방공 식별 구역(KADIZ)에 철저하게 포함되어 공군 수호를 받습니다.
            </p>
          </div>

          <div className="border border-white/5 bg-[#161616]/40 rounded-xl p-4 hover:shadow-xs transition duration-200 hover:border-[#A1824A]/20">
            <span className="inline-block bg-[#A1824A]/10 text-[#C5A870] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3 font-mono border border-[#A1824A]/25">EEZ</span>
            <h4 className="font-semibold text-white text-sm mb-1.5">경제 관리 권한</h4>
            <p className="text-[11px] leading-relaxed text-white/40 font-light">
              영해 기선으로부터 최대 200해리 수역 중 주권 경제 자원 탐사 및 자율 관리 권한이 보장된 배타적 자원수역입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 1.3 독도의 주소와 도로명 체계 */}
      <section className="bg-[#111111] rounded-2xl border border-white/5 p-6 shadow-sm">
        <h3 className="text-xl font-light text-white flex items-center gap-2 mb-4 font-serif">
          <Building className="w-5 h-5 text-[#A1824A]" />
          1.3 독도의 주소와 도로명 체계 (유인도 및 국가 고유 번지)
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
          독도는 상주하는 소중한 대한민국 주민(독도 등대원, 주민 등)과 독도경비대원이 터를 잡은 실효 지배의 유인도(有人島)이며 고유 도로명을 부여받았습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-tr from-[#161616] to-[#0D0D0D] border border-white/5 rounded-xl p-5 relative overflow-hidden">
            <span className="absolute top-4 right-4 text-[9px] font-mono font-bold bg-[#A1824A]/10 text-[#C5A870] px-2 py-0.5 rounded border border-[#A1824A]/20">동도 (Dongdo)</span>
            <h4 className="text-lg font-medium text-white font-serif">이사부길 <span className="italic text-[#A1824A] text-sm">Isabu-gil</span></h4>
            <span className="text-[10px] text-white/30 font-mono block mt-1">Gyeongsangbuk-do, Ulleung-gun, Ulleung-eup, Dokdori Isabu-gil</span>
            
            <p className="text-xs text-white/50 mt-4 leading-relaxed font-light">
              512년 울릉도(우산국)를 신라 영토로 최초 귀속시키고 동해 주권을 선언한 신라의 장군 <strong>이사부</strong>의 굳건한 헌신과 기상을 기리기 위해 정량 명명하였습니다.
            </p>
            
            <div className="mt-4 border-t border-white/5 pt-3 flex flex-wrap gap-2">
              <span className="bg-white/5 text-[11px] px-2.5 py-1 rounded border border-white/5 font-light text-white/70">독도경비대</span>
              <span className="bg-white/5 text-[11px] px-2.5 py-1 rounded border border-white/5 font-light text-white/70">독도 등대</span>
              <span className="bg-white/5 text-[11px] px-2.5 py-1 rounded border border-white/5 font-light text-white/70">한반도 바위</span>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-[#161616] to-[#0D0D0D] border border-white/5 rounded-xl p-5 relative overflow-hidden">
            <span className="absolute top-4 right-4 text-[9px] font-mono font-bold bg-[#A1824A]/10 text-[#C5A870] px-2 py-0.5 rounded border border-[#A1824A]/20">서도 (Seodo)</span>
            <h4 className="text-lg font-medium text-white font-serif">안용복길 <span className="italic text-[#A1824A] text-sm">Anyongbok-gil</span></h4>
            <span className="text-[10px] text-white/30 font-mono block mt-1">Gyeongsangbuk-do, Ulleung-gun, Ulleung-eup, Dokdori Anyongbok-gil</span>
            
            <p className="text-xs text-white/50 mt-4 leading-relaxed font-light">
              17세기 후반 일본 에도 막부 정부 법정에 피랍되어 당당히 담판을 벌임으로써 공식 문답을 이끌어내 국경을 수호한 자랑스러운 민간 의인 어부 <strong>안용복</strong>을 기념합니다.
            </p>
            
            <div className="mt-4 border-t border-white/5 pt-3 flex flex-wrap gap-2">
              <span className="bg-white/5 text-[11px] px-2.5 py-1 rounded border border-white/5 font-light text-white/70">주민 숙소</span>
              <span className="bg-white/5 text-[11px] px-2.5 py-1 rounded border border-white/5 font-light text-white/70">식수원 &lsquo;물골&rsquo;</span>
              <span className="bg-white/5 text-[11px] px-2.5 py-1 rounded border border-white/5 font-light text-white/70">거주민 정착지</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
