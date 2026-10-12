import { User, Post, Community, Notification, Conversation, Message, Report, UserSettings } from '../types';

// Asset references generated locally
import travelCoverImg from '../assets/images/travel_stories_cover_1791820621343.jpg';
import designWorkspaceImg from '../assets/images/design_workspace_setup_1791820636621.jpg';
import artisanBakeryImg from '../assets/images/artisan_bakery_coffee_1791820647597.jpg';
import mountainFogImg from '../assets/images/mountain_fog_scenery_1791820661193.jpg';
import gatherBannerImg from '../assets/images/gather_community_banner_1791820682406.jpg';

export { travelCoverImg, designWorkspaceImg, artisanBakeryImg, mountainFogImg, gatherBannerImg };

export const sampleUsers: User[] = [
  {
    id: 'user_current',
    name: 'Elena Rostova',
    username: 'elenarostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80',
    coverImage: gatherBannerImg,
    bio: 'Product architect & visual storyteller. Exploring the intersection of tactile design, typography, and human connection.',
    location: 'San Francisco, CA',
    website: 'https://elenarostova.design',
    joinedDate: 'Joined March 2024',
    followingCount: 142,
    followersCount: 1280,
    postsCount: 38,
    isVerified: true,
    isAdmin: true,
    interests: ['Design', 'Typography', 'Photography', 'Technology', 'Architecture'],
  },
  {
    id: 'user_marcus',
    name: 'Marcus Vance',
    username: 'marcusvance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=240&q=80',
    coverImage: designWorkspaceImg,
    bio: 'Founding designer at Studio Forma. Building calm software and collecting vintage Braun appliances.',
    location: 'Stockholm, Sweden',
    website: 'https://marcusvance.co',
    joinedDate: 'Joined January 2024',
    followingCount: 210,
    followersCount: 3410,
    postsCount: 64,
    isVerified: true,
    interests: ['Design', 'Hardware', 'Architecture', 'Indie Builders'],
  },
  {
    id: 'user_clara',
    name: 'Clara Moreau',
    username: 'claramoreau',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&h=240&q=80',
    coverImage: travelCoverImg,
    bio: 'Documentary travel photographer & essayist. Chasing early morning mist across the Mediterranean and Alps.',
    location: 'Nice, France',
    website: 'https://claramoreau.photo',
    joinedDate: 'Joined February 2024',
    followingCount: 312,
    followersCount: 5820,
    postsCount: 89,
    isVerified: true,
    interests: ['Travel', 'Photography', 'Books', 'Culture'],
  },
  {
    id: 'user_devon',
    name: 'Devon Patel',
    username: 'devonpatel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80',
    coverImage: mountainFogImg,
    bio: 'Software engineer & endurance trail runner. Writing on distributed systems, sourdough fermentation, and mountain pacing.',
    location: 'Boulder, CO',
    joinedDate: 'Joined April 2024',
    followingCount: 189,
    followersCount: 890,
    postsCount: 27,
    interests: ['Fitness', 'Technology', 'Sourdough', 'Outdoors'],
  },
  {
    id: 'user_sarah',
    name: 'Sarah Chen',
    username: 'sarahchen',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&h=240&q=80',
    coverImage: artisanBakeryImg,
    bio: 'Culinary researcher & baker. Exploring heritage grains, slow fermentation, and community food spaces.',
    location: 'Portland, OR',
    website: 'https://heritagecrust.sub',
    joinedDate: 'Joined May 2024',
    followingCount: 164,
    followersCount: 2190,
    postsCount: 52,
    interests: ['Food', 'Books', 'Lifestyle'],
  },
  {
    id: 'user_kai',
    name: 'Kai Takahashi',
    username: 'kaitakahashi',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&h=240&q=80',
    coverImage: gatherBannerImg,
    bio: 'Independent software builder. Documenting the micro-SaaS journey from 0 to $20k MRR.',
    location: 'Tokyo, Japan',
    website: 'https://kaitakahashi.dev',
    joinedDate: 'Joined June 2024',
    followingCount: 420,
    followersCount: 4890,
    postsCount: 114,
    interests: ['Indie Builders', 'Technology', 'Design'],
  }
];

export const sampleCommunities: Community[] = [
  {
    id: 'comm_design',
    name: 'Design Circle',
    slug: 'design-circle',
    description: 'A curated collective for product designers, typographers, and design systems engineers sharing craft, crits, and inspirations.',
    category: 'Design',
    avatar: '🎨',
    coverImage: designWorkspaceImg,
    membersCount: 14200,
    isJoined: true,
    rules: [
      'Focus crits on constructive, actionable feedback.',
      'Always credit original typography and foundry creators.',
      'No self-promotional spam without contextual substance.'
    ]
  },
  {
    id: 'comm_travel',
    name: 'Travel Stories',
    slug: 'travel-stories',
    description: 'Slow travel narratives, hidden railway lines, and documentary field notes from explorers around the globe.',
    category: 'Travel',
    avatar: '🧭',
    coverImage: travelCoverImg,
    membersCount: 9840,
    isJoined: true,
    rules: [
      'Emphasize local cultures and respectful travel practices.',
      'Share precise practical notes alongside poetic imagery.',
      'Protect delicate fragile ecosystems: avoid geotagging endangered spots.'
    ]
  },
  {
    id: 'comm_builders',
    name: 'Indie Builders',
    slug: 'indie-builders',
    description: 'Founders, solopreneurs, and engineers crafting sustainable software in public. Open metrics, transparent lessons.',
    category: 'Technology',
    avatar: '⚡',
    coverImage: designWorkspaceImg,
    membersCount: 8350,
    isJoined: false,
    rules: [
      'Share honest figures—both wins and painful failures.',
      'Celebrate fellow builders without cynical takedowns.',
      'Provide value before asking for customer sign-ups.'
    ]
  },
  {
    id: 'comm_photo',
    name: 'Photography Club',
    slug: 'photography-club',
    description: 'Film shooters, digital purists, and visual storytellers. Weekly prompts, light studies, and composition breakdowns.',
    category: 'Photography',
    avatar: '📷',
    coverImage: mountainFogImg,
    membersCount: 12600,
    isJoined: true,
    rules: [
      'State focal length and film/sensor recipe when possible.',
      'All critique must be mindful and respectful of artistic intent.'
    ]
  },
  {
    id: 'comm_fitness',
    name: 'Everyday Fitness',
    slug: 'everyday-fitness',
    description: 'Sustainable movement for longevity. Distance running, kettlebell training, mobility work, and restorative recovery.',
    category: 'Fitness',
    avatar: '🏃',
    coverImage: mountainFogImg,
    membersCount: 6420,
    isJoined: false,
    rules: [
      'No aggressive crash diets or unscientific claims.',
      'Celebrate consistency over temporary peak intensity.'
    ]
  },
  {
    id: 'comm_books',
    name: 'Book Lovers',
    slug: 'book-lovers',
    description: 'Marginalia reflections, literary fiction discoveries, philosophy discussions, and thoughtful reading logs.',
    category: 'Books',
    avatar: '📚',
    coverImage: gatherBannerImg,
    membersCount: 5740,
    isJoined: false,
    rules: [
      'Always use spoiler warnings when discussing plot resolutions.',
      'Engage with dissenting interpretations politely.'
    ]
  }
];

export const samplePosts: Post[] = [
  {
    id: 'post_1',
    author: sampleUsers[2], // Clara Moreau
    content: 'Woke up at 5:15 AM to catch the low maritime cloud layer rolling across the cliffs near Positano. When the Mediterranean sun broke through the haze, the water shifted from ink-black to an electric turquoise within ten minutes.\n\nThere is something humbling about watching a landscape that has held fishing boats for two thousand years greet another morning.',
    image: travelCoverImg,
    communityId: 'comm_travel',
    communityName: 'Travel Stories',
    createdAt: '2026-10-12T07:15:00Z',
    timestamp: '2h ago',
    likesCount: 148,
    commentsCount: 14,
    sharesCount: 32,
    isLiked: false,
    isBookmarked: true,
    tags: ['Amalfi', 'TravelEssays', 'MorningLight'],
    comments: [
      {
        id: 'c_1_1',
        postId: 'post_1',
        author: sampleUsers[1],
        content: 'That tonal gradient from the cliff face down to the water is pristine Clara. Did you shoot this on the 35mm prime?',
        createdAt: '1h ago',
        likesCount: 8,
        isLiked: false
      },
      {
        id: 'c_1_2',
        postId: 'post_1',
        author: sampleUsers[0],
        content: 'The quiet warmth in this frame is breathtaking. Makes me want to close my laptop and book a train right now.',
        createdAt: '45m ago',
        likesCount: 4,
        isLiked: true
      }
    ]
  },
  {
    id: 'post_2',
    author: sampleUsers[1], // Marcus Vance
    content: 'Refining our design system’s typographic scale today. We made a deliberate choice to ban artificial card elevation and let whitespace carry the rhythm.\n\nWhen every element has a card border and dropshadow, nothing has focus. When you treat empty space as a structural material, the UI breathes.',
    image: designWorkspaceImg,
    communityId: 'comm_design',
    communityName: 'Design Circle',
    createdAt: '2026-10-12T05:30:00Z',
    timestamp: '4h ago',
    likesCount: 236,
    commentsCount: 28,
    sharesCount: 45,
    isLiked: true,
    isBookmarked: false,
    tags: ['DesignSystems', 'Typography', 'Minimalism'],
    comments: [
      {
        id: 'c_2_1',
        postId: 'post_2',
        author: sampleUsers[5],
        content: 'Could not agree more Marcus. Most modern apps look like a casino of bordered boxes. Whitespace is the ultimate luxury in product design.',
        createdAt: '3h ago',
        likesCount: 15,
        isLiked: false
      }
    ]
  },
  {
    id: 'post_3',
    author: sampleUsers[4], // Sarah Chen
    content: '82% hydration country loaf with 20% sprouted Khorasan grain. 36 hours of cold retard in the cellar. The crumb came out custardy and aerated with that distinctive hazelnut aroma you only get from heritage milling.',
    image: artisanBakeryImg,
    communityId: 'comm_books',
    communityName: 'Lifestyle & Craft',
    createdAt: '2026-10-11T20:00:00Z',
    timestamp: '12h ago',
    likesCount: 184,
    commentsCount: 19,
    sharesCount: 12,
    isLiked: false,
    isBookmarked: false,
    tags: ['Sourdough', 'Fermentation', 'HeritageFlour'],
    comments: [
      {
        id: 'c_3_1',
        postId: 'post_3',
        author: sampleUsers[3],
        content: 'That blistered crust is immaculate Sarah! What temperature did you preheat your baking cloche to?',
        createdAt: '10h ago',
        likesCount: 6,
        isLiked: false
      }
    ]
  },
  {
    id: 'post_4',
    author: sampleUsers[3], // Devon Patel
    content: 'Morning 18-miler across the ridge trail before the winds picked up. When you spend five hours running in sub-alpine fog with zero cell coverage, your mental chatter quietens down completely. Resetting for another sprint week.',
    image: mountainFogImg,
    communityId: 'comm_photo',
    communityName: 'Photography Club',
    createdAt: '2026-10-11T16:00:00Z',
    timestamp: '16h ago',
    likesCount: 312,
    commentsCount: 22,
    sharesCount: 19,
    isLiked: true,
    isBookmarked: true,
    tags: ['TrailRunning', 'Nature', 'MentalHealth'],
    comments: [
      {
        id: 'c_4_1',
        postId: 'post_4',
        author: sampleUsers[2],
        content: 'The depth of field in that fog layer is supernatural Devon. Reminds me of the Canadian Rockies in late September.',
        createdAt: '14h ago',
        likesCount: 9,
        isLiked: false
      }
    ]
  },
  {
    id: 'post_5',
    author: sampleUsers[5], // Kai Takahashi
    content: 'Unpopular opinion in SaaS: you do not need an endless series of growth hacks. We spent the last three weeks simply talking to thirty users, fixing forty subtle papercut bugs, and reducing our dashboard load time from 1.8s to 240ms.\n\nRetention spiked 18% with zero ad spend. Craft is the best marketing strategy.',
    communityId: 'comm_builders',
    communityName: 'Indie Builders',
    createdAt: '2026-10-11T11:00:00Z',
    timestamp: '21h ago',
    likesCount: 520,
    commentsCount: 61,
    sharesCount: 94,
    isLiked: false,
    isBookmarked: true,
    tags: ['IndieHacking', 'SaaS', 'ProductQuality'],
    comments: [
      {
        id: 'c_5_1',
        postId: 'post_5',
        author: sampleUsers[0],
        content: 'Spot on Kai. Fast software respects human time. Nothing converts better than an app that reacts before you finish lifting your finger.',
        createdAt: '18h ago',
        likesCount: 24,
        isLiked: true
      }
    ]
  },
  {
    id: 'post_6',
    author: sampleUsers[0], // Elena Rostova (Current User)
    content: 'Gather is officially welcoming its first community cohorts! We set out to build an online space where conversations have warmth, ideas have permanence, and interfaces never get in the way of human relationships.\n\nWhat are you creating or exploring this autumn? Drop your current projects below.',
    image: gatherBannerImg,
    communityId: 'comm_design',
    communityName: 'Design Circle',
    createdAt: '2026-10-10T14:00:00Z',
    timestamp: '1d ago',
    likesCount: 421,
    commentsCount: 37,
    sharesCount: 58,
    isLiked: true,
    isBookmarked: false,
    tags: ['Gather', 'Community', 'NewBeginnings'],
    comments: [
      {
        id: 'c_6_1',
        postId: 'post_6',
        author: sampleUsers[1],
        content: 'So thrilled to see this live Elena. The typography pairing and gentle ivory tone feel so grounding compared to conventional social feeds.',
        createdAt: '1d ago',
        likesCount: 11,
        isLiked: false
      }
    ]
  },
  {
    id: 'post_7',
    author: sampleUsers[1], // Marcus Vance
    content: 'Spent the evening organizing my physical library. Found Dieter Rams’ "Ten Principles for Good Design" catalog from 1989. Principle 10 still holds supreme: "Good design is as little design as possible. Less, but better."',
    createdAt: '2026-10-09T18:00:00Z',
    timestamp: '2d ago',
    likesCount: 198,
    commentsCount: 16,
    sharesCount: 29,
    isLiked: false,
    isBookmarked: false,
    tags: ['DieterRams', 'IndustrialDesign', 'Philosophy'],
    comments: []
  },
  {
    id: 'post_8',
    author: sampleUsers[2], // Clara Moreau
    content: 'Note on creative work: inspiration rarely arrives while staring at a blank canvas. It strikes when you take a long walk without earphones, when you wash a ceramic cup, or when you watch dust motes float through an afternoon beam of sunlight.',
    createdAt: '2026-10-08T12:00:00Z',
    timestamp: '3d ago',
    likesCount: 275,
    commentsCount: 18,
    sharesCount: 41,
    isLiked: false,
    isBookmarked: false,
    tags: ['Creativity', 'Reflections'],
    comments: []
  }
];

export const sampleNotifications: Notification[] = [
  {
    id: 'notif_1',
    type: 'like',
    sender: sampleUsers[1],
    recipientId: 'user_current',
    postId: 'post_6',
    postSnippet: 'Gather is officially welcoming its first community cohorts...',
    message: 'liked your announcement post',
    createdAt: '12m ago',
    isRead: false
  },
  {
    id: 'notif_2',
    type: 'comment',
    sender: sampleUsers[2],
    recipientId: 'user_current',
    postId: 'post_6',
    postSnippet: 'The quiet warmth in this frame is breathtaking...',
    message: 'replied to your comment on Clara Moreau’s post',
    createdAt: '45m ago',
    isRead: false
  },
  {
    id: 'notif_3',
    type: 'follow',
    sender: sampleUsers[3],
    recipientId: 'user_current',
    message: 'started following you',
    createdAt: '3h ago',
    isRead: false
  },
  {
    id: 'notif_4',
    type: 'community',
    sender: sampleUsers[1],
    recipientId: 'user_current',
    communityName: 'Design Circle',
    message: 'published a popular discussion in Design Circle',
    createdAt: '6h ago',
    isRead: true
  },
  {
    id: 'notif_5',
    type: 'mention',
    sender: sampleUsers[5],
    recipientId: 'user_current',
    postId: 'post_5',
    message: 'mentioned you in a post in Indie Builders',
    createdAt: '1d ago',
    isRead: true
  }
];

export const sampleConversations: Conversation[] = [
  {
    id: 'conv_marcus',
    participant: sampleUsers[1],
    lastMessage: 'Let’s sync on the spacing tokens for the new card layouts tomorrow morning.',
    lastMessageTime: '10:24 AM',
    unreadCount: 1
  },
  {
    id: 'conv_clara',
    participant: sampleUsers[2],
    lastMessage: 'I sent you high-res RAW scans of the Amalfi coast series via the cloud drive!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: 'conv_kai',
    participant: sampleUsers[5],
    lastMessage: 'Thanks for the feedback on our signup funnel Elena! We implemented your suggestion.',
    lastMessageTime: 'Oct 10',
    unreadCount: 0
  }
];

export const sampleMessages: Record<string, Message[]> = {
  conv_marcus: [
    {
      id: 'm_1',
      conversationId: 'conv_marcus',
      senderId: 'user_marcus',
      receiverId: 'user_current',
      text: 'Hey Elena! Did you see the revised typography hierarchy guidelines from the Design Circle thread?',
      createdAt: '10:15 AM',
      isRead: true
    },
    {
      id: 'm_2',
      conversationId: 'conv_marcus',
      senderId: 'user_current',
      receiverId: 'user_marcus',
      text: 'Yes! The decision to ban pill capsules on static metadata makes the post feed look tenfold more editorial.',
      createdAt: '10:19 AM',
      isRead: true
    },
    {
      id: 'm_3',
      conversationId: 'conv_marcus',
      senderId: 'user_marcus',
      receiverId: 'user_current',
      text: 'Let’s sync on the spacing tokens for the new card layouts tomorrow morning.',
      createdAt: '10:24 AM',
      isRead: false
    }
  ],
  conv_clara: [
    {
      id: 'm_4',
      conversationId: 'conv_clara',
      senderId: 'user_clara',
      receiverId: 'user_current',
      text: 'Elena, congratulations on the launch! The app feels so serene and focused.',
      createdAt: 'Yesterday, 3:12 PM',
      isRead: true
    },
    {
      id: 'm_5',
      conversationId: 'conv_clara',
      senderId: 'user_current',
      receiverId: 'user_clara',
      text: 'Thank you Clara! Your photography sets the bar for authentic visual storytelling in the feed.',
      createdAt: 'Yesterday, 3:20 PM',
      isRead: true
    },
    {
      id: 'm_6',
      conversationId: 'conv_clara',
      senderId: 'user_clara',
      receiverId: 'user_current',
      text: 'I sent you high-res RAW scans of the Amalfi coast series via the cloud drive!',
      createdAt: 'Yesterday, 4:05 PM',
      isRead: true
    }
  ],
  conv_kai: [
    {
      id: 'm_7',
      conversationId: 'conv_kai',
      senderId: 'user_current',
      receiverId: 'user_kai',
      text: 'Kai, great writeup on reducing latency. Users definitely appreciate speed over gimmicks.',
      createdAt: 'Oct 10, 9:00 AM',
      isRead: true
    },
    {
      id: 'm_8',
      conversationId: 'conv_kai',
      senderId: 'user_kai',
      receiverId: 'user_current',
      text: 'Thanks for the feedback on our signup funnel Elena! We implemented your suggestion.',
      createdAt: 'Oct 10, 11:42 AM',
      isRead: true
    }
  ]
};

export const sampleReports: Report[] = [
  {
    id: 'rep_1',
    postId: 'post_7',
    post: samplePosts[6],
    reporter: sampleUsers[3],
    reason: 'spam',
    details: 'Testing the moderation workflow for flagged content demonstration.',
    status: 'pending',
    createdAt: '2026-10-12T06:00:00Z'
  }
];

export const defaultSettings: UserSettings = {
  isPrivate: false,
  allowDirectMessages: 'everyone',
  emailNotifications: true,
  pushNotifications: true,
  showActivityStatus: true,
  theme: 'light',
  mutedUserIds: [],
  blockedUserIds: []
};

export const sampleUpcomingEvents = [
  {
    id: 'ev_1',
    title: 'Typographic Hierarchy Crit',
    community: 'Design Circle',
    date: 'Thu, Oct 15 · 6:00 PM',
    attendeesCount: 84
  },
  {
    id: 'ev_2',
    title: 'Autumn Golden Hour Walk',
    community: 'Photography Club',
    date: 'Sat, Oct 17 · 4:30 PM',
    attendeesCount: 42
  },
  {
    id: 'ev_3',
    title: 'Indie Revenue Retrospective',
    community: 'Indie Builders',
    date: 'Tue, Oct 20 · 7:00 PM',
    attendeesCount: 119
  }
];

export const sampleTrendingTopics = [
  { tag: 'EditorialDesign', category: 'Design', postsCount: '1.4k' },
  { tag: 'AmalfiCoast', category: 'Travel', postsCount: '920' },
  { tag: 'IndieSaaS', category: 'Technology', postsCount: '2.8k' },
  { tag: 'ColdFermentation', category: 'Culinary', postsCount: '480' },
  { tag: 'TrailLongevity', category: 'Fitness', postsCount: '630' }
];
