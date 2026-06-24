'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { services } from "@/data/services"
import { motion } from 'motion/react'

function page() {
  return (
    <>
      <div className={`w-full bg-zinc-950 h-auto relative overflow-hidden flex flex-col justify-start items-center`}>

        <Navbar />

        <section className={`w-full min-h-screen flex flex-col justify-start items-center pb-16`}>
          <motion.h1 initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} className={`w-full text-center font-bold text-4xl md:text-6xl font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none mt-16 lg:mt-20`}>Services</motion.h1>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }} className={`w-full text-white text-[12px] text-center mt-1 font-prixima font-light opacity-70 select-none`}>Avail exceptional services for extraordinary moments</motion.p>

          <div className={`w-full px-3 mt-10 h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-start gap-8`}>
            {services.map((item, index) => {
              return <motion.div initial={{ opacity: 0, filter: "blur(20px)" }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} key={index} className={`w-full group cursor-pointer rounded-2xl h-auto flex flex-col justify-start items-center px-1 pb-1 bg-linear-to-r from-yellow-200 via-yellow-500 to-yellow-800 overflow-hidden relative`}>
                <div className={`w-[20px] h-[410px] absolute bg-yellow-200 opacity-65 z-10 blur-sm -left-10 group-hover:left-full duration-300 ease-in-out`} />
                <p className={`w-full text-start px-3 py-4 font-lexend font-bold text-xl select-none`}>{item.title}</p>
                <div className={`w-full z-20 h-auto flex flex-col justify-start items-center px-3 py-5 bg-zinc-950 rounded-2xl`}>
                  <p className={`w-full text-start text-white text-[12px] select-none font-prixima`}>{item.subtext}</p>
                  <hr className={`w-full h-[2px] my-5 bg-zinc-700`} />

                  <div className={`w-full flex justify-between items-start gap-3`}>
                    {item.stats.map((stat, index) => {
                      return <div key={index} className={`w-full px-3 py-3 rounded-lg border border-zinc-800 flex flex-col justify-center items-center gap-2`}>
                        <p className={`text-yellow-500 font-lexend text-xl font-semibold`}>{stat.number}</p>
                        <p className={`text-white text-center font-prixima text-[10px] font-normal`}>{stat.text}</p>
                      </div>
                    })}
                  </div>
                </div>
              </motion.div>
            })}
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default page
