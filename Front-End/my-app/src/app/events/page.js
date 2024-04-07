import { EventCard } from "./EventCard"
import { auth } from '@clerk/nextjs';

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
                return respJson;
            } else {
                console.log('Error');
            }

        } else {
            console.log('Response not ok')
        }


    } catch (error) {
        console.log('Erroorrr................')
        console.log(error);
    }
}

export default async function page() {
    const { prevEvents, upcomingEvents } = fetchEvents();

    return (
        <div>
            <div className="p-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-sm">
                    <a href="/add-event">
                        Add Event
                    </a>
                </button>
            </div>

            <div className="flex flex-row w-[100%] justify-center items-center p-2">
                <h1>Past Events</h1>
                <div className="ml-[10px] mr-[5px] h-[2px] grow bg-gray-500"></div>
            </div>

            <div className="p-4 flex flex-row flex-wrap">
                <EventCard />
            </div>

            <div className="flex flex-row w-[100%] justify-center items-center p-2">
                <h1>Upcoming Events</h1>
                <div className="ml-[10px] mr-[5px] h-[2px] grow bg-gray-500"></div>
            </div>

            <div className="p-4 flex flex-row flex-wrap">
                <EventCard />
            </div>


        </div>
    )
}