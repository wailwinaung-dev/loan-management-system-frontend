import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoans } from '../../features/loan/loanThunk';
import { RootState, AppDispatch } from '../../app/store';

import Breadcrumb from "../../common/Breadcrumb"
import Table from "../../component/LoanList"
import Loader from '../../common/Loader';

const Loan = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loans, loading, error } = useSelector((state: RootState) => state.loan);

    useEffect(() => {
        dispatch(fetchLoans());
    }, [dispatch]);

    // console.log(loans)
    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Breadcrumb pageName="Loans" linkText="+ Add New Loan" linkTo="/loan/add" />

            {
                !loans.length ? <p className='text-center'>No Data...</p> : (
                    <div className="flex flex-col gap-10">
                        <Table loanList={loans} />
                    </div>
                )
            }

        </>
    )
}

export default Loan;