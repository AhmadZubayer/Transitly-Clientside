import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import Card from '../components/Card';
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
        <div className='flex flex-col md:flex-row gap-6 p-4 max-w-6xl mx-auto'>

            <div className='w-full md:w-1/3 lg:w-1/4'>
                <Card className="p-4 border border-gray-200/50 dark:border-gray-800 shadow-lg">
                    <p className='text-[11px] uppercase font-black text-gray-500 mb-4 font-adaptive tracking-wider px-1 opacity-80'>
                        Policy Categories
                    </p>
                    <div className='flex flex-col gap-2'>
                        {policies?.map((policy) => (
                            <button
                                key={policy.id}
                                onClick={() => setSelectedPolicy(policy)}
                                className={`btn btn-md justify-start rounded-xl font-adaptive border-none transition-all duration-300 ${
                                    selectedPolicy?.id === policy.id 
                                    ? 'btn-1 scale-[1.02] shadow-md' 
                                    : 'bg-gray-100/50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                                }`}
                            >
                                <span className="truncate">{policy.name}</span>
                            </button>
                        ))}
                    </div>
                </Card>
            </div>

            <div className='flex-1'>
                {selectedPolicy ? (
                    <Card className="p-8 border border-gray-200/50 dark:border-gray-800 shadow-lg h-full">
                        <div className="mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                            <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white font-adaptive">
                                {selectedPolicy.name}
                            </h1>
                        </div>
                        <div className='prose prose-sm md:prose-base dark:prose-invert max-w-none'>
                            <p className='text-gray-600 dark:text-gray-300 font-adaptive leading-relaxed whitespace-pre-line'>
                                {selectedPolicy.description}
                            </p>
                        </div>
                    </Card>
                ) : (
                    <div className='h-[400px] flex flex-col items-center justify-center bg-white/50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700'>
                        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                             <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                             </svg>
                        </div>
                        <p className='text-gray-400 font-adaptive font-bold'>Select a policy to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Policies;