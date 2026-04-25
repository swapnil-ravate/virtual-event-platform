import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import Button from '../components/Button';
import { api } from '../services/api';
import './Home.css';

export default function Home() {
    const [featuredEvents, setFeaturedEvents] = useState([]);

    useEffect(() => {
        const loadFeaturedEvents = async () => {
            const response = await api.getEvents();
            setFeaturedEvents((response.events || []).slice(0, 3));
        };
        loadFeaturedEvents();
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <div className="hero-text fade-in">
                        <h1 className="hero-title">
                            Experience the Future of Virtual Events
                        </h1>
                        <p className="hero-description">
                            Connect with industry leaders, attend live sessions, and network with professionals from around the globe. All from the comfort of your home.
                        </p>
                        <div className="hero-actions">
                            <Link to="/events">
                                <Button variant="primary" size="large">
                                    Explore Events
                                </Button>
                            </Link>

                        </div>
                    </div>

                    {/* Stats */}
                    {/* Trusted By */}
                    <div className="trusted-by">
                        <p className="trusted-label">Trusted by industry leaders</p>
                        <div className="company-logos">
                            <div className="company-logo">TechCorp</div>
                            <div className="company-logo">Innovate</div>
                            <div className="company-logo">GlobalEvents</div>
                            <div className="company-logo">FutureScale</div>
                            <div className="company-logo">StreamLine</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="featured-events py-3xl">
                <div className="container">
                    <div className="section-header text-center mb-2xl">
                        <h2 className="section-title">Featured Events</h2>
                        <p className="section-description">
                            Don't miss out on these amazing upcoming events
                        </p>
                    </div>

                    <div className="events-grid">
                        {featuredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                    <div className="text-center mt-xl">
                        <Link to="/events">
                            <Button variant="outline" size="large">
                                View All Events →
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features py-3xl">
                <div className="container">
                    <div className="section-header text-center mb-2xl">
                        <h2 className="section-title">Why Choose Our Platform?</h2>
                        <p className="section-description">
                            Everything you need for an exceptional virtual event experience
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card fade-in">
                            <div className="feature-icon">🎥</div>
                            <h3 className="feature-title">HD Live Streaming</h3>
                            <p className="feature-description">
                                Crystal clear video quality with low latency for seamless live experiences
                            </p>
                        </div>

                        <div className="feature-card fade-in">
                            <div className="feature-icon">💬</div>
                            <h3 className="feature-title">Real-time Networking</h3>
                            <p className="feature-description">
                                Connect with attendees through live chat, Q&A, and virtual networking rooms
                            </p>
                        </div>

                        <div className="feature-card fade-in">
                            <div className="feature-icon">🎓</div>
                            <h3 className="feature-title">Expert Speakers</h3>
                            <p className="feature-description">
                                Learn from industry leaders and subject matter experts worldwide
                            </p>
                        </div>

                        <div className="feature-card fade-in">
                            <div className="feature-icon">📱</div>
                            <h3 className="feature-title">Mobile Friendly</h3>
                            <p className="feature-description">
                                Join from any device - desktop, tablet, or mobile phone
                            </p>
                        </div>

                        <div className="feature-card fade-in">
                            <div className="feature-icon">🏆</div>
                            <h3 className="feature-title">Certificates</h3>
                            <p className="feature-description">
                                Earn certificates and badges to showcase your achievements
                            </p>
                        </div>

                        <div className="feature-card fade-in">
                            <div className="feature-icon">🔒</div>
                            <h3 className="feature-title">Secure Platform</h3>
                            <p className="feature-description">
                                Enterprise-grade security to protect your data and privacy
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials py-3xl">
                <div className="container">
                    <div className="section-header text-center mb-2xl">
                        <h2 className="section-title">What Our Users Say</h2>
                        <p className="section-description">
                            Join thousands of satisfied attendees and organizers
                        </p>
                    </div>

                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
                            <p className="testimonial-text">
                                "The best virtual event platform I've used. The networking features are incredible and the video quality is outstanding."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Sarah M." />
                                </div>
                                <div className="author-info">
                                    <div className="author-name">Sarah M.</div>
                                    <div className="author-title">Product Manager</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
                            <p className="testimonial-text">
                                "Organizing events has never been easier. The platform is intuitive and our attendees love the interactive features."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Michael R." />
                                </div>
                                <div className="author-info">
                                    <div className="author-name">Michael R.</div>
                                    <div className="author-title">Event Organizer</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
                            <p className="testimonial-text">
                                "I've attended dozens of events here. The speaker quality is top-notch and I've made valuable connections."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" alt="Emily K." />
                                </div>
                                <div className="author-info">
                                    <div className="author-name">Emily K.</div>
                                    <div className="author-title">Software Engineer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-3xl">
                <div className="container">
                    <div className="cta-card text-center">
                        <h2 className="cta-title">Ready to Join the Future?</h2>
                        <p className="cta-description">
                            Start exploring events and connect with professionals worldwide
                        </p>
                        <div className="cta-actions">
                            <Link to="/signup">
                                <Button variant="primary" size="large">
                                    Create Free Account
                                </Button>
                            </Link>
                            <Link to="/events">
                                <Button variant="outline" size="large">
                                    Browse Events
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
