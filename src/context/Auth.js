import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  sendPasswordResetEmail,
  updatePassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const Auth = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function updateName(name) {
    return updateProfile(currentUser, {
      displayName: name,
    });
  }

  function updatePhoto(url) {
    return updateProfile(currentUser, {
      photoURL: url,
    });
  }

  function updateMail(email) {
    return updateEmail(currentUser, email);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function gantiPassword(password) {
    return updatePassword(currentUser, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setCurrentUser(user);
        setLoading(false);
      },
      [currentUser]
    );

    return unsubscribe;
  });

  const value = {
    currentUser,
    register,
    login,
    updateName,
    updatePhoto,
    updateMail,
    resetPassword,
    gantiPassword,
    logout,
  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </>
  );
};
