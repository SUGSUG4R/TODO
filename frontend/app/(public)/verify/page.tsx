'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

function Verify() {
    const searchParams = useSearchParams()

    const query = new URLSearchParams(searchParams)
    const [send, setSend] = useState("loading")
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/verify/?${query}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok.");
            }
            setSend("success")
        })
        .catch(err => {
            console.error(err)
            setSend("error")
        })
    }, [searchParams])
    if (send === "success") {
        return <p>認証が完了しました。</p>
    } else if (send === "loading") {
        return <p>認証中です</p>
    }
    return <p>認証に失敗しました。</p>
}

export default function Page() {
    return (
        <Suspense>
            <Verify />
        </Suspense>
    )
}