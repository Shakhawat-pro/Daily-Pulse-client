import { useState } from "react";
import PropTypes from 'prop-types';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./pub.css"
import usePublishers from "../../../hooks/usePublishers"


const Publishers = () => {
    const [publishers, isLoading] = usePublishers()
    console.log(publishers);

    const [ setCurrentSlide] = useState(0)
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

    return ( 
        <div className="my-20">
            <h1 className="text-center font-bold font-serif text-4xl">All the Publishers</h1>
            <div className="navigation-wrapper">
                <div ref={sliderRef} id="keen" className="keen-slider">
                    {
                        publishers.map((article, ) => (
                            <div key={article._id} className={` relative cursor-pointer keen-slider__slide `}>
                                <img className="h-full object-contain " src={article?.image} alt="" />
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
                        />

                        <Arrow
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                        />
                    </>
                )}
            </div>
        </div>
    );
};


export default Publishers;

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