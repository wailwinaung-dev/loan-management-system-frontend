import { RepaymentScheduleType } from "../types/RepaymentType";
interface RepaymentScheduleProps {
    repaymentSchedule: RepaymentScheduleType[]
}
const RepaymentSchedule: React.FC<RepaymentScheduleProps> = ({ repaymentSchedule }) => {
    return (
        <div className="mt-5 bg-white rounded-lg shadow-md w-full">
            <h3 className="text-xl font-semibold text-gray-700 text-center my-3">Repayment Schedule</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600">#</th>
                            <th className="px-4 py-2 text-left text-gray-600">Payment Date</th>
                            <th className="px-4 py-2 text-left text-gray-600">Payment Amount</th>
                            <th className="px-4 py-2 text-left text-gray-600">Interest</th>
                            <th className="px-4 py-2 text-left text-gray-600">Principal</th>
                            <th className="px-4 py-2 text-left text-gray-600">Remaining Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repaymentSchedule.map((schedule, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border">{schedule.paymentNumber}</td>
                                <td className="px-4 py-2 border">{new Date(schedule.paymentDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border">${schedule.paymentAmount.toFixed(2)}</td>
                                <td className="px-4 py-2 border">${schedule.interestPayment.toFixed(2)}</td>
                                <td className="px-4 py-2 border">${schedule.principalPayment.toFixed(2)}</td>
                                <td className="px-4 py-2 border">${schedule.remainingBalance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RepaymentSchedule;