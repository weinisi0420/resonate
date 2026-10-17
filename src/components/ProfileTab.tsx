import { useState } from 'react';
import {
  Edit3,
  Check,
  X,
  UserCheck,
  UserX,
  Calendar,
} from 'lucide-react';
import type {
  UserProfile,
  FriendRequest,
  FacilityBooking,
  Moment,
  VoiceFeedback,
} from '@/data/mockData';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { cn } from '@/utils/cn';

interface ProfileTabProps {
  initialSection?: 'posts' | 'friends' | 'bookings' | 'voice';
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  friendRequests: FriendRequest[];
  bookings: FacilityBooking[];
  posts: Moment[];
  voiceHistory: VoiceFeedback[];
  onAcceptFriendRequest: (requestId: string) => void;
  onDeclineFriendRequest: (requestId: string) => void;
  onCancelOutgoingRequest: (requestId: string) => void;
}

export function ProfileTab({
  initialSection = 'posts',
  userProfile,
  onUpdateProfile,
  friendRequests,
  bookings,
  posts,
  voiceHistory,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onCancelOutgoingRequest,
}: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editUnit, setEditUnit] = useState(userProfile.unit);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [newInterest, setNewInterest] = useState('');
  const [interestsList, setInterestsList] = useState(userProfile.interests);

  const [activeSection, setActiveSection] = useState<'posts' | 'friends' | 'bookings' | 'voice'>(initialSection);

  const incomingRequests = friendRequests.filter((r) => r.type === 'incoming');
  const outgoingRequests = friendRequests.filter((r) => r.type === 'outgoing');

  const handleSaveProfile = () => {
    onUpdateProfile({
      name: editName.trim() || userProfile.name,
      unit: editUnit.trim() || userProfile.unit,
      bio: editBio.trim() || userProfile.bio,
      interests: interestsList,
      initials: (editName.trim() || userProfile.name).slice(0, 2).toUpperCase(),
    });
    setIsEditing(false);
  };

  const handleAddInterest = () => {
    if (!newInterest.trim() || interestsList.includes(newInterest.trim())) return;
    setInterestsList([...interestsList, newInterest.trim()]);
    setNewInterest('');
  };

  const handleRemoveInterest = (item: string) => {
    setInterestsList(interestsList.filter((i) => i !== item));
  };

  return (
    <div className="space-y-4 animate-fade-in pb-24">
      {/* User Profile Card with Pink Gradient */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-[#F5B5B8]/40 via-white to-[#FDF2E1] p-5 shadow-soft border border-[#EB99A7]/40">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <Avatar initials={userProfile.initials} color="terracotta" size="lg" />
            <div className="min-w-0">
              <h2 className="font-display text-xl font-bold text-ink-900 truncate">{userProfile.name}</h2>
              <p className="text-xs font-semibold text-[#CB6375] mt-0.5">{userProfile.unit} · Maplewood</p>
              <p className="mt-1 text-[10px] text-ink-700/50">Resident</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="tap-scale flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#CB6375] shadow-soft border border-[#EB99A7]/40 hover:bg-rose-50 transition-colors"
          >
            {isEditing ? (
              <>
                <X className="h-3.5 w-3.5" /> Cancel
              </>
            ) : (
              <>
                <Edit3 className="h-3.5 w-3.5" /> Edit
              </>
            )}
          </button>
        </div>

        {/* Inline Profile Edit Form */}
        {isEditing ? (
          <div className="mt-4 space-y-3 rounded-3xl bg-white p-4 shadow-soft border border-[#EB99A7]/40 animate-slide-up">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#CB6375]">Edit Your Profile</h3>
            <div>
              <label className="text-[11px] font-bold text-ink-700/60">Display Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="mt-1 w-full rounded-xl bg-[#FDF2E1] px-3 py-2 text-xs text-ink-900 border border-[#F4D6D3] focus:outline-none focus:border-[#CB6375]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-ink-700/60">Apartment / Unit</label>
              <input
                type="text"
                value={editUnit}
                onChange={(e) => setEditUnit(e.target.value)}
                className="mt-1 w-full rounded-xl bg-[#FDF2E1] px-3 py-2 text-xs text-ink-900 border border-[#F4D6D3] focus:outline-none focus:border-[#CB6375]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-ink-700/60">Neighbor Bio</label>
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-xl bg-[#FDF2E1] px-3 py-2 text-xs text-ink-900 border border-[#F4D6D3] focus:outline-none focus:border-[#CB6375]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-ink-700/60">Interests & Hobbies</label>
              <div className="mt-1 flex flex-wrap gap-1.5 mb-2">
                {interestsList.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1 rounded-full bg-[#F4D6D3] text-[#CB6375] px-2.5 py-0.5 text-[11px] font-semibold"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="hover:text-rose-900 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add an interest..."
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                  className="flex-1 rounded-xl bg-[#FDF2E1] px-3 py-1.5 text-xs text-ink-900 border border-[#F4D6D3] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddInterest}
                  className="tap-scale rounded-xl bg-gradient-to-r from-[#CB6375] to-[#EB99A7] px-3 py-1.5 text-xs font-bold text-white shadow-soft"
                >
                  Add
                </button>
              </div>
            </div>
            <button
              onClick={handleSaveProfile}
              className="tap-scale flex w-full items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#CB6375] to-[#EB99A7] py-2.5 text-xs font-bold text-white shadow-soft transition-all"
            >
              <Check className="h-4 w-4" /> Save Profile Changes
            </button>
          </div>
        ) : (
          <div className="mt-3 text-xs text-ink-800 leading-relaxed">
            <p>{userProfile.bio}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {userProfile.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-white/80 border border-[#EB99A7]/40 px-2.5 py-0.5 text-[11px] font-semibold text-[#CB6375]"
                >
                  #{interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="grid grid-cols-4 gap-1 bg-white p-1 rounded-2xl border border-[#EB99A7]/30 shadow-soft">
        {([
          ['posts', 'Posts'], ['friends', 'Friends'], ['bookings', 'Spaces'], ['voice', 'Voice Box'],
        ] as const).map(([id, label]) => (
          <button key={id} onClick={() => setActiveSection(id)} className={cn('tap-scale px-1 py-2 rounded-xl text-center text-[11px] font-bold transition-all', activeSection === id ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white shadow-soft' : 'text-ink-700/60 hover:text-ink-900')}>
            {label}
          </button>
        ))}

      </div>

      {activeSection === 'posts' && (
        <section className="space-y-3 animate-slide-up">
          <h3 className="font-display text-sm font-bold text-ink-900">Your posts</h3>
          {posts.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 text-center shadow-soft border border-[#EB99A7]/30 text-xs text-ink-700/60">Your shared posts will appear here.</div>
          ) : posts.map((post) => (
            <article key={post.id} className="rounded-3xl bg-white p-4 shadow-soft border border-[#EB99A7]/30">
              <div className="flex items-center gap-2 text-xs font-bold text-ink-900"><Avatar initials={post.initials} color={post.avatarColor} size="sm" />{post.author}<span className="ml-auto text-[10px] font-medium text-ink-700/50">{post.time}</span></div>
              <p className="mt-3 text-sm leading-relaxed text-ink-800">{post.text}</p>
            </article>
          ))}
        </section>
      )}

      {activeSection === 'voice' && (
        <section className="space-y-3 animate-slide-up">
          <h3 className="font-display text-sm font-bold text-ink-900">Voice Box history</h3>
          {voiceHistory.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 text-center shadow-soft border border-[#EB99A7]/30 text-xs text-ink-700/60">Your submitted suggestions will appear here.</div>
          ) : voiceHistory.map((item) => (
            <article key={item.id} className="rounded-3xl bg-white p-4 shadow-soft border border-[#EB99A7]/30">
              <div className="flex items-center justify-between gap-3"><h4 className="text-sm font-bold text-ink-900">{item.category}</h4><span className="text-[10px] text-ink-700/50">{item.date}</span></div>
              <p className="mt-2 text-sm text-ink-800">{item.preview}</p>
              <p className="mt-2 text-[11px] font-semibold text-sage-700">Submitted</p>
            </article>
          ))}
        </section>
      )}

      {/* SECTION 3: PENDING ADD FRIEND LIST */}
      {activeSection === 'friends' && (
        <div className="space-y-4 animate-slide-up">
          <div>
            <h3 className="font-display text-sm font-bold text-ink-900 mb-2 flex items-center justify-between">
              <span>Incoming Friend Requests</span>
              <span className="text-xs font-bold text-[#CB6375]">{incomingRequests.length} pending</span>
            </h3>

            {incomingRequests.length === 0 ? (
              <div className="rounded-3xl bg-white p-5 text-center shadow-soft border border-[#EB99A7]/30 text-xs text-ink-700/60">
                No incoming friend requests right now.
              </div>
            ) : (
              <div className="space-y-2.5">
                {incomingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="rounded-3xl bg-white p-3.5 shadow-soft border border-[#EB99A7]/30 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar initials={req.initials} color={req.avatarColor} size="sm" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-ink-900 truncate">{req.name}</p>
                        <p className="text-[10px] text-ink-700/60">{req.unit} · {req.time}</p>
                        {req.note && <p className="text-[11px] text-[#CB6375] italic truncate mt-0.5">&ldquo;{req.note}&rdquo;</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onAcceptFriendRequest(req.id)}
                        className="tap-scale flex items-center gap-1 rounded-xl bg-sage-500 hover:bg-sage-600 px-3 py-1.5 text-xs font-bold text-white shadow-soft"
                      >
                        <UserCheck className="h-3.5 w-3.5" /> Accept
                      </button>
                      <button
                        onClick={() => onDeclineFriendRequest(req.id)}
                        className="tap-scale rounded-xl bg-cream-100 hover:bg-rose-100 p-1.5 text-ink-700/50 hover:text-rose-600"
                        title="Decline"
                      >
                        <UserX className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-ink-900 mb-2">Sent Friend Requests</h3>
            {outgoingRequests.length === 0 ? (
              <div className="rounded-3xl bg-white p-4 text-center shadow-soft border border-[#EB99A7]/30 text-xs text-ink-700/60">
                No sent friend requests waiting for confirmation.
              </div>
            ) : (
              <div className="space-y-2">
                {outgoingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="rounded-3xl bg-white p-3 shadow-soft border border-[#EB99A7]/30 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar initials={req.initials} color={req.avatarColor} size="sm" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-ink-900 truncate">{req.name}</p>
                        <p className="text-[10px] text-ink-700/50">{req.unit} · Sent {req.time}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onCancelOutgoingRequest(req.id)}
                      className="tap-scale text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200"
                    >
                      Cancel Request
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 4: MY BOOKED SPACES */}
      {activeSection === 'bookings' && (
        <div className="space-y-3 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-ink-900">My Reserved Spaces</h3>
            <span className="text-xs font-bold text-[#CB6375]">{bookings.length} reservations</span>
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 text-center shadow-soft border border-[#EB99A7]/30 text-xs text-ink-700/60">
              You haven&apos;t reserved a space yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {bookings.map((b) => (
                <div key={b.id} className="rounded-3xl bg-white p-4 shadow-soft border border-[#EB99A7]/30">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-ink-900">{b.facilityName}</h4>
                      <p className="text-xs text-[#CB6375] font-semibold mt-0.5">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {b.date} · {b.timeSlot}
                      </p>
                    </div>
                    <Badge tone="sage">{b.status}</Badge>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-rose-50">
                    <span className="text-xs text-ink-700/60">Reservation confirmed</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
