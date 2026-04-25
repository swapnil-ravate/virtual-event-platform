import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { isAuthenticated, user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🎯</span>
                    <span className="logo-text">VirtualEvents</span>
                </Link>

                <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link to="/events" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
                    <Link to="/speakers" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Speakers</Link>
                    <Link to="/exhibitors" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Exhibitors</Link>
                    {isAuthenticated && (
                        <Link to="/dashboard" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                    )}
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
                    )}
                </div>

                <div className="navbar-actions">
                    {isAuthenticated ? (
                        <div className="user-menu">
                            <Link to="/profile" className="user-profile-link">
                                <span className="user-avatar-small">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </span>
                                <span className="user-name">Hi, {user?.name}!</span>
                            </Link>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    )}
                </div>

                <button
                    className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
