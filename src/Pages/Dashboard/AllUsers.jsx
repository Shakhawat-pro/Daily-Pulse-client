import { FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import useUsers from "../../hooks/useUsers";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GrUserAdmin } from "react-icons/gr";


const AllUsers = () => {
    const [users, , refetch] = useUsers()
    const axiosSecure = useAxiosSecure()
    console.log(users);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    const handleMakeAdmin = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to change this user to admin!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${item._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Success!",
                                text: "Role has been changed to Admin.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "The role change was not successful. Please try again.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error updating user role:', error);
                        Swal.fire({
                            title: "Error",
                            text: "There was an error updating the user role. Please try again.",
                            icon: "error",
                            footer: `${error.message}`
                        });
                    });
            }
        });
    };

    const handleRemoveAdmin = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to change this admin to Guest user!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/guest/${item._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Success!",
                                text: "Role has been changed to Guest.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "The role change was not successful. Please try again.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error updating user role:', error);
                        Swal.fire({
                            title: "Error",
                            text: "There was an error updating the user role. Please try again.",
                            icon: "error",
                            footer: `${error.message}`
                        });
                    });
            }
        });
    };

    return (
        <div className="max-w-screen-xl w-10/12 mx-auto ">
            <SectionTitle heading={"All users"} subHeading={'Manege all of your users'}></SectionTitle>
            <div className="shadow-2xl p-5 rounded-md mb-10 ">
                <div className="sm:text-2xl  md:text-4xl my-6 font-bold cinzel text-center">
                    <div className="space-y-2 ">
                        <h2>Total Users: {users.length} </h2>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-t-lg ">
                    <table className="table">
                        <thead>
                            <tr className=" bg-black text-white uppercase inter ">
                                <th></th>
                                <th>Name</th>
                                <th>Premium</th>
                                <th>Role</th>
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
                                        {item.role === 'admin' ?
                                            <button
                                                onClick={() => handleRemoveAdmin(item)}
                                                className="btn  bg-green-500 tooltip " data-tip='Admin'>
                                                <GrUserAdmin className="text-white text-2xl "></GrUserAdmin>
                                            </button>

                                            : <button
                                                onClick={() => handleMakeAdmin(item)}
                                                className="btn  bg-orange-500 tooltip" data-tip='Guest user'>
                                                <FaUsers className="text-white text-2xl"></FaUsers>
                                            </button>}
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn border-2 w-full btn-ghost px-0 text-red-600 text-center text-xl sm:text-3xl "><FaTrashAlt /></button>
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