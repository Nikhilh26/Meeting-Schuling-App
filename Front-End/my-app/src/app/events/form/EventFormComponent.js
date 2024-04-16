'use client'
import { useEffect, useState } from "react";
import { daysofWeek } from "@/app/user/[...slug]/UserAvailability";

export default function EventFormComponent({ userId }) {
    const [availableTimings, setAvailableTimings] = useState([]);
    const [date, setDate] = useState(null);
    const [eventDescription, setEventDescription] = useState('');
    const [selectedTime, setSelectedTime] = useState();

    useEffect(() => {

        async function handleFetchAvailability() {
            let day = daysofWeek[(new Date(date)).getDay()];
            const data = await fetch(' http://localhost:8787/availability/day', {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    day,
                    formattedDate: date
                })
            })

            const resp = await data.json();
            if (!resp.success) {
                setDate(null);
                alert('Something went wrong');
                return;
            }
            const payload = resp.returnPayload;
            console.log(payload);
            setAvailableTimings(payload);
        }

        if (date) handleFetchAvailability();

    }, [date])

    const handleOnSubmit = () => {
        fetch('http://localhost:8787/bookings', {
            method: "POST",
            body: JSON.stringify({
                payload: {
                    date,

                }
            })
        })
    }

    // useEffect(() => {

    //     console.log(selectedTime ?);
    // })
    return (
        <div className="w-[40%] mt-[10%] border-t-8 border-t-blue-600 shadow-lg rounded-lg h-auto p-8 m-auto">

            <form className="w-[100%]" onClick={handleOnSubmit}>

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

                <div className="mb-4">
                    <label
                        htmlFor="cars"
                    >
                        Choose a Slot:
                    </label>

                    <select
                        name="Timings"
                        id="cars"
                        disabled={date === null ? true : false}
                        value={selectedTime} // ...force the select's value to match the state variable...
                        onChange={e => { console.log(e.target.value[0]); }}
                    >
                        {
                            availableTimings.map((ele, _) => {
                                return <option
                                    value={ele}
                                    key={_}
                                >
                                    {ele.start}-{ele.end}
                                </option>
                            })
                        }
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="eventDescription" className="font-bold mr-2">Event Description:</label>
                    <br></br>
                    <input
                        type="text"
                        id="eventDescription"
                        className="border-2 border-gray-400 w-[70%] h-[50px]"
                        disabled={date === null ? true : false}
                        onChange={(e) => setEventDescription(e.target.value)}
                        value={eventDescription}
                    >
                    </input>
                </div>

                <button
                    className="p-2 bg-blue-400 rounded"
                >Create Event</button>
                {/* useFormState hook to manage it */}
            </form>

        </div>
    )
}