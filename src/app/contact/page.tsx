'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { motion } from "motion/react"
import { IoIosCall } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdMailOpen } from "react-icons/io";

function page() {

  return (
    <>
      <div className={`w-full h-auto flex flex-col justify-start items-center relative overflow-hidden bg-zinc-950`}>

        <Navbar />

        <section className={`w-full md:w-[70%] mt-14 pb-16 px-5 min-h-screen flex flex-col justify-start items-center`}>
          <motion.h1 initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} className={`w-full text-center mb-3 font-bold text-4xl md:text-6xl font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none mt-16 lg:mt-20`}>Contact Us</motion.h1>
          
          <motion.hr initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} className={`w-[80%] my-5 h-[2px] bg-linear-to-r from-transparent via-yellow-500 to-transparent`} />

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm text-center mt-1 font-prixima font-light select-none`}>We appreciate your interest in Zenith Events & Financial Consultancy. Whether you have questions about our services, require professional assistance, or would like to discuss your requirements, our team is always ready to assist you.</motion.p>

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.6, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>We believe in building meaningful relationships with our clients and are committed to providing timely support and reliable guidance. Feel free to reach out to us through phone, email, or by submitting an enquiry through our website.</motion.p>
          
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.8, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>Our team will review your request and get back to you as soon as possible.</motion.p>
          
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.9, ease: "easeInOut" }} className={`w-full text-white text-lg lg:text-xl mt-10 text-center font-prixima font-semibold select-none`}>Reach out to Us</motion.p>
          <div className={`w-[80%] mt-5 rounded-3xl border border-zinc-700 flex  flex-col justify-start items-center px-3 py-3`}>
            <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 1, ease: "easeInOut" }} className={`w-full py-2 text-white text-[10px] lg:text-sm text-center font-prixima font-light select-none flex justify-center items-center gap-3`}><IoIosCall /> +91 8582888393 / +91 8017387358</motion.p>
            <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 1, ease: "easeInOut" }} className={`w-full py-2 text-white text-[10px] lg:text-sm text-center font-prixima font-light select-none flex justify-center items-center gap-3`}><IoMdMailOpen /> <span className={`text-yellow-500`} onClick={() => {window.open('mailto:reachus@zefc.in', '_blank')}}>reachus@zefc.in</span> / <span className={`text-yellow-500`} onClick={() => {window.open('mailto:event@zefc.in', '_blank')}}>event@zefc.in</span></motion.p>
            <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 1, ease: "easeInOut" }} className={`w-full py-2 text-white text-[10px] lg:text-sm text-center font-prixima font-light select-none flex justify-center items-center gap-3`}><FaMapLocationDot /> 9 Deshapriya Park Road, Lake Market, Kolkata - 700026</motion.p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default page
