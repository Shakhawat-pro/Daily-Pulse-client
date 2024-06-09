import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useArticles = (search = '', publisher = '', tags = []) => {
    const axiosPublic = useAxiosPublic()
    const {data: articles = [], isLoading} = useQuery({
        queryKey:['articles', search, publisher, tags],
        queryFn: async()=> {
            const res = await axiosPublic.get('/articles', {
                params: {
                    search,
                    publisher,
                    tags: tags.join(',')
                }
            });
            return res.data
        },
        keepPreviousData: true
    })


    return [articles, isLoading]
};

export default useArticles;