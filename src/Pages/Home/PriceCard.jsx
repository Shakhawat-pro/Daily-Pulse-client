import { useNavigate } from "react-router-dom";

const PriceCard = () => {
    const navigate = useNavigate()

    const handleSubscribeClick = () => {
        navigate(`/subscription`)
    }


    return (
        <div className="mt-10">
            <h1 className="text-4xl text-center font-bold font-serif">Premium Subscription</h1>
            <div className="mt-10 flex flex-wrap ">
                <div className="border-2 border-black p-5 h-[250px] mx-auto max-w-[350px] flex flex-col justify-between rounded-lg">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Normal User</h1>
                        <p className="text-2xl font-bold">Free</p>
                    </div>
                    <div>
                        <ul className="list-disc ml-7">
                            <li>Publish 1 Article</li>
                            <li>Can read non Premium Articles</li>
                        </ul>
                    </div>
                    <button onClick={handleSubscribeClick} className="btn btn-wide bg-black text-white">Try our subscription</button>
                </div>
                <div className="border-2 border-black p-5 h-[250px] max-[650px]:mt-5 mx-auto max-w-[350px] flex flex-col justify-between rounded-lg">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Premium</h1>
                        <div className="text-end">
                            <p className="text-2xl font-bold">$ 10</p>
                            <p className="">5 Days</p>
                        </div>
                    </div>
                    <div>
                        <ul className="list-disc ml-7">
                            <li>Publish Unlimited Article</li>
                            <li>Can read All Premium Articles</li>
                        </ul>
                    </div>
                    <button onClick={handleSubscribeClick} className="btn btn-wide bg-black text-white">Subscribe for $10</button>
                </div>
                <div className="border-2 border-black p-5 h-[250px] max-[980px]:mt-5 mx-auto max-w-[350px] flex flex-col justify-between rounded-lg">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Ultra Premium</h1>
                        <div className="text-end">
                            <p className="text-2xl font-bold">$ 20</p>
                            <p className="">10 Days</p>
                        </div>
                    </div>
                    <div>
                        <ul className="list-disc ml-7">
                            <li>Publish Unlimited Article</li>
                            <li>Can read All Premium Articles</li>
                        </ul>
                    </div>
                    <button onClick={handleSubscribeClick} className="btn btn-wide bg-black text-white">Subscribe for $20</button>
                </div>
            </div>
        </div>

    );
};

export default PriceCard;