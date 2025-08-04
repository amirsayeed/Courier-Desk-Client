import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import Faqs from '../FAQs/Faqs';
import Pricing from '../Pricing/Pricing';

const Home = () => {
    return (
        <div className="bg-base-100">
            <Banner/>
            <HowItWorks/>
            <Pricing/>
            <Faqs/>
        </div>
    );
};

export default Home;