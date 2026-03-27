import React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FaSearch } from 'react-icons/fa';

import { useForm, Controller, useWatch } from 'react-hook-form';
import useTicketFinder from '../hooks/useTicketFinder';
import { Slider } from '@mui/material';
import '../App.css'


const TicketSort = () => {

    const {
        departureDistricts,
        destinationDistricts,
        register,
        setValue,
        handleSubmit,
        control,
        errors,
        onSubmit,
        busTypes,
        busCompanies,
        busBrands,
        busFeatures,
        priceRange,
        setPriceRange,

        selDepartDistrict,
        selDestinationDistrict,
        selBusFeatures,
        selBusBrand,
        selBusCompany,
        selJourneyDate,
        selBusType,
        selSeatAvailabilityOrder
    } = useTicketFinder();

    const handleReset = () => {
        setValue('selDepartDistrict', '');
        setValue('selDestinationDistrict', '');
        setValue('selJourneyDate', dayjs());
        setValue('selBusType', '');
        setValue('selBusCompany', '');
        setValue('selBusBrand', '');
        setValue('selBusFeatures', []);
        setValue('selSeatAvailabilityOrder', 'asc');
        setPriceRange({ minPrice: 0, maxPrice: 10000 });
    };



    return (
         <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-xs card p-4 m-2 space-y-4'>
            <div className='flex justify-between items-center'>
                <p className='text-md font-bold'>SORT SETTINGS</p>
                <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-4"
                >
                    RESET
                </button>
            </div>
            <hr />

            <div>
                <p>DEPARTURE</p>
                <select
                    {...register('selDepartDistrict')}
                    defaultValue="Pick a District"
                    className="select select-bordered w-full">
                    <option value="" disabled>Pick a District</option>
                    {departureDistricts?.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                    ))}
                </select>
            </div>


            <div>
                <p>DESTINATION</p>
                <select
                    {...register('selDestinationDistrict')}
                    defaultValue="Pick a District"
                    className="select select-bordered w-full">
                    <option value="" disabled>Pick a District</option>
                    {destinationDistricts?.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                    ))}
                </select>
            </div>


            <div>
                <p>DATE</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                        name="selJourneyDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                minDate={dayjs()}
                                slotProps={{ textField: { fullWidth: true, variant: 'outlined', size: 'small' } }}
                            />
                        )}
                    />
                </LocalizationProvider>
            </div>


            <div>
                <p>BUS TYPE</p>
                {busTypes?.map((type, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setValue('selBusType', selBusType === type ? '' : type)}
                        className={`btn ${selBusType === type ? 'btn-selected' : 'btn-3'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>


            <div>
                <p>TICKET PRICE</p>
                <div className='py-4'>
                    <div className='flex justify-between items-center mb-3'>
                        <span className='text-sm font-semibold'>৳ {priceRange.minPrice}</span>
                        <span className='text-sm font-semibold'>৳ {priceRange.maxPrice}</span>
                    </div>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={[priceRange.minPrice, priceRange.maxPrice]}
                        onChange={(event, newValue) => {
                            setPriceRange({ minPrice: newValue[0], maxPrice: newValue[1] });
                        }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10000}
                        step={100}
                    />
                </div>

            </div>

            <div>
                <p>SEAT AVAILABILITY</p>
                <button
                    type="button"
                    onClick={() => setValue('selSeatAvailabilityOrder', selSeatAvailabilityOrder === 'asc' ? '' : 'asc')}
                    className={`btn ${selSeatAvailabilityOrder === 'asc' ? 'btn-selected' : 'btn-3'}`}
                >
                    Low → High
                </button>
                <button
                    type="button"
                    onClick={() => setValue('selSeatAvailabilityOrder', selSeatAvailabilityOrder === 'desc' ? '' : 'desc')}
                    className={`btn ${selSeatAvailabilityOrder === 'desc' ? 'btn-selected' : 'btn-3'}`}
                >
                    High → Low
                </button>
            </div>


            <div>
                <p>COMPANY</p>
                <select
                    {...register('selBusCompany')}
                    defaultValue="Pick a Company"
                    className="select select-bordered w-full">
                    <option value="" disabled>Pick a Company</option>
                    {busCompanies?.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                    ))}
                </select>
            </div>


            <div>
                <p>BUS BRAND</p>
                <select
                    {...register('selBusBrand')}
                    defaultValue="Pick a Brand"
                    className="select select-bordered w-full">
                    <option value="" disabled>Pick a Brand</option>
                    {busBrands?.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                    ))}
                </select>
            </div>



            <div>
                <p>FEATURES</p>
                {busFeatures?.map((type, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => {
                            const currentFeatures = selBusFeatures || [];
                            const updatedFeatures = currentFeatures.includes(type)
                                ? currentFeatures.filter(f => f !== type)
                                : [...currentFeatures, type];
                            setValue('selBusFeatures', updatedFeatures);
                        }}
                        className={`btn ${selBusFeatures?.includes(type) ? 'btn-selected' : 'btn-3'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>



            <div>
                <button type='submit' className='btn btn-1 w-full'>SORT TICKETS</button>
            </div>

        </div>
         </form>
    
    );
};

export default TicketSort;