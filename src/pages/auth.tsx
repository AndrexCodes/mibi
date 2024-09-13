import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../components/firebase_context";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useLocation, useNavigate } from "react-router-dom"

const AuthPage = () => {
    const { user, signOutUser } = useAuthContext()
    const [tab, setTab] = useState(0)
    const [page, setPage] = useState<string>("signup")
    const { refCode } = useParams();
    const query = useLocation()
    const pathname = query.pathname
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem("refCode", refCode ? refCode:"None")
        const unsubscribe = setInterval(() => {
            setTab(tab === 0 ? 1 : 0)
        }, 6000)
        return clearInterval(unsubscribe)
    }, [])
    useEffect(() => {
        if (pathname.startsWith("/authenticate") && user) {
            navigate("/dashboard")
        }
    }, [user])
    return (
        <div className="h-screen md:flex block">
            <div
                className="relative overflow-hidden md:flex w-[65%] bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
                <AnimatePresence>
                    {tab === 0 &&
                        <motion.img initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} src="https://www.mibimembersclub.com/images/slide/handshake2.jpg" alt=""
                            className="absolute top-0 left-0 w-full h-full object-cover object-center" />}
                    {tab === 1 &&
                        <motion.img src="https://www.mibimembersclub.com/images/slide/handshake1.jpg" alt=""
                            className="absolute top-0 left-0 w-full h-full object-cover object-center" />}
                </AnimatePresence>
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-45">

                </div>
                <div className="z-40 px-10">
                    <p className="text-white mt-1">Welcome to MIBI</p>
                    <AnimatePresence>
                        {tab === 0 &&
                            <motion.h1 onClick={signOutUser} initial={{ y: "100vh" }} exit={{ y: "-100vh" }} animate={{ y: 0 }} transition={{ duration: 0.2 }} className="text-white font-bold text-6xl font-sans w-[70%]">
                                <span className="text-[#f9c10b]">Elevate Your Business</span> Game with MiBi
                            </motion.h1>
                        }
                        {tab === 1 &&
                            <motion.h1 initial={{ y: "100vh" }} exit={{ y: "-100vh" }} animate={{ y: 0 }} transition={{ duration: 0.2 }} className="text-white font-bold text-6xl font-sans w-[70%]">
                                Empower Your
                                <span className="text-[#f9c10b]">Network</span> Expand Your
                                <span className="text-[#f9c10b]">Reach</span>
                            </motion.h1>
                        }
                    </AnimatePresence>
                </div>
                <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full  border-t-8 border-[#dc3545]"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-t-8 border-[#dc3545]"></div>
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-t-8 border-[#dc3545]"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-t-8 border-[#dc3545]"></div>
            </div>
            <div className="flex md:w-1/2 justify-center items-center px-12 py-4 bg-white">
                <AnimatePresence>
                    {page === "signup" ?
                        <SignUp setPage={setPage} />
                        :
                        <SignIn setPage={setPage} />
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AuthPage