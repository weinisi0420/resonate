import { useState } from 'react';
import { MapPin, ChevronDown, Check, Users, Home, Sun, Moon } from 'lucide-react';
import { personaProfiles } from '@/data/mockData';
import { cn } from '@/utils/cn';

const colorMap: Record<string, string> = {
  terracotta: 'bg-rose-500 text-white',
  sage: 'bg-sage-400 text-white',
  sand: 'bg-rose-200 text-ink-800',
};

interface HeaderProps {
  personaId: string;
  onPersonaChange: (id: string) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function Header({
  personaId,
  onPersonaChange,
  isDarkMode = false,
  onToggleDarkMode,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const active = personaProfiles.find((p) => p.id === personaId) ?? personaProfiles[0];

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
                HomeSweetHome
              </h1>
              <div className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-[#CB6375]">
                <MapPin className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate">Maplewood</span>
              </div>
            </div>
          </div>

          {/* Night mode and persona */}
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

            {/* Persona Switcher */}
            <button
              onClick={() => setOpen((v) => !v)}
              className={cn(
                'tap-scale flex items-center gap-1 rounded-full px-1.5 py-1 shadow-xs border transition-colors',
                isDarkMode ? 'bg-[#2E1420] border-[#662E40]' : 'bg-white border-rose-200'
              )}
              aria-haspopup="true"
              aria-expanded={open}
            >
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-xl text-[11px] font-bold',
                  colorMap[active.color] ?? 'bg-rose-500 text-white'
                )}
              >
                {active.initials}
              </span>
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', isDarkMode ? 'text-white/80' : 'text-ink-700/50', open && 'rotate-180')} />
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-3 animate-pop origin-top rounded-3xl border border-rose-200 bg-white p-2 shadow-soft-lg">
            <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink-700/50 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-rose-500" /> Switch demo persona
            </p>
            {personaProfiles.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onPersonaChange(p.id);
                  setOpen(false);
                }}
                className="tap-scale flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left hover:bg-rose-50 transition-colors"
              >
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-xl text-xs font-semibold',
                    colorMap[p.color]
                  )}
                >
                  {p.initials}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink-800 truncate">{p.name}</p>
                  <p className="text-xs text-ink-700/60 truncate">{p.role}</p>
                </div>
                {personaId === p.id && <Check className="h-4 w-4 text-sage-500" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
