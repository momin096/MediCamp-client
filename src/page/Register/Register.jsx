import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { imageUpload } from "../../api/utlities";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        const { name, email, password, profilePicture } = data;
        const imageFile = profilePicture[0];

        try {
            // Upload image to imgbb
            const photoURL = await imageUpload(imageFile);

            
            // Create user with email/password
            const result = await createUser(email, password);
            if (result?.user) {
                await updateUserProfile(name, photoURL);

                // Save user to database
                const res = await axiosPublic.post(`/users/${email}`, {
                    name,
                    email,
                    image: photoURL
                });

                if (res.data.insertedId) {
                    toast.success("User profile created successfully!");
                }
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            toast.error("Registration failed!");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            if (result?.user) {
                const { displayName, email, photoURL } = result.user;

                const res = await axiosPublic.post(`/users/${email}`, {
                    name: displayName,
                    email,
                    image: photoURL
                });

                if (res.data.insertedId) {
                    toast.success("User profile created successfully!");
                    toast.success("SignIn successful!");
                }

                navigate('/');
            }
        } catch (err) {
            console.error(err);
            toast.error("Google Sign-In failed!");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-green-200 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center text-green-600">Create a New Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="input input-bordered w-full"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="input input-bordered w-full"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                })}
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye className="text-xl" /> : <FaEyeSlash className="text-xl" />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Profile Picture</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered w-full"
                            {...register("profilePicture", { required: "Profile picture is required" })}
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="mt-2 text-center">
                                <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover mx-auto" />
                            </div>
                        )}
                        {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture.message}</p>}
                    </div>

                    <button type="submit" className="btn w-full bg-green-600 text-white hover:bg-green-700">
                        Register
                    </button>
                </form>

                <div className="divider">OR</div>

                <button
                    onClick={handleGoogleSignIn}
                    className="border py-2 rounded-sm bg-green-100 border-gray-200 hover:bg-green-200/80 font-bold w-full flex items-center gap-2 justify-center"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
