import { useEffect } from "react"
import { useAuthContext } from "../components/firebase_context"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../components/app_context"

const RefPrice = 200


const Dashboard = () => {
    const { user, signOutUser } = useAuthContext()
    const {setToast} = useAppContext()
    const navigate = useNavigate()
    const exitApp = () => {
        signOutUser()
        setTimeout(() => [
            navigate("/authenticate")
        ], 2000)
    }
    function copyTextToClipboard(text: string) {
        navigator.clipboard.writeText(text).then(() => {
          console.log('Text copied to clipboard');
          setToast({type: "success", message: "Link Copied"})
        }).catch(err => {
          console.error('Failed to copy text: ', err);
          setToast({type: "error", message: err.message})
        });
      }
    useEffect(() => {
        if (!user) {
            navigate("/authenticate")
        }
    }, [user])
    if (user) {
        return (
            <div>
                <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
                    <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                        <div className="text-indigo-500">
                            <div className="flex p-3 justify-center items-center gap-4">
                                <p className="text-3xl font-bold text-[#f9c10b]">MIBI</p>
                                <p className="text-2xl font-serif text-[#dc3545]">Members Club</p>
                            </div>
                        </div>
                        {/* <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                        <ul className="flex font-semibold justify-between">
                            <li className="md:px-4 md:py-2 text-indigo-500"><a href="#">Dashboard</a></li>
                            <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Search</a></li>
                            <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Explore</a></li>
                            <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">About</a></li>
                            <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Contact</a></li>
                        </ul>
                    </div> */}
                        <div>

                        </div>
                        <div className="order-2 md:order-3 flex h-full py-3 gap-3">
                            <button
                                onClick={exitApp}
                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                <span>Sign Out</span>
                            </button>
                            <div className="h-full">
                                <img src="https://randomuser.me/api/portraits/women/49.jpg" alt="" className="rounded-full h-full aspect-square" />
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="grid gap-4 lg:gap-8 md:grid-cols-2 p-8 pt-20">
                    <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                        <div className="space-y-2">
                            <div
                                className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                <span>Revenue</span>
                            </div>

                            <div className="text-3xl dark:text-gray-100">
                                {RefPrice * user?.refAccounts.length}.00 KES
                            </div>

                            <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">

                                <span>0 increase</span>

                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                        <div className="space-y-2">
                            <div
                                className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                <span>Successful Referals</span>
                            </div>

                            <div className="text-3xl dark:text-gray-100">
                                {user?.refAccounts.length}
                            </div>

                            <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">

                                <span>0% decrease</span>

                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl md:w-[40%] w-[80%]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd" />
                        </svg>
                        <input
                            value={`http://localhost:3000/authenticate/${user.id}`}
                            className="pl-2 outline-none border-none w-full" readOnly />
                    </div>
                    <button
                    onClick={()=>{copyTextToClipboard(`http://localhost:3000/authenticate/${user.id}`)}}
                        className="px-4 bg-indigo-500 py-3 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        <span>Copy</span>
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>

            </div>
        )
    }
}

export default Dashboard