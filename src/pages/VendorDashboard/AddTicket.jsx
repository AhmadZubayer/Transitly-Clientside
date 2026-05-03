import React, { useState, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddTicket = () => {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            ticketTitle: '',
            from: '',
            to: '',
            transportType: '',
            price: '',
            quantity: '',
            departureDateTime: dayjs(),
            returnDateTime: null,
            vendorName: '',
            vendorEmail: '',
            busCompany: '',
            busBrand: '',
            perks: [],
            bookingStatus: 'Available'
        }
    });

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');
    const [isEditing, setIsEditing] = useState(false);
    const [loadingTicket, setLoadingTicket] = useState(false);

    // State for dropdown options
    const [districts, setDistricts] = useState([]);
    const [busTypes, setBusTypes] = useState([]);
    const [busCompanies, setBusCompanies] = useState([]);
    const [busBrands, setBusBrands] = useState([]);
    const [busFeatures, setBusFeatures] = useState([]);

    // Form state
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState(null);

    // Fetch dropdown options from backend
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [districtsRes, busTypeRes, busCompanyRes, busBrandRes, busFeaturesRes] = await Promise.all([
                    axiosSecure.get('/districts'),
                    axiosSecure.get('/bus-type'),
                    axiosSecure.get('/bus-company'),
                    axiosSecure.get('/bus-brand'),
                    axiosSecure.get('/bus-features')
                ]);

                setDistricts(districtsRes.data.districts || []);
                setBusTypes(busTypeRes.data.busType || []);
                setBusCompanies(busCompanyRes.data.busCompanies || []);
                setBusBrands(busBrandRes.data.busBrands || []);
                setBusFeatures(busFeaturesRes.data.busFeatures || []);
            } catch (error) {
                console.error('Error fetching dropdown options:', error);
            }
        };

        fetchOptions();
    }, [axiosSecure]);

    // If edit mode, fetch ticket and prefill
    useEffect(() => {
        const prefillForEdit = async () => {
            if (!editId) {
                setIsEditing(false);
                return;
            }

            try {
                setLoadingTicket(true);
                const res = await axiosSecure.get(`/tickets/${editId}`);
                const ticket = res.data;

                if ((ticket.adminVerified || 'No') === 'Yes') {
                    alert('This ticket is already admin verified and cannot be edited.');
                    setIsEditing(false);
                    return;
                }

                setIsEditing(true);
                reset({
                    ticketTitle: ticket.ticketTitle || '',
                    from: ticket.from || '',
                    to: ticket.to || '',
                    transportType: ticket.transportType || '',
                    price: ticket.price ?? '',
                    quantity: ticket.quantity ?? '',
                    departureDateTime: ticket.departureDateTime ? dayjs(ticket.departureDateTime) : dayjs(),
                    returnDateTime: ticket.returnDateTime ? dayjs(ticket.returnDateTime) : null,
                    vendorName: ticket.vendorName || user?.displayName || '',
                    vendorEmail: ticket.vendorEmail || user?.email || '',
                    busCompany: ticket.busCompany || '',
                    busBrand: ticket.busBrand || '',
                    perks: ticket.perks || [],
                    bookingStatus: ticket.bookingStatus || 'Available'
                });
            } catch (e) {
                console.error('Failed to load ticket for edit:', e);
                alert('Failed to load ticket for editing.');
                setIsEditing(false);
            } finally {
                setLoadingTicket(false);
            }
        };

        prefillForEdit();
    }, [axiosSecure, editId, reset, user?.displayName, user?.email]);

    const watchTo = useWatch({ control, name: 'to' });
    const watchFrom = useWatch({ control, name: 'from' });
    useWatch({ control, name: 'perks' });

    const departureDistricts = districts.filter(d => d !== watchTo);
    const destinationDistricts = districts.filter(d => d !== watchFrom);

    const onSubmit = async (data) => {
        // Prepare the ticket data with pending status
        const ticketData = {
            ticketTitle: data.ticketTitle,
            from: data.from,
            to: data.to,
            transportType: data.transportType,
            price: parseFloat(data.price),
            quantity: parseInt(data.quantity),
            departureDateTime: dayjs(data.departureDateTime).toISOString(),
            returnDateTime: data.returnDateTime ? dayjs(data.returnDateTime).toISOString() : null,
            vendorName: user?.displayName || '',
            vendorEmail: user?.email || '',
            busCompany: data.busCompany,
            busBrand: data.busBrand,
            perks: data.perks || [],
            status: 'pending',
            bookingStatus: 'Available',
            adminVerified: 'No',
            adminFeatured: 'No',
            createdAt: new Date()
        };

        setFormData(ticketData);
        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        try {
            if (isEditing && editId) {
                const response = await axiosSecure.patch(`/tickets/${editId}`, formData);
                console.log('Ticket updated successfully:', response.data);
                alert('Ticket updated successfully! Status: Pending (Awaiting admin verification)');
            } else {
                const response = await axiosSecure.post('/tickets', formData);
                console.log('Ticket added successfully:', response.data);
                alert('Ticket added successfully! Status: Pending (Awaiting admin verification)');
            }
            setShowConfirmation(false);
            reset();
        } catch (error) {
            console.error('Error adding ticket:', error);
            alert('Failed to save ticket. Please try again.');
            setShowConfirmation(false);
        }
    };

    const handleDeny = () => {
        setShowConfirmation(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="max-w-6xl mx-auto px-4 py-4">
                {/* Centered Heading */}
                <h1 className='text-3xl font-bold text-center mb-6 font-adaptive'>
                    {isEditing ? 'Edit Ticket' : 'Add New Ticket'}
                </h1>

                {loadingTicket && (
                    <div className='flex justify-center items-center p-4'>
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm">
                    {/* 3-Column Grid for Desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* TICKET DETAILS */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-lg font-bold border-b pb-1 font-adaptive">Ticket Details</h4>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Ticket Title</label>
                                <input
                                    type="text"
                                    {...register('ticketTitle', { required: 'Title is required' })}
                                    className='input input-bordered input-sm w-full'
                                    placeholder="e.g., Dhaka to Chittagong Express"
                                />
                                {errors.ticketTitle && <span className="text-red-500 text-xs">{errors.ticketTitle.message}</span>}
                            </fieldset>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Transport Type</label>
                                <select
                                    {...register('transportType', { required: 'Transport type is required' })}
                                    defaultValue=""
                                    className="select select-bordered select-sm w-full"
                                >
                                    <option disabled value="">Select transport type</option>
                                    {busTypes.map((type, i) => (
                                        <option key={i} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.transportType && <span className="text-red-500 text-xs">{errors.transportType.message}</span>}
                            </fieldset>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Price (৳)</label>
                                <input
                                    type="number"
                                    {...register('price', { required: 'Price is required', min: 0 })}
                                    className='input input-bordered input-sm w-full'
                                    placeholder="Enter price"
                                />
                                {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
                            </fieldset>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Available Quantity</label>
                                <input
                                    type="number"
                                    {...register('quantity', { required: 'Quantity is required', min: 1 })}
                                    className='input input-bordered input-sm w-full'
                                    placeholder="Enter available tickets"
                                />
                                {errors.quantity && <span className="text-red-500 text-xs">{errors.quantity.message}</span>}
                            </fieldset>
                        </div>

                        {/* ROUTE DETAILS */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-lg font-bold border-b pb-1 font-adaptive">Route Details</h4>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Departure Location (From)</label>
                                <select
                                    {...register('from', { required: 'Departure location is required' })}
                                    defaultValue=""
                                    className="select select-bordered select-sm w-full"
                                >
                                    <option disabled value="">Select departure</option>
                                    {departureDistricts.map((d, idx) => (
                                        <option key={idx} value={d}>{d}</option>
                                    ))}
                                </select>
                                {errors.from && <span className="text-red-500 text-xs">{errors.from.message}</span>}
                            </fieldset>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Destination (To)</label>
                                <select
                                    {...register('to', { required: 'Destination is required' })}
                                    defaultValue=""
                                    className="select select-bordered select-sm w-full"
                                >
                                    <option disabled value="">Select destination</option>
                                    {destinationDistricts.map((d, idx) => (
                                        <option key={idx} value={d}>{d}</option>
                                    ))}
                                </select>
                                {errors.to && <span className="text-red-500 text-xs">{errors.to.message}</span>}
                            </fieldset>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Departure Date & Time</label>
                                <Controller
                                    name="departureDateTime"
                                    control={control}
                                    rules={{ required: 'Departure date & time is required' }}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            minDate={dayjs()}
                                            slotProps={{ textField: { fullWidth: true, variant: 'outlined', size: 'small' } }}
                                        />
                                    )}
                                />
                                {errors.departureDateTime && <span className="text-red-500 text-xs">{errors.departureDateTime.message}</span>}
                            </fieldset>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Return Date & Time (Optional)</label>
                                <Controller
                                    name="returnDateTime"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            minDate={dayjs()}
                                            slotProps={{ textField: { fullWidth: true, variant: 'outlined', size: 'small' } }}
                                        />
                                    )}
                                />
                            </fieldset>
                        </div>

                        {/* BUS & VENDOR DETAILS */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-lg font-bold border-b pb-1 font-adaptive">Bus & Vendor Details</h4>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Bus Company</label>
                                <select
                                    {...register('busCompany', { required: 'Bus company is required' })}
                                    defaultValue=""
                                    className="select select-bordered select-sm w-full"
                                >
                                    <option disabled value="">Select company</option>
                                    {busCompanies.map((company, idx) => (
                                        <option key={idx} value={company}>{company}</option>
                                    ))}
                                </select>
                                {errors.busCompany && <span className="text-red-500 text-xs">{errors.busCompany.message}</span>}
                            </fieldset>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Bus Brand</label>
                                <select
                                    {...register('busBrand', { required: 'Bus brand is required' })}
                                    defaultValue=""
                                    className="select select-bordered select-sm w-full"
                                >
                                    <option disabled value="">Select brand</option>
                                    {busBrands.map((brand, idx) => (
                                        <option key={idx} value={brand}>{brand}</option>
                                    ))}
                                </select>
                                {errors.busBrand && <span className="text-red-500 text-xs">{errors.busBrand.message}</span>}
                            </fieldset>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Vendor Name (Read-Only)</label>
                                <input
                                    type="text"
                                    value={user?.displayName || ''}
                                    disabled
                                    className='input input-bordered input-sm w-full bg-gray-50'
                                />
                            </fieldset>

                            <fieldset>
                                <label className="label py-1 uppercase text-[11px] font-semibold text-gray-600 font-adaptive">Vendor Email (Read-Only)</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className='input input-bordered input-sm w-full bg-gray-50'
                                />
                            </fieldset>
                        </div>
                    </div>

                    {/* FEATURES/PERKS SECTION */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-lg font-bold border-b pb-1 font-adaptive">Features/Perks</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {busFeatures.map((feature, index) => (
                                <label key={index} className='flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'>
                                    <input
                                        type="checkbox"
                                        {...register('perks')}
                                        value={feature}
                                        className="checkbox checkbox-sm"
                                    />
                                    <span className="text-xs font-medium font-adaptive">{feature}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Centered Submit Button */}
                    <div className="flex justify-center mt-2">
                        <button type="submit" className='btn btn-1 px-10'>
                            {isEditing ? 'Update Ticket' : 'Add Ticket'}
                        </button>
                    </div>
                </form>

                {/* Confirmation Dialog */}
                {showConfirmation && (
                    <dialog open className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box max-w-2xl">
                            <h3 className="font-bold text-lg mb-4">Confirm Ticket Details</h3>

                            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600">Title</p>
                                        <p className="font-semibold">{formData?.ticketTitle}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Transport Type</p>
                                        <p className="font-semibold">{formData?.transportType}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600">From</p>
                                        <p className="font-semibold">{formData?.from}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">To</p>
                                        <p className="font-semibold">{formData?.to}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600">Price</p>
                                        <p className="font-semibold text-lg">৳{formData?.price}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Available Quantity</p>
                                        <p className="font-semibold text-lg">{formData?.quantity}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600">Bus Company</p>
                                        <p className="font-semibold">{formData?.busCompany}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Bus Brand</p>
                                        <p className="font-semibold">{formData?.busBrand}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-600">Departure Date & Time</p>
                                    <p className="font-semibold">{dayjs(formData?.departureDateTime).format('DD MMM YYYY, hh:mm A')}</p>
                                </div>

                                {formData?.returnDateTime && (
                                    <div>
                                        <p className="text-xs text-gray-600">Return Date & Time</p>
                                        <p className="font-semibold">{dayjs(formData?.returnDateTime).format('DD MMM YYYY, hh:mm A')}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600">Vendor Name</p>
                                        <p className="font-semibold">{formData?.vendorName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Vendor Email</p>
                                        <p className="font-semibold text-sm">{formData?.vendorEmail}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-600">Status</p>
                                    <p className="font-semibold"><span className="badge badge-warning">Pending</span></p>
                                </div>

                                {formData?.perks?.length > 0 && (
                                    <div>
                                        <p className="text-xs text-gray-600 mb-2">Features</p>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.perks.map((perk, idx) => (
                                                <span key={idx} className="badge badge-primary">{perk}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="modal-action">
                                <button
                                    type="button"
                                    onClick={handleDeny}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirm}
                                    className="btn btn-1"
                                >
                                    Confirm & Add Ticket
                                </button>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={handleDeny}>close</button>
                        </form>
                    </dialog>
                )}
            </div>
        </LocalizationProvider>
    );
};

export default AddTicket;

