import { Home, Building2, MessageSquare, User, UsersRound } from 'lucide-react';
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
  { id: 'profile', label: 'Profile', icon: <User className="h-4.5 w-4.5" /> },
  { id: 'messages', label: 'Chat', icon: <MessageSquare className="h-4.5 w-4.5" /> },
  { id: 'vibe', label: 'Home', icon: <Home className="h-5 w-5" /> },
  { id: 'facilities', label: 'Spaces', icon: <Building2 className="h-4.5 w-4.5" /> },
  { id: 'friends', label: 'Friends', icon: <UsersRound className="h-4.5 w-4.5" /> },
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
        <div className="grid grid-cols-5 items-end gap-1">
          {tabs.map((tab) => {
            const isHome = tab.id === 'vibe';
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={cn(
                  'tap-scale relative flex flex-col items-center justify-center gap-0.5 rounded-2xl px-0.5 py-1.5 transition-all',
                  isHome
                    ? 'gap-1 font-bold'
                    : isActive
                      ? (isDarkMode ? 'text-[#FFB0C0] font-bold' : 'text-rose-600 font-bold')
                      : (isDarkMode ? 'text-[#E6D8EB] hover:text-white font-medium' : 'text-ink-700/60 hover:text-ink-900 font-medium')
                )}
                aria-pressed={isActive}
              >
                {/* Active indicator background pill */}
                {isActive && !isHome && (
                  <span className={cn('absolute inset-x-1 inset-y-0.5 -z-10 rounded-2xl border', isDarkMode ? 'bg-[#35263E] border-[#694356]' : 'bg-rose-50 border-rose-200')} />
                )}

                <div className={cn(
                  'relative',
                  isHome && ' -mt-5 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-soft-lg ring-4 transition-transform',
                  isHome && (isDarkMode ? 'bg-gradient-to-br from-[#CB6375] via-[#EB99A7] to-[#F5B5B8] ring-[#1B1728]' : 'bg-gradient-to-br from-[#CB6375] via-[#EB99A7] to-[#F5B5B8] ring-white'),
                  isHome && isActive && 'scale-105 shadow-glow'
                )}>
                  {tab.icon}
                  {tab.id === 'messages' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-2 flex h-4 min-w-[15px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white shadow-soft">
                      {unreadCount}
                    </span>
                  )}
                  {tab.id === 'friends' && pendingFriendCount > 0 && (
                    <span className="absolute -top-1 -right-2 flex h-4 min-w-[15px] items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-white shadow-soft">
                      {pendingFriendCount}
                    </span>
                  )}
                </div>

                <span className={cn('text-[10px] leading-tight tracking-tight truncate max-w-[56px]', isHome && (isDarkMode ? 'text-[#FFE1E6]' : 'text-rose-600'))}>
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
