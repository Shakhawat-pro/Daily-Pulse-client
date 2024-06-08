import { NavLink, Outlet } from "react-router-dom";
import './styles.css'
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { FaHome, FaUsers } from "react-icons/fa";

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
                    <ul className="px-12 text-xl space-y-4 w-80 min-h-full bg-black text-white">
                    <div className="flex flex-col items-center -space-y-1 pt-12 pb-10 cinzel ">
                        <p className="text-2xl tracking-[.3rem] font-extrabold font-serif">Daily Pulse</p>
                    </div>
                        {/* Sidebar content here */}
                        <li><NavLink className={'flex items-center gap-2'} to="adminHome"><FaHome />Admin Home</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to="/dashboard/addPublisher">Add Publisher</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to="/dashboard/managePublisher">Manage Publisher</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to="/dashboard/manegeArticles">Manege Articles</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2 mb-10'} to="allUsers"><FaUsers />All Users</NavLink></li>

                        <div className="custom-divider"></div>
                        <li><NavLink className={'flex items-center gap-2'} to={'/'}><FaHome /> Home</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to={'/addArticle'}>Add Articles</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to={'/allArticles'}> All Articles</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to={'/premiumArticles'}> Premium Articles</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;