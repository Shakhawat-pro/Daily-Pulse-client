import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePremiumArticles = () => {
    const axiosSecure = useAxiosSecure()
    const {data : premiumArticles = [], isLoading} = useQuery({
        queryKey: ['premiumArticles'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/premiumArticles')
            return res.data
        }
    })
    return [premiumArticles, isLoading]
};

export default usePremiumArticles;