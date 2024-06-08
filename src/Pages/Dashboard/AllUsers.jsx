import { FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import useUsers from "../../hooks/useUsers";

const AllUsers = () => {
    const [users] = useUsers()
    console.log(users);
    return (
        <div className="max-w-screen-xl w-10/12 mx-auto ">
            <SectionTitle heading={"All users"} subHeading={'Manege all of your users'}></SectionTitle>
            <div className="shadow-2xl p-5 rounded-md mb-10 ">
                <div className="sm:text-2xl  md:text-4xl my-6 font-bold cinzel">
                    <div className="space-y-2 ">
                        <h2>Total Users: {users.length} </h2>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-t-lg">
                    <table className="table">
                        <thead>
                            <tr className=" bg-black text-white uppercase inter">
                                <th></th>
                                <th>Name</th>
                                <th>Premium</th>
                                <th>Roll</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td className="">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img className="object-top" src={item.profilePicture} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                <div className="text-sm opacity-50">{item.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="">
                                        {item.premiumTaken === null ? <p className="text-red-600 font-bold text-xl">No</p> : <p className="text-green-600 font-bold text-xl">Yes</p>}
                                    </td>
                                    <td>
                                        {item.role === 'admin' ? 'Admin' : <button
                                            onClick={() => handleMakeAdmin(item)}
                                            className="btn  bg-orange-500">
                                            <FaUsers className="text-white 
                                        text-2xl"></FaUsers>
                                        </button>}
                                    </td>
                                    <th>
                                        <button className="btn border-2 w-full btn-ghost px-0 text-red-600 text-center text-xl sm:text-3xl "><FaTrashAlt /></button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;