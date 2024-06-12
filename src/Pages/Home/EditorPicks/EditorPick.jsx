import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"
import PropTypes from 'prop-types';
import { FaRegUser } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useEditorArticles from "../../../hooks/useEditorArticles";

const EditorPick = () => {
    const [editorArticles, isLoading] = useEditorArticles()
    const navigate = useNavigate()
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

    const handleClick = (id) => {
        navigate(`/soloArticle/${id}`)
    }

    if (isLoading) {
        return <div className="w-fit mx-auto"><span className="loading loading-spinner  w-20 text-info"></span></div>;
    }

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };




    return (
        <div>
            <h1 className="text-4xl font-bold text-center font-serif my-10">Editor Picks</h1>
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    {
                        editorArticles.slice(0, 6).map((article, index) => (
                            <div key={article._id} onClick={() => handleClick(article._id)} className={` relative cursor-pointer keen-slider__slide number-slide${index + 1}`}>
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

export default EditorPick;

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
}