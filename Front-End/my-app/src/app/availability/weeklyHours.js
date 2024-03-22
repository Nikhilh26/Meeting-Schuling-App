export function WeeklyHour({ day, dayAvailability, handleAvailabilityAddSlot, handleChangeStatus, handleDeleteAvailability }) {

    return (
        <div className='flex flex-row mb-5 w-[100%]'>

            <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 bg-white checked:bg-blue-500"
                onChange={() => { handleChangeStatus(day) }}
                {...(dayAvailability[1] ? { checked: true } : { checked: false })}
                value={dayAvailability[1]}
            />

            <h1 className='text-xl font-bold ml-6 w-[17%] mt-[-5px] bg-blue-500'>
                {day}
            </h1>

            {
                dayAvailability[1] ?
                    <>
                        <div className="flex flex-col mt-[-5px] w-[100%] ">
                            {
                                dayAvailability[0].map((ele, idx) => {
                                    return (
                                        <div className="flex flex-row mb-2 w-[100%]" key={idx}>
                                            <input
                                                type='time'
                                                className='border border-gray-800 w-[26%] rounded-md ml-[5%] mr-[2%]'
                                                value={ele[0]}
                                                onChange={(e) => { console.log('2') }}
                                            />
                                            -
                                            <input
                                                type='time'
                                                className='border border-gray-800 w-[26%] rounded-md ml-[2%]'
                                                value={ele[1]}
                                                onChange={() => { console.log('1') }}
                                            />

                                            <button
                                                className="pl-2 text-xl font-bold"
                                                onClick={() => {
                                                    handleDeleteAvailability(day, idx)
                                                }}
                                            >

                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* <h1
                            className="ml-[80px] text-xl font-bold">
                            <button
                                onClick={() => handleAvailabilityAddSlot(day)}>

                            </button>
                        </h1> */}
                    </>
                    :

                    <h1
                        className='text-2xl font-bold text-gray-500 mt-[-5px] w-[100%] ml-[5%]'>
                        Unavailable
                    </h1>
            }
        </div>
    )
}