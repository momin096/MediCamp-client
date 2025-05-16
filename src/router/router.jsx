import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../page/Home/Home";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Dashboard from "../page/Dashboard/Dashboard";
import AddCamp from "../page/Dashboard/AddCamp/AddCamp";
import ManageCamp from "../page/Dashboard/ManageCamp/ManageCamp";
import UpdateCamp from "../page/Dashboard/ManageCamp/UpdateCamp";
import UpdateProfile from "../page/Dashboard/UpdateProfile/UpdateProfile";
import Profile from "../page/Dashboard/Profile/Profile";
import AvailableCamp from "../page/AvailableCamp/AvailableCamp";
import CampDetails from "../page/CampDetails/CampDetails";
import MyRegisteredCamp from "../page/Dashboard/MyRegisteredCamp/MyRegisteredCamp";
import AllRegisteredCamps from "../page/Dashboard/AllRegisteredCamps/AllRegisteredCamps";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/available-camp',
                element: <AvailableCamp />
            },
            {
                path: '/camp-details/:id',
                element: <CampDetails />
            },
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
                path: 'profile',
                element: <Profile />
            },

            {
                path: 'update-profile/:email',
                element: <UpdateProfile />
            },
            {
                path: 'registered-camps',
                element: <AllRegisteredCamps />

            },
        ]
    }
]);

export default router;