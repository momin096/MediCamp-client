import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'

export const axiosSecure = axios.create({
    baseURL: 'https://medi-camp-server-ten.vercel.app',
    withCredentials: true,
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useAuth()

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
            res => res,
            async error => {
                console.log('Error caught from axios interceptor-->', error.response)
                if (error.response?.status === 401 || error.response?.status === 403) {
                    await logOut()
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosSecure.interceptors.response.eject(interceptor)
        }
    }, [logOut, navigate])

    return axiosSecure
}

export default useAxiosSecure
