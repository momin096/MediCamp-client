import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaClock, FaUserMd, FaUsers } from "react-icons/fa";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";

const CampDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // 👈 get logged-in user

    const [showModal, setShowModal] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: camp = {}, isLoading, refetch } = useQuery({
        queryKey: ['campDetails', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/camps/${id}`);
            return data;
        }
    });

    if (isLoading) return <Loading />;

    const onSubmit = async (formData) => {
        const registration = {
            campId: id,
            campName: camp.campName,
            campFees: camp.campFees,
            location: camp.location,
            healthCare: camp.healthCare,
            participantName: user.displayName,
            participantEmail: user.email,
            payment: 'Unpaid',
            ...formData,
        };

        try {
            const res = await axiosSecure.post('/registrations', registration);
            if (res.data.insertedId) {
                toast.success("Successfully registered!");
                setShowModal(false);
                reset();
                refetch(); // update camp info (participants count)
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to register.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
                <img src={camp.image} alt={camp.campName} className="w-full h-64 object-cover" />

                <div className="p-8 space-y-4">
                    <h2 className="text-4xl font-bold text-primary drop-shadow">{camp.campName}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-primary" />
                            <span className="font-medium">Date & Time:</span> {camp.dateTime}
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineMapPin className="text-primary" />
                            <span className="font-medium">Location:</span> {camp.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUserMd className="text-primary" />
                            <span className="font-medium">Doctor:</span> {camp.healthCare}
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUsers className="text-primary" />
                            <span className="font-medium">Participants:</span> {camp.participants}
                        </div>
                    </div>

                    <p className="text-gray-800 mt-4">{camp.description}</p>

                    <div className="mt-6">
                        <button onClick={() => setShowModal(true)} className="btn btn-success w-full text-white text-lg">
                            Join Camp
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6 relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-xl">✕</button>
                        <h3 className="text-2xl font-bold mb-4 text-green-600">Camp Registration</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

                            <input readOnly value={camp.campName} className="input input-bordered w-full" />
                            <input readOnly value={camp.campFees} className="input input-bordered w-full" />
                            <input readOnly value={camp.location} className="input input-bordered w-full" />
                            <input readOnly value={camp.healthCare} className="input input-bordered w-full" />
                            <input readOnly value={user.displayName} className="input input-bordered w-full" />
                            <input readOnly value={user.email} className="input input-bordered w-full" />

                            <input type="number" placeholder="Age" {...register("age", { required: true })} className="input input-bordered w-full" />
                            {errors.age && <p className="text-red-500 text-sm">Age is required</p>}

                            <input type="text" placeholder="Phone Number" {...register("phone", { required: true })} className="input input-bordered w-full" />
                            {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}

                            <select {...register("gender", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-sm">Gender is required</p>}

                            <input type="text" placeholder="Emergency Contact" {...register("emergencyContact", { required: true })} className="input input-bordered w-full" />
                            {errors.emergencyContact && <p className="text-red-500 text-sm">Emergency contact is required</p>}

                            <input type="submit" className="btn btn-success w-full text-white" value="Confirm Registration" />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampDetails;
