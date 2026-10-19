import { cn } from '@/lib/utils'
import type { Tone } from '@/lib/urgency'

const tones: Record<Tone, string> = {
  late: 'bg-danger-soft text-danger',
  today: 'bg-amber-soft text-amber',
  soon: 'bg-amber-soft text-amber',
  later: 'bg-brand-soft text-brand-dark',
  none: 'bg-surface text-muted',
}

export function Badge({ tone = 'none', children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span className={cn('inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold', tones[tone])}>
      {children}
    </span>
  )
}
