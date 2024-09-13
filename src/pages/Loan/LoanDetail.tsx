import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Breadcrumb from "../../common/Breadcrumb";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanById } from "../../features/loan/loanThunk";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import LoanCard from "../../component/LoanCard";
import Loader from "../../common/Loader";
import RepaymentSchedule from "../../component/RepaymentSchedule";
import RepaymentByLoan from "../../component/RepaymentByLoan";
import { selectRepaymentsByLoanId } from "../../features/repayment/repaymentListSelector";
import { RepaymentRes } from "../../types/RepaymentType";
import RepaymentProcess from "../../component/RepaymentProcess";
import { addRepayment, fetchRepayments } from "../../features/repayment/repaymentThunk";
import Alert from "../../common/Alert";
import { clearMessages } from "../../features/repayment/repaymentSlice";

const LoanDetail = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();

    // Fetch loan details and repayment schedule
    const { loan, repaymentSchedule } = useSelector((state: RootState) => state.loan);
    const { successMessage, error } = useSelector((state: RootState) => state.repayment);

    // Fetch repayments related to this loan
    const repayments: RepaymentRes[] = useSelector((state: RootState) =>
        id ? selectRepaymentsByLoanId(state, id) : [] // pass loanId here
    );


    // Function to handle repayment submission
    const handleRepayment = (data: { paidAmount: number }) => {
        if (loan && id) {
            const updatedData = {
                loanId: id, // Ensure loanId is passed correctly
                paymentDate: new Date(), // Current date as payment date
                amountPaid: data.paidAmount, // Match the expected 'amountPaid' field
            };
            dispatch(addRepayment(updatedData)).unwrap().then(() => {
                dispatch(fetchRepayments());
                dispatch(fetchLoanById(id));
            }); // Dispatch action with repayment data

        }
    };

    // Fetch repayments when component mounts
    useEffect(() => {
        dispatch(fetchRepayments());
    }, [dispatch]);

    // Fetch loan details by ID when component mounts or when the ID changes
    useEffect(() => {
        if (id) {
            dispatch(fetchLoanById(id));
        }
    }, [dispatch, id]);

    // Show loader if loan or repayment schedule is not available
    if (!loan || repaymentSchedule.length === 0) return <Loader />;

    return (
        <>
            <Breadcrumb pageName="Loan Detail" linkText="Back" linkTo="/loan" icon={<ArrowLeftIcon className="size-5 inline" />} />

            {/* Loan details */}
            <LoanCard loan={loan} />
            {successMessage && (
                <>
                    <div className="mt-5"></div>
                    <Alert
                        message={successMessage}
                        type="success"
                        onClose={() => dispatch(clearMessages())}
                    />
                </>
            )}
            {error && (
                <>
                    <div className="mt-5"></div>
                    <Alert
                        message={error}
                        type="error"
                        onClose={() => dispatch(clearMessages())}
                    />
                </>
            )}
            {/* Repayment process */}
            {
                loan.remainingBalance < 1 ? '' : <RepaymentProcess onSubmit={handleRepayment} />
            }

            {/* Repayment schedule and history */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <RepaymentSchedule repaymentSchedule={repaymentSchedule} />
                <RepaymentByLoan repayments={repayments} />
            </div>
        </>
    );
};

export default LoanDetail;
