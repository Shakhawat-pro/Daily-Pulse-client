import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useArticles = () => {
    const axiosPublic = useAxiosPublic()
    const {data: articles = [], isLoading} = useQuery({
        queryKey:['articles'],
        queryFn: async()=> {
            const res = await axiosPublic.get('/articles')
            return res.data
        }
    })


    return [articles, isLoading]
};

export default useArticles;