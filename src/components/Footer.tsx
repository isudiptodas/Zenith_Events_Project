'use client'

import { footerLinks } from "@/data/footerLinks"
import { useRouter } from "next/navigation"
import { motion } from 'motion/react'
import { toast } from "sonner"
import { useState } from "react"
import axios from "axios"

function Footer() {

    const router = useRouter();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [sending, setSending] = useState(false);

    const sendQuery = async () => {

        if (sending) {
            return;
        }

        if (!message || !name || !email || !contact) {
            toast.error("Please enter details");
            return;
        }

        if (contact.length < 10) {
            toast.error("Please enter valid 10 numbers");
            return;
        }

        if (!email.trim().endsWith('@gmail.com') && !email.trim().endsWith('@outlook.com')) {
            toast.error("Please enter a valid email");
            return;
        }

        const id = toast.loading("Sending message...");

        try {
            setSending(true);
            const res = await axios.post(`/api/submit-query`, {
                name, email, contact, message
            });
            toast.dismiss(id);
            toast.success("Your query submitted");
        } catch (error: any) {
            console.log(error);
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message);
        }
        finally {
            toast.dismiss(id);
            setSending(false);
            setEmail('');
            setName('');
            setContact('');
            setMessage('');
        }
    }

    return (
        <>
            <footer className={`w-full bg-zinc-950 h-auto flex flex-col justify-start items-center`}>
                <div className={`w-full h-auto pt-10 pb-8 flex flex-col justify-center items-center bg-linear-to-b from-[#1E4AC2] via-zinc-950 to-zinc-950`}>
                    <motion.h2 initial={{ opacity: 0, filter: "blur(20px)", y: 50 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }} className={`w-full text-center text-white font-lexend text-3xl md:text-4xl lg:text-6xl font-semibold`}>For your any query</motion.h2>
                    <motion.p initial={{ opacity: 0, filter: "blur(20px)", y: 50 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }} className={`w-full mt-3 text-center text-white font-lexend text-[12px] lg:text-lg font-light`}>Let's Start A Conversation</motion.p>

                    <div className={`w-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 lg:px-10`}>
                        {/* links */}
                        <div className={`w-full mt-14 grid grid-cols-2 md:grid-cols-3 justify-items-start gap-4`}>
                            {footerLinks.map((item, index) => {
                                return <motion.div initial={{ opacity: 0, filter: "blur(20px)", y: 50 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }} key={index} className={`w-full h-auto flex flex-col justify-start items-center`}>
                                    <p className={`font-semibold font-lexend text-lg text-white select-none`}>{item.name}</p>
                                    <div className={`w-[70%] my-3 h-[2px] bg-linear-to-r from-transparent via-[#4c7cff] to-transparent`} />
                                    {item.links.map((item, index) => {
                                        return <span onClick={() => {
                                            if (item.link.startsWith('https')) {
                                                window.open(item.link, '_blank')
                                            }
                                            else if (item.link.startsWith('91')) {
                                                window.open(`https://wa.me/${item.link}`, '_blank')
                                            }
                                            else {
                                                router.push(item.link)
                                            }
                                        }} key={index} className={`cursor-pointer text-[10px] lg:text-[12px] mb-2 text-white font-light select-none`}>{item.name}</span>
                                    })}
                                </motion.div>
                            })}
                        </div>

                        {/* form */}
                        <motion.div initial={{ opacity: 0, filter: "blur(20px)", x: 50 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }} className={`w-[90%] z-20 md:w-[70%] lg:w-[90%] mt-8 px-3 py-3 h-auto flex flex-col justify-start items-center gap-4 rounded-2xl`}>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className={`w-full bg-zinc-800 py-3 px-4 rounded-full outline-none text-white font-prixima`} placeholder="Enter your name" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={`w-full bg-zinc-800 py-3 px-4 rounded-full outline-none text-white font-prixima`} placeholder="Enter your email" />
                            <input value={contact} onChange={(e) => setContact(e.target.value)} type="string" className={`w-full bg-zinc-800 py-3 px-4 rounded-full outline-none text-white font-prixima`} placeholder="Enter your contact" />
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className={`w-full h-36 bg-zinc-800 py-3 px-4 rounded-3xl outline-none text-white font-prixima`} placeholder="Enter your query / message" />
                            <p onClick={sendQuery} className={`w-full rounded-full text-black bg-white py-3 text-center cursor-pointer active:opacity-65 duration-300 ease-in-out`}>{sending ? "Submitting..." : "Submit"}</p>
                        </motion.div>
                    </div>
                </div>

                <motion.h1 initial={{ opacity: 0, filter: "blur(20px)", y: 70 }} viewport={{ once: true }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }} className={`w-full text-[100px] md:text-[250px] lg:text-[300px] xl:text-[350px] bg-linear-to-b from-[#1E4AC2] via-[#1e4ac265] to-zinc-950 bg-clip-text text-transparent text-center`}>ZENITH</motion.h1>
                <p className={`w-full text-center text-white opacity-50 select-none text-[10px] xl:text-[12px] pb-10`}>© 2026 Zenith Events and Financial Consultancy. All rights reserved.</p>
            </footer>
        </>
    )
}

export default Footer
