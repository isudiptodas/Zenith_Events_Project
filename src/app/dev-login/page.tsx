'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { RiLoginCircleLine } from "react-icons/ri";
import { motion } from 'motion/react';
import { toast } from "sonner"

function page() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entering, setEntering] = useState(false);
  const router = useRouter();

  const register = async () => {
    if (entering) return;

    if (!email.trim() || !password.trim()) {
      toast.error("Both email & password required");
      return;
    }

    const id = toast.loading("Registering ...");

    try {
      setEntering(true);
      const res = await axios.post(`/api/admin/auth`, {
        email, password, type: 'register'
      }, {
        withCredentials: true
      });
    } catch (error) {
      console.log(error);
    }
    finally {
      setEntering(false);
      toast.dismiss(id);
    }
  }

  const login = async () => {
    if (entering) return;

    if (!email.trim() || !password.trim()) {
      toast.error("Both email & password required");
      return;
    }

    const id = toast.loading("Logging in...");

    try {
      setEntering(true);
      const res = await axios.post(`/api/admin/auth`, {
        email, password, type: 'login'
      }, {
        withCredentials: true
      });

      if (res.status === 200) {
        router.push('/admin/home');
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setEntering(false);
      toast.dismiss(id);
    }
  }

  return (
    <>
      <div className={`w-full h-auto bg-zinc-950 flex flex-col justify-center items-center relative overflow-hidden`}>
        <Navbar />

        <div className={`w-full px-5 lg:w-[50%] bg-zinc-950 min-h-screen flex flex-col justify-center items-center relative gap-3`}>
          <motion.p initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }} className={`w-full text-center text-white font-semibold text-5xl mb-5`}>Take Control</motion.p>

          <motion.input initial={{opacity: 0, filter: "blur(10px)"}} animate={{opacity:1, filter: "blur(0px)"}} transition={{duration: 0.5, ease: "easeInOut", delay: 0.2}} onChange={(e) => setEmail(e.target.value)} type="email" className={`w-full rounded-full py-3 px-4 outline-none text-white bg-zinc-800`} placeholder="Enter your email" />
          <motion.input initial={{opacity: 0, filter: "blur(10px)"}} animate={{opacity:1, filter: "blur(0px)"}} transition={{duration: 0.5, ease: "easeInOut", delay: 0.2}} onChange={(e) => setPassword(e.target.value)} type="password" className={`w-full rounded-full py-3 px-4 outline-none text-white bg-zinc-800`} placeholder="*******" />
          <motion.span initial={{opacity: 0, filter: "blur(10px)"}} animate={{opacity:1, filter: "blur(0px)"}} transition={{duration: 0.5, ease: "easeInOut", delay: 0.4}} onClick={login} className={`w-full rounded-full bg-linear-to-b from-yellow-500 to-yellow-600 text-black font-semibold text-center select-none py-3 active:opacity-75 duration-200 ease-in-out flex justify-center items-center gap-2`}>Enter <RiLoginCircleLine /></motion.span>

          <motion.p initial={{opacity: 0, filter: "blur(10px)"}} animate={{opacity:1, filter: "blur(0px)"}} transition={{duration: 0.5, ease: "easeInOut", delay: 0.5}} onClick={() => router.push('/')} className={`w-full flex justify-center items-center text-center text-[12px] select-none xl:text-sm text-yellow-500 mt-5`}>Go back to home</motion.p>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default page
