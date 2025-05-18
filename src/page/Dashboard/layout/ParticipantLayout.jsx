import { FaChartBar, FaClipboardList, FaCreditCard, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ParticipantLayout = () => {
    return (
        <>
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
                    to={`/dashboard/my-registered-camps`}
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
        </>
    );
};

export default ParticipantLayout;