import { Navigate } from "react-router-dom"
import useRole from "../hooks/useRole"
import Loading from "../components/Loading/Loading"

const OrganizerRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <Loading />
    if (role !== 'Organizer') return <Navigate to={'/'} />
    return children
}

export default OrganizerRoute;