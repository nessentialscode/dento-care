import React from 'react';

interface OrganicStatBadgeProps {
  stat: string;
  label: string;
  sublabel?: string;
  className?: string;
  variant?: 'cloud' | 'wavy' | 'pill';
}

export const OrganicStatBadge: React.FC<OrganicStatBadgeProps> = ({
  stat,
  label,
  sublabel,
  className = '',
  variant = 'cloud'
}) => {
  // Rounded styles reflecting the organic cloud/wavy shape from the reference
  const shapeClass = {
    cloud: 'rounded-[28px_28px_28px_10px]',
    wavy: 'rounded-[32px_32px_14px_32px]',
    pill: 'rounded-[30px]'
  }[variant];

  return (
    <div
      className={`inline-flex flex-col justify-center bg-white px-5 py-4 shadow-xl shadow-sky-950/10 text-slate-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${shapeClass} ${className}`}
    >
      <div className="text-2xl sm:text-3xl font-extrabold text-[#3B82F6] tracking-tight leading-none mb-1">
        {stat}
      </div>
      <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
        {label}
      </div>
      {sublabel && (
        <div className="text-[11px] text-slate-500 font-medium leading-tight">
          {sublabel}
        </div>
      )}
    </div>
  );
};
