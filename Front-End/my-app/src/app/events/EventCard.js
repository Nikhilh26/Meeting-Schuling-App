export function EventCard() {
    return (
        <div className="w-[28%] p-8 border-t-8 border-t-purple-600 shadow-lg rounded-lg">
            <div>
                Event Type
            </div>

            <div>
                Event Date
            </div>

            <div>
                Event Description
                (if it is set by other person add that persons email)
            </div>
        </div>
    )
}