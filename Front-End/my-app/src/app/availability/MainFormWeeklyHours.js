import { WeeklyHour } from "./weeklyHours";

const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function MainFormWeeklyHours(
    { handleAvailabilityAddSlot,
        handleChangeStatus,
        handleDeleteAvailability,
        handleUpdateAvailability,
        availability
    }) {
    return (
        <>
            <div className='mt-10 w-[100%]'>
                {
                    daysofWeek
                    &&
                    daysofWeek.map((day, idx) => {
                        return (
                            <WeeklyHour
                                day={day}
                                dayAvailability={availability[day]}
                                handleAvailabilityAddSlot={handleAvailabilityAddSlot}
                                handleChangeStatus={handleChangeStatus}
                                handleDeleteAvailability={handleDeleteAvailability}
                                handleUpdateAvailability={handleUpdateAvailability}
                                key={idx}
                            />)
                    })
                }
            </div>
        </>
    )
}