import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaClock, FaUserMd, FaUsers } from "react-icons/fa";
import { HiOutlineMapPin } from "react-icons/hi2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

const AvailableCamps = () => {
    const axiosSecure = useAxiosSecure();

    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['availableCamps'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/camps');
            return data;
        }
    });

    if (isLoading) return <Loading />

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-yellow-100 p-6">
            <h2 className="text-4xl font-bold text-center text-primary mb-10 drop-shadow-md">
                Explore Available Medical Camps
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {camps.map((camp) => (
                    <div
                        key={camp._id}
                        className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden"
                    >
                        <figure className="h-52">
                            <img
                                src={camp.image}
                                alt={camp.campName}
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body space-y-2">
                            <h3 className="text-2xl font-semibold text-primary">{camp.campName}</h3>

                            <div className="flex items-center gap-2 text-gray-600">
                                <FaCalendarAlt />
                                <span>{camp.dateTime}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <HiOutlineMapPin />
                                <span>{camp.location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <FaUserMd />
                                <span>{camp.healthCare}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <FaUsers />
                                <span>{camp.participants} participants</span>
                            </div>

                            <p className="text-gray-700 text-sm mt-3">
                                {camp.description.length > 120
                                    ? camp.description.slice(0, 120) + "..."
                                    : camp.description}
                            </p>

                            <div className="mt-4">
                                <Link to={`/camp-details/${camp._id}`} className="btn btn-outline btn-primary w-full">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableCamps;
