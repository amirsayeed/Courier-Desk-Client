import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../../components/Shared/Loading/Loading';
import Forbidden from '../Forbidden/Forbidden';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';
import DeliveryAgentDashboard from './DeliveryAgentDashboard'



const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();
    
    if (roleLoading) {
        return <Loading/>;
    }

    if(role === 'customer'){
        return <CustomerDashboard/>
    }
    else if(role === 'delivery_agent'){
        return <DeliveryAgentDashboard/>
    }
    else if(role ==='admin'){
        return <AdminDashboard/>
    }
    else {
        return <Forbidden/>
    }
};

export default DashboardHome;