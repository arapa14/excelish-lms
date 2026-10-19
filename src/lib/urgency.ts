import type { Task } from './types'

export type Tone = 'late' | 'today' | 'soon' | 'later' | 'none'

export function daysUntil(due: string | null): number | null {
  if (!due) return null
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const d = new Date(due)
  d.setHours(0, 0, 0, 0)
  return Math.round((d.getTime() - startOfToday.getTime()) / 86_400_000)
}

export function urgencyOf(due: string | null): { label: string; tone: Tone } {
  const days = daysUntil(due)
  if (days === null) return { label: 'Tanpa tenggat', tone: 'none' }
  if (days < 0) return { label: `Terlambat ${-days} hari`, tone: 'late' }
  if (days === 0) return { label: 'Hari ini', tone: 'today' }
  if (days === 1) return { label: 'Besok', tone: 'soon' }
  if (days <= 3) return { label: `${days} hari lagi`, tone: 'soon' }
  return { label: `${days} hari lagi`, tone: 'later' }
}

/** Tugas aktif, tenggat terdekat lebih dulu; tanpa tenggat di akhir. */
export function sortByUrgency(tasks: Task[]): Task[] {
  return tasks
    .filter((t) => t.status !== 'Selesai')
    .sort((a, b) => {
      const da = a.due_date ? new Date(a.due_date).getTime() : Infinity
      const db = b.due_date ? new Date(b.due_date).getTime() : Infinity
      return da - db
    })
}
