import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
    const { user, bookings, unregisterFromEvent } = useAuth();

    const activeBookings = bookings.filter(booking => booking.status !== 'Cancelled');
    const myRegisteredEvents = activeBookings.map(booking => ({
        ...booking.event,
        bookingStatus: booking.status
    })).filter(Boolean);
    const upcomingRegisteredEvents = myRegisteredEvents.filter(e => e.type === 'Upcoming').slice(0, 3);
    const onDemandRegisteredEvents = myRegisteredEvents.filter(e => e.type === 'On-Demand').slice(0, 2);

    return (
        <div className="dashboard-page">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">Welcome Back, {user?.name}!</h1>
                        <p className="dashboard-subtitle">Manage your events and track your learning journey</p>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="dashboard-stats">
                    <div className="dash-stat-card">
                        <div className="dash-stat-icon">🎪</div>
                        <div className="dash-stat-content">
                            <div className="dash-stat-value">{myRegisteredEvents.length}</div>
                            <div className="dash-stat-label">Registered Events</div>
                        </div>
                    </div>

                    <div className="dash-stat-card">
                        <div className="dash-stat-icon">✅</div>
                        <div className="dash-stat-content">
                            <div className="dash-stat-value">{Math.floor(myRegisteredEvents.length * 0.6)}</div>
                            <div className="dash-stat-label">Completed</div>
                        </div>
                    </div>

                    <div className="dash-stat-card">
                        <div className="dash-stat-icon">🏆</div>
                        <div className="dash-stat-content">
                            <div className="dash-stat-value">{Math.floor(myRegisteredEvents.length * 0.4)}</div>
                            <div className="dash-stat-label">Certificates</div>
                        </div>
                    </div>

                    <div className="dash-stat-card">
                        <div className="dash-stat-icon">⏱️</div>
                        <div className="dash-stat-content">
                            <div className="dash-stat-value">{myRegisteredEvents.length * 2}h</div>
                            <div className="dash-stat-label">Learning Time</div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Events */}
                <section className="dashboard-section">
                    <div className="section-header-row">
                        <h2 className="section-title">Upcoming Events</h2>
                        <Link to="/events" className="see-all-link">See all →</Link>
                    </div>

                    {upcomingRegisteredEvents.length > 0 ? (
                        <div className="event-list">
                            {upcomingRegisteredEvents.map(event => (
                                <Link key={event.id} to={`/events/${event.id}`} className="event-list-item">
                                    <img src={event.image} alt={event.title} className="event-list-image" />
                                    <div className="event-list-content">
                                        <h3 className="event-list-title">{event.title}</h3>
                                        <div className="event-list-meta">
                                            <span>📅 {event.date}</span>
                                            <span>🕐 {event.time}</span>
                                            <span>Status: {event.bookingStatus}</span>
                                        </div>
                                    </div>
                                    <button className="event-list-action">Join →</button>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No upcoming events registered. <Link to="/events" className="auth-link">Browse events</Link></p>
                        </div>
                    )}
                </section>

                {/* On-Demand Events */}
                <section className="dashboard-section">
                    <div className="section-header-row">
                        <h2 className="section-title">Continue Learning</h2>
                        <Link to="/events" className="see-all-link">See all →</Link>
                    </div>

                    {onDemandRegisteredEvents.length > 0 ? (
                        <div className="event-list">
                            {onDemandRegisteredEvents.map(event => (
                                <Link key={event.id} to={`/events/${event.id}`} className="event-list-item">
                                    <img src={event.image} alt={event.title} className="event-list-image" />
                                    <div className="event-list-content">
                                        <h3 className="event-list-title">{event.title}</h3>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: '40%' }}></div>
                                        </div>
                                        <span className="progress-text">40% Complete</span>
                                    </div>
                                    <button className="event-list-action">Continue →</button>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No on-demand content registered. <Link to="/events" className="auth-link">Explore library</Link></p>
                        </div>
                    )}
                </section>

                <section className="dashboard-section">
                    <div className="section-header-row">
                        <h2 className="section-title">My Booking Requests</h2>
                    </div>
                    {bookings.length === 0 ? (
                        <div className="empty-state">
                            <p>No booking requests yet. <Link to="/events" className="auth-link">Browse events</Link></p>
                        </div>
                    ) : (
                        <div className="event-list">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="event-list-item">
                                    <img src={booking.event?.image} alt={booking.event?.title} className="event-list-image" />
                                    <div className="event-list-content">
                                        <h3 className="event-list-title">{booking.event?.title}</h3>
                                        <div className="event-list-meta">
                                            <span>Status: {booking.status}</span>
                                            <span>Payment: {booking.paymentStatus}</span>
                                        </div>
                                    </div>
                                    {(booking.status === 'Pending' || booking.status === 'Approved') && (
                                        <button className="event-list-action" onClick={() => unregisterFromEvent(booking.event?.id)}>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
