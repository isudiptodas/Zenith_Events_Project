'use client'

import { allEvents } from "@/data/events";
import { Event } from '../../types/event';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Activity, useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { motion } from 'motion/react';

function page() {

  const [option, setOption] = useState('upcoming');
  const [visible, setVisible] = useState(false);
  const [popupPoster, setPopupPoster] = useState('');

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { upcomingEvents, pastEvents } = allEvents.reduce<{
    upcomingEvents: Event[];
    pastEvents: Event[];
  }>(
    (acc, event) => {
      const eventDate = new Date(event.date);

      if (eventDate >= today) {
        acc.upcomingEvents.push(event);
      } else {
        acc.pastEvents.push(event);
      }
      return acc;
    },
    {
      upcomingEvents: [],
      pastEvents: [],
    }
  );

  return (
    <>
      <div className={`w-full h-auto flex flex-col justify-start items-center relative overflow-hidden`}>

        <Navbar />

        {/* blur section */}
        <div className={`w-full rounded-t-2xl ${visible ? "translate-y-0" : "translate-y-full"} duration-500 ease-in-out h-screen flex flex-col justify-center items-center fixed top-0 backdrop-blur-2xl bg-black/20 z-100`}>
          <img src={popupPoster || ".."} className={`h-[70%] rounded-3xl`} />
          <p onClick={() => setVisible(false)} className={`w-auto px-10 py-3 text-center text-black font-prixima font-semibold bg-white rounded-md cursor-pointer active:opacity-75 duration-200 ease-in-out select-none mt-5`}>Close</p>
        </div>

        <section className={`w-full min-h-screen flex flex-col justify-start items-center bg-zinc-950 px-3 pt-5 pb-10`}>
          <motion.h1 initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} className={`w-full text-center font-bold text-4xl md:text-6xl font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none mt-16 lg:mt-20`}>Events</motion.h1>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }} className={`w-full text-white text-[12px] text-center mt-1 font-prixima font-light opacity-70 select-none`}>Join our diversified events and experience life</motion.p>

          <motion.div initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.5, ease: "easeInOut" }} className={`w-auto p-[3px] mt-10 rounded-full border border-zinc-700 flex justify-center items-center gap-5`}>
            <span onClick={() => setOption('upcoming')} className={`w-auto px-5 py-2 text-white select-none cursor-pointer rounded-full ${option === 'upcoming' ? "bg-linear-to-br from-blue-400 to-blue-900 font-semibold" : "font-normal bg-transparent"} duration-200 ease-in-out`}>Upcoming</span>
            <span onClick={() => setOption('past')} className={`w-auto px-5 py-2 select-none cursor-pointer rounded-full ${option === 'past' ? "bg-linear-to-br from-white via-gray-200 to-gray-400 font-semibold text-black" : "font-normal bg-transparent text-white"} duration-200 ease-in-out`}>Past</span>
          </motion.div>

          <section className={`w-full mt-10 h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-start gap-8 px-2 lg:px-5`}>
            <Activity mode={option === 'upcoming' ? "visible" : "hidden"}>
              {upcomingEvents.map((item, index) => {
                return <EventCard key={index} name={item.name} desc={item.desc} date={item.date} id={item.id} link={item.link} location={item.location} expired={new Date(item.date) < today} points={item.points} setVisible={() => { setVisible(!visible); setPopupPoster(item.poster) }} poster={item.poster} />
              })}
            </Activity>
            <Activity mode={option === 'past' ? "visible" : "hidden"}>
              {pastEvents.map((item, index) => {
                return <EventCard key={index} name={item.name} desc={item.desc} date={item.date} id={item.id} link={item.link} location={item.location} expired={new Date(item.date) < today} points={item.points} setVisible={() => { setVisible(!visible); setPopupPoster(item.poster) }} poster={item.poster} />
              })}
            </Activity>
          </section>
        </section>
        <Footer />
      </div>
    </>
  )
}

export default page
