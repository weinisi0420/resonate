import { useState } from 'react';
import {
  Camera,
  Send,
  Heart,
  MessageCircle,
  MapPin,
  ChevronRight,
  CalendarDays,
  Map,
  Megaphone,
  Store,
  UserRound,
  UserPlus,
  UserCheck,
  Clock,
  MessageSquare,
} from 'lucide-react';
import {
  moments as seedMoments,
  type Moment,
} from '@/data/mockData';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { cn } from '@/utils/cn';

interface VibeMatchTabProps {
  onNavigate?: (destination: 'profile' | 'friends' | 'bridge' | 'facilities' | 'voice' | 'market' | 'map') => void;
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
            { label: 'Bookings', destination: 'facilities', icon: <CalendarDays className="h-5 w-5" /> },
            { label: 'Map', destination: 'map', icon: <Map className="h-5 w-5" /> },
            { label: 'Voice Box', destination: 'voice', icon: <Megaphone className="h-5 w-5" /> },
            { label: 'Market', destination: 'market', icon: <Store className="h-5 w-5" /> },
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

