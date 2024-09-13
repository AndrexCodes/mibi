import { useContext, createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { updateDoc, doc, getDoc, getFirestore, setDoc, arrayUnion } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCRVeALpMuOSUY3n-BXUeGivxQvdxy2mqw",
    authDomain: "live-wor.firebaseapp.com",
    databaseURL: "https://live-wor-default-rtdb.firebaseio.com",
    projectId: "live-wor",
    storageBucket: "live-wor.appspot.com",
    messagingSenderId: "990352904299",
    appId: "1:990352904299:web:17a83e51f17183f664e12e",
    measurementId: "G-X9YLPWLHXF"
};

const app = initializeApp(firebaseConfig);

export const DB = getFirestore(app)
export const AUTH = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext<any>(null)
export const useAuthContext = () => useContext(AuthContext)
const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null)
    const signInWithGoogle = () => {
        signInWithPopup(AUTH, googleProvider)
    }
    const signOutUser = async () => {
        try {
            setUser(null)
            await signOut(AUTH)
            // alert("Signed Out")
        } catch (err: any) {
            // alert(err)
        }
    }
    const initializeApp = async () => {
        const unsubscribe = onAuthStateChanged(AUTH, async (result) => {
            if (!result) return
            const docRef = doc(DB, "users", result.uid)
            const docResult = await getDoc(docRef)
            if (docResult.exists()) {
                setUser({ ...docResult.data(), id: result.uid })
            } else {
                // New user
                // Set current user data
                const refCode = localStorage.getItem("refCode")
                const username = localStorage.getItem("username")
                // alert(`Found refCode: ${refCode}`)
                const userData = {
                    displayName: username || "Unset",
                    refAccounts: [],
                    refCode: refCode,
                    createdAt: new Date()
                }
                await setDoc(docRef, userData)
                // Update referees refCodes
                // alert(`RefCode = ${refCode}`)
                if (refCode && refCode !== "None") {
                    const refDocRef = doc(DB, "users", refCode)
                    await updateDoc(refDocRef, { refAccounts: arrayUnion(result.uid) })
                }
                // alert(`User set data: ${JSON.stringify({ ...userData, id: result.uid, })}`)
                setUser({ ...userData, id: result.uid, })
            }
        })
        return () => unsubscribe()
    }
    useEffect(() => {
        initializeApp()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, signInWithGoogle, signOutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider