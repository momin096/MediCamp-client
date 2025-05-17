import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../../../components/CheckoutForm/CheckoutForm";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const MyRegisteredCamp = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCamp, setSelectedCamp] = useState(null);

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
                const { data } = await axiosSecure.delete(`/delete-registered-camp/${camp._id}`);
                if (data.deletedCount > 0) {
                    Swal.fire("Deleted!", `${camp.campName} has been deleted.`, "success");
                    refetch();
                }
            }
        });
    };

    const handlePayNow = async () => {
        await axiosSecure.patch(`/registered-camps/payment/${selectedCamp._id}`);

        toast.success(`Payment completed for ${selectedCamp?.campName}`);

        setIsOpen(false);
        setSelectedCamp(null);
        refetch();
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 text-white">
            <div className="overflow-x-auto w-full max-w-7xl p-6 bg-gray-900 rounded-lg shadow-lg">
                <table className="min-w-full text-sm text-left border border-gray-700">
                    <thead className="bg-gray-800 text-white uppercase">
                        <tr>
                            <th className="px-4 py-3 border">Camp Name</th>
                            <th className="px-4 py-3 border">Camp Fees</th>
                            <th className="px-4 py-3 border">Participant Name</th>
                            <th className="px-4 py-3 border">Payment Status</th>
                            <th className="px-4 py-3 border">Confirmation Status</th>
                            <th className="px-4 py-3 border">Cancel</th>
                            <th className="px-4 py-3 border">Feedback</th>
                            <th className="px-4 py-3 border">Pay Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...camps].reverse().map((p, i) => (
                            <tr key={i} className="bg-gray-800 hover:bg-gray-700">
                                <td className="px-4 py-2 border">{p?.campName}</td>
                                <td className="px-4 py-2 border">${p?.campFees}</td>
                                <td className="px-4 py-2 border">{p?.participantName}</td>
                                <td className="px-4 py-2 border">{p?.payment}</td>
                                <td className="px-4 py-2 border">{p?.status}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => handleCancel(p)}
                                        disabled={p.status === 'Confirmed'}
                                        className="text-red-500 underline hover:text-red-400 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                </td>
                                <td className="px-4 py-2 border">
                                    {p.status === "Confirmed" ? (
                                        <button className="text-blue-400 underline hover:text-blue-300">Feedback</button>
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 border">
                                    {p.payment === "Paid" ? (
                                        <button className="px-3 py-1 bg-green-700 text-white rounded opacity-60 cursor-not-allowed" disabled>
                                            Paid
                                        </button>
                                    ) : (
                                        <button
                                            className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400"
                                            onClick={() => {
                                                setSelectedCamp(p);
                                                setIsOpen(true);
                                            }}
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

            {/* Modal using Headless UI */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0  " />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 p-6 text-white align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-bold leading-6">
                                        Confirm Your Payment
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-white">
                                            You are about to pay <span className="font-semibold">${selectedCamp?.campFees}</span> for{" "}
                                            <span className="font-semibold">{selectedCamp?.campName}</span>.
                                        </p>
                                    </div>

                                    {/* Checkout Form */}
                                    <Elements stripe={stripePromise}>
                                        {/* form components */}
                                        <CheckoutForm
                                            handlePayNow={handlePayNow}
                                            setIsOpen={setIsOpen}
                                            camp={selectedCamp?.campFees}
                                        />
                                    </Elements>

                                    <div className="mt-6 flex justify-center gap-4">
                                        {/* pay */}

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default MyRegisteredCamp;
