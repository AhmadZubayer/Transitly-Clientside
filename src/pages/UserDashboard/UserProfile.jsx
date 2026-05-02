import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleEditProfile = () => {
        // TODO: Implement edit profile functionality
        console.log('Edit profile clicked');
    };

    if (!user) {
        return (
            <div className='p-6'>
                <div className='text-center text-gray-500'>
                    <p>Loading user profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='p-6'>
            <div className='max-w-2xl mx-auto'>
                {/* Profile Card */}
                <div className='bg-white rounded-lg shadow-lg p-8'>
                    {/* Profile Picture Section */}
                    <div className='flex flex-col items-center mb-8'>
                        {user?.photoURL && (
                            <img
                                src={user.photoURL}
                                alt={user?.displayName || 'User'}
                                className='w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white'
                            />
                        )}
                        <h2 className='text-3xl font-bold text-gray-800 mt-6'>
                            {user?.displayName || 'User'}
                        </h2>
                    </div>

                    {/* Profile Details */}
                    <div className='space-y-6 pt-8'>
                        {/* Email */}
                        <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
                            <div className='flex-shrink-0'>
                                <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium text-gray-600'>Email</p>
                                <p className='text-lg text-gray-900'>{user?.email}</p>
                            </div>
                        </div>

                        {/* Role */}
                        <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
                            <div className='flex-shrink-0'>
                                <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium text-gray-600'>Role</p>
                                <p className='text-lg text-gray-900'>{user?.role || 'user'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='mt-8 flex gap-4 justify-center'>
                        <button
                            onClick={handleEditProfile}
                            className='btn btn-1'
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={handleSignOut}
                            className='btn btn-1'
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
