import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
    },
    accountInfo: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    preferences: {
      newsletter: false,
      notifications: true,
    }
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [name]: type === 'checkbox' ? checked : value
      }
    });
  };

  // Validate current step before proceeding
  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.personalInfo.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.personalInfo.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.personalInfo.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.personalInfo.email)) {
        newErrors.email = 'Email is invalid';
      }
    }
    
    if (currentStep === 2) {
      if (!formData.accountInfo.username.trim()) {
        newErrors.username = 'Username is required';
      }
      if (!formData.accountInfo.password) {
        newErrors.password = 'Password is required';
      } else if (formData.accountInfo.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.accountInfo.password !== formData.accountInfo.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next button click
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  // Handle previous button click
  const handlePrev = () => {
    setStep(step - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
      // Here you would typically send data to an API
    }
  };

  // Progress bar component
  const ProgressBar = () => {
    const steps = ['Personal Info', 'Account Info', 'Preferences'];
    return (
      <div className="progress-container mb-4">
        <div className="progress">
          <div 
            className="progress-bar" 
            role="progressbar" 
            style={{ width: `${(step / steps.length) * 100}%` }}
            aria-valuenow={step}
            aria-valuemin="1"
            aria-valuemax={steps.length}
          ></div>
        </div>
        <div className="step-indicators d-flex justify-content-between mt-2">
          {steps.map((label, index) => (
            <div 
              key={index} 
              className={`step-indicator ${step > index ? 'completed' : ''} ${step === index + 1 ? 'active' : ''}`}
            >
              <span className="step-number">{index + 1}</span>
              <span className="step-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Step 1: Personal Information
  const Step1 = () => (
    <div className="step-content">
      <h3 className="mb-4">Personal Information</h3>
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          name="firstName"
          value={formData.personalInfo.firstName}
          onChange={(e) => handleChange(e, 'personalInfo')}
        />
        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          name="lastName"
          value={formData.personalInfo.lastName}
          onChange={(e) => handleChange(e, 'personalInfo')}
        />
        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          name="email"
          value={formData.personalInfo.email}
          onChange={(e) => handleChange(e, 'personalInfo')}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
    </div>
  );

  // Step 2: Account Information
  const Step2 = () => (
    <div className="step-content">
      <h3 className="mb-4">Account Information</h3>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          name="username"
          value={formData.accountInfo.username}
          onChange={(e) => handleChange(e, 'accountInfo')}
        />
        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          name="password"
          value={formData.accountInfo.password}
          onChange={(e) => handleChange(e, 'accountInfo')}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
          name="confirmPassword"
          value={formData.accountInfo.confirmPassword}
          onChange={(e) => handleChange(e, 'accountInfo')}
        />
        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
      </div>
    </div>
  );

  // Step 3: Preferences
  const Step3 = () => (
    <div className="step-content">
      <h3 className="mb-4">Preferences</h3>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="newsletter"
          checked={formData.preferences.newsletter}
          onChange={(e) => handleChange(e, 'preferences')}
        />
        <label className="form-check-label">Subscribe to newsletter</label>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="notifications"
          checked={formData.preferences.notifications}
          onChange={(e) => handleChange(e, 'preferences')}
        />
        <label className="form-check-label">Enable notifications</label>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Multi-Step Registration</h2>
              
              <ProgressBar />
              
              <form onSubmit={handleSubmit}>
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                
                <div className="d-flex justify-content-between mt-4">
                  {step > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={handlePrev}
                    >
                      Previous
                    </button>
                  )}
                  
                  {step < 3 ? (
                    <button 
                      type="button" 
                      className="btn btn-primary ms-auto" 
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="btn btn-success ms-auto"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;