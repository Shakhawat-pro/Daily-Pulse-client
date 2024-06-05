import useArticles from "../../../hooks/useArticles";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"
import { useState } from "react";
import PropTypes from 'prop-types';
import Marquee from "react-fast-marquee";
import { FaRegUser } from "react-icons/fa";
import { LuDot } from "react-icons/lu";




const TrendingArticle = () => {
    const [articles, isLoading] = useArticles()
    // console.log(articles.slice(0,7));
    // console.log(isLoading);
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        breakpoints: {
            "(min-width: 500px)": {
                slides: { perView: 2, spacing: 5 },
            },
            "(min-width: 900px)": {
                slides: { perView: 4, spacing: 10 },
            },
        },
        initial: 0,
        mode: "free-snap",
        slides: {
            perView: 1,
            spacing: 15,
        },

        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    if (isLoading) {
        return <div className="w-fit mx-auto"><span className="loading loading-spinner  w-20 text-info"></span></div>;
    }

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const sortedArticles = articles.slice().sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    const latestArticle = sortedArticles.length > 0 ? sortedArticles[0] : null;



    return (
        <div>
            <div className="flex bg-[#F12D2E] mb-1 text-white overflow-hidden">
                <div className="relative">
                    <div className="text-center z-20 w-[130px] bg-[#CD1314] rounded-l-lg">
                        <h1 className="font-semibold font-serif">Latest News</h1>
                    </div>
                    <div className="absolute top-0 z-10 -right-2 h-full w-5 bg-[#CD1314] rotate-[47deg]"></div>
                </div>
                <Marquee pauseOnHover={true}>
                    {latestArticle && (
                        <div className="mr-10 z-0">
                            <h1 className="text-base">{latestArticle.description}  <span className="text-sm font-thin">{formatDate(latestArticle.postedDate)}</span>        </h1>
                        </div>
                    )}
                </Marquee>
            </div>
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    {
                        articles.slice(0, 6).map((article, index) => (
                            <div key={article._id} className={` relative keen-slider__slide number-slide${index + 1}`}>
                                <img className="h-full object-cover " src={article.image} alt="" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black " style={{ paddingTop: '300px' }}></div>
                                <div className="absolute p-5 space-y-3">
                                    <h4 className="uppercase text-sm">{article.tags[0]}</h4>
                                    <h1 className="text-lg font-semibold">{article.title}</h1>
                                    <div className="flex gap-1 items-center text-sm">
                                        <p className="">{formatDate(article.postedDate)}</p>
                                        <LuDot className="text-lg" />
                                        <p className="flex items-center gap-2"><FaRegUser />{article.views}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details.slides.length - 1
                            }
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default TrendingArticle;

function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"
                } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}

Arrow.propTypes = {
    left: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};