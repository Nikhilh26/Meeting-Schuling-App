// consider refactoring to keep slug check on server and utilize caching as get is check availability is get only
// -> solution make page a server component and on server component check for slug if its a miss fetch it and cache it :-)
import UserAvailability from "./UserAvailability";
// import { cache } from 'react';

const handleCheckUserExistence = async (params) => {
    try {
        let resp = await fetch(`http://localhost:8787/user/exist?slug=${params}`, { cache: 'no-cache' });
        // no-cache only while testing 
        let payload = await resp.json();

        console.log(payload);
        return payload;

        // if (payload.success) {
        //     // not sure wether i should cache it or not
        // }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default async function page({ params }) {
    const checkUserExist = await handleCheckUserExistence(params.slug[0]);

    if (!checkUserExist.success) {
        return (<div>User does not exist</div>);
    } else {
        return (<UserAvailability
            userId={checkUserExist.userId}
            name={checkUserExist.name}
            slug={params.slug[0]} />
        );
    }
}