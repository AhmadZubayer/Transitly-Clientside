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
         <form id="ticket_sort_form" onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full p-4 space-y-4'>
            
            <div className='flex justify-between items-center'>
                <p className='text-sm font-bold font-adaptive uppercase opacity-60'>Reset Filters</p>
                <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-xs btn-error btn-outline"
                >
                    RESET
                </button>
            </div>
            <hr className='opacity-20' />

            <div>
                <p className='text-xs font-bold font-adaptive mb-2 uppercase opacity-70'>Departure</p>
                <select
                    {...register('selDepartDistrict')}
                    defaultValue="Pick a District"
                    className="select select-bordered select-sm w-full">
                    <option value="" disabled>Pick a District</option>
                    {departureDistricts?.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                    ))}
                </select>
            </div>


            <div>
                <p className='text-xs font-bold font-adaptive mb-2 uppercase opacity-70'>Destination</p>
                <select
                    {...register('selDestinationDistrict')}
                    defaultValue="Pick a District"
                    className="select select-bordered select-sm w-full">
                    <option value="" disabled>Pick a District</option>
                    {destinationDistricts?.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                    ))}
                </select>
            </div>


            <div>
                <p className='text-xs font-bold font-adaptive mb-2 uppercase opacity-70'>Date</p>
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
                <p className='text-xs font-bold font-adaptive mb-2 uppercase opacity-70'>Bus Type</p>
                <div className='flex flex-wrap gap-2'>
                    {busTypes?.map((type, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setValue('selBusType', selBusType === type ? '' : type)}
                            className={`btn btn-xs ${selBusType === type ? 'btn-selected' : 'btn-3'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>


            <div>
                <p className='text-xs font-bold font-adaptive mb-2 uppercase opacity-70'>Ticket Price</p>
                <div className='px-2'>
                    <div className='flex justify-between items-center mb-1'>
                        <span className='text-xs font-semibold font-adaptive'>৳ {priceRange.minPrice}</span>
                        <span className='text-xs font-semibold font-adaptive'>৳ {priceRange.maxPrice}</span>
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
                        size="small"
                    />
                </div>

            </div>

            <div>
                <p className='text-xs font-bold font-adaptive mb-2 uppercase opacity-70'>Seat Availability</p>
                <div className='flex gap-2'>
                    <button
                        type="button"
                        onClick={() => setValue('selSeatAvailabilityOrder', selSeatAvailabilityOrder === 'asc' ? '' : 'asc')}
                        className={`btn btn-xs flex-1 ${selSeatAvailabilityOrder === 'asc' ? 'btn-selected' : 'btn-3'}`}
                    >
                        Low → High
                    </button>
                    <button
                        type="button"
                        onClick={() => setValue('selSeatAvailabilityOrder', selSeatAvailabilityOrder === 'desc' ? '' : 'desc')}
                        className={`btn btn-xs flex-1 ${selSeatAvailabilityOrder === 'desc' ? 'btn-selected' : 'btn-3'}`}
                    >
                        High → Low
                    </button>
                </div>
            </div>


            <div>
                <p className='text-xs font-bold font-adaptive mb-2 uppercase opacity-70'>Company</p>
                <select
                    {...register('selBusCompany')}
                    defaultValue="Pick a Company"
                    className="select select-bordered select-sm w-full">
                    <option value="" disabled>Pick a Company</option>
                    {busCompanies?.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                    ))}
                </select>
            </div>


            <div>
                <p className='text-xs font-bold font-adaptive mb-2 uppercase opacity-70'>Bus Brand</p>
                <select
                    {...register('selBusBrand')}
                    defaultValue="Pick a Brand"
                    className="select select-bordered select-sm w-full">
                    <option value="" disabled>Pick a Brand</option>
                    {busBrands?.map((d, idx) => (
                        <option key={idx} value={d}>{d}</option>
                    ))}
                </select>
            </div>



            <div>
                <p className='text-xs font-bold font-adaptive mb-2 uppercase opacity-70'>Features</p>
                <div className='flex flex-wrap gap-2'>
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
                            className={`btn btn-xs ${selBusFeatures?.includes(type) ? 'btn-selected' : 'btn-3'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

        </div>
         </form>
    
    );
};

export default TicketSort;