import { toast } from "react-toastify"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth"
import { getDoc, getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, setDoc, getDocs } from "firebase/firestore"; 



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7dv8XC-5GXVrnN-2WVslDQ6Ia0i2PWF0",
  authDomain: "flixtv-1fdb7.firebaseapp.com",
  projectId: "flixtv-1fdb7",
  storageBucket: "flixtv-1fdb7.appspot.com",
  messagingSenderId: "632868427570",
  appId: "1:632868427570:web:d0a5580b9e09a25abaa92b",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const logUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    return user
  } catch (err) {
    const error = _getParsedError(err)
    toast.error(error)
  }
}

const createUser = async ({ email, password, displayName }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    await updateProfile(auth.currentUser, { displayName })
    return user
  } catch (err) {
    const error = _getParsedError(err.toString())
    toast.error(error)
  }
}

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    toast.success("Email sent Successfully!")
  } catch (err) {
    const error = _getParsedError(err.toString())
    toast.error(error)
  }
}

const getWatchlistByUserId = async(userId) => {
  try{
    const docRef = doc(db, 'watchlist-db', userId)
    const docSnap  = await getDoc(docRef)
    return docSnap
  }catch(err){
    console.log(err)
  }
}

const addToWatchlist = async (userId, show) => {
  try{
    let updatedWatchList
    console.log(userId,show)
    const docSnap  = await getWatchlistByUserId(userId)
    if(docSnap.exists()){
      const { watchlist } = docSnap.data()
      updatedWatchList = [...watchlist, show]
    }else{
      updatedWatchList = [show]
    }
    await setDoc(doc(db, 'watchlist-db', userId), {watchlist: updatedWatchList})
    toast.success("Added to watchlist!")
  }catch(err){
    console.log(err)
  }
}

const _getParsedError = (str) => {
  let error
  if (str.includes("auth/email-already-in-use")) {
    error = "Email already in use"
  } else if (str.includes("Password should be at least 6 characters")) {
    error = "Password should be at least 6 characters"
  } else if(str.includes("auth/invalid-email")){
    error = "Invalid email address"
  }
  return error
}

export const firebaseService = {
  logUser,
  createUser,
  resetPassword,
  getWatchlistByUserId,
  addToWatchlist
}
