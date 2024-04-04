"use client"
import { useEffect, useState } from "react"
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useClerk } from "@clerk/nextjs";

export default function page() {
    const [slug, setSlug] = useState('')
    const [available, setAvailable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { getToken } = useAuth()
    const { user } = useUser()
    const router = useRouter()
    const { signOut } = useClerk();

    const handleOnClickSubmit = async () => {

        const response = await fetch('https://back-end.nikhilharisinghani26.workers.dev/register-user', {

            body: JSON.stringify({
                slug: slug,
                token: await getToken(),
                email: user.emailAddresses[0].emailAddress
            }),

            method: "POST"
        })

        if (response.ok) {
            const data = await response.json()
            // console.log(data);
            router.push('/');
        } else {
            signOut(() => router.push('/home'))
        }
    }

    useEffect(() => {
        if (slug.length <= 3) return () => { };
        setIsLoading(true);
        let abortRequest = new AbortController();
        const signal = abortRequest.signal;
        let complete = false;
        fetch('http://localhost:8787/user/checkAvailability', {
            method: 'POST',
            body: JSON.stringify({
                slug
            }),
            signal
        }).then((data) => {
            if (!complete) {
                return data.json()
            }
        })
            .then((data) => {
                setIsLoading(false);
                setAvailable(data.available)
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error('Fetch error:', error);
                    alert('Something went wrong');
                }
                // aborting after recieving is an error 
            })

        return () => {
            complete = true; // when i recieve request but slug has changed this is needed
            abortRequest.abort();
        }

    }, [slug]);

    function handleKeyPress(event) {
        const keyCode = event.keyCode || event.which;

        if (keyCode === 32) {
            event.preventDefault();
        }
    }

    return (
        <div className="absolute w-[100vw] h-[100vh] backdrop-filter backdrop-blur-md top-0">
            <div className="mt-[70px] w-[60%] m-auto">

                <div className="flex flex-col">
                    <input
                        placeholder="Enter Slug (Should be Unique)"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="h-[40px] border-black border-2 flex-grow mb-2"
                        onKeyDown={handleKeyPress}
                    >
                    </input>
                    {/* <div>
                    { // try to shift the logic here
                        slug.length <= 3 ?
                            <>Length Should be greater</>
                            :
                            isLoading ?
                                <>Loading....</> : available ? <>Available</> : <>Not Available</>
                    }
                </div> */}
                    <input
                        placeholder="Enter your name"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="h-[40px] border-black border-2 flex-grow mb-2"
                        onKeyDown={handleKeyPress}
                    >
                    </input>

                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                            onClick={handleOnClickSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                <div>
                    {
                        slug.length <= 3 ?
                            <>Length Should be greater</>
                            :
                            isLoading ?
                                <>Loading....</> : available ? <>Available</> : <>Not Available</>
                    }
                </div>
            </div>
        </div>
    )

}
