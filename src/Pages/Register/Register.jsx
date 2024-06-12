import Lottie from "lottie-react";
import welcome from '../../assets/welcome.json'
import Social from "../Social/Social";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { updateProfile } from "firebase/auth";
import LoadingModal from "../../components/LoadingModal ";
import axios from "axios";
import { Helmet } from "react-helmet-async";
<label htmlFor="my_modal_6" className="btn">open modal</label>



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    // const location = useLocation()
    const { createUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [loading, setLoading] = useState(false);


    const onSubmit = async (data) => {
        setLoading(true);
        console.log("form ", data);
        const imageFile = { image: data.image[0] }
        console.log("Image", imageFile);

        axios.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                if (res.data.success) {
                    const imageUrl = res.data.data.display_url;
                    return createUser(data.email, data.password)
                        .then(userCredential => {
                            return updateProfile(userCredential.user, {
                                displayName: data.name,
                                photoURL: imageUrl
                            });
                        })
                        .then(() => {
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                profilePicture: imageUrl,
                                role: 'user',
                                premiumTaken: null
                            };
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    console.log(res);
                                    setLoading(false);
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Registration Successful',
                                            text: 'You have been registered successfully!',
                                        });
                                        navigate('/');
                                    }
                                    Swal.fire({
                                        icon: 'info',
                                        title: '"User already existed"',
                                    });
                                    navigate('/');
                                })
                        });

                } else {
                    throw new Error('Image upload failed');
                }
            })
            .catch(error => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message || 'Something went wrong. Please try again.',
                });
            });
    };


    return (
        <div className="sm:h-[700px] w-11/12 max-w-screen-lg mx-auto shadow-2xl flex flex-col  sm:flex-row items-center " >
            <Helmet>
                <title>DailyPulse | Register</title>
            </Helmet>
            <div className="bg-black h-full sm:w-1/2 flex flex-col justify-center  items-center " >
                <h1 className="text-white font-bold font-serif text-4xl max-sm:my-5">Join Us Today!</h1>
                <Lottie animationData={welcome} loop={true} />;
            </div>
            <div className="sm:w-1/2 p-10 ">
                <h1 className="font-bold text-xl">Register Now</h1>
                <p className="text-sm mt-1">If you`re already a member, <Link to={'/login'}><span className="underline font-bold">Login Now</span></Link> </p>
                <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <div className="label">
                            <span className="label-text">Image</span>
                        </div>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                        {errors.image && <span className="text-[#ED1D24]">Image is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" {...register("name", { required: true })} className="input input-bordered" />
                        {errors.name && <span className="text-[#ED1D24]">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="example@gmail.com" {...register("email", { required: true })} className="input input-bordered" />
                        {errors.email && <span className="text-[#ED1D24]">Email is required</span>}
                    </div>
                    <div className="form-control my-3">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })} className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-black text-white">Register</button>
                    </div>
                </form>
                <div className="divider"> OR</div>
                <div className="">
                    <Social></Social>
                    <LoadingModal isLoading={loading} />
                </div>
            </div>
        </div>
    );
};

export default Register;