import React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FaSearch } from 'react-icons/fa';

import { useForm, Controller, useWatch } from 'react-hook-form';
import useTicketFinder from '../hooks/useTicketFinder';


const TicketSort = () => {

    const {
        departureDistricts,
        destinationDistricts,
        register,
        handleSubmit,
        control,
        errors,
        journeyDate,
        onSubmit,
        busTypes
    } = useTicketFinder();

    return (
        <div className='w-xs bg-white rounded-2xl p-4 m-2 space-y-4'>
            <p className='text-md font-bold'>SORT SETTINGS</p>
            <hr />

            <p>DEPARTURE</p>
            <select
                {...register('departDistrict', { required: true })}
                defaultValue="Pick a District"
                className="select select-bordered w-full">
                <option value="" disabled>Pick a District</option>
                {departureDistricts?.map((d, idx) => (
                    <option key={idx} value={d}>{d}</option>
                ))}
            </select>
            <p>DESTINATION</p>
            <select
                {...register('destinationDistrict', { required: true })}
                defaultValue="Pick a District"
                className="select select-bordered w-full">
                <option value="" disabled>Pick a District</option>
                {destinationDistricts?.map((d, idx) => (
                    <option key={idx} value={d}>{d}</option>
                ))}
            </select>
            <p>DATE</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider>

            <p>BUS TYPE</p>
            {busTypes?.map((type, idx) => (
                <button key={idx} className='btn btn-3'>{type}</button>
            ))}

            <p>TICKET PRICE</p>
            <input type="range" min={0} max="100" value="30" className="range range-xs" />
            <p>SEAT AVAILABILITY</p>
            <button className='btn btn-3'>Low → High</button>
            <button className='btn btn-3'>High → Low</button>
            <p>COMPANY</p>

            <p>BUS BRAND</p>

            <p>FEATURES</p>
            <button className='btn btn-3'>AC</button>
            <button className='btn btn-3'>Free Wi-Fi</button>
            <button className='btn btn-3'>Snacks</button>
            <button className='btn btn-3'>Reclining Seats</button>
        </div>
    );
};

export default TicketSort;