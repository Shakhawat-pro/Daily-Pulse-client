import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    console.log(user);
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    const [isPremiumTaken, setIsPremiumTaken] = useState(false)

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
            if(currentUser){
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(async res => {
                    // console.log(res.data);
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false)
                        const userResponse = await axiosPublic.get(`/user/${currentUser.email}`)
                        // console.log(userResponse.data.premiumTaken);
                        const userData = userResponse.data;
                        const premiumTakenDate = new Date(userData.premiumTaken);
                        // console.log(premiumTakenDate);
                        const currentDate = new Date();
                        if (premiumTakenDate && currentDate > premiumTakenDate) {
                            await axiosPublic.patch(`/user/${currentUser.email}`)
                            console.log('Sorry');
                            setIsPremiumTaken(false)
                        }
                        else{
                            setIsPremiumTaken(true)
                        }
                    }
                })
            }
            else{
                //todo
                localStorage.removeItem('access-token')
                setLoading(false)

            }
        
        })

        return () => {
            unSubscribe()
        }        
        },[axiosPublic])



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
        logOut,
        isPremiumTaken
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