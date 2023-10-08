// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, addDoc, setDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js"

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChknUIOrF2qxeYXVKQx9fDEJavZE6kTOY",
    authDomain: "infinityhorizons-a0898.firebaseapp.com",
    projectId: "infinityhorizons-a0898",
    storageBucket: "infinityhorizons-a0898.appspot.com",
    messagingSenderId: "413501437424",
    appId: "1:413501437424:web:35566b8c0884408df19935"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore()
const users = collection(database, "users")
const packages = collection(database, "packages")
const reviews = collection(database, "reviews")

// Define the routes using the corresponding HTTP methods
// GET
const getUser = async (userDat) => {
    try {
        if (!userDat.email || !userDat.password) {
            console.error("Missing Data")
        }

        const user = await getDoc(doc(users, userDat.email)) ///////
        if (!user.exists()) {
            console.error("User not found")
        } else {
            let userData = user.data()
            console.log(userData)
            return userData
        }
    } catch (err) {
        console.error("Error! Couldn't get the elements from the database:", err)
    }
}

const getPackages = async () => {
    const arrayPackages = await getDocs(packages)
    try {
        let returnPackages = []
        arrayPackages.forEach(packag => {
            returnPackages.push(packag.data())
        })
        return returnPackages
    } catch (err) {
        console.error("Error! Couldn't get the elements from the database:", err)
    }
}

const getReviews = async () => {
    const arrayReviews = await getDocs(reviews)
    // reviews.doc(email) -> reviews del usuario
    try {
        let returnRevs = []
        arrayReviews.forEach(rev => {
            returnRevs.push(rev.data())
        })
        return returnRevs
    } catch (err) {
        console.error("Error! Couldn't get the elements from the database:", err)
    }
}

//POST
const createUser = async (newUser) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

    if (!regex.test(newUser.email)) {
        console.error("Invalid Email")
        return
    }

    try {
        await setDoc(doc(users, newUser.email), newUser)
        alert("User created successfully")
        console.log("User created successfully:", newUser)
        return
    } catch (err) {
        console.error("Could not create user", err)
    }
}

const saveReview = async (req) => {
    try{
        await addDoc(reviews, req)
        console.log("reviews saved successfully:", req)
    } catch (err) {
        console.error("Could not save review", err)
    }
}

//DELETE
const deleteUser = async (user) => {
    try {
        await deleteDoc(doc(users, user.email))
        alert("User deleted successfully")
        return
    } catch (err) {
        console.error("Could not delete user", err)
    }
}

export { getUser, getPackages, getReviews, createUser, saveReview, deleteUser }
