import React from 'react';
import { FaCreditCard, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const OrganizerLayout = () => {
    return (
        <>
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
        </>
    );
};

export default OrganizerLayout;