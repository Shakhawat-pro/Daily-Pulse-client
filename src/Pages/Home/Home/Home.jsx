// import useArticles from "../../../hooks/useArticles";

import TrendingArticle from "../TrendingArticle/TrendingArticle";




const Home = () => {
    // const articles = useArticles()  
    // // console.log(articles);


    return (
        <div className="w-11/12 mx-auto">
            <TrendingArticle></TrendingArticle>            
        </div>
    );
};

export default Home;