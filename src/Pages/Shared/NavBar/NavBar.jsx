import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import './nav.css'
import { RiMenu2Fill } from "react-icons/ri";
import { AuthContext } from "../../../Context/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import usePremium from "../../../hooks/usePremium";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isUserPremium] = usePremium()
    const [isAdmin] = useAdmin()
    // console.log(isUserPremium);
    // console.log(user);
    const [time, setTime] = useState(new Date());
    const [hours, setHours] = useState(time.getHours());
    const [minutes, setMinutes] = useState(time.getMinutes());
    const [seconds, setSeconds] = useState(time.getSeconds());
    const [date, setDate] = useState(time.getDate());
    const [month, setMonth] = useState(time.toLocaleString('default', { month: 'long' }));
    const [year, setYear] = useState(time.getFullYear());

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            setTime(currentTime);
            setHours(currentTime.getHours());
            setMinutes(currentTime.getMinutes());
            setSeconds(currentTime.getSeconds());
            setDate(currentTime.getDate());
            setMonth(currentTime.toLocaleString('default', { month: 'long' }));
            setYear(currentTime.getFullYear());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const navOption = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'addArticle'}>Add Articles</NavLink></li>
        <li><NavLink to={'allArticles'}> All Articles</NavLink></li>
        {user && <li><NavLink to={'myArticles'}> My Articles</NavLink></li>}
        {isUserPremium && user && <li><NavLink to={'premiumArticles'}> Premium Articles</NavLink></li>}
        {user && <li><NavLink to={'subscription'}>Subscription</NavLink></li>}
        {isAdmin && user && <li><NavLink to={'dashboard'}>Dashboard</NavLink></li>}
    </>



    return (
        <div className="mb-8">
            <div className="navbar md:w-11/12 mx-auto flex items-center py-4 ">
                <div className="navbar-start max-[550px]:hidden">
                    <div className="grid grid-flow-col gap-0 md:gap-2 text-center auto-cols-max">
                        <div className="flex flex-col p-2">
                            <span className="countdown font-mono text-[#3B82F6] md:text-4xl">
                                <span style={{ "--value": hours }}></span>
                            </span>
                            Hour
                        </div>
                        <div className="flex flex-col p-2 ">
                            <span className="countdown font-mono  text-[#3B82F6] md:text-4xl">
                                <span style={{ "--value": minutes }}></span>
                            </span>
                            Min
                        </div><div className="flex flex-col p-2">
                            <span className="countdown font-mono text-[#3B82F6] md:text-4xl">
                                <span style={{ "--value": seconds }}></span>
                            </span>
                            Sec
                        </div>
                    </div>
                </div>
                <div className="navbar-center flex flex-col  max-[550px]:items-start space-y-2">
                    <Link to={'/'} className=" max-[410px]:text-4xl text-5xl font-bold text-[#0061ff] gradient-text tracking-widest playfair font-serif "> Daily Pulse</Link>
                    <h1 className="font-semibold pl-1">{month} {date}, {year} </h1>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="dropdown dropdown-end cursor-pointer">
                                <div tabIndex={0} role="button" className="avatar border-2 rounded-full border-[#3B82F6]">
                                    <div className="w-14 min-[350px]:w-16 rounded-full">
                                        <img className=" object-left-top" src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black  border-2 py-5">
                                    <li><Link to="updateProfile" className="text-xl font-semibold">Profile</Link></li>
                                    <li onClick={logOut}><p className="text-xl font-semibold">Logout</p></li>
                                </ul>
                            </div> :
                            <div className=" max-[550px]:hidden  gap-2 flex flex-col sm:flex-row">
                                <Link to={'/login'} className="btn w-20 bg-transparent border-2 border-black hover:bg-transparent hover:border-[#3B82F6] hover:text-[#3B82F6]">Login</Link>
                                <Link to={'/register'} className="btn w-20 bg-transparent border-2 border-black hover:bg-transparent hover:border-[#3B82F6] hover:text-[#3B82F6]">Register</Link>
                            </div>
                    }
                </div>
            </div>
            <div className="navbar bg-black text-white flex justify-between">
                <ul className="max-[950px]:hidden menu-horizontal text-lg mx-auto font-medium gap-4 sm:gap-12 px-1 ">
                    {navOption}
                </ul>
                {/* dropdown */}
                <div className="dropdown min-[950px]:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost border-2 ">
                        <RiMenu2Fill className="text-3xl" />
                    </div>
                    <ul tabIndex={0} className="menu menu-lg dropdown-content mt-3 z-30 p-2 text-black shadow bg-base-100 rounded-box w-52">
                        {navOption}
                    </ul>
                </div>
                {/* clock*/}
                <div className="grid-flow-col  gap-0 md:gap-2  auto-cols-max text-lg min-[950px]:hidden">
                    Time :
                    <div className="flex flex-col p-2">
                        <span className="countdown font-mono text-white">
                            <span style={{ "--value": hours }}></span>
                        </span>
                    </div>
                    :
                    <div className="flex flex-col p-2 ">
                        <span className="countdown font-mono  text-white ">
                            <span style={{ "--value": minutes }}></span>
                        </span>
                    </div>
                    <span className="max-[324px]:hidden">:</span>
                    <div className="flex flex-col max-[324px]:hidden p-2">
                        <span className="countdown font-mono text-white ">
                            <span style={{ "--value": seconds }}></span>
                        </span>
                    </div>
                </div>
                {/* Login */}
                {
                    !user && 
                    <div className=" min-[550px]:hidden flex ml-5   ">
                        <Link to={'/login'} className="bg-transparent border-2 border-white py-2 px-2 text-white rounded-md">Login</Link>
                    </div>
                }

            </div>
        </div>
    );
};

export default NavBar;

