import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://medi-camp-server-ten.vercel.app',
});





const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;