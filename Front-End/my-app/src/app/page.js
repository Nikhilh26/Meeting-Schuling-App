import HomePageComponent from "@/components/HomePageComponent"
export default function page() {
  return (
    <div>
      <div className='mt-[10vh] text-center'>
        <HomePageComponent />

        <div className='text-xl text-gray-500 font-bold ml-4 mt-[2vh]' >
          Share the above Link with the person who wants to schedule meeting
        </div>

      </div>

      <div className='text-2xl mt-[5vh] text-center font-extrabold mb-[3vh]'>
        Here's how this works
      </div>

      <div className='pl-[5vw]'>

        <div className='mb-5'>
          <span className='bg-gray-200 font-bold p-1 rounded-sm'>/signup</span> Head over to sign up if have'nt, You can sign up using your google account
        </div>

        <div className='mb-5'>
          <span className='bg-gray-200 font-bold p-1 rounded-sm'>/login</span> Login if you want to change your availability or check your upcomingevents
        </div>

        <div className='mb-5'>
          <span className='bg-gray-200 font-bold p-1 rounded-sm'>/Events</span> You can check upcoming events or add events yourself
        </div>

        <div className='mb-5'>
          Note:You do not have to book a call with other person
        </div>

        <div className='mb-5'>
          This website requires access to your google calendar to make the integration more easy and
          to reduce your load
        </div>
      </div>

    </div>
  )
}