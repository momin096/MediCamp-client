import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaTimes } from "react-icons/fa";

const AllRegisteredCamps = () => {
    const axiosSecure = useAxiosSecure()

    const { data: camps =[] } = useQuery({
        queryKey: ['registered-camp'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/registered-camps`)
            return data
        }
    })

    console.log(camps);


    return (
        <div className="h-screen flex items-center w-full justify-center bg-gray-500">
            <div className="overflow-x-auto p-4 bg-gray-900 rounded-lg">
                <table className="min-w-full text-sm text-left text-white border border-gray-700">
                    <thead className="bg-gray-800 text-white uppercase">
                        <tr>
                            <th className="px-4 py-3 border border-gray-700">Participant Name</th>
                            <th className="px-4 py-3 border border-gray-700">Camp Name</th>
                            <th className="px-4 py-3 border border-gray-700">Camp Fees</th>
                            <th className="px-4 py-3 border border-gray-700">Payment Status</th>
                            <th className="px-4 py-3 border border-gray-700">Confirmation Status</th>
                            <th className="px-4 py-3 border border-gray-700">Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((p, i) => (
                            <tr key={i} className="bg-gray-800 hover:bg-gray-700">
                                <td className="px-4 py-2 border border-gray-700">{p.participantName}</td>
                                <td className="px-4 py-2 border border-gray-700">{p.campName}</td>
                                <td className="px-4 py-2 border border-gray-700">{p.campFees}</td>
                                <td className="px-4 py-2 border border-gray-700">{p.payment}</td>
                                <td className="px-4 py-2 border border-gray-700">{ }</td>
                                <td className="px-4 py-2 border border-gray-700 text-center">
                                    {p.cancelable ? (
                                        <FaCheck className="text-green-400 text-lg" />
                                    ) : (
                                        <FaTimes className="text-red-500 text-lg" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllRegisteredCamps;