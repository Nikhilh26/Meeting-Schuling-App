import { auth } from '@clerk/nextjs';
import EventFormComponent from './EventFormComponent';

export default function page() {
    const { userId } = auth();
    return (<EventFormComponent userId={userId} />)
}

// clientEmailId: string | null; // set to self?
// bookedFrom: string; // done
// bookedTill: string; // done
// bookedDate: string; // done
// eventDescription: string | null; // message take input
// eventType: string | null; //

// userId: string | null; // send token
// eventId: number;

// const { slug, day, formattedDate }: { slug: string, day: any, formattedDate: string } = await ctx.req.json();


// issue is i have userId and not slug
// solution?
// user/slug is only caching slug existence
// return userID with slug and create route for mapping of user_ID(clerk) -> slug
// this component needs mapping of user_ID(clerk) -> slug

// one possible solution is to make handleAvailability require userID
// For above solution we can cache slug -> userID
// Also in user/slug we fill first check slugs existence in cache -> check /user/exist -> no
// query will be optimized also


// Finalized approach is i will send userID from this and change handleAvailability require userID
// and in /slug/user i will recieve userID as response i will store that in my api and use that to make request asking for time
// form will ask date -> use that date to find availability 