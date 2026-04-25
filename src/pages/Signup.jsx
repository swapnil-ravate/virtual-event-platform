import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { validateForm } from '../utils/validation';
import Button from '../components/Button';
import './Login.css'; // Reuse Login styles

export default function Signup() {
    const navigate = useNavigate();
    const { signup, establishSession, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [activationRequired, setActivationRequired] = useState(false);
    const [activationEmail, setActivationEmail] = useState('');
    const [otp, setOtp] = useState('');

    // Redirect if already logged in
    if (isAuthenticated) {
        navigate('/dashboard');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        // Validate form
        const validation = validateForm({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        });

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        if (!formData.agreeToTerms) {
            setServerError('Please agree to the terms and conditions');
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await signup(formData.email, formData.password, formData.name);
            if (response.requiresActivation) {
                setActivationRequired(true);
                setActivationEmail(response.email);
                setServerError('Account created. Enter the OTP sent to your email to activate.');
            }
        } catch (error) {
            setServerError(error.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleActivation = async (e) => {
        e.preventDefault();
        setServerError('');
        setLoading(true);
        try {
            const response = await api.verifyActivationOtp({ email: activationEmail, otp });
            await establishSession(response);
            navigate('/dashboard');
        } catch (error) {
            setServerError(error.message || 'OTP verification failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setServerError('');
        setLoading(true);
        try {
            await api.resendActivationOtp({ email: activationEmail });
            setServerError('A fresh OTP was sent to your email.');
        } catch (error) {
            setServerError(error.message || 'Unable to resend OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const { name } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
        setServerError('');
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join us to experience virtual events like never before.</p>
                </div>

                {serverError && (
                    <div className="error-banner">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!activationRequired && (
                        <>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-input ${errors.name ? 'error' : ''}`}
                            placeholder="John Doe"
                            required
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                            placeholder="name@company.com"
                            required
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-input ${errors.password ? 'error' : ''}`}
                            placeholder="Create a password"
                            required
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                            placeholder="Confirm your password"
                            required
                        />
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>

                    <div className="form-group">
                        <label className="checkbox-label" style={{ alignItems: 'flex-start' }}>
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                required
                                style={{ marginTop: '0.25rem' }}
                            />
                            <span style={{ fontSize: '0.85rem' }}>I agree to the <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Privacy Policy</a></span>
                        </label>
                    </div>

                    <Button type="submit" variant="primary" size="large" loading={loading} style={{ width: '100%' }}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                        </>
                    )}
                </form>

                {activationRequired && (
                    <form onSubmit={handleActivation} className="auth-form" style={{ marginTop: '1rem' }}>
                        <div className="form-group">
                            <label htmlFor="activation-otp" className="form-label">Activation OTP</label>
                            <input
                                type="text"
                                id="activation-otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="form-input"
                                placeholder="Enter 6-digit OTP"
                                required
                            />
                        </div>
                        <Button type="submit" variant="primary" size="large" loading={loading} style={{ width: '100%' }}>
                            Verify OTP & Continue
                        </Button>
                        <Button type="button" variant="secondary" size="large" onClick={handleResendOtp} style={{ width: '100%', marginTop: '0.75rem' }}>
                            Resend OTP
                        </Button>
                    </form>
                )}

                <div className="auth-divider">
                    <span>Or sign up with</span>
                </div>

                <div className="social-login-buttons">
                    <button className="social-btn" type="button">
                        <svg className="social-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                        </svg>
                        Google
                    </button>
                    <button className="social-btn" type="button">
                        <svg className="social-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                        LinkedIn
                    </button>
                </div>

                <p className="auth-switch">
                    Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                </p>
            </div>
        </div>

    );
}
