// components/BookingSelector.jsx

import React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FaSearch } from 'react-icons/fa';
import { Controller } from 'react-hook-form';
import '../../App.css';
import ErrorText from '../ErrorText';
import useTicketFinder from '../../hooks/useTicketFinder';


const BookingSelector = () => {

    const {
        departureDistricts, 
        destinationDistricts,
        register,
        handleSubmit,
        control,
        errors,
        journeyDate,
        onSubmit,
    } = useTicketFinder();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col items-center justify-center rounded-full w-6xl px-16 py-8 bg-white gap-6'>
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Select Your Travel Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">

                        {/* Departure District */}
                        <div>
                            <label className="label uppercase text-sm font-medium text-gray-700">Depart From</label>
                            <select
                                {...register('departDistrict', { required: true })}
                                defaultValue="Pick a District"
                                className="select select-bordered w-full">
                                <option value="" disabled>Pick a District</option>
                                {departureDistricts?.map((d, idx) => (
                                    <option key={idx} value={d}>{d}</option>
                                ))}
                            </select>
                            {errors.departDistrict && <ErrorText message={errors.departDistrict.message} />}
                        </div>

                        {/* Destination District */}
                        <div>
                            <label className="label uppercase text-sm font-medium text-gray-700">Destination</label>
                            <select
                                {...register('destinationDistrict', { required: true })}
                                defaultValue="Pick a District"
                                className="select select-bordered w-full">
                                <option value="" disabled>Pick a District</option>
                                {destinationDistricts?.map((d, idx) => (
                                    <option key={idx} value={d}>{d}</option>
                                ))}
                            </select>
                            {errors.destinationDistrict && <ErrorText message={errors.destinationDistrict.message} />}
                        </div>

                        {/* Journey Date */}
                        <div>
                            <label className="label uppercase text-sm font-medium text-gray-700">Journey Date</label>
                            <Controller
                                name="journeyDate"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        minDate={dayjs()}
                                        slotProps={{ textField: { fullWidth: true, variant: 'outlined', size: 'small' } }}
                                    />
                                )}
                            />
                        </div>

                        {/* Return Date */}
                        <div>
                            <label className="label uppercase text-sm font-medium text-gray-700">
                                Return Date <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <Controller
                                name="returnDate"
                                control={control}
                                rules={{
                                    validate: value =>
                                        !value || !journeyDate || !dayjs(value).isBefore(journeyDate)
                                        || 'Return date cannot be before journey date'
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        minDate={journeyDate || dayjs()}
                                        slotProps={{
                                            textField: { fullWidth: true, size: 'small' },
                                            field: { clearable: true },
                                        }}
                                    />
                                )}
                            />
                            {errors.returnDate && <ErrorText message={errors.returnDate.message} />}
                        </div>

                        {/* Search Button */}
                        <div className="flex items-end">
                            <button type='submit' className="btn btn-1 font-semibold flex items-center justify-center gap-2 w-full h-10">
                                <FaSearch /> Search for Bus
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        </LocalizationProvider>
    );
};

export default BookingSelector;