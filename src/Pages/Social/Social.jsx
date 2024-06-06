import { useContext } from "react";
import { FaGooglePlusG } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const Social = () => {
    const { signInWithGoogle } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()


    const handleGoogle = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    profilePicture: result.user?.photoURL,
                    roll: 'user',
                    premiumTaken: null
                }
                Swal.fire({
                    title: "Success!",
                    text: "You have successfully logged In.",
                    icon: "success",
                    timer: 2000
                })
                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        console.log(res.data);
                        {
                            location.state ? navigate(location.state) : navigate('/')
                        }
                    })
            })
    }

    return (
        <div onClick={handleGoogle} className="btn w-full bg-transparent border-black "><FaGooglePlusG className="text-2xl" /> Continue with Google </div>
    );
};

export default Social;