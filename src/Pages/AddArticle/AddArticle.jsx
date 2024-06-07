import Select from 'react-select'
import usePublishers from '../../hooks/usePublishers';
import './styles.css'
const AddArticle = () => {
    const [publishers,] = usePublishers()
    const publisherOptions = publishers.map(item => ({
        value: item.name,
        label: item.name
    }))
    console.log(publisherOptions);

    const options = [
        { value: 'news', label: 'News' },
        { value: 'sports', label: 'Sports' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'technology', label: 'Technology' }
    ]

    // const customStyles = {
    //     control: (base) => ({
    //         ...base,
    //         borderColor: '#d1d5db',
    //         boxShadow: 'none',
    //         '&:hover': {
    //             borderColor: '#9ca3af'
    //         }
    //     }),
    //     option: (provided, state) => ({
    //         ...provided,
    //         backgroundColor: state.isSelected ? '#000000' : state.isFocused ? '#e5e7eb' : '#ffffff',
    //         color: state.isSelected ? '#ffffff' : '#000000'
    //     }),
    //     multiValue: (styles) => ({
    //         ...styles,
    //         backgroundColor: '#d1d5db'
    //     }),
    //     multiValueLabel: (styles) => ({
    //         ...styles,
    //         color: '#000000'
    //     }),
    //     multiValueRemove: (styles) => ({
    //         ...styles,
    //         color: '#000000',
    //         ':hover': {
    //             backgroundColor: '#000000',
    //             color: 'white'
    //         }
    //     })
    // };



    // if (isLoading) {
    //     return <div className="w-fit mx-auto"><span className="loading loading-spinner  w-20 text-info"></span></div>;
    // }

    return (
        <div className="max-w-screen-lg w-11/12 p-10 mx-auto shadow-2xl border-2 border-black rounded-lg">
            <h1 className="font-bold text-xl text-center">Submit Article</h1>
            <form className="mt-5 ">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" placeholder="Article title" className="input input-bordered rounded-md" required />
                </div>
                <div className='flex justify-between gap-10 mt-2'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Tags</span>
                        </label>
                        <Select isMulti options={options} />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Publishers</span>
                        </label>
                        <Select options={publisherOptions} className=" " />
                    </div>
                </div>
                <div className="form-control my-3">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input type="text" placeholder="Short description" className="input input-bordered rounded-md" required />
                </div>
                <div className="form-control my-3">
                    <label className="label">
                        <span className="label-text">Article</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="Write the article"></textarea>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-black text-white">Login</button>
                </div>
            </form>
        </div>
    );
};

export default AddArticle;