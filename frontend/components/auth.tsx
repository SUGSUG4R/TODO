import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Auth = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    useEffect(() => {
        const check = async () => {
            const access = localStorage.getItem("access")
            const refresh = localStorage.getItem("refresh")

            if (refresh === null) {
                router.replace("/login")
                return ;
            } else if (access === null) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh/`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "refresh" : refresh
                        })
                    })
                    if (!response.ok) {
                        throw new Error("Network response was not ok.");
                    }
                    console.log(`Success: ${response}`)
                    const tokenData = await response.json()
                    localStorage.setItem('access', tokenData.access)
                } catch (err) {
                    router.replace("/login")
                    return ;
                }
            }
        }
        check()
    }, [])
    return <div>{ children }</div>
}

export default Auth