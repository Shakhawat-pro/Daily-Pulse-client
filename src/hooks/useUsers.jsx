import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {data: users = [], isLoading, refetch} = useQuery({
        queryKey:['users'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users`)
            return res.data
        },

    })
    return [users, isLoading, refetch]
};

export default useUsers;


