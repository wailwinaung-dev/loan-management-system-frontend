/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css'; // Make sure you import the CSS for flatpickr
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface DatePickerProps {
    name: string;
    label: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    errors: FieldErrors;
    isRequired?: boolean
}
const DatePicker: React.FC<DatePickerProps> = ({
    name,
    label,
    placeholder = 'mm/dd/yyyy',
    register,
    errors,
    isRequired = false
}) => {

    useEffect(() => {
        // Init flatpickr
        flatpickr(`.form-datepicker-${name}`, {
            mode: 'single',
            static: true,
            monthSelectorType: 'static',
            dateFormat: 'M j, Y',
            prevArrow:
                '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow:
                '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        });


    }, []);

    return (
        <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {label} {isRequired && <span className="text-meta-1">*</span>}
            </label>
            <div className="relative">
                <input
                    {...register(name)} // Register the input for form handling
                    className={`form-datepicker-${name} w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    placeholder={placeholder}
                />
                <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                    <CalendarDaysIcon className='size-6 text-body' />
                </div>

            </div>
            {errors[name] && (
                <p className="text-red-500 mt-2 text-sm">
                    {errors[name]?.message?.toString()}
                </p>
            )}
        </div>
    );
};

export default DatePicker;
