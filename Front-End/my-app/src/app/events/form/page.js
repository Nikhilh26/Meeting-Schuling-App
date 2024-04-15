'use client'
import { useEffect, useState } from "react";

export default function page() {
    const [availableTimings, setAvailableTimings] = useState([]);
    const [date, setDate] = useState(null);
    // const { getToken } = useAuth();

    useEffect(() => {

        async function handleFetchAvailability() {
            // const token = await getToken();
            fetch('http://localhost:8787/availability/day', {
                body: {

                }
            }).then(response => response.json()).then((data) => {
                console.log(data);
            })
        }

        if (fetch) handleFetchAvailability();

    }, [date])

    return (
        <div className="w-[60%] mt-[10%] border-t-8 border-t-blue-600 shadow-lg rounded-lg h-auto p-3 m-auto">

            <form className="w-[100%]">


                <div className="mb-4">
                    <label
                        htmlFor="date"
                        className="font-bold mr-2"
                    >
                        Choose a Date:
                    </label>

                    <input
                        type="date"
                        id="date"
                        name="date"
                        onChange={(e) => setDate(e.target.value)}
                    />

                </div>


                <label
                    htmlFor="cars"
                >
                    Choose a car:
                </label>

                <select name="cars" id="cars" disabled={date === null ? true : false}>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>

                <button></button>
                {/* useFormState hook to manage it */}
            </form>

        </div>
    )
}

// clientEmailId: string | null; // set to self?
// bookedFrom: string; // done
// bookedTill: string; // done
// bookedDate: string; // done
// eventDescription: string | null; // message take input
// eventType: string | null; //

// userId: string | null; // send token
// eventId: number;

// const { slug, day, formattedDate }: { slug: string, day: any, formattedDate: string } = await ctx.req.json();

// form will ask date -> use that date to find availability 