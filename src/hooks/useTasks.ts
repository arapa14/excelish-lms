import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { NewTask, Task } from '@/lib/types'
import { useAuth } from './useAuth'

const SCORE_ON_DONE = 10

export function useTasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!user) return
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true, nullsFirst: false })
    if (error) setError('Gagal memuat tugas: ' + error.message)
    else {
      setError(null)
      setTasks((data ?? []) as Task[])
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    refresh()
  }, [refresh])

  const run = async (op: PromiseLike<{ error: { message: string } | null }>) => {
    const { error } = await op
    if (error) {
      setError(error.message)
      return false
    }
    await refresh()
    return true
  }

  const addTask = (task: NewTask) =>
    run(supabase.from('tasks').insert({ ...task, user_id: user!.id }))

  const completeTask = (t: Task) =>
    run(supabase.from('tasks').update({ status: 'Selesai', score: SCORE_ON_DONE }).eq('id', t.id))

  const reopenTask = (t: Task) =>
    run(supabase.from('tasks').update({ status: 'Pending', score: 0 }).eq('id', t.id))

  /** Geser tenggat sebanyak `days` hari dan tandai sebagai Snoozed. */
  const snoozeTask = (t: Task, days = 1) => {
    const base = t.due_date ? new Date(t.due_date) : new Date()
    base.setDate(base.getDate() + days)
    return run(supabase.from('tasks').update({ due_date: base.toISOString(), status: 'Snoozed' }).eq('id', t.id))
  }

  const rescheduleTask = (t: Task, dueISO: string) =>
    run(supabase.from('tasks').update({ due_date: dueISO, status: 'Pending' }).eq('id', t.id))

  const deleteTask = (t: Task) => run(supabase.from('tasks').delete().eq('id', t.id))

  return { tasks, loading, error, addTask, completeTask, reopenTask, snoozeTask, rescheduleTask, deleteTask }
}
