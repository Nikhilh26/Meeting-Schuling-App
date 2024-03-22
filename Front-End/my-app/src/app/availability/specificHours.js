export function SpecificHours() {
    return (
        <div className='w-[50%] pl-8'>

            <h1 className='text-2xl font-bold pt-7'>
                Date-specific hours
            </h1>

            <div className="mt-[2vh] text-gray-500">
                Override your availability for specific dates when your hours differ from your regular weekly hours.
            </div>

            <div className="mt-[1vh] rounded-xl border border-gray-800 w-[40%] pl-[10px] pr-[8px] text-sm pt-[2px] pb-[2px] cursor-pointer">
                Add Date Specific Hours
            </div>
        </div>
    )
}