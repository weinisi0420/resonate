import { X, UserPlus, UserCheck, Clock, MessageSquare, MapPin, Sparkles } from 'lucide-react';
import type { NeighborProfile } from '@/data/mockData';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { cn } from '@/utils/cn';

interface ProfileModalProps {
  profile: NeighborProfile;
  friendStatus: 'none' | 'pending' | 'friends';
  onToggleFriend: (id: string) => void;
  onSendMessage: (profile: NeighborProfile) => void;
  onClose: () => void;
}

export function ProfileModal({
  profile,
  friendStatus,
  onToggleFriend,
  onSendMessage,
  onClose,
}: ProfileModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink-900/50 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-4xl bg-cream-100 p-5 shadow-soft-lg animate-slide-up border border-cream-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Close button */}
        <div className="flex items-center justify-between pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-700/50">Neighbor Profile</span>
          <button
            onClick={onClose}
            className="tap-scale rounded-full bg-white p-2 text-ink-700/60 shadow-soft hover:bg-cream-200"
            aria-label="Close profile"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="mt-3 flex items-start gap-4">
          <Avatar initials={profile.initials} color={profile.avatarColor} size="lg" online={profile.online} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-ink-900 truncate">{profile.name}</h2>
              {profile.vibeScore && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-sage-100 px-2 py-0.5 text-[11px] font-bold text-sage-700">
                  <Sparkles className="h-3 w-3" /> {profile.vibeScore}%
                </span>
              )}
            </div>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-ink-700/70">
              <span className="font-semibold text-terracotta-600">{profile.unit}</span>
              <span>·</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="h-3 w-3 text-terracotta-400" /> {profile.distance}m away
              </span>
              {profile.online && (
                <>
                  <span>·</span>
                  <span className="text-sage-600 font-semibold">Active now</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4 rounded-2xl bg-white p-3.5 shadow-soft border border-cream-200">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-700/40">About</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-800">{profile.bio}</p>
        </div>

        {/* Shared Interests */}
        <div className="mt-3">
          <p className="text-xs font-semibold text-ink-700/60 mb-1.5">Shared Interests</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.sharedInterests.map((interest) => (
              <Badge key={interest} tone="sand">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hobbies & Passions */}
        {profile.hobbies && profile.hobbies.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-ink-700/60 mb-1.5">Hobbies & Topics</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="rounded-full bg-cream-200/80 px-2.5 py-0.5 text-xs text-ink-700/70 font-medium"
                >
                  #{hobby}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons: Add Friend + Message */}
        <div className="mt-6 flex items-center gap-2.5">
          <button
            onClick={() => onToggleFriend(profile.id)}
            className={cn(
              'tap-scale flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold transition-all shadow-soft',
              friendStatus === 'friends' &&
                'bg-sage-100 text-sage-800 border border-sage-200 hover:bg-sage-200',
              friendStatus === 'pending' &&
                'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100',
              friendStatus === 'none' &&
                'bg-terracotta-400 text-white shadow-soft hover:shadow-glow hover:bg-terracotta-500'
            )}
          >
            {friendStatus === 'friends' ? (
              <>
                <UserCheck className="h-4 w-4 text-sage-600" />
                Friends
              </>
            ) : friendStatus === 'pending' ? (
              <>
                <Clock className="h-4 w-4 text-amber-600 animate-pulse-soft" />
                Request Pending
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                Add Friend
              </>
            )}
          </button>

          <button
            onClick={() => onSendMessage(profile)}
            className="tap-scale flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white border border-cream-300 py-3 px-4 text-xs font-bold text-ink-800 shadow-soft hover:bg-cream-50"
          >
            <MessageSquare className="h-4 w-4 text-terracotta-500" />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
