import { cn } from '@/utils/cn';

const colorMap: Record<string, string> = {
  terracotta: 'bg-terracotta-400 text-white',
  sage: 'bg-sage-400 text-white',
  sand: 'bg-sand-200 text-ink-800',
};

interface AvatarProps {
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-16 w-16 text-lg',
};

export function Avatar({ initials, color, size = 'md', online, className }: AvatarProps) {
  return (
    <div className={cn('relative shrink-0', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-2xl font-semibold shadow-soft',
          sizeMap[size],
          colorMap[color] ?? colorMap.terracotta
        )}
      >
        {initials}
      </div>
      {online && (
        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-cream-100 bg-sage-400" />
      )}
    </div>
  );
}
