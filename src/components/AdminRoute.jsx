import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '60vh' }}>
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
