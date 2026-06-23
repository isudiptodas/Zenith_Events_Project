'use client'

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { statGrids } from "@/data/statGrids";
import { businessSolutions, organizationSolutions, startupSolutions } from '../data/solutionsGrid';
import { RiGeminiFill } from "react-icons/ri";
import { footerLinks } from '../data/footerLinks';
import { useRouter } from "next/navigation";

function page() {

  const router = useRouter();

  return (
    <>
      <div className={`w-full h-auto flex flex-col justify-start items-center overflow-hidden relative`}>

        {/* navbar */}
        <Navbar/>

        {/* hero section */}
        <section className={`w-full relative h-screen bg-zinc-950 flex flex-col justify-center items-center`}>

          {/* gradient strips */}
          <div className={`w-full absolute top-0 z-10 h-[90%] flex justify-between items-start`}>
            <div className={`w-full h-full bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <div className={`w-full h-[80%] bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <div className={`w-full h-[60%] bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <div className={`w-full h-[40%] bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <div className={`w-full h-[60%] bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <div className={`w-full h-[80%] bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
            <div className={`w-full h-full bg-linear-to-b from-blue-700 via-purple-500 to-zinc-950`} />
          </div>

          <h1 className={`w-full z-20 text-center md:text-start xl:px-10 md:px-6 font-bold text-white text-4xl lg:text-6xl xl:text-8xl font-lexend`}>Where Financial Expertise Meets Extraordinary Experience</h1>
          <p className={`w-full z-20 text-center md:text-start px-8 xl:px-10 md:px-6 font-imprima text-white text-[10px] md:text-[12px] lg:text-lg xl:text-xl mt-5`}>At Zenith Events & Financial Consultancy, we help businesses, organizations and individuals simplify complex financial decisions while delivering memorable events that leave lasting impressions.</p>
        </section>

        {/* stats section */}
        <section className={`w-full px-5 lg:px-10 py-8 h-auto grid grid-cols-2 lg:grid-cols-4 justify-items-center bg-zinc-950 gap-4`}>
            {statGrids.map((item, index) => {
              return <div key={index} className={`w-full rounded-lg bg-white/5 flex flex-col justify-center items-center px-5 py-5`}>
                <h2 className={`text-white font-prixima text-4xl xl:text-6xl font-bold select-none`}>{item.number}</h2>
                <p className={`text-white font-prixima text-[10px] xl:text-lg mt-2 font-normal select-none`}>{item.text}</p>
              </div>
            })}
        </section>
        
        {/* about section */}
        <section className={`w-full bg-zinc-950 h-auto flex flex-col justify-start items-center px-3 lg:px-8 py-10 md:pt-24`}>
            <h2 className={`w-full px-3 text-start text-3xl md:text-4xl lg:text-6xl font-bold font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none`}>About Us</h2>
            <p className={`w-full px-3 text-white mt-3 lg:mt-6 font-prixima font-light text-[10px] md:text-[12px] xl:text-lg`}>Zenith Events & Financial Consultancy was founded with a vision to provide integrated business solutions that go beyond conventional consulting. We understand that every client has unique goals and challenges, which is why our approach combines strategic planning, financial expertise and flawless event execution.
            <br/><br/>By focusing on innovation, transparency and long-term relationships, we strive to become a trusted partner that contributes to our clients’ growth and success.</p>
        </section>

        {/* solutions section */}
        <section className={`w-full relative bg-zinc-950 h-auto flex flex-col justify-start items-center px-3 lg:px-8 py-10 overflow-hidden`}>
            <h2 className={`w-full px-3 text-start text-3xl md:text-4xl lg:text-6xl font-bold font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none`}>Explore our Solutions</h2>

            {/* grids */}
            <div className={`w-full flex flex-col md:flex-row justify-between items-start gap-6 pt-8 md:px-3`}>
              
              {/* card 1 */}
              <div className={`w-full z-20 rounded-2xl border backdrop-blur-3xl bg-white/5 pb-6 border-gray-600 h-auto flex flex-col justify-start items-center px-2 py-2`}>
                  <p className={`w-full py-3 select-none rounded-xl font-semibold text-white mb-5 bg-linear-to-r from-[#1E32A9] to-[#E77B1E] text-center`}>Business</p>
                  {businessSolutions.map((item, index) => {
                    return <p key={index} className={`w-full pb-2 text-start flex justify-start items-center gap-2 text-white font-prixima text-[12px]`}><RiGeminiFill className="text-blue-700" /> {item}</p>
                  })}
              </div>

              {/* card 2 */}
              <div className={`w-full z-20 rounded-2xl border backdrop-blur-3xl bg-white/5 pb-6 border-gray-600 h-auto flex flex-col justify-start items-center px-2 py-2`}>
                  <p className={`w-full py-3 select-none rounded-xl font-semibold text-white mb-5 bg-linear-to-r from-[#1E32A9] to-[#E77B1E] text-center`}>Organizations</p>
                  {organizationSolutions.map((item, index) => {
                    return <p key={index} className={`w-full pb-2 text-start flex justify-start items-center gap-2 text-white font-prixima text-[12px]`}><RiGeminiFill className="text-blue-700" /> {item}</p>
                  })}
              </div>

              {/* card 3 */}
              <div className={`w-full z-20 rounded-2xl border backdrop-blur-3xl bg-white/5 pb-6 border-gray-600 h-auto flex flex-col justify-start items-center px-2 py-2`}>
                  <p className={`w-full py-3 select-none rounded-xl font-semibold text-white mb-5 bg-linear-to-r from-[#1E32A9] to-[#E77B1E] text-center`}>Startups</p>
                  {startupSolutions.map((item, index) => {
                    return <p key={index} className={`w-full pb-2 text-start flex justify-start items-center gap-2 text-white font-prixima text-[12px]`}><RiGeminiFill className="text-blue-700" /> {item}</p>
                  })}
              </div>
            </div>
        </section>

        {/* upcoming events section */}
        <section className={`w-full h-auto flex flex-col justify-start items-center bg-zinc-950 px-5 pt-10 pb-10`}>
            <h2 className={`w-full px-3 text-start text-3xl md:text-4xl lg:text-6xl font-bold font-lexend bg-linear-to-b from-yellow-300 to-yellow-800 bg-clip-text text-transparent select-none`}>Upcoming Events</h2>
        </section>
        
        {/* footer section */}
        <footer className={`w-full bg-zinc-950 h-auto flex flex-col justify-start items-center`}>
            <div className={`w-full h-auto pt-10 pb-8 flex flex-col justify-center items-center bg-linear-to-b from-[#1E4AC2] via-zinc-950 to-zinc-950`}>
                <h2 className={`w-full text-center text-white font-lexend text-3xl md:text-4xl lg:text-6xl font-semibold`}>For your any query</h2>
                <p className={`w-full mt-3 text-center text-white font-lexend text-[12px] lg:text-lg font-light`}>Let's Start A Conversation</p>

                <div className={`w-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 lg:px-10`}>
                    {/* links */}
                    <div className={`w-full mt-14 grid grid-cols-2 md:grid-cols-3 justify-items-start gap-4`}>
                        {footerLinks.map((item, index) => {
                          return <div key={index} className={`w-full h-auto flex flex-col justify-start items-center`}>
                            <p className={`font-semibold font-lexend text-lg text-white select-none`}>{item.name}</p>
                            <div className={`w-[70%] my-3 h-[2px] bg-linear-to-r from-transparent via-[#4c7cff] to-transparent`} />
                            {item.links.map((item, index) => {
                              return <span onClick={() => {item.link.startsWith('https') ? window.open(item.link, '_blank') : router.push(item.link)}} key={index} className={`text-[10px] lg:text-[12px] mb-2 text-white font-light `}>{item.name}</span>
                            })}
                          </div>
                        })}
                    </div>

                    {/* form */}
                    <div className={`w-[90%] z-20 md:w-[70%] lg:w-[90%] mt-8 px-3 py-3 h-auto flex flex-col justify-start items-center gap-4 rounded-2xl`}>
                        <input type="text" className={`w-full bg-zinc-800 py-3 px-4 rounded-full outline-none text-white font-prixima`} placeholder="Enter your name" />
                        <input type="email" className={`w-full bg-zinc-800 py-3 px-4 rounded-full outline-none text-white font-prixima`} placeholder="Enter your email" />
                        <input type="number" className={`w-full bg-zinc-800 py-3 px-4 rounded-full outline-none text-white font-prixima`} placeholder="Enter your contact" />
                        <textarea className={`w-full h-36 bg-zinc-800 py-3 px-4 rounded-3xl outline-none text-white font-prixima`} placeholder="Enter your contact" />
                        <p className={`w-full rounded-full text-black bg-white py-3 text-center cursor-pointer active:opacity-65 duration-300 ease-in-out`}>Submit</p>
                    </div>
                </div>
            </div>

            <h1 className={`w-full text-[120px] md:text-[250px] lg:text-[300px] xl:text-[350px] bg-linear-to-b from-[#1E4AC2] via-[#1e4ac265] to-zinc-950 bg-clip-text text-transparent text-center`}>ZENITH</h1>
            <p className={`w-full text-center text-white opacity-50 select-none text-[10px] xl:text-[12px] pb-10`}>© 2026 Zenith Events and Financial Consultancy. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

export default page
