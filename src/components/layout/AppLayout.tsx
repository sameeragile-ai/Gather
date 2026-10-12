import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { ToastContainer } from './ToastContainer';
import { CreatePostModal } from '../feed/CreatePostModal';
import { OnboardingModal } from '../../views/OnboardingModal';

// Views
import { FeedView } from '../../views/FeedView';
import { ExploreView } from '../../views/ExploreView';
import { CommunitiesView } from '../../views/CommunitiesView';
import { CommunityDetailView } from '../../views/CommunityDetailView';
import { ProfileView } from '../../views/ProfileView';
import { NotificationsView } from '../../views/NotificationsView';
import { BookmarksView } from '../../views/BookmarksView';
import { MessagingView } from '../../views/MessagingView';
import { SettingsView } from '../../views/SettingsView';
import { AdminDashboardView } from '../../views/AdminDashboardView';

export const AppLayout: React.FC = () => {
  const { currentUser, searchQuery, setSearchQuery } = useApp();

  // Route state
  const [currentRoute, setCurrentRoute] = useState<string>('feed');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string>(currentUser.username);
  const [exploreInitialTopic, setExploreInitialTopic] = useState<string | undefined>(undefined);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setCurrentRoute('feed');
        return;
      }

      if (hash.startsWith('profile/')) {
        const username = hash.replace('profile/', '');
        setSelectedUsername(username);
        setCurrentRoute(`profile_${username}`);
      } else if (hash.startsWith('community/')) {
        const commId = hash.replace('community/', '');
        setSelectedCommunityId(commId);
        setCurrentRoute(`community_${commId}`);
      } else if (['feed', 'explore', 'communities', 'messages', 'notifications', 'bookmarks', 'settings', 'admin'].includes(hash)) {
        setCurrentRoute(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    if (route.startsWith('profile_')) {
      const username = route.replace('profile_', '');
      setSelectedUsername(username);
      setCurrentRoute(route);
      window.location.hash = `profile/${username}`;
    } else if (route.startsWith('community_')) {
      const commId = route.replace('community_', '');
      setSelectedCommunityId(commId);
      setCurrentRoute(route);
      window.location.hash = `community/${commId}`;
    } else {
      setCurrentRoute(route);
      window.location.hash = route;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateUser = (username: string) => {
    setSelectedUsername(username);
    setCurrentRoute(`profile_${username}`);
    window.location.hash = `profile/${username}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCommunity = (commId: string) => {
    setSelectedCommunityId(commId);
    setCurrentRoute(`community_${commId}`);
    window.location.hash = `community/${commId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (topic: string) => {
    setSearchQuery(topic);
    navigateTo('explore');
  };

  const getPageTitle = () => {
    if (currentRoute === 'feed') return 'Gather Feed';
    if (currentRoute === 'explore') return 'Explore';
    if (currentRoute === 'communities') return 'Communities';
    if (currentRoute.startsWith('community_')) return 'Community';
    if (currentRoute === 'messages') return 'Direct Messages';
    if (currentRoute === 'notifications') return 'Notifications';
    if (currentRoute === 'bookmarks') return 'Bookmarks';
    if (currentRoute.startsWith('profile_')) return `@${selectedUsername}`;
    if (currentRoute === 'settings') return 'Settings';
    if (currentRoute === 'admin') return 'Moderation Console';
    return 'Gather';
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#20212A] flex flex-col">
      {/* Mobile Top App Bar */}
      <MobileHeader
        title={getPageTitle()}
        onNavigate={navigateTo}
      />

      {/* Main Container - 3 Column Layout on Desktop */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex justify-center">
        {/* Left Sidebar (Desktop only) */}
        <div className="hidden lg:block shrink-0">
          <LeftSidebar
            currentRoute={currentRoute}
            onNavigate={navigateTo}
          />
        </div>

        {/* Center Main Feed Content Column */}
        <main className="flex-1 max-w-2xl min-w-0 px-3 sm:px-5 py-4 pb-24 lg:pb-8">
          {currentRoute === 'feed' && (
            <FeedView
              onNavigateUser={handleNavigateUser}
              onNavigateCommunity={handleNavigateCommunity}
            />
          )}

          {currentRoute === 'explore' && (
            <ExploreView
              onNavigateUser={handleNavigateUser}
              onNavigateCommunity={handleNavigateCommunity}
              initialTopic={exploreInitialTopic}
            />
          )}

          {currentRoute === 'communities' && (
            <CommunitiesView
              onSelectCommunity={handleNavigateCommunity}
            />
          )}

          {currentRoute.startsWith('community_') && selectedCommunityId && (
            <CommunityDetailView
              communityId={selectedCommunityId}
              onBack={() => navigateTo('communities')}
              onNavigateUser={handleNavigateUser}
            />
          )}

          {currentRoute.startsWith('profile_') && (
            <ProfileView
              username={selectedUsername}
              onNavigateUser={handleNavigateUser}
              onNavigateCommunity={handleNavigateCommunity}
              onNavigateMessages={() => navigateTo('messages')}
            />
          )}

          {currentRoute === 'messages' && (
            <MessagingView
              onNavigateUser={handleNavigateUser}
            />
          )}

          {currentRoute === 'notifications' && (
            <NotificationsView
              onNavigateUser={handleNavigateUser}
              onNavigatePost={postId => {
                // Focus on post in feed
                navigateTo('feed');
              }}
            />
          )}

          {currentRoute === 'bookmarks' && (
            <BookmarksView
              onNavigateUser={handleNavigateUser}
              onNavigateCommunity={handleNavigateCommunity}
              onNavigateHome={() => navigateTo('feed')}
            />
          )}

          {currentRoute === 'settings' && (
            <SettingsView />
          )}

          {currentRoute === 'admin' && (
            <AdminDashboardView />
          )}
        </main>

        {/* Right Sidebar (Desktop only) */}
        <div className="hidden xl:block shrink-0">
          <RightSidebar
            onNavigateUser={handleNavigateUser}
            onNavigateCommunity={handleNavigateCommunity}
            onSelectTopic={handleSelectTopic}
          />
        </div>
      </div>

      {/* Mobile Fixed Bottom Navigation */}
      <MobileBottomNav
        currentRoute={currentRoute}
        onNavigate={navigateTo}
      />

      {/* Globally Mounted Modals and Toast Stack */}
      <CreatePostModal />
      <OnboardingModal />
      <ToastContainer />
    </div>
  );
};
