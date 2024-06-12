import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllArticles = (page = 1, limit = 10) => {
    const axiosSecure = useAxiosSecure();

    const fetchArticles = async () => {
        const res = await axiosSecure.get(`/allArticles?page=${page}&limit=${limit}`);
        return res.data;
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allArticles', page, limit],
        queryFn: fetchArticles,
        keepPreviousData: true
    });

    return {
        articles: data?.articles || [],
        totalArticles: data?.totalArticles || 0,
        totalPages: data?.totalPages || 0,
        currentPage: data?.currentPage || 1,
        isLoading,
        refetch
    };
};

export default useAllArticles;
