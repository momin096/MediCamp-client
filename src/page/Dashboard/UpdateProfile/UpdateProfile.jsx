import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { imageUpload } from "../../../api/utlities";
import toast from "react-hot-toast";

const UpdateProfile = () => {
    const { email } = useParams();
    const axiosSecure = useAxiosSecure();
    const [previewImage, setPreviewImage] = useState(null);
    const navigate =  useNavigate()

    const { register, handleSubmit, reset, watch } = useForm();

    const { data: profileInfo = {} } = useQuery({
        queryKey: ['profileInfo', email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/profile/${email}`);
            return data;
        }
    });

    useEffect(() => {
        if (profileInfo) {
            reset({
                name: profileInfo.name || "",
                email: profileInfo.email || ""
            });
            setPreviewImage(profileInfo.image || null);
        }
    }, [profileInfo, reset]);

    const imageFile = watch("imageFile");
    useEffect(() => {
        if (imageFile && imageFile[0]) {
            const file = imageFile[0];
            setPreviewImage(URL.createObjectURL(file));
        }
    }, [imageFile]);

    const onSubmit = async (data) => {
        try {
            let imageUrl = profileInfo.image;

            if (data.imageFile && data.imageFile.length > 0) {
                imageUrl = await imageUpload(data.imageFile[0]);
            }

            const updatedData = {
                name: data.name,
                image: imageUrl
            };

            const res = await axiosSecure.patch(`/update-profile/${email}`, updatedData);
            if (res.data.modifiedCount > 0) {
                toast.success("Profile updated successfully!");
                navigate('/dashboard/profile')
            } else {
                toast.error("No changes were made.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#fcd34d] flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-white shadow-2xl p-6">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Update Your Profile</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Image Upload</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("imageFile")}
                            className="file-input file-input-bordered w-full"
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="mt-3 w-32 h-32 object-cover rounded-md border mx-auto"
                            />
                        )}
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-full">
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
