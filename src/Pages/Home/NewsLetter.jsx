import { useState } from "react";
import bannerImg from "../../assets/banner.jpg";

const NewsLetter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        setEmail("");
    };

    return (
        <div className="relative h-[250px] my-20 rounded-lg flex items-center justify-center" style={{ background: `url(${bannerImg})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <div className="relative z-10 text-white text-center space-y-5">
                <h1 className="text-2xl">Stay Tuned</h1>
                <p>Receive regular updates on our latest news</p>
                <div className="join">
                    <input type="text" placeholder="username@site.com" className="input input-bordered join-item text-black" value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="btn btn-primary join-item" onClick={handleSubscribe}>
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;
