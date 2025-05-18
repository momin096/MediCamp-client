import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="bg-gradient-to-r from-cyan-700 to-blue-900 text-white py-10 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold mb-2">MediCamp</h2>
                        <p className="text-sm">Your trusted partner for medical camps and healthcare outreach.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/camps" className="hover:underline">Camps</a></li>
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Contact</h3>
                        <p>Email: <a href="mailto:support@medicamp.com" className="hover:underline">support@medicamp.com</a></p>
                        <p>Phone: +880-1234-567890</p>
                        <p>Address: Bhola, Barishal, Bangladesh</p>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
                        <div className="flex gap-4 text-xl">
                            <a href="#" className="hover:text-cyan-300 "><FaFacebook /></a>
                            <a href="#" className="hover:text-cyan-300"><FaInstagram /></a>
                            <a href="#" className="hover:text-cyan-300"><FaTwitter /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center border-t border-white/20 pt-5 text-sm">
                    © {new Date().getFullYear()} MediCamp. All rights reserved.
                </div>
            </footer>

        </div>
    );
};

export default Footer;