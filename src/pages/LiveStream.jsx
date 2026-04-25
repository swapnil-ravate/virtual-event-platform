import './LiveStream.css';

export default function LiveStream() {
    return (
        <div className="livestream-page">
            <div className="livestream-container">
                <div className="livestream-main">
                    {/* Video Player */}
                    <div className="video-container">
                        <div className="video-placeholder">
                            <div className="video-icon">🎥</div>
                            <h2>Live Stream</h2>
                            <p>Video player would be integrated here using providers like YouTube, Twitch, or custom streaming solutions</p>
                            <div className="live-badge">🔴 LIVE</div>
                        </div>
                    </div>

                    {/* Event Info */}
                    <div className="stream-info">
                        <h1 className="stream-title">AI & Machine Learning Summit 2024</h1>
                        <div className="stream-meta">
                            <span className="viewers">👥 2,543 watching now</span>
                            <span className="duration">⏱️ Started 45 minutes ago</span>
                        </div>
                        <p className="stream-description">
                            Join industry leaders as they explore the latest trends in AI, machine learning, and deep learning technologies.
                        </p>
                    </div>

                    {/* Q&A Section */}
                    <div className="qa-section">
                        <h3 className="qa-title">Q&A Session</h3>
                        <div className="qa-list">
                            <div className="qa-item">
                                <div className="qa-user">Sarah M.</div>
                                <div className="qa-question">What are the best practices for training large language models?</div>
                                <button className="qa-upvote">👍 24</button>
                            </div>
                            <div className="qa-item">
                                <div className="qa-user">John D.</div>
                                <div className="qa-question">How do you handle bias in AI models?</div>
                                <button className="qa-upvote">👍 18</button>
                            </div>
                        </div>
                        <form className="qa-form">
                            <input type="text" placeholder="Ask a question..." className="qa-input" />
                            <button type="submit" className="qa-submit">Send</button>
                        </form>
                    </div>
                </div>

                {/* Chat Sidebar */}
                <div className="chat-sidebar">
                    <div className="chat-header">
                        <h3>Live Chat</h3>
                        <span className="chat-count">142 participants</span>
                    </div>

                    <div className="chat-messages">
                        <div className="chat-message">
                            <span className="chat-user">Alex</span>
                            <span className="chat-text">Great presentation!</span>
                        </div>
                        <div className="chat-message">
                            <span className="chat-user">Maria</span>
                            <span className="chat-text">Really insightful content 🎯</span>
                        </div>
                        <div className="chat-message">
                            <span className="chat-user">James</span>
                            <span className="chat-text">Can't wait for the next session</span>
                        </div>
                        <div className="chat-message">
                            <span className="chat-user">Emma</span>
                            <span className="chat-text">Where can I find the slides?</span>
                        </div>
                    </div>

                    <form className="chat-form">
                        <input type="text" placeholder="Type a message..." className="chat-input" />
                        <button type="submit" className="chat-send">📤</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
