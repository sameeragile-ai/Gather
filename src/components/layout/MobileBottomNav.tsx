import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Compass, Plus, Bell, MessageSquare, User as UserIcon } from 'lucide-react';

interface MobileBottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentRoute, onNavigate }) => {
  const { currentUser, openCreatePost, unreadNotificationsCount, unreadMessagesCount } = useApp();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAEAEF] px-2 h-16 flex items-center justify-around pb-safe select-none">
      {/* Home */}
      <button
        onClick={() => onNavigate('feed')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
          currentRoute === 'feed' ? 'text-[#7957E8]' : 'text-[#74788A]'
        }`}
        aria-label="Home Feed"
      >
        <Home className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-semibold mt-0.5">Home</span>
      </button>

      {/* Explore */}
      <button
        onClick={() => onNavigate('explore')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
          currentRoute === 'explore' ? 'text-[#7957E8]' : 'text-[#74788A]'
        }`}
        aria-label="Explore"
      >
        <Compass className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-semibold mt-0.5">Explore</span>
      </button>

      {/* Create CTA Button */}
      <button
        onClick={() => openCreatePost()}
        className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-[#7957E8] to-[#5B8DEF] text-white shadow-md shadow-[#7957E8]/30 -mt-2 active:scale-95 transition-transform"
        aria-label="Create Post"
      >
        <Plus className="w-6 h-6 stroke-[3]" />
      </button>

      {/* Messages */}
      <button
        onClick={() => onNavigate('messages')}
        className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
          currentRoute === 'messages' ? 'text-[#7957E8]' : 'text-[#74788A]'
        }`}
        aria-label="Messages"
      >
        <MessageSquare className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-semibold mt-0.5">Messages</span>
        {unreadMessagesCount > 0 && (
          <span className="absolute top-1 right-2.5 w-4 h-4 bg-[#7957E8] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
            {unreadMessagesCount}
          </span>
        )}
      </button>

      {/* Notifications */}
      <button
        onClick={() => onNavigate('notifications')}
        className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
          currentRoute === 'notifications' ? 'text-[#7957E8]' : 'text-[#74788A]'
        }`}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-semibold mt-0.5">Alerts</span>
        {unreadNotificationsCount > 0 && (
          <span className="absolute top-1 right-2.5 w-4 h-4 bg-[#7957E8] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
            {unreadNotificationsCount}
          </span>
        )}
      </button>
    </nav>
  );
};
