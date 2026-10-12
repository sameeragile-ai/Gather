import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { 
  Home, Compass, Users, MessageSquare, Bell, Bookmark, 
  User as UserIcon, Shield, Settings, Plus, LogOut, ChevronDown 
} from 'lucide-react';

interface LeftSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentRoute, onNavigate }) => {
  const { 
    currentUser, users, switchDemoUser, openCreatePost, 
    unreadNotificationsCount, unreadMessagesCount, openAuthModal 
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navItems = [
    { id: 'feed', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'communities', label: 'Communities', icon: Users },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: MessageSquare, 
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined 
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell, 
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined 
    },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: `profile_${currentUser.username}`, label: 'Profile', icon: UserIcon },
    { id: 'admin', label: 'Moderation', icon: Shield, adminOnly: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col justify-between p-4 border-r border-[#EAEAEF] bg-white select-none">
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="px-3 pt-2">
          <button 
            onClick={() => onNavigate('feed')} 
            className="flex items-center gap-2.5 group focus:outline-none text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7957E8] to-[#5B8DEF] flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              G
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-[#20212A]">
                Gather
              </span>
            </div>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {navItems.map(item => {
            if (item.adminOnly && !currentUser.isAdmin) return null;

            const isActive = currentRoute === item.id || 
              (item.id.startsWith('profile_') && currentRoute.startsWith('profile_'));

            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#7957E8]/10 text-[#7957E8]'
                    : 'text-[#74788A] hover:text-[#20212A] hover:bg-[#FAFAFC]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[#7957E8]' : 'stroke-current'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="w-5 h-5 rounded-full bg-[#7957E8] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Create Post Action CTA */}
        <div className="px-1 pt-2">
          <button
            onClick={() => openCreatePost()}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#7957E8] to-[#5B8DEF] hover:opacity-95 text-white font-semibold text-sm rounded-xl shadow-md shadow-[#7957E8]/20 flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create Post</span>
          </button>
        </div>
      </div>

      {/* User profile section at the bottom with quick demo user switcher */}
      <div className="relative pt-4 border-t border-[#EAEAEF]">
        <button
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#FAFAFC] transition-colors group text-left"
          aria-label="User account menu"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
            <div className="min-w-0 flex flex-col">
              <span className="text-xs font-bold text-[#20212A] truncate group-hover:text-[#7957E8]">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-[#74788A] truncate">
                @{currentUser.username}
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-[#74788A] group-hover:text-[#20212A] shrink-0" />
        </button>

        {showUserDropdown && (
          <>
            <div 
              className="fixed inset-0 z-30" 
              onClick={() => setShowUserDropdown(false)} 
            />
            <div className="absolute bottom-16 left-0 w-64 bg-white border border-[#EAEAEF] rounded-2xl shadow-xl p-2 z-40 animate-in fade-in slide-in-from-bottom-2">
              <div className="px-2.5 py-1.5 text-[11px] font-bold text-[#74788A] uppercase tracking-wider">
                Switch Demo Persona
              </div>
              <div className="space-y-1">
                {users.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchDemoUser(u.id);
                      setShowUserDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                      u.id === currentUser.id 
                        ? 'bg-[#7957E8]/10 text-[#7957E8]' 
                        : 'text-[#20212A] hover:bg-[#FAFAFC]'
                    }`}
                  >
                    <Avatar src={u.avatar} name={u.name} size="xs" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{u.name}</p>
                      <p className="text-[10px] text-[#74788A] truncate">@{u.username}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-[#EAEAEF]">
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    openAuthModal();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#74788A] hover:text-[#20212A] hover:bg-[#FAFAFC] rounded-lg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Onboarding / Auth Flow</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
