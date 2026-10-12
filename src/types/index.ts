export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  location?: string;
  website?: string;
  joinedDate: string;
  followingCount: number;
  followersCount: number;
  postsCount: number;
  isVerified?: boolean;
  isAdmin?: boolean;
  isSuspended?: boolean;
  interests: string[];
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  communityId?: string;
  communityName?: string;
  createdAt: string;
  timestamp: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  comments: Comment[];
  tags?: string[];
  isReported?: boolean;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  avatar: string;
  coverImage: string;
  membersCount: number;
  isJoined?: boolean;
  rules?: string[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'community' | 'mention';
  sender: User;
  recipientId: string;
  postId?: string;
  postSnippet?: string;
  communityName?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Report {
  id: string;
  postId: string;
  post: Post;
  reporter: User;
  reason: 'spam' | 'harassment' | 'hate_speech' | 'misinformation' | 'inappropriate';
  details?: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface UserSettings {
  isPrivate: boolean;
  allowDirectMessages: 'everyone' | 'following' | 'nobody';
  emailNotifications: boolean;
  pushNotifications: boolean;
  showActivityStatus: boolean;
  theme: 'light' | 'system';
  mutedUserIds: string[];
  blockedUserIds: string[];
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}
