import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import LoadingModal from "../../components/LoadingModal ";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        console.log(data);
        console.log("form ", data);
        const imageFile = { image: data.image[0] }
        console.log("Image", imageFile);

        axiosSecure.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if(res.data.success){
                const imageUrl = res.data.data.display_url;
                const info = {
                    name: data.name,
                    image: imageUrl,
                    description: data.description,        
                }
                console.log(info);
                axiosSecure.post('/articles', info)
                .then(res => {
                    console.log(res)
                    setLoading(false);
                    if(res.data.result?.insertedId){
                        Swal.fire({
                            icon: 'success',
                            title: 'Article posted successfully',
                        });
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Please Subscribe',
                            text: `${res.data.message}`
                        });   
                    }
                })
            }
        })

    }


    return (
        <div className="w-11/12">
            <SectionTitle heading={'add Publisher'}></SectionTitle>
            <div className=" border-2 border-black p-10 max-w-screen-md mx-auto">
                <h1 className="font-bold text-2xl text-center">Publisher Details</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 ">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="name@gmail.com" className="input input-bordered" required />
                        {errors.name && <span>name field is required</span>}
                    </div>
                    <div className="form-control my-3">
                        <label className="label">
                            <span className="label-text">description</span>
                        </label>
                        <textarea  {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                        {errors.description && <span>description field is required</span>}
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