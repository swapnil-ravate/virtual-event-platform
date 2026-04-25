import { mockSpeakers } from '../data/mockData';
import './Speakers.css';

export default function Speakers() {
    return (
        <div className="speakers-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Meet Our Speakers</h1>
                    <p className="page-description">
                        Learn from industry experts and thought leaders from around the world
                    </p>
                </div>

                <div className="speakers-grid">
                    {mockSpeakers.map(speaker => (
                        <div key={speaker.id} className="speaker-card-large">
                            <div className="speaker-card-image">
                                <img src={speaker.image} alt={speaker.name} />
                            </div>

                            <div className="speaker-card-content">
                                <h3 className="speaker-card-name">{speaker.name}</h3>
                                <p className="speaker-card-title">{speaker.title}</p>
                                <p className="speaker-card-company">{speaker.company}</p>

                                <p className="speaker-card-bio">{speaker.bio}</p>

                                <div className="speaker-expertise">
                                    {speaker.expertise.map((skill, index) => (
                                        <span key={index} className="expertise-tag">{skill}</span>
                                    ))}
                                </div>

                                <div className="speaker-social">
                                    {speaker.social.twitter && (
                                        <a href={speaker.social.twitter} target="_blank" rel="noopener noreferrer" className="speaker-social-link">
                                            🐦
                                        </a>
                                    )}
                                    {speaker.social.linkedin && (
                                        <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer" className="speaker-social-link">
                                            💼
                                        </a>
                                    )}
                                    {speaker.social.website && (
                                        <a href={speaker.social.website} target="_blank" rel="noopener noreferrer" className="speaker-social-link">
                                            🌐
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
