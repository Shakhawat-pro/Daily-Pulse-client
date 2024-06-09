import { FaTrashAlt} from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import useArticles from "../../hooks/useArticles";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageArticles = () => {
    const [Articles, ] = useArticles()
    const axiosSecure = useAxiosSecure()
 

    const {data: allArticles = []} = useQuery({
        queryKey:['allArticles'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/allArticles')
            return res.data
        }
    })
    console.log(allArticles);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MM/dd/yyyy');
    };

    return (
        <div className="max-w-screen-xl w-10/12 mx-auto ">
            <SectionTitle heading={"All Articles"} subHeading={'Manege all of the Articles'}></SectionTitle>
            <div className="shadow-2xl p-5 rounded-md mb-10 ">
                <div className="sm:text-2xl  md:text-4xl my-6 font-bold cinzel text-center">
                    <div className="space-y-2 ">
                        <h2>Total Articles: {Articles.length} </h2>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-t-lg ">
                    <table className="table">
                        <thead>
                            <tr className=" bg-black text-white uppercase inter ">
                                <th></th>
                                <th>Name</th>
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
                                                <div className="text-sm opacity-50">{item.author.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="">
                                        {item.isPremium === false ? <p className="text-red-600 font-bold text-xl">No</p> : <p className="text-green-600 font-bold text-xl">Yes</p>}
                                    </td>
                                    <td className="">
                                        {formatDate(item.postedDate)}
                                    </td>
                                    <td>
                                        {/* {item.status === } */}
                                    </td>
                                    <th>
                                        <button  className="btn border-2 w-full btn-ghost px-0 text-red-600 text-center text-xl sm:text-3xl "><FaTrashAlt /></button>
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