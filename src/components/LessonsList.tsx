import React from 'react';
import { LessonId } from '../types';
import { Globe, BookOpen, Compass, Award, CheckCircle } from 'lucide-react';

interface LessonsListProps {
  activeLesson: LessonId;
  onSelectLesson: (id: LessonId) => void;
  completedLessons: Set<LessonId>;
}

export default function LessonsList({ activeLesson, onSelectLesson, completedLessons }: LessonsListProps) {
  const syllabus = [
    {
      id: 'lesson1' as LessonId,
      number: '1차시',
      title: '지리적 특성과 영역의 이해',
      subtitle: '물리적 위치, 가시 반경, 주권 속성 규명',
      icon: Globe,
    },
    {
      id: 'lesson2' as LessonId,
      number: '2차시',
      title: '사료와 지도의 역사적 권원',
      subtitle: '한일 고문서, 고지도, 안용복 도일 교섭',
      icon: BookOpen,
    },
    {
      id: 'lesson3' as LessonId,
      number: '3차시',
      title: '현대 독도 갈등과 평화 상생',
      subtitle: 'SCAPIN 677, 어업협정 협량, 팩트 대조',
      icon: Compass,
    },
    {
      id: 'workbook' as LessonId,
      number: '활동지',
      title: '한·일 공동 교과서 집필',
      subtitle: '공동 서술 기안, 평가 성찰 질의',
      icon: Award,
    }
  ];

  return (
    <div className="space-y-3">
      <span className="text-[10px] font-mono text-white/30 block uppercase tracking-widest pl-1 font-semibold">CURRICULUM INDEX</span>
      
      <div className="grid grid-cols-1 gap-2.5">
        {syllabus.map((syl) => {
          const IconComponent = syl.icon;
          const isActive = activeLesson === syl.id;
          const isCompleted = completedLessons.has(syl.id) || (syl.id === 'workbook' && completedLessons.size >= 3);

          return (
            <button
              key={syl.id}
              onClick={() => onSelectLesson(syl.id)}
              className={`text-left border rounded-xl p-4 transition-all duration-300 relative overflow-hidden group flex items-start gap-3.5 ${
                isActive 
                  ? 'border-[#A1824A] bg-[#161616] shadow-md shadow-[#A1824A]/5' 
                  : 'bg-[#111111] border-white/5 hover:border-white/20 hover:bg-[#151515] hover:shadow-2xs'
              }`}
            >
              {/* Left active highlight border style */}
              <div className={`absolute top-0 left-0 bottom-0 w-1 ${isActive ? 'bg-[#A1824A]' : 'bg-transparent'}`} />

              {/* Icon panel */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition group-hover:scale-105 ${
                isActive ? 'bg-[#A1824A] text-black' : 'bg-white/5 text-white/60'
              }`}>
                <IconComponent className="w-5 h-5 font-light" />
              </div>

              {/* Text metadata */}
              <div className="space-y-0.5 min-w-0 pr-6">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold font-mono tracking-wide ${isActive ? 'text-[#A1824A]' : 'text-white/30'}`}>
                    {syl.number}
                  </span>
                  {isCompleted && (
                    <CheckCircle className="w-3.5 h-3.5 text-[#A1824A] shrink-0" />
                  )}
                </div>
                <h4 className="font-semibold text-white text-xs sm:text-sm font-display line-clamp-1">
                  {syl.title}
                </h4>
                <p className="text-white/40 text-[11px] font-light leading-snug line-clamp-1 font-sans">
                  {syl.subtitle}
                </p>
              </div>

              {/* Arrow indicator when active */}
              {isActive && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#A1824A]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
