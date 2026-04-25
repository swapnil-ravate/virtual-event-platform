import { Link } from 'react-router-dom';
import './EventCard.css';

export default function EventCard({ event }) {
    const {
        id,
        title,
        image,
        date,
        time,
        category,
        attendees,
        price,
        type
    } = event;

    return (
        <Link to={`/events/${id}`} className="event-card">
            <div className="event-card-image">
                <img src={image} alt={title} />
                <span className={`event-badge ${type}`}>{type}</span>
            </div>

            <div className="event-card-content">
                <div className="event-meta">
                    <span className="event-category">{category}</span>
                    <span className="event-attendees">👥 {attendees}+</span>
                </div>

                <h3 className="event-title">{title}</h3>

                <div className="event-details">
                    <div className="event-datetime">
                        <span className="event-date">📅 {date}</span>
                        <span className="event-time">🕐 {time}</span>
                    </div>
                </div>

                <div className="event-footer">
                    <span className="event-price">{price === 0 ? 'Free' : `₹${price}`}</span>
                    <button className="event-register-btn">
                        Register Now →
                    </button>
                </div>
            </div>
        </Link>
    );
}
