import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => {
     const { loading, user } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'user') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;