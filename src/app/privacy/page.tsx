'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { motion } from "motion/react"

function page() {

  const infoCollect = [
    'Name',
    'Email Address',
    'Phone Number',
    'Message / Enquiry details'
  ]

  const infoUse = [
    'To respond to your enquiries and requests.',
    'To communicate with you regarding our services.',
    'To improve our website and customer experience.',
    'To maintain records related to customer interactions.',
    'To provide support and assistance when required.'
  ]

  return (
    <>
      <div className={`w-full h-auto flex flex-col justify-start items-center relative overflow-hidden bg-zinc-950`}>

        <Navbar />

        <section className={`w-full md:w-[70%] mt-14 pb-16 px-5 min-h-screen flex flex-col justify-start items-center`}>
          <motion.h1 initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} className={`w-full text-center mb-3 font-bold text-4xl md:text-6xl font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none mt-16 lg:mt-20`}>Privacy Policy</motion.h1>
          
          <motion.hr initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} className={`w-[80%] my-5 h-[2px] bg-linear-to-r from-transparent via-yellow-500 to-transparent`} />

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm text-center mt-1 font-prixima font-light select-none`}>At Zenith Events & Financial Consultancy, we believe that every successful business and every memorable experience is built on thoughtful planning, trust, and meaningful relationships. Our organization was established with the vision of providing integrated solutions that combine professional financial guidance with exceptional event management services.</motion.p>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.5, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>At Zenith Events & Financial Consultancy, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the information you provide while using our website.</motion.p>

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.6, ease: "easeInOut" }} className={`w-full text-white text-lg lg:text-xl mt-10 text-center font-prixima font-semibold select-none`}>Information We Collect</motion.p>
          <div className={`w-1/2 mt-8 px-4 py-3 rounded-3xl border border-zinc-800 flex flex-col justify-start items-center`}>
              {infoCollect.map((item, index) => {
                return <motion.p key={index} initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.7, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm text-center font-prixima font-light select-none py-3`}>{item}</motion.p>
              })}
          </div>

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.6, ease: "easeInOut" }} className={`w-full text-white text-lg lg:text-xl mt-10 text-center font-prixima font-semibold select-none`}>How We Use Your Information</motion.p>
          <div className={`w-[80%] mt-8 px-4 py-3 rounded-3xl border border-zinc-800 flex flex-col justify-start items-center`}>
              {infoUse.map((item, index) => {
                return <motion.p key={index} initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.7, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm text-center font-prixima font-light select-none py-3`}>{item}</motion.p>
              })}
          </div>

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.8, ease: "easeInOut" }} className={`w-full text-white text-lg lg:text-xl mt-10 text-center font-prixima font-semibold select-none`}>Information Sharing</motion.p>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.9, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>We do not sell, rent, or trade your personal information to third parties. Your information may only be shared when required by law or when necessary for providing services and maintaining website functionality.</motion.p>
          
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.8, ease: "easeInOut" }} className={`w-full text-white text-lg lg:text-xl mt-10 text-center font-prixima font-semibold select-none`}>Changes to This Policy</motion.p>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.9, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>We reserve the right to update this Privacy Policy whenever necessary. Any changes will become effective once published on this website.</motion.p>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default page
