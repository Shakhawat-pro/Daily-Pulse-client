import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllArticles from "../Pages/AllArticles/AllArticles";
import AddArticle from "../Pages/AddArticle/AddArticle";
import PrivateRoute from "./PrivateRoute";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AdminRoute from "./AdminRoute";
import ManageArticles from "../Pages/Dashboard/ManageArticles";
import AddPublisher from "../Pages/Dashboard/AddPublisher";
import AdminHome from "../Pages/Dashboard/AdminHome";
import MyArticles from "../Pages/MyArticles/MyArticles";
import UpdateArticles from "../components/UpdateArticles";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main> ,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/allArticles',
                element: <AllArticles></AllArticles>
            },
            {
                path: '/addArticle',
                element: <PrivateRoute><AddArticle></AddArticle></PrivateRoute>
            },
            {
                path: '/premiumArticles',
                element: <PrivateRoute><PremiumArticles></PremiumArticles></PrivateRoute>
            },
            {
                path: '/myArticles',
                element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>
            },
            {
                path: '/updateArticle/:id',
                element: <UpdateArticles></UpdateArticles>
            }
            
        ]
    },
    {
        path: 'dashboard',
        element:<Dashboard></Dashboard>,
        children: [
            {
                path:'/dashboard',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>

            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'manageArticles',
                element: <AdminRoute><ManageArticles></ManageArticles></AdminRoute>
            },
            {
                path: 'addPublisher',
                element: <AdminRoute><AddPublisher></AddPublisher></AdminRoute>
            }
        ]
    }
]);

export default router;