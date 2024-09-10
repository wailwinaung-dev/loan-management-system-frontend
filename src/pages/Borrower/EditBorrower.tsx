import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the borrower ID from URL
import Breadcrumb from "../../component/Breadcrumb";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { BorrowerRes } from '../../types/BorrowerType';
import { fetchBorrowers, updateBorrower } from '../../features/borrower/borrowerThunk';
import Alert from '../../component/Alert';
import { clearMessages, clearValidationMessages } from "../../features/borrower/borrowerSlice";
import Loader from '../../common/Loader';
import { AppDispatch, RootState } from '../../app/store';

// Define the validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required").matches(/^(09)([0-9]{7,9})$/, "Invalid phone number"),
  email: Yup.string().email("Invalid email format"),
  nrc_number: Yup.string().required("NRC number is required").matches(
    /^([1-9]|1[0-4])\/[a-zA-Z]+\([a-zA-Z]\)\d{6}$/,
    "NRC number format is invalid."
  ),
  address: Yup.string().required("Address is required"),
});

const EditBorrower = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>(); // Get the borrower ID from the route params
  const { successMessage, error, loading, validationErrors, borrowers } = useSelector((state: RootState) => state.borrower);

  const borrower = borrowers.find(b => b._id === id); // Find the borrower to edit

  // Initialize useForm with the Yup schema
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BorrowerRes>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Prefill the form with the borrower data when the component mounts
    if (borrower) {
      reset(borrower);
    } else {
      // Fetch borrowers if not already fetched
      dispatch(fetchBorrowers());
    }
  }, [borrower, reset, dispatch]);

  const onSubmit = (data: BorrowerRes) => {
    dispatch(updateBorrower({ ...data, _id: id }))  // Include the borrower ID
      .unwrap() // Unwraps the promise returned by the asyncThunk
      .then(() => {
        // Fetch borrowers after successful update
        dispatch(fetchBorrowers());
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  useEffect(() => {
    // Clear validation messages on component mount
    dispatch(clearValidationMessages());

    return () => {
      dispatch(clearMessages());
    };
  }, [errors.phone, errors.email, errors.nrc_number, dispatch]);

  if (loading || !borrower) return <Loader />;

  return (
    <>
      <Breadcrumb pageName="Edit Borrower" linkText="Back" linkTo="/borrower" icon={<ArrowLeftIcon className="size-5 inline" />} />
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
              {/* Name Field */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    {...register('name')}
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                  {validationErrors.name && <p className="text-red-500">{validationErrors.name}</p>}
                </div>

                {/* Phone Field */}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phone <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    {...register('phone')}
                  />
                  {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                  {validationErrors.phone && <p className="text-red-500">{validationErrors.phone}</p>}
                </div>
              </div>

              {/* Email and NRC Fields */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    {...register('email')}
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    NRC Number <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your NRC Number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    {...register('nrc_number')}
                  />
                  {errors.nrc_number && <p className="text-red-500">{errors.nrc_number.message}</p>}
                  {validationErrors.nrc_number && <p className="text-red-500">{validationErrors.nrc_number}</p>}
                </div>
              </div>

              {/* Address Field */}
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Address <span className="text-meta-1">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter your address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('address')}
                ></textarea>
                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                {validationErrors.address && <p className="text-red-500">{validationErrors.address}</p>}
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
};

export default EditBorrower;
