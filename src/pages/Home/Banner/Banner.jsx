import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const slides = [
  {
    id: 1,
    image: 'https://i.ibb.co/gCp12HG/Parcel-hero-courier-scaled-e1710254637620.jpg',
    title: 'Fast & Reliable Courier Service',
    description:
      'Deliver parcels across the country\nwith guaranteed speed and safety.',
  },
  {
    id: 2,
    image: 'https://i.ibb.co/rKs0dPgK/9-Why-Must-Your-Brand-Absolutely-Have-a-Custom-Order-Tracking-Page-1.png',
    title: 'Track Your Parcel in Real Time',
    description:
      'Stay updated with every movement\nfrom pickup to delivery on our live map.',
  },
  {
    id: 3,
    image: 'https://i.ibb.co/QFD9LTVT/parcel-delivery-with-good-depth-field.jpg',
    title: 'Secure Payments with COD & Online',
    description:
      'Flexible payment options including\nCash on Delivery and Stripe checkout.',
  },
];

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        interval={4000}
        transitionTime={1000}
        swipeable
        emulateTouch
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-[75vh] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex items-center text-left px-6 md:px-16 text-neutral-content">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-3xl md:text-5xl text-primary font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl whitespace-pre-line">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
