import { LoanRes } from "../types/LoanType";
import { EyeIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";
import { deleteLoan } from "../features/loan/loanThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { differenceInMonths } from "date-fns";
import numeral from 'numeral'

interface TableProps {
    loanList: LoanRes[];
}
const Table = ({ loanList }: TableProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const handleDelete = (id?: string) => {
        if (id) {
            if (window.confirm("Are you sure you want to delete this loan?")) {
                dispatch(deleteLoan(id));
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
                                Borrower
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Loan Type
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Duration
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Principle
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Total Interest
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Remaining Balance
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Interest Rate
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Payment Term
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {loanList.map((loan, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {loan.borrower.name}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {loan.loanType}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {/* {loan.startDate} - {loan.endDate} */}
                                        {differenceInMonths(loan.endDate, loan.startDate)} Months
                                    </p>
                                </td>
                                
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {numeral(loan.loanAmount).format('0,0')}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {numeral(loan.remainingBalance - loan.loanAmount).format('0,0')}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {numeral(loan.remainingBalance).format('0,0')}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {loan.interestRate}%
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {loan.paymentTerm}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary text-warning" onClick={() => navigate(`/loan/${loan._id}`)}>
                                            <EyeIcon className="size-6" />
                                        </button>
                                        <button className="hover:text-primary text-danger" onClick={() => handleDelete(loan._id)}>
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
