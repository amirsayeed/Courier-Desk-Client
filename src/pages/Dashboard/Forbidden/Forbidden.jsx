import React from 'react';
import forbidden from '../../../assets/forbidden-removebg-preview.png'
import { Link } from 'react-router';
const Forbidden = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center px-4 my-10'>
            <img src={forbidden} alt="" />
            <Link to="/" className="mt-6">
                <button className="btn btn-primary">Go to Home</button>
            </Link>
        </div>
    );
};

export default Forbidden;