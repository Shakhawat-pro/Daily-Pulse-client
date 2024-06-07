import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePublishers = () => {
    const axiosPublic = useAxiosPublic()
    const {data: publishers = [], isLoading} = useQuery({
        queryKey:['publishers'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/publishers')
            return res.data
        }
    })
    return [publishers, isLoading]
};

export default usePublishers;