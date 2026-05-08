import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Form1 from '../Form-1';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const SignIn = () => {
  const { signInUser, signInGoogle, user } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location?.state?.from || '/', { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploadError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    
    signInUser(formData.email, formData.password)
      .then(() => {
        // Reset form
        setFormData({
          email: '',
          password: ''
        });
       
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
        setUploadError(error.message || 'Sign-in failed. Please check your credentials.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInGoogle()
      .then((result) => {
     
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          phone: result.user.phoneNumber || '',
          photoURL: result.user.photoURL
        };
        
        return axios.post(`${API_URL}/users`, userInfo);
      })
      .then(() => {
      
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
        setUploadError('Google sign-in failed');
      })
      .finally(() => setLoading(false));
  };

  const handleSignUpClick = () => {
    navigate('/register', { state: location?.state });
  };

  return (
    <div className='w-full'>
      <Form1
        heading="Welcome Back!"
        fields={['email', 'password']}
        showProfileUpload={false}
        showGoogleSignIn={true}
        submitButtonText={loading ? "Signing In..." : "Sign In"}
        footerText="Don't have an account?"
        footerLinkText="Sign Up"
        formValues={formData}
        errors={errors}
        uploadError={uploadError}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onGoogleSignIn={handleGoogleSignIn}
        onFooterLinkClick={handleSignUpClick}
        disabled={loading}
      />
    </div>
  );
};

export default SignIn;