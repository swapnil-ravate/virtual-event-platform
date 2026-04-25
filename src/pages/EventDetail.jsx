import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { mockSpeakers } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import Button from '../components/Button';
import './EventDetail.css';

export default function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, registerForEvent, unregisterFromEvent, isRegisteredForEvent } = useAuth();
    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [bookingOtp, setBookingOtp] = useState('');
    const [bookingOtpPending, setBookingOtpPending] = useState(false);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const response = await api.getEvents();
                setEvents(response.events || []);
            } finally {
                setLoadingEvents(false);
            }
        };
        loadEvents();
    }, []);

    const event = useMemo(() => events.find(e => e.id === id), [events, id]);

    if (loadingEvents) {
        return (
            <div className="event-detail-page">
                <div className="container text-center">
                    <h1>Loading event...</h1>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="event-detail-page">
                <div className="container text-center">
                    <h1>Event Not Found</h1>
                    <Link to="/events">
                        <Button variant="primary">Back to Events</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const isRegistered = isRegisteredForEvent(event.id);

    const handleRegister = async () => {
        setErrorMessage('');
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            if (isRegistered) {
                await unregisterFromEvent(event.id);
            } else {
                await api.requestBookingOtp({ eventId: event.id });
                setBookingOtpPending(true);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (error) {
            setErrorMessage(error.message || 'Unable to process booking.');
        }
    };

    const handleConfirmBooking = async () => {
        setErrorMessage('');
        try {
            await registerForEvent(event.id, bookingOtp);
            setBookingOtp('');
            setBookingOtpPending(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            setErrorMessage(error.message || 'Unable to verify OTP and create booking.');
        }
    };

    const eventSpeakers = mockSpeakers.filter(s => event.speakers?.includes(s.id));
    const similarEvents = events
        .filter(e => e.id !== event.id && e.category === event.category)
        .slice(0, 3);

    return (
        <div className="event-detail-page">
            {/* Hero Banner */}
            <div className="event-hero" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="event-hero-overlay"></div>
                <div className="container event-hero-content">
                    <span className={`event-type-badge ${event.type}`}>{event.type}</span>
                    <h1 className="event-detail-title">{event.title}</h1>
                    <div className="event-meta-info">
                        <span className="meta-item">📅 {event.date}</span>
                        <span className="meta-item">🕐 {event.time}</span>
                        <span className="meta-item">👥 {event.attendees}+ Attendees</span>
                        <span className="meta-item">📍 {event.location}</span>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="success-notification">
                    {bookingOtpPending
                        ? '🔐 OTP sent to your email. Enter it to finalize booking request.'
                        : `✅ Booking request submitted for ${event.title}.`}
                </div>
            )}
            {errorMessage && (
                <div className="success-notification">
                    {errorMessage}
                </div>
            )}

            <div className="container event-detail-content">
                <div className="event-main">
                    {/* Description */}
                    <section className="event-section">
                        <h2 className="section-heading">About This Event</h2>
                        <p className="event-description">{event.description}</p>

                        <div className="event-highlights">
                            <div className="highlight-item">
                                <span className="highlight-icon">🎯</span>
                                <div>
                                    <div className="highlight-label">Category</div>
                                    <div className="highlight-value">{event.category}</div>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <span className="highlight-icon">💰</span>
                                <div>
                                    <div className="highlight-label">Price</div>
                                    <div className="highlight-value">{event.price === 0 ? 'Free' : `₹${event.price}`}</div>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <span className="highlight-icon">🌐</span>
                                <div>
                                    <div className="highlight-label">Format</div>
                                    <div className="highlight-value">Virtual Event</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Agenda */}
                    {event.agenda && event.agenda.length > 0 && (
                        <section className="event-section">
                            <h2 className="section-heading">Event Agenda</h2>
                            <div className="agenda-list">
                                {event.agenda.map((item, index) => (
                                    <div key={index} className="agenda-item">
                                        <div className="agenda-time">{item.time}</div>
                                        <div className="agenda-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Speakers */}
                    {eventSpeakers.length > 0 && (
                        <section className="event-section">
                            <h2 className="section-heading">Featured Speakers</h2>
                            <div className="speakers-grid">
                                {eventSpeakers.map(speaker => (
                                    <div key={speaker.id} className="speaker-card">
                                        <img src={speaker.image} alt={speaker.name} className="speaker-image" />
                                        <h3 className="speaker-name">{speaker.name}</h3>
                                        <p className="speaker-title">{speaker.title}</p>
                                        <p className="speaker-company">{speaker.company}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Similar Events */}
                    {similarEvents.length > 0 && (
                        <section className="event-section">
                            <h2 className="section-heading">Similar Events</h2>
                            <div className="similar-events-list">
                                {similarEvents.map(similarEvent => (
                                    <Link key={similarEvent.id} to={`/events/${similarEvent.id}`} className="similar-event-item">
                                        <img src={similarEvent.image} alt={similarEvent.title} className="similar-event-image" />
                                        <div className="similar-event-info">
                                            <h4 className="similar-event-title">{similarEvent.title}</h4>
                                            <div className="similar-event-meta">
                                                <span>📅 {similarEvent.date}</span>
                                                <span>👥 {similarEvent.attendees}+</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="event-sidebar">
                    <div className="sidebar-card">
                        <div className="event-price-tag">
                            {event.price === 0 ? 'Free Event' : `₹${event.price}`}
                        </div>

                        {isRegistered && (
                            <div className="registered-badge">
                                ✅ You're Registered!
                            </div>
                        )}

                        <Button
                            variant={isRegistered ? "secondary" : "primary"}
                            size="large"
                            className="register-btn"
                            onClick={handleRegister}
                        >
                            {isRegistered ? 'Unregister' : (isAuthenticated ? 'Register Now' : 'Login to Register')}
                        </Button>
                        {bookingOtpPending && (
                            <div style={{ marginTop: '0.9rem' }}>
                                <input
                                    value={bookingOtp}
                                    onChange={(e) => setBookingOtp(e.target.value)}
                                    className="form-input"
                                    placeholder="Enter booking OTP"
                                />
                                <Button
                                    variant="secondary"
                                    size="large"
                                    className="register-btn"
                                    onClick={handleConfirmBooking}
                                    style={{ marginTop: '0.6rem' }}
                                >
                                    Confirm Booking OTP
                                </Button>
                            </div>
                        )}

                        {event.type === 'Live' && isRegistered && (
                            <Link to="/livestream">
                                <Button variant="secondary" size="large" className="join-btn">
                                    Join Live Stream
                                </Button>
                            </Link>
                        )}

                        <div className="sidebar-info">
                            <div className="info-item">
                                <span className="info-icon">📅</span>
                                <div>
                                    <div className="info-label">Date</div>
                                    <div className="info-value">{event.date}</div>
                                </div>
                            </div>

                            <div className="info-item">
                                <span className="info-icon">🕐</span>
                                <div>
                                    <div className="info-label">Time</div>
                                    <div className="info-value">{event.time}</div>
                                </div>
                            </div>

                            <div className="info-item">
                                <span className="info-icon">👥</span>
                                <div>
                                    <div className="info-label">Registered</div>
                                    <div className="info-value">{event.attendees}+ attendees</div>
                                </div>
                            </div>
                        </div>

                        <div className="social-share">
                            <div className="share-title">Share Event</div>
                            <div className="share-buttons">
                                <button className="share-btn" aria-label="Share on Twitter">🐦</button>
                                <button className="share-btn" aria-label="Share on LinkedIn">💼</button>
                                <button className="share-btn" aria-label="Copy Link">🔗</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
