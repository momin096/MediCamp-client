import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageCamp = () => {
    const axiosSecure = useAxiosSecure()
    const { data: camps = [] } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/camps`)
            return data
        }
    })



    return (
        <div>
            <div className="p-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-6">
                    Manage Camps
                </h2>

                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gradient-to-r from-teal-200 to-purple-300 text-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Date & Time</th>
                                <th className="px-6 py-3 text-left">Location</th>
                                <th className="px-6 py-3 text-left">Healthcare Professional</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {camps.map((camp) => (
                                <tr key={camp._id} className="border-t border-gray-400 hover:bg-gray-50/80 transition">
                                    <td className="px-6 py-4">{camp.campName}</td>
                                    <td className="px-6 py-4">{camp.dateTime}</td>
                                    <td className="px-6 py-4">{camp.location}</td>
                                    <td className="px-6 py-4">{camp.healthCare}</td>
                                    <td className="px-6 py-4 text-center space-x-4">
                                        <button className="text-green-500 hover:text-green-700 transition">
                                            <FaEdit size={22} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 transition">
                                            <FaTrash size={22} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManageCamp;