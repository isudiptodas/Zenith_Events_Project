'use client'

import axios from "axios";
import Link from "next/link";
import { useState } from "react"
import { GrFormPreviousLink } from "react-icons/gr";
import { toast } from "sonner";

function page() {

    const [name, setName] = useState('');
    const [referenceID, setID] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const submitIssue = async () => {
        if (submitting) return;

        if (!name || !referenceID || !message) {
            toast.error("Please fill all required details");
            return;
        }

        const id = toast.loading("Submitting your issue...");

        try {
            setSubmitting(true);
            const res = await axios.post(`/api/grievance`, {
                name, id: referenceID, message
            });

            if (res.status === 200) {
                toast.success("Issue submitted");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        toast.dismiss(id);
        setSubmitting(false);
        setName("");
        setID("");
        setMessage("");
    }

    return (
        <>
            <div className={`w-full pt-28 min-h-screen bg-zinc-950 flex flex-col justify-start items-center relative`}>
                <Link href='/' className={`fixed top-5 xl:top-10 xl:left-10 left-5 bg-white/10 text-white select-none p-2 rounded-full text-xl`}><GrFormPreviousLink /></Link>

                <p className={`w-full text-center text-white font-semibold text-3xl select-none`}>Register your Issue</p>
                <p className={`w-full px-8 text-center text-white mt-2 text-sm opacity-75 select-none`}>We're always ready to help you and answer your every complaint</p>

                <div className={`w-[90%] xl:w-[45%] px-5 py-5 border-2 border-gray-500 rounded-2xl flex flex-col justify-center items-center mt-10`}>
                    <p className={`w-full select-none text-white text-sm`}>Enter your reference ID :*</p>
                    <input onChange={(e) => setID(e.target.value)} value={referenceID} type="text" className={`w-full py-2 px-3 mt-3 rounded-md bg-zinc-800 text-white outline-none`} placeholder="Enter ID" />

                    <p className={`w-full mt-5 select-none text-white text-sm`}>Enter your name :*</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className={`w-full py-2 px-3 mt-3 rounded-md bg-zinc-800 text-white outline-none`} placeholder="Enter name" />

                    <p className={`w-full mt-5 select-none text-white text-sm`}>Enter your issue details :*</p>
                    <textarea data-lenis-prevent onChange={(e) => setMessage(e.target.value)} value={message} className={`w-full overflow-y-auto overscroll-contain h-44 py-2 px-3 mt-3 rounded-md bg-zinc-800 text-white outline-none`} placeholder="Tell us in detail about your issue" />

                    <span onClick={submitIssue} className={`w-full py-2 bg-linear-to-b from-gray-300 to-white text-black select-none font-semibold rounded-md mt-5 active:opacity-80 duration-200 ease-in-out text-center`}>Submit Issue</span>
                </div>
            </div>
        </>
    )
}

export default page
