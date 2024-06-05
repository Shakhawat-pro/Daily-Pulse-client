import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import './nav.css'
import { RiMenu2Fill } from "react-icons/ri";

const NavBar = () => {
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
        <li><NavLink to={'allArticle'}> All Articles</NavLink></li>
        <li><NavLink to={'subscription'}>Subscription</NavLink></li>
        <li><NavLink to={'Dashboard'}>Dashboard</NavLink></li>
    </>



    return (
        <div className="mb-10">
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
                    <Link to={'/'} className=" max-[360px]:text-4xl text-5xl font-bold text-[#0061ff] gradient-text tracking-widest playfair font-serif "> Daily Pulse</Link>
                    <h1 className="font-semibold pl-1">{month} {date}, {year} </h1>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end cursor-pointer">
                        <div tabIndex={0} role="button" className="avatar border-4 rounded-full border-[#3B82F6]">
                            <div className="w-14 min-[350px]:w-16 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black  border-2 py-5">
                            <li><p className="text-xl font-semibold">Dashboard</p></li>
                            <li><p className="text-xl font-semibold">Logout</p></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="navbar bg-[#222222] text-white">
                <ul className="max-[550px]:hidden menu-horizontal text-lg mx-auto font-medium gap-4 sm:gap-10 lg:gap-32 px-1 ">
                    {navOption}
                </ul>
                {/* dropdown */}
                <div className="dropdown min-[551px]:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost border-2 ">
                        <RiMenu2Fill className="text-3xl" />
                    </div>
                    <ul tabIndex={0} className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li className=""><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
                {/* clock*/}
                <div className="grid-flow-col  gap-0 md:gap-2  auto-cols-max text-xl min-[551px]:hidden">
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
                    :
                    <div className="flex flex-col p-2">
                        <span className="countdown font-mono text-white ">
                            <span style={{ "--value": seconds }}></span>
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NavBar;

