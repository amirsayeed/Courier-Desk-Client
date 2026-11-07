import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import Faqs from '../FAQs/Faqs';
import Pricing from '../Pricing/Pricing';
import WhyChooseCourierDesk from '../WhyChooseCourierDesk/WhyChooseCourierDesk';
import HomeCallToAction from '../HomeCallToAction/HomeCallToAction';

const Home = () => {
    return (
        <div className="bg-base-100">
            <Banner/>
            <HowItWorks/>
            <WhyChooseCourierDesk/>
            <Pricing/>
            <HomeCallToAction/>
            <Faqs/>
        </div>
    );
};

export default Home;