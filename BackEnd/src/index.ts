import { Hono } from "hono";
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { handleLogin } from "./controllers/handleLogin";
import { handleSlotBooking } from "./controllers/handleSlotBooking";
import { handleUserRegistration } from "./controllers/handleUserRegistration";
import { handleAvailabilityOfDay } from "./controllers/handleAvailabilityOfDay";
import { handleUserExistenceCheck } from "./controllers/handleUserExistenceCheck";
import { handleUpstashQueueMessage } from "./controllers/handleOnIncomingQueueMesaage";
import { handleOverRideAvailability } from "./controllers/handleOverRideAvailability";
import { handleWeeklyScheduleUpdate } from "./controllers/handleWeeklyScheduleUpdate";
import { handleCheckSlugAvailability } from "./controllers/handleCheckSlugAvailability";
import { handleGetAvailability, handleGetUserNameAndSlug } from "./controllers/handleGetAvailability ";

const str = "postgresql://nikhilharisinghani26:IK7XE5LvhatP@ep-shy-forest-a1gcnxek.ap-southeast-1.aws.neon.tech/Calendly-Clone?sslmode=require"

const app = new Hono();
const sql = neon(str);

export const db = drizzle(sql);
app.use('/*', cors());

app.get('/', (c) => {
	return c.text("Hello World")
})

//Registration of a user and its entry in db
app.post('/register', handleUserRegistration); // Integration done

//This Endpoint checks for availability of slug 
app.post('/user/checkAvailability', handleCheckSlugAvailability)

// Login Authentication
app.post('/login', handleLogin) // Integration Done

// Update weekly schedule of a person
app.put('/weekly-schedule/update', handleWeeklyScheduleUpdate); //Changes Done

// fetches userAvailability as respPayload2 and userWeeklyAvailability as respPayload1
app.get('/availability', handleGetAvailability); // Changes Done

// Books slot between two person
app.post('/slot/book', handleSlotBooking); // Integration Done and (Google API integration remains)

// Handles Message sent by Queue
app.post('/', handleUpstashQueueMessage) // changes to be made

//Check wether /{user_slug} this exist or not
app.post('/user/exist', handleUserExistenceCheck); // Integration Done

//Fetches availability of a user using Slug for the given Day which used to schedule call
app.get('/availability/day', handleAvailabilityOfDay); // Integration Done

// Updates UserAvailability Table
app.post('/availability/overRide', handleOverRideAvailability)

// Returns UserName and slug 
app.get('/user/getNameAndSlug', handleGetUserNameAndSlug)

app.notFound((c) => {
	c.status(404);
	return c.text("Not Found");
})

export default app;