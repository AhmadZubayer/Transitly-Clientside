import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser, signInWithGoogle, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const handleSignIn = (data) => {
    console.log('form data', data);
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user)
        console.log(location.state);
        navigate(location?.state ? location.state : '/');
      })
      .catch(error => {
        console.log(error)
      })
  }


  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(result => {
        console.log(result.user)
        console.log(location.state);
        navigate(location?.state ? location.state : '/');
      })
      .catch(error => {
        console.log(error)
      })
  }


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Sign In</h1>
        <p className="auth-subtitle">Welcome back! Please login to your account</p>

        {/* ✅ REACT HOOK FORM: handleSubmit wraps the handleSignIn function */}
        <form onSubmit={handleSubmit(handleSignIn)} className="auth-form">
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
              {/* ✅ REACT HOOK FORM: register() connects this input to the form */}
              <input
                type={showPassword ? "text" : "password"}
                {...register('password', { required: true })}
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
            {/* ✅ REACT HOOK FORM: Display validation errors */}
            {errors.password?.type === 'required' && (
              <p className="error-message">Password is required.</p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span className="divider-text">OR</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn-google"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner"></span>
          ) : (
            <>
              <FcGoogle className="text-xl" />
              Sign in with Google
            </>
          )}
        </button>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" state={location?.state} className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;