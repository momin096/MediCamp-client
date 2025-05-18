import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animationData from '../../assets/404.json';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 text-center px-4">
            <Lottie
                animationData={animationData}
                className="w-96 h-96"
            />

            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Oops! Page Not Found</h1>
            <p className="text-gray-600 mb-6 max-w-xl">
                The page you are looking for doesn’t exist or has been moved. Let’s get you back to a healthy path!
            </p>

            <Link to="/" className="btn btn-primary px-6 py-2 text-white rounded-full shadow-md hover:shadow-xl transition">
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
