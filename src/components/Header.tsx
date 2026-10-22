import { Home, Sun, Moon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface HeaderProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function Header({
  isDarkMode = false,
  onToggleDarkMode,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 backdrop-blur-xl border-b transition-colors duration-300',
        isDarkMode
          ? 'bg-[#1F0E16]/90 border-[#542838] text-white'
          : 'bg-white/80 border-rose-200/60 text-ink-900'
      )}
    >
      <div className="mx-auto max-w-md px-4 pt-3 pb-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Logo & App Name */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#CB6375] to-[#EB99A7] text-white shadow-soft">
              <Home className="h-4.5 w-4.5" />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                <span className="h-1 w-1 rounded-full bg-white" />
              </span>
            </div>
            <div className="min-w-0">
              <h1 className={cn("font-display text-lg font-black tracking-tight leading-none truncate", isDarkMode ? "text-white" : "text-ink-900")}>
                Resonate
              </h1>
            </div>
          </div>

          {/* Day and night mode */}
          <div className="flex items-center gap-1.5">
            {/* Top Right Night Mode Navigation Bar */}
            <div
              className={cn(
                'flex items-center p-0.5 rounded-full border shadow-xs transition-colors',
                isDarkMode
                    ? 'bg-[#291B38] border-[#644A7A]'
                  : 'bg-rose-50/80 border-rose-200'
              )}
            >
              <button
                type="button"
                onClick={onToggleDarkMode}
                className={cn(
                  'tap-scale flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all',
                  !isDarkMode
                    ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white shadow-xs'
                    : 'text-[#E7DDF3] hover:text-white'
                )}
                title="Light Mode (Pink Gradient)"
              >
                <Sun className="h-3 w-3" />
                <span className="hidden sm:inline">Day</span>
              </button>
              <button
                type="button"
                onClick={onToggleDarkMode}
                className={cn(
                  'tap-scale flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all',
                  isDarkMode
                    ? 'bg-gradient-to-r from-[#CB6375] to-[#EB99A7] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                )}
                title="Night Mode"
              >
                <Moon className="h-3 w-3" />
                <span className="hidden sm:inline">Night</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
