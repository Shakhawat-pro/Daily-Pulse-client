import Lottie from "lottie-react";
import welcome from '../../assets/welcome.json'
import Social from "../Social/Social";

const Login = () => {
    return (
        <div className="sm:h-[600px] w-11/12 max-w-screen-lg mx-auto shadow-2xl flex flex-col sm:flex-row items-center " >
            <div className="bg-black h-full sm:w-1/2 flex flex-col justify-center items-center max-sm:py-5" >
                <h1 className="text-white font-bold font-serif text-4xl">Welcome Back!</h1>
                <Lottie animationData={welcome} loop={true} />;
            </div>
            <div className="sm:w-1/2 sm:p-10  max-sm:mt-4">
                <h1 className="font-bold text-xl">Login Now</h1>
                <p className="text-sm mt-1">Don`t have an account? <span className="underline font-bold">Create Now</span> </p>
                <form className="mt-5 ">
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
                        <button className="btn bg-black text-white">Login</button>
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

export default Login;