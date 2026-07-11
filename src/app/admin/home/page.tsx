'use client'

import AdminNavbar from "@/components/AdminNavbar";
import { useEffect, useMemo, useState } from "react";
import { BounceForm } from "@/types/bounceResponse";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

function page() {

    const [bounceResponses, setBounceResponses] = useState<BounceForm[] | null>(null);
    const [selectedEvent, setSelectedEvent] = useState("Bounce");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const events = useMemo(() => ["Bounce", "Udbhav"], []);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await axios.get(`/api/events/view`, {
                    withCredentials: true
                });

                setBounceResponses(res.data.found);
            } catch (error: any) {
                //console.log(error);
            }
        }

        fetchResponses();
    }, []);

    return (
        <>
            <div className={`w-full min-h-screen bg-zinc-950 flex flex-col items-center relative overflow-hidden`}>
                <AdminNavbar />

                <div className={`w-full mt-28 px-4 lg:px-10 py-8 flex flex-col gap-8`}>

                    {/* Dropdown */}

                    <div className={`relative w-full lg:w-fit`}>

                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className={`w-full lg:w-56 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex justify-between items-center text-sm lg:text-base font-medium hover:border-blue-500 duration-200`}>

                            <span>{selectedEvent}</span>

                            <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: .25 }}>
                                <FaChevronDown />
                            </motion.span>

                        </button>

                        <AnimatePresence>

                            {dropdownOpen && (

                                <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: .25 }} className={`absolute mt-2 w-full lg:w-56 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-20`}>

                                    {
                                        events.map((item, index) => (

                                            <button key={index} onClick={() => {
                                                setSelectedEvent(item);
                                                setDropdownOpen(false);
                                            }} className={`w-full px-5 py-3 text-left text-white hover:bg-zinc-800 duration-200`}>
                                                {item}
                                            </button>
                                        ))
                                    }
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={`w-full my-1 flex justify-start items-start`}>
                        <p className={`w-auto text-start font-semibold text-white pl-3 text-2xl`}>Total Responses : </p>
                        <p className={`w-auto text-start font-semibold text-yellow-500 px-3 text-2xl`}>{bounceResponses?.length}</p>
                    </div>

                    {/* Table */}

                    <AnimatePresence mode="wait">
                        {
                            selectedEvent === "Bounce" && (
                                <motion.div key="bounce" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} transition={{ duration: .3 }} className={`w-full rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden`}>
                                    <div className={`w-full overflow-x-auto overflow-y-auto max-h-[75vh]`}>
                                        <table className={`min-w-[1700px] w-full border-collapse`}>
                                            <thead className={`sticky top-0 bg-zinc-800 z-10`}>
                                                <tr>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>S.No.</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Team Name</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Player 1</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Player 1 Contact</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Player 2</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Player 2 Contact</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Player 3</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Player 3 Contact</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Player 4</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Player 4 Contact</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Captain WhatsApp</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Captain Email</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Category</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Payment</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Submitted On</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    bounceResponses?.map((item, index) => (
                                                        <motion.tr key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * .03 }} className={`${index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"} hover:bg-zinc-800 duration-200`}>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-200 whitespace-nowrap`}>
                                                                {index + 1}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-200 whitespace-nowrap`}>
                                                                {item.teamName}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.players[0]?.name}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.players[0]?.contact}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.players[1]?.name}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.players[1]?.contact}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.players[2]?.name}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.players[2]?.contact}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.players[3]?.name}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.players[3]?.contact}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.captainWhatsapp}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.captainEmail}
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {item.type}
                                                            </td>

                                                            <td className={`px-4 py-4 text-center whitespace-nowrap`}>
                                                                <a href={item.paymentScreenshot} target="_blank" className={`px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 duration-200 text-white text-[10px] lg:text-xs font-medium`}>
                                                                    View
                                                                </a>
                                                            </td>

                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>
                                                                {
                                                                    new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                                        day: "2-digit",
                                                                        month: "short",
                                                                        year: "numeric"
                                                                   })
                                                                }
                                                            </td>
                                                        </motion.tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            )
                        }
                        {
                            selectedEvent === "Udbhav" && (

                                <motion.div key="udbhav" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} transition={{ duration: .3 }} className={`w-full h-[350px] rounded-2xl border border-zinc-800 bg-zinc-900 flex justify-center items-center text-zinc-400 text-lg`}>
                                    Udbhav responses will appear here.
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
}

export default page;