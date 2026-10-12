import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';
import { Avatar } from '../components/common/Avatar';
import { sampleTrendingTopics } from '../data/initialData';
import { Search, X, Users, Compass, Flame, Sparkles } from 'lucide-react';

interface ExploreViewProps {
  onNavigateUser: (username: string) => void;
  onNavigateCommunity: (communityId: string) => void;
  initialTopic?: string;
}

const CATEGORIES = ['All', 'Design', 'Technology', 'Travel', 'Photography', 'Fitness', 'Books'];

export const ExploreView: React.FC<ExploreViewProps> = ({ 
  onNavigateUser, 
  onNavigateCommunity,
  initialTopic 
}) => {
  const { 
    posts, users, communities, currentUser, followedUserIds, 
    toggleFollowUser, toggleJoinCommunity, searchQuery, setSearchQuery 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter posts based on search query and category
  const filteredPosts = posts.filter(post => {
    const query = searchQuery.toLowerCase().trim();
    const matchesCategory = selectedCategory === 'All' || 
      (post.tags && post.tags.some(t => t.toLowerCase() === selectedCategory.toLowerCase())) ||
      (post.communityName && post.communityName.toLowerCase().includes(selectedCategory.toLowerCase()));

    if (!matchesCategory) return false;

    if (!query) return true;

    const matchesContent = post.content.toLowerCase().includes(query);
    const matchesAuthor = post.author.name.toLowerCase().includes(query) || 
      post.author.username.toLowerCase().includes(query);
    const matchesCommunity = post.communityName?.toLowerCase().includes(query);
    const matchesTag = post.tags?.some(t => t.toLowerCase().includes(query));

    return matchesContent || matchesAuthor || matchesCommunity || matchesTag;
  });

  // Filter matching users if query is active
  const matchingUsers = searchQuery.trim() 
    ? users.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.bio.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Filter matching communities
  const matchingCommunities = searchQuery.trim()
    ? communities.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-5 pb-12">
      {/* Search Bar */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-3 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#74788A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search conversations, keywords, creators, or topics..."
            className="w-full bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl pl-9.5 pr-8 py-2.5 text-xs text-[#20212A] placeholder:text-[#74788A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#74788A] hover:text-[#20212A] p-0.5"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills / Segmented Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#7957E8] text-white shadow-xs'
                  : 'bg-[#FAFAFC] text-[#74788A] hover:text-[#20212A] hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Matching People Section (when searching) */}
      {searchQuery.trim() && matchingUsers.length > 0 && (
        <div className="bg-white border border-[#EAEAEF] rounded-2xl p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
            Matching People ({matchingUsers.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {matchingUsers.map(user => (
              <div key={user.id} className="p-3 bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateUser(user.username)}
                  className="flex items-center gap-2.5 min-w-0 text-left group"
                >
                  <Avatar src={user.avatar} name={user.name} size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#20212A] truncate group-hover:text-[#7957E8]">{user.name}</p>
                    <p className="text-[11px] text-[#74788A] truncate">@{user.username}</p>
                  </div>
                </button>

                {user.id !== currentUser.id && (
                  <button
                    onClick={() => toggleFollowUser(user.id)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-[#EAEAEF] text-[#20212A] hover:bg-[#7957E8] hover:text-white hover:border-[#7957E8] transition-colors shrink-0"
                  >
                    {followedUserIds.has(user.id) ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matching Communities (when searching) */}
      {searchQuery.trim() && matchingCommunities.length > 0 && (
        <div className="bg-white border border-[#EAEAEF] rounded-2xl p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
            Matching Communities ({matchingCommunities.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {matchingCommunities.map(comm => (
              <div key={comm.id} className="p-3 bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateCommunity(comm.id)}
                  className="flex items-center gap-2.5 min-w-0 text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#EAEAEF] flex items-center justify-center text-sm shadow-2xs">
                    {comm.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#20212A] truncate group-hover:text-[#7957E8]">{comm.name}</p>
                    <p className="text-[11px] text-[#74788A] truncate">{comm.category}</p>
                  </div>
                </button>

                <button
                  onClick={() => toggleJoinCommunity(comm.id)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-[#EAEAEF] text-[#20212A] hover:bg-[#7957E8] hover:text-white hover:border-[#7957E8] transition-colors shrink-0"
                >
                  {comm.isJoined ? 'Joined' : 'Join'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Topics Grid when no active text search */}
      {!searchQuery && selectedCategory === 'All' && (
        <div className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#7957E8]" />
            <h3 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
              Trending Hashtags & Debates
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {sampleTrendingTopics.map(t => (
              <button
                key={t.tag}
                onClick={() => setSearchQuery(t.tag)}
                className="p-3 bg-[#FAFAFC] hover:bg-slate-100/80 border border-[#EAEAEF] rounded-xl text-left transition-colors group"
              >
                <p className="text-xs font-bold text-[#20212A] group-hover:text-[#7957E8] truncate">
                  #{t.tag}
                </p>
                <p className="text-[11px] text-[#74788A] mt-0.5">
                  {t.postsCount} posts · {t.category}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Explored Posts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-[#20212A]">
            {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory !== 'All' ? `${selectedCategory} Discussions` : 'Popular Discussions'}
          </h2>
          <span className="text-xs text-[#74788A] font-mono tabular-nums">
            {filteredPosts.length} posts
          </span>
        </div>

        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onNavigateUser={onNavigateUser}
              onNavigateCommunity={onNavigateCommunity}
            />
          ))
        ) : (
          <div className="bg-white border border-[#EAEAEF] rounded-2xl p-10 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#74788A] flex items-center justify-center mx-auto text-xl">
              🔍
            </div>
            <h3 className="text-sm font-bold text-[#20212A]">No discussions match your filter</h3>
            <p className="text-xs text-[#74788A] max-w-sm mx-auto leading-relaxed">
              Try searching with another keyword or explore the categories above.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-[#7957E8] text-white text-xs font-semibold rounded-xl hover:bg-[#6846D4] transition-colors"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
