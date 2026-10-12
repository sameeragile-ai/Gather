import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { Shield, Sparkles } from 'lucide-react';

interface MobileHeaderProps {
  title?: string;
  onNavigate: (route: string) => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ title, onNavigate }) => {
  const { currentUser, unreadNotificationsCount } = useApp();

  return (
    <header className="lg:hidden sticky top-0 z-30 h-14 bg-white/90 backdrop-blur-md border-b border-[#EAEAEF] px-4 flex items-center justify-between">
      <button
        onClick={() => onNavigate('feed')}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7957E8] to-[#5B8DEF] flex items-center justify-center text-white font-black text-sm shadow-xs">
          G
        </div>
        <span className="font-extrabold text-base tracking-tight text-[#20212A]">
          {title || 'Gather'}
        </span>
      </button>

      <div className="flex items-center gap-2.5">
        {currentUser.isAdmin && (
          <button
            onClick={() => onNavigate('admin')}
            className="p-2 text-[#74788A] hover:text-[#7957E8] rounded-lg transition-colors"
            title="Admin Moderation"
            aria-label="Moderation dashboard"
          >
            <Shield className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => onNavigate(`profile_${currentUser.username}`)}
          className="relative focus:outline-none focus:ring-2 focus:ring-[#7957E8] rounded-full"
          aria-label="Your profile"
        >
          <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#7957E8] rounded-full ring-2 ring-white" />
          )}
        </button>
      </div>
    </header>
  );
};
