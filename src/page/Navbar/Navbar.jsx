import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logOut } = useAuth()

    const handleLogout = async () => {
        await logOut()
        toast.success('You Have Been Successfully LogOut')
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className="font-medium" end>Home</NavLink></li>
            <li><NavLink to="/available-camp" className="font-medium">Available Camps</NavLink></li>
            <li><NavLink to="/about" className="font-medium">About</NavLink></li>
            <li><NavLink to="/contact" className="font-medium">Contact</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-gradient-to-r from-[#d4e2f1] via-[#8fb3b7] to-[#99c39b]  fixed top-0 z-50 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                        
                    </ul>
                </div>
                <Link to="/" className="text-xl text-green-600 font-bold flex items-center gap-2">
                    <img className="w-8" src="/Logo.png" alt="Logo" />
                    MediCamp
                </Link>
            </div>

            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end flex items-center md:gap-2">
                {!user ? (
                    <Link to="/login" className="btn btn-sm bg-green-600 text-white hover:bg-green-700">Join Us</Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img referrerPolicy='no-referrer' src={user?.photoURL || "/default-profile.png"} alt="profile" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-48 ">
                            <li className="text-green-600 font-semibold cursor-default ml-2">{user.displayName}</li>
                            <li><Link className="py-2" to="/dashboard/add-camp">Dashboard</Link></li>
                            <li><button className="py-2" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
