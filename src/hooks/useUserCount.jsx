import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUserCount = () => {
    const axiosPublic = useAxiosPublic()
    const {data: userCounts} = useQuery({
        queryKey: ['userCounts'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/userCount')
            return res.data
        }
    })
    return userCounts
};

export default useUserCount;