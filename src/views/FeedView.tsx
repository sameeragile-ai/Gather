import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StoriesBar } from '../components/feed/StoriesBar';
import { FeedComposerBanner } from '../components/feed/FeedComposerBanner';
import { PostCard } from '../components/feed/PostCard';
import { Sparkles, Users, TrendingUp, Image as ImageIcon, RotateCw } from 'lucide-react';

interface FeedViewProps {
  onNavigateUser: (username: string) => void;
  onNavigateCommunity: (communityId: string) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({ onNavigateUser, onNavigateCommunity }) => {
  const { posts, currentUser, followedUserIds, settings } = useApp();
  const [activeTab, setActiveTab] = useState<'for_you' | 'following' | 'trending' | 'media'>('for_you');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Filter out posts from muted or blocked users
  const visiblePosts = posts.filter(p => {
    if (settings.mutedUserIds.includes(p.author.id)) return false;
    if (settings.blockedUserIds.includes(p.author.id)) return false;

    if (activeTab === 'following') {
      return followedUserIds.has(p.author.id) || p.author.id === currentUser.id;
    }
    if (activeTab === 'trending') {
      return p.likesCount >= 180 || p.commentsCount >= 15;
    }
    if (activeTab === 'media') {
      return Boolean(p.image);
    }
    return true; // 'for_you' shows all
  });

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 4);
      setIsLoadingMore(false);
    }, 400);
  };

  const paginatedPosts = visiblePosts.slice(0, visibleCount);

  return (
    <div className="space-y-4 pb-12">
      {/* Feed Filter Tabs (Segmented control button pattern) */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-1.5 shadow-xs flex items-center justify-between gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('for_you')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'for_you'
              ? 'bg-[#7957E8]/10 text-[#7957E8]'
              : 'text-[#74788A] hover:text-[#20212A] hover:bg-[#FAFAFC]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>For You</span>
        </button>

        <button
          onClick={() => setActiveTab('following')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'following'
              ? 'bg-[#7957E8]/10 text-[#7957E8]'
              : 'text-[#74788A] hover:text-[#20212A] hover:bg-[#FAFAFC]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Following</span>
        </button>

        <button
          onClick={() => setActiveTab('trending')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'trending'
              ? 'bg-[#7957E8]/10 text-[#7957E8]'
              : 'text-[#74788A] hover:text-[#20212A] hover:bg-[#FAFAFC]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Trending</span>
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'media'
              ? 'bg-[#7957E8]/10 text-[#7957E8]'
              : 'text-[#74788A] hover:text-[#20212A] hover:bg-[#FAFAFC]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Visuals</span>
        </button>
      </div>

      {/* Stories / Highlights Bar */}
      <StoriesBar 
        onSelectUser={onNavigateUser} 
        onSelectCommunity={onNavigateCommunity} 
      />

      {/* Quick composer banner */}
      <FeedComposerBanner />

      {/* Posts List */}
      <div className="space-y-4">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onNavigateUser={onNavigateUser}
              onNavigateCommunity={onNavigateCommunity}
            />
          ))
        ) : (
          <div className="bg-white border border-[#EAEAEF] rounded-2xl p-10 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#7957E8]/10 text-[#7957E8] flex items-center justify-center mx-auto text-xl">
              🌿
            </div>
            <h3 className="text-sm font-bold text-[#20212A]">No posts here yet</h3>
            <p className="text-xs text-[#74788A] max-w-sm mx-auto leading-relaxed">
              {activeTab === 'following'
                ? "You haven't followed any creators who posted yet. Explore recommended accounts to fill your feed."
                : 'Check back soon or be the first to share an inspiring post.'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination / Load more button */}
      {visiblePosts.length > visibleCount && (
        <div className="pt-2 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-2.5 bg-white border border-[#EAEAEF] hover:bg-[#FAFAFC] text-xs font-semibold text-[#20212A] rounded-xl shadow-2xs transition-all inline-flex items-center gap-2"
          >
            {isLoadingMore ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin text-[#7957E8]" />
                <span>Loading more conversations...</span>
              </>
            ) : (
              <span>Load older posts ({visiblePosts.length - visibleCount} remaining)</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
