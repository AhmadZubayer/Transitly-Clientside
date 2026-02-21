import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaImage } from 'react-icons/fa';
import './Auth.css';
import axios from 'axios';


const Register = () => {
    // ✅ REACT HOOK FORM: useForm hook initialization
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { registerUser, signInGoogle, user } = useAuth();
    
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    // ✅ REACT HOOK FORM: handleSubmit wraps this function, data contains validated form values
    const handleRegistration = (data) => {
        setLoading(true);
        setUploadError('');
        
        const photoFile = data.photo[0];
        
        if (!photoFile) {
            setUploadError('Please select a profile photo');
            setLoading(false);
            return;
        }
        
        // 1. Upload image to ImgBB
        const formData = new FormData();
        formData.append('image', photoFile);
        
        const imgbbApiKey = import.meta.env.VITE_imgbbKey;
        const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;
        
        axios.post(imgbbUrl, formData)
            .then((imgResponse) => {
                const photoURL = imgResponse.data.data.display_url;
                
                // 2. Create Firebase user
                return registerUser(data.email, data.password)
                    .then((result) => {
                        // 3. Update Firebase profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        };
                        
                        return updateProfile(result.user, userProfile)
                            .then(() => ({ ...result, photoURL }));
                    });
            })
            .then((result) => {
                // 4. Save to your database
                const userInfo = {
                    email: data.email,
                    displayName: data.name,
                    photoURL: result.photoURL,
                    createdAt: new Date()
                };
                
                return axios.post('http://localhost:5000/users', userInfo);
            })
            .then(() => {
                reset();
                navigate(location?.state || '/');
            })
            .catch((error) => {
                console.error('Registration error:', error);
                setUploadError(error.message || 'Registration failed');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleGoogleSignup = () => {
        setLoading(true);
        signInGoogle()
            .then(() => {
                alert('Signed up with Google successfully!');
                navigate(location?.state || '/');
            })
            .catch((error) => {
                console.error('Google sign-up error:', error);
                alert('Google sign-up failed');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Sign Up</h1>
                <p className="auth-subtitle">Create your account to start building habits</p>

                {/* ✅ REACT HOOK FORM: handleSubmit wraps the handleRegistration function */}
                <form onSubmit={handleSubmit(handleRegistration)} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">
                            Name
                        </label>
                        {/* ✅ REACT HOOK FORM: register() connects this input to the form */}
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="form-input"
                            placeholder="Enter your full name"
                        />
                        {/* ✅ REACT HOOK FORM: Display validation errors */}
                        {errors.name?.type === 'required' && (
                            <p className="error-message">Name is required.</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Profile Photo
                        </label>
                        {/* ✅ REACT HOOK FORM: register() connects this file input to the form */}
                        <div className="custom-file-input">
                            <input
                                type="file"
                                accept="image/*"
                                {...register('photo', { required: true })}
                                className="file-input-hidden"
                                id="photo-upload"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setFileName(file ? file.name : '');
                                }}
                            />
                            <label htmlFor="photo-upload" className="file-input-label">
                                <FaImage className="file-icon" />
                                <span>{fileName || 'Choose a file...'}</span>
                            </label>
                        </div>
                        {/* ✅ REACT HOOK FORM: Display validation errors */}
                        {errors.photo?.type === 'required' && (
                            <p className="error-message">Profile photo is required.</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Email
                        </label>
                        {/* ✅ REACT HOOK FORM: register() connects this input to the form */}
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="form-input"
                            placeholder="Enter your email"
                        />
                        {/* ✅ REACT HOOK FORM: Display validation errors */}
                        {errors.email?.type === 'required' && (
                            <p className="error-message">Email is required.</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Password
                        </label>
                        <div className="password-input-container">
                            {/* ✅ REACT HOOK FORM: register() connects this input with comprehensive validation */}
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                                })}
                                className="form-input password-input"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                        {/* ✅ REACT HOOK FORM: Display validation errors with specific messages */}
                        {errors.password?.type === 'required' && (
                            <p className="error-message">Password is required.</p>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <p className="error-message">Password must be 6 characters or longer.</p>
                        )}
                        {errors.password?.type === 'pattern' && (
                            <p className="error-message">Password must have at least one uppercase, one lowercase, one number, and one special character.</p>
                        )}
                    </div>

                    {/* Submit button */}
                    <button 
                        type="submit" 
                        className="btn-primary" 
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner"></span>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <div className="auth-divider">
                    <span className="divider-text">OR</span>
                </div>

                <button
                    onClick={handleGoogleSignup}
                    className="btn-google"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="spinner"></span>
                    ) : (
                        <>
                            <FcGoogle className="text-xl" />
                            Sign up with Google
                        </>
                    )}
                </button>

                <p className="auth-footer">
                    Already have an account?{' '}
                    <Link to="/signin" state={location?.state} className="auth-link">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;