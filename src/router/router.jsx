import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../page/Home/Home";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Dashboard from "../page/Dashboard/Dashboard";
import AddCamp from "../page/Dashboard/AddCamp/AddCamp";
import ManageCamp from "../page/Dashboard/ManageCamp/ManageCamp";
import UpdateCamp from "../page/Dashboard/ManageCamp/UpdateCamp";
import OrganizerProfile from "../page/Dashboard/OrganizerProfile/OrganizerProfile";
import ParticipantProfile from "../page/Dashboard/ParticipantProfile/ParticipantProfile";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: 'add-camp',
                element: <AddCamp />
            },
            {
                path: 'manage-camps',
                element: <ManageCamp />
            },
            {
                path: 'update-camp/:id',
                element: <UpdateCamp />
            },
            {
                path: 'organizer-profile',
                element: <OrganizerProfile />
            },
            {
                path: 'participant-profile',
                element: <ParticipantProfile />
            },
        ]
    }
]);

export default router;