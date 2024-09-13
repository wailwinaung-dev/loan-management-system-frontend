import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepayments } from '../../features/repayment/repaymentThunk';
import { RootState, AppDispatch } from '../../app/store';

import Breadcrumb from "../../common/Breadcrumb"
import Table from "../../component/RepaymentList"
import Loader from '../../common/Loader';

const Repayment = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { repayments, loading, error } = useSelector((state: RootState) => state.repayment);

    useEffect(() => {
        dispatch(fetchRepayments());
    }, [dispatch]);

    // console.log(repayments)
    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Breadcrumb pageName="Repayments" linkText="" linkTo="" />

            {
                !repayments.length ? <p className='text-center'>No Data...</p> : (
                    <div className="flex flex-col gap-10">
                        <Table repaymentList={repayments} />
                    </div>
                )
            }

        </>
    )
}

export default Repayment