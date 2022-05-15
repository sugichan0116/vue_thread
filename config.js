// // Import the functions you need from the SDKs you need
// import * as _fb from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
// import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";
// import * as _fb_fs from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js";
// // import {doc, collection, getFirestore, addDoc, getDocs, setDoc} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js";
// import * as _fb_auth from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
// // import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries


// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";

import {
    getFirestore,
    collection,
    setDoc,
    doc,
    serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANXVGTIzqMBCLxvDVLzcduyrJTDiY9riE",
    authDomain: "vuetest-e8221.firebaseapp.com",
    projectId: "vuetest-e8221",
    storageBucket: "vuetest-e8221.appspot.com",
    messagingSenderId: "183512353872",
    appId: "1:183512353872:web:b13c31e1b2a21214439555",
    measurementId: "G-43KL4TDBEP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const collection_path = "testcollection";
export const collection_ref = collection(db, collection_path);

export const postDoc = async function (author, comment)
{
    await setDoc(doc(collection_ref), {
        comment: comment,
        author: author,
        date: Date.now(),
        create_at: serverTimestamp(),
    });

    // const general = doc(db, "setting", "general");
    //
    // getDoc(general)
    //     .then(function (snap) {
    //         const count = snap.get("count");
    //         console.log("count=", count);
    //     })
}
