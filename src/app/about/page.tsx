'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { motion } from "motion/react"

function page() {
  return (
    <>
      <div className={`w-full h-auto flex flex-col justify-start items-center relative overflow-hidden bg-zinc-950`}>

        <Navbar />

        <section className={`w-full md:w-[70%] mt-14 px-5 min-h-screen flex flex-col justify-start items-center`}>
          <motion.h1 initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} className={`w-full text-center mb-3 font-bold text-4xl md:text-6xl font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none mt-16 lg:mt-20`}>About Us</motion.h1>
          
          <motion.hr initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} className={`w-[80%] my-5 h-[2px] bg-linear-to-r from-transparent via-yellow-500 to-transparent`} />

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm text-center mt-1 font-prixima font-light select-none`}>At Zenith Events & Financial Consultancy, we believe that every successful business and every memorable experience is built on thoughtful planning, trust, and meaningful relationships. Our organization was established with the vision of providing integrated solutions that combine professional financial guidance with exceptional event management services.</motion.p>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.5, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>We understand that every individual, business, and organization has unique objectives. Whether it is planning a corporate event, building a brand presence, organizing social experiences, or seeking financial consulting services, we focus on delivering solutions that are practical, reliable, and aligned with our clients' goals.</motion.p>

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.6, ease: "easeInOut" }} className={`w-full text-white text-lg lg:text-xl mt-10 text-center font-prixima font-semibold select-none`}>Our Mission</motion.p>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.7, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>Our mission is to provide reliable financial consulting and professional event management solutions that help clients achieve their goals while building lasting relationships based on trust, integrity, and service excellence.</motion.p>

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.8, ease: "easeInOut" }} className={`w-full text-white text-lg lg:text-xl mt-10 text-center font-prixima font-semibold select-none`}>Our Vision</motion.p>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.9, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>Our vision is to become a trusted name in financial consultancy and event management by delivering innovative solutions, maintaining transparency, and creating value for every client we serve.</motion.p>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default page
