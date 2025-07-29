import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <h1>landing page</h1>
            <Outlet/>
        </div>
    );
};

export default RootLayout;