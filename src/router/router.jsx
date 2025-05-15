import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../page/Home/Home";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Dashboard from "../page/Dashboard/Dashboard";
import AddCamp from "../page/Dashboard/AddCamp/AddCamp";
import ManageCamp from "../page/Dashboard/ManageCamp/ManageCamp";


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
                path: '/dashboard/add-camp',
                element: <AddCamp />
            },
            {
                path: 'manage-camps',
                element: <ManageCamp />
            },
        ]
    }
]);

export default router;