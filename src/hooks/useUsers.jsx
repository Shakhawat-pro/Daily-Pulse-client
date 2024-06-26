import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUsers = (page = 1, limit = 5) => {
    const axiosSecure = useAxiosSecure();

    const fetchUsers = async () => {
        const res = await axiosSecure.get(`/users?page=${page}&limit=${limit}`);
        return res.data;
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users', page, limit],
        queryFn: fetchUsers,
        keepPreviousData: true
    });

    return {
        users: data?.users || [],
        totalUsers: data?.totalUsers || 0,
        totalPages: data?.totalPages || 0,
        currentPage: data?.currentPage || 1,
        isLoading,
        refetch
    };
};

export default useUsers;
