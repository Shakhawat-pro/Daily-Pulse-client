import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const usePremium = () => {
    const axiosSecure = useAxiosSecure()
    const {user, loading} = useContext(AuthContext)
    const {data: isUserPremium, isLoading} = useQuery({
        queryKey:['isUserPremium', user?.email],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/isPremium/${user.email}`)
            return res.data?.isUserPremium
        },

    })
    return [isUserPremium, isLoading]
};

export default usePremium;