'use client'

import { motion } from "motion/react";
import { IoLogoWhatsapp } from "react-icons/io5";

function WhatsappPopup() {
    return (
        <>
            <motion.span initial={{ filter: "blur(10px)", opacity: 0 }} animate={{ filter: "blur(0px)", opacity: 1 }} transition={{ duration: 1, delay: 0.4, ease: "easeIn" }} onClick={() => window.open(`https://wa.me/918582888324`, '_blank')} className={`fixed z-30 rounded-full hover:bg-green-600 duration-200 ease-in-out bottom-10 right-5 md:right-10 text-xl md:text-2xl p-3 bg-green-500 text-white cursor-pointer`}><IoLogoWhatsapp /></motion.span>
        </>
    )
}

export default WhatsappPopup
