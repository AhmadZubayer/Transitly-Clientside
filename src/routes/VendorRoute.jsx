import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const VendorRoute = ({children}) => {
     const { loading, user } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <div>Loading...</div>
    }

    if (role !== 'vendor') {
        return <div>Access Denied: Vendor access required</div>
    }

    return children;
};

export default VendorRoute;