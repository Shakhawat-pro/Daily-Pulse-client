import { FaRegUser } from "react-icons/fa";
import usePremiumArticles from "../../hooks/usePremiumArticles";
import premiumImg from "../../assets/premium.png"
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PremiumArticles = () => {
    const [premiumArticles, isLoading] = usePremiumArticles()
    const navigate = useNavigate()


    const handleClick = (id) => {
        navigate(`/soloArticle/${id}`)
    }

    if (isLoading) {
        return <div className="text-center  flex justify-center items-center"><span className="loading text-black loading-infinity w-32"></span></div>
    }


    return (
        <div className="w-11/12 max-w-screen-xl mx-auto">
            <Helmet>
                <title>DailyPulse | Premium Articles</title>
            </Helmet>
            <h1 className="text-3xl text-center font-bold my-1">Premium Articles</h1>
            <p className="text-center">Enjoy your times while reading</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-10">
                {premiumArticles.map(article => (
                    <div key={article._id} className={` max-w-[400px] card h-[550px] mt-10  bg-base-100 shadow-2xl mx-auto`}>
                        <figure className="h-[250px] relative">
                            <img className="h-full w-full" src={article.image} alt="Shoes" />
                            {article.isPremium && <img className="absolute w-20 top-3 right-3" src={premiumImg} alt="" />}
                            {article.isPremium && <h1 className="absolute top-2 left-2 bg-white text-black py-2 rounded-lg border-2 border-black px-3 p">Premium Article</h1>}
                        </figure>
                        <div className="card-body pb-5 relative">
                            <div className="avatar absolute -top-12 right-5 z-[1000]  ">
                                <div className="w-20 rounded-full">
                                    <img className="object-top" src={article.author.photo} />
                                </div>
                            </div>
                            <div>
                                {article.tags[0] && <div className="badge">{article.tags[0]}</div>}
                                {article.tags[1] && <div className="badge">{article.tags[1]}</div>}
                                {article.tags[2] && <div className="badge">{article.tags[2]}</div>}
                            </div>
                            <h2 className={`card-title`}>{article.title}</h2>
                            <p>{article.description}</p>
                            <div className="divider mb-0 divider-neutral"></div>
                            <div className="flex  justify-between items-center">
                                <div>
                                    <p className="flex items-center gap-2"><FaRegUser />{article.views}</p>
                                    <p><span className="font-semibold">Publisher:</span> {article.publisher}</p>
                                </div>
                                <button onClick={() => handleClick(article._id)} className="btn bg-black text-white">Read Article</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumArticles;