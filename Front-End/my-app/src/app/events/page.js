import { EventCard } from "./EventCard"

export default function page() {
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