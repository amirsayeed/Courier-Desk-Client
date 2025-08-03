import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../components/Shared/Loading/Loading';

const DeliveryAgentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading/>
    }

    if (!user || role !== 'delivery_agent') {
        return <Navigate state={ location.pathname } to="/forbidden"/>
    }

    return children;
};

export default DeliveryAgentRoute;