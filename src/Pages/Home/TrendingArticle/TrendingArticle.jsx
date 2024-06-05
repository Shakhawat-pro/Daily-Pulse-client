import useArticles from "../../../hooks/useArticles";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"
import { useState } from "react";
import PropTypes from 'prop-types';



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
            "(min-width: 1000px)": {
              slides: { perView: 3, spacing: 10 },
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



    return (
        <div>
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    {
                        articles.slice(0, 6).map((article, index) => (
                            <div key={article._id} className={`relative keen-slider__slide number-slide${index + 1}`}>
                                <img className="h-full object-cover " src={article.image} alt="" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black " style={{ paddingTop: '300px' }}></div>
                                <div className="absolute p-5">
                                    <h1>{article.tags[0]}</h1>
                                    <h1 className="text-lg ">{article.title}</h1>
                                    <p className="text-sm">{formatDate(article.postedDate)}</p>
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