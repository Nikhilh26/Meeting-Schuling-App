'use client'
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
export default function HomePageComponent() {
    // const { getToken } = useAuth();

    // useEffect(()=>{
    //     async function handleGetRequest(){
    //         const token = await getToken();
    //     }
    //     handleGetRequest();
    // })

    return (
        <div>
            <h1 className='text-4xl font-extrabold mt-8'>
                Welcome Back , <p></p>
            </h1>

            <div className="mt-2">
                <span className='border-2 p-1 border-black'>
                    http://localhost:3000/nikhilharisinghani26
                </span>

                <button
                    className="ml-5 font-bold"
                    onClick={async (e) => await navigator.clipboard.writeText('hello')}
                >
                    Copy
                </button>
            </div>
        </div>
    )
}
