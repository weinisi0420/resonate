import { useState } from 'react';
import {
  Camera,
  Send,
  Heart,
  MessageCircle,
  Sparkles,
  MapPin,
  Coffee,
  Music,
  UserPlus,
  UserCheck,
  Clock,
  MessageSquare,
  ChevronRight,
  RotateCw,
  ChevronUp,
  ChevronDown,
  CalendarDays,
  HandHeart,
  Megaphone,
  UserRound,
  UsersRound,
} from 'lucide-react';
import {
  moments as seedMoments,
  companionMatches,
  neighborProfiles,
  type Moment,
} from '@/data/mockData';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { cn } from '@/utils/cn';

interface VibeMatchTabProps {
  onNavigate?: (destination: 'profile' | 'friends' | 'bridge' | 'facilities' | 'voice') => void;
  friendStatuses?: Record<string, 'none' | 'pending' | 'friends'>;
  onToggleFriend?: (neighborId: string) => void;
  onViewProfile?: (neighborId: string) => void;
  onOpenChat?: (neighborId: string, topic?: string) => void;
  onCreatePost?: (post: Moment) => void;
}

function getNeighborIdFromAuthor(author: string): string {
  if (author.includes('Alex')) return 'alex-chen';
  if (author.includes('Priya')) return 'priya';
  if (author.includes('Marcus')) return 'marcus';
  if (author.includes('Esther')) return 'esther';
  if (author.includes('Dev')) return 'dev';
  if (author.includes('Sarah')) return 'sarah-k';
  if (author.includes('Theo')) return 'theo-r';
  if (author.includes('Nadia')) return 'nadia-m';
  if (author.includes('Oliveira')) return 'mr-oliveira';
  return 'alex-chen';
}

export function VibeMatchTab({
  onNavigate,
  friendStatuses = {},
  onToggleFriend,
  onViewProfile,
  onOpenChat,
  onCreatePost,
}: VibeMatchTabProps) {
  const [moments, setMoments] = useState<Moment[]>(seedMoments);
  const [draft, setDraft] = useState('');

  // AI Companion Match state: refresh & minimize
  const [matchIndex, setMatchIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const currentMatch = companionMatches[matchIndex] ?? companionMatches[0];
  const neighborId = getNeighborIdFromAuthor(currentMatch.name);
  const matchFriendStatus = friendStatuses[neighborId] || 'none';

  const handleRefreshMatch = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setMatchIndex((prev) => (prev + 1) % companionMatches.length);
      setIsSpinning(false);
    }, 350);
  };

  const toggleLike = (id: string) => {
    setMoments((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, liked: !m.liked, likes: m.liked ? m.likes - 1 : m.likes + 1 }
          : m
      )
    );
  };

  const handlePost = () => {
    if (!draft.trim()) return;
    const newMoment: Moment = {
      id: `m${Date.now()}`,
      author: 'You — Jordan (Unit 3B)',
      avatarColor: 'terracotta',
      initials: 'Jo',
      time: 'Just now',
      text: draft.trim(),
      hasPhoto: false,
      photoHue: '',
      likes: 0,
      comments: 0,
    };
    setMoments((prev) => [newMoment, ...prev]);
    onCreatePost?.(newMoment);
    setDraft('');
  };

  return (
    <div className="space-y-4 animate-fade-in pb-16">
      <section aria-label="Quick links" className="space-y-3">
        <button
          type="button"
          onClick={() => onNavigate?.('profile')}
          className="tap-scale flex w-full items-center justify-between rounded-3xl bg-gradient-to-r from-[#CB6375] via-[#EB99A7] to-[#F5B5B8] p-4 text-left text-white shadow-soft transition-all hover:shadow-glow"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
              <UserRound className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">Profile</span>
          </span>
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-2 gap-3">
          {([
            { label: 'Events', destination: 'facilities', icon: <CalendarDays className="h-5 w-5" /> },
            { label: 'Bridge', destination: 'bridge', icon: <HandHeart className="h-5 w-5" /> },
            { label: 'Friends', destination: 'friends', icon: <UsersRound className="h-5 w-5" /> },
            { label: 'Voice Box', destination: 'voice', icon: <Megaphone className="h-5 w-5" /> },
          ] as const).map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate?.(item.destination)}
              className="tap-scale flex min-h-24 flex-col items-start justify-between gap-3 rounded-3xl border border-[#EB99A7]/35 bg-white p-4 text-left shadow-soft transition-all hover:border-[#CB6375]/60 hover:shadow-glow"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F4D6D3] to-[#FDF2E1] text-[#CB6375]">
                {item.icon}
              </span>
              <span className="text-sm font-bold text-ink-900">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Share a thought card with pink gradient border */}
      <section className="rounded-4xl bg-white p-4 shadow-soft border border-[#EB99A7]/40">
        <div className="flex items-center gap-3">
          <Avatar initials="Jo" color="terracotta" />
          <div className="flex-1 rounded-2xl bg-gradient-to-r from-[#FDF2E1] to-[#F4D6D3]/30 px-4 py-3 border border-rose-100/60">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Share a thought or neighborly moment..."
              rows={1}
              className="w-full resize-none bg-transparent text-sm text-ink-800 placeholder:text-ink-700/40 focus:outline-none"
              maxLength={240}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button className="tap-scale flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">
            <Camera className="h-4 w-4 text-rose-500" /> Photo
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-ink-700/40">{draft.length}/240</span>
            <button
              onClick={handlePost}
              disabled={!draft.trim()}
              className={cn(
                'tap-scale flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all',
                draft.trim()
                  ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white shadow-soft'
                  : 'bg-cream-200 text-ink-700/40'
              )}
            >
              Share <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* AI Companion Match (Refreshable & Minimizable) with Pink Gradient */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-[#F5B5B8]/35 via-white to-[#F4D6D3]/30 p-4 shadow-soft border border-[#EB99A7]/50 transition-all duration-300">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#EB99A7]/20 blur-2xl pointer-events-none" />
        <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-[#F5B5B8]/30 blur-2xl pointer-events-none" />

        <div className="relative">
          {/* Header Row: Title + Refresh Button + Minimize Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#CB6375] to-[#EB99A7] px-2.5 py-0.5 text-[11px] font-black text-white shadow-xs">
                <Sparkles className="h-3 w-3" /> AI Companion
              </span>
              <span className="text-[11px] font-medium text-ink-700/50">Updated live</span>
            </div>

            <div className="flex items-center gap-1">
              {/* Refresh Match Button */}
              <button
                onClick={handleRefreshMatch}
                className="tap-scale flex items-center gap-1 rounded-full bg-white/90 border border-[#EB99A7]/40 px-2.5 py-1 text-[11px] font-bold text-rose-600 shadow-xs hover:bg-rose-50 transition-colors"
                title="Find another match"
              >
                <RotateCw className={cn('h-3.5 w-3.5', isSpinning && 'animate-spin')} />
                <span>Next</span>
              </button>

              {/* Minimize / Expand Toggle */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="tap-scale rounded-full bg-white/90 border border-[#EB99A7]/40 p-1.5 text-ink-700/60 shadow-xs hover:bg-rose-50 transition-colors"
                title={isMinimized ? 'Expand Companion Card' : 'Minimize Companion Card'}
              >
                {isMinimized ? (
                  <ChevronDown className="h-3.5 w-3.5 text-rose-600" />
                ) : (
                  <ChevronUp className="h-3.5 w-3.5 text-rose-600" />
                )}
              </button>
            </div>
          </div>

          {/* If Minimized: Compact Pill View */}
          {isMinimized ? (
            <div
              onClick={() => setIsMinimized(false)}
              className="mt-3 flex items-center justify-between bg-white/80 rounded-2xl p-2.5 border border-[#EB99A7]/30 cursor-pointer hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Avatar initials={currentMatch.initials} color={currentMatch.avatarColor} size="sm" online={currentMatch.online} />
                <div>
                  <h3 className="font-bold text-xs text-ink-900">{currentMatch.name}</h3>
                  <p className="text-[10px] text-ink-700/60">{currentMatch.distance}m away · {currentMatch.score}% Vibe Match</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-rose-600 flex items-center gap-0.5">
                Expand <ChevronDown className="h-3.5 w-3.5" />
              </span>
            </div>
          ) : (
            /* If Expanded: Full Match Details */
            <div className="mt-3.5 animate-slide">
              <div
                onClick={() => onViewProfile?.(neighborId)}
                className="flex items-center gap-3.5 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Avatar initials={currentMatch.initials} color={currentMatch.avatarColor} size="lg" online={currentMatch.online} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-bold text-ink-900 flex items-center gap-2">
                    {currentMatch.name}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-ink-700/60">
                    <MapPin className="h-3 w-3 text-rose-500" /> {currentMatch.distance}m away
                    {currentMatch.online && <span className="text-sage-600 font-semibold"> · Online now</span>}
                  </p>
                </div>
                <ScoreRing score={currentMatch.score} />
              </div>

              <p className="mt-3 text-xs leading-relaxed text-ink-800 text-balance">
                {currentMatch.reason}
              </p>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {currentMatch.sharedInterests.map((interest) => (
                  <Badge key={interest} tone="sand">
                    {interest.toLowerCase().includes('jazz') && <Music className="h-3 w-3" />}
                    {interest.toLowerCase().includes('coffee') && <Coffee className="h-3 w-3" />}
                    {interest}
                  </Badge>
                ))}
              </div>

              {/* Action Row: Add Friend & Message */}
              <div className="mt-3.5 flex items-center gap-2">
                <button
                  onClick={() => onToggleFriend?.(neighborId)}
                  className={cn(
                    'tap-scale flex items-center gap-1.5 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all shadow-soft',
                    matchFriendStatus === 'friends' && 'bg-sage-100 text-sage-800 border border-sage-200',
                    matchFriendStatus === 'pending' && 'bg-amber-50 text-amber-800 border border-amber-200',
                    matchFriendStatus === 'none' && 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white'
                  )}
                >
                  {matchFriendStatus === 'friends' ? (
                    <>
                      <UserCheck className="h-4 w-4 text-sage-600" /> Friends
                    </>
                  ) : matchFriendStatus === 'pending' ? (
                    <>
                      <Clock className="h-4 w-4 text-amber-600" /> Sent
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" /> Add Friend
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    onOpenChat?.(neighborId, `Matched via Vibe Match (${currentMatch.score}% score)`)
                  }
                  className="tap-scale flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-white text-rose-600 px-3.5 py-2.5 text-xs font-bold shadow-soft hover:shadow-glow border border-[#EB99A7]/40 truncate"
                >
                  <MessageSquare className="h-4 w-4 text-rose-500 shrink-0" />
                  <span className="truncate">Say Hi: &ldquo;{currentMatch.icebreaker}&rdquo;</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Explore Neighbors Carousel */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-sm font-bold text-ink-900">Explore Neighbors</h2>
          <span className="text-[11px] text-ink-700/50">Tap profile to view details</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {neighborProfiles.slice(0, 6).map((neighbor) => {
            const status = friendStatuses[neighbor.id] || neighbor.friendStatus;
            return (
              <div
                key={neighbor.id}
                onClick={() => onViewProfile?.(neighbor.id)}
                className="tap-scale shrink-0 w-32 rounded-3xl bg-white p-3 shadow-soft border border-[#EB99A7]/30 flex flex-col items-center text-center cursor-pointer hover:border-[#CB6375]/50 transition-colors"
              >
                <Avatar initials={neighbor.initials} color={neighbor.avatarColor} size="md" online={neighbor.online} />
                <h4 className="mt-2 text-xs font-bold text-ink-900 truncate w-full">{neighbor.name}</h4>
                <p className="text-[10px] text-ink-700/60 truncate w-full">{neighbor.unit} · {neighbor.distance}m</p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFriend?.(neighbor.id);
                  }}
                  className={cn(
                    'tap-scale mt-2 w-full rounded-xl py-1 px-2 text-[10px] font-bold transition-all shadow-xs flex items-center justify-center gap-1',
                    status === 'friends' && 'bg-sage-100 text-sage-800',
                    status === 'pending' && 'bg-amber-50 text-amber-800',
                    status === 'none' && 'bg-[#FDF2E1] text-rose-600 border border-[#EB99A7]/40 hover:bg-rose-50'
                  )}
                >
                  {status === 'friends' ? (
                    <><UserCheck className="h-3 w-3" /> Friends</>
                  ) : status === 'pending' ? (
                    <><Clock className="h-3 w-3" /> Sent</>
                  ) : (
                    <><UserPlus className="h-3 w-3" /> Add</>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Moments Feed */}
      <section>
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="font-display text-sm font-bold text-ink-900">Community Moments</h2>
          <span className="text-xs font-medium text-ink-700/50">{moments.length} posts</span>
        </div>

        <div className="space-y-3">
          {moments.map((moment, idx) => {
            const momentNeighborId = getNeighborIdFromAuthor(moment.author);
            const status = friendStatuses[momentNeighborId] || 'none';
            const isJordan = moment.author.includes('Jordan');

            return (
              <article
                key={moment.id}
                className="animate-slide-up rounded-4xl bg-white p-4 shadow-soft border border-[#EB99A7]/30"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    onClick={() => !isJordan && onViewProfile?.(momentNeighborId)}
                    className={cn(
                      'flex items-center gap-3 min-w-0',
                      !isJordan && 'cursor-pointer hover:opacity-85 transition-opacity'
                    )}
                  >
                    <Avatar initials={moment.initials} color={moment.avatarColor} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-ink-800 truncate">{moment.author}</p>
                      <p className="text-[10px] text-ink-700/50">{moment.time}</p>
                    </div>
                  </div>

                  {!isJordan && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onToggleFriend?.(momentNeighborId)}
                        className={cn(
                          'tap-scale flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all shadow-xs',
                          status === 'friends' && 'bg-sage-100 text-sage-700',
                          status === 'pending' && 'bg-amber-50 text-amber-700',
                          status === 'none' && 'bg-[#FDF2E1] text-rose-600 border border-[#EB99A7]/40 hover:bg-rose-50'
                        )}
                      >
                        {status === 'friends' ? (
                          <>
                            <UserCheck className="h-3 w-3 text-sage-600" />
                            <span>Friends</span>
                          </>
                        ) : status === 'pending' ? (
                          <>
                            <Clock className="h-3 w-3 text-amber-600" />
                            <span>Sent</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-3 w-3 text-rose-500" />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          onOpenChat?.(momentNeighborId, `Moment: "${moment.text.slice(0, 30)}..."`)
                        }
                        className="tap-scale p-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        aria-label="Message neighbor"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-ink-800 text-balance">{moment.text}</p>

                {moment.hasPhoto && (
                  <div
                    className={cn(
                      'mt-2.5 h-36 rounded-2xl bg-gradient-to-br shadow-soft',
                      moment.photoHue
                    )}
                  >
                    <div className="h-full w-full rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
                  </div>
                )}

                <div className="mt-3 flex items-center gap-4 pt-2 border-t border-rose-50">
                  <button
                    onClick={() => toggleLike(moment.id)}
                    className="tap-scale flex items-center gap-1 text-xs font-bold"
                  >
                    <Heart
                      className={cn(
                        'h-4 w-4 transition-colors',
                        moment.liked ? 'fill-[#CB6375] text-[#CB6375]' : 'text-ink-700/40'
                      )}
                    />
                    <span className={moment.liked ? 'text-[#CB6375]' : 'text-ink-700/60'}>
                      {moment.likes}
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      !isJordan &&
                      onOpenChat?.(momentNeighborId, `Moment: "${moment.text.slice(0, 30)}..."`)
                    }
                    className="tap-scale flex items-center gap-1 text-xs font-semibold text-ink-700/60"
                  >
                    <MessageCircle className="h-4 w-4 text-ink-700/40" />
                    {moment.comments}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg className="h-14 w-14 -rotate-90" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r={radius} fill="none" stroke="#F4D6D3" strokeWidth="4" />
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="#CB6375"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-sm font-black text-[#CB6375] leading-none">{score}%</span>
        <span className="text-[7px] font-bold uppercase tracking-wider text-slate-400">vibe</span>
      </div>
    </div>
  );
}
