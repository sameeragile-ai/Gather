import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { sampleUpcomingEvents, sampleTrendingTopics } from '../../data/initialData';
import { Search, X, Calendar, UserPlus, Check, ArrowRight } from 'lucide-react';

interface RightSidebarProps {
  onNavigateUser: (username: string) => void;
  onNavigateCommunity: (communityId: string) => void;
  onSelectTopic: (topic: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ 
  onNavigateUser, 
  onNavigateCommunity, 
  onSelectTopic 
}) => {
  const { 
    currentUser, users, communities, followedUserIds, 
    toggleFollowUser, toggleJoinCommunity, searchQuery, setSearchQuery 
  } = useApp();

  const suggestedUsers = users
    .filter(u => u.id !== currentUser.id && !followedUserIds.has(u.id))
    .slice(0, 3);

  const suggestedCommunities = communities
    .filter(c => !c.isJoined)
    .slice(0, 2);

  return (
    <aside className="w-80 h-screen sticky top-0 flex flex-col p-4 space-y-5 overflow-y-auto border-l border-[#EAEAEF] bg-white select-none">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#74788A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search posts, people, topics..."
          className="w-full bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl pl-9.5 pr-8 py-2 text-xs text-[#20212A] placeholder:text-[#74788A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#74788A] hover:text-[#20212A] p-0.5"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Trending Topics */}
      <div className="bg-[#FAFAFC] border border-[#EAEAEF] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
            Trending Conversations
          </h3>
          <span className="text-[11px] text-[#74788A]">Live</span>
        </div>

        <div className="space-y-2.5">
          {sampleTrendingTopics.map(topic => (
            <button
              key={topic.tag}
              onClick={() => onSelectTopic(topic.tag)}
              className="w-full text-left group flex items-center justify-between hover:bg-white/80 p-1.5 rounded-lg transition-colors"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#20212A] group-hover:text-[#7957E8] transition-colors">
                  #{topic.tag}
                </p>
                <p className="text-[11px] text-[#74788A]">
                  {topic.category} · {topic.postsCount} posts
                </p>
              </div>
              <ArrowRight className="w-3 h-3 text-[#74788A] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>

      {/* Suggested People */}
      {suggestedUsers.length > 0 && (
        <div className="bg-[#FAFAFC] border border-[#EAEAEF] rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
            Who to Connect With
          </h3>

          <div className="space-y-3">
            {suggestedUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateUser(user.username)}
                  className="flex items-center gap-2.5 min-w-0 text-left group"
                >
                  <Avatar src={user.avatar} name={user.name} size="sm" />
                  <div className="min-w-0 flex flex-col">
                    <span className="text-xs font-semibold text-[#20212A] truncate group-hover:text-[#7957E8]">
                      {user.name}
                    </span>
                    <span className="text-[11px] text-[#74788A] truncate">
                      @{user.username}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => toggleFollowUser(user.id)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-[#EAEAEF] text-[#20212A] hover:bg-[#7957E8] hover:text-white hover:border-[#7957E8] transition-colors shadow-2xs shrink-0"
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Communities */}
      {suggestedCommunities.length > 0 && (
        <div className="bg-[#FAFAFC] border border-[#EAEAEF] rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
            Discover Communities
          </h3>

          <div className="space-y-3">
            {suggestedCommunities.map(comm => (
              <div key={comm.id} className="flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateCommunity(comm.id)}
                  className="flex items-center gap-2.5 min-w-0 text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#EAEAEF] flex items-center justify-center text-sm shadow-2xs shrink-0">
                    {comm.avatar}
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span className="text-xs font-semibold text-[#20212A] truncate group-hover:text-[#7957E8]">
                      {comm.name}
                    </span>
                    <span className="text-[11px] text-[#74788A] truncate">
                      {comm.membersCount.toLocaleString()} members
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => toggleJoinCommunity(comm.id)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-[#EAEAEF] text-[#20212A] hover:bg-[#7957E8] hover:text-white hover:border-[#7957E8] transition-colors shadow-2xs shrink-0"
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <div className="bg-[#FAFAFC] border border-[#EAEAEF] rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#20212A] uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-[#7957E8]" />
          <span>Upcoming Events</span>
        </div>

        <div className="space-y-2.5">
          {sampleUpcomingEvents.map(ev => (
            <div key={ev.id} className="p-2.5 bg-white border border-[#EAEAEF]/70 rounded-xl space-y-1">
              <p className="text-xs font-semibold text-[#20212A] leading-snug">{ev.title}</p>
              <div className="flex items-center justify-between text-[11px] text-[#74788A]">
                <span>{ev.community}</span>
                <span className="font-mono">{ev.attendeesCount} RSVP</span>
              </div>
              <p className="text-[11px] text-[#7957E8] font-medium pt-0.5">{ev.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer subtle attribution */}
      <div className="pt-2 text-[11px] text-[#74788A] leading-relaxed">
        <p>© 2026 Gather Platform. All rights reserved.</p>
        <div className="flex gap-2 mt-1">
          <button onClick={() => alert('Gather Community Guidelines: Be respectful, authentic, and constructive.')} className="hover:underline">Guidelines</button>
          <span>·</span>
          <button onClick={() => alert('Privacy: Demo mode stores data strictly in your local browser sandbox.')} className="hover:underline">Privacy</button>
          <span>·</span>
          <button onClick={() => alert('Demo status: Supabase-ready client architecture with localStorage demo persistence.')} className="hover:underline">Architecture</button>
        </div>
      </div>
    </aside>
  );
};
