'use client'

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { statGrids } from "@/data/statGrids";
import { businessSolutions, organizationSolutions, startupSolutions } from '../data/solutionsGrid';
import { RiGeminiFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { motion } from 'motion/react'

function page() {

  const router = useRouter();

  return (
    <>
      <div className={`w-full h-auto flex flex-col justify-start items-center overflow-hidden relative`}>

        {/* navbar */}
        <Navbar />

        {/* hero section */}
        <section className={`w-full relative h-screen bg-zinc-950 flex flex-col justify-center items-center`}>

          {/* gradient strips */}
          <div className={`w-full absolute top-0 z-10 h-[90%] flex justify-between items-start`}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: "easeInOut" }} className={`w-full h-full bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeInOut" }} className={`w-full h-[80%] bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }} className={`w-full h-[60%] bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }} className={`w-full h-[40%] bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }} className={`w-full h-[60%] bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeInOut" }} className={`w-full h-[80%] bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: "easeInOut" }} className={`w-full h-full bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
          </div>

          <motion.h1 initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.5, delay: 1.3, ease: "easeInOut" }} className={`w-full z-20 text-center md:text-start xl:px-10 md:px-6 font-bold text-white text-4xl lg:text-6xl xl:text-8xl font-lexend`}>Where Financial Expertise Meets Extraordinary Experience</motion.h1>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.5, delay: 1.6, ease: "easeInOut" }} className={`w-full z-20 text-center md:text-start px-8 xl:px-10 md:px-6 font-imprima text-white text-[10px] md:text-[12px] lg:text-lg xl:text-xl mt-5`}>At Zenith Events & Financial Consultancy, we help businesses, organizations and individuals simplify complex financial decisions while delivering memorable events that leave lasting impressions.</motion.p>
        </section>

        {/* stats section */}
        <section className={`w-full px-5 lg:px-10 py-8 h-auto grid grid-cols-2 lg:grid-cols-4 justify-items-center bg-zinc-950 gap-4`}>
          {statGrids.map((item, index) => {
            return <motion.div initial={{ opacity: 0, filter: "blur(20px)" }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }} key={index} className={`w-full rounded-lg bg-white/5 flex flex-col justify-center items-center px-5 py-5`}>
              <h2 className={`text-white font-prixima text-4xl xl:text-6xl font-bold select-none`}>{item.number}</h2>
              <p className={`text-white font-prixima text-[10px] xl:text-lg mt-2 font-normal select-none`}>{item.text}</p>
            </motion.div>
          })}
        </section>

        {/* about section */}
        <section className={`w-full bg-zinc-950 h-auto flex flex-col justify-start items-center px-3 lg:px-8 py-10 md:pt-24`}>
          <motion.h2 initial={{ opacity: 0, filter: "blur(20px)", x: -50 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }} className={`w-full px-3 text-start text-3xl md:text-4xl lg:text-6xl font-bold font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none`}>About Us</motion.h2>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)", x: -50 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }} className={`w-full px-3 text-white mt-3 lg:mt-6 font-prixima font-light text-[10px] md:text-[12px] xl:text-lg`}>Zenith Events & Financial Consultancy was founded with a vision to provide integrated business solutions that go beyond conventional consulting. We understand that every client has unique goals and challenges, which is why our approach combines strategic planning, financial expertise and flawless event execution.
            <br /><br />By focusing on innovation, transparency and long-term relationships, we strive to become a trusted partner that contributes to our clients’ growth and success.</motion.p>
        </section>

        {/* solutions section */}
        <section className={`w-full relative bg-zinc-950 h-auto flex flex-col justify-start items-center px-3 lg:px-8 py-10 overflow-hidden`}>
          <motion.h2 initial={{ opacity: 0, filter: "blur(20px)", x: -50 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }} className={`w-full px-3 text-start text-3xl md:text-4xl lg:text-6xl font-bold font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none`}>Explore our Solutions</motion.h2>

          {/* grids */}
          <div className={`w-full flex flex-col md:flex-row justify-between items-start gap-6 pt-8 md:px-3`}>

            {/* card 1 */}
            <motion.div initial={{ opacity: 0, filter: "blur(20px)", y: 50 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }} className={`w-full z-20 rounded-2xl border backdrop-blur-3xl bg-white/5 pb-6 border-gray-600 h-auto flex flex-col justify-start items-center px-2 py-2`}>
              <p className={`w-full py-3 select-none rounded-xl font-semibold text-white mb-5 bg-linear-to-r from-[#1E32A9] to-[#E77B1E] text-center`}>Business</p>
              {businessSolutions.map((item, index) => {
                return <p key={index} className={`w-full pb-2 text-start flex justify-start items-center gap-2 text-white font-prixima text-[12px]`}><RiGeminiFill className="text-blue-700" /> {item}</p>
              })}
            </motion.div>

            {/* card 2 */}
            <motion.div initial={{ opacity: 0, filter: "blur(20px)", y: 50 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }} className={`w-full z-20 rounded-2xl border backdrop-blur-3xl bg-white/5 pb-6 border-gray-600 h-auto flex flex-col justify-start items-center px-2 py-2`}>
              <p className={`w-full py-3 select-none rounded-xl font-semibold text-white mb-5 bg-linear-to-r from-[#1E32A9] to-[#E77B1E] text-center`}>Organizations</p>
              {organizationSolutions.map((item, index) => {
                return <p key={index} className={`w-full pb-2 text-start flex justify-start items-center gap-2 text-white font-prixima text-[12px]`}><RiGeminiFill className="text-blue-700" /> {item}</p>
              })}
            </motion.div>

            {/* card 3 */}
            <motion.div initial={{ opacity: 0, filter: "blur(20px)", y: 50 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }} className={`w-full z-20 rounded-2xl border backdrop-blur-3xl bg-white/5 pb-6 border-gray-600 h-auto flex flex-col justify-start items-center px-2 py-2`}>
              <p className={`w-full py-3 select-none rounded-xl font-semibold text-white mb-5 bg-linear-to-r from-[#1E32A9] to-[#E77B1E] text-center`}>Startups</p>
              {startupSolutions.map((item, index) => {
                return <p key={index} className={`w-full pb-2 text-start flex justify-start items-center gap-2 text-white font-prixima text-[12px]`}><RiGeminiFill className="text-blue-700" /> {item}</p>
              })}
            </motion.div>
          </div>
        </section>

        {/* upcoming events section */}
        {/* <section className={`w-full h-auto flex flex-col justify-start items-center bg-zinc-950 px-5 pt-10 pb-10`}>
            <h2 className={`w-full px-3 text-start text-3xl md:text-4xl lg:text-6xl font-bold font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none`}>Upcoming Events</h2>
        </section> */}

        {/* footer section */}
        <Footer />

      </div>
    </>
  )
}

export default page
