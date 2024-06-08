import { NavLink, Outlet } from "react-router-dom";
import './styles.css'
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

const Dashboard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-ghost fixed drawer-button text-4xl z-50  lg:hidden"><TbLayoutSidebarLeftExpand /></label>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="px-12 text-xl space-y-4 w-80 min-h-full bg-[#222222] text-white">
                    <div className="flex flex-col items-center -space-y-1 pt-12 pb-10 cinzel ">
                        <p className="text-2xl tracking-[.3rem] font-extrabold font-serif">Daily Pulse</p>
                    </div>
                        {/* Sidebar content here */}
                        <li><NavLink className={'flex items-center gap-2'} to="adminHome">Admin Home</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to="/dashboard/addItems">Add Items</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to="/dashboard/manageItems">Manage Items</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to="/dashboard/review">Manage Bookings</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2 mb-10'} to="AllUsers">All Users</NavLink></li>

                        <div className="custom-divider"></div>
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'/addArticle'}>Add Articles</NavLink></li>
                        <li><NavLink to={'/allArticles'}> All Articles</NavLink></li>
                        <li><NavLink to={'/premiumArticles'}> Premium Articles</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;