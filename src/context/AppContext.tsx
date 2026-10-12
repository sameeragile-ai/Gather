import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, Post, Comment, Community, Notification, Conversation, 
  Message, Report, UserSettings, ToastMessage 
} from '../types';
import { 
  sampleUsers, samplePosts, sampleCommunities, sampleNotifications, 
  sampleConversations, sampleMessages, sampleReports, defaultSettings 
} from '../data/initialData';

interface AppContextType {
  currentUser: User;
  users: User[];
  posts: Post[];
  communities: Community[];
  notifications: Notification[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  reports: Report[];
  settings: UserSettings;
  followedUserIds: Set<string>;
  
  // Navigation & search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Modals & UI triggers
  isCreatePostOpen: boolean;
  createPostInitialCommunityId?: string;
  openCreatePost: (communityId?: string) => void;
  closeCreatePost: () => void;
  
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  
  // Post Actions
  createPost: (content: string, image?: string, communityId?: string, tags?: string[]) => Post;
  deletePost: (postId: string) => void;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  reportPost: (postId: string, reason: any, details?: string) => void;
  
  // Community Actions
  toggleJoinCommunity: (communityId: string) => void;
  
  // User Actions
  toggleFollowUser: (userId: string) => void;
  updateCurrentUserProfile: (updates: Partial<User>) => void;
  switchDemoUser: (userId: string) => void;
  muteUser: (userId: string) => void;
  unmuteUser: (userId: string) => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  
  // Notification Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
  
  // Messaging Actions
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startDirectMessage: (user: User) => string;
  unreadMessagesCount: number;
  
  // Settings Actions
  updateSettings: (updates: Partial<UserSettings>) => void;
  
  // Admin Moderation
  dismissReport: (reportId: string) => void;
  removeReportedPost: (reportId: string) => void;
  toggleSuspendUser: (userId: string) => void;
  
  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Reset demo
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'gather_social_app_v1_';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load helpers
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn(`Error reading localStorage for ${key}:`, e);
      return fallback;
    }
  };

  const saveStored = (key: string, value: any) => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error saving to localStorage for ${key}:`, e);
    }
  };

  // State initialization
  const [users, setUsers] = useState<User[]>(() => loadStored('users', sampleUsers));
  const [currentUserId, setCurrentUserId] = useState<string>(() => loadStored('current_user_id', 'user_current'));
  const [posts, setPosts] = useState<Post[]>(() => loadStored('posts', samplePosts));
  const [communities, setCommunities] = useState<Community[]>(() => loadStored('communities', sampleCommunities));
  const [notifications, setNotifications] = useState<Notification[]>(() => loadStored('notifications', sampleNotifications));
  const [conversations, setConversations] = useState<Conversation[]>(() => loadStored('conversations', sampleConversations));
  const [messages, setMessages] = useState<Record<string, Message[]>>(() => loadStored('messages', sampleMessages));
  const [reports, setReports] = useState<Report[]>(() => loadStored('reports', sampleReports));
  const [settings, setSettings] = useState<UserSettings>(() => loadStored('settings', defaultSettings));
  const [followedUserIdsList, setFollowedUserIdsList] = useState<string[]>(() => loadStored('followed_users', ['user_marcus', 'user_clara']));

  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [createPostInitialCommunityId, setCreatePostInitialCommunityId] = useState<string | undefined>(undefined);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize state changes to localStorage
  useEffect(() => saveStored('users', users), [users]);
  useEffect(() => saveStored('current_user_id', currentUserId), [currentUserId]);
  useEffect(() => saveStored('posts', posts), [posts]);
  useEffect(() => saveStored('communities', communities), [communities]);
  useEffect(() => saveStored('notifications', notifications), [notifications]);
  useEffect(() => saveStored('conversations', conversations), [conversations]);
  useEffect(() => saveStored('messages', messages), [messages]);
  useEffect(() => saveStored('reports', reports), [reports]);
  useEffect(() => saveStored('settings', settings), [settings]);
  useEffect(() => saveStored('followed_users', followedUserIdsList), [followedUserIdsList]);

  const currentUser = users.find(u => u.id === currentUserId) || users[0];
  const followedUserIds = new Set(followedUserIdsList);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openCreatePost = (communityId?: string) => {
    setCreatePostInitialCommunityId(communityId);
    setIsCreatePostOpen(true);
  };

  const closeCreatePost = () => {
    setIsCreatePostOpen(false);
    setCreatePostInitialCommunityId(undefined);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Post Actions
  const createPost = (content: string, image?: string, communityId?: string, tags?: string[]) => {
    const comm = communityId ? communities.find(c => c.id === communityId) : undefined;
    const newPost: Post = {
      id: 'post_' + Date.now(),
      author: currentUser,
      content,
      image,
      communityId: comm?.id,
      communityName: comm?.name,
      createdAt: new Date().toISOString(),
      timestamp: 'Just now',
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isBookmarked: false,
      comments: [],
      tags: tags || []
    };

    setPosts(prev => [newPost, ...prev]);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, postsCount: u.postsCount + 1 } : u));
    addToast('Post published', 'Your post is now visible to the community.');
    return newPost;
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, postsCount: Math.max(0, u.postsCount - 1) } : u));
    addToast('Post removed', 'Your post has been deleted.', 'info');
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextLiked = !p.isLiked;
        return {
          ...p,
          isLiked: nextLiked,
          likesCount: nextLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));
  };

  const toggleBookmarkPost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextBookmarked = !p.isBookmarked;
        addToast(
          nextBookmarked ? 'Saved to bookmarks' : 'Removed from bookmarks',
          nextBookmarked ? 'You can view this post anytime from your bookmarks.' : undefined,
          'info'
        );
        return { ...p, isBookmarked: nextBookmarked };
      }
      return p;
    }));
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;

    const newComment: Comment = {
      id: 'c_' + Date.now(),
      postId,
      author: currentUser,
      content: text.trim(),
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));

    // Generate notification if commenting on someone else's post
    const targetPost = posts.find(p => p.id === postId);
    if (targetPost && targetPost.author.id !== currentUser.id) {
      const notif: Notification = {
        id: 'notif_' + Date.now(),
        type: 'comment',
        sender: currentUser,
        recipientId: targetPost.author.id,
        postId: targetPost.id,
        postSnippet: targetPost.content.substring(0, 50) + '...',
        message: `commented on your post: "${text.substring(0, 30)}..."`,
        createdAt: 'Just now',
        isRead: false
      };
      setNotifications(prev => [notif, ...prev]);
    }

    addToast('Comment posted', undefined, 'success');
  };

  const reportPost = (postId: string, reason: any, details?: string) => {
    const targetPost = posts.find(p => p.id === postId);
    if (!targetPost) return;

    const newReport: Report = {
      id: 'rep_' + Date.now(),
      postId,
      post: targetPost,
      reporter: currentUser,
      reason,
      details,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setReports(prev => [newReport, ...prev]);
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, isReported: true } : p));
    addToast('Report submitted', 'Our moderation team will review this content.', 'info');
  };

  // Community Actions
  const toggleJoinCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(c => {
      if (c.id === communityId) {
        const nextJoined = !c.isJoined;
        addToast(
          nextJoined ? `Joined ${c.name}` : `Left ${c.name}`,
          nextJoined ? 'Community posts will now show up in your feed.' : undefined,
          'info'
        );
        return {
          ...c,
          isJoined: nextJoined,
          membersCount: nextJoined ? c.membersCount + 1 : Math.max(1, c.membersCount - 1)
        };
      }
      return c;
    }));
  };

  // User Actions
  const toggleFollowUser = (userId: string) => {
    const isAlreadyFollowing = followedUserIds.has(userId);
    const targetUser = users.find(u => u.id === userId);

    if (isAlreadyFollowing) {
      setFollowedUserIdsList(prev => prev.filter(id => id !== userId));
      setUsers(prev => prev.map(u => {
        if (u.id === userId) return { ...u, followersCount: Math.max(0, u.followersCount - 1) };
        if (u.id === currentUser.id) return { ...u, followingCount: Math.max(0, u.followingCount - 1) };
        return u;
      }));
      addToast(`Unfollowed @${targetUser?.username || 'user'}`);
    } else {
      setFollowedUserIdsList(prev => [...prev, userId]);
      setUsers(prev => prev.map(u => {
        if (u.id === userId) return { ...u, followersCount: u.followersCount + 1 };
        if (u.id === currentUser.id) return { ...u, followingCount: u.followingCount + 1 };
        return u;
      }));

      // Add follow notification
      const notif: Notification = {
        id: 'notif_' + Date.now(),
        type: 'follow',
        sender: currentUser,
        recipientId: userId,
        message: 'started following you',
        createdAt: 'Just now',
        isRead: false
      };
      setNotifications(prev => [notif, ...prev]);
      addToast(`Now following @${targetUser?.username || 'user'}`);
    }
  };

  const updateCurrentUserProfile = (updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updates } : u));
    // Also update any posts author info if name/avatar changed
    setPosts(prev => prev.map(p => {
      if (p.author.id === currentUser.id) {
        return { ...p, author: { ...p.author, ...updates } };
      }
      return p;
    }));
    addToast('Profile updated', 'Your changes have been saved.');
  };

  const switchDemoUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(target.id);
      addToast(`Switched account to ${target.name}`, `@${target.username}`, 'info');
    }
  };

  const muteUser = (userId: string) => {
    setSettings(prev => ({
      ...prev,
      mutedUserIds: [...new Set([...prev.mutedUserIds, userId])]
    }));
    const user = users.find(u => u.id === userId);
    addToast(`Muted @${user?.username || 'user'}`, 'Their posts will no longer appear in your feed.', 'info');
  };

  const unmuteUser = (userId: string) => {
    setSettings(prev => ({
      ...prev,
      mutedUserIds: prev.mutedUserIds.filter(id => id !== userId)
    }));
    addToast('User unmuted', undefined, 'info');
  };

  const blockUser = (userId: string) => {
    setSettings(prev => ({
      ...prev,
      blockedUserIds: [...new Set([...prev.blockedUserIds, userId])]
    }));
    const user = users.find(u => u.id === userId);
    addToast(`Blocked @${user?.username || 'user'}`, 'You will no longer interact with this account.', 'warning');
  };

  const unblockUser = (userId: string) => {
    setSettings(prev => ({
      ...prev,
      blockedUserIds: prev.blockedUserIds.filter(id => id !== userId)
    }));
    addToast('User unblocked', undefined, 'info');
  };

  // Notification Actions
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    addToast('All notifications marked as read', undefined, 'info');
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead && n.recipientId === currentUser.id).length;

  // Messaging Actions
  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return;

    const newMessage: Message = {
      id: 'msg_' + Date.now(),
      conversationId,
      senderId: currentUser.id,
      receiverId: conv.participant.id,
      text: text.trim(),
      createdAt: 'Just now',
      isRead: false
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text.trim(),
          lastMessageTime: 'Just now',
          unreadCount: 0
        };
      }
      return c;
    }));
  };

  const startDirectMessage = (user: User): string => {
    let existing = conversations.find(c => c.participant.id === user.id);
    if (!existing) {
      const newConvId = 'conv_' + user.id;
      const newConv: Conversation = {
        id: newConvId,
        participant: user,
        lastMessage: 'Started a new conversation',
        lastMessageTime: 'Just now',
        unreadCount: 0
      };
      setConversations(prev => [newConv, ...prev]);
      setMessages(prev => ({ ...prev, [newConvId]: [] }));
      setActiveConversationId(newConvId);
      return newConvId;
    } else {
      setActiveConversationId(existing.id);
      return existing.id;
    }
  };

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Settings Actions
  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    addToast('Settings updated', 'Preferences saved.');
  };

  // Admin Moderation
  const dismissReport = (reportId: string) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'dismissed' } : r));
    addToast('Report dismissed', 'No violation found.', 'info');
  };

  const removeReportedPost = (reportId: string) => {
    const rep = reports.find(r => r.id === reportId);
    if (rep) {
      setPosts(prev => prev.filter(p => p.id !== rep.postId));
      setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
      addToast('Content removed', 'The post has been taken down per community guidelines.', 'warning');
    }
  };

  const toggleSuspendUser = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextSuspended = !u.isSuspended;
        addToast(
          nextSuspended ? `User @${u.username} suspended` : `User @${u.username} reactivated`,
          nextSuspended ? 'User can no longer create posts.' : 'User permissions restored.',
          nextSuspended ? 'error' : 'success'
        );
        return { ...u, isSuspended: nextSuspended };
      }
      return u;
    }));
  };

  const resetAllDemoData = () => {
    localStorage.clear();
    setUsers(sampleUsers);
    setCurrentUserId('user_current');
    setPosts(samplePosts);
    setCommunities(sampleCommunities);
    setNotifications(sampleNotifications);
    setConversations(sampleConversations);
    setMessages(sampleMessages);
    setReports(sampleReports);
    setSettings(defaultSettings);
    setFollowedUserIdsList(['user_marcus', 'user_clara']);
    addToast('Demo environment reset', 'All seed posts, reactions, and settings restored to default.', 'info');
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      posts,
      communities,
      notifications,
      conversations,
      messages,
      reports,
      settings,
      followedUserIds,
      searchQuery,
      setSearchQuery,
      isCreatePostOpen,
      createPostInitialCommunityId,
      openCreatePost,
      closeCreatePost,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      createPost,
      deletePost,
      toggleLikePost,
      toggleBookmarkPost,
      addComment,
      reportPost,
      toggleJoinCommunity,
      toggleFollowUser,
      updateCurrentUserProfile,
      switchDemoUser,
      muteUser,
      unmuteUser,
      blockUser,
      unblockUser,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      unreadNotificationsCount,
      activeConversationId,
      setActiveConversationId,
      sendMessage,
      startDirectMessage,
      unreadMessagesCount,
      updateSettings,
      dismissReport,
      removeReportedPost,
      toggleSuspendUser,
      toasts,
      addToast,
      removeToast,
      resetAllDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
