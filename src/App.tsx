import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Header } from '@/components/Header';
import { TabNav } from '@/components/TabNav';
import { VibeMatchTab } from '@/components/VibeMatchTab';
import { BridgeOfNeedsTab } from '@/components/BridgeOfNeedsTab';
import { MessagesTab } from '@/components/MessagesTab';
import { FacilitiesTab } from '@/components/FacilitiesTab';
import { MarketTab, starterListings, type MarketListing } from '@/components/MarketTab';
import { NeighborhoodMapTab } from '@/components/NeighborhoodMapTab';
import { VoiceBoxTab } from '@/components/VoiceBoxTab';
import { ProfileTab } from '@/components/ProfileTab';
import { ProfileModal } from '@/components/ProfileModal';
import {
  type TabId,
  type Conversation,
  type NeedRequest,
  type NeighborProfile,
  type UserProfile,
  type FacilityBooking,
  type FriendRequest,
  type Facility,
  type Moment,
  type VoiceFeedback,
  needs as seedNeeds,
  initialConversations,
  neighborProfiles,
  initialUserProfile,
  initialFriendRequests,
  initialBookings,
} from '@/data/mockData';

const personaScale: Record<string, string> = {
  elder: 'text-[17px] [&_*]:!rounded-[1.4rem]',
  teen: '',
  me: '',
};

export default function App() {
  const [tab, setTab] = useState<TabId>('vibe');
  const [focusVoiceBoxOnOpen, setFocusVoiceBoxOnOpen] = useState(false);
  const [personaId, setPersonaId] = useState('me');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // User profile
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [facilityBookings, setFacilityBookings] = useState<FacilityBooking[]>(initialBookings);

  // Needs state
  const [needs, setNeeds] = useState<NeedRequest[]>(seedNeeds);

  // Friend requests state
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(initialFriendRequests);

  // Messages state
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Friend status state: neighborId -> 'none' | 'pending' | 'friends'
  const [friendStatuses, setFriendStatuses] = useState<Record<string, 'none' | 'pending' | 'friends'>>(() => {
    const initial: Record<string, 'none' | 'pending' | 'friends'> = {};
    neighborProfiles.forEach((p) => {
      initial[p.id] = p.friendStatus;
    });
    return initial;
  });

  // Neighbor profile modal state
  const [activeProfile, setActiveProfile] = useState<NeighborProfile | null>(null);

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Toggle friend status
  const handleToggleFriend = (neighborId: string) => {
    setFriendStatuses((prev) => {
      const current = prev[neighborId] || 'none';
      let next: 'none' | 'pending' | 'friends' = 'pending';
      if (current === 'none') {
        next = 'pending';
        // Add to outgoing friend requests list
        const neighbor = neighborProfiles.find((p) => p.id === neighborId);
        if (neighbor) {
          setFriendRequests((prevReqs) => [
            ...prevReqs,
            {
              id: `fr-out-${Date.now()}`,
              neighborId: neighbor.id,
              name: neighbor.name,
              unit: neighbor.unit,
              initials: neighbor.initials,
              avatarColor: neighbor.avatarColor,
              type: 'outgoing',
              time: 'Just now',
            },
          ]);
        }
      } else if (current === 'pending') {
        next = 'friends';
      } else {
        next = 'none';
      }

      return { ...prev, [neighborId]: next };
    });
  };

  // View profile helper
  const handleViewProfile = (identifier: string) => {
    const found =
      neighborProfiles.find((p) => p.id === identifier) ??
      neighborProfiles.find((p) => identifier.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])) ??
      neighborProfiles[0];

    setActiveProfile(found);
  };

  // Open chat with a specific neighbor
  const handleOpenChat = (neighborIdOrName: string, topic?: string) => {
    const neighbor =
      neighborProfiles.find((p) => p.id === neighborIdOrName) ??
      neighborProfiles.find((p) => neighborIdOrName.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])) ??
      neighborProfiles[0];

    const existing = conversations.find(
      (c) => c.participantId === neighbor.id || c.participantName.includes(neighbor.initials)
    );

    if (existing) {
      setActiveConversationId(existing.id);
      setConversations((prev) =>
        prev.map((c) => (c.id === existing.id ? { ...c, unreadCount: 0 } : c))
      );
    } else {
      const newConv: Conversation = {
        id: `c-${Date.now()}`,
        participantId: neighbor.id,
        participantName: `${neighbor.name} (${neighbor.unit})`,
        participantUnit: neighbor.unit,
        participantAvatarColor: neighbor.avatarColor,
        participantInitials: neighbor.initials,
        online: neighbor.online,
        topic: topic ?? 'Neighborhood chat',
        lastMessage: 'Started a new conversation',
        lastTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'me',
            text: `Hi ${neighbor.name.split(' ')[0]}! Great to connect with you on HomeSweetHome.`,
            time: 'Just now',
          },
        ],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
    }

    setTab('messages');
  };

  // Offer help flow: triggered from Bridge of Needs
  const handleOfferHelp = (need: NeedRequest) => {
    // 1. Update need status to in-progress
    setNeeds((prev) =>
      prev.map((n) =>
        n.id === need.id
          ? {
              ...n,
              status: 'In Progress',
              helper: 'You — Jordan (Unit 3B)',
              progressStep: 'doing',
            }
          : n
      )
    );

    // 2. Open chat in Messages
    const authorFirstName = need.author.split(' ')[0];
    const helpOfferText = `Hi ${authorFirstName}! 👋 I saw your request for "${need.title}". I'm in Unit 3B and would be happy to help! Let me know what time works best for you.`;

    const existing = conversations.find((c) => c.participantName.includes(need.author.split(' ')[0]));
    let convId = '';

    if (existing) {
      convId = existing.id;
      setConversations((prev) =>
        prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                topic: `Helping with: ${need.title}`,
                unreadCount: 0,
                lastMessage: helpOfferText,
                lastTime: 'Just now',
                messages: [
                  ...c.messages,
                  {
                    id: `msg-${Date.now()}`,
                    sender: 'me',
                    text: helpOfferText,
                    time: 'Just now',
                  },
                ],
              }
            : c
        )
      );
    } else {
      convId = `c-help-${Date.now()}`;
      const newConv: Conversation = {
        id: convId,
        participantId: need.author,
        participantName: need.author,
        participantUnit: need.author.includes('(') ? need.author.split('(')[1].replace(')', '') : 'Maplewood',
        participantAvatarColor: need.avatarColor,
        participantInitials: need.initials,
        online: true,
        topic: `Helping with: ${need.title}`,
        lastMessage: helpOfferText,
        lastTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'me',
            text: helpOfferText,
            time: 'Just now',
          },
        ],
      };
      setConversations((prev) => [newConv, ...prev]);
    }

    setActiveConversationId(convId);
    setTab('messages');
  };

  // Update help status
  const handleUpdateHelpStatus = (
    needId: string,
    newStatus: NeedRequest['status'],
    step?: NeedRequest['progressStep']
  ) => {
    setNeeds((prev) =>
      prev.map((n) =>
        n.id === needId
          ? {
              ...n,
              status: newStatus,
              progressStep: step ?? n.progressStep,
            }
          : n
      )
    );

  };

  // Facility session booking
  const handleBookFacility = (facility: Facility, date: string, timeSlot: string): boolean => {
    // Record booking
    const newBooking: FacilityBooking = {
      id: `bk-${Date.now()}`,
      facilityId: facility.id,
      facilityName: facility.name,
      facilityIcon: facility.icon,
      date,
      timeSlot,
      costKarma: 0,
      status: 'confirmed',
      bookedAt: 'Just now',
    };
    setFacilityBookings((prev) => [newBooking, ...prev]);

    return true;
  };

  // Friend Request actions
  const handleAcceptFriendRequest = (requestId: string) => {
    const req = friendRequests.find((r) => r.id === requestId);
    if (req) {
      setFriendStatuses((prev) => ({ ...prev, [req.neighborId]: 'friends' }));
      setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));
    }
  };

  const handleDeclineFriendRequest = (requestId: string) => {
    setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const handleCancelOutgoingRequest = (requestId: string) => {
    const req = friendRequests.find((r) => r.id === requestId);
    if (req) {
      setFriendStatuses((prev) => ({ ...prev, [req.neighborId]: 'none' }));
      setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));
    }
  };

  // Send message in active chat
  const handleSendMessage = (conversationId: string, text: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me' as const,
      text,
      time: 'Just now',
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: text,
              lastTime: 'Just now',
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );

    // Friendly auto-reply simulation
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversationId) {
            const replies = [
              'Thank you so much! That is super kind of you.',
              'Sounds wonderful! I really appreciate the neighborly help.',
              'Awesome, see you then! Have a great day!',
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            return {
              ...c,
              lastMessage: randomReply,
              lastTime: 'Just now',
              messages: [
                ...c.messages,
                {
                  id: `reply-${Date.now()}`,
                  sender: 'them' as const,
                  text: randomReply,
                  time: 'Just now',
                },
              ],
            };
          }
          return c;
        })
      );
    }, 1400);
  };

  const [voiceHistory, setVoiceHistory] = useState<VoiceFeedback[]>([]);
  const [ownPosts, setOwnPosts] = useState<Moment[]>([]);
  const [marketListings, setMarketListings] = useState<MarketListing[]>(starterListings);
  const currentUserName = userProfile.name.split(' ')[0];

  const openMarketChat = (listing: MarketListing) => {
    const person = listing.seller;
    const existing = conversations.find((c) => c.participantName.toLowerCase().includes(person.toLowerCase()));
    const intro = `Hi ${person}! I’m messaging about “${listing.title}” on the Market.`;
    const id = existing?.id ?? `c-market-${Date.now()}`;
    if (existing) {
      setConversations((prev) => prev.map((c) => c.id === id ? { ...c, topic: `Market: ${listing.title}`, lastMessage: intro, lastTime: 'Just now', unreadCount: 0, messages: [...c.messages, { id: `msg-${Date.now()}`, sender: 'me', text: intro, time: 'Just now' }] } : c));
    } else {
      const neighbor = neighborProfiles.find((p) => p.name === person) ?? neighborProfiles[0];
      const newConv: Conversation = { id, participantId: neighbor.id, participantName: `${person} (${listing.unit})`, participantUnit: listing.unit, participantAvatarColor: listing.avatarColor, participantInitials: listing.initials, online: neighbor.online, topic: `Market: ${listing.title}`, lastMessage: intro, lastTime: 'Just now', unreadCount: 0, messages: [{ id: `msg-${Date.now()}`, sender: 'me', text: intro, time: 'Just now' }] };
      setConversations((prev) => [newConv, ...prev]);
    }
    setActiveConversationId(id);
    setTab('messages');
  };

  const openPropertyChat = () => {
    const id = 'property-office';
    if (!conversations.some((c) => c.id === id)) {
      setConversations((prev) => [{ id, participantId: id, participantName: 'Maplewood Property Office', participantUnit: 'Management', participantAvatarColor: 'bg-sage-500', participantInitials: 'MO', online: true, topic: 'Property support', lastMessage: 'How can we help with your request?', lastTime: 'Now', unreadCount: 0, messages: [{ id: 'property-welcome', sender: 'them', text: 'Hello Jordan, how can we help with your request?', time: 'Now' }] }, ...prev]);
    }
    setActiveConversationId(id);
    setTab('messages');
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
        ? 'dark bg-gradient-to-br from-[#17142B] via-[#302344] to-[#182C3B] text-[#FFF8FE]'
          : 'bg-gradient-to-b from-[#FFF0F3] via-[#FCE4E8] to-[#F8D2DA] text-[#2C181C]'
      } ${personaScale[personaId] ?? ''}`}
    >
      <Header
        personaId={personaId}
        onPersonaChange={setPersonaId}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((v) => !v)}
      />

      <main className="mx-auto max-w-md px-4 pt-3.5 pb-28">
        {tab === 'vibe' && (
          <VibeMatchTab
            onNavigate={(destination) => {
              setActiveConversationId(null);
              if (destination === 'voice') {
                setFocusVoiceBoxOnOpen(false);
                setTab('voice');
                return;
              }
              if (destination === 'map' || destination === 'market') {
                setFocusVoiceBoxOnOpen(false);
                setTab(destination);
                return;
              }
              setFocusVoiceBoxOnOpen(false);
              setTab(destination);
            }}
            friendStatuses={friendStatuses}
            onToggleFriend={handleToggleFriend}
            onViewProfile={handleViewProfile}
            onOpenChat={handleOpenChat}
            onCreatePost={(post) => setOwnPosts((posts) => [post, ...posts])}
          />
        )}
        {tab === 'bridge' && (
          <BridgeOfNeedsTab
            needs={needs}
            onOfferHelp={handleOfferHelp}
            onViewProfile={handleViewProfile}
            onAddNeed={(newNeed) => setNeeds((prev) => [newNeed, ...prev])}
            onUpdateStatus={handleUpdateHelpStatus}
            onOpenChat={handleOpenChat}
          />
        )}
        {tab === 'messages' && (
          <MessagesTab
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={(id) => {
              setActiveConversationId(id);
              if (id) {
                setConversations((prev) =>
                  prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
                );
              }
            }}
            onSendMessage={handleSendMessage}
            onViewProfile={handleViewProfile}
          />
        )}
        {tab === 'market' && (
          <MarketTab
            listings={marketListings}
            currentUserName={currentUserName}
            onCreate={(listing) => setMarketListings((prev) => [listing, ...prev])}
            onWant={(listing) => {
              setMarketListings((prev) => prev.map((item) => item.id === listing.id ? { ...item, request: 'pending' } : item));
              const seller = neighborProfiles.find((p) => p.name === listing.seller);
              setConversations((prev) => prev.map((c) => seller && c.participantId === seller.id ? { ...c, unreadCount: c.unreadCount + 1, lastMessage: `Someone wants your item: ${listing.title}`, lastTime: 'Just now' } : c));
            }}
            onDecision={(listing, accepted) => {
              setMarketListings((prev) => accepted ? prev.filter((item) => item.id !== listing.id) : prev.map((item) => item.id === listing.id ? { ...item, request: 'declined' } : item));
              if (accepted) openMarketChat(listing);
            }}
            onOpenChat={openMarketChat}
          />
        )}
        {tab === 'map' && <NeighborhoodMapTab onBack={() => setTab('vibe')} isDarkMode={isDarkMode} onNavigate={(destination) => setTab(destination)} />}
        {tab === 'voice' && <VoiceBoxTab history={voiceHistory} onSubmit={(item) => setVoiceHistory((items) => [item, ...items])} onFollowUp={openPropertyChat} />}
        {tab === 'facilities' && (
          <FacilitiesTab
            focusVoiceBoxOnOpen={focusVoiceBoxOnOpen}
            onBookFacility={handleBookFacility}
            userBookings={facilityBookings}
            onNavigateToProfile={() => setTab('profile')}
            onSubmitFeedback={(item) => setVoiceHistory((items) => [item, ...items])}
          />
        )}
        {(tab === 'profile' || tab === 'friends') && (
          <ProfileTab
            key={tab}
            initialSection={tab === 'friends' ? 'friends' : 'posts'}
            friendStatuses={friendStatuses}
            onToggleFriend={handleToggleFriend}
            onViewNeighborProfile={handleViewProfile}
            onOpenChat={handleOpenChat}
            userProfile={userProfile}
            onUpdateProfile={(updated) => setUserProfile((prev) => ({ ...prev, ...updated }))}
            friendRequests={friendRequests}
            bookings={facilityBookings}
            posts={ownPosts}
            voiceHistory={voiceHistory}
            onAcceptFriendRequest={handleAcceptFriendRequest}
            onDeclineFriendRequest={handleDeclineFriendRequest}
            onCancelOutgoingRequest={handleCancelOutgoingRequest}
          />
        )}
      </main>

      <footer className="mx-auto max-w-md px-4 pb-20 pt-2 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-ink-700/40">
          HomeSweetHome <Heart className="h-3 w-3 fill-rose-400 text-rose-400" /> for Maplewood neighbors
        </p>
      </footer>

      {/* Bottom Navigation Bar */}
      <TabNav
        active={tab}
        onChange={(newTab) => {
          setTab(newTab);
          if (newTab !== 'facilities') setFocusVoiceBoxOnOpen(false);
          if (newTab !== 'messages') {
            setActiveConversationId(null);
          }
        }}
        unreadCount={totalUnread}
        isDarkMode={isDarkMode}
      />

      {/* Neighbor Profile Modal */}
      {activeProfile && (
        <ProfileModal
          profile={activeProfile}
          friendStatus={friendStatuses[activeProfile.id] || activeProfile.friendStatus}
          onToggleFriend={handleToggleFriend}
          onSendMessage={(p) => {
            setActiveProfile(null);
            handleOpenChat(p.id);
          }}
          onClose={() => setActiveProfile(null)}
        />
      )}
    </div>
  );
}
