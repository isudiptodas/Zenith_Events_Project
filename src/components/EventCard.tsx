'use client'

import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from 'motion/react';

type eventProps = {
  id: number,
  name: string,
  desc: string,
  location?: string,
  date: string,
  points: string[],
  poster?: string,
  link: string,
  expired?: boolean,
  thumbnail: string
  setVisible?: () => void
}

function EventCard({ id, name, desc, location, date, poster, points, link, expired, thumbnail, setVisible }: eventProps) {
  return (
    <>
      <motion.div initial={{ opacity: 0, filter: "blur(20px)" }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }} className={`w-full group cursor-pointer h-auto flex flex-col justify-start items-center rounded-2xl ${expired ? "bg-linear-to-br from-white via-gray-200 to-gray-400" : "bg-linear-to-br from-blue-300 via-blue-500 to-blue-800"} pt-1 px-1 pb-8 relative overflow-hidden`}>
        <div className={`h-[500px] absolute w-[20px] bg-blue-200 opacity-70 z-10 blur -left-10 group-hover:left-[110%] duration-500 ease-in-out`} />
        <div className={`w-full z-20 bg-zinc-950 rounded-2xl h-auto flex flex-col justify-start items-center overflow-hidden`}>
          <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }} src={thumbnail} className={`w-full`} />
          <p className={`w-full pt-3 px-3 text-start text-white text-2xl font-lexend select-none`}>{name}</p>
          <p className={`w-full pt-2 pb-4 px-3 text-start text-white text-[12px] font-light font-prixima select-none`}>{desc}</p>
          <p className={`w-full pt-2 px-3 text-start text-white text-[12px] font-prixima select-none flex justify-start items-center gap-3 font-semibold`}> <MdDateRange className={`text-lg`} /> {date}</p>
          <p className={`w-full pt-2 pb-4 px-3 text-start text-white text-[12px] font-prixima select-none flex justify-start items-center gap-3 font-semibold`}> <FaLocationDot className={`text-lg`} /> {location}</p>
          <div className={`w-full flex flex-col justify-start items-center pt-2 pb-5 px-3 gap-3`}>
            {points?.map((item, index) => {
              return <span key={index} className={`w-full px-3 py-2 rounded-md text-white text-[10px] select-none border border-zinc-800 bg-white/5`} >{item}</span>
            })}
          </div>
          <div className={`w-full ${expired ? "hidden" : "block"} flex justify-between items-center gap-3 px-3`}>
            <p onClick={() => window.open(link, '_blank')} className={`w-full ${link?.length > 0 ? "block" : "hidden"} mt-2 py-2 rounded-md bg-white text-black text-center cursor-pointer select-none mb-4 active:opacity-80 duration-200 ease-in-out`}>Register</p>
            <p onClick={setVisible} className={`w-full ${poster ? "block" : "hidden"} mt-2 py-2 rounded-md bg-white text-black text-center cursor-pointer select-none mb-4 active:opacity-80 duration-200 ease-in-out`}>View Poster</p>
          </div>
          <p className={`w-[90%] ${expired ? "block" : "hidden"} mt-2 py-2 rounded-md text-white text-center cursor-pointer select-none mb-4 active:opacity-80 duration-200 ease-in-out`}>Sorry! Event expired</p>
        </div>
      </motion.div>
    </>
  )
}

export default EventCard
