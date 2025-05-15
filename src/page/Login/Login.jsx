// src/pages/Login.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, signInWithGoogle } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()


    const onSubmit = async (data) => {
        const { email, password } = data || {}

        try {
            const data = await signIn(email, password)
            if (data?.user) {
                toast.success('Log In Successful!!')
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        }

    };

    const handleGoogleSignIn = async () => {
        try {
            const data = await signInWithGoogle()
            if (data?.user) {
                const { displayName, email, photoURL } = data?.user || {}
                const res = await axiosPublic.post(`/users/${email}`, {
                    name: displayName,
                    email,
                    image: photoURL
                });

                if (res.data.insertedId) {
                    toast.success("User profile created successfully!");
                    toast.success("SignIn successful!");
                }

                navigate('/')
            }
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    return (
        <>
            <Helmet>
                <title>Login | MediCamp</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-green-200 p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-center text-green-600">Welcome Back to MediCamp</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                        <div>
                            <label className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="input input-bordered w-full"
                                    {...register("password", { required: "Password is required" })}
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-50"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEye className="text-xl" />
                                    ) : (
                                        <FaEyeSlash className="text-xl" />
                                    )}
                                </span>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <button type="submit" className="btn w-full bg-green-600 text-white hover:bg-green-700">
                            Login
                        </button>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="border py-2 rounded-sm bg-green-100  border-gray-200 hover:bg-green-200/80 font-bold w-full flex items-center gap-2 justify-center">
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    <p className="text-sm text-center">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-green-600 font-semibold hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
