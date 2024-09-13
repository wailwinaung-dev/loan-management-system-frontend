import { RepaymentRes } from "../types/RepaymentType";
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";
import { deleteRepayment } from "../features/repayment/repaymentThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { format } from "date-fns";

interface TableProps {
  repaymentList: RepaymentRes[];
}
const Table = ({ repaymentList }: TableProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  const handleDelete = (id?: string) => {
    if(id){
      if (window.confirm("Are you sure you want to delete this repayment?")) {
        dispatch(deleteRepayment(id));
      }
    }
   
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Payment Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Paid Amount
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {repaymentList.map((repayment, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {format(repayment.paymentDate, 'MMMM dd, yyyy')}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {repayment.amountPaid}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary text-green" onClick={() => navigate(`/loan/${repayment.loan._id}`)}>
                      <EyeIcon className="size-6" />
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
