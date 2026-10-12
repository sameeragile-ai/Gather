import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className = '' }) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-20 h-20 text-xl font-bold'
  }[size];

  // Derive stable pleasant background hue from name
  const initials = name
    .split(' ')
    .map(p => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  const getBackgroundColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      'bg-[#7957E8]/10 text-[#7957E8]',
      'bg-[#5B8DEF]/10 text-[#5B8DEF]',
      'bg-[#E0684B]/10 text-[#E0684B]',
      'bg-[#38A169]/10 text-[#2F855A]',
      'bg-[#805AD5]/10 text-[#6B46C1]'
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div
      className={`relative shrink-0 rounded-full overflow-hidden flex items-center justify-center font-semibold select-none ring-1 ring-black/5 ${sizeClasses} ${className} ${
        !src || hasError ? getBackgroundColor(name) : 'bg-slate-100'
      }`}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
