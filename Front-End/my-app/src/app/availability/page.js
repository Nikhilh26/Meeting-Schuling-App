"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { SpecificHours } from "./specificHours";
import OverRideForm from "./OverRideForm";
import MainFormHeader from "./MainFormHeader";
import MainFormWeeklyHours from "./MainFormWeeklyHours";

const btnClass = {
    backgroundColor: "#f00",
    borderColor: "#d00",
    borderRadius: "5px",
    padding: "5px 10px",
};

export default function page() {

    const [loading, setLoading] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [showWeeklyHours, setShowWeeklyHours] = useState(true);
    const [visibility, setVisibility] = useState(false);
    const [specificAvailability, setSpecificAvailability] = useState({})
    // {[date]:[[],[],[]..........]} -> date = dd-mm-yyyy

    const [availability, setAvailability] = useState({
        'SUN': [[["09:00", "17:00"]], false],
        'MON': [[["09:00", "17:00"]], true],
        'TUE': [[["09:00", "17:00"]], true],
        'WED': [[["09:00", "17:00"]], true],
        'THU': [[["09:00", "17:00"]], true],
        'FRI': [[["09:00", "17:00"]], true],
        'SAT': [[["09:00", "17:00"]], false],
    })

    const { getToken } = useAuth()

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

    function handleUpdateAvailability(day, idx, startOrEnd, value) {
        let tempAvailability = { ...availability };
        tempAvailability[day][0][idx][startOrEnd] = value;
        setAvailability(tempAvailability);
    }

    /* specificAvailability */
    async function handleAddSpecificAvailability(timeRanges, date) {
        let tempSpecificAvailability = { ...specificAvailability };
        // console.log(date);

        timeRanges.forEach(element => {
            element[0] = element[0] + ":00"
            element[1] = element[1] + ":00"
        });
        console.log(timeRanges);
        console.log(date);
        if (!(date in tempSpecificAvailability)) tempSpecificAvailability[date] = [];
        tempSpecificAvailability[date] = [...tempSpecificAvailability[date], ...timeRanges];
        const token = await getToken();

        fetch('http://127.0.0.1:8787/availability/overRide', {
            method: "POST",
            body: JSON.stringify({
                token,
                payload: {
                    availabilityTimeRange: timeRanges,
                    date: date
                }
            })
        }).then((data) => {
            return data.json()
        }).then((data) => {
            alert('Success');
            console.log(data);
        }).catch((err) => {
            alert('Something Went wrong')
        })

        setSpecificAvailability(tempSpecificAvailability);
        setVisibility(false);
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        setLoading((prev) => prev + 1);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        async function getTiming() {
            try {
                const token = await getToken();
                fetch('https://back-end.nikhilharisinghani26.workers.dev/availability', {
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    method: "GET"
                }).then(async (data) => await data.json()).then((data) => {
                    // console.log(data.respPayload)
                    if (data?.respPayload1) setAvailability(data.respPayload1);
                    if (data?.respPayload2) setSpecificAvailability(data.respPayload2);
                    console.log('Arrived');
                })

            } catch (error) {
                console.log(error);
            }
        }

        getTiming();
    }, [])
    // For User experience
    useEffect(() => {
        setLoading((prev) => prev + 1);
    }, [specificAvailability])

    useEffect(() => {
        setLoading((prev) => prev + 1);
    }, [availability])

    const handleOnClick = async () => {
        const token = await getToken();
        fetch('https://back-end.nikhilharisinghani26.workers.dev/weekly-schedule/update', {
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
        <>
            <div
                className={`w-[75%] m-auto sm:mt-[6%] sm:rounded-xl sm:shadow-xl sm:p-8 xxsm:pl-2 h-auto min-h-[50%] flex ${windowWidth >= 1100 ? 'flex-row' : 'flex-col'} xsm:w-[100%] xxsm:w-[100%]`}>
                {
                    loading < 4 ?
                        <h1>Loading....</h1>
                        :
                        <>
                            <div
                                className={`w-${windowWidth < 1100 ? '[100%]' : '[60%] border-r border-black border-r-1 flex flex-col'}`}>
                                {/* {Might cause error bcz of 100% be careful} */}

                                <MainFormHeader
                                    windowWidth={windowWidth}
                                    setShowWeeklyHours={setShowWeeklyHours}
                                />

                                {
                                    ((windowWidth >= 1100) || (windowWidth < 1100 && showWeeklyHours)) ?
                                        <>
                                            <MainFormWeeklyHours
                                                handleAvailabilityAddSlot={handleAvailabilityAddSlot}
                                                handleChangeStatus={handleChangeStatus}
                                                handleDeleteAvailability={handleDeleteAvailability}
                                                handleUpdateAvailability={handleUpdateAvailability}
                                                availability={availability}
                                            />
                                            <div>
                                                <button style={btnClass} onClick={handleOnClick}> Update </button>
                                            </div>
                                        </>
                                        :
                                        <></>
                                }

                            </div>

                            {
                                ((windowWidth >= 1100) || (windowWidth < 1100 && !showWeeklyHours))
                                &&
                                <div className={`w-${windowWidth >= 1100 ? '[40%] pl-8' : '[80%] xxsm:w-[90%] xxsm:pl-2'}`}>
                                    {/* {Might cause error 40% is not in accordance with above div lookout for errory} */}
                                    <SpecificHours
                                        setVisibility={setVisibility}
                                        specificAvailability={specificAvailability}
                                    />
                                </div>
                            }
                        </>
                }
            </div >

            {
                visibility
                &&
                <OverRideForm
                    handleAddSpecificAvailability={handleAddSpecificAvailability}
                    setVisibility={setVisibility}
                    specificAvailability={specificAvailability}
                />
            }
        </>
    )
}