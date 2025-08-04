import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div className="bg-base-100">
            <Banner/>
            <HowItWorks/>
        </div>
    );
};

export default Home;