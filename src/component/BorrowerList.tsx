import { BorrowerRes } from "../types/BorrowerType";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";
import { deleteBorrower } from "../features/borrower/borrowerThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

interface TableProps {
  borrowerList: BorrowerRes[];
}
const Table = ({ borrowerList }: TableProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  const handleDelete = (id?: string) => {
    if(id){
      if (window.confirm("Are you sure you want to delete this borrower?")) {
        dispatch(deleteBorrower(id));
      }
    }
   
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Phone
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                NRC Number
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {borrowerList.map((borrower, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {borrower.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {borrower.phone}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {borrower.email}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {borrower.nrc_number}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary text-warning" onClick={() => navigate(`/borrower/edit/${borrower._id}`)}>
                      <PencilSquareIcon className="size-6" />
                    </button>
                    <button className="hover:text-primary text-danger" onClick={() => handleDelete(borrower._id)}>
                      <TrashIcon className="size-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
