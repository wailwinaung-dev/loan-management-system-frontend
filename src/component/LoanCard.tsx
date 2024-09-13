import { differenceInMonths } from "date-fns";
import { LoanRes } from "../types/LoanType";

interface LoanCardProps {
    loan: LoanRes,
}
const LoanCard = ({ loan }: LoanCardProps) => {
    return (

        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
            {/* Borrower Information */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700"><u>Borrower Information</u></h3>
                <div className="mt-2 grid grid-cols-4 gap-4">
                    <p className="text-gray-800"><b className="text-gray-500">Name:</b> {loan.borrower.name}</p>
                    <p className="text-gray-800"><b className="text-gray-500">Email:</b> {loan.borrower.email}</p>
                    <p className="text-gray-800"><b className="text-gray-500">Phone:</b> {loan.borrower.phone}</p>
                    <p className="text-gray-800"><b className="text-gray-500">NRC Number:</b> {loan.borrower.nrc_number}</p>
                </div>
            </div>

            {/* Loan Information */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700"><u>Loan Information</u></h3>
                <div className="mt-2 grid grid-cols-4 gap-4">
                    <p className="text-gray-800"><b className="text-gray-500">Loan Amount: </b> ${loan.loanAmount.toFixed(2)}</p>
                    <p className="text-gray-800"><b className="text-gray-500">Loan Type: </b> {loan.loanType}</p>
                    <p className="text-gray-800"><b className="text-gray-500">Interest Rate: </b> {loan.interestRate}%</p>
                    <p className="text-gray-800"><b className="text-gray-500">Total Interest: </b> ${loan.totalInterest?.toFixed(2)} </p>
                    <p className="text-gray-800 capitalize"><b className="text-gray-500">Payment Term:</b> {loan.paymentTerm}</p>
                    <p className="text-gray-800"><b className="text-gray-500">Start Date: </b> {new Date(loan.startDate).toLocaleDateString()}</p>
                    <p className="text-gray-800"><b className="text-gray-500">End Date: </b>{new Date(loan.endDate).toLocaleDateString()}</p>
                    <p className="text-gray-800"><b className="text-gray-500">Duration: </b>{differenceInMonths(loan.endDate, loan.startDate)} Months</p>
                </div>
            </div>

            {/* Remaining Balance */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700"><u>Remaining Balance</u></h3>
                <div className="mt-2">
                    <p className="text-gray-800">${loan.remainingBalance > 1 ? loan.remainingBalance.toFixed(2) : '0.00'}</p>
                </div>
            </div>
        </div>
    )
}

export default LoanCard;