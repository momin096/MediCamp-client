import { FaClock, FaHandHoldingMedical, FaMoneyCheckAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const WhyChoose = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-cyan-50 via-blue-100 to-cyan-50 text-gray-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-blue-800 mb-4">Why Choose <span className="text-cyan-600">MediCamp</span>?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    We are committed to bringing quality healthcare to every corner through our well-organized and professional medical camps. Here's what makes us different:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 border-t-4 border-cyan-500">
                        <FaUserDoctor className="text-4xl text-cyan-600 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Certified Professionals</h3>
                        <p className="text-sm text-gray-600">
                            Our camps are staffed with experienced, licensed medical professionals dedicated to your care.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 border-t-4 border-blue-500">
                        <FaHandHoldingMedical className="text-4xl text-blue-600 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Trusted Services</h3>
                        <p className="text-sm text-gray-600">
                            We have successfully managed dozens of camps, serving thousands with trust and transparency.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 border-t-4 border-teal-500">
                        <FaMoneyCheckAlt className="text-4xl text-teal-600 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Affordable Care</h3>
                        <p className="text-sm text-gray-600">
                            Our goal is to make healthcare affordable and accessible, especially in underserved areas.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 border-t-4 border-indigo-500">
                        <FaClock className="text-4xl text-indigo-600 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Efficient & Timely</h3>
                        <p className="text-sm text-gray-600">
                            We run organized and timely medical camps so patients get care exactly when they need it.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
