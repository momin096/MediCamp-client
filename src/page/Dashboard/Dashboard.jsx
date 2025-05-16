import { Link, NavLink, Outlet } from "react-router-dom";
import { RiMenuFold2Line } from "react-icons/ri";
import { FaHome, FaCampground, FaChartBar, FaUser, FaClipboardList, FaCreditCard } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth()
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Mobile Navbar */}
                    <div className="w-full navbar bg-base-200 lg:hidden px-4 py-2">
                        <label htmlFor="dashboard-drawer" className="drawer-button flex items-center">
                            <RiMenuFold2Line className="text-2xl" />
                            <h2 className="ml-2 text-xl font-semibold">Dashboard</h2>
                        </label>
                    </div>

                    {/* Main Content */}
                    <div className="">
                        <Outlet />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-6 w-72 min-h-full bg-gradient-to-b from-[#D9AFD9] to-[#97D9E1] text-[#1F1F1F] font-medium">
                        <Link to={'/'} className="text-2xl font-extrabold mb-6 tracking-wide flex items-center gap-2">
                            <img className="h-8 w-8" src="/Logo.png" alt="" />
                            MCMS</Link>

                        <li>
                            <NavLink
                                to="/dashboard/analytics"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-[#8B322C] text-white rounded-lg px-3 py-2"
                                        : "px-3 py-2"
                                }
                            >
                                <FaChartBar className="inline-block mr-2" /> Analytics
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-[#8B322C] text-white rounded-lg px-3 py-2"
                                        : "px-3 py-2"
                                }
                            >
                                <FaUser className="inline-block mr-2" /> Participant Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/dashboard/`}
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-[#8B322C] text-white rounded-lg px-3 py-2"
                                        : "px-3 py-2"
                                }
                            >
                                <FaClipboardList className="inline-block mr-2" /> Registered Camps
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/payment-history"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-[#8B322C] text-white rounded-lg px-3 py-2"
                                        : "px-3 py-2"
                                }
                            >
                                <FaCreditCard className="inline-block mr-2" /> Payment History
                            </NavLink>
                        </li>

                        {/* Divider */}
                        <div className="my-4 border-t border-[#1F1F1F]/30"></div>
                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-[#8B322C] text-white rounded-lg px-3 py-2"
                                        : "px-3 py-2"
                                }
                            >
                                <FaUser className="inline-block mr-2" /> Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/add-camp"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-[#8B322C] text-white rounded-lg px-3 py-2"
                                        : "px-3 py-2"
                                }
                            >
                                <FaCreditCard className="inline-block mr-2" /> Add Camp
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/manage-camps"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-[#8B322C] text-white rounded-lg px-3 py-2"
                                        : "px-3 py-2"
                                }
                            >
                                <FaCreditCard className="inline-block mr-2" /> Manage Camp
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/registered-camps"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-[#8B322C] text-white rounded-lg px-3 py-2"
                                        : "px-3 py-2"
                                }
                            >
                                <FaCreditCard className="inline-block mr-2" /> Manage Registered Camps

                            </NavLink>
                        </li>
                        <div className="my-4 border-t border-[#1F1F1F]/30"></div>

                        {/* Bottom Navigation */}
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-[#8B322C] text-white rounded-lg px-3 py-2"
                                        : "px-3 py-2"
                                }
                            >
                                <FaHome className="inline-block mr-2" /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/available-camps"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-[#8B322C] text-white rounded-lg px-3 py-2"
                                        : "px-3 py-2"
                                }
                            >
                                <FaCampground className="inline-block mr-2" /> Available Camps
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
