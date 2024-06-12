import Chart from "react-google-charts";
import useUserCount from "../../../hooks/useUserCount";

const BarChart = () => {
    const userCounts = useUserCount();

    if (!userCounts) {
        return <div>Loading...</div>;
    }

    const { totalUsers, premiumUsers, nonPremiumUsers } = userCounts;


    const barChartData = [
        ["User Type", "Count"],
        ["Total Users", totalUsers],
        ["Premium Users", premiumUsers],
        ["Non-Premium Users", nonPremiumUsers],
    ];

    return (
        <div>
            <h3 className="text-3xl font-bold text-center">User Distribution</h3>
            <Chart
                width={"100%"}
                height={"300px"}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={barChartData}
                options={{
                    title: "User Distribution",
                    chartArea: { width: "50%" },
                    hAxis: {
                        title: "Count",
                        minValue: 0,
                    },
                    vAxis: {
                        title: "User Type",
                    },
                }}
            />
        </div>
    );
};

export default BarChart;