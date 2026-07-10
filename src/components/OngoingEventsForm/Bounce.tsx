'use client'

import { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

            <span className={`w-full py-3 rounded-full active:opacity-85 duration-150 ease-in-out text-center mt-5 bg-linear-to-b from-orange-300 to-orange-600 text-white font-semibold text-sm select-none`}>Submit Form</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bounce
