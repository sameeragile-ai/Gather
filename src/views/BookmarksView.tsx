import React from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';
import { Bookmark, Sparkles } from 'lucide-react';

interface BookmarksViewProps {
  onNavigateUser: (username: string) => void;
  onNavigateCommunity: (communityId: string) => void;
  onNavigateHome: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ 
  onNavigateUser, 
  onNavigateCommunity, 
  onNavigateHome 
}) => {
  const { posts } = useApp();

  const bookmarkedPosts = posts.filter(p => p.isBookmarked);

  return (
    <div className="space-y-4 pb-12">
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#5B8DEF] fill-[#5B8DEF]" />
            <h1 className="text-base font-extrabold text-[#20212A]">Saved Bookmarks</h1>
          </div>
          <p className="text-xs text-[#74788A] mt-1">
            Articles, essays, and visual reflections you saved for later reading.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-[#74788A] bg-[#FAFAFC] border border-[#EAEAEF] px-2.5 py-1 rounded-lg">
          {bookmarkedPosts.length} saved
        </span>
      </div>

      <div className="space-y-4">
        {bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onNavigateUser={onNavigateUser}
              onNavigateCommunity={onNavigateCommunity}
            />
          ))
        ) : (
          <div className="bg-white border border-[#EAEAEF] rounded-2xl p-12 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#5B8DEF]/10 text-[#5B8DEF] flex items-center justify-center mx-auto text-xl">
              🔖
            </div>
            <h3 className="text-sm font-bold text-[#20212A]">No bookmarks saved yet</h3>
            <p className="text-xs text-[#74788A] max-w-sm mx-auto leading-relaxed">
              Whenever you come across an inspiring thought, click "Save" on any post to preserve it here.
            </p>
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 bg-[#7957E8] text-white text-xs font-semibold rounded-xl hover:bg-[#6846D4] transition-colors"
            >
              Browse Public Feed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
