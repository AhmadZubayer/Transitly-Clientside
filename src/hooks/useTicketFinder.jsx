import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAxios from './useAxios';

const useTicketFinder = () => {

    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const [districts, setDistricts] = useState([]);
    const [busTypes, setBusTypes] = useState([]);
    const [busCompanies, setBusCompanies] = useState([]);
    const [busBrands, setBusBrands] = useState([]);
    const [busFeatures, setBusFeatures] = useState([]);

    useEffect(() => {
        axiosInstance.get('/districts').then(res => setDistricts(res.data.districts));
    }, []);

    useEffect(() => {
        axiosInstance.get('/bus-type').then(res => setBusTypes(res.data.busType));
    }, []);

    useEffect(() => {
        axiosInstance.get('/bus-company').then(res => setBusCompanies(res.data.busCompanies));
    }, []);

    useEffect(() => {
        axiosInstance.get('/bus-brand').then(res => setBusBrands(res.data.busBrands));
    }, []);

    useEffect(() => {
        axiosInstance.get('/bus-features').then(res => setBusFeatures(res.data.busFeatures));
    }, []);


    // user selections
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            search: '',
            selDepartDistrict: '',
            selDestinationDistrict: '',
            selJourneyDate: dayjs(),
            selReturnDate: null,
            selBusType: '',
            selBusCompany: '',
            selBusBrand: '',
            selBusFeatures: [],
            
            sort: 'departureDateTime',
            selSeatAvailabilityOrder: 'asc'
        }
    });

    const selJourneyDate = useWatch({ control, name: 'selJourneyDate' });
    const selDepartDistrict = useWatch({ control, name: 'selDepartDistrict' });
    const selDestinationDistrict = useWatch({ control, name: 'selDestinationDistrict' });
    const selBusType = useWatch({ control, name: 'selBusType' });
    const selBusCompany = useWatch({ control, name: 'selBusCompany' });
    const selBusBrand = useWatch({ control, name: 'selBusBrand' });
    const selBusFeatures = useWatch({ control, name: 'selBusFeatures' });
    const selSeatAvailabilityOrder = useWatch({ control, name: 'selSeatAvailabilityOrder' });

    const departureDistricts = districts.filter(d => d !== selDestinationDistrict);
    const destinationDistricts = districts.filter(d => d !== selDepartDistrict);

    useEffect(() => {
        if (!selJourneyDate) return;
        setValue('returnDate', (prev) => {
            return prev && dayjs(prev).isBefore(selJourneyDate) ? selJourneyDate : prev;
        });
    }, [selJourneyDate, setValue]);



    const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 10000 });

    const buildQueryParams = (data) => {
        const params = new URLSearchParams();

        // Only add parameters that have actual user-selected values
        if (data.search && data.search !== '') params.set('search', data.search);
        if (data.selDepartDistrict && data.selDepartDistrict !== '') params.set('from', data.selDepartDistrict);
        if (data.selDestinationDistrict && data.selDestinationDistrict !== '') params.set('to', data.selDestinationDistrict);
        if (data.selBusType && data.selBusType !== '') params.set('type', data.selBusType);
        if (data.selBusBrand && data.selBusBrand !== '') params.set('busBrand', data.selBusBrand);
        if (data.selBusCompany && data.selBusCompany !== '') params.set('busCompany', data.selBusCompany);

        // Only include sort if explicitly set and not default
        if (data.sort && data.sort !== 'departureDateTime') params.set('sort', data.sort);

        // Only include order if explicitly set and not default
        if (data.selSeatAvailabilityOrder && data.selSeatAvailabilityOrder !== 'asc') params.set('order', data.selSeatAvailabilityOrder);

        // Only include journey date if explicitly different from today
        if (data.selJourneyDate && !dayjs(data.selJourneyDate).isSame(dayjs(), 'day')) {
            params.set('departureDate', dayjs(data.selJourneyDate).format('YYYY-MM-DD'));
        }

        // Only include return date if it exists
        if (data.selReturnDate) params.set('returnDate', dayjs(data.selReturnDate).format('YYYY-MM-DD'));

        // Only include price range if it's different from defaults
        if (priceRange.minPrice !== 0) params.set('minPrice', priceRange.minPrice);
        if (priceRange.maxPrice !== 10000) params.set('maxPrice', priceRange.maxPrice);

        // Only include features if any are selected
        if (data.selBusFeatures?.length > 0) {
            params.set('features', data.selBusFeatures.join(','));
        }

        return params.toString();
    };


    const onSubmit = (data) => {
        const queryString = buildQueryParams(data);
        console.log('TICKET QUERY', queryString);

        // Navigate to all-tickets page with query parameters
        navigate(`/all-tickets?${queryString}`);
    };




    return {
        districts,
        departureDistricts,
        destinationDistricts,
        register,
        setValue,
        handleSubmit,
        control,
        errors,
        onSubmit,
        priceRange,
        setPriceRange,
        busTypes,
        busBrands,
        busCompanies,
        busFeatures,

        selDepartDistrict,
        selDestinationDistrict,
        selBusFeatures,
        selBusBrand,
        selBusCompany,
        selJourneyDate,
        selBusType,
        selSeatAvailabilityOrder
    };
};

export default useTicketFinder;