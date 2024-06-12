import { Helmet } from "react-helmet-async";
import BarChart from "./Chart/BarChart";
import LineChart from "./Chart/LineChart";
import PieChart from "./Chart/PieChart";

const AdminHome = () => {
    return (
        <div className="w-11/12 mx-auto my-16">
            <Helmet>
                <title>DailyPulse | Admin Home</title>
            </Helmet>
            <h1 className="text-4xl font-bold font-serif text-center">Statistics</h1>
            <PieChart></PieChart>
            <BarChart></BarChart>
            <LineChart></LineChart>
        </div>
    );
};

export default AdminHome;