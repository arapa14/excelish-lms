import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TaskForm from '@/components/TaskForm'
import TaskTable from '@/components/TaskTable'
import { useTasks } from '@/hooks/useTasks'

export default function Tasks() {
  const { tasks, loading, error, addTask, completeTask, reopenTask, snoozeTask, rescheduleTask, deleteTask } = useTasks()

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <h1 className="text-3xl font-extrabold">Tugas</h1>
      {error && <p role="alert" className="rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">{error}</p>}

      <Card>
        <CardHeader><CardTitle>Tambah tugas</CardTitle></CardHeader>
        <CardContent><TaskForm onAdd={addTask} /></CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Atur tugas</CardTitle></CardHeader>
        {loading ? (
          <p className="p-8 text-center text-muted">Memuat…</p>
        ) : (
          <TaskTable
            tasks={tasks}
            onComplete={completeTask}
            onReopen={reopenTask}
            onSnooze={(t) => snoozeTask(t, 1)}
            onReschedule={rescheduleTask}
            onDelete={deleteTask}
          />
        )}
      </Card>
    </div>
  )
}
