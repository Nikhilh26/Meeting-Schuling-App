export function SpecificHours({ setVisibility, specificAvailability }) {
    console.log(specificAvailability)
    let keys = Object.keys(specificAvailability);

    return (
        <>
            <h1 className='text-2xl font-bold pt-7'>
                Date-specific hours
            </h1>

            <div className="mt-[2vh] text-gray-500">
                Override your availability for specific dates when your hours differ from your regular weekly hours.
            </div>

            <div
                className="mt-[1vh] rounded-xl border border-gray-800 w-[50%] pl-[10px] pr-[8px] text-sm pt-[2px] pb-[2px] cursor-pointer"
                onClick={(e) => setVisibility(true)} >
                Add Date Specific Hours
            </div>

            {
                keys.map((key, idx) => {
                    return (
                        <div
                            key={idx}
                            className="w-[100%] flex flex-row justify-between mt-5"
                        >
                            <h1>
                                {key}
                            </h1>

                            <div className="flex flex-col">
                                {
                                    specificAvailability[key].map((ele) => {
                                        return (
                                            <div>
                                                {ele[0]}-{ele[1]}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }

        </>
    )
}