import { mockExhibitors } from '../data/mockData';
import './Exhibitors.css';

export default function Exhibitors() {
    return (
        <div className="exhibitors-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Virtual Exhibitors</h1>
                    <p className="page-description">
                        Explore booths from leading companies and organizations
                    </p>
                </div>

                <div className="exhibitors-grid">
                    {mockExhibitors.map(exhibitor => (
                        <div key={exhibitor.id} className="exhibitor-card">
                            <div className="exhibitor-logo">
                                <img src={exhibitor.logo} alt={exhibitor.name} />
                            </div>

                            <div className="exhibitor-content">
                                <h3 className="exhibitor-name">{exhibitor.name}</h3>
                                <span className="exhibitor-category">{exhibitor.category}</span>
                                <p className="exhibitor-description">{exhibitor.description}</p>

                                {exhibitor.resources && exhibitor.resources.length > 0 && (
                                    <div className="exhibitor-resources">
                                        <h4 className="resources-title">Resources</h4>
                                        <div className="resources-list">
                                            {exhibitor.resources.map((resource, index) => (
                                                <a key={index} href="#" className="resource-item">
                                                    <span className="resource-icon">📄</span>
                                                    <span className="resource-name">{resource.title}</span>
                                                    <span className="resource-type">{resource.type}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="exhibitor-actions">
                                    <a href={exhibitor.website} target="_blank" rel="noopener noreferrer" className="exhibitor-btn">
                                        Visit Website
                                    </a>
                                    <button className="exhibitor-btn-outline">
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
