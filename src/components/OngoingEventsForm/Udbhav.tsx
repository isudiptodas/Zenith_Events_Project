'use client'

import { udbhavEvents } from "@/data/OngoingEvents/udbhav";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import { udbhavForm } from '@/types/udbhavForm'
import { toast } from "sonner";
import axios from "axios";

const initialFormData: udbhavForm = {
    category: "",
    subCategory: "",
    participants: [],
    school: "",
    contact: "",
    email: "",
    class: "",
    age: "",
    choreographer: "",
    paymentScreenshot: null,
    confirmDetails: false,
    agreeRules: false,
    agreeCancellation: false
};

function Udbhav() {

    const [formData, setFormData] = useState(initialFormData);
    const [openDropdown, setOpenDropdown] = useState<"category" | "subcategory" | null>(null);
    const selectedCategory = udbhavEvents.find(item => item.category === formData.category);
    const selectedSubCategory = selectedCategory?.subCategories.find(item => item.name === formData.subCategory);
    const [preview, setPreview] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);

    const handleSelection = (type: "category" | "subcategory", value: string) => {

        if (type === "category") {
            setFormData({
                ...initialFormData,
                category: value
            });
            setOpenDropdown(null);
            return;
        }

        const event = selectedCategory?.subCategories.find(item => item.name === value);

        setFormData(prev => ({
            ...prev,
            subCategory: value,
            participants: Array(event?.participants || 1).fill("")
        }));

        setOpenDropdown(null);
    }

    const handlePaymentScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Payment screenshot must be under 5 MB.");
            return;
        }

        setFormData(prev => ({
            ...prev,
            paymentScreenshot: file
        }));

        setPreview(URL.createObjectURL(file));

    }

    const removePaymentScreenshot = () => {

        setFormData(prev => ({
            ...prev,
            paymentScreenshot: null
        }));

        setPreview("");

    }

    const submitForm = async () => {

        if(submitting) return;

        if (!formData.category) return toast.error("Please select category.");
        if (!formData.subCategory) return toast.error("Please select sub category.");

        for (let i = 0; i < formData.participants.length; i++) {
            if (!formData.participants[i].trim()) {
                return toast.error(`Participant ${i + 1} name is required.`);
            }
        }

        if (selectedSubCategory?.choreographer && !formData.choreographer.trim()) return toast.error("Please enter choreographer name.");

        if (!formData.school.trim()) return toast.error("Please enter school / institution.");
        if (!formData.class.trim()) return toast.error("Please enter class.");
        if (!formData.age.trim()) return toast.error("Please enter age.");
        if (!formData.contact.trim()) return toast.error("Please enter contact number.");
        if (!formData.email.trim()) return toast.error("Please enter email address.");
        if (!formData.paymentScreenshot) return toast.error("Please upload payment screenshot.");

        const id = toast.loading("Submitting form...");
        try {
            setSubmitting(true);
            const uploadData = new FormData();

            uploadData.append("file", formData.paymentScreenshot);

            uploadData.append("data", JSON.stringify({
                category: formData.category,
                subCategory: formData.subCategory,
                participants: formData.participants,
                school: formData.school,
                contact: formData.contact,
                email: formData.email,
                class: formData.class,
                age: formData.age,
                choreographer: formData.choreographer
            }));

            const res = await axios.post("/api/events/register", {
                formData, type: "udbhav"
            });

            console.log(res.data);
            if(res.status === 200){
                toast.success("Form Submitted");
            }

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong.");
        }
        finally{
            toast.dismiss(id);
            setSubmitting(false);
            setFormData(initialFormData);
        }
    }


    return (
        <>
            <div className={`w-full h-screen bg-linear-to-b from-yellow-400 via-orange-500 to-blue-500 flex justify-center items-center relative overflow-hidden px-3 py-5`}>
                <div data-lenis-prevent className={`w-full pt-5 pb-10 px-2 h-full bg-white overscroll-contain rounded-2xl flex flex-col justify-start items-center relative overflow-y-auto`}>

                    <p className={`w-[80%] py-3 select-none lg:py-6 border-b border-b-orange-400 rounded-full shadow-2xl text-center font-semibold text-2xl lg:text-4xl mb-10`}>Udbhav Registration</p>

                    <div className={`w-full md:w-[55%] xl:w-[30%] mt-5 px-3`}>

                        <p className={`font-bold text-sm px-3`}>Category*</p>

                        <div onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")} className={`w-full h-12 mt-2 bg-gray-200 rounded-xl px-4 flex justify-between items-center cursor-pointer border border-transparent hover:border-orange-400 duration-200`}>
                            <div className={`flex items-center gap-3`}>
                                <p className={`${formData.category ? "text-black" : "text-gray-500"} select-none`}>{formData.category || "Select Category"}</p>
                            </div>
                            <FaChevronDown className={`${openDropdown === "category" ? "rotate-180" : ""} duration-200`} />
                        </div>

                        <AnimatePresence>
                            {openDropdown === "category" &&
                                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className={`w-[90%] md:w-[55%] xl:w-[30%] mt-2 bg-white rounded-xl border shadow-lg overflow-hidden absolute left-1/2 -translate-x-1/2 z-30`}>
                                    <div className={`max-h-56 overflow-y-auto`}>
                                        {udbhavEvents.map(item =>
                                            <div key={item.category} onClick={() => handleSelection("category", item.category)} className={`px-4 py-3 hover:bg-orange-100 cursor-pointer duration-150`}>
                                                {item.category}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>

                    {formData.category &&
                        <div className={`w-full md:w-[55%] xl:w-[30%] flex flex-col justify-center items-start mt-5 px-3`}>

                            <p className={`font-bold text-sm px-3`}>Sub Category*</p>

                            <div onClick={() => setOpenDropdown(openDropdown === "subcategory" ? null : "subcategory")} className={`w-full h-12 mt-2 bg-gray-200 rounded-xl px-4 flex justify-between items-center cursor-pointer border border-transparent hover:border-orange-400 duration-200`}>
                                <div className={`flex items-center gap-3`}>
                                    <p className={`${formData.subCategory ? "text-black" : "text-gray-500"} select-none`}>{formData.subCategory || "Select Sub Category"}</p>
                                </div>
                                <FaChevronDown className={`${openDropdown === "subcategory" ? "rotate-180" : ""} duration-200`} />
                            </div>

                            <AnimatePresence>
                                {openDropdown === "subcategory" &&
                                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className={`w-[90%] md:w-[55%] xl:w-[30%] mt-2 bg-white rounded-xl border shadow-lg overflow-hidden absolute left-1/2 -translate-x-1/2 z-30`}>
                                        <div className={`max-h-56 overflow-y-auto`}>
                                            {selectedCategory?.subCategories.map(item =>
                                                <div key={item.name} onClick={() => handleSelection("subcategory", item.name)} className={`px-4 py-3 hover:bg-orange-100 cursor-pointer duration-150`}>
                                                    {item.name}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                }
                            </AnimatePresence>

                        </div>
                    }

                    {selectedSubCategory &&
                        <div className={`w-full xl:w-[55%] px-3 mt-8`}>

                            <div className={`w-full mt-3 grid grid-cols-1 md:grid-cols-2 gap-4`}>

                                {formData.participants.map((participant, index) =>
                                    <div key={index} className={`w-full flex flex-col justify-start items-center rounded-2xl px-3 py-5`}>

                                        <p className={`w-full font-bold text-start text-sm`}>Participant {index + 1} Name*</p>

                                        <input value={participant} onChange={(e) => {
                                            const updatedParticipants = [...formData.participants];
                                            updatedParticipants[index] = e.target.value;

                                            setFormData(prev => ({
                                                ...prev,
                                                participants: updatedParticipants
                                            }));
                                        }} type="text" placeholder={`Enter participant ${index + 1} name`} className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} />

                                    </div>
                                )}
                            </div>

                            {selectedSubCategory.choreographer &&
                                <>
                                    <p className={`w-full font-bold text-start text-sm mt-6 px-3`}>Choreographer Name*</p>
                                    <input value={formData.choreographer} onChange={(e) => setFormData(prev => ({ ...prev, choreographer: e.target.value }))} type="text" placeholder="Enter choreographer name" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} />
                                </>
                            }

                            <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-6`}>

                                <div>
                                    <p className={`w-full font-bold text-start text-sm px-3`}>School / Institution*</p>
                                    <input value={formData.school} onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))} type="text" placeholder="Enter school / institution" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} />
                                </div>

                                <div>
                                    <p className={`w-full font-bold text-start text-sm px-3`}>Class*</p>
                                    <input value={formData.class} onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))} type="text" placeholder="Enter class" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} />
                                </div>

                                <div>
                                    <p className={`w-full font-bold text-start text-sm px-3`}>Age*</p>
                                    <input value={formData.age} onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))} type="number" placeholder="Enter age" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} />
                                </div>

                                <div>
                                    <p className={`w-full font-bold text-start text-sm px-3`}>Contact Number*</p>
                                    <input value={formData.contact} onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))} type="text" placeholder="Enter contact number" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} />
                                </div>

                            </div>

                            <div className={`w-full mt-5`}>
                                <p className={`w-full font-bold text-start text-sm px-3`}>Email Address*</p>
                                <input value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} type="email" placeholder="Enter email address" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} />
                            </div>

                            <div className={`w-full mt-8 rounded-2xl border border-orange-300 bg-orange-50 p-5`}>

                                <p className={`text-xl font-bold text-orange-600`}>Registration Details</p>

                                <div className={`w-full flex justify-between items-center mt-5`}>
                                    <p className={`font-medium`}>Category</p>
                                    <p>{formData.category}</p>
                                </div>

                                <div className={`w-full flex justify-between items-center mt-3`}>
                                    <p className={`font-medium`}>Sub Category</p>
                                    <p>{formData.subCategory}</p>
                                </div>

                                <div className={`w-full flex justify-between items-center mt-3`}>
                                    <p className={`font-medium`}>Performance Duration</p>
                                    <p>{selectedSubCategory.duration}</p>
                                </div>

                                <div className={`w-full flex justify-between items-center mt-3`}>
                                    <p className={`font-medium`}>Registration Fee</p>
                                    <p className={`text-xl font-bold text-orange-600`}>₹ {selectedSubCategory.fee}</p>
                                </div>
                            </div>

                            <div className={`w-full mt-8`}>

                                <p className={`font-bold text-sm px-3`}>Payment Screenshot*</p>

                                {!preview ?

                                    <label className={`w-full h-52 mt-2 border-2 border-dashed border-gray-400 rounded-2xl cursor-pointer flex flex-col justify-center items-center bg-gray-200 duration-300`}>

                                        <p className={`font-semibold text-black`}>Click to Upload Screenshot</p>
                                        <p className={`text-sm text-gray-500 mt-2`}>Maximum File Size : 5 MB</p>

                                        <input type="file" accept="image/*" hidden onChange={handlePaymentScreenshot} />

                                    </label>

                                    :

                                    <div className={`w-full`}>
                                        <img src={preview} alt="Payment Screenshot" className={`w-full h-64 object-contain rounded-2xl border mt-2`} />

                                        <p onClick={removePaymentScreenshot} className={`w-fit mt-4 px-5 py-2 rounded-full bg-red-500 text-white cursor-pointer hover:bg-red-600 duration-300`}>
                                            Remove Image
                                        </p>

                                    </div>

                                }

                            </div>

                            <span onClick={submitForm} className={`w-full block mt-10 bg-linear-to-r from-yellow-300 via-orange-500 to-blue-500 active:opacity-75 duration-200 ease-in-out text-white text-center rounded-full py-3 font-semibold select-none`}>
                                Submit Registration
                            </span>
                        </div>
                    }

                </div>
            </div>

        </>
    )
}

export default Udbhav
