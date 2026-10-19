export type TaskStatus = 'Pending' | 'Snoozed' | 'Selesai'

export interface Task {
  id: string
  title: string
  due_date: string | null
  score: number
  status: TaskStatus
  duration: number | null
  user_id: string
  created_at: string
}

export interface NewTask {
  title: string
  due_date: string | null
  duration: number | null
}
