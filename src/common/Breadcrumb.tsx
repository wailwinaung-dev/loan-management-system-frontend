import { Link } from 'react-router-dom';
import BreadcrumbProps from '../types/BreadcrumbType';
const Breadcrumb = ({ pageName, linkText, linkTo, icon }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h4 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h4>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium text-blue-500" to={linkTo}>
            {icon && <span className="mr-1">{icon}</span>} {linkText}
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
