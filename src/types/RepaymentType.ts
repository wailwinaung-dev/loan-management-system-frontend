import { LoanRes } from "./LoanType";

export interface RepaymentReq {
    loanId: string;
    paymentDate: Date;
    amountPaid: number;
}

// src/types/Borrower.ts
export interface RepaymentRes {
    _id?: string;  // Optional because when creating a new borrower, the ID may not exist yet
    paymentDate: Date;  // Amount of the loan
    amountPaid: number;
    createdAt?: string; // These fields are added by Mongoose automatically
    updatedAt?: string;
    loan: LoanRes
}

export interface RepaymentState {
    repayments: RepaymentRes[];
    loading: boolean;
    error?: string;
    successMessage?: string;
}

export interface RepaymentScheduleType {
    paymentNumber: number;
    paymentDate: Date;
    paymentAmount: number;
    interestPayment: number;
    principalPayment: number;
    remainingBalance: number;
}
