import React, { useState } from 'react';
import Card1 from '../Card-1';

const TicketPeek = () => {
    // Use lazy initialization to retrieve booking data from localStorage
    const [bookingData] = useState(() => {
        const savedData = localStorage.getItem('bookingData');
        return savedData ? JSON.parse(savedData) : null;
    });

    return (
        <Card1 width="100%" height="auto">
            <div className="flex flex-col gap-4">
                {/* Header Message */}
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        You're just one step away.
                    </h2>
                    <p className="text-lg text-gray-600">
                        Sign in to continue.
                    </p>
                </div>

                {/* Ticket Details */}
                {bookingData ? (
                    <div className="border-t-2 border-gray-300 pt-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                            Your Journey Details
                        </h3>
                        
                        <div className="space-y-3">
                            {/* From */}
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">From:</span>
                                <span className="text-md font-semibold text-gray-800">
                                    {bookingData.departDistrict}
                                </span>
                            </div>

                            {/* To */}
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">To:</span>
                                <span className="text-md font-semibold text-gray-800">
                                    {bookingData.destinationDistrict}
                                </span>
                            </div>

                            {/* Journey Date */}
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Journey Date:</span>
                                <span className="text-md font-semibold text-gray-800">
                                    {new Date(bookingData.journeyDate).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Return Date */}
                            {bookingData.returnDate && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">Return Date:</span>
                                    <span className="text-md font-semibold text-gray-800">
                                        {new Date(bookingData.returnDate).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <p>No booking data found. Please search for a bus first.</p>
                    </div>
                )}
            </div>
        </Card1>
    );
};

export default TicketPeek;