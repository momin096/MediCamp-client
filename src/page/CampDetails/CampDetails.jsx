import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaClock, FaUserMd, FaUsers } from "react-icons/fa";
import { HiOutlineMapPin } from "react-icons/hi2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";

const CampDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: camp = {}, isLoading } = useQuery({
        queryKey: ['campDetails', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/camps/${id}`);
            return data;
        }
    });

    if (isLoading) return <Loading />

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
                        <button className="btn btn-success w-full text-white text-lg">Join Camp</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;
