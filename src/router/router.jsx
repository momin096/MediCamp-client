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
import PaymentHistory from "../page/Dashboard/PaymentHistory/PaymentHistory";
import OrganizerRoute from "./OrganizerRoute";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../page/ErrorPage/ErrorPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
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
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'add-camp',
                element: <OrganizerRoute>
                    <AddCamp />
                </OrganizerRoute>
            },
            {
                path: 'manage-camps',
                element: <OrganizerRoute>
                    <ManageCamp />
                </OrganizerRoute>
            },
            {
                path: 'update-camp/:id',
                element: <OrganizerRoute>
                    <UpdateCamp />
                </OrganizerRoute>
            },
            {
                path: 'profile',
                element: <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            },

            {
                path: 'update-profile/:email',
                element: <PrivateRoute>
                    <UpdateProfile />
                </PrivateRoute>
            },
            {
                path: 'registered-camps',
                element: <OrganizerRoute>
                    <AllRegisteredCamps />
                </OrganizerRoute>

            },
            {
                path: 'my-registered-camps',
                element: <PrivateRoute>
                    <MyRegisteredCamp />
                </PrivateRoute>

            },
            {
                path: 'payment-history',
                element: <PrivateRoute>
                    <PaymentHistory />
                </PrivateRoute>

            },
        ]
    }
]);

export default router;