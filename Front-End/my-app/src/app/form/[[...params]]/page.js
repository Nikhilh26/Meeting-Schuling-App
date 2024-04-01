"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function page({ params }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleOnSubmit = async () => {

        if (email.length === 0) {
            alert('Enter email please')
            return;
        }

        setLoading(true);

        const res = await fetch('https://back-end.nikhilharisinghani26.workers.dev/slot/book', {
            method: "POST",
            body: JSON.stringify({
                payload: {
                    date: params.params[0],
                    startTime: decodeURIComponent(params.params[2]),
                    clientEmailId: email,
                    slug: params.params[1],
                    eventDescription: message
                }
            })
        })

        const payload = await res.json();
        if (payload.success) {
            confirm('Successful');
        } else {
            confirm('Something Went wrong');
        }
        router.push(`/user/${params.params[1]}`);
    }

    return (
        <div className="flex justify-center items-center mt-[15vh] ">

            <div className='sm:h-[60vh] sm:shadow-2xl p-5 sm:rounded-lg sm:z-2 flex flex-col justify-center items-center xl:w-[35vw] lg:w-[50vw] md:w-[60vw] sm:w-[60vw] w-[98vw]'>

                <div className='w-[80%]'>
                    <h1 className="text-3xl mb-2">
                        With:{params.params[1]}
                    </h1>
                </div>

                <div className="mt-[2vh] w-[80%]">
                    <h1 className="text-3xl mb-2">
                        On:{params.params[0]}
                    </h1>
                </div>

                <div className="mt-[2vh] w-[80%]">
                    <h1 className="text-3xl mb-2">
                        Time:{decodeURIComponent(params.params[2])}
                    </h1>
                </div>

                <div className="mt-[3vh] w-[80%]">
                    <h2>Enter Email</h2>
                    <input
                        className="h-[5vh] border-black border-2 w-[100%]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mt-[3vh] w-[80%]">
                    <h2>Enter Message(If any)</h2>
                    <input
                        className="h-[5vh] border-black border-2 w-[100%]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className="mt-[3vh] flex flex-row justify-between w-[80%]">
                    <button
                        className="border-double border-black border-2 mb-2 p-2 pr-2 pl-2 hover:bg-red-800"
                        onClick={() => { router.push(`/${params.params[1]}`) }}
                        disabled={loading ? true : false}
                    >
                        Cancel
                    </button>

                    <button
                        className="border-double border-black border-2 mb-2 p-2 pr-2 pl-2 hover:bg-green-800"
                        onClick={handleOnSubmit}
                        disabled={loading ? true : false}
                    >
                        Schedule
                    </button>
                </div>

            </div>
        </div>
    )
}
