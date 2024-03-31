
export default function MainFormHeader({ windowWidth, setShowWeeklyHours }) {
    return (
        <>
            {
                windowWidth >= 1100
                    ?
                    <h1 className='text-2xl font-bold pt-7'>
                        Weekly Hours
                    </h1>
                    :
                    <div
                        className="w-[80%] bg-blue-500 flex flex-row">
                        <h1
                            className='text-base font-bold pt-7 sm:mr-[10%] xsm:text-xl xsm:[8%] sm:text-xl xxsm:mr-[6%] xsm:mr-[8%]'
                            onClick={() => setShowWeeklyHours(1)}>
                            <button>
                                Weekly Hours
                            </button>
                        </h1>
                        <h1
                            className='text-base font-bold pt-7 xsm:text-xl sm:text-xl'
                            onClick={() => setShowWeeklyHours(0)}
                        >
                            <button>
                                Date Override
                            </button>
                        </h1>
                    </div>
            }
        </>
    )
}
