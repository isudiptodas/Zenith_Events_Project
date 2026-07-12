'use client'

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { IoIosCloudUpload } from "react-icons/io";

function Bounce() {

  const initialFormData = {
    teamName: "",

    player1Name: "",
    player1Contact: "",

    player2Name: "",
    player2Contact: "",

    player3Name: "",
    player3Contact: "",

    player4Name: "",
    player4Contact: "",

    captainWhatsapp: "",
    captainEmail: "",

    confirmDetails: false,
    agreeRules: false,
    agreeCancellation: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const preview = file ? URL.createObjectURL(file) : null;

  const requiredFields = [
    formData.teamName,
    formData.player1Name,
    formData.player1Contact,
    formData.player2Name,
    formData.player2Contact,
    formData.player3Name,
    formData.player3Contact,
    formData.player4Name,
    formData.player4Contact,
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const MAX_SIZE = 3 * 1024 * 1024; // 3MB
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      e.target.value = "";
      toast.error("Only images are allowed");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      e.target.value = "";
      toast.error("Screenshot must be under 3MB");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  const submitForm = async () => {
    if (submitting) return;

    if (!formData.agreeCancellation || !formData.agreeRules || !formData.confirmDetails) {
      toast.error("Please approve the declarations");
      return;
    }
    if (!file) {
      toast.error("Please upload payment screenshot");
      return;
    }
    if (!formData.captainEmail) {
      toast.error("Please add captain email");
      return;
    }
    if (!formData.captainWhatsapp) {
      toast.error("Please add captain whatsapp number");
      return;
    }

    if (requiredFields.some(field => field.trim() === "")) {
      toast.error("All fields are required");
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('data', JSON.stringify(formData));
    data.append('type', 'bounce');
    const id = toast.loading("Submitting...");

    try {
      setSubmitting(true);
      const res = await axios.post(`/api/events/register`, data);
      if(res.status === 200) {
        toast.success("Form submitted");
      }
    } catch (error: any) {
      setSubmitting(false);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
    finally{
      setSubmitting(false);
      setFormData(initialFormData);
      setFile(null);
      toast.dismiss(id);
    }
  }

  return (
    <>
      <div className={`w-full h-screen bg-linear-to-b from-yellow-400 via-orange-500 to-orange-700 flex justify-center items-center relative overflow-hidden px-3 py-5`}>
        <div data-lenis-prevent className={`w-full pt-5 pb-10 px-2 h-full bg-white overscroll-contain rounded-2xl flex flex-col justify-start items-center relative overflow-y-auto`}>

          <p className={`w-[80%] py-3 select-none lg:py-6 border-b border-b-orange-400 rounded-full shadow-2xl text-center font-semibold text-2xl lg:text-4xl mb-10`}>Bounce Registration</p>

          <div className={`w-full px-3 h-auto mt-10 xl:w-[50%] flex flex-col justify-start items-center`}>
            <p className={`w-full font-bold text-start select-none text-sm px-3`}>Team Name*</p>
            <input name="teamName" value={formData.teamName} onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter your team name" />

            <div className={`w-full mt-4 grid grid-cols-1 md:grid-cols-2 justify-items-center items-start gap-4`}>

              {/* player 1 */}
              <div className={`w-full flex flex-col justify-start items-center rounded-2xl border-2 border-orange-400 mt-5 px-4 py-5`}>
                <p className={`w-full font-bold text-start select-none text-sm`}>(Captain) Player 1 - Name*</p>
                <input name="player1Name"
                  value={formData.player1Name}
                  onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter captain name" />

                <p className={`w-full font-bold text-start select-none text-sm px-3 mt-5`}>Player 1 - Contact*</p>
                <input name="player1Contact"
                  value={formData.player1Contact}
                  onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter captain contact" />
              </div>

              {/* player 2 */}
              <div className={`w-full flex flex-col justify-start items-center rounded-2xl border-2 border-orange-400 mt-5 px-4 py-5`}>
                <p className={`w-full font-bold text-start select-none text-sm px-3`}>Player 2 - Name*</p>
                <input name="player2Name"
                  value={formData.player2Name}
                  onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter player 2 name" />


                <p className={`w-full font-bold text-start select-none text-sm px-3 mt-5`}>Player 2 - Contact*</p>
                <input name="player2Contact"
                  value={formData.player2Contact}
                  onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter player 2 contact" />
              </div>

              {/* player 3 */}
              <div className={`w-full flex flex-col justify-start items-center rounded-2xl border-2 border-orange-400 mt-5 px-4 py-5`}>
                <p className={`w-full font-bold text-start select-none text-sm px-3`}>Player 3 - Name*</p>
                <input name="player3Name"
                  value={formData.player3Name}
                  onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter player 3 name" />


                <p className={`w-full font-bold text-start select-none text-sm px-3 mt-5`}>Player 3 - Contact*</p>
                <input name="player3Contact"
                  value={formData.player3Contact}
                  onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter player 3 contact" />

              </div>

              {/* player 4 */}
              <div className={`w-full flex flex-col justify-start items-center rounded-2xl border-2 border-orange-400 mt-5 px-4 py-5`}>
                <p className={`w-full font-bold text-start select-none text-sm px-3`}>Player 4 - Name*</p>
                <input name="player4Name"
                  value={formData.player4Name}
                  onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter player 4 name" />


                <p className={`w-full font-bold text-start select-none text-sm px-3 mt-5`}>Player 4 - Contact*</p>
                <input name="player4Contact"
                  value={formData.player4Contact}
                  onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter player 4 contact" />

              </div>
            </div>

            <p className={`w-full font-bold text-start select-none text-sm px-3 mt-5`}>Captain Whatsapp Number*</p>
            <input name="captainWhatsapp"
              value={formData.captainWhatsapp}
              onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter captains whatsapp number" />

            <p className={`w-full font-bold text-start select-none text-sm px-3 mt-5`}>Captain Email ID*</p>
            <input name="captainEmail"
              value={formData.captainEmail}
              onChange={handleChange} type="text" className={`w-full bg-gray-200 mt-2 rounded-full py-3 px-4 focus:outline-orange-500 duration-300 ease-in-out`} placeholder="Enter captains email id" />

            <p className={`w-full font-bold text-start select-none text-sm px-3 mt-5`}>Upload payment screenshot*</p>
            <div className={`w-full group flex flex-col justify-center items-center px-3 py-4`}>
              <div className={`w-full relative overflow-hidden flex flex-col justify-center items-center rounded-2xl border-2 border-dashed py-8 ${file === null ? "block" : "hidden"}`}>
                <p className={`text-3xl group-hover:scale-125 duration-300 ease-in-out text-gray-400 `}><IoIosCloudUpload /></p>
                <p className={`w-full select-none text-[12px] xl:text-sm text-center italic opacity-70`}>Select from device</p>
                <input accept="image/*" onChange={handleFileChange} type="file" className={`absolute h-[200px] top-1/3 inset-0 text-5xl opacity-0`} />
              </div>

              <div className={`w-full mt-5 flex justify-center items-center overflow-hidden rounded-2xl`}>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full rounded-lg object-cover"
                  />
                )}
              </div>
              <div className={`w-full ${file === null ? "hidden" : "block"} mt-5 flex flex-col justify-center items-center`}>
                <p className={`w-full text-center text-[12px] lg:text-sm select-none`}>{file && file?.name}</p>
                <p onClick={removeFile} className={`w-full bg-red-600 text-white select-none mt-3 active:opacity-70 duration-200 ease-in-out rounded-full text-center py-2`}>Remove image</p>
              </div>

            </div>

            <div className={`w-full px-3 mt-5 flex justify-start items-center gap-2`}>
              <input name="confirmDetails"
                checked={formData.confirmDetails}
                onChange={handleChange} type="checkbox" className={`w-5 h-5`} />
              <p className={`w-full text-start text-[12px] xl:text-lg select-none`}>I confirm all details provided are correct.</p>
            </div>
            <div className={`w-full px-3 mt-1 flex justify-start items-center gap-2`}>
              <input name="agreeRules"
                checked={formData.agreeRules}
                onChange={handleChange} type="checkbox" className={`w-5 h-5`} />
              <p className={`w-full text-start text-[12px] xl:text-lg select-none`}>I agree to follow all tournament rules.</p>
            </div>
            <div className={`w-full px-3 mt-1 flex justify-start items-center gap-2`}>
              <input name="agreeCancellation"
                checked={formData.agreeCancellation}
                onChange={handleChange} type="checkbox" className={`w-5 h-5`} />
              <p className={`w-full text-start text-[12px] xl:text-lg select-none`}>Please note that cancellation charges may apply.</p>
            </div>

            <span onClick={submitForm} className={`w-full py-3 rounded-full active:opacity-85 duration-150 ease-in-out text-center mt-5 bg-linear-to-b from-orange-300 to-orange-600 text-white font-semibold text-sm select-none`}>Submit Form</span>
          </div>
        </div>
      </div> 
    </>
  )
}

export default Bounce
