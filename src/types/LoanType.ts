import { BorrowerRes } from "./BorrowerType";
import { RepaymentScheduleType } from "./RepaymentType";
import { ValidationErrors } from "./ValidationErrorType";

export interface LoanReq {
    borrowerId: string;  // ID of the borrower
    loanAmount: number;  // Loan amount
    loanType: string;  // Loan type (enum)
    startDate: string;  // Start date of the loan
    endDate: string;  // End date of the loan
    interestRate: number;  // Interest rate
    paymentTerm: string;
}
// src/types/Borrower.ts
export interface LoanRes {
    _id?: string;  // Optional because when creating a new borrower, the ID may not exist yet
    loanAmount: number;  // Loan amount
    loanType: string;  // Loan type (enum)
    startDate: string;  // Start date of the loan
    endDate: string;  // End date of the loan
    interestRate: number;  // Interest rate
    totalInterest?: number;
    paymentTerm: string;
    remainingBalance: number
    createdAt?: string; // These fields are added by Mongoose automatically
    updatedAt?: string;
    borrower: BorrowerRes
}

export interface LoanState {
    loans: LoanRes[];
    loan: LoanRes | null;
    loading: boolean;
    error?: string;
    successMessage?: string;
    validationErrors: ValidationErrors
    repaymentSchedule: RepaymentScheduleType[]
}

export interface FetchLoanByIdPayload {
    loan: LoanRes;
    repaymentSchedule: RepaymentScheduleType[];
}