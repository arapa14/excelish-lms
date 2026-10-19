import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  outline: 'border border-line bg-white text-ink hover:bg-surface',
  ghost: 'text-ink hover:bg-surface',
  danger: 'text-danger hover:bg-danger-soft',
}
const sizes = { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-base' }

type Opts = { variant?: keyof typeof variants; size?: keyof typeof sizes }

/** Kelas tombol; bisa dipakai juga pada <Link>. */
export function buttonClass({ variant = 'primary', size = 'md' }: Opts = {}, extra?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    extra,
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & Opts>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={buttonClass({ variant, size }, className)} {...props} />
  ),
)
Button.displayName = 'Button'
