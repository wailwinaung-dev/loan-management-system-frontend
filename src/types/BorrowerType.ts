import { ValidationErrors } from "./ValidationErrorType";

// src/types/Borrower.ts
export interface BorrowerRes {
  _id?: string;  // Optional because when creating a new borrower, the ID may not exist yet
  name: string;
  phone: string;
  email?: string;
  address: string;
  nrc_number: string;
  createdAt?: string; // These fields are added by Mongoose automatically
  updatedAt?: string;
}

export interface BorrowerState {
  borrowers: BorrowerRes[];
  borrower?: BorrowerRes;
  loading: boolean;
  error?: string;
  successMessage?: string;
  validationErrors: ValidationErrors
}