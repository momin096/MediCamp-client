import { FaSearchLocation, FaClipboardCheck, FaHospitalUser } from "react-icons/fa";

const HowItWorks = () => {
    return (
        <section className="py-16 bg-white text-gray-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-blue-800 mb-4">How <span className="text-cyan-600">MediCamp</span> Works</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    Register, Participate, and Access Quality Healthcare in Just a Few Steps!
                </p>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
                        <FaSearchLocation className="text-4xl text-cyan-600 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">1. Explore Camps</h3>
                        <p className="text-sm text-gray-700">Browse upcoming camps based on location, date, or medical services.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
                        <FaClipboardCheck className="text-4xl text-blue-600 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">2. Register Easily</h3>
                        <p className="text-sm text-gray-700">Fill out a quick registration form and confirm your spot at the camp.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
                        <FaHospitalUser className="text-4xl text-teal-600 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">3. Get Treated</h3>
                        <p className="text-sm text-gray-700">Visit the camp on the scheduled date and receive professional medical care.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
