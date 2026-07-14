'use client'

import AdminNavbar from "@/components/AdminNavbar"
import axios from "axios"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaChevronDown } from "react-icons/fa"
import { toast } from "sonner"

interface Grievance {
    _id: string
    name: string
    referenceID: string
    message: string
    createdAt: string
    updatedAt: string
}

function page() {
    const [grievances, setGrievances] = useState<Grievance[]>([])
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

    useEffect(() => {
        const fetchGrievance = async () => {
            try {
                const res = await axios.get(`/api/grievance`)
                setGrievances(res.data.grievances || [])
            } catch (error) {
                toast.error("Failed to fetch grievances")
            }
        }

        fetchGrievance()
    }, [])

    const sortedGrievances = [...grievances].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    return (
        <>
            <div className={`w-full bg-zinc-950 flex flex-col justify-start items-center relative overflow-hidden`}>
                <AdminNavbar />

                <div className={`w-full min-h-screen mt-36 px-4 lg:px-10 py-8 flex flex-col justify-start items-center`}>
                    
                    <div className={`w-full`}>
                        <div className={`w-full mb-6 flex justify-between items-center`}>
                            <div className={`px-2`}>
                                <p className={`text-white text-2xl xl:text-4xl font-semibold`}>Grievances</p>
                                <p className={`text-zinc-400 text-lg xl:text-2xl font-semibold mt-1 flex gap-2`}>Total: <p className={`text-yellow-400`}>{grievances.length}</p></p>
                            </div>
                            <div className={`relative`}>
                                <button onClick={() => setSortDropdownOpen(!sortDropdownOpen)} className={`px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white flex justify-center items-center gap-2 text-sm font-medium hover:border-blue-500 duration-200`}>
                                    Sort: {sortOrder === "newest" ? "Newest" : "Oldest"}
                                    <motion.span animate={{ rotate: sortDropdownOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                                        <FaChevronDown size={12} />
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {sortDropdownOpen && (
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-40`}>
                                            <button onClick={() => {
                                                setSortOrder("newest")
                                                setSortDropdownOpen(false)
                                            }} className={`w-full px-4 py-3 text-left text-white hover:bg-zinc-800 duration-200 text-sm font-medium ${sortOrder === "newest" ? "bg-zinc-800" : ""}`}>
                                                Newest First
                                            </button>
                                            <button onClick={() => {
                                                setSortOrder("oldest")
                                                setSortDropdownOpen(false)
                                            }} className={`w-full px-4 py-3 text-left text-white hover:bg-zinc-800 duration-200 text-sm font-medium border-t border-zinc-800 ${sortOrder === "oldest" ? "bg-zinc-800" : ""}`}>
                                                Oldest First
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {sortedGrievances.length > 0 ? (
                            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`w-full rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden`}>
                                <div className={`w-full overflow-x-auto overflow-y-auto max-h-[75vh]`}>
                                    <table className={`min-w-[1000px] w-full border-collapse`}>
                                        <thead className={`sticky top-0 bg-zinc-800 z-10`}>
                                            <tr>
                                                <th className={`px-4 py-4 text-sm text-start font-bold text-white whitespace-nowrap`}>Sl No.</th>
                                                <th className={`px-4 py-4 text-sm text-start font-bold text-white whitespace-nowrap`}>Name</th>
                                                <th className={`px-4 py-4 text-sm text-start font-bold text-white whitespace-nowrap`}>ID</th>
                                                <th className={`px-4 py-4 text-sm text-start font-bold text-white whitespace-nowrap`}>Issue</th>
                                                <th className={`px-4 py-4 text-sm text-start font-bold text-white whitespace-nowrap`}>Submitted Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedGrievances.map((grievance, index) => (
                                                <motion.tr key={grievance._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }} className={`${index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"} hover:bg-zinc-800 duration-200`}>
                                                    <td className={`px-4 py-4 text-sm text-start text-zinc-200 whitespace-nowrap`}>{index + 1}</td>
                                                    <td className={`px-4 py-4 text-sm text-start text-zinc-200 whitespace-nowrap`}>{grievance.name || "N/A"}</td>
                                                    <td className={`px-4 py-4 text-sm text-start text-blue-400 whitespace-nowrap font-mono`}>{grievance.referenceID}</td>
                                                    <td className={`px-4 py-4 text-sm text-zinc-300 whitespace-normal max-w-xs`}>{grievance.message}</td>
                                                    <td className={`px-4 py-4 text-sm text-start text-zinc-300 whitespace-nowrap`}>{new Date(grievance.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`w-full py-16 text-center`}>
                                <p className={`text-zinc-400 text-lg`}>No grievances found</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
