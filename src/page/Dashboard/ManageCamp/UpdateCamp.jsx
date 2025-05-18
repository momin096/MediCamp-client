import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "../../../api/utlities";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";

const UpdateCamp = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate()

    const imageFile = watch("image");

    // Fetch camp data by ID
    const { data: camp = {}, isLoading } = useQuery({
        queryKey: ['camp', id],
        enabled: !!id,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/camps/${id}`);
            return data;
        }
    });

    useEffect(() => {
        if (camp && camp._id) {
            reset({
                campName: camp.campName,
                fees: camp.campFees,
                dateTime: camp.dateTime,
                location: camp.location,
                healthcareProfessional: camp.healthCare,
                description: camp.description,
            });
        }
    }, [camp, reset]);

    useEffect(() => {
        if (imageFile && imageFile[0]) {
            const file = imageFile[0];
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setImagePreview(null);
        }
    }, [imageFile]);

    const onSubmit = async (formData) => {
        try {
            let uploadedImage = camp.image;

            if (formData.image && formData.image[0]) {
                const imgFile = formData.image[0];
                const uploaded = await imageUpload(imgFile);
                if (uploaded) uploadedImage = uploaded;
            }

            const updatedCamp = {
                campName: formData.campName,
                image: uploadedImage,
                campFees: formData.fees,
                dateTime: formData.dateTime,
                location: formData.location,
                healthCare: formData.healthcareProfessional,
                description: formData.description,
            };

            const res = await axiosSecure.patch(`/camps/${camp._id}`, updatedCamp);
            if (res.data.modifiedCount > 0) {
                toast.success('Camp updated successfully!');
                navigate('/dashboard/manage-camps')
            } else {
                toast.error('No changes were made.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to update camp');
        }
    };

    if (isLoading) return <Loading />

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-green-200 p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center text-green-600">
                    Update <span className="text-black">{camp?.campName}</span>
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="label font-medium">Camp Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Camp Name"
                            {...register("campName", { required: "Camp name is required" })}
                        />
                        {errors.campName && <p className="text-red-500 text-sm">{errors.campName.message}</p>}
                    </div>

                    <div>
                        <label className="label font-medium">Camp Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered w-full"
                            {...register("image")}
                        />
                        <div className="mt-2 text-center">
                            <img
                                src={imagePreview || camp?.image}
                                alt="Preview"
                                className="w-full   rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label font-medium">Camp Fees</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            placeholder="Camp Fees"
                            {...register("fees", { required: "Fees required" })}
                        />
                        {errors.fees && <p className="text-red-500 text-sm">{errors.fees.message}</p>}
                    </div>

                    <div>
                        <label className="label font-medium">Date & Time</label>
                        <input
                            type="datetime-local"
                            className="input input-bordered w-full"
                            {...register("dateTime", { required: "Date & time is required" })}
                        />
                        {errors.dateTime && <p className="text-red-500 text-sm">{errors.dateTime.message}</p>}
                    </div>

                    <div>
                        <label className="label font-medium">Location</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Location"
                            {...register("location", { required: "Location is required" })}
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                    </div>

                    <div>
                        <label className="label font-medium">Healthcare Professional</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Healthcare Professional"
                            {...register("healthcareProfessional", { required: "Healthcare professional required" })}
                        />
                        {errors.healthcareProfessional && <p className="text-red-500 text-sm">{errors.healthcareProfessional.message}</p>}
                    </div>

                    <div>
                        <label className="label font-medium">Description</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Description"
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <input type="submit" className="btn w-full bg-green-600 text-white hover:bg-green-700" value="Update Camp" />
                </form>
            </div>
        </div>
    );
};

export default UpdateCamp;
