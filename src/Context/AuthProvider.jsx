import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }




    const authInfo = {
        user,
        loading,
        signInWithGoogle,


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