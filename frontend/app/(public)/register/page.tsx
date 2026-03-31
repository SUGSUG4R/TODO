'use client'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface FormValues {
    username: string
    email: string
    first_name: string
    last_name: string
    password: string
    repassword: string
    faculty: string
    grade: number
}

export default function Page() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>()
    const router = useRouter()

    const onSubmit = (data: FormValues) => {
        const { repassword, ...user } = data
        fetch("http://localhost:8080/api/accounts/register/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => {
            console.log(`Success: ${res}`)
            router.push('/register/success')
        })
        .catch(err => {
            console.log(`Failure: ${err}`)
            router.push('/register/failure')
        })
    }

    return (
        <div className="mx-auto w-full max-w-md px-4 py-10">
            <h1 className="text-2xl font-bold">アカウント登録</h1>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">
                以下のフォームに必要事項を入力してアカウントを作成してください。
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="username">ユーザー名</FieldLabel>
                        <Input id="username" {...register("username", { required: "ユーザー名は必須です" })} />
                        <FieldError>{errors.username?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                        <Input id="email" {...register("email", { required: "メールアドレスは必須です" })} />
                        <FieldError>{errors.email?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="first_name">名</FieldLabel>
                        <Input id="first_name" {...register("first_name", { required: "名は必須です" })} />
                        <FieldError>{errors.first_name?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="last_name">姓</FieldLabel>
                        <Input id="last_name" {...register("last_name", { required: "姓は必須です" })} />
                        <FieldError>{errors.last_name?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">パスワード</FieldLabel>
                        <Input id="password" type="password" {...register("password", { required: "パスワードは必須です" })} />
                        <FieldError>{errors.password?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="repassword">パスワード（確認）</FieldLabel>
                        <Input id="repassword" type="password"  {...register("repassword", {
                            required: "パスワード（確認）は必須です",
                            validate: val => val === watch("password") || "パスワードが一致しません"
                        })} />
                        <FieldError>{errors.repassword?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="faculty">学部</FieldLabel>
                        <Input id="faculty" {...register("faculty", { required: "学部は必須です" })} />
                        <FieldError>{errors.faculty?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="grade">学年</FieldLabel>
                        <Input id="grade" type="number" {...register("grade", { required: "学年は必須です", valueAsNumber: true })} />
                        <FieldError>{errors.grade?.message}</FieldError>
                    </Field>
                </FieldGroup>
                <Button type="submit" size="lg" className="mt-8 w-full">登録</Button>
            </form>
        </div>
    )
}