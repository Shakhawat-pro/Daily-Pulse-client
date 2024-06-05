import Lottie from "lottie-react";
import welcome from '../../assets/welcome.json'
import Social from "../Social/Social";

const Register = () => {
    return (
        <div className="h-[700px] w-11/12 max-w-screen-lg mx-auto shadow-2xl flex items-center " >
            <div className="bg-black h-full w-1/2 flex flex-col justify-center  items-center" >
                <h1 className="text-white font-bold font-serif text-4xl">Join Us Today!</h1>
                <Lottie animationData={welcome} loop={true} />;
            </div>
            <div className="w-1/2 p-10 ">
                <h1 className="font-bold text-xl">Register Now</h1>
                <p className="text-sm mt-1">If you`re already a member, <span className="underline font-bold">Log in here</span> </p>
                <form className="mt-5 ">
                    <div className="form-control">
                        <div className="label">
                            <span className="label-text">Image</span>
                        </div>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="example@gmail.com" className="input input-bordered" required />
                    </div>
                    <div className="form-control my-3">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-black text-white">Register</button>
                    </div>
                </form>
                <div className="divider"> OR</div>
                <div className="">
                    <Social></Social>
                </div>
            </div>
        </div>
    );
};

export default Register;