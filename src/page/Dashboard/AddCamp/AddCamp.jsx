import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "../../../api/utlities";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddCamp = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const imageFile = watch("image");
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (imageFile && imageFile[0]) {
            const file = imageFile[0];
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            return () => URL.revokeObjectURL(url);
        }
        setImagePreview(null);
    }, [imageFile]);

    const onSubmit = async (data) => {
        const { campName, fees, dateTime, location, healthcareProfessional, description, image } = data || {}

        const imageFile = image[0]

        try {
            const image = await imageUpload(imageFile)
            // console.log(image);
            if (image) {
                const campDetails = {
                    campName,
                    image,
                    campFees: fees,
                    dateTime,
                    location,
                    healthCare: healthcareProfessional,
                    description,
                    participants: 0,
                }

                console.log(image);
                const { data } = await axiosSecure.post('/camps', campDetails)
                console.log(data);
            }

        } catch (err) {
            console.log(err);
        }





        // reset();
        // setImagePreview(null);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-green-200 p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center text-green-600">➕ Add A Camp</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input type="text" placeholder="Camp Name" className="input input-bordered w-full"
                        {...register("campName", { required: "Camp name is required" })}
                    />
                    {errors.campName && <p className="text-red-500 text-sm">{errors.campName.message}</p>}

                    <input type="file" accept="image/*" className="file-input file-input-bordered w-full"
                        {...register("image", { required: "Image is required" })}
                    />
                    {imagePreview && (
                        <div className="mt-2 text-center">
                            <img src={imagePreview} alt="Preview" className="w-full max-h-96 object-cover rounded-lg" />
                        </div>
                    )}
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

                    <input type="number" placeholder="Camp Fees" className="input input-bordered w-full"
                        {...register("fees", { required: "Fees required" })}
                    />
                    {errors.fees && <p className="text-red-500 text-sm">{errors.fees.message}</p>}

                    <input type="datetime-local" className="input input-bordered w-full"
                        {...register("dateTime", { required: "Date & Time required" })}
                    />
                    {errors.dateTime && <p className="text-red-500 text-sm">{errors.dateTime.message}</p>}

                    <input type="text" placeholder="Location" className="input input-bordered w-full"
                        {...register("location", { required: "Location is required" })}
                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

                    <input type="text" placeholder="Healthcare Professional Name" className="input input-bordered w-full"
                        {...register("healthcareProfessional", { required: "Healthcare professional is required" })}
                    />
                    {errors.healthcareProfessional && <p className="text-red-500 text-sm">{errors.healthcareProfessional.message}</p>}

                    <textarea placeholder="Description" className="textarea textarea-bordered w-full"
                        {...register("description", { required: "Description is required" })}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                    
                    <button type="submit" className="btn w-full bg-green-600 text-white hover:bg-green-700">
                        Submit Camp
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCamp;
