import { Sparkles, Building2, HandHeart, MessageSquare, User } from 'lucide-react';
import type { TabId } from '@/data/mockData';
import { cn } from '@/utils/cn';

interface TabNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
  unreadCount?: number;
  pendingFriendCount?: number;
  isDarkMode?: boolean;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'vibe', label: 'Vibe', icon: <Sparkles className="h-4.5 w-4.5" /> },
  { id: 'bridge', label: 'Bridge', icon: <HandHeart className="h-4.5 w-4.5" /> },
  { id: 'messages', label: 'Chat', icon: <MessageSquare className="h-4.5 w-4.5" /> },
  { id: 'facilities', label: 'Spaces', icon: <Building2 className="h-4.5 w-4.5" /> },
  { id: 'profile', label: 'Profile', icon: <User className="h-4.5 w-4.5" /> },
];

export function TabNav({
  active,
  onChange,
  unreadCount = 0,
  pendingFriendCount = 0,
  isDarkMode = false,
}: TabNavProps) {
  return (
    <nav className={cn('fixed bottom-0 inset-x-0 z-40 backdrop-blur-xl border-t shadow-soft-lg pb-safe', isDarkMode ? 'bg-[#1B1728]/95 border-[#443650]' : 'bg-white/95 border-rose-100')}>
      <div className="mx-auto max-w-md px-2 py-1.5">
        <div className="grid grid-cols-5 gap-1">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={cn(
                  'tap-scale relative flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 px-0.5 transition-all',
                  isActive
                    ? (isDarkMode ? 'text-[#FFB0C0] font-bold' : 'text-rose-600 font-bold')
                    : (isDarkMode ? 'text-[#E6D8EB] hover:text-white font-medium' : 'text-ink-700/60 hover:text-ink-900 font-medium')
                )}
                aria-pressed={isActive}
              >
                {/* Active indicator background pill */}
                {isActive && (
                  <span className={cn('absolute inset-x-1 inset-y-0.5 -z-10 rounded-2xl border', isDarkMode ? 'bg-[#35263E] border-[#694356]' : 'bg-rose-50 border-rose-200')} />
                )}

                <div className="relative">
                  {tab.icon}
                  {tab.id === 'messages' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-2 flex h-4 min-w-[15px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white shadow-soft">
                      {unreadCount}
                    </span>
                  )}
                  {tab.id === 'profile' && pendingFriendCount > 0 && (
                    <span className="absolute -top-1 -right-2 flex h-4 min-w-[15px] items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-white shadow-soft">
                      {pendingFriendCount}
                    </span>
                  )}
                </div>

                <span className="text-[10px] leading-tight tracking-tight truncate max-w-[56px]">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
