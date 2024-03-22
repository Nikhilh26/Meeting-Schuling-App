export function WeeklyHour({ day, dayAvailability, handleAvailabilityAddSlot, handleChangeStatus, handleDeleteAvailability }) {

    return (
        <div className='flex flex-row mb-5'>

            <input
                type="checkbox"
                className="appearance-none w-4 h-4 border border-gray-300 rounded-md bg-white checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                onChange={() => { handleChangeStatus(day) }}
                {...(dayAvailability[1] ? { checked: true } : { checked: false })}
                value={dayAvailability[1]}
            />

            <h1 className='text-2xl font-bold ml-6 w-[50px] mt-[-8px]'>
                {day}
            </h1>

            {
                dayAvailability[1] ?
                    <>
                        <div className="flex flex-col">
                            {
                                dayAvailability[0].map((ele, idx) => {
                                    return (
                                        <div className="flex flex-row mb-2" key={idx}>
                                            <div className="pl-[3vw] pr-[0.5vw]">
                                                <input type='time' className='border border-gray-800 w-[8vw] rounded-md'
                                                    value={ele[0]}
                                                    onChange={(e) => { console.log('2') }}
                                                />
                                            </div>
                                            -
                                            <div className="pl-[0.5vw]">
                                                <input type='time' className='border border-gray-800 w-[8vw] rounded-md'
                                                    value={ele[1]}
                                                    onChange={() => { console.log('1') }}
                                                />
                                            </div>
                                            <button
                                                className="pl-2 text-xl font-bold"
                                                onClick={() => { handleDeleteAvailability(day, idx) }}
                                            >
                                                X
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <h1 className="ml-[80px] text-xl font-bold">
                            <button onClick={() => handleAvailabilityAddSlot(day)}>
                                +
                            </button>
                        </h1>
                    </>
                    :
                    <div className="pl-[3vw]">
                        <h1 className='text-xl font-bold text-gray-500'>
                            Unavailable
                        </h1>
                    </div>
            }
        </div>
    )
}