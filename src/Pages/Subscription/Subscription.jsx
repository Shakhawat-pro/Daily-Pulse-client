import { useState } from "react";
import bannerImg from "../../assets/banner.jpg"
import "./Sub.css"
const Subscription = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [price, setPrice] = useState(0);

    const subscriptionOptions = [
        { value: '1 minute', label: '1 Minute - $1', price: 1 },
        { value: '5 days', label: '5 Days - $10', price: 10 },
        { value: '10 days', label: '10 Days - $20', price: 20 },
    ];

    const handleSubscriptionChange = (option) => {
        setSelectedPeriod(option.value);
        setPrice(option.price);
    };

    return (
        <div className="w-11/12 max-w-screen-xl mx-auto ">
            <div className="banner relative rounded-xl overflow-clip">
                <img src={bannerImg} alt="Banner" className="w-full h-64 object-fill" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center flex-col justify-center">
                    <h1 className=" text-gradient font-serif sm:text-4xl">Welcome to Our News Platform</h1>
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
                    <select className="select select-bordered w-full max-w-xs mb-5" value={selectedPeriod} onChange={(e) => handleSubscriptionChange(subscriptionOptions.find(opt => opt.value === e.target.value))}                    >
                        <option value="" disabled>Select Subscription Period</option>
                        {subscriptionOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <button className="btn bg-black text-white">Subscribe for ${price}</button>
                </div>
            </div>

        </div>
    );
};

export default Subscription;