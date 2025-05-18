import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loading from '../components/Loading/Loading'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    console.log('user', user);

    if (loading && !user) return <Loading />

    return children
}


export default PrivateRoute