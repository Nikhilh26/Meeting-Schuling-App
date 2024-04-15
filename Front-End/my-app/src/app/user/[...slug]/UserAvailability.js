"use client"
import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from 'next/navigation'

export const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];


export default function UserAvailability({params}) {
    const router = useRouter();
    const [date, setDate] = useState(new Date());
    const a = useRef(false);
    const [adj, setAdj] = useState([]);

    useEffect(() => {

        if (a.current && date) {
            try {

                console.log(date);

                let day = daysofWeek[date.getDay()];
                const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

                fetch(' http://localhost:8787/availability/day', {

                    method: "POST",
                    body: JSON.stringify({
                        slug: params.slug[0],
                        day,
                        formattedDate
                    })

                }).then(async (data) => await data.json()).then((data) => {

                    console.log(data);
                    setAdj(data?.returnPayload)

                }).catch((err) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error);
            }
        }

    }, [date])

    useEffect(() => {
        if (a.current === false) {
            a.current = true;
        } else {
            a.current = false;
        }
        return () => {
            a.current = false;
        }
    }, [])

  return (
      <>
          <h1 className="font-extrabold text-4xl ml-10 mb-10 
                            xsm:text-3xl xxsm:text-3xl">
              Book A Call
          </h1>

          <div className="flex justify-center items-center">
              <div
                  className={`w-auto bg-white shadow-2xl p-9 rounded-lg z-2 flex 
                                    md:flex-row sm:flex-col md:h-[60vh] sm:h-auto sm:max-h-auto
                                    xsm:flex-col xsm:h-auto xsm:max-h-auto
                                    xxsm:flex-col xxsm:h-auto xxsm:max-h-auto`
                  }>

                  <div className="flex flex-col lg:w-[22vw]">
                      <h2 className="text-xl text-black-400/25">{params}</h2>
                      <h1 className="text-3xl text-black-400/50">30 Min Meeting</h1>
                      <h2 className="text-xl text-black-400/25">Select Date and Time</h2>
                  </div>

                  <div>
                      <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md p-8"
                      />
                  </div>

                  <div className="flex flex-col text-center flex-1 overflow-y-auto pr-2 sm:max-h-[55vh] xsm:max-h-[30vh] xxsm:max-h-[30vh]">
                      {
                          adj.map((ele, idx) =>
                              <button className="border-double border-black border-2 w-[200px] mx-auto mb-2 pr-3 pl-3" key={idx}

                                  onClick={(e) => {
                                      e.preventDefault();
                                      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                                      console.log(formattedDate);
                                      console.log(e.currentTarget.innerHTML + ":00")
                                      console.log(params.slug[0]);

                                      router.push(`/form/${formattedDate}/${params.slug[0]}/${e.currentTarget.innerHTML}:00`);
                                  }}>
                                  {ele?.start}
                              </button>
                          )
                      }
                  </div>

              </div>
          </div>
      </>
  )
}
