'use client'
import Auth from "@/components/auth"
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Auth>
                <p>TODOページ</p>
            </Auth>
        </Suspense>
    )
}