import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import LoadingModal from "../../components/LoadingModal ";
import axios from "axios";
import { Helmet } from "react-helmet-async";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_key2 = import.meta.env.VITE_IMAGE_HOSTING_KEY2
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key2}`;

const AddPublisher = () => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        // console.log(data);
        // console.log("form ", data);
        const imageFile = { image: data.image[0] }
        // console.log("Image", imageFile);

        axios.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            // console.log(res);
            if (res.data.success) {
                const imageUrl = res.data.data.display_url;
                // console.log(imageUrl);
                const info = {
                    name: data.name,
                    image: imageUrl,
                    description: data.description,
                }
                // console.log(info);
                axiosSecure.post('/publishers', info)
                    .then(res => {
                        // console.log(res.data);
                        console.log(res)
                        setLoading(false);
                        if (res.data.insertedId) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Publisher posted successfully',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Please Try again',
                                text: `${res.data?.message}`
                            });
                        }
                    })
            }
        })
        setLoading(false);
    }


    return (
        <div className="w-11/12">
            <Helmet>
                <title>DailyPulse | Add Publisher</title>
            </Helmet>
            <SectionTitle heading={'add Publisher'}></SectionTitle>
            <div className=" border-2 border-black p-10 max-w-screen-md mx-auto">
                <h1 className="font-bold text-2xl text-center">Publisher Details</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 ">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                        {errors.image && <span className="text-[#ED1D24]">Image is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="name@gmail.com" className="input input-bordered" />
                        {errors.name && <span className="text-[#ED1D24]">Name is required</span>}
                    </div>
                    <div className="form-control my-3">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea  {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                        {errors.description && <span className="text-[#ED1D24]">Description is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-black text-white">Submit</button>
                    </div>
                </form>
            </div>
            <LoadingModal isLoading={loading} />
        </div>
    );
};

export default AddPublisher;