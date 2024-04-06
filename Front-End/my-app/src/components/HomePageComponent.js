'use client'
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function HomePageComponent() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');

    const { getToken } = useAuth();
    const router = useRouter();

    useEffect(() => {

        async function handleGetRequest() {
            const token = await getToken();
            fetch('http://localhost:8787/user/getNameAndSlug', {
                headers: {
                    'Authorization': token
                }
            }).then((data) => data.json()).then((data) => {
                if (data.success) {
                    if (data.name === null) setName(data.slug);
                    else setName(data.name);
                    setSlug(data.slug);
                    // console.log(data);
                } else if (data.redirect) {
                    router.push('/authenticateAfterSignUp');
                } else {
                    alert('something went wrong , Please Try again Later');
                }
            }).catch((err) => {
                console.log(err);
                alert('something went wrong , Please Try again Later');
            })
        }

        handleGetRequest();
    })

    return (
        <div>
            <h1 className='text-4xl font-extrabold mt-8'>
                {
                    name.length ?
                        <>
                            Welcome Back , <p>{name}</p>
                        </>
                        :
                        <>SingUp/SignIn</>
                }
            </h1>

            {
                name.length > 0
                &&
                <>
                    <div className="mt-2">
                        <span className='border-2 p-1 border-black'>
                            http://localhost:3000/{slug}
                        </span>

                        <button
                            className="ml-5 font-bold"
                            onClick={async (e) => await navigator.clipboard.writeText(`http://localhost:3000/${slug}`)}
                        >
                            Copy
                        </button>
                    </div>
                    <div className='text-xl text-gray-500 font-bold ml-4 mt-[2vh]' >
                        Share the above Link with the person who wants to schedule meeting
                    </div>
                </>
            }
        </div>
    )
}
