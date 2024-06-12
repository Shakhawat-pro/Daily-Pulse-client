import { Chart } from "react-google-charts";
import useArticles from "../../../hooks/useArticles";

const PieChart = () => {
    const [articles, isLoading] = useArticles()

    if (isLoading) {
        return <div>Loading...</div>;
    }


    const publisherCounts = articles.reduce((acc, article) => {
        acc[article.publisher] = (acc[article.publisher] || 0) + 1;
        return acc;
    }, {});
    const pieChartData = Object.entries(publisherCounts).map(([publisher, count]) => {
        return [publisher, count];
    });

    pieChartData.sort((a, b) => b[1] - a[1]);

    const totalArticles = articles.length;

    const pieChartDataWithPercentage = pieChartData.map(([publisher, count]) => {
        const percentage = ((count / totalArticles) * 100).toFixed(2);
        return [`${publisher} (${percentage}%)`, count];
    });


    return (
        <div>
            <Chart
                width={"100%"}
                height={"400px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[["Publisher", "Number of Articles"], ...pieChartDataWithPercentage]}
                options={{
                    title: "Publisher Distribution",
                    pieHole: 0.4,
                }}
            />
        </div>
    );
};

export default PieChart;