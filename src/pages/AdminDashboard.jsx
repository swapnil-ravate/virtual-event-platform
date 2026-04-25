import { useEffect, useState } from 'react';
import { api } from '../services/api';
import './AdminDashboard.css';

const INITIAL_EVENT = {
    title: '',
    description: '',
    image: '',
    date: '',
    time: '',
    category: '',
    type: 'Upcoming',
    price: 0,
    capacity: 100,
    location: 'Virtual'
};

export default function AdminDashboard() {
    const [stats, setStats] = useState({ pendingBookings: 0, totalRevenue: 0, confirmedPaidClients: 0 });
    const [bookings, setBookings] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventForm, setEventForm] = useState(INITIAL_EVENT);
    const [editingEventId, setEditingEventId] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const loadAll = async () => {
        const [statsRes, bookingRes, eventsRes] = await Promise.all([
            api.getAdminStats(),
            api.getAllBookings(),
            api.getEvents()
        ]);
        setStats(statsRes);
        setBookings(bookingRes.bookings || []);
        setEvents(eventsRes.events || []);
    };

    useEffect(() => {
        loadAll().catch((err) => setError(err.message || 'Failed to load admin data.'));
    }, []);

    const handleBookingUpdate = async (bookingId, payload) => {
        try {
            await api.updateBookingStatus(bookingId, payload);
            await loadAll();
        } catch (err) {
            setError(err.message || 'Failed to update booking status.');
        }
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            if (editingEventId) {
                await api.updateEvent(editingEventId, eventForm);
            } else {
                await api.createEvent(eventForm);
            }
            setEventForm(INITIAL_EVENT);
            setEditingEventId('');
            await loadAll();
        } catch (err) {
            setError(err.message || 'Unable to save event.');
        } finally {
            setSaving(false);
        }
    };

    const editEvent = (event) => {
        setEditingEventId(event.id);
        setEventForm({
            title: event.title,
            description: event.description,
            image: event.image,
            date: event.date,
            time: event.time,
            category: event.category,
            type: event.type,
            price: event.price,
            capacity: event.capacity,
            location: event.location
        });
    };

    const removeEvent = async (eventId) => {
        try {
            await api.deleteEvent(eventId);
            await loadAll();
        } catch (err) {
            setError(err.message || 'Unable to delete event.');
        }
    };

    return (
        <div className="admin-page">
            <div className="container">
                <h1 className="admin-title">Admin Control Panel</h1>
                {error && <div className="error-banner">{error}</div>}

                <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                        <h3>Pending Requests</h3>
                        <p>{stats.pendingBookings}</p>
                    </div>
                    <div className="admin-stat-card">
                        <h3>Total Revenue</h3>
                        <p>Rs. {stats.totalRevenue}</p>
                    </div>
                    <div className="admin-stat-card">
                        <h3>Confirmed Paid Clients</h3>
                        <p>{stats.confirmedPaidClients}</p>
                    </div>
                </div>

                <section className="admin-section">
                    <h2>Booking Queue</h2>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Event</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td>{booking.user?.email}</td>
                                        <td>{booking.event?.title}</td>
                                        <td>{booking.status}</td>
                                        <td>{booking.paymentStatus}</td>
                                        <td className="admin-actions">
                                            <button onClick={() => handleBookingUpdate(booking._id, { status: 'Approved' })}>Approve</button>
                                            <button onClick={() => handleBookingUpdate(booking._id, { status: 'Rejected' })}>Reject</button>
                                            <button onClick={() => handleBookingUpdate(booking._id, { paymentStatus: 'Paid' })}>Mark Paid</button>
                                            <button onClick={() => handleBookingUpdate(booking._id, { paymentStatus: 'Not Paid' })}>Mark Not Paid</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="admin-section">
                    <h2>{editingEventId ? 'Edit Event' : 'Create Event'}</h2>
                    <form className="admin-event-form" onSubmit={handleEventSubmit}>
                        {Object.keys(INITIAL_EVENT).map((key) => (
                            <input
                                key={key}
                                type={key === 'price' || key === 'capacity' ? 'number' : 'text'}
                                placeholder={key}
                                value={eventForm[key]}
                                onChange={(e) =>
                                    setEventForm((prev) => ({
                                        ...prev,
                                        [key]: key === 'price' || key === 'capacity' ? Number(e.target.value) : e.target.value
                                    }))
                                }
                                required={['title', 'description', 'image', 'date', 'time', 'category', 'capacity'].includes(key)}
                            />
                        ))}
                        <button type="submit" disabled={saving}>{saving ? 'Saving...' : (editingEventId ? 'Update Event' : 'Create Event')}</button>
                    </form>
                </section>

                <section className="admin-section">
                    <h2>Manage Events</h2>
                    <div className="admin-event-grid">
                        {events.map((event) => (
                            <article key={event.id} className="admin-event-card">
                                <img src={event.image} alt={event.title} />
                                <h3>{event.title}</h3>
                                <p>{event.category} • Seats Left: {event.availableSeats}/{event.capacity}</p>
                                <div className="admin-actions">
                                    <button onClick={() => editEvent(event)}>Edit</button>
                                    <button onClick={() => removeEvent(event.id)}>Delete</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
