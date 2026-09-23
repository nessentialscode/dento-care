import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CircularBookingCTAProps {
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const CircularBookingCTA: React.FC<CircularBookingCTAProps> = ({
  onClick,
  className = '',
  size = 'lg',
  text = '• BOOK YOUR APPOINTMENT INSTANTLY '
}) => {
  // Dimensions based on size (md restored for mobile hero tooth CTA)
  const sizeClasses = {
    sm: 'w-16 h-16 text-[8px]',
    md: 'w-28 h-28 min-[390px]:w-[118px] min-[390px]:h-[118px]',
    lg: 'w-24 h-24 sm:w-26 sm:h-26 lg:w-[104px] lg:h-[104px]'
  }[size];

  const iconSizes = {
    sm: 14,
    md: 24,
    lg: 20
  }[size];

  // Circle path circumference for r=60 is 2 * pi * 60 ~= 376.99
  const pathRadius = 60;
  const pathCircumference = Math.round(2 * Math.PI * pathRadius);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Book your consultation"
      className={`group relative select-none rounded-full bg-[#E5FE40] shadow-xl shadow-lime-400/25 hover:shadow-2xl hover:shadow-lime-300/40 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${sizeClasses} ${className}`}
    >
      {/* Rotating SVG Circular Text */}
      <div className="absolute inset-0 flex items-center justify-center animate-spin-slow pointer-events-none">
        <svg viewBox="0 0 160 160" className="w-full h-full p-1">
          <defs>
            <path
              id="circlePath"
              d={`M 80, ${80 - pathRadius} a ${pathRadius},${pathRadius} 0 1,1 0,${pathRadius * 2} a ${pathRadius},${pathRadius} 0 1,1 0,-${pathRadius * 2}`}
            />
          </defs>
          <text
            fill="#111827"
            className="font-extrabold uppercase tracking-wider"
            style={{ fontSize: '10px', fontFamily: 'var(--font-heading)' }}
          >
            <textPath
              href="#circlePath"
              startOffset="0%"
              textLength={pathCircumference}
              lengthAdjust="spacing"
            >
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Arrow */}
      <div className={`relative z-10 flex items-center justify-center rounded-full bg-transparent group-hover:rotate-45 transition-transform duration-300 ${size === 'md' ? 'w-10 h-10 min-[390px]:w-11 min-[390px]:h-11' : 'w-8 h-8 sm:w-9 sm:h-9'}`}>
        <ArrowUpRight
          size={iconSizes}
          className="text-slate-900 stroke-[2.5]"
        />
      </div>
    </button>
  );
};
