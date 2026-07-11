'use client'

import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { Check, X } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import AdminNavbar from "@/components/AdminNavbar"

function Page() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [changing, setChanging] = useState(false);

    const validations = useMemo(() => ({
        minLength: newPassword.length >= 7,
        hasNumber: /\d/.test(newPassword),
        notSame: currentPassword.length > 0 && newPassword !== currentPassword,
        confirm: newPassword.length > 0 && confirmPassword === newPassword
    }), [currentPassword, newPassword, confirmPassword])

    const canSubmit =
        validations.minLength &&
        validations.hasNumber &&
        validations.confirm

    const changePassword = async () => {

        if (changing) {
            return;
        }

        const id = toast.loading("Changing password...");
        try {
            setChanging(true);
            const res = await axios.put(`/api/admin/auth`, {
                newPassword, currentPassword
            }, { withCredentials: true });

            if (res.status === 201) {
                toast.success("Password updated");
            }
        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong"
            toast.error(message);
        }
        finally {
            toast.dismiss(id);
            setNewPassword("");
            setCurrentPassword("");
            setConfirmPassword("");
            setChanging(false);
        }
    }

    return (
        <motion.div

            className="min-h-screen flex flex-col items-center justify-start pb-10 bg-[#09090B] relative"
        >
            <AdminNavbar />
            <div className="w-[90%] mt-36 max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-7 space-y-6">

                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Change Password
                    </h1>
                    <p className="text-zinc-400 mt-1">
                        Update your admin password securely.
                    </p>
                </div>

                <div className="space-y-5">

                    <div>
                        <label className="text-sm text-zinc-300 mb-2 block">
                            Current Password
                        </label>

                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none text-white focus:border-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-zinc-300 mb-2 block">
                            New Password
                        </label>

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none text-white focus:border-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-zinc-300 mb-2 block">
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none text-white focus:border-blue-500 transition"
                        />
                    </div>

                </div>

                <div className="rounded-xl bg-zinc-900/60 border border-white/10 p-4 space-y-3">

                    <Requirement
                        passed={validations.minLength}
                        text="At least 7 characters"
                    />

                    <Requirement
                        passed={validations.hasNumber}
                        text="Contains at least one number"
                    />

                    <Requirement
                        passed={validations.confirm}
                        text="Passwords match"
                    />

                </div>

                <button
                    disabled={!canSubmit}
                    onClick={changePassword}
                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white py-3 font-medium transition"
                >
                    Change Password
                </button>

            </div>
        </motion.div>
    )
}

export default Page

function Requirement({ passed, text }: { passed: boolean; text: string }) {
    return (
        <div className="flex items-center gap-3 text-sm">

            <div className="relative w-5 h-5">

                <motion.div
                    animate={{
                        opacity: passed ? 1 : 0,
                        scale: passed ? 1 : 0.5,
                        rotate: passed ? 0 : -90
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Check className="w-4 h-4 text-green-500" />
                </motion.div>

                <motion.div
                    animate={{
                        opacity: passed ? 0 : 1,
                        scale: passed ? 0.5 : 1
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <X className="w-4 h-4 text-zinc-500" />
                </motion.div>

            </div>

            <span className={passed ? "text-green-400" : "text-zinc-400"}>
                {text}
            </span>

        </div>
    )
}