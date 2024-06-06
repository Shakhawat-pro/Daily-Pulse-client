import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
// import useAxiosPublic from '../hooks/useAxiosPublic';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    console.log(user);
    const [loading, setLoading] = useState(true)
    // const axiosPublic = useAxiosPublic()

    const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unSubscribe()
        }        
        },[])



    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const authInfo = {
        user,
        loading,
        signInWithGoogle,
        createUser,
        signInUser,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}