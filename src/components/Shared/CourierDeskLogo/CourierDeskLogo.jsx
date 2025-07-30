import React from 'react';
import { Link } from 'react-router';
import logo from '../../../assets/icons8-courier-64.png'
const CourierDeskLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center'>
                <img src={logo} alt="" className='w-10 h-10 object-cover' />
                <h3 className='font-bold text-lg md:text-2xl'>CourierDesk</h3>
            </div>
        </Link>
    );
};

export default CourierDeskLogo;