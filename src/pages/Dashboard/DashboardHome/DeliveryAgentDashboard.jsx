import React from 'react';
import { FaClipboardList, FaTruck, FaMapMarkedAlt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';

const agentFeatures = [
  {
    title: 'View Assigned Parcels',
    description: 'See all parcels assigned to you with detailed info and statuses.',
    icon: <FaClipboardList className="text-4xl text-primary" />,
  },
  {
    title: 'Update Parcel Status',
    description: 'Mark parcels as Picked Up, In Transit, Delivered, or Failed.',
    icon: <FaTruck className="text-4xl text-primary" />,
  },
  {
    title: 'Optimized Delivery Route',
    description: 'Get the best delivery route using Google Maps integration (coming soon).',
    icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
  },
];

const DeiveryAgentDashboard = () => {
  const {user} = useAuth();
  return (
    <div className="p-6 space-y-3">
    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Welcome, {user.displayName}!</h1>
    <p className="text-center text-base-content mb-8">
        Here’s what you can do today to keep deliveries moving smoothly.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agentFeatures.map((feature, idx) => (
        <div
            key={idx}
            className="card bg-base-100 border border-primary shadow-md rounded-lg p-6 flex flex-col items-center text-center"
        >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
        </div>
        ))}
    </div>
    </div>
  );
};

export default DeiveryAgentDashboard;
