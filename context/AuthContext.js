import React, { useContext, useState, useEffect, useRef } from 'react';
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const userInfo = useRef()

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscriber
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        signOut,
        userInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}