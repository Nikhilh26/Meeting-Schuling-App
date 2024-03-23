export function WeeklyHour({ day, dayAvailability, handleAvailabilityAddSlot, handleChangeStatus, handleDeleteAvailability, handleUpdateAvailability }) {

    return (
        <div className='flex flex-row mb-5 w-[100%]'>

            <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 bg-white checked:bg-blue-500"
                onChange={() => { handleChangeStatus(day) }}
                {...(dayAvailability[1] ? { checked: true } : { checked: false })}
                value={dayAvailability[1]}
            />

            <h1 className='text-xl font-bold ml-6 w-[13%] mt-[-5px] bg-blue-500'>
                {day}
            </h1>

            {
                dayAvailability[1] ?
                    <>
                        <div className="flex flex-col mt-[-5px] w-[67%] ml-[3%]">
                            {
                                dayAvailability[0].map((ele, idx) => {
                                    return (
                                        <div className="flex flex-row mb-2 w-[100%]" key={idx}>
                                            <input
                                                type='time'
                                                className='border border-gray-800 w-[28%] rounded-md mr-[2%] p-[2px] text-center'
                                                value={ele[0]}
                                                onChange={(e) => { handleUpdateAvailability(day, idx, 0, e.target.value) }}
                                            />
                                            -
                                            <input
                                                type='time'
                                                className='border border-gray-800 w-[28%] rounded-md ml-[2%] p-[2px] text-center'
                                                value={ele[1]}
                                                onChange={(e) => { handleUpdateAvailability(day, idx, 1, e.target.value) }}
                                            />

                                            <button
                                                className="pl-2 text-xl font-bold"
                                                onClick={() => {
                                                    handleDeleteAvailability(day, idx)
                                                }}
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
                                className="text-xl font-bold mt-[-5px] bg-blue-500"
                                onClick={() => handleAvailabilityAddSlot(day)}>
                                Add
                            </button>
                        </div>

                    </>
                    :

                    <h1
                        className='text-2xl font-bold text-gray-500 mt-[-5px] w-[70%] ml-[3%]'>
                        Unavailable
                    </h1>
            }
        </div>
    )
}