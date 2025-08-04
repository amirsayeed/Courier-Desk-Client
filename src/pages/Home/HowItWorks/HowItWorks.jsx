import React from 'react';
import { UserPlus, PackagePlus, CreditCard, ListChecks, MapPin } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <UserPlus size={40} className="text-primary" />,
    title: 'Create an Account',
    description: 'Sign up in seconds to start sending and receiving parcels securely.',
  },
  {
    id: 2,
    icon: <PackagePlus size={40} className="text-primary" />,
    title: 'Book a Parcel',
    description: 'Fill out pickup and delivery info easily using our intuitive form.',
  },
  {
    id: 3,
    icon: <CreditCard size={40} className="text-primary" />,
    title: 'Choose Payment',
    description: 'Pay online with Stripe or opt for Cash on Delivery (COD).',
  },
  {
    id: 4,
    icon: <ListChecks size={40} className="text-primary" />,
    title: 'View Booking History',
    description: 'Check statuses of all your bookings in one convenient dashboard.',
  },
  {
    id: 5,
    icon: <MapPin size={40} className="text-primary" />,
    title: 'Track Your Parcel',
    description: 'Follow your delivery live on map from dispatch to delivery.',
  },
];

const HowItWorks = () => {
  return (
    <div className="my-10 px-2">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral">
          How CourierDesk Works
        </h2>
        <p className="text-base-content font-medium max-w-2xl mx-auto">
          Sending a parcel is now easier than ever. Follow these 5 simple steps to get started.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {steps.map((step) => (
            <div key={step.id} className="card w-80 border border-primary shadow-lg hover:shadow-xl transition">
              <div className="card-body items-center text-center">
                <div className="mb-4">{step.icon}</div>
                <h3 className="card-title text-lg font-bold">{step.title}</h3>
                <p className="text-sm font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
