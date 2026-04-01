'use client'

import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import Auth from '@/components/auth'

interface User {
  id: string
  username: string
  first_name: string
  last_name: string
  email: string
  faculty: string
  grade: string
}

function AccountsContent() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const access = localStorage.getItem('access')
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/me/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
        if (!response.ok) throw new Error('Failed to fetch user')
        const data = await response.json()
        setUser(data)
      } catch {
        setError('ユーザー情報の取得に失敗しました')
      }
    }
    fetchUser()
  }, [])

  if (error) return <p className="text-red-500 text-sm">{error}</p>
  if (!user) return <p className="text-gray-400 text-sm">読み込み中...</p>

  const fields: { label: string; value: string }[] = [
    { label: 'ユーザー名', value: user.username },
    { label: '姓', value: user.last_name },
    { label: '名', value: user.first_name },
    { label: 'メールアドレス', value: user.email },
    { label: '学部', value: user.faculty },
    { label: '学年', value: user.grade },
  ]

  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <p className="text-[10px] tracking-[0.6em] text-gray-400 uppercase mb-4">Account</p>
      <h1 className="text-3xl font-black tracking-tight mb-10">プロフィール</h1>

      <div className="flex flex-col divide-y divide-gray-100">
        {fields.map(({ label, value }) => (
          <div key={label} className="flex justify-between py-4">
            <span className="text-xs text-gray-400 tracking-widest uppercase">{label}</span>
            <span className="text-sm font-medium">{value || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Auth>
        <AccountsContent />
      </Auth>
    </Suspense>
  )
}
