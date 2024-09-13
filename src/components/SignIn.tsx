import { motion } from "framer-motion"
import GoogleButton from "./GoogleButton"
import { signInWithEmailAndPassword } from "firebase/auth";
import { AUTH } from "./firebase_context";
import { useState } from "react";
import { useAppContext } from "./app_context";

const SignIn = ({ setPage }: any) => {
    const { setToast } = useAppContext()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = (event: any) => {
        event.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(AUTH, formData.email, formData.password)
            .then((result: any) => [
                setIsLoading(false)
            ])
            .catch((error: any) => {
                setToast({ type: "error", message: error.code })
                setIsLoading(false)
            })
    }
    const onChange = (event: any) => {
        const { name, value } = event.target
        setFormData({ ...formData, [`${name}`]: value })
    }
    return (
        <motion.form initial={{ scale: 0 }} exit={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} onSubmit={onSubmit} className="bg-white size-full px-14 flex flex-col justify-center items-center">
            <div className="flex p-3 justify-center items-center gap-4">
                <p className="text-3xl font-bold text-[#f9c10b]">MIBI</p>
                <p className="text-2xl font-serif text-[#dc3545]">Members Club</p>
            </div>
            <div className="flex justify-center">
                <p className="text-xl font-serif font-semibold mb-2">WELCOME BACK</p>
            </div>
            <div className="flex w-full items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input onChange={onChange} className="w-full pl-2 outline-none border-none" type="text" name="email" id="email" placeholder="Email Address" required />
            </div>
            <div className="flex w-full items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd" />
                </svg>
                <input
                    onChange={onChange}
                    className="w-full pl-2 outline-none border-none" type="password" name="password" id="password" placeholder="Password" required />
            </div>
            {!isLoading
                ?
                <motion.button whileTap={{ scale: 1.15 }} type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</motion.button>
                :
                <div className="w-full bg-indigo-600 mt-4 py-3 rounded-2xl text-white font-semibold mb-2 flex justify-center">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                    </svg>
                </div>
            }
            <span className="text-sm ml-2 w-full">Don't have an account? <span className="hover:text-blue-500 cursor-pointer" onClick={() => { setPage("signup") }}>sign Up</span></span>
            <div className="w-full flex flex-col justify-center items-center py-3">
                <GoogleButton prefix="Continue" />
            </div>
        </motion.form>
    )
}

export default SignIn