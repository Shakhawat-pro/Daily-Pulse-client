import useArticles from "../../hooks/useArticles";
import premiumImg from "../../assets/premium.png"
import usePremium from "../../hooks/usePremium";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import Select from 'react-select';
import usePublishers from "../../hooks/usePublishers";
import { useNavigate } from "react-router-dom";

const tagOptions = [
    { value: 'news', label: 'News' },
    { value: 'sports', label: 'Sports' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'technology', label: 'Technology' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
    { value: 'politics', label: 'Politics' },
    { value: 'business', label: 'Business' },
    { value: 'education', label: 'Education' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'environment', label: 'Environment' },
    { value: 'culture', label: 'Culture' }
];

const AllArticles = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [publishers] = usePublishers();
    const [isUserPremium,] = usePremium()
    const [articles, isLoading] = useArticles(searchTerm, selectedPublisher, selectedTags);
    const navigate = useNavigate()
    // console.log(isUserPremium);

    // console.log(isLoading);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePublisherChange = (selectedOption) => {
        setSelectedPublisher(selectedOption ? selectedOption.value : '');
    };

    const handleTagsChange = (selectedOptions) => {
        const tags = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedTags(tags);
    };

    const handleClick = (id) => {
        navigate(`/soloArticle/${id}`)
    }

    return (
        <div className="w-11/12 max-w-screen-xl mx-auto">
            <h1 className="text-5xl  font-bold font-serif text-center">All articles</h1>
            <div className=" border-2 my-10 border-black shadow-xl rounded-xl p-10">
                <h1 className="text-xl font-bold text-center">Find what you need?</h1>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center my-5">

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Search</span>
                        </div>
                        <input type="text" placeholder="Search by title" value={searchTerm} onChange={handleSearch} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Search</span>
                        </div>
                        <Select
                            options={publishers.map(pub => ({ value: pub.name, label: pub.name }))}
                            isClearable
                            onChange={handlePublisherChange}
                            placeholder="Filter by publisher"
                            className="mb-4 md:mb-0 md:ml-4 z-50"
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Search</span>
                        </div>
                        <Select
                            options={tagOptions}
                            isMulti
                            onChange={handleTagsChange}
                            placeholder="Filter by tags"
                            className="mb-4 md:mb-0 md:ml-4"
                        />
                    </label>


                </div>
            </div>
            {
                isLoading ? (
                    <div className="text-center flex justify-center items-center">
                        <span className="loading text-black loading-infinity w-32"></span>
                    </div>
                ) : (
                    articles.length === 0 ? (
                        <div className="text-center my-10">
                            <h2 className="text-2xl">No Articles Found</h2>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-10">
                            {articles.map(article => (
                                <div key={article._id} className={`card h-[550px] bg-base-100 shadow-2xl mx-auto`}>
                                    <figure className="h-[250px] relative">
                                        <img className="h-full w-full object-cover" src={article.image} alt="Article" />
                                        {article.isPremium && (
                                            <>
                                                <img className="absolute w-20 top-3 right-3" src={premiumImg} alt="Premium" />
                                                <h1 className="absolute top-2 left-2 bg-white text-black py-2 rounded-lg border-2 border-black px-3">Premium Article</h1>
                                            </>
                                        )}
                                    </figure>
                                    <div className="card-body pb-5 relative">
                                        <div className="avatar absolute -top-12 right-5 z-[1000]">
                                            <div className="w-20 rounded-full">
                                                <img className="object-top" src={article.author.photo} alt="Author" />
                                            </div>
                                        </div>
                                        <div>
                                            {article.tags.slice(0, 3).map((tag, index) => (
                                                <div key={index} className="badge mr-1">{tag}</div>
                                            ))}
                                        </div>
                                        <h2 className="card-title">{article.title}</h2>
                                        <p>{article.description}</p>
                                        <div className="divider mb-0 divider-neutral"></div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="flex items-center gap-2"><FaRegUser />{article.views}</p>
                                                <p><span className="font-semibold">Publisher:</span> {article.publisher}</p>
                                            </div>
                                            <button onClick={() => handleClick(article._id)}
                                                disabled={article.isPremium && !isUserPremium} 
                                                className="btn bg-black text-white"
                                            >
                                                Read Article
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )
            }
        </div>

    );
};

export default AllArticles;