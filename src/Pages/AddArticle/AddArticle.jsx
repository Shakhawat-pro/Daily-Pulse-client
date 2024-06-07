
const AddArticle = () => {

    return (
        <div className="max-w-screen-lg w-11/12 p-10 mx-auto shadow-2xl border-2 border-black rounded-lg">
            <h1 className="font-bold text-xl text-center">Submit Article</h1>
            <form className="mt-5 ">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="email" placeholder="Article title" className="input input-bordered" required />
                </div>
                <div className="form-control my-3">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-black text-white">Login</button>
                </div>
            </form>
        </div>
    );
};

export default AddArticle;