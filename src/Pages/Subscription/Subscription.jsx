import { useState } from "react";
import bannerImg from "../../assets/banner.jpg";
import "./Sub.css";
import ReactModal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

ReactModal.setAppElement('#root');

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Subscription = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(0);
    const [price, setPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const subscriptionOptions = [
        { value: 1 / (24 * 60), label: '1 Minute - $1', price: 1 },
        { value: 5, label: '5 Days - $10', price: 10 },
        { value: 10, label: '10 Days - $20', price: 20 },
    ];

    const handleSubscriptionChange = (option) => {
        setSelectedPeriod(option.value);
        setPrice(option.price);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-11/12 max-w-screen-xl mx-auto ">
            <Helmet>
                <title>DailyPulse | Subscription</title>
            </Helmet>
            <div className="banner relative rounded-xl overflow-clip">
                <img src={bannerImg} alt="Banner" className="w-full h-64 object-fill" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center flex-col justify-center">
                    <h1 className="text-gradient font-serif sm:text-4xl">Welcome to Our News Platform</h1>
                    <h1 className="premium-text">Premium Subscription</h1>
                </div>
            </div>
            <div className="border-2 border-black w-fit mx-auto p-10 mt-10 rounded-lg shadow-2xl">
                <h1 className="text-center text-3xl font-bold my-5">Choose Your Subscription Plan</h1>
                <h1 className="font-bold">Benefits :</h1>
                <ul className="list-disc mx-auto ml-10">
                    <li>Premium Articles</li>
                    <li>Post Unlimited Articles</li>
                </ul>
                <div className="flex flex-col items-center mt-5">
                    <select className="select select-bordered w-full max-w-xs mb-5" value={selectedPeriod} onChange={(e) => handleSubscriptionChange(subscriptionOptions.find(opt => opt.value === parseFloat(e.target.value)))}                    >
                        <option value="" >Select Subscription Period</option>
                        {subscriptionOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <button onClick={openModal} disabled={price === 0} className="btn bg-black text-white">Subscribe for ${price}</button>
                </div>
            </div>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Subscription Modal"
                className="Modal relative"
                overlayClassName="Overlay"
            >
                <h2 className="text-2xl font-bold mb-4">Confirm Subscription</h2>
                <p>You`re subscribing for {selectedPeriod < 1 ? 1 : selectedPeriod} {selectedPeriod > 1 ? 'days' : 'Minute'} at ${price}.</p>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={price} selectedPeriod={selectedPeriod} />
                    </Elements>
                </div>
                <div className="absolute bottom-5 right-5">
                    <button className="btn bg-gray-500 text-white mt-5 ml-3" onClick={closeModal}>Cancel</button>
                </div>

            </ReactModal>
        </div>
    );
};

export default Subscription;
