import { useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/input'
import { dateInputToISO } from '@/lib/utils'
import type { NewTask } from '@/lib/types'

export default function TaskForm({ onAdd }: { onAdd: (t: NewTask) => Promise<boolean> }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    const ok = await onAdd({
      title: title.trim(),
      due_date: date ? dateInputToISO(date) : null,
      duration: duration ? Math.max(1, parseInt(duration, 10)) : null,
    })
    setSaving(false)
    if (ok) {
      setTitle('')
      setDate('')
      setDuration('')
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-[1fr_11rem_8rem_auto] sm:items-end">
      <Field label="Judul tugas">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Latihan VLOOKUP" required />
      </Field>
      <Field label="Tenggat">
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </Field>
      <Field label="Durasi (jam)">
        <Input type="number" min={1} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="2" />
      </Field>
      <Button type="submit" disabled={saving}>
        <Plus className="h-4 w-4" aria-hidden /> {saving ? 'Menyimpan…' : 'Tambah tugas'}
      </Button>
    </form>
  )
}
