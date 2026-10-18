import { useState } from 'react';
import {
  Plus,
  MapPin,
  Clock,
  Check,
  Wrench,
  HandHeart,
  Share2,
  X,
  Send,
  MessageSquare,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { type NeedRequest, type UserProfile } from '@/data/mockData';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { HelpStatusModal } from '@/components/HelpStatusModal';
import { cn } from '@/utils/cn';

const categoryIcon: Record<string, React.ReactNode> = {
  'Tool Borrowing': <Wrench className="h-3.5 w-3.5" />,
  'Quick Favor': <HandHeart className="h-3.5 w-3.5" />,
  'Item Share': <Share2 className="h-3.5 w-3.5" />,
};

const categoryTone: Record<string, string> = {
  'Tool Borrowing': 'terracotta',
  'Quick Favor': 'sage',
  'Item Share': 'sand',
};

interface BridgeOfNeedsTabProps {
  needs: NeedRequest[];
  onOfferHelp?: (need: NeedRequest) => void;
  onViewProfile?: (authorName: string) => void;
  onAddNeed?: (need: NeedRequest) => void;
  onUpdateStatus?: (needId: string, status: NeedRequest['status'], step?: NeedRequest['progressStep']) => void;
  onOpenChat?: (participantName: string, topic?: string) => void;
  currentUser: UserProfile;
}

export function BridgeOfNeedsTab({
  needs,
  onOfferHelp,
  onViewProfile,
  onAddNeed,
  onUpdateStatus,
  onOpenChat,
  currentUser,
}: BridgeOfNeedsTabProps) {
  const [activeList, setActiveList] = useState<'requests' | 'myHelps'>('requests');
  const [showPostModal, setShowPostModal] = useState(false);
  const [activeStatusNeed, setActiveStatusNeed] = useState<NeedRequest | null>(null);

  const isMine = (need: NeedRequest) => need.author.includes('You') || need.author.includes(currentUser.name);
  const didOfferHelp = (need: NeedRequest) => Boolean(need.helper?.includes('You') || need.helperId === 'jordan');
  const filteredNeeds = activeList === 'requests'
    ? needs.filter((need) => !isMine(need) && need.status !== 'Fulfilled')
    : needs.filter((need) => isMine(need) || didOfferHelp(need));

  return (
    <div className="space-y-4 animate-fade-in pb-24">
      {/* Top Banner with Add Need Action */}
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-[#CB6375] via-[#EB99A7] to-[#F5B5B8] p-4 text-white shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-black leading-tight">Bridge of Needs</h2>
            <p className="text-xs text-[#FDF2E1]/90">Lend a hand or post what you need</p>
          </div>
          <button
            onClick={() => setShowPostModal(true)}
            className="tap-scale flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-black text-[#CB6375] shadow-soft hover:bg-rose-50 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Post a Need</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 rounded-2xl bg-white p-1 shadow-soft border border-[#EB99A7]/30">
        {([{ id: 'requests', label: 'Help Requests' }, { id: 'myHelps', label: 'My Helps' }] as const).map((item) => (
          <button key={item.id} onClick={() => setActiveList(item.id)} className={cn('tap-scale rounded-xl px-3 py-2.5 text-xs font-bold transition-all', activeList === item.id ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white shadow-soft' : 'text-ink-700/65 hover:text-ink-900')}>
            {item.label}
          </button>
        ))}
      </div>

      {/* Info Notice: Click In-Progress to check status */}
      <div className="rounded-3xl bg-gradient-to-r from-[#F5B5B8]/20 via-white to-[#F4D6D3]/30 p-3 border border-[#EB99A7]/40 text-xs text-ink-800 flex items-center gap-2">
        <span className="text-base">💡</span>
        <span className="text-[11px] leading-relaxed">
          {activeList === 'requests' ? 'Requests from neighbors are open to offer help.' : 'Your posted requests and offered help.'}
        </span>
      </div>

      {/* Horizontal help cards, stacked one per row */}
      <div className="space-y-3">
        {filteredNeeds.length === 0 ? (
          <div className="w-full rounded-4xl bg-white p-8 text-center border border-[#EB99A7]/30 shadow-soft text-xs text-ink-700/60">
            {activeList === 'requests' ? 'No open requests right now.' : 'You have not posted a request or offered help yet.'}
          </div>
        ) : (
          filteredNeeds.map((need, idx) => (
            <article
              key={need.id}
              role={need.status === 'In Progress' ? 'button' : undefined}
              tabIndex={need.status === 'In Progress' ? 0 : undefined}
              onClick={(event) => {
                if ((event.target as HTMLElement).closest('button')) return;
                if (need.status === 'In Progress') setActiveStatusNeed(need);
              }}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget || need.status !== 'In Progress') return;
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setActiveStatusNeed(need);
                }
              }}
              className={`animate-slide-up w-full rounded-4xl bg-white p-4 shadow-soft border border-[#EB99A7]/30 flex items-start gap-3 hover:border-[#CB6375]/50 transition-all ${need.status === 'In Progress' ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400' : ''}`}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4D6D3]/60 text-[#CB6375]">
                {categoryIcon[need.category]}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge tone={categoryTone[need.category]} icon={categoryIcon[need.category]}>
                    {need.category}
                  </Badge>

                  {/* Clickable in-progress badge */}
                  {need.status === 'Fulfilled' ? (
                    <Badge tone="sage">{didOfferHelp(need) ? 'Help Offered' : 'Posted'}</Badge>
                  ) : need.status === 'In Progress' && didOfferHelp(need) ? (
                    <button
                      onClick={() => setActiveStatusNeed(need)}
                      className="tap-scale flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full hover:bg-amber-200 transition-colors"
                      title="Click to check status"
                    >
                      <span>In Progress</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  ) : (
                    <Badge tone={need.status === 'Open' ? 'sage' : 'neutral'}>{need.status}</Badge>
                  )}
                </div>

                <h3 className="mt-2.5 font-bold text-sm text-ink-900 leading-snug">
                  {need.title}
                </h3>
                <p className="mt-1 text-xs text-ink-700/70 leading-relaxed">{need.description}</p>

                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] text-ink-700/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-rose-500" /> {need.distance}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-ink-700/40" /> {need.time}
                  </span>
                </div>
              {/* Bottom Actions */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-rose-50 pt-2.5">
                {isMine(need) ? (
                  <div className="flex min-w-0 items-center gap-2 text-left">
                    <Avatar initials={currentUser.initials} color={need.avatarColor} size="sm" />
                    <span className="truncate text-xs font-bold text-ink-700/80">You — {currentUser.name} ({currentUser.unit})</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onViewProfile?.(need.author)}
                    className="tap-scale flex min-w-0 items-center gap-2 text-left transition-opacity hover:opacity-85"
                  >
                    <Avatar initials={need.initials} color={need.avatarColor} size="sm" />
                    <span className="truncate text-xs font-bold text-ink-700/80 transition-colors hover:text-rose-600">{need.author}</span>
                  </button>
                )}

                {activeList === 'requests' && (need.status === 'Open' || (need.status === 'In Progress' && !didOfferHelp(need))) && (
                  <button
                    onClick={() => onOfferHelp?.(need)}
                    className="tap-scale flex items-center gap-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#CB6375] to-[#EB99A7] px-3.5 py-2 text-xs font-bold text-white shadow-soft transition-all"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Offer Help & Chat</span>
                  </button>
                )}

                {need.status === 'In Progress' && didOfferHelp(need) && (
                  <button
                    onClick={() => setActiveStatusNeed(need)}
                    className="tap-scale flex items-center gap-1 shrink-0 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                  >
                    <Clock className="h-3.5 w-3.5 text-amber-600" />
                    <span>Check Status</span>
                  </button>
                )}

              </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Post Need Modal */}
      {showPostModal && (
        <PostNeedModal
          onClose={() => setShowPostModal(false)}
          onSubmit={(n) => {
            onAddNeed?.({ ...n, author: `You — ${currentUser.name} (${currentUser.unit})`, initials: currentUser.initials });
            setShowPostModal(false);
          }}
        />
      )}

      {/* In-Progress Status Modal */}
      {activeStatusNeed && (
        <HelpStatusModal
          need={activeStatusNeed}
          currentUser={currentUser}
          onClose={() => setActiveStatusNeed(null)}
          onOpenChat={(person, topic) => {
            setActiveStatusNeed(null);
            onOpenChat?.(person, topic);
          }}
          onUpdateStatus={(id, status, step) => {
            onUpdateStatus?.(id, status, step);
            setActiveStatusNeed(null);
          }}
        />
      )}
    </div>
  );
}

function PostNeedModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (n: NeedRequest) => void;
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NeedRequest['category']>('Tool Borrowing');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      id: `n-${Date.now()}`,
      title: title.trim(),
      category,
      status: 'Open',
      distance: 0,
      karma: 0,
      author: 'You — Jordan (Unit 3B)',
      initials: 'Jo',
      avatarColor: 'terracotta',
      time: 'Just now',
      description: description.trim() || 'No additional details provided.',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink-900/40 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-4xl bg-gradient-to-b from-[#FDF2E1] via-white to-[#FDF2E1] p-5 shadow-soft-lg animate-slide-up border border-[#EB99A7]/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#F4D6D3]">
          <div>
            <h2 className="font-display text-base font-black text-ink-900">Post a request</h2>
            <p className="text-[11px] text-ink-700/50">Your neighbors will receive notifications</p>
          </div>
          <button onClick={onClose} className="tap-scale rounded-full bg-white p-1.5 shadow-soft hover:bg-rose-50">
            <X className="h-4 w-4 text-ink-700/60" />
          </button>
        </div>

        <div className="mt-3.5 space-y-3">
          <div>
            <label className="text-xs font-bold text-ink-700/70">What do you need help with?</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Borrow a ladder or water plants"
              className="mt-1 w-full rounded-2xl bg-white px-3.5 py-2.5 text-xs text-ink-800 placeholder:text-ink-700/40 shadow-soft border border-rose-100 focus:outline-none focus:border-rose-300"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink-700/70">Type of Help</label>
            <div className="mt-1 flex gap-2">
              {(['Tool Borrowing', 'Quick Favor', 'Item Share'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    'tap-scale flex-1 rounded-2xl px-2 py-2 text-[11px] font-bold transition-all',
                    category === c
                      ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white shadow-soft'
                      : 'bg-white text-ink-700/60 border border-rose-100'
                  )}
                >
                  {c.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink-700/70">Details (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add specifics like unit, timing, or tool requirements..."
              rows={2}
              className="mt-1 w-full resize-none rounded-2xl bg-white px-3.5 py-2 text-xs text-ink-800 placeholder:text-ink-700/40 shadow-soft border border-rose-100 focus:outline-none focus:border-rose-300"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className={cn(
              'tap-scale flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-black transition-all shadow-soft',
              title.trim()
                ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white hover:shadow-glow'
                : 'bg-cream-200 text-ink-700/40'
            )}
          >
            <Send className="h-4 w-4" />
            <span>Post request</span>
          </button>
        </div>
      </div>
    </div>
  );
}
