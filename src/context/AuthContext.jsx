import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const bootstrap = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }
                const meResponse = await api.me();
                setUser(meResponse.user);
                const bookingResponse = await api.getMyBookings();
                setBookings(bookingResponse.bookings || []);
            } catch {
                localStorage.removeItem('token');
                setUser(null);
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        bootstrap();
    }, []);

    const establishSession = async (authPayload) => {
        localStorage.setItem('token', authPayload.token);
        setUser(authPayload.user);
        const bookingResponse = await api.getMyBookings();
        setBookings(bookingResponse.bookings || []);
    };

    const login = async (email, password) => {
        const response = await api.login({ email, password });
        if (response.token) {
            await establishSession(response);
        }
        return response;
    };

    const signup = async (email, password, name) => {
        const normalizedEmail = String(email || '').trim().toLowerCase();
        const response = await api.register({ email: normalizedEmail, password, name });
        return response;
    };

    const logout = () => {
        setUser(null);
        setBookings([]);
        localStorage.removeItem('token');
    };

    const registerForEvent = async (eventId, otp) => {
        const response = await api.createBooking({ eventId, otp });
        setBookings(prev => [response.booking, ...prev]);
        return true;
    };

    const unregisterFromEvent = async (eventId) => {
        const activeBooking = bookings.find(
            booking =>
                booking.event?.id === eventId &&
                booking.status !== 'Cancelled' &&
                booking.status !== 'Rejected'
        );
        if (!activeBooking) {
            return;
        }
        await api.cancelBooking(activeBooking.id);
        setBookings(prev =>
            prev.map(booking =>
                booking.id === activeBooking.id ? { ...booking, status: 'Cancelled' } : booking
            )
        );
    };

    const isRegisteredForEvent = (eventId) => {
        return bookings.some(
            booking =>
                booking.event?.id === eventId &&
                booking.status !== 'Cancelled' &&
                booking.status !== 'Rejected'
        );
    };

    const refreshBookings = async () => {
        const bookingResponse = await api.getMyBookings();
        setBookings(bookingResponse.bookings || []);
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        establishSession,
        bookings,
        registerForEvent,
        unregisterFromEvent,
        isRegisteredForEvent,
        refreshBookings,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
