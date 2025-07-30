import React from 'react';
import { Link, NavLink } from 'react-router';
import CourierDeskLogo from '../CourierDeskLogo/CourierDeskLogo';


const Navbar = () => {

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/book-parcel">Book Parcel</NavLink></li>
    </>
  );

  return (
    <div className="bg-base-100 sticky top-0 z-50 shadow-md">
      <div className="navbar max-w-[1500px] mx-auto md:px-3">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost p-2 lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg font-medium">
              {links}
            </ul>
          </div>
          <CourierDeskLogo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-medium">
            {links}
          </ul>
        </div>

        <div className="navbar-end">
            <Link to="/login" className="btn text-white btn-primary p-2 text-sm rounded-md">
              Login
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
