import useArticles from "../../hooks/useArticles";
import premiumImg from "../../assets/premium.png"
import usePremium from "../../hooks/usePremium";
import { FaRegUser } from "react-icons/fa";

const AllArticles = () => {
    const [articles,] = useArticles()
    const [isUserPremium,] = usePremium()
    console.log(isUserPremium);
    // console.log(isLoading);
    return (
        <div className="w-11/12 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-10 ">
                {articles.map(article => (
                    <div key={article._id} className={`card h-[550px]   bg-base-100 shadow-2xl mx-auto`}>
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
                                <button disabled={article.isPremium && !isUserPremium} className="btn bg-black text-white">Read Article</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AllArticles;