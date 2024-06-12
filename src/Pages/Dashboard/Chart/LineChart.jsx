import { Chart } from "react-google-charts";
import useArticles from "../../../hooks/useArticles";

const LineChart = () => {
  const [articles] = useArticles();

  if (!articles) {
    return <div>Loading...</div>;
  }

  const viewsByDate = articles.reduce((acc, article) => {
    const date = new Date(article.postedDate).toLocaleDateString();
    acc[date] = (acc[date] || 0) + article.views;
    return acc;
  }, {});
  const lineChartData = [["Date", "Views"], ...Object.entries(viewsByDate).map(([date, views]) => [date, views])];

  
  return (
    <div>
      <h2>Article Views Over Time</h2>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={lineChartData}
        options={{
          title: "Article Views Over Time",
          hAxis: { title: "Date" },
          vAxis: { title: "Views" },
        }}
      />
    </div>
  );
};

export default LineChart;
