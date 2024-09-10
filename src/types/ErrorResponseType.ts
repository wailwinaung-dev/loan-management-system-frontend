// types/ErrorResponseType.ts
export interface ErrorResponse {
    errors: { [key: string]: string }; // Key-value pairs of field names and error messages
    message: string;
  }
  