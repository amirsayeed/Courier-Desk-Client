import React from 'react';
import DashboardStats from '../Admin/DashboardStats/DashboardStats';

const AdminDashboard = () => {
    
    return (
        <div className="px-6 py-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <DashboardStats />
        </div>
    );
};

export default AdminDashboard;