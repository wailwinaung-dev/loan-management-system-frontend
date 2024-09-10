import { ReactNode } from "react";

export default interface BreadcrumbProps {
  pageName: string;
  linkText: string;
  linkTo: string;
  icon?: ReactNode 
}