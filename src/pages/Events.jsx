import { useEffect, useState } from 'react';
import { api } from '../services/api';
import EventCard from '../components/EventCard';
import './Events.css';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const response = await api.getEvents();
                setEvents(response.events || []);
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []);

    const categories = ['All', ...new Set(events.map(event => event.category))];
    const eventTypes = ['All', ...new Set(events.map(event => event.type))];

    // Filter events based on selections
    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
        const matchesType = selectedType === 'All' || event.type === selectedType;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesType && matchesSearch;
    });

    return (
        <div className="events-page">
            <div className="container">
                {/* Header */}
                <div className="events-header">
                    <h1 className="page-title">Discover Events</h1>
                    <p className="page-description">
                        Explore virtual events across technology, business, design, and more
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="events-controls">
                    {/* Search Bar */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>

                    {/* Category Filter */}
                    <div className="filter-group">
                        <label className="filter-label">Category</label>
                        <div className="filter-buttons">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Type Filter */}
                    <div className="filter-group">
                        <label className="filter-label">Event Type</label>
                        <div className="filter-buttons">
                            {eventTypes.map(type => (
                                <button
                                    key={type}
                                    className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                                    onClick={() => setSelectedType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="results-info">
                    <p className="results-count">
                        Showing <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'event' : 'events'}
                    </p>
                </div>

                {/* Events Grid */}
                {loading ? (
                    <div className="no-results">
                        <h3>Loading events...</h3>
                    </div>
                ) : filteredEvents.length > 0 ? (
                    <div className="events-grid">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h3>No events found</h3>
                        <p>Try adjusting your filters or search query</p>
                    </div>
                )}
            </div>
        </div>
    );
}
