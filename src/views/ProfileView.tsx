import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { PostCard } from '../components/feed/PostCard';
import { EditProfileModal } from './EditProfileModal';
import { 
  MapPin, Globe, Calendar, Edit3, MessageSquare, 
  UserPlus, UserCheck, Shield, Grid, List 
} from 'lucide-react';

interface ProfileViewProps {
  username: string;
  onNavigateUser: (username: string) => void;
  onNavigateCommunity: (communityId: string) => void;
  onNavigateMessages: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ 
  username, 
  onNavigateUser, 
  onNavigateCommunity,
  onNavigateMessages 
}) => {
  const { 
    currentUser, users, posts, followedUserIds, 
    toggleFollowUser, startDirectMessage 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'likes'>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Find user by username
  const profileUser = users.find(u => u.username.toLowerCase() === username.toLowerCase()) || currentUser;
  const isSelf = profileUser.id === currentUser.id;
  const isFollowing = followedUserIds.has(profileUser.id);

  const userPosts = posts.filter(p => p.author.id === profileUser.id);
  const mediaPosts = userPosts.filter(p => Boolean(p.image));
  const likedPosts = posts.filter(p => p.isLiked);

  const displayedPosts = activeTab === 'posts' ? userPosts : activeTab === 'media' ? mediaPosts : likedPosts;

  const handleMessageUser = () => {
    startDirectMessage(profileUser);
    onNavigateMessages();
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Profile Card Header */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl overflow-hidden shadow-xs">
        {/* Cover Photo */}
        <div className="h-36 sm:h-48 relative overflow-hidden bg-slate-100">
          {profileUser.coverImage ? (
            <img
              src={profileUser.coverImage}
              alt="Profile cover banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#7957E8]/20 to-[#5B8DEF]/20" />
          )}
        </div>

        {/* Avatar and Action Buttons Row */}
        <div className="px-5 pb-5 pt-0">
          <div className="flex items-end justify-between -mt-12 sm:-mt-14 mb-4">
            <div className="relative p-1 bg-white rounded-full shadow-md">
              <Avatar
                src={profileUser.avatar}
                name={profileUser.name}
                size="xl"
                className="w-20 h-20 sm:w-24 sm:h-24"
              />
            </div>

            <div className="flex items-center gap-2">
              {isSelf ? (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#EAEAEF] text-[#20212A] hover:bg-[#FAFAFC] shadow-2xs flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleMessageUser}
                    className="p-2 rounded-xl bg-white border border-[#EAEAEF] text-[#20212A] hover:bg-[#FAFAFC] shadow-2xs transition-colors"
                    title="Send direct message"
                    aria-label="Direct message"
                  >
                    <MessageSquare className="w-4 h-4 text-[#74788A]" />
                  </button>

                  <button
                    onClick={() => toggleFollowUser(profileUser.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
                      isFollowing
                        ? 'bg-white border border-[#EAEAEF] text-[#20212A] hover:bg-rose-50 hover:text-rose-600'
                        : 'bg-gradient-to-r from-[#7957E8] to-[#5B8DEF] text-white hover:opacity-95'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#20212A]">{profileUser.name}</h1>
                {profileUser.isVerified && (
                  <span className="text-[#7957E8] text-sm font-bold" title="Verified member">✓</span>
                )}
                {profileUser.isAdmin && (
                  <span className="text-[10px] bg-[#7957E8]/10 text-[#7957E8] px-2 py-0.5 rounded-md font-semibold">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-[#74788A]">@{profileUser.username}</p>
            </div>

            <p className="text-xs leading-relaxed text-[#20212A] max-w-xl">
              {profileUser.bio}
            </p>

            {/* Metadata row */}
            <div className="flex items-center gap-4 flex-wrap text-xs text-[#74788A] pt-1">
              {profileUser.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#7957E8]" />
                  <span>{profileUser.location}</span>
                </div>
              )}
              {profileUser.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#5B8DEF]" />
                  <a
                    href={profileUser.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-[#7957E8] truncate max-w-[160px]"
                  >
                    {profileUser.website.replace('https://', '')}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#74788A]" />
                <span>{profileUser.joinedDate}</span>
              </div>
            </div>

            {/* Counts */}
            <div className="flex items-center gap-5 pt-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#20212A] font-mono tabular-nums">
                  {profileUser.followingCount}
                </span>
                <span className="text-[#74788A]">Following</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#20212A] font-mono tabular-nums">
                  {profileUser.followersCount.toLocaleString()}
                </span>
                <span className="text-[#74788A]">Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#20212A] font-mono tabular-nums">
                  {userPosts.length}
                </span>
                <span className="text-[#74788A]">Posts</span>
              </div>
            </div>

            {/* Interests unboxed tags */}
            {profileUser.interests && profileUser.interests.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-2 text-xs text-[#74788A]">
                <span className="font-medium text-[#20212A]">Interests:</span>
                {profileUser.interests.map((interest, idx) => (
                  <React.Fragment key={interest}>
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <span className="text-[#7957E8] font-medium">{interest}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex items-center border-t border-[#EAEAEF] px-4">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'posts'
                ? 'border-[#7957E8] text-[#7957E8]'
                : 'border-transparent text-[#74788A] hover:text-[#20212A]'
            }`}
          >
            Posts ({userPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'media'
                ? 'border-[#7957E8] text-[#7957E8]'
                : 'border-transparent text-[#74788A] hover:text-[#20212A]'
            }`}
          >
            Media ({mediaPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('likes')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'likes'
                ? 'border-[#7957E8] text-[#7957E8]'
                : 'border-transparent text-[#74788A] hover:text-[#20212A]'
            }`}
          >
            Liked Posts
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="space-y-4">
        {displayedPosts.length > 0 ? (
          displayedPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onNavigateUser={onNavigateUser}
              onNavigateCommunity={onNavigateCommunity}
            />
          ))
        ) : (
          <div className="bg-white border border-[#EAEAEF] rounded-2xl p-10 text-center space-y-2 shadow-xs">
            <p className="text-xs font-bold text-[#20212A]">No posts to display in this tab</p>
            <p className="text-xs text-[#74788A]">
              {activeTab === 'media' ? 'No media attachments yet.' : 'User has not published any entries yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};
