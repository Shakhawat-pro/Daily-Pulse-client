import CountUp from "react-countup";
import { LiaUserSolid } from "react-icons/lia";
import { PiUserGearBold, PiUsersThreeLight } from "react-icons/pi";
import useUserCount from "../../../hooks/useUserCount";

const UserCount = () => {
    const users = useUserCount()
    console.log(users);
    return (
        <div className=" my-10">
            <h1 className="text-center text-4xl font-bold font-serif mb-5">User Count</h1>
            <div className="border-2 border-black flex  max-w-[600px] w-full max-[620px]:flex-col flex-row  text-center  lg:stats-horizontal shadow mx-auto">
                <div className="stat border-2">
                    <div className="stat-title text-black">Total Users</div>
                    <div className="stat-value flex items-center justify-center gap-2"><PiUsersThreeLight/>  <CountUp end={users?.totalUsers} duration={5} ></CountUp></div>
                </div>

                <div className="stat border-2">
                    <div className="stat-title text-black">Normal Users</div>
                    <div className="stat-value flex items-center justify-center gap-2"><LiaUserSolid /><CountUp end={users?.nonPremiumUsers} duration={5} ></CountUp></div>
                </div>

                <div className="stat border-2">
                    <div className="stat-title text-black">Premium Users</div>
                    <div className="stat-value flex items-center justify-center gap-2"><PiUserGearBold /><CountUp end={users?.premiumUsers} duration={5} ></CountUp></div>
                </div>

            </div>
          
        </div>
    );
};

export default UserCount;