export function EventCard({ payload }) {
    return (
        <div className="p-4 flex flex-row flex-wrap">
            {
                payload.map((ele, _) => {
                    return (
                        <div className="md:max-w-[40vw] p-8 border-t-8 border-t-purple-600 shadow-lg rounded-lg m-2" key={ele.eventId}>
                            <h1 className="font-bold">
                                Event Type
                                (ToAdd)
                            </h1>

                            <div className="mt-2">
                                <span className="font-bold">Event Date</span>:
                                {ele.bookedDate}
                            </div>

                            <div className="mt-2">
                                <span className="font-bold">Event Time</span>
                                :{ele.bookedFrom}-{ele.bookedTill}
                            </div>

                            <div className="mt-2">
                                <span className="font-bold">Event Description</span>:
                                (if it is set by other person add that persons email)
                            </div>

                            <div className="mt-2">
                                <span className="font-bold">Scheduled With</span>:{ele.clientEmailId}
                            </div>

                            <div className="mt-2">
                                <span className="font-bold">Scheduled With</span>:{ele.clientEmailId}
                            </div>

                            {
                                ele.eventDescription ?
                                    <div className="mt-2">
                                        <span className="font-bold">Any Message/Notes</span>:{ele.eventDescription}
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}