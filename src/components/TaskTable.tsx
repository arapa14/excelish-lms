import { useState } from 'react'
import { AlarmClockPlus, CalendarClock, Check, RotateCcw, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { dateInputToISO, formatDate, isoToDateInput } from '@/lib/utils'
import { urgencyOf } from '@/lib/urgency'
import type { Task } from '@/lib/types'

interface Props {
  tasks: Task[]
  onComplete: (t: Task) => void
  onReopen: (t: Task) => void
  onSnooze: (t: Task) => void
  onReschedule: (t: Task, iso: string) => void
  onDelete: (t: Task) => void
}

export default function TaskTable({ tasks, onComplete, onReopen, onSnooze, onReschedule, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newDate, setNewDate] = useState('')

  if (tasks.length === 0) {
    return <p className="p-8 text-center text-muted">Belum ada tugas. Tambahkan tugas pertama Anda di atas.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            <th className="px-5 py-3 font-medium">Tugas</th>
            <th className="px-3 py-3 font-medium">Tenggat</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-5 py-3 text-right font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => {
            const done = t.status === 'Selesai'
            const u = urgencyOf(t.due_date)
            return (
              <tr key={t.id} className="border-b border-line last:border-0 align-middle">
                <td className="px-5 py-3">
                  <p className={done ? 'font-semibold text-muted line-through' : 'font-semibold'}>{t.title}</p>
                  {t.duration ? <p className="text-xs text-muted">Estimasi {t.duration} jam</p> : null}
                </td>
                <td className="px-3 py-3">
                  {editingId === t.id ? (
                    <div className="flex items-center gap-2">
                      <Input type="date" className="h-8 w-40" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                      <Button
                        size="sm"
                        disabled={!newDate}
                        onClick={() => {
                          onReschedule(t, dateInputToISO(newDate))
                          setEditingId(null)
                        }}
                      >
                        Simpan
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Batal</Button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p>{formatDate(t.due_date)}</p>
                      {!done && <Badge tone={u.tone}>{u.label}</Badge>}
                    </div>
                  )}
                </td>
                <td className="px-3 py-3">{t.status}{done ? ` · +${t.score} poin` : ''}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    {done ? (
                      <Button size="sm" variant="outline" onClick={() => onReopen(t)}>
                        <RotateCcw className="h-4 w-4" aria-hidden /> Buka lagi
                      </Button>
                    ) : (
                      <>
                        <Button size="sm" onClick={() => onComplete(t)}>
                          <Check className="h-4 w-4" aria-hidden /> Selesai
                        </Button>
                        <Button size="sm" variant="outline" title="Tunda 1 hari" onClick={() => onSnooze(t)}>
                          <AlarmClockPlus className="h-4 w-4" aria-hidden /> Snooze
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(t.id)
                            setNewDate(isoToDateInput(t.due_date))
                          }}
                        >
                          <CalendarClock className="h-4 w-4" aria-hidden /> Reschedule
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="danger" aria-label={`Hapus ${t.title}`} onClick={() => confirm('Hapus tugas ini?') && onDelete(t)}>
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
