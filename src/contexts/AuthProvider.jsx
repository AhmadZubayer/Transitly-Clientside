import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authInitialized, setAuthInitialized] = useState(false);

    const registerUser = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    const signInUser = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    }
    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser) {
                    await currentUser.reload();

                    // Fetch user role from backend
                    try {
                        const token = await currentUser.getIdToken();
                        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}/role`, {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        });
                        const userData = response.data;

                        // Add role to the user object
                        const userWithRole = {
                            ...currentUser,
                            role: userData.role || 'user'
                        };
                        setUser(userWithRole);
                    } catch (error) {
                        console.log('Error fetching user role:', error);
                        // Set user without role if fetch fails
                        setUser(currentUser);
                    }
                } else {
                    setUser(null);
                    console.log('User logged out');
                }
            } finally {
                setLoading(false);
                setAuthInitialized(true);
            }
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading: loading && !authInitialized,
        registerUser,
        signInUser,
        signInWithGoogle: signInGoogle,
        signInGoogle,
        logOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;