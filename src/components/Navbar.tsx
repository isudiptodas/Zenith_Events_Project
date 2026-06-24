'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import { MdOutlineClose } from "react-icons/md";
import { motion } from 'motion/react';

function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const navbar = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Events',
            path: '/events'
        },
        {
            name: 'Services',
            path: '/services'
        },
        {
            name: 'About Us',
            path: '/about'
        },
        {
            name: 'Contact Us',
            path: '/contact'
        },
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 70) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav initial={{opacity: 0, filter: "blur(20px)"}} animate={{opacity: 1, filter: "blur(0px)"}} transition={{duration: 0.5, delay: 1.5, ease: "easeInOut"}} className={`w-full z-50 fixed top-0 ${scrolled ? "backdrop-blur-3xl bg-black/20" : "bg-transparent"} transition-all duration-300 h-auto py-4 pl-3 pr-8 flex justify-between items-center`}>
                <motion.img src="./assets/zefc_logo.svg" className={`h-10 xl:h-12`} />
                <span onClick={() => setIsMenuOpen(true)} className={`w-auto lg:hidden text-2xl text-white cursor-pointer`}><RiMenu3Fill /></span>

                <div className={`w-auto hidden lg:flex justify-between items-center gap-3`}>
                    {navbar.map((item, index) => {
                        return <Link href={item.path} key={index} className={`w-auto ${usePathname().toLowerCase() === item.path ? "border-b-2 border-white font-bold" : "font-light"} text-white rounded-full cursor-pointer px-6 py-2 text-[14px]`}>{item.name}</Link>
                    })}
                </div>
            </motion.nav>
            <div className={`h-screen w-full ${isMenuOpen ? "translate-y-0" : "-translate-y-full"} duration-500 ease-in-out rounded-b-3xl backdrop-blur-3xl bg-black/20 flex flex-col justify-center items-center z-50 fixed inset-0 top-0 right-0`}>
                <span onClick={() => setIsMenuOpen(false)} className={`w-auto absolute text-white text-3xl select-none cursor-pointer top-5 right-5`}><MdOutlineClose /></span>
                <div className={`w-full h-full pt-28 flex flex-col justify-start items-center`}>
                    {navbar.map((item, index) => {
                        return <Link href={item.path} onClick={() => setIsMenuOpen(false)} key={index} className={`w-[90%] ${usePathname().toLowerCase() === item.path ? "border-l-4 border-white font-bold" : "font-light"} text-white cursor-pointer px-6 py-2 mb-3 text-3xl`}>{item.name}</Link>
                    })}
                </div>
            </div>
        </>
    )
}

export default Navbar
