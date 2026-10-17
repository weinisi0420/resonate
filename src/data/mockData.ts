export type TabId = 'vibe' | 'bridge' | 'messages' | 'facilities' | 'profile' | 'friends';

export interface Moment {
  id: string;
  author: string;
  avatarColor: string;
  initials: string;
  time: string;
  text: string;
  hasPhoto: boolean;
  photoHue: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

export interface CompanionMatch {
  name: string;
  initials: string;
  avatarColor: string;
  score: number;
  reason: string;
  sharedInterests: string[];
  distance: number;
  icebreaker: string;
  online: boolean;
}

export interface NeedRequest {
  id: string;
  title: string;
  category: 'Tool Borrowing' | 'Quick Favor' | 'Item Share';
  status: 'Open' | 'In Progress' | 'Fulfilled';
  distance: number;
  karma: number;
  author: string;
  initials: string;
  avatarColor: string;
  time: string;
  description: string;
  helper?: string;
  helperId?: string;
  progressStep?: 'offered' | 'doing' | 'completed_pending_approval' | 'approved';
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
  occupancy: number;
  status: 'Quiet' | 'Comfortable' | 'Busy' | 'Full';
  note: string;
  hours: string;
  costKarma: number;
}

export interface VoiceFeedback {
  id: string;
  topic: string;
  preview: string;
  category: string;
  date: string;
  status: 'Submitted' | 'AI Polished' | 'Sent to Property Mgmt';
}

export const moments: Moment[] = [
  {
    id: 'm1',
    author: 'Priya (Unit 4B)',
    avatarColor: 'terracotta',
    initials: 'Pr',
    time: '12 min ago',
    text: 'Cooking curry tonight! Made too much as usual — jar at the lobby if anyone wants some 🍲',
    hasPhoto: true,
    photoHue: 'from-terracotta-200 to-terracotta-400',
    likes: 14,
    comments: 3,
  },
  {
    id: 'm2',
    author: 'Marcus (Unit 2A)',
    avatarColor: 'sage',
    initials: 'Ma',
    time: '1 hr ago',
    text: 'Anyone else hear that owl on the rooftop garden last night? Pure magic at 2am.',
    hasPhoto: false,
    photoHue: '',
    likes: 22,
    comments: 7,
  },
  {
    id: 'm3',
    author: 'Esther (Unit 6C)',
    avatarColor: 'sand',
    initials: 'Es',
    time: '3 hr ago',
    text: 'Left a stack of mystery novels by the mailboxes. Take one, leave one — happy reading!',
    hasPhoto: true,
    photoHue: 'from-sage-200 to-sage-300',
    likes: 31,
    comments: 5,
  },
  {
    id: 'm4',
    author: 'Dev (Unit 3D)',
    avatarColor: 'terracotta',
    initials: 'De',
    time: '5 hr ago',
    text: 'Trying out a new pour-over ratio this morning. The whole hallway smells amazing.',
    hasPhoto: false,
    photoHue: '',
    likes: 9,
    comments: 1,
  },
];

export const companionMatches: CompanionMatch[] = [
  {
    name: 'Alex Chen',
    initials: 'Al',
    avatarColor: 'sage',
    score: 94,
    reason: 'Both of you enjoy late-night jazz & indie coffee shops within 400m.',
    sharedInterests: ['Late-night jazz', 'Indie coffee', 'Book swaps', 'Quiet mornings'],
    distance: 120,
    icebreaker: 'Ask Alex for his favorite coffee bean recommendation.',
    online: true,
  },
  {
    name: 'Clara Vance',
    initials: 'Cl',
    avatarColor: 'terracotta',
    score: 96,
    reason: 'Shared passion for sourdough culture, botanical balcony gardens, and morning cycling.',
    sharedInterests: ['Sourdough baking', 'Balcony gardening', 'Morning cycling', 'Tea brewing'],
    distance: 90,
    icebreaker: 'Ask Clara about her rosemary sourdough recipe.',
    online: true,
  },
  {
    name: 'Lucas Rivera',
    initials: 'Lu',
    avatarColor: 'sand',
    score: 91,
    reason: 'You both enjoy acoustic vinyl sessions, indie design podcasts, and strategy board games.',
    sharedInterests: ['Acoustic vinyl', 'Board games', 'Retro design', 'Quiet mornings'],
    distance: 140,
    icebreaker: 'Invite Lucas for a 2-player game of Catan this weekend.',
    online: false,
  },
  {
    name: 'Maya Patel',
    initials: 'Ma',
    avatarColor: 'sage',
    score: 89,
    reason: 'Both of you love rooftop meditation, loose-leaf chai teas, and weekend farmers markets.',
    sharedInterests: ['Farmers markets', 'Chai brewing', 'Plant swaps', 'Meditation'],
    distance: 70,
    icebreaker: 'Ask Maya where she gets fresh cardamom pods nearby.',
    online: true,
  },
];

export const companionMatch: CompanionMatch = companionMatches[0];

export const needs: NeedRequest[] = [
  {
    id: 'n-own-1',
    title: 'Help mount bathroom mirror (20 mins)',
    category: 'Quick Favor',
    status: 'In Progress',
    distance: 0,
    karma: 3,
    author: 'You — Jordan (Unit 3B)',
    initials: 'Jo',
    avatarColor: 'terracotta',
    time: '1 hr ago',
    description: 'Need someone to hold the heavy mirror level while I screw the brackets into the wall studs.',
    helper: 'Marcus (Unit 2A)',
    helperId: 'marcus',
    progressStep: 'completed_pending_approval',
  },
  {
    id: 'n1',
    title: 'Need a step ladder for 30 mins',
    category: 'Tool Borrowing',
    status: 'Open',
    distance: 150,
    karma: 1,
    author: 'Sarah K. (Unit 5A)',
    initials: 'Sa',
    avatarColor: 'terracotta',
    time: '25 min ago',
    description: 'Changing a ceiling bulb — I promise to return it within the hour!',
  },
  {
    id: 'n2',
    title: 'Water my plants over the weekend',
    category: 'Quick Favor',
    status: 'In Progress',
    distance: 80,
    karma: 3,
    author: 'Theo R. (Unit 2B)',
    initials: 'Th',
    avatarColor: 'sage',
    time: '2 hr ago',
    description: 'Three pots on the balcony. Takes about 5 minutes. I\'ll bring back a souvenir!',
    helper: 'Marcus (Unit 2A)',
  },
  {
    id: 'n3',
    title: 'Extra sourdough starter to share',
    category: 'Item Share',
    status: 'Open',
    distance: 200,
    karma: 0,
    author: 'Nadia M. (Unit 7D)',
    initials: 'Na',
    avatarColor: 'sand',
    time: '4 hr ago',
    description: 'My starter got too bubbly. Free to a good home — comes with a recipe card.',
  },
  {
    id: 'n4',
    title: 'Help carry a package upstairs',
    category: 'Quick Favor',
    status: 'Open',
    distance: 60,
    karma: 2,
    author: 'Mr. Oliveira (Unit 1A)',
    initials: 'Mr',
    avatarColor: 'terracotta',
    time: '40 min ago',
    description: 'One large box, ground floor to first floor. My knee isn\'t what it used to be.',
  },
  {
    id: 'n5',
    title: 'Borrow a power drill (2 hrs)',
    category: 'Tool Borrowing',
    status: 'Fulfilled',
    distance: 110,
    karma: 2,
    author: 'Lena F. (Unit 4C)',
    initials: 'Le',
    avatarColor: 'sage',
    time: 'Yesterday',
    description: 'Mounting a shelf. Returned clean with a thank-you plant cutting.',
    helper: 'Dev (Unit 3D)',
  },
];

export const facilities: Facility[] = [
  {
    id: 'f1',
    name: 'Rooftop Garden Terrace',
    icon: 'leaf',
    occupancy: 20,
    status: 'Quiet',
    note: 'Panoramic skyline view & quiet reading cabanas.',
    hours: '6 AM – 10 PM',
    costKarma: 3,
  },
  {
    id: 'f2',
    name: 'Co-working Quiet Pod',
    icon: 'laptop',
    occupancy: 85,
    status: 'Busy',
    note: 'Ergonomic dual-monitor workspace with high-speed Wi-Fi.',
    hours: '24 / 7',
    costKarma: 2,
  },
  {
    id: 'f3',
    name: 'Laundry Room Express',
    icon: 'washing-machine',
    occupancy: 45,
    status: 'Comfortable',
    note: 'Reserve your washer & dryer slot with zero wait time.',
    hours: '6 AM – 11 PM',
    costKarma: 1,
  },
  {
    id: 'f4',
    name: 'Community Lounge & Kitchen',
    icon: 'sofa',
    occupancy: 60,
    status: 'Comfortable',
    note: 'Host small neighbor dinner or board game evening.',
    hours: '7 AM – 11 PM',
    costKarma: 4,
  },
  {
    id: 'f5',
    name: 'Fitness Studio Solo Slot',
    icon: 'dumbbell',
    occupancy: 10,
    status: 'Quiet',
    note: 'Private 1-hour booking for weights, yoga, or stretching.',
    hours: '5 AM – 11 PM',
    costKarma: 2,
  },
];

export const voiceFeedback: VoiceFeedback[] = [
  {
    id: 'v1',
    topic: 'Laundry room needs better lighting',
    preview: 'Two of the ceiling lights flicker, making it hard to fold in the evenings.',
    category: 'Maintenance',
    date: '2 days ago',
    status: 'Sent to Property Mgmt',
  },
  {
    id: 'v2',
    topic: 'More benches on the rooftop garden',
    preview: 'Lovely space, but only three seats near the shade side.',
    category: 'Amenities',
    date: '5 days ago',
    status: 'AI Polished',
  },
];

export const personaProfiles = [
  { id: 'me', name: 'You — Jordan', initials: 'Jo', color: 'terracotta', role: 'Resident · Unit 3B' },
  { id: 'elder', name: 'Esther (Elder mode)', initials: 'Es', color: 'sage', role: 'Larger text, calmer pace' },
  { id: 'teen', name: 'Mia (Teen mode)', initials: 'Mi', color: 'sand', role: 'Brighter, playful' },
];

export interface NeighborProfile {
  id: string;
  name: string;
  unit: string;
  initials: string;
  avatarColor: string;
  distance: number;
  bio: string;
  sharedInterests: string[];
  friendStatus: 'none' | 'pending' | 'friends';
  online?: boolean;
  karma: number;
  hobbies: string[];
  vibeScore?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantUnit: string;
  participantAvatarColor: string;
  participantInitials: string;
  online?: boolean;
  topic?: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export const neighborProfiles: NeighborProfile[] = [
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    unit: 'Unit 3A',
    initials: 'Al',
    avatarColor: 'sage',
    distance: 120,
    bio: 'Coffee lover, vinyl collector, and rooftop stargazer. Working on indie design projects.',
    sharedInterests: ['Late-night jazz', 'Indie coffee', 'Book swaps', 'Quiet mornings'],
    friendStatus: 'none',
    online: true,
    karma: 18,
    hobbies: ['Vinyl collecting', 'Pour-over brew', 'Jazz piano'],
    vibeScore: 94,
  },
  {
    id: 'sarah-k',
    name: 'Sarah K.',
    unit: 'Unit 5A',
    initials: 'Sa',
    avatarColor: 'terracotta',
    distance: 150,
    bio: 'Plant mom with 30+ houseplants. Always happy to swap monstera cuttings and share gardening tips!',
    sharedInterests: ['Indoor plants', 'Home DIY', 'Gardening', 'Book swaps'],
    friendStatus: 'none',
    online: true,
    karma: 14,
    hobbies: ['Bonsai', 'Ceramics', 'Tea brewing'],
    vibeScore: 88,
  },
  {
    id: 'priya',
    name: 'Priya',
    unit: 'Unit 4B',
    initials: 'Pr',
    avatarColor: 'terracotta',
    distance: 80,
    bio: 'Cooks in family-sized batches. Believer in warm naan, board games, and spontaneous porch chats.',
    sharedInterests: ['Cooking', 'Food sharing', 'Board games', 'Quiet mornings'],
    friendStatus: 'friends',
    online: false,
    karma: 29,
    hobbies: ['Indian cooking', 'Baking', 'Watercolor'],
    vibeScore: 85,
  },
  {
    id: 'marcus',
    name: 'Marcus',
    unit: 'Unit 2A',
    initials: 'Ma',
    avatarColor: 'sage',
    distance: 100,
    bio: 'Night photographer and amateur birder. If you hear someone on the rooftop with binoculars at 1am, it is me.',
    sharedInterests: ['Photography', 'Astronomy', 'Late-night jazz', 'Bird watching'],
    friendStatus: 'friends',
    online: true,
    karma: 22,
    hobbies: ['Night photography', 'Hiking', 'Herbal tea'],
    vibeScore: 82,
  },
  {
    id: 'esther',
    name: 'Esther',
    unit: 'Unit 6C',
    initials: 'Es',
    avatarColor: 'sand',
    distance: 180,
    bio: 'Retired literature teacher. Curator of the lobby mystery book collection and weekend morning walk group.',
    sharedInterests: ['Mystery novels', 'Walking group', 'Knitting', 'Book swaps'],
    friendStatus: 'friends',
    online: false,
    karma: 45,
    hobbies: ['Book club', 'Knitting', 'Gardening'],
    vibeScore: 78,
  },
  {
    id: 'theo-r',
    name: 'Theo R.',
    unit: 'Unit 2B',
    initials: 'Th',
    avatarColor: 'sage',
    distance: 80,
    bio: 'Architect with a balcony garden that is wildly thriving. Weekend cyclist and sketcher.',
    sharedInterests: ['Cycling', 'Balcony gardening', 'Design', 'Indie coffee'],
    friendStatus: 'none',
    online: false,
    karma: 11,
    hobbies: ['Urban cycling', 'Sketching', 'Baking bread'],
    vibeScore: 75,
  },
  {
    id: 'nadia-m',
    name: 'Nadia M.',
    unit: 'Unit 7D',
    initials: 'Na',
    avatarColor: 'sand',
    distance: 200,
    bio: 'Potter and home baker. Always have bubbly wild sourdough starter looking for loving homes.',
    sharedInterests: ['Sourdough', 'Ceramics', 'Food sharing', 'Farmer markets'],
    friendStatus: 'pending',
    online: false,
    karma: 16,
    hobbies: ['Sourdough baking', 'Pottery wheels'],
    vibeScore: 80,
  },
  {
    id: 'mr-oliveira',
    name: 'Mr. Oliveira',
    unit: 'Unit 1A',
    initials: 'Mr',
    avatarColor: 'terracotta',
    distance: 60,
    bio: 'Proud Maplewood resident for 14 years. Loves vintage radio repair, porch chess, and acoustic guitar.',
    sharedInterests: ['Classic records', 'Lobby garden', 'Woodworking', 'Quiet mornings'],
    friendStatus: 'none',
    online: false,
    karma: 35,
    hobbies: ['Radio repair', 'Storytelling', 'Chess'],
    vibeScore: 70,
  },
  {
    id: 'dev',
    name: 'Dev',
    unit: 'Unit 3D',
    initials: 'De',
    avatarColor: 'terracotta',
    distance: 90,
    bio: 'Coffee geek with 3 manual grinders. Always experimenting with light roasts and aeroPress brew ratios.',
    sharedInterests: ['Espresso', 'Indie coffee', 'Retro gaming', 'Tech'],
    friendStatus: 'none',
    online: true,
    karma: 15,
    hobbies: ['Pour-over', 'Retro games', 'AeroPress'],
    vibeScore: 86,
  },
];

export const initialConversations: Conversation[] = [
  {
    id: 'c-alex',
    participantId: 'alex-chen',
    participantName: 'Alex Chen',
    participantUnit: 'Unit 3A',
    participantAvatarColor: 'sage',
    participantInitials: 'Al',
    online: true,
    topic: 'Matched via Vibe Match (94% score)',
    lastMessage: 'Not yet! Let me know if you want to check it out this weekend.',
    lastTime: '10:20 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        sender: 'them',
        text: 'Hey Jordan! 👋 Nice to connect through Vibe Match. Saw we both love indie coffee and late-night jazz!',
        time: '10:14 AM',
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'Hey Alex! Absolutely. Have you checked out the new pour-over spot on 4th Street yet?',
        time: '10:18 AM',
      },
      {
        id: 'm3',
        sender: 'them',
        text: 'Not yet! Let me know if you want to check it out this weekend.',
        time: '10:20 AM',
      },
    ],
  },
  {
    id: 'c-marcus',
    participantId: 'marcus',
    participantName: 'Marcus (Unit 2A)',
    participantUnit: 'Unit 2A',
    participantAvatarColor: 'sage',
    participantInitials: 'Ma',
    online: true,
    topic: 'Community Moments',
    lastMessage: 'I got some great owl photos last night on the roof garden!',
    lastTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        sender: 'them',
        text: 'Did you hear the screech owl last night around 2 AM?',
        time: 'Yesterday 2:30 AM',
      },
      {
        id: 'm5',
        sender: 'me',
        text: 'I woke up and went out on the balcony, heard it clearly! Amazing shot you posted.',
        time: 'Yesterday 9:15 AM',
      },
      {
        id: 'm6',
        sender: 'them',
        text: 'I got some great owl photos last night on the roof garden!',
        time: 'Yesterday 9:40 AM',
      },
    ],
  },
  {
    id: 'c-sarah',
    participantId: 'sarah-k',
    participantName: 'Sarah K. (Unit 5A)',
    participantUnit: 'Unit 5A',
    participantAvatarColor: 'terracotta',
    participantInitials: 'Sa',
    online: true,
    topic: 'Helping with: Need a step ladder for 30 mins',
    lastMessage: 'That would be a lifesaver! Whenever you are free.',
    lastTime: '20 min ago',
    unreadCount: 1,
    messages: [
      {
        id: 'm7',
        sender: 'me',
        text: 'Hi Sarah! I saw your post on Bridge of Needs. I have a 5-step aluminum ladder in Unit 3B you can borrow!',
        time: '24 min ago',
      },
      {
        id: 'm8',
        sender: 'them',
        text: 'That would be a lifesaver! Whenever you are free.',
        time: '20 min ago',
      },
    ],
  },
];

export interface KarmaTransaction {
  id: string;
  title: string;
  amount: number; // positive = earned, negative = spent
  type: 'earned_help' | 'spent_facility' | 'bonus';
  date: string;
  relatedPerson?: string;
  status: 'approved' | 'pending';
}

export interface FacilityBooking {
  id: string;
  facilityId: string;
  facilityName: string;
  facilityIcon: string;
  timeSlot: string;
  date: string;
  costKarma: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  bookedAt: string;
}

export interface UserProfile {
  name: string;
  unit: string;
  initials: string;
  avatarColor: string;
  bio: string;
  interests: string[];
  karmaCoins: number;
  totalEarnedKarma: number;
}

export interface FriendRequest {
  id: string;
  neighborId: string;
  name: string;
  unit: string;
  initials: string;
  avatarColor: string;
  type: 'incoming' | 'outgoing';
  time: string;
  note?: string;
}

export const initialUserProfile: UserProfile = {
  name: 'Jordan Lee',
  unit: 'Unit 3B',
  initials: 'Jo',
  avatarColor: 'terracotta',
  bio: 'Passionate home cook, balcony herb grower, and friendly 3rd-floor neighbor. Happy to lend tools, share sourdough, or help carry heavy packages!',
  interests: ['Cooking', 'Tool Sharing', 'Balcony Gardening', 'Late-night Jazz', 'Board Games'],
  karmaCoins: 16,
  totalEarnedKarma: 38,
};

export const initialTransactions: KarmaTransaction[] = [
  {
    id: 'tx-1',
    title: 'Watered balcony plants over the weekend',
    amount: 3,
    type: 'earned_help',
    date: 'Today, 2:15 PM',
    relatedPerson: 'Theo R. (Unit 2B)',
    status: 'approved',
  },
  {
    id: 'tx-2',
    title: 'Helped carry heavy furniture upstairs',
    amount: 2,
    type: 'earned_help',
    date: 'Yesterday, 5:40 PM',
    relatedPerson: 'Mr. Oliveira (Unit 1A)',
    status: 'approved',
  },
  {
    id: 'tx-3',
    title: 'Lent power drill for shelving',
    amount: 2,
    type: 'earned_help',
    date: '2 days ago',
    relatedPerson: 'Lena F. (Unit 4C)',
    status: 'approved',
  },
  {
    id: 'tx-4',
    title: 'Booked Rooftop Garden Terrace sunset slot',
    amount: -3,
    type: 'spent_facility',
    date: '3 days ago',
    status: 'approved',
  },
  {
    id: 'tx-5',
    title: 'HomeSweetHome community welcome bonus',
    amount: 10,
    type: 'bonus',
    date: 'Oct 01, 2026',
    status: 'approved',
  },
];

export const initialFriendRequests: FriendRequest[] = [
  {
    id: 'fr-1',
    neighborId: 'nadia-m',
    name: 'Nadia M.',
    unit: 'Unit 7D',
    initials: 'Na',
    avatarColor: 'sand',
    type: 'incoming',
    time: '2 hours ago',
    note: 'Saw you love baking sourdough too! Would love to swap starters.',
  },
  {
    id: 'fr-2',
    neighborId: 'dev',
    name: 'Dev',
    unit: 'Unit 3D',
    initials: 'De',
    avatarColor: 'terracotta',
    type: 'incoming',
    time: 'Yesterday',
    note: 'Neighbor right next door in 3D — let me know if you ever want fresh pour-over!',
  },
  {
    id: 'fr-3',
    neighborId: 'sarah-k',
    name: 'Sarah K.',
    unit: 'Unit 5A',
    initials: 'Sa',
    avatarColor: 'terracotta',
    type: 'outgoing',
    time: '25 min ago',
    note: 'Friend request sent',
  },
];

export const initialBookings: FacilityBooking[] = [
  {
    id: 'bk-1',
    facilityId: 'f1',
    facilityName: 'Rooftop Garden Terrace',
    facilityIcon: 'leaf',
    timeSlot: '6:00 PM – 7:30 PM',
    date: 'Tomorrow, Oct 18',
    costKarma: 3,
    status: 'confirmed',
    bookedAt: 'Today',
  },
];

