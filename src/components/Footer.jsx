import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <span className="logo-icon">🎯</span>
                            <span className="logo-text">VirtualEvents</span>
                        </div>
                        <p className="footer-description">
                            Join the future of virtual events. Connect with speakers, attend live sessions, and network globally.
                        </p>
                        <div className="footer-social">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Platform</h4>
                        <ul className="footer-links">
                            <li><Link to="/events">Browse Events</Link></li>
                            <li><Link to="/speakers">Speakers</Link></li>
                            <li><Link to="/exhibitors">Exhibitors</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Resources</h4>
                        <ul className="footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">API</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Stay Updated</h4>
                        <p className="footer-newsletter-text">Subscribe to our newsletter for event updates.</p>
                        <form className="footer-newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="footer-newsletter-input"
                                aria-label="Email for newsletter"
                            />
                            <button type="submit" className="footer-newsletter-btn">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} VirtualEvents. All rights reserved.
                    </p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <span>•</span>
                        <a href="#">Terms of Service</a>
                        <span>•</span>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
