'use client'

import AdminNavbar from "@/components/AdminNavbar";
import { useEffect, useMemo, useState } from "react";
import { BounceForm } from "@/types/bounceResponse";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { FiEdit, FiDownload, FiTrash2 } from "react-icons/fi";
import { UdbhavForm } from '@/types/udbhavResponse';
import { udbhavEvents } from "@/data/OngoingEvents/udbhav";
import { utils, writeFile } from 'xlsx';
import { toast } from "sonner";

function page() {

    const [bounceResponses, setBounceResponses] = useState<BounceForm[] | null>(null);
    const [udbhavResponses, setUdbhavResponses] = useState<UdbhavForm[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const selectedCategoryData = udbhavEvents.find(item => item.category === selectedCategory);
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("Bounce");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [openUdbhavDropdown, setOpenUdbhavDropdown] = useState<"category" | "subcategory" | null>(null);
    const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingType, setEditingType] = useState<"bounce" | "udbhav" | null>(null);
    const [updating, setUpdating] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{type: "bounce" | "udbhav", id: string} | null>(null);
    const [deleting, setDeleting] = useState(false);

    const filteredUdbhavResponses = udbhavResponses?.filter(item => {
        if (!selectedCategory || !selectedSubCategory) return false;
        return item.category === selectedCategory && item.subCategory === selectedSubCategory && (searchQuery === "" || item.registrationId?.includes(searchQuery));
    });

    const filteredBounceResponses = bounceResponses?.filter(item => searchQuery === "" || item.registrationId?.includes(searchQuery));

    const events = useMemo(() => ["Bounce", "Udbhav"], []);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await axios.get(`/api/events/view`, {
                    withCredentials: true
                });

                setBounceResponses(res.data.bounce);
                setUdbhavResponses(res.data.udbhav);
                console.log(res.data.udbhav);
            } catch (error: any) {
                //console.log(error);
            }
        }

        fetchResponses();
    }, []);

    const totalResponses = selectedEvent === "Bounce" ? (filteredBounceResponses?.length || 0) : (filteredUdbhavResponses?.length || 0);

    const handleExport = (format: 'excel' | 'csv') => {
        try {
            const dataToExport = selectedEvent === "Bounce" ? (filteredBounceResponses || []) : (filteredUdbhavResponses || []);
            if (dataToExport.length === 0) {
                alert("No data to export");
                return;
            }
            const ws = utils.json_to_sheet(dataToExport);
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, selectedEvent);
            const fileName = `${selectedEvent}-registrations-${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : 'csv'}`;
            writeFile(wb, fileName);
            setExportDropdownOpen(false);
        } catch (error) {
            console.log(error);
            alert("Error exporting data");
        }
    };

    const handleEditClick = (item: any, type: 'bounce' | 'udbhav') => {
        setEditingType(type);
        setEditingId(item._id);
        if (type === 'bounce') {
            setEditData({
                teamName: item.teamName,
                player1Name: item.players[0]?.name,
                player1Contact: item.players[0]?.contact,
                player2Name: item.players[1]?.name,
                player2Contact: item.players[1]?.contact,
                player3Name: item.players[2]?.name,
                player3Contact: item.players[2]?.contact,
                player4Name: item.players[3]?.name,
                player4Contact: item.players[3]?.contact,
                captainWhatsapp: item.captainWhatsapp,
                captainEmail: item.captainEmail,
            });
        } else {
            setEditData({
                participants: item.participants,
                school: item.school,
                contact: item.contact,
                email: item.email,
                class: item.class,
                age: item.age,
                choreographer: item.choreographer,
            });
        }
        setShowEditModal(true);
    };

    const handleEditChange = (field: string, value: any) => {
        setEditData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSaveEdit = async () => {
        if(updating) return;
        const id = toast.loading("Updating...");
        try {
            setUpdating(true);
            const res = await axios.patch('/api/events/update', {
                type: editingType,
                id: editingId,
                data: editData
            });
            if (res.status === 200) {
                setShowEditModal(false);
                const refreshRes = await axios.get(`/api/events/view`, { withCredentials: true });
                setBounceResponses(refreshRes.data.bounce);
                setUdbhavResponses(refreshRes.data.udbhav);
                toast.success("Row updated");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Error updating registration');
        }
        finally{
            setUpdating(false);
            toast.dismiss(id);
        }
    };

    const handleDeleteClick = (item: any, type: "bounce" | "udbhav") => {
        setDeleteTarget({ type, id: item._id });
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if(deleting || !deleteTarget) return;
        const id = toast.loading("Deleting row...");
        try {
            setDeleting(true);
            const res = await axios.delete('/api/events/delete', {
                data: {
                    type: deleteTarget.type,
                    id: deleteTarget.id
                }
            });
            if (res.status === 200) {
                setShowDeleteModal(false);
                setDeleteTarget(null);
                const refreshRes = await axios.get(`/api/events/view`, { withCredentials: true });
                setBounceResponses(refreshRes.data.bounce);
                setUdbhavResponses(refreshRes.data.udbhav);
                toast.success("Row deleted");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Error deleting registration');
        }
        finally{
            setDeleting(false);
            toast.dismiss(id);
        }
    };

    return (
        <>
            <div className={`w-full min-h-screen bg-zinc-950 flex flex-col items-center relative overflow-hidden`}>
                <AdminNavbar />

                <div className={`w-full mt-28 px-4 lg:px-10 py-8 flex flex-col gap-0`}>

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

                    {selectedEvent === "Udbhav" &&
                        <div className={`flex flex-col lg:flex-row gap-4 mt-1`}>

                            <div className={`w-full lg:w-72 relative`}>

                                <p className={`text-sm mb-2 font-medium`}>Category</p>

                                <div onClick={() => setOpenUdbhavDropdown(openUdbhavDropdown === "category" ? null : "category")} className={`w-full h-11 bg-zinc-900 border border-zinc-700 rounded-xl px-4 flex justify-between items-center cursor-pointer`}>
                                    <p className={`text-white font-semibold`}>{selectedCategory || "Select Category"}</p>
                                    <FaChevronDown className={`${openUdbhavDropdown === "category" ? "rotate-180" : ""} text-white font-semibold duration-200`} />
                                </div>

                                <AnimatePresence>
                                    {openUdbhavDropdown === "category" &&
                                        <motion.div data-lenis-prevent initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className={`absolute top-24 left-0 w-full bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden z-30`}>
                                            <div className={`max-h-56 overflow-y-auto`}>
                                                {udbhavEvents.map(item =>
                                                    <div key={item.category} onClick={() => {
                                                        setSelectedCategory(item.category);
                                                        setSelectedSubCategory("");
                                                        setOpenUdbhavDropdown(null);
                                                    }} className={`px-4 py-3 hover:bg-zinc-800 cursor-pointer duration-200 text-white`}>
                                                        {item.category}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>

                            <div className={`w-full lg:w-80 relative`}>

                                <p className={`text-sm mb-2 font-medium`}>Sub Category</p>

                                <div onClick={() => {
                                    if (!selectedCategory) return;
                                    setOpenUdbhavDropdown(openUdbhavDropdown === "subcategory" ? null : "subcategory");
                                }} className={`w-full h-11 bg-zinc-900 border border-zinc-700 rounded-xl px-4 flex justify-between items-center cursor-pointer ${!selectedCategory && "opacity-50 cursor-not-allowed"}`}>
                                    <p className={`text-white font-semibold`}>{selectedSubCategory || "Select Sub Category"}</p>
                                    <FaChevronDown className={`${openUdbhavDropdown === "subcategory" ? "rotate-180" : ""} text-white font-semibold duration-200`} />
                                </div>

                                <AnimatePresence>
                                    {openUdbhavDropdown === "subcategory" &&
                                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className={`absolute top-24 left-0 w-full bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden z-30`}>
                                            <div data-lenis-prevent className={`max-h-56 overflow-y-auto overscroll-contain`}>
                                                {selectedCategoryData?.subCategories.map(item =>
                                                    <div key={item.name} onClick={() => {
                                                        setSelectedSubCategory(item.name);
                                                        setOpenUdbhavDropdown(null);
                                                    }} className={`px-4 py-3 hover:bg-zinc-800 cursor-pointer duration-200 text-white`}>
                                                        {item.name}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    }
                                </AnimatePresence>

                            </div>
                        </div>
                    }

                    <div className={`w-full my-5 flex justify-between items-start`}>
                        <div className={`flex`}>
                            <p className={`w-auto text-start font-semibold text-white text-2xl`}>Total Responses : </p>
                            <p className={`w-auto text-start font-semibold text-yellow-500 px-3 text-2xl`}>{totalResponses}</p>
                        </div>
                        <div className={`relative`}>
                            <button onClick={() => setExportDropdownOpen(!exportDropdownOpen)} className={`px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 duration-200 text-white flex justify-center items-center gap-2 text-sm font-medium`}>
                                <FiDownload /> Export
                            </button>
                            <AnimatePresence>
                                {exportDropdownOpen && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-40`}>
                                        <button onClick={() => handleExport('excel')} className={`w-full px-4 py-3 text-left text-white hover:bg-zinc-800 duration-200 text-sm font-medium`}>Export as Excel</button>
                                        <button onClick={() => handleExport('csv')} className={`w-full px-4 py-3 text-left text-white hover:bg-zinc-800 duration-200 text-sm font-medium border-t border-zinc-800`}>Export as CSV</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className={`w-full mb-5 flex flex-col gap-2`}>
                        <p className={`text-sm font-medium text-white`}>Search by Registration ID</p>
                        <input type="text" placeholder="Enter Registration ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                    </div>

                    {/* Table */}

                    <AnimatePresence mode="wait">
                        {
                            selectedEvent === "Bounce" && (
                                <motion.div key="bounce" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} transition={{ duration: .3 }} className={`w-full rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden`}>
                                    <div className={`w-full overflow-x-auto overflow-y-auto max-h-[75vh]`}>
                                        <table className={`min-w-[1800px] w-full border-collapse`}>
                                            <thead className={`sticky top-0 bg-zinc-800 z-10`}>
                                                <tr>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>S.No.</th>
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Reg. ID</th>
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
                                                    <th className={`px-4 py-4 text-[11px] lg:text-sm text-center font-bold text-white whitespace-nowrap`}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    filteredBounceResponses?.map((item, index) => (
                                                        <motion.tr key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * .03 }} className={`${index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"} hover:bg-zinc-800 duration-200`}>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-200 whitespace-nowrap`}>{index + 1}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-blue-400 whitespace-nowrap font-mono`}>{item.registrationId?.substring(0, 8)}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-200 whitespace-nowrap`}>{item.teamName}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.players[0]?.name}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.players[0]?.contact}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.players[1]?.name}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.players[1]?.contact}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.players[2]?.name}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.players[2]?.contact}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.players[3]?.name}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.players[3]?.contact}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.captainWhatsapp}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.captainEmail}</td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{item.type}</td>
                                                            <td className={`px-4 py-4 text-center whitespace-nowrap`}><a href={item.paymentScreenshot} target="_blank" className={`px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 duration-200 text-white text-[10px] lg:text-xs font-medium`}>View</a></td>
                                                            <td className={`px-4 py-4 text-[11px] lg:text-sm text-center text-zinc-300 whitespace-nowrap`}>{new Date(item.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                                                            <td className={`px-4 py-4 text-center whitespace-nowrap`}>
                                                                <div className={`flex justify-center gap-2`}>
                                                                    <button onClick={() => handleEditClick(item, 'bounce')} className={`p-2 rounded-lg bg-green-600 hover:bg-green-700 duration-200 text-white`}><FiEdit size={16} /></button>
                                                                    <button onClick={() => handleDeleteClick(item, 'bounce')} className={`p-2 rounded-lg bg-red-600 hover:bg-red-700 duration-200 text-white`}><FiTrash2 size={16} /></button>
                                                                </div>
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
                        {selectedEvent === "Udbhav" && selectedCategory && selectedSubCategory &&
                            <div className={`w-full mt-8 overflow-x-auto rounded-2xl border border-zinc-800`}>

                                <table className={`w-full min-w-[375px] text-xs lg:text-sm border-collapse`}>

                                    <thead className={`sticky top-0 bg-zinc-900 text-white z-20`}>
                                        <tr>
                                            <th className={`px-4 py-4 text-center`}>S.No.</th>
                                            <th className={`px-4 py-4 text-center`}>Reg. ID</th>
                                            <th className={`px-4 py-4 text-center`}>Participants</th>
                                            <th className={`px-4 py-4 text-center`}>School</th>
                                            <th className={`px-4 py-4 text-center`}>Class</th>
                                            <th className={`px-4 py-4 text-center`}>Age</th>
                                            <th className={`px-4 py-4 text-center`}>Contact</th>
                                            <th className={`px-4 py-4 text-center`}>Email</th>
                                            <th className={`px-4 py-4 text-center`}>Choreographer</th>
                                            <th className={`px-4 py-4 text-center`}>Payment</th>
                                            <th className={`px-4 py-4 text-center`}>Submitted</th>
                                            <th className={`px-4 py-4 text-center`}>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <AnimatePresence>
                                            {filteredUdbhavResponses?.length ?
                                                filteredUdbhavResponses.map((item, index) =>
                                                    <motion.tr key={item._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: index * 0.03 }} className={`${index % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900"} hover:bg-zinc-800 duration-200 border-b text-white border-zinc-800`}>
                                                        <td className={`px-4 py-4 text-center`}>{index + 1}</td>
                                                        <td className={`px-4 py-4 text-center text-blue-400 font-mono`}>{item.registrationId?.substring(0, 8)}</td>
                                                        <td className={`px-4 py-4`}>{item.participants?.length ? item.participants.map((participant, i) => <p key={i}>{participant}</p>) : "--"}</td>
                                                        <td className={`px-4 py-4 text-center`}>{item.school || "--"}</td>
                                                        <td className={`px-4 py-4 text-center`}>{item.class || "--"}</td>
                                                        <td className={`px-4 py-4 text-center`}>{item.age || "--"}</td>
                                                        <td className={`px-4 py-4 text-center`}>{item.contact || "--"}</td>
                                                        <td className={`px-4 py-4 text-center`}>{item.email || "--"}</td>
                                                        <td className={`px-4 py-4 text-center`}>{item.choreographer || "--"}</td>
                                                        <td className={`px-4 py-4 text-center`}><a href={item.paymentScreenshot} target="_blank" className={`text-blue-400 hover:underline`}>View</a></td>
                                                        <td className={`px-4 py-4 text-center`}>{new Date(item.createdAt).toLocaleDateString()}</td>
                                                        <td className={`px-4 py-4 text-center`}>
                                                            <div className={`flex justify-center gap-2`}>
                                                                <button onClick={() => handleEditClick(item, 'udbhav')} className={`p-2 rounded-lg bg-green-600 hover:bg-green-700 duration-200 text-white`}><FiEdit size={16} /></button>
                                                                <button onClick={() => handleDeleteClick(item, 'udbhav')} className={`p-2 rounded-lg bg-red-600 hover:bg-red-700 duration-200 text-white`}><FiTrash2 size={16} /></button>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ) :
                                                <tr>
                                                    <td colSpan={12} className={`py-10 text-center text-zinc-400`}>
                                                        No registrations found.
                                                    </td>
                                                </tr>
                                            }
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        }
                    </AnimatePresence>

                    <AnimatePresence>
                        {showEditModal && (
                            <motion.div data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4`} onClick={() => setShowEditModal(false)}>
                                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()} className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto data-lenis-prevent overscroll-contain`}>
                                    <p className={`text-xl lg:text-2xl font-bold text-white mb-6`}>Edit Registration</p>
                                    {editingType === 'bounce' && editData && (
                                        <div className={`flex flex-col gap-4`}>
                                            <div>
                                                <label className={`block text-sm font-medium text-white mb-2`}>Team Name</label>
                                                <input type="text" value={editData.teamName} onChange={(e) => handleEditChange('teamName', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                            </div>
                                            <div className={`grid grid-cols-2 gap-4`}>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Player 1 Name</label>
                                                    <input type="text" value={editData.player1Name} onChange={(e) => handleEditChange('player1Name', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Player 1 Contact</label>
                                                    <input type="text" value={editData.player1Contact} onChange={(e) => handleEditChange('player1Contact', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                            </div>
                                            <div className={`grid grid-cols-2 gap-4`}>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Player 2 Name</label>
                                                    <input type="text" value={editData.player2Name} onChange={(e) => handleEditChange('player2Name', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Player 2 Contact</label>
                                                    <input type="text" value={editData.player2Contact} onChange={(e) => handleEditChange('player2Contact', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                            </div>
                                            <div className={`grid grid-cols-2 gap-4`}>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Player 3 Name</label>
                                                    <input type="text" value={editData.player3Name} onChange={(e) => handleEditChange('player3Name', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Player 3 Contact</label>
                                                    <input type="text" value={editData.player3Contact} onChange={(e) => handleEditChange('player3Contact', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                            </div>
                                            <div className={`grid grid-cols-2 gap-4`}>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Player 4 Name</label>
                                                    <input type="text" value={editData.player4Name} onChange={(e) => handleEditChange('player4Name', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Player 4 Contact</label>
                                                    <input type="text" value={editData.player4Contact} onChange={(e) => handleEditChange('player4Contact', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                            </div>
                                            <div className={`grid grid-cols-2 gap-4`}>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Captain WhatsApp</label>
                                                    <input type="text" value={editData.captainWhatsapp} onChange={(e) => handleEditChange('captainWhatsapp', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Captain Email</label>
                                                    <input type="email" value={editData.captainEmail} onChange={(e) => handleEditChange('captainEmail', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {editingType === 'udbhav' && editData && (
                                        <div className={`flex flex-col gap-4`}>
                                            <div>
                                                <label className={`block text-sm font-medium text-white mb-2`}>Participants</label>
                                                {editData.participants?.map((p: string, i: number) => (
                                                    <input key={i} type="text" value={p} onChange={(e) => {
                                                        const updated = [...editData.participants];
                                                        updated[i] = e.target.value;
                                                        handleEditChange('participants', updated);
                                                    }} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200 mb-2`} placeholder={`Participant ${i + 1}`} />
                                                ))}
                                            </div>
                                            <div className={`grid grid-cols-2 gap-4`}>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>School</label>
                                                    <input type="text" value={editData.school} onChange={(e) => handleEditChange('school', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Class</label>
                                                    <input type="text" value={editData.class} onChange={(e) => handleEditChange('class', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                            </div>
                                            <div className={`grid grid-cols-2 gap-4`}>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Age</label>
                                                    <input type="text" value={editData.age} onChange={(e) => handleEditChange('age', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                                <div>
                                                    <label className={`block text-sm font-medium text-white mb-2`}>Contact</label>
                                                    <input type="text" value={editData.contact} onChange={(e) => handleEditChange('contact', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-medium text-white mb-2`}>Email</label>
                                                <input type="email" value={editData.email} onChange={(e) => handleEditChange('email', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-medium text-white mb-2`}>Choreographer</label>
                                                <input type="text" value={editData.choreographer} onChange={(e) => handleEditChange('choreographer', e.target.value)} className={`w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-blue-500 duration-200`} />
                                            </div>
                                        </div>
                                    )}
                                    <div className={`flex gap-3 mt-6`}>
                                        <button onClick={handleSaveEdit} className={`flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 duration-200 text-white font-medium`}>Save Changes</button>
                                        <button onClick={() => setShowEditModal(false)} className={`flex-1 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 duration-200 text-white font-medium`}>Cancel</button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showDeleteModal && deleteTarget && (
                            <motion.div data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4`} onClick={() => setShowDeleteModal(false)}>
                                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()} className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full md:w-auto md:px-5 flex flex-col justify-center items-center`}>
                                    <p className={`w-full text-sm xl:text-lg font-semibold text-white text-center`}>Are you sure you want to delete this row?</p>
                                    <p className={`w-full text-[12px] xl:text-sm text-white text-center opacity-75`}>This action cannot be reversed</p>
                                    <div className={`flex gap-3 mt-6`}>
                                        <button disabled={deleting} onClick={handleDeleteConfirm} className={`flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-60 duration-200 text-white font-medium`}>Delete</button>
                                        <button onClick={() => {setShowDeleteModal(false); setDeleteTarget(null);}} className={`flex-1 px-4 py-2 rounded-lg bg-white text-black font-medium`}>No</button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
}

export default page;

