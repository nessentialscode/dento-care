import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CircularBookingCTAProps {
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CircularBookingCTA: React.FC<CircularBookingCTAProps> = ({
  onClick,
  className = '',
  size = 'lg'
}) => {
  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-24 h-24 text-[9px]',
    md: 'w-28 h-28 text-[10px]',
    lg: 'w-32 h-32 sm:w-36 sm:h-36 lg:w-[142px] lg:h-[142px] text-[10.5px] sm:text-[11px]'
  }[size];

  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 28
  }[size];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Book your consultation"
      className={`group relative select-none rounded-full bg-[#E5FE40] shadow-xl shadow-lime-400/30 hover:shadow-2xl hover:shadow-lime-300/50 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${sizeClasses} ${className}`}
    >
      {/* Rotating SVG Circular Text */}
      <div className="absolute inset-0 flex items-center justify-center animate-spin-slow pointer-events-none">
        <svg viewBox="0 0 160 160" className="w-full h-full p-1">
          <defs>
            <path
              id="circlePath"
              d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
            />
          </defs>
          <text
            fill="#111827"
            className="font-bold tracking-[0.24em] uppercase"
            style={{ fontSize: '11.5px', fontFamily: 'var(--font-heading)' }}
          >
            <textPath href="#circlePath" startOffset="0%">
              BOOK YOUR CONSULTATION • BOOK YOUR CONSULTATION •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Arrow with subtle hover kick */}
      <div className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-transparent group-hover:rotate-45 transition-transform duration-300">
        <ArrowUpRight
          size={iconSizes}
          className="text-slate-900 stroke-[2.5]"
        />
      </div>
    </button>
  );
};
