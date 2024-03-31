import { useReducer, useState } from "react";

function tasksReducer(availability, action) {
    let tempAvailability = { ...availability };
    switch (action.type) {
        case 'Initialize_availability_For_Date':
            if (!(action.date in tempAvailability)) {
                if (!(action.date in action.specificAvailability)) {
                    tempAvailability[action.date] = []
                    tempAvailability[action.date].push(["09:00", "17:00"]);
                }
                else {
                    tempAvailability[action.date] = [...action.specificAvailability[action.date]];
                }
            }
            return tempAvailability;
        case 'Update_Availability':
            tempAvailability[action.date][action.index][action.fromOrTo] = action.value;
            return tempAvailability;
        case 'Delete_Availability':
            tempAvailability[action.date] = tempAvailability[action.date].filter((_, idx) => idx !== action.index);
            return tempAvailability
        case 'Add_Availability':
            tempAvailability[action.date].push(["09:00", "17:00"]);
            return tempAvailability;
        case 'Set_To_Default':
            return {}
        default: {
            throw Error('Unknown Action' + action.type);
        }
    }
}

export default function OverRideForm({ handleAddSpecificAvailability, setVisibility, specificAvailability }) {
    const [date, setDate] = useState(null);
    const [availability, dispatch] = useReducer(tasksReducer, {});

    function handleUpdateDate(date_) {
        setDate(date_);
        dispatch({
            type: 'Initialize_availability_For_Date',
            date: date_,
            specificAvailability
        })
    }

    function handleUpdateAvailability(index, fromOrTo, value) {
        dispatch({
            type: 'Update_Availability',
            date,
            index,
            fromOrTo,
            value
        })
    }

    function handleDeleteAvailability(index) {
        dispatch({
            type: 'Delete_Availability',
            date,
            index
        })
    }

    function handleAddAvailability() {
        dispatch({
            type: 'Add_Availability',
            date
        })
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
                        (date !== null && (date in availability) && availability[date].length > 0) ?
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
                                                        onChange={(e) => { handleUpdateAvailability(idx, 0, e.target.value) }}
                                                    />
                                                    -
                                                    <input
                                                        type='time'
                                                        className='border border-gray-800 md:w-[28%] rounded-md ml-[2%] p-[2px] text-center sm:w-[35%]'
                                                        value={ele[1]}
                                                        onChange={(e) => { handleUpdateAvailability(idx, 1, e.target.value) }}
                                                    />

                                                    <button
                                                        className="pl-2 text-xl font-bold xxsm:text-base"
                                                        onClick={() => { handleDeleteAvailability(idx) }}
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
                    onClick={() => {
                        handleAddSpecificAvailability(availability[date], date);
                        dispatch({
                            type: 'Set_To_Default'
                        })
                    }}
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