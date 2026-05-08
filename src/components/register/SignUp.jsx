import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';
import Form1 from '../Form-1';

const API_URL = import.meta.env.VITE_API_URL;
const DEFAULT_PHOTO_URL = 'https://i.ibb.co/pjGx3Psc/images.jpg';

const SignUp = () => {
  const { registerUser, signInGoogle, user } = useAuth();
  
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    retypePassword: '',
    photo: null
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, photo: file });
    }
  };

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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be 6 characters or longer.';
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(formData.password)) {
      newErrors.password = 'Password must have at least one uppercase, one lowercase, one number, and one special character.';
    }

    if (!formData.retypePassword) {
      newErrors.retypePassword = 'Please retype your password.';
    } else if (formData.password !== formData.retypePassword) {
      newErrors.retypePassword = 'Passwords do not match.';
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

    const processRegistration = (photoURL) => {
      const finalPhotoURL = photoURL || DEFAULT_PHOTO_URL;
      return registerUser(formData.email, formData.password)
        .then((result) => {
          const userProfile = {
            displayName: formData.name,
            photoURL: finalPhotoURL
          };
          return updateProfile(result.user, userProfile)
            .then(() => ({ ...result, photoURL: finalPhotoURL }));
        });
    };

    
    if (formData.photo) {
      const imgFormData = new FormData();
      imgFormData.append('image', formData.photo);
      const imgbbApiKey = import.meta.env.VITE_imgbbKey;
      const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

      axios.post(imgbbUrl, imgFormData)
        .then((imgResponse) => {
          const photoURL = imgResponse.data.data.display_url;
          return processRegistration(photoURL);
        })
        .then((result) => {
          const userInfo = {
            email: formData.email,
            displayName: formData.name,
            phone: formData.phone,
            photoURL: result.photoURL
          };

          console.log('Registration complete. Saving user:', userInfo);
          return axios.post(`${API_URL}/users`, userInfo);
        })
        .then((response) => {
          console.log('User saved to MongoDB:', response.data);
          setFormData({
            name: '',
            phone: '',
            email: '',
            password: '',
            retypePassword: '',
            photo: null
          });
          setImagePreview(null);
        })
        .catch((error) => {
          console.error('Registration error:', error);
          if (error.response) {
            console.error('Backend error:', error.response.status, error.response.data);
            setUploadError(`Registration failed: ${error.response.data?.error || 'Unknown error'}`);
          } else if (error.request) {
            console.error('No response from server');
            setUploadError('Server not responding. Check if backend is running.');
          } else {
            setUploadError(error.message || 'Registration failed');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
    
      processRegistration(null)
        .then((result) => {
          const userInfo = {
            email: formData.email,
            displayName: formData.name,
            phone: formData.phone,
            photoURL: result.photoURL
          };

          console.log('Registration complete. Saving user:', userInfo);
          return axios.post(`${API_URL}/users`, userInfo);
        })
        .then((response) => {
          console.log('User saved to MongoDB:', response.data);
          setFormData({
            name: '',
            phone: '',
            email: '',
            password: '',
            retypePassword: '',
            photo: null
          });
          setImagePreview(null);
        })
        .catch((error) => {
          console.error('Registration error:', error);
          if (error.response) {
            console.error('Backend error:', error.response.status, error.response.data);
            setUploadError(`Registration failed: ${error.response.data?.error || 'Unknown error'}`);
          } else if (error.request) {
            console.error('No response from server');
            setUploadError('Server not responding. Check if backend is running.');
          } else {
            setUploadError(error.message || 'Registration failed');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
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

        console.log('Google sign-up successful. Saving user:', userInfo);
       
        return axios.post(`${API_URL}/users`, userInfo);
      })
      .then((response) => {
        console.log('User saved to MongoDB:', response.data);

      })
      .catch((error) => {
        console.error('Google sign-up error:', error);
        if (error.response) {
          console.error('Backend error status:', error.response.status);
          console.error('Backend error message:', error.response.data);
          setUploadError(`Sign-up failed: ${error.response.data?.error || 'Unknown error'}`);
        } else if (error.request) {
          console.error('No response from server:', error.request);
          setUploadError('Server not responding. Check if backend is running.');
        } else {
          setUploadError(error.message || 'Google sign-up failed');
        }
      })
      .finally(() => setLoading(false));
  };

  const handleSignInClick = () => {
    navigate('/signin', { state: location?.state });
  };

  return (
    <div className='w-full'>
      <Form1
        heading="Sign Up, It's Free"
        fields={['name', 'phone', 'email', 'password', 'retypePassword']}
        showProfileUpload={true}
        showGoogleSignIn={true}
        submitButtonText={loading ? "Signing Up..." : "Sign Up"}
        footerText="Already have an account?"
        footerLinkText="Sign In"
        imagePreview={imagePreview}
        formValues={formData}
        errors={errors}
        uploadError={uploadError}
        onImageChange={handleImageChange}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onGoogleSignIn={handleGoogleSignIn}
        onFooterLinkClick={handleSignInClick}
        disabled={loading}
      />
    </div>
  );
};

export default SignUp;