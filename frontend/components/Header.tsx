'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeaderProps {
  variant: 'public' | 'auth'
}

export default function Header({ variant }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 h-14 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.ico" alt="Logo" width={24} height={24} />
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          aria-label="メニューを開く"
          className="flex flex-col gap-[5px] p-2 group"
        >
          <span className="block w-5 h-px bg-black transition-colors group-hover:bg-gray-500" />
          <span className="block w-5 h-px bg-black transition-colors group-hover:bg-gray-500" />
          <span className="block w-5 h-px bg-black transition-colors group-hover:bg-gray-500" />
        </button>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/10 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-60 bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="メニューを閉じる"
            className="text-gray-400 hover:text-black transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {variant === 'public' && (
          <nav className="px-8 flex flex-col gap-6 mt-4">
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="text-xs font-bold tracking-[0.3em] uppercase hover:text-gray-400 transition-colors"
            >
              新規登録
            </Link>
            <div className="h-px bg-gray-100" />
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-xs font-bold tracking-[0.3em] uppercase hover:text-gray-400 transition-colors"
            >
              ログイン
            </Link>
          </nav>
        )}

        {variant === 'auth' && (
          <nav className="px-8 flex flex-col gap-6 mt-4">
            <Link
              href="/todo"
              onClick={() => setMenuOpen(false)}
              className="text-xs font-bold tracking-[0.3em] uppercase hover:text-gray-400 transition-colors"
            >
              Todo
            </Link>
            <div className="h-px bg-gray-100" />
            <Link
              href="/accounts"
              onClick={() => setMenuOpen(false)}
              className="text-xs font-bold tracking-[0.3em] uppercase hover:text-gray-400 transition-colors"
            >
              アカウント
            </Link>
          </nav>
        )}
      </div>
    </>
  )
}
