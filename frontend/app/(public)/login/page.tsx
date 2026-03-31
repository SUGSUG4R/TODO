'use client'
import { Button } from "@/components/ui/button";
import { Form } from "radix-ui";
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";

const StateForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    return (
    <div>
        <Field>
            <Input id="name" onChange={(e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <Input id="email" onChange={(e : React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        </Field>
        <div>
            <p>{name}</p>
            <p>{email}</p>
        </div>
    </div>)
};

export default function Page() {
    return <StateForm />
}