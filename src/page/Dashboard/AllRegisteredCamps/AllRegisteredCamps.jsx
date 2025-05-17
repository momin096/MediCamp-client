import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaTimes } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

const AllRegisteredCamps = () => {
    const axiosSecure = useAxiosSecure()

    const { data: camps = [], isLoading, refetch } = useQuery({
        queryKey: ['registered-camp'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/registered-camps`)
            return data
        }
    })


    const handleDelete = (camp) => {
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
        });
    }



    const changeStatus = async (camp) => {


        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to confirm ${camp.campName}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a", // green
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.patch(`/change-status/${camp._id}`);
                    if (data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Confirmed!",
                            text: `${camp.campName} has been confirmed.`,
                            icon: "success"
                        });
                        refetch();
                    } else {
                        Swal.fire("Oops!", "No changes were made.", "info");
                    }
                } catch (error) {
                    Swal.fire("Error!", "Something went wrong.", "error");
                    console.error(error);
                }
            }
        });
    }

    if (isLoading) return <Loading />

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
                            <th className="px-4 py-3 border border-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((p, i) => (
                            <tr key={i} className="bg-gray-800 hover:bg-gray-700">
                                <td className="px-4 py-2 border border-gray-700">{p.participantName}</td>
                                <td className="px-4 py-2 border border-gray-700">{p.campName}</td>
                                <td className="px-4 py-2 border border-gray-700">{p.campFees}</td>
                                <td className="px-4 py-2 border border-gray-700">{p.payment}</td>
                                <td className="px-4 py-2 border border-gray-700">{p.status}</td>
                                <td className="px-4 py-2 border border-gray-700 text-center">
                                    <div className="flex gap-5">
                                        <button disabled={p.status === 'Confirmed' && p.payment === 'Paid'} onClick={() => changeStatus(p)}>
                                            <FaCheck className="text-green-400 text-2xl hover:border " />
                                        </button>
                                        <button
                                            className={'disabled:cursor-not-allowed'}
                                            disabled={p.status === 'Confirmed' && p.payment === 'Paid'} onClick={() => handleDelete(p)}>

                                            <FaTimes
                                                className="text-red-500 text-2xl hover:border" /></button>
                                    </div>

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