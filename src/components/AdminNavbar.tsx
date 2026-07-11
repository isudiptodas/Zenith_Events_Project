'use client'

import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";

function AdminNavbar() {

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const logout = async () => {
        try {
            const res = await axios.post("/api/admin/auth", { type: 'logout' }, { withCredentials: true });
            if (res.status === 200) {
                router.push('/dev-login');
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <nav className={`w-full backdrop-blur-2xl bg-black/10 h-auto fixed z-20 flex justify-between items-center px-4 py-5`}>
                <img src="/assets/zefc_logo_white.png" className={`h-16`} />

                <span onClick={() => setSidebarVisible(true)} className={`text-2xl xl:hidden text-white`}><MdOutlineSettings /></span>

                <div className={`w-auto xl:flex justify-center items-center gap-4 pr-7 hidden`}>
                    <Link href='/admin/home' className={`w-auto px-5 py-2 text-lg rounded-full ${pathname === '/admin/home' ? "text-yellow-500 border-yellow-500" : "text-white border-transparent"} border-b-2 select-none`}>Home</Link>
                    <Link href='/admin/change-password' className={`w-auto px-5 py-2 text-lg rounded-full ${pathname === '/admin/change-password' ? "text-yellow-500 border-yellow-500" : "text-white border-transparent"} border-b-2 select-none`}>Change Password</Link>
                    <p onClick={logout} className={`w-auto px-5 py-2 text-lg rounded-full text-red-500 select-none`}>Logout</p>
                </div>
            </nav>

            {/* sidebar */}
            <div className={`w-full xl:hidden h-screen flex flex-col justify-start items-center transition-transform z-40 fixed top-0 left-0 ${sidebarVisible ? "translate-x-0" : "translate-x-full"} duration-500 ease-in-out backdrop-blur-2xl bg-black/10`}>
                <p onClick={() => setSidebarVisible(false)} className={`absolute top-10 right-8 text-white text-2xl`}><RxCross1 /></p>

                <div className={`w-full flex flex-col justify-start items-center pt-36 px-4`}>
                    <Link href='/admin/home' className={`w-full mb-3 select-none text-start pl-5 py-2 ${pathname === '/admin/home' ? "font-semibold text-yellow-500 border-yellow-500" : "font-normal border-l-transparent text-white"} border-l-4 text-3xl`}>Home</Link>
                    <Link href='/admin/change-password' className={`w-full mb-3 select-none text-start pl-5 py-2 ${pathname === '/admin/change-password' ? "font-semibold text-yellow-500 border-yellow-500" : "font-normal border-l-transparent text-white"} border-l-4 text-3xl`}>Change Password</Link>
                    <p onClick={logout} className={`w-full select-none text-start pl-5 py-2 text-red-500 text-3xl`}>Logout</p>
                </div>
            </div>
        </>
    )
}

export default AdminNavbar
