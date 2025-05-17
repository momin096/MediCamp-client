import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

const MyRegisteredCamp = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: camps = [], refetch, isLoading } = useQuery({
        queryKey: ['my-registered-camp', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/registered-camps?email=${user?.email}`);
            return data;
        }
    });

    const handleCancel = (camp) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You Want to Cancel ${camp.campName} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/delete-registered-camp/${camp._id}`)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: `${camp.campName} has been deleted.!`,
                        icon: "success"
                    });
                    refetch()
                }

            }
        }); Swal.fire({
            title: "Are you sure?",
            text: `You Want to Cancel ${camp.campName} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/delete-registered-camp/${camp._id}`)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: `${camp.campName} has been deleted.!`,
                        icon: "success"
                    });
                    refetch()
                }

            }
        });
    }

    if (isLoading) return <Loading />

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 text-white">
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
                                    <button onClick={() => handleCancel(p)} disabled={p.status === 'Confirmed'} className="text-red-500 underline hover:text-red-400 disabled:cursor-not-allowed">
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
