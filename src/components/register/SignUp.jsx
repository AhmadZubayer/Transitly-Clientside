import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';
import Form1 from '../Form-1';

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
      navigate('/');
    }
  }, [user, navigate]);

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
    // Clear error for this field when user starts typing
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
    
    if (!formData.photo) {
      newErrors.photo = 'Profile photo is required.';
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
    
    // 1. Upload image to ImgBB
    const imgFormData = new FormData();
    imgFormData.append('image', formData.photo);
    
    const imgbbApiKey = import.meta.env.VITE_imgbbKey;
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;
    
    axios.post(imgbbUrl, imgFormData)
      .then((imgResponse) => {
        const photoURL = imgResponse.data.data.display_url;
        
        // 2. Create Firebase user
        return registerUser(formData.email, formData.password)
          .then((result) => {
            // 3. Update Firebase profile
            const userProfile = {
              displayName: formData.name,
              photoURL: photoURL
            };
            
            return updateProfile(result.user, userProfile)
              .then(() => ({ ...result, photoURL }));
          });
      })
      .then((result) => {
        // 4. Save to your database
        const userInfo = {
          email: formData.email,
          displayName: formData.name,
          phone: formData.phone,
          photoURL: result.photoURL,
          createdAt: new Date()
        };
        
        return axios.post('http://localhost:5000/users', userInfo);
      })
      .then(() => {
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          password: '',
          retypePassword: '',
          photo: null
        });
        setImagePreview(null);
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

  const handleGoogleSignIn = () => {
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

  const handleSignInClick = () => {
    navigate('/signin', { state: location?.state });
  };

  return (
    <div className='w-sm'>
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