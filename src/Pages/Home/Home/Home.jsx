// import useArticles from "../../../hooks/useArticles";

import { Helmet } from "react-helmet-async";
import TrendingArticle from "../TrendingArticle/TrendingArticle";




const Home = () => {
    // const articles = useArticles()  
    // // console.log(articles);


    return (
        <div className="max-w-screen-xl w-11/12 mx-auto">
            <Helmet>
                <title>DailyPulse | Home</title>
            </Helmet>
            <TrendingArticle></TrendingArticle>
        </div>
    );
};

export default Home;