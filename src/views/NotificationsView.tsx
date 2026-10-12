import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { 
  Heart, MessageCircle, UserPlus, Users, AtSign, 
  CheckCheck, Bell, ArrowRight 
} from 'lucide-react';

interface NotificationsViewProps {
  onNavigateUser: (username: string) => void;
  onNavigatePost: (postId: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ 
  onNavigateUser, 
  onNavigatePost 
}) => {
  const { 
    notifications, currentUser, markNotificationAsRead, 
    markAllNotificationsAsRead, unreadNotificationsCount 
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'mentions' | 'interactions'>('all');

  const filteredNotifications = notifications.filter(notif => {
    if (notif.recipientId !== currentUser.id) return false;
    if (filter === 'mentions') return notif.type === 'mention';
    if (filter === 'interactions') return notif.type === 'like' || notif.type === 'comment';
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-[#7957E8]" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-[#5B8DEF]" />;
      case 'community':
        return <Users className="w-4 h-4 text-emerald-600" />;
      case 'mention':
        return <AtSign className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-[#74788A]" />;
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-4 shadow-xs flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-base font-extrabold text-[#20212A]">Notifications</h1>
          <p className="text-xs text-[#74788A]">
            {unreadNotificationsCount > 0 
              ? `You have ${unreadNotificationsCount} unread activity alerts.` 
              : 'You are all caught up.'}
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAFAFC] hover:bg-slate-100 border border-[#EAEAEF] text-[#20212A] flex items-center gap-1.5 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#7957E8]" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-1.5 shadow-xs flex items-center gap-1">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
            filter === 'all'
              ? 'bg-[#7957E8]/10 text-[#7957E8]'
              : 'text-[#74788A] hover:text-[#20212A]'
          }`}
        >
          All Notifications
        </button>
        <button
          onClick={() => setFilter('mentions')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
            filter === 'mentions'
              ? 'bg-[#7957E8]/10 text-[#7957E8]'
              : 'text-[#74788A] hover:text-[#20212A]'
          }`}
        >
          Mentions
        </button>
        <button
          onClick={() => setFilter('interactions')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
            filter === 'interactions'
              ? 'bg-[#7957E8]/10 text-[#7957E8]'
              : 'text-[#74788A] hover:text-[#20212A]'
          }`}
        >
          Reactions & Comments
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(n => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                !n.isRead
                  ? 'bg-white border-[#7957E8]/30 shadow-xs'
                  : 'bg-white/80 border-[#EAEAEF] opacity-85 hover:opacity-100'
              }`}
            >
              <div className="mt-1">{getIcon(n.type)}</div>

              <button
                onClick={e => {
                  e.stopPropagation();
                  onNavigateUser(n.sender.username);
                }}
                className="shrink-0"
              >
                <Avatar src={n.sender.avatar} name={n.sender.name} size="sm" />
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#20212A] leading-relaxed">
                  <span
                    onClick={e => {
                      e.stopPropagation();
                      onNavigateUser(n.sender.username);
                    }}
                    className="font-bold hover:underline cursor-pointer mr-1"
                  >
                    {n.sender.name}
                  </span>
                  <span>{n.message}</span>
                </p>

                {n.postSnippet && (
                  <p className="text-[11px] text-[#74788A] mt-1 italic line-clamp-1 border-l-2 border-[#EAEAEF] pl-2">
                    "{n.postSnippet}"
                  </p>
                )}

                <span className="text-[10px] text-[#74788A] mt-1 block">
                  {n.createdAt}
                </span>
              </div>

              {!n.isRead && (
                <span className="w-2 h-2 rounded-full bg-[#7957E8] shrink-0 mt-2" />
              )}
            </div>
          ))
        ) : (
          <div className="bg-white border border-[#EAEAEF] rounded-2xl p-10 text-center space-y-2 shadow-xs">
            <Bell className="w-8 h-8 text-[#74788A]/50 mx-auto" />
            <h3 className="text-xs font-bold text-[#20212A]">No notifications</h3>
            <p className="text-xs text-[#74788A]">
              We'll notify you when members interact with your stories and posts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
