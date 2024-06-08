import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllArticles from "../Pages/AllArticles/AllArticles";
import AddArticle from "../Pages/AddArticle/AddArticle";
import PrivateRoute from "./PrivateRoute";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";

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
                element: <PremiumArticles></PremiumArticles>
            }
        ]
    },
]);

export default router;