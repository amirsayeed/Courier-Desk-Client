import { NavLink, Outlet } from 'react-router';
import CourierDeskLogo from '../components/Shared/CourierDeskLogo/CourierDeskLogo';
import { FaBox, FaSearchLocation, FaShippingFast, FaUsers } from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

            {/* Navbar */}
            <div className="navbar bg-primary w-full lg:hidden text-primary-content">
            <div className="flex-none">
                <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost text-primary-content">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
                </label>
            </div>
            <div className="mx-2 flex-1 px-2 font-semibold text-primary-content">Dashboard</div>
            </div>

            {/* Main Content Area */}
            <div className="bg-base-100 min-h-screen p-4">
            <Outlet />
            </div>

            </div>

            {/* Sidebar */}
            <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-secondary text-secondary-content min-h-full gap-2 w-80 p-4 font-medium text-base">

            {/* Sidebar Logo */}
            <CourierDeskLogo />

            {/* Customer links */}
            {!roleLoading && role === 'customer' && (
                <>
                <li>
                    <NavLink to="/dashboard/my-parcels">
                        <FaBox className="inline mr-2" /> My Parcels
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/track">
                        <FaSearchLocation className="inline mr-2" /> Track Parcel
                    </NavLink>
                </li>
                </>
            )
            }

            {/* delivery agent links */}
            {!roleLoading && role === 'delivery_agent' && (
                <>
                <li>
                    <NavLink to="/dashboard/assignedParcels">
                        <FaShippingFast className="inline mr-2" /> Assigned Parcels
                    </NavLink>
                </li>
                
                </>
            )
            }

            {/* admin links */}
            {!roleLoading && role === 'admin' && (
                <>
                    <li>
                        <NavLink to="/dashboard/allUsers">
                            <FaUsers className="inline mr-2" /> All Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allBookings">
                            <FaBox className="inline mr-2" /> All Bookings
                        </NavLink>
                    </li>
                </>
            )

            }

            </ul>
            </div>
        </div>

    );
};

export default DashboardLayout;