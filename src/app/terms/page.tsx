'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { motion } from "motion/react"

function page() {

  return (
    <>
      <div className={`w-full h-auto flex flex-col justify-start items-center relative overflow-hidden bg-zinc-950`}>

        <Navbar />

        <section className={`w-full md:w-[70%] mt-14 pb-16 px-5 min-h-screen flex flex-col justify-start items-center`}>
          <motion.h1 initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} className={`w-full text-center mb-3 font-bold text-4xl md:text-6xl font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none mt-16 lg:mt-20`}>Terms of Use</motion.h1>
          
          <motion.hr initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }} className={`w-[80%] my-5 h-[2px] bg-linear-to-r from-transparent via-yellow-500 to-transparent`} />

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm text-center mt-1 font-prixima font-light select-none`}>Welcome to Zenith Events & Financial Consultancy. By accessing and using this website, you agree to comply with these Terms of Use. If you do not agree with these terms, please discontinue the use of the website.</motion.p>

          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.5, ease: "easeInOut" }} className={`w-full text-white text-lg lg:text-xl mt-10 text-center font-prixima font-semibold select-none`}>Website Usage</motion.p>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.6, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>This website is intended to provide information about our services and allow users to contact us for enquiries. Users agree to use the website in a lawful and responsible manner.</motion.p>
          
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.7, ease: "easeInOut" }} className={`w-full text-white text-lg lg:text-xl mt-10 text-center font-prixima font-semibold select-none`}>Intellectual Property</motion.p>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.8, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>All content available on this website, including text, graphics, logos, images, and other materials, is the property of Zenith Events & Financial Consultancy unless otherwise stated. Unauthorized copying, reproduction, or distribution of website content is prohibited.</motion.p>
          
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 0.9, ease: "easeInOut" }} className={`w-full text-white text-lg lg:text-xl mt-10 text-center font-prixima font-semibold select-none`}>Accuracy of Information</motion.p>
          <motion.p initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.3, delay: 1, ease: "easeInOut" }} className={`w-full text-white text-[10px] lg:text-sm mt-3 text-center font-prixima font-light select-none`}>We make reasonable efforts to ensure that the information provided on this website is accurate and up to date. However, we do not guarantee the completeness or accuracy of all information and reserve the right to modify content without prior notice.</motion.p>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default page
