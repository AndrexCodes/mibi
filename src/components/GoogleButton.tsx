import { useEffect } from "react"
import { useAuthContext } from "./firebase_context"
import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"

const GoogleButton = ({prefix}: any) => {
    const {user, signInWithGoogle} = useAuthContext()
    const query = useLocation()
    const pathname = query.pathname
    const navigate = useNavigate()
    return (
        <motion.button whileTap={{scale: 1.15}} onClick={signInWithGoogle} type="button" className="px-4 py-2 border border-slate-500 w-full flex justify-center gap-2 rounded-lg text-slate-700">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>{prefix} with Google</span>
        </motion.button>
    )
}

export default GoogleButton