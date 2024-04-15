import { EventCard } from "./EventCard"
import { auth } from '@clerk/nextjs';
import Link from 'next/link';

async function fetchEvents() {
    console.log('fetching data................');
    try {
        const { getToken } = auth()
        const token = await getToken();

        const resp = await fetch('http://localhost:8787/user/events', {
            headers: {
                'Authorization': token
            }
        });

        if (resp.ok) {
            let respJson = await resp.json();
            console.log(respJson.success);
            if (respJson.success) {
                // console.log(respJson);
                // const { prevEvents, upcomingEvents } = respJson;
                // console.log(prevEvents);
                return respJson;
            } else {
                console.log('Error');
                return {
                    prevEvents: null,
                    upcomingEvents: null
                }
            }

        } else {
            console.log('Response not ok')
        }
        return {
            prevEvents: null,
            upcomingEvents: null
        }
    } catch (error) {
        console.log('Error................')
        console.log(error);

        return {
            prevEvents: null,
            upcomingEvents: null
        }
    }
}

export default async function page() {
    const { prevEvents, upcomingEvents } = await fetchEvents();
    // console.log(prevEvents);

    if (prevEvents && upcomingEvents) {
        return (
            <div>
                <div className="p-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-sm">
                        <Link href="/events/form">
                            Add Event
                        </Link>
                    </button>
                </div>

                <div className="flex flex-row w-[100%] justify-center items-center p-2">
                    <h1>Past Events</h1>
                    <div className="ml-[10px] mr-[5px] h-[2px] grow bg-gray-500"></div>
                </div>

                <EventCard payload={prevEvents} />

                <div className="flex flex-row w-[100%] justify-center items-center p-2">
                    <h1>Upcoming Events</h1>
                    <div className="ml-[10px] mr-[5px] h-[2px] grow bg-gray-500"></div>
                </div>

                <EventCard payload={upcomingEvents} />

            </div>
        )
    }
    else {
        return (
            <div>
                Please Try again after some time ........
            </div>
        )
    }
}