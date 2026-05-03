import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: users = [],
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { mutateAsync: updateRole, isPending: isRoleUpdating } = useMutation({
        mutationFn: async ({ id, role }) => {
            const res = await axiosSecure.patch(`/users/${id}/role`, { role });
            return res.data;
        },
        onSuccess: () => {
            refetch();
        }
    });

    const handleRoleChange = async (id, role) => {
        try {
            await updateRole({ id, role });
        } catch (updateError) {
            console.error('Failed to update role:', updateError);
        }
    };

    return (
        <div className='p-4'>
            <div className='space-y-4'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    <h2 className='text-xl font-bold text-gray-800 font-adaptive'>
                        Manage Users ({users.length})
                    </h2>
                </div>

                {isLoading && (
                    <div className='flex justify-center items-center p-8'>
                        <Loading />
                    </div>
                )}

                {isError && (
                    <div className='text-center p-4 text-red-500 font-adaptive'>
                        <p>Error loading users: {error?.message}</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        {users.length > 0 ? (
                            <div className='overflow-x-auto bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm'>
                                <table className='table table-zebra table-sm w-full'>
                                    <thead>
                                        <tr className='bg-gray-50'>
                                            <th className='text-gray-700 font-adaptive uppercase text-[11px]'>No.</th>
                                            <th className='text-gray-700 font-adaptive uppercase text-[11px]'>Name</th>
                                            <th className='text-gray-700 font-adaptive uppercase text-[11px]'>Email</th>
                                            <th className='text-gray-700 font-adaptive uppercase text-[11px]'>Role</th>
                                            <th className='text-gray-700 font-adaptive uppercase text-[11px] text-center'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={user._id} className='hover'>
                                                <th className='text-gray-600 font-adaptive'>{index + 1}</th>
                                                <td className='font-semibold text-gray-800 font-adaptive'>{user.name || user.displayName || 'N/A'}</td>
                                                <td className='text-gray-700 font-adaptive'>{user.email}</td>
                                                <td className='text-gray-700 font-adaptive capitalize'>{user.role || 'user'}</td>
                                                <td className='text-center'>
                                                    <div className='dropdown dropdown-end'>
                                                        <button
                                                            tabIndex={0}
                                                            className='btn btn-ghost btn-sm text-xl'
                                                            disabled={isRoleUpdating}
                                                        >
                                                            ⋮
                                                        </button>
                                                        <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-1 w-44 p-2 shadow'>
                                                            <li>
                                                                <button onClick={() => handleRoleChange(user._id, 'admin')}>
                                                                    Make Admin
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button onClick={() => handleRoleChange(user._id, 'vendor')}>
                                                                    Make Vendor
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button className='text-red-600' onClick={() => handleRoleChange(user._id, 'fraud')}>
                                                                    Mark as Fraud
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className='text-center p-12 bg-gray-50 rounded-lg'>
                                <p className='text-gray-600 text-lg'>No users found</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;