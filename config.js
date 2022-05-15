// Import the functions you need from the SDKs you need
import * as _fb from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";
import * as _fb_fs from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js";
// import {doc, collection, getFirestore, addDoc, getDocs, setDoc} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js";
import * as _fb_auth from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
// import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const fb = _fb;
export const app = fb.initializeApp(firebaseConfig);
export const fb_fs = _fb_fs;
export const db = fb_fs.getFirestore(app);
export const fb_auth = _fb_auth;
export const auth = fb_auth.getAuth();


const path = "testcollection";


export const loader = function (callback) {
    const ref = fb_fs.collection(db, path);
    const query = fb_fs.query(
        ref,
        fb_fs.orderBy("date", "desc"),
        fb_fs.limit(10)
    )

    fb_fs.onSnapshot(query, (collection) => {
        callback(collection);
    });
}


export const postDoc = async function (comment)
{
    const ref = fb_fs.collection(db, path);

    await fb_fs.setDoc(fb_fs.doc(ref), {
        comment: comment,
        author: "none",
        date: Date.now(),
    });


    const general = fb_fs.doc(db, "setting", "general");

    fb_fs.getDoc(general)
        .then(function (snap) {
            const count = snap.get("count");
            console.log("count=", count);
        })
}
