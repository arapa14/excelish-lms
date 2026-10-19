import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTasks } from '@/hooks/useTasks'
import { modules } from '@/lib/modules'

export default function Modules() {
  const { addTask } = useTasks()
  const [added, setAdded] = useState<string[]>([])

  const plan = async (id: string, title: string, hours: number) => {
    const due = new Date()
    due.setDate(due.getDate() + 7)
    const ok = await addTask({ title: `Pelajari: ${title}`, due_date: due.toISOString(), duration: hours })
    if (ok) setAdded((a) => [...a, id])
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <div>
        <h1 className="text-3xl font-extrabold">Modul pembelajaran</h1>
        <p className="mt-1 text-muted">Pilih modul, lalu jadikan tugas dengan tenggat 7 hari.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <Card key={m.id}>
            <CardContent className="flex h-full flex-col gap-3">
              <p className="text-sm font-semibold text-brand-dark">{m.level}</p>
              <h2 className="text-lg font-bold">{m.title}</h2>
              <p className="flex-1 text-sm text-muted">{m.summary}</p>
              <p className="text-sm text-muted">{m.lessons} pelajaran · {m.hours} jam</p>
              {added.includes(m.id) ? (
                <Link to="/tugas" className="text-sm font-semibold text-brand underline">Sudah ditambahkan, lihat tugas</Link>
              ) : (
                <Button variant="outline" onClick={() => plan(m.id, m.title, m.hours)}>Jadikan tugas</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
