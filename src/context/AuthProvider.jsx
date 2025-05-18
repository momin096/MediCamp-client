import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AuthContext from "./AuthContext";



const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = async () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Current User -->", currentUser?.email);
            setUser(currentUser);
            setLoading(false)
            // if (currentUser) {
            //     // get token and store in local storage
            //     axiosPublic.post('/jwt', { email: currentUser?.email })
            //         .then(res => {
            //             console.log('token -> ', res.data.token);
            //             if (res.data.token) {
            //                 localStorage.setItem('access-token', res.data.token);
            //                 setLoading(false);
            //             }
            //         })
            //         .catch(error => {
            //             console.error('Error fetching token:', error);
            //         });

               

            // } else {
            //     // remove token from local storage
            //     localStorage.removeItem('access-token');
            //     setLoading(false);
            // }
        });

        return () => unsubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
