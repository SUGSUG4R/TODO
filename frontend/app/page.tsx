'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'

export default function Page() {
  const [overlayOpacity, setOverlayOpacity] = useState(1)
  const [overlayHidden, setOverlayHidden] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setOverlayOpacity(0), 2400)
    const t2 = setTimeout(() => {
      setOverlayHidden(true)
      setContentVisible(true)
    }, 3400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes catchphrase-in {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes sub-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .catchphrase-main {
          animation: catchphrase-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .catchphrase-sub {
          animation: sub-in 1.2s ease 0.6s forwards;
          opacity: 0;
        }
        @keyframes content-reveal {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .content-reveal {
          animation: content-reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes line-grow {
          0% { width: 0; }
          100% { width: 3rem; }
        }
        .line-grow {
          animation: line-grow 0.8s ease 0.4s forwards;
          width: 0;
        }
        @keyframes card-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .card-in-1 { animation: card-in 0.7s ease 0.2s both; }
        .card-in-2 { animation: card-in 0.7s ease 0.4s both; }
        .card-in-3 { animation: card-in 0.7s ease 0.6s both; }
      `}</style>

      <Header variant="public" />
      <div className="min-h-screen bg-white text-black font-sans">

        {/* Catchphrase Overlay */}
        {!overlayHidden && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            style={{ opacity: overlayOpacity, transition: 'opacity 1s ease' }}
          >
            <div className="text-center px-6 select-none">
              <p className="catchphrase-sub text-[10px] tracking-[0.6em] text-gray-400 uppercase mb-8">
                Don&apos;t let time run out
              </p>
              <h1 className="catchphrase-main text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-none">
                Time Over<br />
                <span className="text-gray-400">Doesn&apos;t</span><br />
                Occur
              </h1>
              <div className="mt-8 h-px bg-gray-300 mx-auto" style={{ width: '3rem', animation: 'line-grow 0.8s ease 0.5s forwards' }} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main
          className="min-h-screen flex flex-col"
          style={{ opacity: contentVisible ? 1 : 0 }}
        >
          {contentVisible && (
            <>
              {/* Hero */}
              <section className="content-reveal flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
                <p className="text-[10px] tracking-[0.7em] text-gray-400 uppercase mb-8">
                  Time over doesn&apos;t occur
                </p>
                <h1 className="text-7xl sm:text-9xl font-black uppercase tracking-tighter leading-none mb-6">
                  TODO
                </h1>
                <div className="line-grow h-px bg-gray-300 mb-10" />
                <p className="text-gray-500 text-base sm:text-lg max-w-sm leading-relaxed mt-4">
                  TODOでは今やらないといけないことを<br />
                  まとめることができます
                </p>
                <div className="mt-14 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none sm:w-auto">
                  <Link
                    href="/login"
                    className="px-10 py-3 bg-black text-white text-xs font-bold tracking-[0.3em] uppercase hover:bg-gray-800 transition-colors"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/register"
                    className="px-10 py-3 border border-gray-300 text-gray-500 text-xs font-bold tracking-[0.3em] uppercase hover:border-gray-500 hover:text-black transition-colors"
                  >
                    新規登録
                  </Link>
                </div>
              </section>

              {/* Feature Cards */}
              <section className="border-t border-gray-100 px-6 py-16">
                <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-100">
                  <div className="card-in-1 bg-white p-8 text-center">
                    <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase mb-3">01</p>
                    <h3 className="text-sm font-bold tracking-widest uppercase mb-3">Manage</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      タスクを整理し、<br />何をすべきかを把握できます
                    </p>
                  </div>
                  <div className="card-in-2 bg-white p-8 text-center">
                    <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase mb-3">02</p>
                    <h3 className="text-sm font-bold tracking-widest uppercase mb-3">Focus</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      優先度の高いタスクに集中し、<br />効率を最大化します
                    </p>
                  </div>
                  <div className="card-in-3 bg-white p-8 text-center">
                    <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase mb-3">03</p>
                    <h3 className="text-sm font-bold tracking-widest uppercase mb-3">Complete</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      タスクを完了し、<br />次のステップへ進みます
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="border-t border-gray-100 px-6 py-6">
                <p className="text-center text-gray-300 text-[10px] tracking-[0.4em] uppercase">
                  Time over doesn&apos;t occur.
                </p>
              </footer>
            </>
          )}
        </main>
      </div>
    </>
  )
}
