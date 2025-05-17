import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRegisteredCamp = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: camps = [] } = useQuery({
        queryKey: ['my-registered-camp', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/registered-camps?email=${user?.email}`);
            return data;
        }
    });

    return (
        <div className="min-h-screen flex justify-center items-center bg-black text-white">
            <div className="overflow-x-auto w-full max-w-7xl p-6 bg-gray-900 rounded-lg shadow-lg">
                <table className="min-w-full text-sm text-left border border-gray-700">
                    <thead className="bg-gray-800 text-white uppercase">
                        <tr>
                            <th className="px-4 py-3 border border-gray-700">Camp Name</th>
                            <th className="px-4 py-3 border border-gray-700">Camp Fees</th>
                            <th className="px-4 py-3 border border-gray-700">Participant Name</th>
                            <th className="px-4 py-3 border border-gray-700">Payment Status</th>
                            <th className="px-4 py-3 border border-gray-700">Confirmation Status</th>
                            <th className="px-4 py-3 border border-gray-700">Cancel Button</th>
                            <th className="px-4 py-3 border border-gray-700">Feedback Button</th>
                            <th className="px-4 py-3 border border-gray-700">Pay Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((p, i) => (
                            <tr key={i} className="bg-gray-800 hover:bg-gray-700">
                                <td className="px-4 py-2 border border-gray-700">{p.campName}</td>
                                <td className="px-4 py-2 border border-gray-700">${p.campFees}</td>
                                <td className="px-4 py-2 border border-gray-700">{p.participantName}</td>
                                <td className="px-4 py-2 border border-gray-700">{p.payment}</td>
                                <td className="px-4 py-2 border border-gray-700">{p.status}</td>
                                <td className="px-4 py-2 border border-gray-700">
                                    <button className="text-red-500 underline hover:text-red-400">
                                        Cancel
                                    </button>
                                </td>
                                <td className="px-4 py-2 border border-gray-700">
                                    {p.status === "Confirmed" ? (
                                        <button className="text-blue-400 underline hover:text-blue-300">
                                            Feedback
                                        </button>
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 border border-gray-700">
                                    {p.payment === "Paid" ? (
                                        <button
                                            className="px-3 py-1 bg-green-700 text-white rounded opacity-60 cursor-not-allowed"
                                            disabled
                                        >
                                            Paid
                                        </button>
                                    ) : (
                                        <button
                                            className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400"
                                            onClick={() => console.log("Pay", p._id)}
                                        >
                                            PAY
                                        </button>
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

export default MyRegisteredCamp;
