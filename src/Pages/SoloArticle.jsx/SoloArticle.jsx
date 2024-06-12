import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const SoloArticle = () => {
    const param = useParams()
    const axiosSecure = useAxiosSecure()
    // console.log(param.id);

    const { data: soloArticle = [], isLoading } = useQuery({
        queryKey: ['soloArticle'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myArticles/${param.id}`)
            return res.data
        }
    })
    console.log(soloArticle);
    if (isLoading) {
        return <div className="text-center flex justify-center items-center"><span className="loading text-black loading-infinity w-32"></span></div>
    }
    return (
        <div className="w-11/12 max-w-screen-lg mx-auto border-2 border-black p-5 min-[350px]:p-10 rounded-lg ">
            <Helmet>
                <title>DailyPulse | {soloArticle.title}</title>
            </Helmet>
            <div>
                <img className="rounded-lg" src={soloArticle.image} alt="" />
            </div>
            <div className="my-5 flex flex-col  sm:flex-row gap-2 justify-between sm:items-center">
                <div>
                    <h1><span className="font-semibold">Publisher:</span> {soloArticle.publisher}</h1>
                    <h1 className="flex flex-wrap items-center gap-1"><span className="font-bold">Tags:</span>
                        {soloArticle.tags.slice(0, 3).map((tag, index) => (
                            <div key={index} className="mr-1 capitalize badge badge-ghost">{tag}</div>
                        ))}
                    </h1>
                </div>
                <div className="flex min-[350px]:flex-row-reverse items-end gap-1">
                    <div className="avatar">
                        <div className="w-20 rounded-xl">
                            <img className="object-top" src={soloArticle.author.photo} />
                        </div>
                    </div>
                    <div className="min-[350px]:text-end">
                        <h1 className="font-semibold">{soloArticle.author.name}</h1>
                        <h1 className="text-gray-600 max-[350px]:text-sm">{soloArticle.author.email}</h1>
                    </div>
                </div>
            </div>
            <div className="border-b-2 border-black"></div>
            <div className="my-5">
                <h1 className="text-3xl font-bold">{soloArticle.title}</h1>
                <p className="mt-9 ">{soloArticle.content}</p>
            </div>

        </div>
    );
};

export default SoloArticle;