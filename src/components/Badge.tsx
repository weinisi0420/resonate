import { cn } from '@/utils/cn';

const toneMap: Record<string, string> = {
  terracotta: 'bg-terracotta-100 text-terracotta-700',
  sage: 'bg-sage-100 text-sage-700',
  sand: 'bg-sand-100 text-ink-700',
  neutral: 'bg-cream-200 text-ink-700',
  warning: 'bg-amber-100 text-amber-700',
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({ children, tone = 'neutral', className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        toneMap[tone] ?? toneMap.neutral,
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
