import React from 'react';
import logo from '../../../assets/icons8-courier-64.png'
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { BsFacebook } from 'react-icons/bs';
const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
        <aside>
            <img src={logo} className='w-12 h-12 object-cover' alt="" />
            <h3 className='font-bold text-xl md:text-3xl'>CourierDesk</h3>
        </aside>
        <nav>
            <h6 className="text-lg font-bold">Find us on</h6>
             <div className="grid grid-flow-col gap-8 md:gap-12 lg:gap-16 items-center justify-center">
                <a href="https://www.facebook.com/" target="_blank">
                <BsFacebook size={25} />
                </a>
                <a href="https://x.com/" target="_blank">
                <FaSquareXTwitter size={25} />
                </a>
                <a href="https://www.linkedin.com/" target="_blank">
                <FaLinkedin size={25} />
                </a>
                <a href="https://www.youtube.com/" target="_blank">
                <FaYoutube size={30} />
                </a>
            </div>
        </nav>
        <aside>
            <p className='font-medium'>Copyright © {new Date().getFullYear()} - All right reserved by CourierDesk</p>
        </aside>
        </footer>
    );
};

export default Footer;