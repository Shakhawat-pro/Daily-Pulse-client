
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useEditorArticles = () => {
    const axiosPublic = useAxiosPublic()
    const { data: editorArticles = [], isLoading } = useQuery({
        queryKey: ['editorArticles',],
        queryFn: async () => {
            const res = await axiosPublic.get('/editorArticles');
            return res.data
        },
    })
    return [editorArticles, isLoading]

};

export default useEditorArticles;
