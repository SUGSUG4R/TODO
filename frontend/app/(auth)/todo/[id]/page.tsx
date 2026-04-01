'use client'

import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Auth from '@/components/auth'

interface Task {
  id: string
  task_abs: string
  task_det: string
  deadline: string
}

function TaskDetailContent() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTask = async () => {
      const access = localStorage.getItem('access')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      if (response.ok) {
        setTask(await response.json())
      } else {
        setError('タスクが見つかりませんでした')
      }
    }
    fetchTask()
  }, [id])

  if (error) return <p className="text-red-500 text-sm">{error}</p>
  if (!task) return <p className="text-gray-400 text-sm">読み込み中...</p>

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <button
        onClick={() => router.back()}
        className="text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors mb-8"
      >
        ← 戻る
      </button>

      <p className="text-[10px] tracking-[0.6em] text-gray-400 uppercase mb-2">締め切り</p>
      <p className="text-sm tabular-nums mb-8">{task.deadline}</p>

      <h1 className="text-2xl font-black tracking-tight mb-6">{task.task_abs}</h1>

      <div className="rounded-2xl border border-gray-200 p-5">
        <p className="text-[10px] tracking-[0.6em] text-gray-400 uppercase mb-3">詳細</p>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{task.task_det || '—'}</p>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Auth>
        <TaskDetailContent />
      </Auth>
    </Suspense>
  )
}
