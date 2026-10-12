import React, { useState } from 'react';
import { Post } from '../../types';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { 
  Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, 
  Send, Flag, EyeOff, Trash2, Check, UserMinus 
} from 'lucide-react';

interface PostCardProps {
  post: Post;
  onNavigateUser?: (username: string) => void;
  onNavigateCommunity?: (communityId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onNavigateUser, 
  onNavigateCommunity 
}) => {
  const { 
    currentUser, toggleLikePost, toggleBookmarkPost, addComment, 
    deletePost, reportPost, muteUser, addToast 
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isAuthor = currentUser.id === post.author.id;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikePost(post.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmarkPost(post.id);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/#post-${post.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post by ${post.author.name} on Gather`,
          text: post.content.substring(0, 80) + '...',
          url: shareUrl
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      addToast('Link copied to clipboard', undefined, 'info');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      addToast('Failed to copy link', undefined, 'error');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  const handleReport = () => {
    setShowMenu(false);
    reportPost(post.id, 'inappropriate', 'Flagged by user from post menu');
  };

  const handleMute = () => {
    setShowMenu(false);
    muteUser(post.author.id);
  };

  const handleDelete = () => {
    setShowMenu(false);
    deletePost(post.id);
  };

  return (
    <article className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs transition-shadow hover:shadow-md/5">
      {/* Header zone */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={() => onNavigateUser?.(post.author.username)}
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7957E8] rounded-full shrink-0"
            aria-label={`View profile of ${post.author.name}`}
          >
            <Avatar src={post.author.avatar} name={post.author.name} size="md" />
          </button>

          <div className="min-w-0 flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button 
                onClick={() => onNavigateUser?.(post.author.username)}
                className="text-[15px] font-semibold text-[#20212A] hover:underline truncate text-left"
              >
                {post.author.name}
              </button>
              {post.author.isVerified && (
                <span className="text-[#7957E8] text-xs font-bold shrink-0" title="Verified member">✓</span>
              )}
            </div>

            {/* Zero-pill unboxed metadata with bullet separators */}
            <div className="flex items-center gap-1.5 text-xs text-[#74788A] truncate">
              <span>@{post.author.username}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.createdAt}>{post.timestamp}</time>
              {post.communityName && (
                <>
                  <span aria-hidden="true">·</span>
                  <button 
                    onClick={() => post.communityId && onNavigateCommunity?.(post.communityId)}
                    className="hover:text-[#7957E8] hover:underline font-medium truncate"
                  >
                    in {post.communityName}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Context Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 text-[#74788A] hover:text-[#20212A] hover:bg-[#FAFAFC] rounded-lg transition-colors"
            aria-label="Post actions"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-20" 
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 mt-1 w-48 bg-white border border-[#EAEAEF] rounded-xl shadow-lg shadow-black/5 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                {isAuthor ? (
                  <button
                    onClick={handleDelete}
                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete post
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleReport}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#20212A] hover:bg-[#FAFAFC] flex items-center gap-2 transition-colors"
                    >
                      <Flag className="w-4 h-4 text-[#74788A]" />
                      Report content
                    </button>
                    <button
                      onClick={handleMute}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#20212A] hover:bg-[#FAFAFC] flex items-center gap-2 transition-colors"
                    >
                      <EyeOff className="w-4 h-4 text-[#74788A]" />
                      Mute @{post.author.username}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Post body */}
      <div className="mt-3.5">
        <p className="text-[15px] leading-relaxed text-[#20212A] whitespace-pre-line break-words">
          {post.content}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs font-medium text-[#7957E8]">
            {post.tags.map(tag => (
              <span key={tag} className="hover:underline cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image attachment */}
      {post.image && !imageError && (
        <div className="mt-3.5 rounded-xl overflow-hidden border border-[#EAEAEF] bg-slate-50 max-h-[460px] flex items-center justify-center">
          <img
            src={post.image}
            alt="Post media attachment"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover max-h-[460px] hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
      )}

      {/* Action buttons row */}
      <div className="mt-4 pt-3.5 border-t border-[#EAEAEF]/70 flex items-center justify-between text-xs text-[#74788A]">
        {/* Like */}
        <button
          onClick={handleLike}
          className={`group flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors ${
            post.isLiked 
              ? 'text-rose-600 bg-rose-50/60 font-semibold' 
              : 'hover:text-rose-600 hover:bg-rose-50/40'
          }`}
          aria-label={post.isLiked ? 'Unlike' : 'Like'}
        >
          <Heart 
            className={`w-4 h-4 transition-transform active:scale-125 ${
              post.isLiked ? 'fill-rose-600 stroke-rose-600' : 'group-hover:stroke-rose-600'
            }`} 
          />
          <span className="font-mono tabular-nums">{post.likesCount}</span>
        </button>

        {/* Comment */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`group flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors ${
            showComments 
              ? 'text-[#7957E8] bg-[#7957E8]/10 font-semibold' 
              : 'hover:text-[#7957E8] hover:bg-[#7957E8]/5'
          }`}
          aria-label="View comments"
        >
          <MessageCircle className="w-4 h-4 group-hover:stroke-[#7957E8]" />
          <span className="font-mono tabular-nums">{post.commentsCount}</span>
        </button>

        {/* Bookmark */}
        <button
          onClick={handleBookmark}
          className={`group flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors ${
            post.isBookmarked 
              ? 'text-[#5B8DEF] bg-[#5B8DEF]/10 font-semibold' 
              : 'hover:text-[#5B8DEF] hover:bg-[#5B8DEF]/5'
          }`}
          aria-label={post.isBookmarked ? 'Remove bookmark' : 'Bookmark post'}
        >
          <Bookmark 
            className={`w-4 h-4 ${
              post.isBookmarked ? 'fill-[#5B8DEF] stroke-[#5B8DEF]' : 'group-hover:stroke-[#5B8DEF]'
            }`} 
          />
          <span>Save</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="group flex items-center gap-1.5 py-1 px-2 rounded-lg hover:text-[#20212A] hover:bg-slate-100 transition-colors"
          aria-label="Share post"
        >
          {copiedLink ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
          <span>{copiedLink ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Interactive Comments Drawer / Section */}
      {showComments && (
        <div className="mt-3.5 pt-3 border-t border-[#EAEAEF] space-y-3 animate-in fade-in duration-200">
          {/* Write comment field */}
          <form onSubmit={handleAddComment} className="flex items-center gap-2">
            <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
            <div className="flex-1 relative">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Write a constructive comment..."
                className="w-full bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl px-3.5 py-2 text-xs text-[#20212A] placeholder:text-[#74788A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="p-2 rounded-xl bg-[#7957E8] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#6846D4] transition-colors shadow-xs"
              aria-label="Send comment"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Comment list */}
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-2.5 pt-1">
              {post.comments.map(c => (
                <div key={c.id} className="flex items-start gap-2.5 text-xs group">
                  <Avatar src={c.author.avatar} name={c.author.name} size="xs" />
                  <div className="flex-1 bg-[#FAFAFC] border border-[#EAEAEF]/70 rounded-xl p-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#20212A]">{c.author.name}</span>
                      <span className="text-[11px] text-[#74788A]">{c.createdAt}</span>
                    </div>
                    <p className="mt-1 text-[#20212A] leading-relaxed">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#74788A] italic py-1 text-center">
              No comments yet. Start the conversation!
            </p>
          )}
        </div>
      )}
    </article>
  );
};
