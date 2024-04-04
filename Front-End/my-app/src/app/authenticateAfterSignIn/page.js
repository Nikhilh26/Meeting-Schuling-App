"use client"
import { useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'
import { useClerk } from "@clerk/nextjs";


export default function page() {

    const { signOut } = useClerk();
    const router = useRouter();
    const { getToken, userId } = useAuth()

    useEffect(() => {
        async function handleLogin() {
            try {
                const token = await getToken()
                if (token === null) throw new Error("error occured");
                const resp = await fetch('https://back-end.nikhilharisinghani26.workers.dev/login', {
                    method: "POST",
                    body: JSON.stringify({
                        token
                    })
                })

                if (resp.ok) {
                    const data = await resp.json();
                    // console.log(data);
                    if (data.success) {
                        console.log('User succesfully authenticated from backend @authenticateAfterSignIn/Page.js');
                        router.push('/')
                    } else {
                        console.log('User does not exist in backend @authenticateAfterSignIn/Page.js');
                        // SignUp first
                        const redirectTo = data.redirect
                        signOut(() => router.push(`/${redirectTo}`))
                    }

                } else {
                    throw new Error("Something went wrong")
                }
            } catch (error) {
                console.log('something went wrong in backend @authenticateAfterSignIn/Page.js');
                signOut(() => router.push('/'))
            }
        }

        handleLogin();
    })

    // console.log(userId);
    return (
        <div>Loading .........</div>
    )
}