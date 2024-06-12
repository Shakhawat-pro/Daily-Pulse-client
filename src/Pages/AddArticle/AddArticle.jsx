import Select from 'react-select'
import usePublishers from '../../hooks/usePublishers';
import './styles.css'
import { Controller, useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import LoadingModal from '../../components/LoadingModal ';
import { useNavigate } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticle = () => {
    const axiosPublic = useAxiosPublic()
    const [publishers,] = usePublishers()
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure()
    const publisherOptions = publishers.map(item => ({
        value: item.name,
        label: item.name
    }))
    // console.log(publisherOptions);
    const navigate = useNavigate()
    const tagOptions = [
        { value: 'news', label: 'News' },
        { value: 'sports', label: 'Sports' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'technology', label: 'Technology' },
        { value: 'health', label: 'Health' },
        { value: 'science', label: 'Science' },
        { value: 'politics', label: 'Politics' },
        { value: 'business', label: 'Business' },
        { value: 'education', label: 'Education' },
        { value: 'lifestyle', label: 'Lifestyle' },
        { value: 'travel', label: 'Travel' },
        { value: 'food', label: 'Food' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'environment', label: 'Environment' },
        { value: 'culture', label: 'Culture' }
    ]

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        console.log(data);
        console.log("form ", data);
        const imageFile = { image: data.image[0] }
        console.log("Image", imageFile);

        axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if(res.data.success){
                const imageUrl = res.data.data.display_url;
                const info = {
                    title: data.title,
                    image: imageUrl,
                    publisher: data.publisher,
                    tags: data.tags,
                    description: data.description,
                    content: data.content,
                    author: {
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL
                    },
                    status: "pending",
                    isPremium: false,
                    views: 0,
                    postedDate: new Date().toISOString()
        
                }
                axiosSecure.post('/articles', info)
                .then(res => {
                    console.log(res)
                    setLoading(false);
                    if(res.data.result?.insertedId){
                        Swal.fire({
                            icon: 'success',
                            title: 'Article posted successfully',
                        });
                        navigate('/')
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
        <div className="max-w-screen-lg w-11/12 p-10 mx-auto shadow-2xl border-2 border-black rounded-lg">
            <h1 className="font-bold text-2xl text-center">Write Your Own Article</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 ">
                <div className='flex sm:justify-between flex-col sm:flex-row sm:gap-10'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" placeholder="Article title"  {...register("title", { required: true })} className="input input-bordered rounded-md" required />
                        {errors.title && <span>Title field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                        {errors.image && <span>image field is required</span>}
                    </div>
                </div>
                <div className='flex justify-between flex-col sm:flex-row sm:gap-10 sm:mt-2'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text" >Tags</span>
                        </label>
                        <Controller
                            name="tags"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    isMulti
                                    options={tagOptions}
                                    onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])}
                                />
                            )}
                        />
                        {errors.tags && <span>tags field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Publishers</span>
                        </label>
                        <Controller name='publisher' control={control} rules={{ required: true }} render={({ field }) => (
                            <Select
                                options={publisherOptions}
                                onChange={(selectedOption) => field.onChange(selectedOption.value)}
                            />
                        )} />
                        {errors.publisher && <span>publisher field is required</span>}
                    </div>
                </div>
                <div className="form-control my-3">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input type="text" placeholder="Short description"  {...register("description", { required: true })} className="input input-bordered rounded-md" required />
                    {errors.description && <span>description field is required</span>}
                </div>
                <div className="form-control my-3">
                    <label className="label">
                        <span className="label-text">Article</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" {...register("content", { required: true })} placeholder="Write the article"></textarea>
                    {errors.content && <span>content field is required</span>}
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-black text-white">Submit</button>
                </div>
            </form>
            <LoadingModal isLoading={loading} />
        </div>
    );
};

export default AddArticle;