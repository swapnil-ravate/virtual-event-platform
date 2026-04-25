# Virtual Event Platform Setup and Usage

## Implemented Feature Set

### 1) User Authentication (JWT + bcrypt)
- Secure registration and login are handled by the backend.
- Passwords are hashed with `bcryptjs`.
- Authenticated sessions use JWT tokens.

### 2) Mandatory 2FA OTP Verification
- **Account activation OTP (Email):**
  - On signup, users are created as inactive.
  - OTP is sent to email and must be verified before first login/use.
  - If an inactive user tries to login, activation OTP is sent again.
- **Booking OTP (Email):**
  - Before creating a booking request, user must request and verify OTP.
  - Booking is only created after valid OTP verification.

### 3) Role-Based Access
- **Admin**
  - Access only if DB role is `admin`.
  - Create, edit, delete events.
  - Review booking queue and approve/reject requests.
  - Mark booking as `Paid` / `Not Paid`.
  - View analytics from admin dashboard.
- **User**
  - Browse events.
  - Submit booking requests with OTP.
  - View booking statuses in dashboard.
  - Cancel pending/approved bookings.

### 4) Event Management
- Events support:
  - Free or paid pricing
  - Detailed description
  - External image URL
  - Date/time
  - Category
  - Seat capacity

### 5) Smart Booking System
- OTP is mandatory before booking submission.
- All requests enter `Pending` queue for admin review.
- Seat checks are validated against overbooking logic.
- Remaining seat availability is calculated and exposed to frontend.

### 6) Admin Analytics Dashboard
- Live cards include:
  - Pending Requests
  - Total Revenue (approved + paid)
  - Total Confirmed Paid Clients

### 7) Email Notifications
- OTP emails are delivered using Nodemailer.
- Booking approval triggers booking confirmation email.
- If SMTP is not configured, email service falls back to backend console mock logs.

### 8) UI/UX
- React frontend with polished styling and interactions.
- New OTP and admin flows are integrated into existing UI.

---

## Project Setup

## Prerequisites
- Node.js 18+
- npm
- MongoDB running locally or a cloud MongoDB URI

## 1. Install Dependencies

### Frontend
```bash
npm install
```

### Backend
```bash
cd backend
npm install
```

## 2. Configure Environment

Create environment files from examples:

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:5001
```

### Backend `backend/.env`
```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/virtual-events
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_user
EMAIL_PASS=your_pass
EMAIL_FROM=no-reply@yourdomain.com
```

> If email credentials are not set, OTP/notification messages will be mocked in backend logs.

## 3. Run the App

### Terminal 1 (frontend)
```bash
npm run dev
```

### Terminal 2 (backend)
```bash
npm run backend:dev
```

---

## How To Sign Up and Login

## User Signup
1. Open `/signup`.
2. Fill name, email, password.
3. Submit form.
4. Enter the OTP sent to email to activate account.
5. After OTP verification, user is logged in.

## User Login
1. Open `/login`.
2. Enter email + password.
3. If already active, login completes immediately.
4. If inactive, OTP flow appears:
   - Enter OTP from email
   - Or resend OTP and retry

---

## How To Use the Platform

## For Users
1. Browse events from `/events`.
2. Open event details.
3. Click register:
   - Request booking OTP
   - Enter OTP to submit booking request
4. Track booking status in `/dashboard`:
   - `Pending`, `Approved`, `Rejected`, `Cancelled`
   - payment status shown (`Paid` / `Not Paid`)
5. Cancel eligible bookings directly from dashboard.

## For Admins
1. Ensure user record has `role: "admin"` in MongoDB.
2. Login with that account.
3. Open `/admin` panel.
4. Use admin features:
   - Review booking queue
   - Approve/Reject requests
   - Mark payment status
   - Create/Edit/Delete events
   - Monitor analytics (pending/revenue/paid clients)

---

## Notes
- Admin privileges are strictly database-driven by `role`.
- Account activation is required before authenticated usage.
- Booking requests are intentionally not auto-approved.
