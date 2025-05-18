import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const Profile = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: userData, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email, // ✅ Prevent query if email is not ready
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/profile/${user.email}`);
            return data;
        }
    });

    const { name, image, email, role, _id } = userData || {}


    if (isLoading) return <Loading />


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-green-200 p-6">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
                <div className="flex flex-col items-center">
                    <img
                        src={image}
                        alt={name}
                        className="w-32 h-32 rounded-full border-4 border-green-400 object-cover"
                        referrerPolicy="no-referrer"
                    />
                    <p className="bg-green-200 px-3 py-1 font-bold rounded-lg text-gray-500 mt-2">{role}</p>
                    <h2 className="text-2xl font-bold mt-4">{name}</h2>
                    <p className="text-gray-600">{email}</p>
                    <Link to={`/dashboard/update-profile/${email}`} className="btn btn-info text-white mt-5">Update Profile</Link>
                </div>


            </div>
        </div>
    );
};

export default Profile;
