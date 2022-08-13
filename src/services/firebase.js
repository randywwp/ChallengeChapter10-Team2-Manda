import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'

import {
  getFirestore,
  query,
  getDocs,
  doc,
  collection,
  where,
  setDoc,
  updateDoc,
  } from 'firebase/firestore'

import { getStorage } from "firebase/storage";

//firebase brandon
// const firebaseConfig = {
//   apiKey: "AIzaSyArSl-v-KqBaEXNw3RkY68ft_z7ruIagHI",
//   authDomain: "challenge-c9.firebaseapp.com",
//   projectId: "challenge-c9",
//   storageBucket: "challenge-c9.appspot.com",
//   messagingSenderId: "546197271681",
//   appId: "1:546197271681:web:95f89416f610c796254980",
// };

//firebase fahmi
const firebaseConfig = {
  apiKey: "AIzaSyBlTjwi_2Bh10DW41laQaUc9Jmt45n732A",
  authDomain: "fsw-binar-fahmi-chapter9.firebaseapp.com",
  projectId: "fsw-binar-fahmi-chapter9",
  storageBucket: "fsw-binar-fahmi-chapter9.appspot.com",
  messagingSenderId: "52154749890",
  appId: "1:52154749890:web:b1bc50bda257855575bc5b"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)


const googleProvider = new GoogleAuthProvider()

async function signInWithGoogle () {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email
      })
    }
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

async function logInWithEmailAndPassword (email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

async function registerWithEmailAndPassword (name, email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email
    })
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

async function sendPasswordReset (email) {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}


async function updatePhotoProfile (uid, downloadUrl) {
  // Cari data dari collection users yang mempunyai dokument sama dgn uid
  // update dengan profile url-nya
  await updateDoc(doc(db, 'users', uid), {
    profileUrl: downloadUrl
  })
}

function logout () {
  signOut(auth)
};


export {
  auth,
  db,
  logout,
  sendPasswordReset,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  signInWithGoogle,
  storage,
  updatePhotoProfile,
  }
