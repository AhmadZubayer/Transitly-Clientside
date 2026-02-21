import React from 'react';
import styled from 'styled-components';
import ModernBtn from './ModernBtn';

const Form1 = ({ 
  heading = 'Sign Up for your account',
  fields = ['name', 'phone', 'email', 'password', 'retypePassword'],
  showProfileUpload = true,
  showGoogleSignIn = true,
  submitButtonText = 'Sign Up',
  footerText = 'Already have an account?',
  footerLinkText = 'Sign In',
  imagePreview = null,
  formValues = {},
  errors = {},
  uploadError = '',
  disabled = false,
  onImageChange,
  onInputChange,
  onSubmit,
  onFooterLinkClick,
  onGoogleSignIn
}) => {

  const fieldConfig = {
    name: { type: 'text', label: 'Full Name', name: 'name', required: true },
    phone: { type: 'tel', label: 'Phone Number', name: 'phone', required: true },
    email: { type: 'email', label: 'Email', name: 'email', required: true },
    password: { type: 'password', label: 'Password', name: 'password', required: true },
    retypePassword: { type: 'password', label: 'Retype Password', name: 'retypePassword', required: true }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">{heading}</div>
        <form className="form" onSubmit={onSubmit}>
          
          {/* Profile Picture Upload */}
          {showProfileUpload && (
            <div className="profile-upload">
              <input 
                type="file" 
                id="profile-pic" 
                accept="image/*"
                onChange={onImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="profile-pic" className="upload-label">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="preview-image" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="upload-icon">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
                    <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
                    <circle cx="18" cy="6" r="3"/>
                    <path d="M18 9V3M15 6h6"/>
                  </svg>
                )}
                <span className="upload-text">Profile Picture (Optional)</span>
              </label>
            </div>
          )}
          {errors.photo && (
            <p className="error-message">{errors.photo}</p>
          )}

          {/* Dynamic Form Fields */}
          {fields.map((fieldKey) => {
            const field = fieldConfig[fieldKey];
            if (!field) return null;
            
            return (
              <React.Fragment key={fieldKey}>
                <div className="input-field">
                  <input 
                    required={field.required}
                    autoComplete="off" 
                    type={field.type} 
                    name={field.name} 
                    id={field.name}
                    value={formValues[field.name] || ''}
                    onChange={onInputChange}
                  />
                  <label htmlFor={field.name}>{field.label}</label>
                </div>
                {errors[field.name] && (
                  <p className="error-message">{errors[field.name]}</p>
                )}
              </React.Fragment>
            );
          })}

          {/* Display upload error */}
          {uploadError && (
            <p className="error-message">{uploadError}</p>
          )}

          <div className="btn-container">
            <ModernBtn text={submitButtonText} type="submit" disabled={disabled} />
          </div>

          {/* Google Sign In Section */}
          {showGoogleSignIn && (
            <>
              <div className="divider">
                <span>Continue with Socials</span>
              </div>

              <button type="button" className="google-btn" onClick={onGoogleSignIn} disabled={disabled}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="google-icon">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}

          {/* Footer Link */}
          {footerText && footerLinkText && (
            <div className="acc-text">
              {footerText}
              <span 
                style={{color: '#0034de', cursor: 'pointer', marginLeft: '5px'}}
                onClick={onFooterLinkClick}
              >
                {footerLinkText}
              </span>
            </div>
          )}
        </form>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    border: solid 1px #d0d0d0;
    padding: 20px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  }

  .container .heading {
    font-size: 1.1rem;
    margin-bottom: 18px;
    font-weight: bolder;
    text-align: center;
    color: #1e1e1e;
  }

  .form {
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .profile-upload {
    display: flex;
    justify-content: center;
    margin-bottom: 3px;
  }

  .upload-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border: 2px dashed #8d8d8d;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #f9f9f9;
    position: relative;
  }

  .upload-label:hover {
    border-color: #0034de;
    background-color: #f0f4ff;
  }

  .upload-icon {
    width: 32px;
    height: 32px;
    color: #8d8d8d;
    margin-bottom: 2px;
  }

  .upload-text {
    font-size: 0.55rem;
    color: #8d8d8d;
    text-align: center;
    max-width: 100px;
  }

  .preview-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .input-field {
    position: relative;
  }

  .input-field label {
    position: absolute;
    color: #8d8d8d;
    pointer-events: none;
    background-color: transparent;
    left: 12px;
    transform: translateY(0.5rem);
    transition: all 0.3s ease;
  }

  .input-field input {
    padding: 8px 12px;
    font-size: 0.85rem;
    border-radius: 6px;
    border: solid 1px #8d8d8d;
    letter-spacing: 0.3px;
    width: 100%;
  }

  .input-field input:focus,
  .input-field input:valid {
    outline: none;
    border: solid 1px #0034de;
  }

  .input-field input:focus ~ label,
  .input-field input:valid ~ label {
    transform: translateY(-51%) translateX(-10px) scale(0.8);
    background-color: #fff;
    padding: 0px 5px;
    color: #0034de;
    font-weight: bold;
    letter-spacing: 1px;
    border: none;
    border-radius: 100px;
  }

  .btn-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3px;
  }

  .divider {
    position: relative;
    text-align: center;
    margin: 10px 0;
  }

  .divider::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background-color: #8d8d8d;
  }

  .divider span {
    position: relative;
    background-color: #fff;
    padding: 0 10px;
    color: #8d8d8d;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid #8d8d8d;
    border-radius: 6px;
    background-color: #fff;
    color: #1e1e1e;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
  }

  .google-btn:hover {
    background-color: #f9f9f9;
    border-color: #0034de;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .google-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .google-icon {
    width: 20px;
    height: 20px;
  }

  .error-message {
    color: #e63946;
    font-size: 0.75rem;
    margin-top: -8px;
    margin-bottom: 4px;
    padding-left: 12px;
  }

  .acc-text {
    text-align: center;
    margin-top: 8px;
    color: #8d8d8d;
    font-size: 0.8rem;
  }
`;

export default Form1;
