const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const getToken = () => localStorage.getItem("token");

const request = async (path, options = {}) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

export const api = {
  register: (payload) => request("/api/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/api/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  verifyActivationOtp: (payload) =>
    request("/api/auth/verify-activation-otp", { method: "POST", body: JSON.stringify(payload) }),
  resendActivationOtp: (payload) =>
    request("/api/auth/resend-activation-otp", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/api/auth/me"),
  getEvents: () => request("/api/events"),
  requestBookingOtp: (payload) =>
    request("/api/bookings/request-otp", { method: "POST", body: JSON.stringify(payload) }),
  createBooking: (payload) => request("/api/bookings", { method: "POST", body: JSON.stringify(payload) }),
  getMyBookings: () => request("/api/bookings/my"),
  cancelBooking: (bookingId) => request(`/api/bookings/${bookingId}`, { method: "DELETE" }),
  getAllBookings: () => request("/api/bookings"),
  updateBookingStatus: (bookingId, payload) =>
    request(`/api/bookings/${bookingId}/status`, { method: "PATCH", body: JSON.stringify(payload) }),
  getAdminStats: () => request("/api/admin/stats"),
  createEvent: (payload) => request("/api/events", { method: "POST", body: JSON.stringify(payload) }),
  updateEvent: (eventId, payload) =>
    request(`/api/events/${eventId}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteEvent: (eventId) => request(`/api/events/${eventId}`, { method: "DELETE" })
};
