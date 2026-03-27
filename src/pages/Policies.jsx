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
        <div className='flex gap-4 p-4'>
            {/* Policy Buttons */}
            <div className='flex flex-col gap-3 card'>
                {policies?.map((policy) => (
                    <button
                        key={policy.id}
                        onClick={() => setSelectedPolicy(policy)}
                        className={`btn rounded-lg ${selectedPolicy?.id === policy.id ? 'btn-selected' : 'btn-3'}`}
                    >
                        {policy.name}
                    </button>
                ))}
            </div>

            {/* Policy Details Card */}
            <div className='flex-1 card'>
                {selectedPolicy && (
                    <div className='bg-white rounded-lg p-6 '>
                        <h2 className='text-2xl font-bold mb-4'>{selectedPolicy.title}</h2>
                        <p className='text-base text-gray-700'>{selectedPolicy.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Policies;