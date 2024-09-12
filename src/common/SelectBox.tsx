/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface SelectBoxProps {
    name: string;
    label: string;
    options: { value?: string; label: string }[];
    placeholder?: string;
    isRequired?: boolean;
    register: any;
    errors: any;
    icon: ReactNode,
}

const SelectBox: React.FC<SelectBoxProps> = ({
    name,
    label,
    options,
    placeholder = 'Select an option',
    isRequired = false,
    register,
    errors,
    icon,
}) => {
    return (
        <div>
            <label className="mb-3 block text-black dark:text-white">
                {label} {isRequired && <span className="text-meta-1">*</span>}
            </label>

            <div className="relative z-20 bg-white dark:bg-form-input">
                <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    {icon}
                </span>

                <select
                    {...register(name, { required: isRequired })}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                >
                    <option value="">
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <ChevronDownIcon className='size-4' />
                </span>

            </div>
            {errors[name] && (
                <p className="text-red-500 mt-2 text-sm">
                    {errors[name]?.message?.toString()}
                </p>
            )}
        </div>
    );
};

export default SelectBox;
