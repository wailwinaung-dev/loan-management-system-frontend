import { RepaymentRes } from "../types/RepaymentType"

interface RepaymentByLoanProps {
    repayments: RepaymentRes[];
}

const RepaymentByLoan: React.FC<RepaymentByLoanProps> = ({ repayments }) => {
    return (
        <div className="mt-5 bg-white rounded-lg shadow-md w-full">
            <h3 className="text-xl font-semibold text-gray-700 text-center my-3">Repayment History</h3>
            {
                !repayments.length ? <div className="text-center w-full">No Data...</div> : <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600">#</th>
                            <th className="px-4 py-2 text-left text-gray-600">Paid Date</th>
                            <th className="px-4 py-2 text-left text-gray-600">Paid Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repayments.map((repayment: RepaymentRes, index: number) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border">{index+1}</td>
                                <td className="px-4 py-2 border">{new Date(repayment.paymentDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border">${repayment.amountPaid.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
}

export default RepaymentByLoan