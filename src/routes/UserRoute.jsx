import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';

const UserRoute = ({children}) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'user') {
        return (
            <div className='flex justify-center items-center p-8'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold text-red-600'>Access Denied</h2>
                    <p className='text-gray-600 mt-2'>You don't have permission to access this page.</p>
                </div>
            </div>
        )
    }

    return children;
};

export default UserRoute;