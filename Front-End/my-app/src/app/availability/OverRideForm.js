import { useState } from "react";

export default function OverRideForm({ handleSpecificAvailability, setVisibility }) {
    const [date, setDate] = useState(null);
    const [availability, setAvailability] = useState({});

    function handleUpdateDate(date_) {
        setDate(date_);
        let tempAvailability = { ...availability };
        if (!(date_ in tempAvailability)) tempAvailability[date_] = []
        tempAvailability[date_].push(["09:00", "17:00"]);
        setAvailability(tempAvailability);
    }

    function handleUpdateAvailability(date, index, fromOrTo, value) {
        let tempAvailability = { ...availability };
        tempAvailability[date][index][fromOrTo] = value;
        setAvailability(tempAvailability);
    }

    function handleDeleteAvailability(date, index) {
        let tempAvailability = { ...availability };
        tempAvailability[date] = tempAvailability[date].filter((_, idx) => idx !== index);
        setAvailability(tempAvailability);
    }

    function handleAddAvailability() {
        let tempAvailability = { ...availability };
        tempAvailability[date].push(["09:00", "17:00"]);
        console.log(tempAvailability);
        setAvailability(tempAvailability);
    }

    return (
        <div className="absolute w-[100%] h-[110%] bg-gray-800/50 top-[0px] flex flex-row justify-center items-center">
            <div className="bg-gray-100 w-[40%] p-8">
                <form>
                    <label htmlFor="InputDate" className="text-2xl font-bold">
                        Select the date you want to assign specific hours
                    </label>

                    <br></br>

                    <input id="InputDate"
                        type="date"
                        className="mt-8"
                        value={date === null ? new Date() : date}
                        onChange={(e) => {

                            let tempDate = new Date(e.target.value);

                            if (tempDate >= new Date())
                                handleUpdateDate(e.target.value);

                        }}
                    />
                    <br></br>
                </form>

                <div className="bg-gray-400 mt-8 flex flex-row w-[100%] p-4">
                    {
                        (date !== null && availability[date].length > 0) ?
                            <>

                                <div className="flex flex-col w-[85%]">
                                    {
                                        availability[date].map((ele, idx) => {
                                            return (
                                                <div className="flex flex-row mb-2 w-[100%]"
                                                    key={idx}>
                                                    <input
                                                        type='time'
                                                        className='border border-gray-800 md:w-[28%] rounded-md mr-[2%] p-[2px] text-center sm:w-[35%]'
                                                        value={ele[0]}
                                                        onChange={(e) => { handleUpdateAvailability(day, idx, 0, e.target.value) }}
                                                    />
                                                    -
                                                    <input
                                                        type='time'
                                                        className='border border-gray-800 md:w-[28%] rounded-md ml-[2%] p-[2px] text-center sm:w-[35%]'
                                                        value={ele[1]}
                                                        onChange={(e) => { handleUpdateAvailability(date, idx, 1, e.target.value) }}
                                                    />

                                                    <button
                                                        className="pl-2 text-xl font-bold xxsm:text-base"
                                                        onClick={() => { handleDeleteAvailability(date, idx) }}
                                                    >
                                                        Del
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div>
                                    <button
                                        className="text-xl font-bold bg-blue-500 xxsm:text-base"
                                        onClick={() => handleAddAvailability()}
                                    >
                                        Add
                                    </button>
                                </div>

                            </>
                            :
                            <>
                                Select Date first
                            </>
                    }
                </div>

                <button
                    className="bg-green-500 w-[100%] border-2 border-black mt-2 font-bold"
                    onClick={() => { handleSpecificAvailability(availability[date], date); setAvailability({}) }}
                >
                    Submit
                </button>

                <button
                    className="bg-red-500 w-[100%] border-2 border-black mt-2 font-bold"
                    onClick={() => setVisibility(false)}
                >
                    Cancel
                </button>

            </div>
        </div>
    )
}