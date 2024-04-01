import { auth } from '@clerk/nextjs';
import Clerk from '@clerk/clerk-js';

// await clerk.load();
// const clerk1 = new Clerk('pk_test_ZXhjaXRpbmctZGFuZS00LmNsZXJrLmFjY291bnRzLmRldiQ​');

export default function page() {
  const { userId, user } = auth();

  return (
    <div>
      <div className='mt-[10vh] text-center'>
        {
          userId ?
            <div>
              <h1 className='text-4xl font-extrabold mt-8'>
                Welcome Back , <p>{user}</p>
              </h1>

              <div className='mt-[2vh]'>
                <span className='border-2 p-1 border-black'>
                  http://localhost:3000/nikhilharisinghani26
                </span>

                <button className='text-xl font-bold ml-4'
                // onClick={() => navigator.clipboard.writeText(`http://locahost:300/nikhil`)}
                >
                  Copy
                </button>
              </div>

              <div className='text-xl text-gray-500 font-bold ml-4 mt-[2vh]' >
                Share the above Link with the person who wants to schedule meeting
              </div>

            </div>
            :
            <h1 className='text-2xl font-extrabold'>
              SignUp / Login First
            </h1>
        }
      </div>

      <div className='text-2xl mt-[5vh]'>
        Here's how this works
      </div>

      <div>
        /signup Head over to sign up if have'nt, You can sign up using your google account
      </div>

      <div>
        /login Login if you want to change your availability or check your upcomingevents
      </div>

      <div>
        /Events You can check upcoming events or add events yourself
      </div>

      <div>
        Note:You do not have to book a call with other person
      </div>

      <div>
        This website requires access to your google calendar to make the integration more easy and
        to reduce your load
      </div>

    </div>
  )
}