// import useArticles from "../../../hooks/useArticles";

import { Helmet } from "react-helmet-async";
import TrendingArticle from "../TrendingArticle/TrendingArticle";
import ReactModal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import PriceCard from "../PriceCard";
import UserCount from "../TrendingArticle/UserCount";
import Publishers from "../Publishers/Publishers";
import EditorPick from "../EditorPicks/EditorPick";
import NewsLetter from "../NewsLetter";




const Home = () => {
    const { isPremiumTaken } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    // console.log("is premium",isPremiumTaken);

    useEffect(() => {
        if (!isPremiumTaken) {
            const timer = setTimeout(() => {
                setIsModalOpen(true);
            }, 10000); // 10 seconds

            return () => clearTimeout(timer);
        }
    }, [isPremiumTaken]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubscribeClick = () => {
        closeModal();
        navigate("/subscription");
    };



    return (
        <div className="max-w-screen-xl w-11/12 mx-auto">
            <Helmet>
                <title>DailyPulse | Home</title>
            </Helmet>
            <TrendingArticle></TrendingArticle>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Subscription Modal"
                className="Modal relative"
                overlayClassName="Overlay"
            >
                <h2 className="text-2xl font-bold mb-4">Get Premium Access</h2>
                <p>Subscribe now to access premium articles and post unlimited articles.</p>
                <div className="flex justify-end mt-5">
                    <button className="btn bg-black text-white" onClick={handleSubscribeClick}>Subscribe Now</button>
                </div>
            </ReactModal>
            <PriceCard></PriceCard>
            <UserCount></UserCount>
            <Publishers></Publishers>
            <EditorPick></EditorPick>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;