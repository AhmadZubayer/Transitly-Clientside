import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useForm, useWatch } from 'react-hook-form';
import useAxios from './useAxios';

const useTicketFinder = () => {

    const axiosInstance = useAxios();

    const [districts, setDistricts] = useState([]);
    const [busTypes, setBusTypes] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [busBrands, setBusBrands] = useState([]);

    useEffect(() => {
        axiosInstance.get('/districts').then(res => setDistricts(res.data.districts));
    }, []);

     useEffect(() => {
        axiosInstance.get('/bus-type').then(res => setBusTypes(res.data.busType));
    }, []);

     useEffect(() => {
        axiosInstance.get('/districts').then(res => setCompanies(res.data.districts));
    }, []);

     useEffect(() => {
        axiosInstance.get('/districts').then(res => setBusBrands(res.data.districts));
    }, []);

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            departDistrict: '',
            destinationDistrict: '',
            journeyDate: dayjs(),
            returnDate: null,
            search: '',
            transportType: '',
            busTypes: '',
            busBrands: '',
            sort: 'departureDateTime',
            order: 'asc'
        }
    });

    const journeyDate = useWatch({ control, name: 'journeyDate' });
    const departDistrict = useWatch({ control, name: 'departDistrict' });
    const destinationDistrict = useWatch({ control, name: 'destinationDistrict' });

    const departureDistricts = districts.filter(d => d !== destinationDistrict);
    const destinationDistricts = districts.filter(d => d !== departDistrict);

    useEffect(() => {
        if (!journeyDate) return;
        setValue('returnDate', (prev) => {
            return prev && dayjs(prev).isBefore(journeyDate) ? journeyDate : prev;
        });
    }, [journeyDate, setValue]);







    const [features, setFeatures] = useState({
        wifi: false,
        food: false,
        recliningSeats: false
    });

    const handleFeatureToggle = (feature) => {
        setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
    };

    const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 10000 });

    const buildQueryParams = (data) => {
        const params = new URLSearchParams();

        if (data.search) params.set('search', data.search);
        if (data.departDistrict) params.set('from', data.departDistrict);
        if (data.destinationDistrict) params.set('to', data.destinationDistrict);
        if (data.transportType) params.set('type', data.transportType);
        if (data.busBrand) params.set('busBrand', data.busBrand);
        if (data.sort) params.set('sort', data.sort);
        if (data.order) params.set('order', data.order);
        if (data.journeyDate) params.set('departureDate', dayjs(data.journeyDate).format('YYYY-MM-DD'));

        params.set('minPrice', priceRange.minPrice);
        params.set('maxPrice', priceRange.maxPrice);
        if (features.wifi) params.set('wifi', 'true');
        if (features.snacks) params.set('snacks', 'true');
        if (features.recliningSeats) params.set('recliningSeats', 'true');

        return params.toString();
    };



    const onSubmit = (data) => {
        const queryString = buildQueryParams(data);
        console.log('TICKET QUERY', queryString);




        // localStorage.removeItem('bookingData');
        // localStorage.setItem('bookingData', JSON.stringify({
        //     departDistrict: data.departDistrict,
        //     destinationDistrict: data.destinationDistrict,
        //     journeyDate: data.journeyDate,
        //     returnDate: data.returnDate,
        // }));
    };




    return {
        districts,
        departureDistricts,
        destinationDistricts,
        register,
        handleSubmit,
        control,
        errors,
        journeyDate,
        departDistrict,
        destinationDistrict,
        onSubmit,
        features,
        handleFeatureToggle,
        priceRange,
        setPriceRange,
        busTypes,
        busBrands
    };
};

export default useTicketFinder;