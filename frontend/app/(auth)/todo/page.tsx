'use client'

import { useEffect, useState, useCallback } from 'react'
import { Suspense } from 'react'
import Link from 'next/link'
import Auth from '@/components/auth'
import TaskForm from '@/components/TaskForm'

interface Task {
  id: string
  task_abs: string
  task_det: string
  deadline: string
}

function TodoContent() {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = useCallback(async () => {
    const access = localStorage.getItem('access')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/`, {
      headers: { Authorization: `Bearer ${access}` },
    })
    if (response.ok) {
      const data = await response.json()
      setTasks(data)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-[10px] tracking-[0.6em] text-gray-400 uppercase mb-4">Todo</p>
      <h1 className="text-3xl font-black tracking-tight mb-8">タスク管理</h1>

      <TaskForm onCreated={fetchTasks} />

      <div className="mt-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 pr-6 text-left text-xs tracking-widest uppercase text-gray-400 font-normal w-32">締め切り</th>
              <th className="py-2 text-left text-xs tracking-widest uppercase text-gray-400 font-normal">タスク</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-6 text-center text-gray-300 text-xs">タスクはありません</td>
              </tr>
            ) : (
              tasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="py-3 pr-6 text-gray-400 tabular-nums">
                    <Link href={`/todo/${task.id}`} className="block">{task.deadline}</Link>
                  </td>
                  <td className="py-3">
                    <Link href={`/todo/${task.id}`} className="block">{task.task_abs}</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Auth>
        <TodoContent />
      </Auth>
    </Suspense>
  )
}
