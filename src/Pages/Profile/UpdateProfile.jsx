import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import Swal from "sweetalert2";


const UpdateProfile = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const axiosPublic = useAxiosPublic()

    const {data : userDB, isLoading} = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user.email}`)
            return res.data
        }
    })
    // console.log(userDB);

    const onSubmit = async (data) => {
        console.log(data);
        axiosPublic.patch(`/profile/${user.email}`, data)
        updateProfile(auth.currentUser, {
            displayName: data.name,
            photoURL: data.photoURL
        }).then(() =>{
            axiosPublic.patch(`/profile/${user.email}`, data)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
        })
    }

    if (isLoading) {
        return <div className="w-fit mx-auto"><span className="loading loading-spinner  w-20 text-info"></span></div>;
    }


    return (
        <div className=" w-11/12 max-w-[500px] mx-auto shadow-2xl py-16 px-10 mt-10 border-2 border-black rounded-lg" >
            <div className="text-center" >
                <div className="avatar">
                    <div className="w-32 rounded-full ring ring-black ring-offset-base-100 ring-offset-2">
                        <img src={user.photoURL} />
                    </div>
                </div>
                <h1 className="font-bold font-serif text-4xl mt-5 capitalize">Role : {userDB?.role}</h1>
                <h1 className="font-bold text-xl mt-2">Membership: {userDB?.premiumTaken === null ? "Normal" : "Premium"}</h1>
            </div>
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="url" defaultValue={user?.photoURL} {...register("photoURL", { required: true })} placeholder="example@gmail.com" className="input input-bordered" required />
                    {errors.photoURL && <span className="text-[#493e3e]">PhotoURL is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" defaultValue={user?.displayName} {...register("name", { required: true })} placeholder="example@gmail.com" className="input input-bordered" required />
                    {errors.name && <span className="text-[#493e3e]">Name is required</span>}
                </div>
                <div className="form-control my-3">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="email"  defaultValue={user.email} readOnly {...register("email", { required: true })} placeholder="password" className="input input-bordered" required />
                    {errors.email && <span className="text-[#ED1D24]">email is required</span>}
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-black text-white">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;