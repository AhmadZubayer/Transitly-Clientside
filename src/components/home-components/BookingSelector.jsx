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
import Card1, { CardWrapper } from '../Card-1';


const BookingSelector = () => {

    const {
        departureDistricts,
        destinationDistricts,
        register,
        handleSubmit,
        control,
        errors,

        selDepartDistrict,
        selDestinationDistrict,
        selJourneyDate,

        onSubmit,
    } = useTicketFinder();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto w-full">
                <CardWrapper>
                    <Card1 width="100%" height="auto">
                        <div className='flex flex-col items-center justify-center px-8 py-4 gap-4'>
                            <h2 className="text-xl font-bold text-gray-800 text-center font-adaptive">Select Your Travel Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 w-full">

                                {/* Departure District */}
                                <div>
                                    <label className="label py-1 uppercase text-xs font-medium text-gray-700 font-adaptive">Depart From</label>
                                    <select
                                        {...register('selDepartDistrict', { required: true })}
                                        defaultValue="Pick a District"
                                        className="select select-bordered select-sm w-full">
                                        <option value="" disabled>Pick a District</option>
                                        {departureDistricts?.map((d, idx) => (
                                            <option key={idx} value={d}>{d}</option>
                                        ))}
                                    </select>
                                    {errors.selDepartDistrict && <ErrorText message={errors.selDepartDistrict.message} />}
                                </div>

                                {/* Destination District */}
                                <div>
                                    <label className="label py-1 uppercase text-xs font-medium text-gray-700 font-adaptive">Destination</label>
                                    <select
                                        {...register('selDestinationDistrict', { required: true })}
                                        defaultValue="Pick a District"
                                        className="select select-bordered select-sm w-full">
                                        <option value="" disabled>Pick a District</option>
                                        {destinationDistricts?.map((d, idx) => (
                                            <option key={idx} value={d}>{d}</option>
                                        ))}
                                    </select>
                                    {errors.selDestinationDistrict && <ErrorText message={errors.selDestinationDistrict.message} />}
                                </div>

                                {/* Journey Date */}
                                <div>
                                    <label className="label py-1 uppercase text-xs font-medium text-gray-700 font-adaptive">Journey Date</label>
                                    <Controller
                                        name="selJourneyDate"
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
                                    <label className="label py-1 uppercase text-xs font-medium text-gray-700 font-adaptive">
                                        Return Date <span className="text-gray-400 text-[10px]">(Optional)</span>
                                    </label>
                                    <Controller
                                        name="returnDate"
                                        control={control}
                                        rules={{
                                            validate: value =>
                                                !value || !selJourneyDate || !dayjs(value).isBefore(selJourneyDate)
                                                || 'Return date cannot be before journey date'
                                        }}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                minDate={selJourneyDate || dayjs()}
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
                                    <button type='submit' className="btn btn-1 btn-sm font-semibold flex items-center justify-center gap-2 w-full h-9">
                                        <FaSearch /> Search
                                    </button>
                                </div>

                            </div>
                        </div>
                    </Card1>
                </CardWrapper>

            </form>
        </LocalizationProvider>
    );
};

export default BookingSelector;