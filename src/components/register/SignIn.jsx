import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Form1 from '../Form-1';

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
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
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
    
    // Sign in with Firebase
    signInUser(formData.email, formData.password)
      .then(() => {
        // Reset form
        setFormData({
          email: '',
          password: ''
        });
        navigate(location?.state || '/');
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
      .then(() => {
        alert('Signed in with Google successfully!');
        navigate(location?.state || '/');
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
        alert('Google sign-in failed');
      })
      .finally(() => setLoading(false));
  };

  const handleSignUpClick = () => {
    navigate('/register', { state: location?.state });
  };

  return (
    <div className='w-sm'>
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