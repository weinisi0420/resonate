import { X, CheckCircle2, Clock, MessageSquare, HandHeart } from 'lucide-react';
import type { NeedRequest } from '@/data/mockData';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';

interface HelpStatusModalProps {
  need: NeedRequest;
  onClose: () => void;
  onOpenChat: (participantName: string, topic?: string) => void;
  onUpdateStatus?: (
    needId: string,
    newStatus: 'Open' | 'In Progress' | 'Fulfilled',
    step?: NeedRequest['progressStep']
  ) => void;
  currentUserId?: string;
}

export function HelpStatusModal({
  need,
  onClose,
  onOpenChat,
  onUpdateStatus,
}: HelpStatusModalProps) {
  const chatPartner = need.author.includes('Jordan') || need.author.includes('You')
    ? need.helper ?? need.author
    : need.author;
  const currentStep = need.progressStep ?? (need.status === 'Fulfilled' ? 'approved' : 'doing');

  const handleMarkFinished = () => {
    onUpdateStatus?.(need.id, 'Fulfilled', 'approved');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink-900/40 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-4xl bg-gradient-to-b from-[#FDF2E1] via-white to-[#FDF2E1] p-5 shadow-soft-lg animate-slide-up border border-[#EB99A7]/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F4D6D3]">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-[#CB6375] to-[#EB99A7] text-white shadow-soft">
              <HandHeart className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-ink-900">Help Progress & Status</h3>
              <p className="text-[10px] text-ink-700/50">Tracking neighbor collaboration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="tap-scale rounded-full bg-white p-1.5 text-ink-700/60 shadow-soft hover:bg-rose-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Need Summary Card with soft pink gradient */}
        <div className="mt-3.5 rounded-3xl bg-gradient-to-br from-[#F5B5B8]/20 via-white to-[#F4D6D3]/30 p-4 shadow-soft border border-[#EB99A7]/30">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-sm text-ink-900">{need.title}</h4>
            <Badge tone="warning">In Progress</Badge>
          </div>
          <p className="mt-1 text-xs text-ink-700/70 leading-relaxed">{need.description}</p>

          <div className="mt-2.5 flex items-center justify-between text-xs text-ink-700/60 pt-2 border-t border-rose-100/60">
            <span>Posted by: <strong>{need.author}</strong></span>
          </div>
        </div>

        {/* Collaboration Timeline */}
        <div className="mt-4 space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-700/50">Progress Steps</p>

          <div className="space-y-3 pl-2">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-400 text-white">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-ink-900">Request posted</p>
                <p className="text-[11px] text-ink-700/60">{need.time}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-400 text-white">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-ink-900">Helper connected</p>
                <div className="mt-1 flex items-center gap-2">
                  <Avatar initials={(need.helper ?? 'Jordan').split(' ')[0].slice(0, 2)} color="sage" size="sm" />
                  <span className="text-xs font-semibold text-rose-600">
                    {need.helper?.split(' (')[0] ?? 'You — Jordan'}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  currentStep === 'completed_pending_approval' || currentStep === 'approved'
                    ? 'bg-sage-400 text-white'
                    : 'bg-amber-400 text-white animate-pulse-soft'
                }`}
              >
                {currentStep === 'completed_pending_approval' || currentStep === 'approved' ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Clock className="h-3.5 w-3.5" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-ink-900">
                  {currentStep === 'approved' || need.status === 'Fulfilled' ? 'Help offered' : 'Assistance in progress'}
                </p>
              <p className="text-[11px] text-ink-700/60">Coordinate details in Messages.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Action Controls & Permission Enforced */}
        <div className="mt-5 space-y-2.5">
          {/* Direct Chat Shortcut */}
          <button
            onClick={() => {
              onClose();
              onOpenChat(chatPartner, `Helping with: ${need.title}`);
            }}
            className="tap-scale flex w-full items-center justify-center gap-2 rounded-2xl bg-white border border-[#EB99A7]/40 py-2.5 px-4 text-xs font-bold text-rose-600 shadow-soft hover:bg-rose-50 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat with {chatPartner.split(' ')[0]}</span>
          </button>

          {/* Helper Action: Mark as Finished and request confirmation */}
          {currentStep === 'doing' && need.status === 'In Progress' && (
            <button
              onClick={handleMarkFinished}
              className="tap-scale flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#CB6375] to-[#EB99A7] py-3 px-4 text-xs font-bold text-white shadow-soft transition-all"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Mark done & notify</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
