"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { WeeklyHour } from "./weeklyHours";
import { SpecificHours } from "./specificHours";

const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const btnClass = {
    backgroundColor: "#f00",
    borderColor: "#d00",
    borderRadius: "5px",
    padding: "5px 10px",
};

export default function page() {
    const [loading, setLoading] = useState(false);
    const { getToken } = useAuth()

    const [availability, setAvailability] = useState({
        'SUN': [[["09:00", "17:00"]], false],
        'MON': [[["09:00", "17:00"]], true],
        'TUE': [[["09:00", "17:00"], ["18:00", "19:00"], ["18:00", "19:00"]], true],
        'WED': [[["09:00", "17:00"]], true],
        'THU': [[["09:00", "17:00"]], true],
        'FRI': [[["09:00", "17:00"]], true],
        'SAT': [[["09:00", "17:00"]], false],
    })

    function handleAvailabilityAddSlot(day) {
        let tempAvailability = { ...availability };
        tempAvailability[day][0].push(["09:00", "17:00"]);
        setAvailability(tempAvailability);
    }

    function handleChangeStatus(day) {
        let tempAvailability = { ...availability };
        if (tempAvailability[day][0].length === 0) handleAvailabilityAddSlot(day);
        tempAvailability[day][1] = !tempAvailability[day][1];
        setAvailability(tempAvailability);
    }

    function handleDeleteAvailability(day, idx) {
        let tempAvailability = { ...availability };
        tempAvailability[day][0] = tempAvailability[day][0].filter((_, i) => i !== idx)
        if (tempAvailability[day][0].length === 0) tempAvailability[day][1] = false;
        setAvailability(tempAvailability);
    }

    // useEffect(() => {
    //     async function getTiming() {
    //         try {
    //             const token = await getToken();
    //             fetch('https://back-end.nikhilharisinghani26.workers.dev/getWeeklyschedule', {
    //                 headers: {
    //                     'Authorization': `${token}`,
    //                     'Content-Type': 'application/json'
    //                 },
    //                 method: "GET"
    //             }).then(async (data) => await data.json()).then((data) => {
    //                 console.log(data.respPayload)
    //                 setLoading(false);
    //                 if (data?.respPayload) setAvailability(data.respPayload);
    //             })

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     getTiming();
    // }, [])

    const handleOnClick = async () => {
        const token = await getToken();
        fetch('http://127.0.0.1:8787/updateWeeklyschedule', {
            method: "PUT",
            body: JSON.stringify({
                payload: availability
            }),
            headers: {
                'Authorization': token
            }
        }).then(async (data) => {
            return await data.json()
        }).then((data) => {
            confirm(data.success);
        })
    }

    return (
        <div className='w-[75%] m-auto mt-[6%] rounded-xl shadow-xl flex flex-row p-8 h-auto min-h-[50%]'>

            {
                loading ?
                    <h1>Loading....</h1>
                    :
                    <>
                        <div className='w-[50%] border-r border-black border-r-1 flex flex-col'>
                            <h1 className='text-2xl font-bold pt-7'>
                                Weekly Hours
                            </h1>

                            <div className='mt-10 w-[100%]'>
                                {
                                    daysofWeek
                                    &&
                                    daysofWeek.map((day, idx) => {
                                        return (
                                            <WeeklyHour
                                                day={day}
                                                dayAvailability={availability[day]}
                                                handleAvailabilityAddSlot={handleAvailabilityAddSlot}
                                                handleChangeStatus={handleChangeStatus}
                                                handleDeleteAvailability={handleDeleteAvailability}
                                                key={idx}
                                            />)
                                    })
                                }
                            </div>

                            <div>
                                <button style={btnClass} onClick={handleOnClick}> Update </button>
                            </div>
                        </div>
                        <SpecificHours />
                    </>
            }
        </div>
    )
}