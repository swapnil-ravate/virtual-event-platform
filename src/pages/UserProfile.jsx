import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import './UserProfile.css';

export default function UserProfile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <div className="profile-page">Loading...</div>;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h1 className="profile-name">{user.name}</h1>
                    <span className="profile-role">{user.role || 'User'}</span>
                </div>

                <div className="profile-body">
                    <div className="profile-section">
                        <h2 className="profile-section-title">Account Details</h2>

                        <div className="info-group">
                            <label className="info-label">Email Address</label>
                            <div className="info-value">{user.email}</div>
                        </div>

                        <div className="info-group">
                            <label className="info-label">Member Since</label>
                            <div className="info-value">October 2023</div>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <Button variant="secondary" onClick={() => { }} style={{ flex: 1 }}>
                            Edit Profile
                        </Button>
                        <Button variant="outline" onClick={handleLogout} style={{ flex: 1, borderColor: '#EF4444', color: '#EF4444' }}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
