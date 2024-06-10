import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaQuestionCircle, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";

const MyArticles = () => {
    const axiosSecure = useAxiosSecure()
    const [rejectionReason, setRejectionReason] = useState("");

    const { data: articles = [], isLoading, refetch } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/myArticles')
            return res.data
        }
    })
    // console.log(myArticles);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MM/dd/yyyy');
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
    console.log(articles.length);

    const handleShowRejectionReason = (reason) => {
        console.log(reason);
        setRejectionReason(reason);
        document.getElementById('my_modal_5').showModal();
    };

    if (isLoading) {
        return <div className="w-fit mx-auto"><span className="loading loading-infinity   w-20 text-info"></span></div>;
    }

    return (
        <div className="max-w-screen-xl w-11/12 mx-auto mt-20">
            {
                articles.length === 0 ?   <h1 className="text-center text-4xl">Oops its seems you don`t have any article </h1> :
                <div className="shadow-2xl p-5 rounded-md mb-10 ">
                <div className="sm:text-2xl  md:text-4xl my-6 font-bold cinzel text-center">
                    <div className="space-y-2 ">
                        <h2>Total Articles:  {articles?.length}</h2>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-t-lg ">
                    <table className="table">
                        <thead>
                            <tr className=" bg-black text-white uppercase inter ">
                                <th></th>
                                <th>Article</th>
                                <th>Premium</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                articles?.map((item, index) => <tr key={item._id}>
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
                                        {item.isPremium === false ? <p className=" text-red-600 font-bold text-xl">No</p> : <p className=" text-green-600 font-bold text-xl">Yes</p>}
                                    </td>
                                    <td className="">
                                        {formatDate(item.postedDate)}
                                    </td>
                                    <td className="font-bold">
                                        {item.status === "rejected" ? <h1 className="text-red-500 font-bold flex items-center gap-1 cursor-pointer" onClick={() => handleShowRejectionReason(item.reason)}
                                        >Rejected  <FaQuestionCircle className="text-base" /></h1> : <>
                                            {item.status === 'approved' ? <h1 className="text-green-500 ">Approved</h1> : <h1 className="flex items-center gap-1">Pending</h1>}
                                        </>}
                                    </td>
                                    <th className="">
                                        <div className="tooltip" data-tip="Update">
                                            <Link to={`/updateArticle/${item._id}`}><p className="btn border-2 w-full btn-ghost px-0  text-center text-xl sm:text-3xl "><FaRegEdit /></p></Link>
                                        </div>
                                        <div className="tooltip" data-tip="Delete">
                                            <p onClick={() => handleDelete(item._id)} className="btn border-2 w-full btn-ghost px-0 text-red-600 text-center text-xl sm:text-3xl "><FaTrashAlt /></p>
                                        </div>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            }

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Reason for Rejection</h3>
                    <p className="py-4">{rejectionReason}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyArticles;