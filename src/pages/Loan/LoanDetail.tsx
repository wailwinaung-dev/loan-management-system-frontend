/* eslint-disable @typescript-eslint/no-unused-vars */
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

const LoanDetail = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const { loan, repaymentSchedule } = useSelector<RootState>((state) => state.loan)

    useEffect(() => {
        dispatch(fetchLoanById(id))
    }, [])

    if (!loan && !repaymentSchedule.length) return <Loader></Loader>;
    return (
        <>
            <Breadcrumb pageName="Loan Detail" linkText="Back" linkTo="/loan" icon={<ArrowLeftIcon className="size-5 inline" />} />

            <LoanCard loan={loan} />
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <RepaymentSchedule repaymentSchedule={repaymentSchedule} />

            </div>
        </>
    )
}

export default LoanDetail;