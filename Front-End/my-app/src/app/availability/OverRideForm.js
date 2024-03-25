export default function OverRideForm() {
    return (
        <div className="absolute w-[100%] h-[110%] bg-gray-100/50 top-[0px] flex flex-row justify-center items-center">
            <div className="bg-orange-50 w-[50%] h-[50%]">
                <form>
                    <label htmlFor="InputDate">Select Day</label>
                    <br></br>
                    <input id="InputDate" type="date" />
                    <br></br>
                    <label>Add Time</label>
                    {/* {Allow Multiple Times} */}
                </form>
            </div>
        </div>
    )
}
