import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Define the validation schema using Yup
const schema = Yup.object().shape({
    paidAmount: Yup.number().typeError("Payment Amount must be a number").required("Payment Amount is required").min(1),
});

interface RepaymentProcessProps {
    onSubmit: (data: { paidAmount: number }) => void;
}

const RepaymentProcess: React.FC<RepaymentProcessProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    // Handle form submission
    const handleFormSubmit = (data: { paidAmount: number }) => {
        onSubmit(data);
        reset(); // Reset the form after submission
    };

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                {/* Flexbox for horizontal layout */}
                <div className="flex flex-col xl:flex-row items-center gap-4">
                    {/* Payment amount input */}
                    <div className="flex items-center">
                        <label className="block mr-4 align-middle">
                            Payment Amount <span className="text-meta-1">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the payment amount"
                            className="w-full xl:w-auto rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            {...register('paidAmount')}
                        />
                    </div>

                    {/* Submit button */}
                    <div className="mt-4 xl:mt-0">
                        <button type="submit" className="rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90">
                            Make a Payment
                        </button>
                    </div>
                    {/* Error message */}
                    {errors.paidAmount && <p className="ml-4 text-red-500">{errors.paidAmount.message}</p>}
                </div>

            </form>
        </div>
    );
};

export default RepaymentProcess;
