import React from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';
import { ArrowLeft, Users, Plus, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface CommunityDetailViewProps {
  communityId: string;
  onBack: () => void;
  onNavigateUser: (username: string) => void;
}

export const CommunityDetailView: React.FC<CommunityDetailViewProps> = ({ 
  communityId, 
  onBack, 
  onNavigateUser 
}) => {
  const { communities, posts, toggleJoinCommunity, openCreatePost } = useApp();

  const community = communities.find(c => c.id === communityId);

  if (!community) {
    return (
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-10 text-center space-y-3">
        <p className="text-sm font-bold text-[#20212A]">Community not found</p>
        <button
          onClick={onBack}
          className="text-xs text-[#7957E8] font-semibold hover:underline"
        >
          Return to communities
        </button>
      </div>
    );
  }

  const communityPosts = posts.filter(p => p.communityId === community.id);

  return (
    <div className="space-y-4 pb-12">
      {/* Back link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#74788A] hover:text-[#20212A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all communities</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl overflow-hidden shadow-xs">
        <div className="h-44 sm:h-52 relative overflow-hidden bg-slate-100">
          <img
            src={community.coverImage}
            alt={community.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#EAEAEF] shadow-md flex items-center justify-center text-3xl shrink-0">
                {community.avatar}
              </div>
              <div className="text-white">
                <h1 className="text-xl font-extrabold tracking-tight drop-shadow-xs">{community.name}</h1>
                <p className="text-xs text-white/90 drop-shadow-xs">
                  {community.category} · {community.membersCount.toLocaleString()} members
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openCreatePost(community.id)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/90 backdrop-blur-md hover:bg-white text-[#20212A] shadow-sm transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write Post</span>
              </button>

              <button
                onClick={() => toggleJoinCommunity(community.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  community.isJoined
                    ? 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-rose-500 hover:text-white'
                    : 'bg-gradient-to-r from-[#7957E8] to-[#5B8DEF] text-white shadow-md'
                }`}
              >
                {community.isJoined ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Member</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Join Circle</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Description & Rules */}
        <div className="p-5 space-y-4">
          <p className="text-sm leading-relaxed text-[#20212A]">
            {community.description}
          </p>

          {community.rules && community.rules.length > 0 && (
            <div className="pt-3 border-t border-[#EAEAEF] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#20212A] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#7957E8]" />
                <span>Community Principles</span>
              </div>
              <ul className="space-y-1.5">
                {community.rules.map((rule, idx) => (
                  <li key={idx} className="text-xs text-[#74788A] flex items-start gap-2 leading-relaxed">
                    <span className="text-[#7957E8] font-bold">·</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-[#20212A]">
            Recent Discussions in {community.name}
          </h2>
          <span className="text-xs text-[#74788A] font-mono tabular-nums">
            {communityPosts.length} posts
          </span>
        </div>

        {communityPosts.length > 0 ? (
          communityPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onNavigateUser={onNavigateUser}
            />
          ))
        ) : (
          <div className="bg-white border border-[#EAEAEF] rounded-2xl p-10 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#7957E8]/10 text-[#7957E8] flex items-center justify-center mx-auto text-xl">
              ✍️
            </div>
            <h3 className="text-sm font-bold text-[#20212A]">No posts in this circle yet</h3>
            <p className="text-xs text-[#74788A] max-w-sm mx-auto leading-relaxed">
              Be the first member to spark an insightful conversation in {community.name}.
            </p>
            <button
              onClick={() => openCreatePost(community.id)}
              className="px-4 py-2 bg-[#7957E8] text-white text-xs font-semibold rounded-xl hover:bg-[#6846D4] transition-colors"
            >
              Start the first discussion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
