'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  onCreated: () => void
}

export default function TaskForm({ onCreated }: Props) {
  const [taskAbs, setTaskAbs] = useState('')
  const [taskDet, setTaskDet] = useState('')
  const [deadline, setDeadline] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const access = localStorage.getItem('access')
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ task_abs: taskAbs, task_det: taskDet, deadline }),
      })
      if (!response.ok) throw new Error()
      setTaskAbs('')
      setTaskDet('')
      setDeadline('')
      onCreated()
    } catch {
      setError('タスクの追加に失敗しました')
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 items-center">
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            required
            className="h-9 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-gray-400 transition-colors shrink-0"
          />
          <input
            type="text"
            placeholder="タスク（50文字以内）"
            value={taskAbs}
            onChange={e => setTaskAbs(e.target.value)}
            maxLength={50}
            required
            className="h-9 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-gray-400 transition-colors"
          />
        </div>
        <textarea
          placeholder="詳細（500文字以内）"
          value={taskDet}
          onChange={e => setTaskDet(e.target.value)}
          maxLength={500}
          rows={4}
          className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors resize-none"
        />
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        <Button type="submit" size="sm" className="mt-3">追加</Button>
      </form>
    </div>
  )
}
