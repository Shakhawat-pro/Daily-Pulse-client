import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ManageArticles = () => {
    const axiosSecure = useAxiosSecure()


    const { data: allArticles = [], refetch } = useQuery({
        queryKey: ['allArticles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allArticles')
            return res.data
        }
    })
    console.log(allArticles);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MM/dd/yyyy');
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            html: `<textarea id="swal-textarea" class="swal2-textarea w-[330px] border-2 border-red-500" placeholder="Enter reason for decline..." style="min-height: 150px;"></textarea>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#d33",
            confirmButtonText: "Submit"
        }).then((result) => {
            if (result.isConfirmed) {
                const reason = document.getElementById('swal-textarea').value;
                if (!reason) {
                    Swal.fire({
                        title: "Error!",
                        text: "Please enter a reason for decline.",
                        icon: "error"
                    });
                    return;
                }
                axiosSecure.patch(`/allArticles/reject/${id}`, { reason })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Rejected!",
                                text: "The article has been rejected.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const handleAccept = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to accept this article?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/allArticles/accept/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Accepted!",
                                text: "The article has been accepted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };
    const handlePremium = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want upgrade this article to Premium?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/allArticles/premium/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Accepted!",
                                text: "The article has been upgraded to Premium.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

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

                axiosSecure.delete(`/allArticles/${id}`)
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

    return (
        <div className="max-w-screen-xl w-11/12 mx-auto ">
            <SectionTitle heading={"All Articles"} subHeading={'Manege all of the Articles'}></SectionTitle>
            <div className="shadow-2xl p-5 rounded-md mb-10 ">
                <div className="sm:text-2xl  md:text-4xl my-6 font-bold cinzel text-center">
                    <div className="space-y-2 ">
                        <h2>Total Articles: {allArticles.length} </h2>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-t-lg ">
                    <table className="table">
                        <thead>
                            <tr className=" bg-black text-white uppercase inter ">
                                <th></th>
                                <th>Article</th>
                                <th>author</th>
                                <th>Premium</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allArticles.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td className="">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img className="object-top" src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.title}</div>
                                                <div className="text-sm opacity-50">{item.publisher}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img className="object-top" src={item.author.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.author.name}</div>
                                                <div className="text-sm opacity-50">{item.author.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="">
                                        {item.isPremium === false ? <p onClick={() => handlePremium(item._id)} className="btn text-red-600 font-bold text-xl">No</p> : <p className="text-center text-green-600 font-bold text-xl">Yes</p>}
                                    </td>
                                    <td className="">
                                        {formatDate(item.postedDate)}
                                    </td>
                                    <td>
                                        {item.status === "rejected" ? <h1 className="text-red-500 font-bold">Rejected</h1> : <>
                                            {item.status === 'approved' ? <h1 className="text-green-500">Approved</h1> :
                                                <div className="flex gap-1">
                                                    <div className="tooltip" data-tip="Reject">
                                                        <button onClick={() => handleReject(item._id)} className="p-1 rounded-md border-2 border-red-500 bg-red-500 text-xl text-white hover:bg-transparent hover:text-red-500"><RxCross2 /></button>
                                                    </div>
                                                    <div className="tooltip" data-tip="Accept">
                                                        <button onClick={() => handleAccept(item._id)} className="p-1 rounded-md border-2 border-green-500 bg-green-500 text-xl text-white hover:bg-transparent hover:text-green-500"><IoCheckmarkDoneSharp /></button>
                                                    </div>
                                                </div>}
                                        </>}
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

export default ManageArticles;