import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCalendarAlt, FaUserMd, FaUsers, FaUsersCog } from "react-icons/fa";
import { HiOutlineMapPin } from "react-icons/hi2";
import { Link } from "react-router-dom";

const PopularCamps = () => {
    const axiosSecure = useAxiosSecure()
    const { data: populars = [], isLoading } = useQuery({
        queryKey: ['popular'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/top-camps')
            return data
        }
    })

    console.log(populars);
    return (
        <div className="container mx-auto p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10">
                {
                    populars.map((camp) => (
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
                                    <FaUsersCog />
                                    <span>{camp.participants} participants</span>
                                </div>

                                <p className="text-gray-700 text-sm mt-3">
                                    {camp.description.length > 120
                                        ? camp.description.slice(0, 120) + "..."
                                        : camp.description}
                                </p>

                                <div className="mt-4">
                                    <Link to={`/camp-details/${camp._id}`}>
                                        <button className="btn btn-primary w-full">Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default PopularCamps;