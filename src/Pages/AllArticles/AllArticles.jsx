import useArticles from "../../hooks/useArticles";
import premiumImg from "../../assets/premium.png"

const AllArticles = () => {
    const [articles, isLoading] = useArticles()
    console.log(isLoading);
    return (
        <div className="w-11/12 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-10 ">
                {articles.map(article => (
                    <div key={article._id} className="card h-[550px] w-96 bg-base-100 shadow-2xl mx-auto">
                        <figure className="h-[250px] relative">
                            <img className="h-full w-full" src={article.image} alt="Shoes" />
                            {article.isPremium && <img className="absolute w-20 top-3 right-3" src={premiumImg} alt="" />}
                        </figure>
                        <div className="card-body relative">
                            <div className="avatar absolute -top-12 right-5 z-[1000]  ">
                                <div className="w-20 rounded-full">
                                    <img className="object-top" src={article.author.photo} />
                                </div>
                            </div>
                            <h2 className="card-title mt-5">{article.title}</h2>
                            <p>{article.description}</p>
                            
                            <div className="card-actions justify-end">
                                <button className="btn bg-black text-white">Read Article</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AllArticles;