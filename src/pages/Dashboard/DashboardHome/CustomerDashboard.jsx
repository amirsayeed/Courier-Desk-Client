import React from 'react';
import { FaBox, FaPlusSquare, FaSearchLocation } from 'react-icons/fa';

const features = [
  {
    title: 'Book a Parcel',
    description: 'Quickly book a new parcel for delivery with just a few details.',
    icon: <FaPlusSquare className="text-4xl text-primary" />,
  },  
  {
    title: 'My Parcels',
    description: 'View all your booked parcels and their current statuses.',
    icon: <FaBox className="text-4xl text-primary" />,
  },
  {
    title: 'Track Parcel',
    description: 'Track your parcels in real-time using tracking ID.',
    icon: <FaSearchLocation className="text-4xl text-primary" />,
  }
];

const CustomerDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-10">Welcome to Your Dashboard</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="card bg-base-100 shadow-md border border-primary hover:shadow-lg transition duration-200">
            <div className="card-body items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="card-title text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
