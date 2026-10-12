import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Plus, Check, ArrowRight } from 'lucide-react';

interface CommunitiesViewProps {
  onSelectCommunity: (communityId: string) => void;
}

export const CommunitiesView: React.FC<CommunitiesViewProps> = ({ onSelectCommunity }) => {
  const { communities, toggleJoinCommunity, openCreatePost } = useApp();
  const [filter, setFilter] = useState<'all' | 'joined'>('all');

  const filteredCommunities = communities.filter(c => {
    if (filter === 'joined') return c.isJoined;
    return true;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-extrabold text-[#20212A] tracking-tight">Interest Communities</h1>
          <p className="text-xs text-[#74788A] mt-1 leading-relaxed max-w-md">
            Join curated circles centered on design craft, slow travel, independent software, literature, and sustainable fitness.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-1 bg-[#FAFAFC] border border-[#EAEAEF] p-1 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-white text-[#20212A] shadow-xs'
                : 'text-[#74788A] hover:text-[#20212A]'
            }`}
          >
            Discover All ({communities.length})
          </button>
          <button
            onClick={() => setFilter('joined')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'joined'
                ? 'bg-white text-[#20212A] shadow-xs'
                : 'text-[#74788A] hover:text-[#20212A]'
            }`}
          >
            My Communities ({communities.filter(c => c.isJoined).length})
          </button>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommunities.map(community => (
          <div
            key={community.id}
            className="bg-white border border-[#EAEAEF] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md/5 transition-all group"
          >
            {/* Community Header Cover */}
            <div className="h-28 relative overflow-hidden bg-slate-100">
              <img
                src={community.coverImage}
                alt={community.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-xl px-2.5 py-1 text-[11px] font-semibold text-[#20212A]">
                {community.category}
              </div>
            </div>

            {/* Community Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EAEAEF] shadow-sm flex items-center justify-center text-xl shrink-0 -mt-7 relative z-10">
                  {community.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <button
                    onClick={() => onSelectCommunity(community.id)}
                    className="text-sm font-bold text-[#20212A] hover:text-[#7957E8] transition-colors text-left truncate block w-full"
                  >
                    {community.name}
                  </button>
                  <p className="text-[11px] text-[#74788A] font-mono tabular-nums">
                    {community.membersCount.toLocaleString()} members
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#74788A] leading-relaxed line-clamp-2">
                {community.description}
              </p>

              {/* Action buttons */}
              <div className="pt-2 border-t border-[#EAEAEF]/70 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectCommunity(community.id)}
                  className="text-xs font-semibold text-[#7957E8] hover:underline flex items-center gap-1"
                >
                  <span>Explore discussions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => toggleJoinCommunity(community.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    community.isJoined
                      ? 'bg-slate-100 text-[#74788A] hover:bg-rose-50 hover:text-rose-600'
                      : 'bg-gradient-to-r from-[#7957E8] to-[#5B8DEF] text-white shadow-2xs hover:opacity-95'
                  }`}
                >
                  {community.isJoined ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Joined</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Join</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
