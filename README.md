# 🎯 Virtual Event Platform

A modern, feature-rich virtual event platform built with React for discovering, registering, and participating in virtual events across various categories including technology, business, design, and more.

![Virtual Event Platform](https://via.placeholder.com/1200x600/1a1614/8b5cf6?text=Virtual+Event+Platform)

## ✨ Features

### 🔐 **Authentication System**
- User registration and login with form validation
- Protected routes for authenticated users
- Persistent sessions with localStorage
- Real-time authentication state management

### 🎪 **Event Discovery**
- Browse events across multiple categories (Technology, Business, Design, Marketing)
- Advanced filtering by category, type, and search query
- Live, Upcoming, and On-Demand event types
- Beautiful glassmorphism UI with smooth animations

### 📝 **Event Registration**
- One-click registration for events
- Registration status tracking
- Dynamic Dashboard showing only your registered events
- Real-time statistics (registered events, completed, certificates, learning time)

### 👥 **Speaker Profiles**
- View featured speakers for events
- Speaker details with company and title information
- Professional speaker cards with images

### 👤 **User Profile**
- Personal dashboard with user details
- Account management options
- Secure logout functionality

### 🎨 **Modern Design**
- Warm dark theme with vibrant accent colors
- Glassmorphism effects throughout
- Smooth micro-animations and transitions
- Fully responsive design for all devices
- Custom scrollbar and selection styling

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Routing:** React Router DOM 7.10.1
- **Styling:** Vanilla CSS with CSS Variables
- **State Management:** React Context API
- **Validation:** Custom validation utilities

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd virtual-event-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
virtual-event-platform/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   ├── EventCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Events.jsx
│   │   ├── EventDetail.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Speakers.jsx
│   │   ├── Exhibitors.jsx
│   │   ├── LiveStream.jsx
│   │   └── UserProfile.jsx
│   ├── context/           # React Context
│   │   └── AuthContext.jsx
│   ├── data/              # Mock data
│   │   └── mockData.js
│   ├── utils/             # Utility functions
│   │   └── validation.js
│   ├── App.jsx            # Main App component
│   ├── index.css          # Global styles & design system
│   └── main.jsx           # App entry point
├── public/                # Static assets
├── index.html             # HTML template
└── package.json           # Dependencies & scripts
```

## 🎨 Design System

The project uses a comprehensive design system built with CSS custom properties:

- **Color Palette:** Vibrant purple/blue gradient with warm dark backgrounds
- **Typography:** Inter font family with 9 size scales
- **Spacing:** 7-step spacing scale (xs to 3xl)
- **Border Radius:** 5 variants for different use cases
- **Shadows:** 4 shadow depths plus glow effects
- **Transitions:** Predefined timing for consistency

## 🔑 Key Components

### AuthContext
Manages authentication state, user sessions, and event registrations with localStorage persistence.

### ProtectedRoute
Wrapper component that restricts access to authenticated users only, redirecting to login when needed.

### EventCard
Reusable card component for displaying event information with category badges and pricing.

## 📋 Features In Development

- [ ] Backend integration (Firebase/Supabase)
- [ ] Unit and integration tests
- [ ] TypeScript migration
- [ ] Real-time live streaming functionality
- [x] User profile management
- [ ] Certificate generation system
- [ ] Social sharing features
- [ ] Email notifications

## 🌟 Highlights for Interviews

1. **State Management:** Implemented Context API for global state without external libraries
2. **Form Validation:** Custom validation utilities with real-time feedback
3. **Protected Routes:** Authentication-based route protection
4. **Responsive Design:** Mobile-first approach with modern CSS
5. **User Experience:** Smooth animations, loading states, and error handling
6. **Code Organization:** Clean component structure with separation of concerns
7. **Design System:** Consistent styling using CSS variables

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Developed as a showcase project demonstrating modern React development practices and UI/UX design skills.

---

**⭐ Star this repository if you found it helpful!**
