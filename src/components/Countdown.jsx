import React, { useState, useEffect } from 'react';

const Countdown = ({ departureDateTime }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPast: false
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const departureDate = new Date(departureDateTime);
            const now = new Date();
            const difference = departureDate - now;

            if (difference <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isPast: true
                });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({
                    days,
                    hours,
                    minutes,
                    seconds,
                    isPast: false
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [departureDateTime]);

    if (timeLeft.isPast) {
        return null;
    }

    return (
        <div className="grid grid-flow-col gap-3 text-center auto-cols-max justify-center">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-2xl">
                    <span style={{ "--value": timeLeft.days }} aria-live="polite">
                        {timeLeft.days}
                    </span>
                </span>
                <span className="text-xs">days</span>
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-2xl">
                    <span style={{ "--value": timeLeft.hours }} aria-live="polite">
                        {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                </span>
                <span className="text-xs">hours</span>
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-2xl">
                    <span style={{ "--value": timeLeft.minutes }} aria-live="polite">
                        {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                </span>
                <span className="text-xs">min</span>
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-2xl">
                    <span style={{ "--value": timeLeft.seconds }} aria-live="polite">
                        {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                </span>
                <span className="text-xs">sec</span>
            </div>
        </div>
    );
};

export default Countdown;

