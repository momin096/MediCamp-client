import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut, setLoading } = useAuth();
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log(token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error)
    })


    // intercepts 401 & 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;

        // console.log('status error in the interceptor ->>>', status);
        if (status === 401 || status === 403) {
            // logout the user and navigate to login
            await logOut()
            navigate('/login');
            setLoading(false)

        }
        return Promise.reject(error)
    }

    )
    return axiosSecure;
};
export default useAxiosSecure
