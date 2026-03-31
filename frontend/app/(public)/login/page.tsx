'use client'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface FormValues {
    username: string
    password: string
}

export default function Page() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>()
    const [send, setSend] = useState("")
    const router = useRouter()

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await fetch("http://localhost:8080/api/token/", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            console.log(`Success: ${response}`)
            const tokenData = await response.json()
            localStorage.setItem('access', tokenData.access)
            localStorage.setItem('refresh', tokenData.refresh)
            router.push('/accounts')
        } catch(err) {
            console.log(`Failure: ${err}`)
            setSend("ログインに失敗しました")
        }
    }

    return (
        <div className="mx-auto w-full max-w-md px-4 py-10">
            <h1 className="text-2xl font-bold">ログイン</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="username">ユーザー名</FieldLabel>
                        <Input id="username" {...register("username", { required: "ユーザー名は必須です" })} />
                        <FieldError>{errors.username?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">パスワード</FieldLabel>
                        <Input id="password" type="password" {...register("password", { required: "パスワードは必須です" })} />
                        <FieldError>{errors.password?.message}</FieldError>
                    </Field>
                </FieldGroup>
                <Button type="submit" size="lg" className="mt-8 w-full">ログイン</Button>
                <p>{send}</p>
            </form>
        </div>
    )
}