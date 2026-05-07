import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6">
            <Card className="max-w-md w-full text-center py-12 px-8">
                <h1 className="text-8xl font-black text-gray-800 mb-4 font-adaptive">
                    404
                </h1>
                <p className="text-xl font-semibold text-gray-600 mb-8 font-adaptive">
                    this page does not exist :(
                </p>
                <button 
                    onClick={() => navigate('/')}
                    className="btn btn-1 px-8"
                >
                    Back to Home
                </button>
            </Card>
        </div>
    );
};

export default Error404;
