import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { AppDispatch, RootState } from '../../app/store';
import Breadcrumb from "../../common/Breadcrumb";
import { ArrowLeftIcon, InformationCircleIcon, TableCellsIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { LoanReq } from '../../types/LoanType';
import { addLoan } from '../../features/loan/loanThunk';
import Alert from '../../common/Alert'
import { clearMessages, clearValidationMessages } from "../../features/loan/loanSlice";
import Loader from '../../common/Loader';
import { useEffect } from 'react';
import SelectBox from '../../common/SelectBox';
import { borrowersList } from '../../features/borrower/borrowerListSelector';
import { fetchBorrowers } from '../../features/borrower/borrowerThunk';
import DatePicker from '../../common/DatePicker';

// Define the validation schema using Yup
const schema = Yup.object().shape({
    borrowerId: Yup.string().required('Borrower is required'),
    loanType: Yup.string().required('Loan Type is required.'),
    startDate: Yup.string().required('Start Date is required.'),
    endDate: Yup.string().required('End Date is required.'),
    loanAmount: Yup.number().typeError('Loan Amount must be a number').required('Loan Amount is required.').min(0),
    interestRate: Yup.number().typeError('Interest Rate must be a number').required('Interest Rate is required.').min(1).max(100),
    paymentTerm: Yup.string().required('Payment Term is required')
});


const AddLoan = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { successMessage, error, loading, validationErrors } = useSelector((state: RootState) => state.loan);

    // Fetch borrowers data on component mount
    useEffect(() => {
        dispatch(fetchBorrowers());
    }, [dispatch]);

    const borrowers = useSelector(borrowersList);

    // Initialize useForm with the Yup schema
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: LoanReq) => {
        dispatch(addLoan(data));
        reset(); // Optionally reset the form after successful submission
    };

    useEffect(() => {
        dispatch(clearValidationMessages())

        return () => {
            dispatch(clearMessages());
        };
    }, [dispatch])

    if (loading && !borrowers.length) return <Loader />
    return (
        <>
            <Breadcrumb pageName="Add New Loan" linkText="Back" linkTo="/loan" icon={<ArrowLeftIcon className="size-5 inline" />} />
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
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                <div className="w-full xl:w-1/2">
                                    <SelectBox
                                        name="borrowerId"
                                        label="Select Borrower"
                                        options={borrowers}
                                        isRequired={true}
                                        register={register}
                                        errors={errors}
                                        icon={<UserGroupIcon className='size-4 text-body' />}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <SelectBox
                                        name="loanType"
                                        label="Select Loan Type"
                                        options={[
                                            { value: 'Personal', label: 'Personal' },
                                            { value: 'Mortgage', label: 'Mortgage' },
                                        ]}
                                        isRequired={true}
                                        register={register}
                                        errors={errors}
                                        icon={<TableCellsIcon className='size-4 text-body' />}
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                <div className="w-full xl:w-1/2">
                                    <DatePicker
                                        name="startDate"
                                        label="Start Date"
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <DatePicker
                                        name="endDate"
                                        label="End Date"
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Loan Amount <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Loan Amount"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        {...register('loanAmount')}
                                    />
                                    {errors.loanAmount && <p className="text-red-500">{errors.loanAmount.message}</p>}
                                    {validationErrors.loanAmount && <p className="text-red-500">{validationErrors.loanAmount}</p>}
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Interest Rate <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Interest Rate (%)"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        {...register('interestRate')}
                                    />
                                    {errors.interestRate && <p className="text-red-500">{errors.interestRate.message}</p>}
                                    {validationErrors.interestRate && <p className="text-red-500">{validationErrors.interestRate}</p>}
                                </div>
                            </div>   

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                <div className="w-full xl:w-1/2">
                                    <SelectBox
                                        name="paymentTerm"
                                        label="Select Payment Term"
                                        options={[
                                            { value: 'monthly', label: 'Monthly' },
                                            { value: 'quarterly', label: 'Quarterly' },
                                            { value: 'yearly', label: 'Yearly' }
                                        ]}
                                        isRequired={true}
                                        register={register}
                                        errors={errors}
                                        icon={<InformationCircleIcon className='size-4 text-body' />}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    
                                </div>
                            </div>

                            <button className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddLoan;