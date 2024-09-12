import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Squares2X2Icon, UserGroupIcon, BuildingLibraryIcon, ArrowLeftIcon, ListBulletIcon } from '@heroicons/react/16/solid';
interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef<HTMLButtonElement>(null);
    const sidebar = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target as Node) ||
                trigger.current.contains(target as Node)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [sidebarOpen]);

    // Close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [sidebarOpen]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/" className="flex items-center justify-center w-full">
                    <BuildingLibraryIcon className='size-11 text-white mr-2' /> <span className='text-white text-3xl font-bold'>LMS</span>
                </NavLink>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <ArrowLeftIcon className='text-white size-6' />
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-1 py-4 px-4 lg:mt-1 lg:px-6">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* <!-- Menu Item Calendar --> */}
                            <li>
                                <NavLink
                                    to="/"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                                        pathname.includes('dashboard')) &&
                                        'bg-graydark dark:bg-meta-4'
                                        }`}
                                >
                                    <Squares2X2Icon className='size-6'/>
                                    Dashboard
                                </NavLink>
                            </li>
                            {/* <!-- Menu Dashboard --> */}


                            {/* <!-- Menu Item Borrower --> */}
                            <li>
                                <NavLink
                                    to="/borrower"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('borrower') &&
                                        'bg-graydark dark:bg-meta-4'
                                        }`}
                                >
                                    <UserGroupIcon className='size-6' />
                                    Borrowers
                                </NavLink>
                            </li>
                            {/* <!-- Menu Item Borrower --> */}

                            {/* <!-- Menu Item Loan --> */}
                            <li>
                                <NavLink
                                    to="/loan"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('loan') &&
                                        'bg-graydark dark:bg-meta-4'
                                        }`}
                                >
                                    <ListBulletIcon className='size-6' />
                                    Loans
                                </NavLink>
                            </li>
                            {/* <!-- Menu Item Borrower --> */}

                        </ul>
                    </div>
                    {/* <!-- Menu Group --> */}
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;
