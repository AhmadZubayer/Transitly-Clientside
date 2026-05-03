import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import '../App.css';

const Policies = () => {

    const axiosInstance = useAxios();
    const [policies, setPolicies] = useState([]);
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    useEffect(() => {
        axiosInstance.get('/policies').then(res => {
            const policiesData =  res.data  ;
            setPolicies(policiesData);
            if (policiesData && policiesData.length > 0) {
                setSelectedPolicy(policiesData[0]);
            }
        }).catch(err => console.error('Error fetching policies:', err));
    }, []);

    return (
        <div className='flex flex-col md:flex-row gap-4 p-4 max-w-6xl mx-auto'>
            {/* Policy Buttons */}
            <div className='flex flex-col gap-2 w-full md:w-1/4'>
                <p className='text-[10px] uppercase font-bold text-gray-500 mb-2 font-adaptive opacity-70 px-1'>Policy Types</p>
                {policies?.map((policy) => (
                    <button
                        key={policy.id}
                        onClick={() => setSelectedPolicy(policy)}
                        className={`btn btn-sm justify-start rounded-xl font-adaptive border-none shadow-sm ${selectedPolicy?.id === policy.id ? 'btn-1' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        {policy.name}
                    </button>
                ))}
            </div>

            {/* Policy Details Card */}
            <div className='flex-1'>
                {selectedPolicy ? (
                    <div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm'>
                        <h2 className='text-xl font-black mb-4 font-adaptive text-gray-800'>{selectedPolicy.title}</h2>
                        <div className='prose dark:prose-invert max-w-none'>
                            <p className='text-sm leading-relaxed text-gray-600 font-adaptive dark:text-gray-300'>{selectedPolicy.description}</p>
                        </div>
                    </div>
                ) : (
                    <div className='h-full flex items-center justify-center bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800'>
                        <p className='text-gray-400 font-adaptive'>Select a policy to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Policies;