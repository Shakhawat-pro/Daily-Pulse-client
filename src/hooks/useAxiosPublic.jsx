import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://daily-pluse-server.vercel.app'
})


const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;