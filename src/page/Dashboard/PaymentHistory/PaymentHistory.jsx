import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: history = [], isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payment-history?email=${user?.email}`);
            return data;
        }
    });


    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800">
            <div className="overflow-x-auto w-full max-w-5xl p-6 bg-white rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-center">My Camp Payment History</h2>
                <table className="min-w-full  text-sm text-left">
                    <thead className="bg-violet-400 text-white">
                        <tr>
                            <th className="px-4 py-2 border">Camp Name</th>
                            <th className="px-4 py-2 border">Camp Fees</th>
                            <th className="px-4 py-2 border">Transaction ID</th>
                            <th className="px-4 py-2 border">Payment Status</th>
                            <th className="px-4 py-2 border">Confirmation Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...history].reverse().map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-300 hover:bg-gray-100">
                                <td className="px-4 py-2 ">{item.campName}</td>
                                <td className="px-4 py-2 ">${item.campFees}</td>
                                <td className="px-4 py-2  text-xs break-all">{item.transactionId}</td>
                                <td className={`px-4 py-2  ${item.payment === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.payment}
                                </td>
                                <td className={`px-4 py-2  ${item.status === 'Confirmed' ? 'text-blue-600' : 'text-yellow-600'}`}>
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
