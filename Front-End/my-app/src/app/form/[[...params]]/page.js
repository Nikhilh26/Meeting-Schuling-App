import { auth } from '@clerk/nextjs';
import ScheduleFormComponent from './ScheduleFormComponent';

export default async function page({ params }) {
    const { userId } = auth();

    return (<ScheduleFormComponent params={params} userId={userId} />)
}
