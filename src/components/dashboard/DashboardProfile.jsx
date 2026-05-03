import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const DashboardProfile = ({ fallbackName = 'User' }) => {
    const { user, logOut } = useAuth();
    const { role } = useRole();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleEditProfile = () => {
        console.log('Edit profile clicked');
    };

    if (!user) {
        return (
            <div className='p-6'>
                <div className='text-center text-gray-500'>
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    const currentRole = role || user?.role || 'user';

    return (
        <div className='p-6'>
            <div className='max-w-2xl mx-auto'>
                <div className='bg-white rounded-lg shadow-lg p-8'>
                    <div className='flex flex-col items-center mb-8'>
                        {user?.photoURL && (
                            <img
                                src={user.photoURL}
                                alt={user?.displayName || fallbackName}
                                className='w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white'
                            />
                        )}
                        <h2 className='text-3xl font-bold font-adaptive mt-6'>
                            {user?.displayName || fallbackName}
                        </h2>
                    </div>

                    <div className='space-y-6 pt-8'>
                        <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
                            <div className='shrink-0'>
                                <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium font-adaptive opacity-70'>Email</p>
                                <p className='text-lg font-adaptive'>{user?.email}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
                            <div className='shrink-0'>
                                <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium font-adaptive opacity-70'>Role</p>
                                <p className='text-lg font-adaptive' style={{ textTransform: 'capitalize' }}>{currentRole}</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 flex gap-4 justify-center'>
                        <button onClick={handleEditProfile} className='btn btn-1'>
                            Edit Profile
                        </button>
                        <button onClick={handleSignOut} className='btn btn-1'>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;
