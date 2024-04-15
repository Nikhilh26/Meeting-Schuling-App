// consider refactoring to keep slug check on server and utilize caching as get is check availability is get only
// -> solution make page a server component and on server component check for slug if its a miss fetch it and cache it :-)
import UserAvailability from "./UserAvailability";

async function handleCheckUserExistence(params) {
    try {
        let resp = await fetch(`http://localhost:8787/user/exist?slug=${params}`)
        let payload = await resp.json();

        return payload.success;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default async function page({ params }) {
    const checkUserExist = await handleCheckUserExistence(params.slug[0]);
    // console.log(checkUserExist);

    if (!checkUserExist) {
        return (<div>User does not exist</div>);
    } else {
        return <UserAvailability params={params.slug[0]} />
    }
}