import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBorrowers } from '../../features/borrower/borrowerThunk';
import { RootState, AppDispatch } from '../../app/store';

import Breadcrumb from "../../component/Breadcrumb"
import Table from "../../component/BorrowerList"
import Loader from '../../common/Loader';

const Borrower = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { borrowers, loading, error } = useSelector((state: RootState) => state.borrower);

    useEffect(() => {
        dispatch(fetchBorrowers());
    }, [dispatch]);

    // console.log(borrowers)
    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Breadcrumb pageName="Borrowers" linkText="+ Add New Borrower" linkTo="/borrower/add" />

            {
                !borrowers.length ? <p className='text-center'>No Data...</p> : (
                    <div className="flex flex-col gap-10">
                        <Table borrowerList={borrowers} />
                    </div>
                )
            }

        </>
    )
}

export default Borrower