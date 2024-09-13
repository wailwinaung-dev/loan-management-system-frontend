import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBorrowers } from '../../features/borrower/borrowerThunk';
import { RootState, AppDispatch } from '../../app/store';

import Breadcrumb from "../../common/Breadcrumb"
import Table from "../../component/BorrowerList"
import Loader from '../../common/Loader';
import Alert from '../../common/Alert';
import { clearMessages } from '../../features/borrower/borrowerSlice';

const Borrower = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { borrowers, loading, error, successMessage } = useSelector((state: RootState) => state.borrower);

    useEffect(() => {
        dispatch(fetchBorrowers());
    }, [dispatch]);

    // console.log(borrowers)
    if (loading) return <Loader />;

    return (
        <>
            <Breadcrumb pageName="Borrowers" linkText="+ Add New Borrower" linkTo="/borrower/add" />
            {successMessage && (
                <Alert
                    message={successMessage}
                    type="success"
                    onClose={() => dispatch(clearMessages())}
                />
            )}
            {error && (
                <Alert
                    message={error}
                    type="error"
                    onClose={() => dispatch(clearMessages())}
                />
            )}
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