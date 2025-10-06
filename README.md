# Nutrify

A comprehensive full-stack nutrition tracking and health calculator application built with modern React and Node.js. This application empowers users to track their nutritional intake, calculate BMI, determine daily calorie needs, and maintain a healthy lifestyle with an intuitive, theme-switchable interface.

## 🚀 Features

### Core Nutrition Tracking
- **User Authentication**: Secure registration and login with JWT-based authentication
- **Food Search & Tracking**: Real-time food search with dynamic quantity calculation
- **Daily Nutrition Summary**: Comprehensive tracking of calories, protein, carbs, fat, and fiber
- **Date-based Tracking**: View and manage nutrition data for any specific date
- **Visual Feedback**: Success/error messages for all user actions

### Health Calculators
- **BMI Calculator**: Calculate Body Mass Index with personalized motivational messages
- **Calorie Calculator**: Mifflin-St Jeor formula-based daily calorie needs calculation
- **Activity Levels**: Comprehensive activity level options from sedentary to elite athlete
- **Health Insights**: Color-coded BMI categories with encouraging quotes

### User Experience
- **Dark/Light Theme**: Seamless theme switching with local storage persistence
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, animated interface with smooth transitions
- **Real-time Updates**: Instant feedback and dynamic calculations

## 🛠️ Tech Stack

### Frontend (`/client`)
- **React 19.1.1** - Modern JavaScript library for building user interfaces
- **Vite** - Lightning-fast build tool and development server
- **React Router 7.9.1** - Declarative routing for React applications
- **CSS Variables** - Dynamic theming system with custom properties
- **GSAP** - Animation library for smooth theme transitions

### Backend (`/server`)
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing for security
- **CORS** - Cross-origin resource sharing support

## 📁 Project Structure

```
nutrify/
├── client/                     # React frontend application
│   ├── src/
│   │   ├── Components/         # Reusable React components
│   │   │   ├── Calculator.jsx  # BMI & Calorie calculators
│   │   │   ├── Food.jsx        # Food tracking component
│   │   │   ├── Header.jsx      # Navigation with theme toggle
│   │   │   ├── Login.jsx       # User authentication
│   │   │   ├── Register.jsx    # User registration
│   │   │   ├── Track.jsx       # Food search and tracking
│   │   │   └── ...
│   │   ├── Contexts/           # React Context providers
│   │   │   ├── UserContext.jsx # User state management
│   │   │   └── ThemeContext.jsx # Theme state management
│   │   ├── App.jsx             # Main app with routing
│   │   ├── App.css             # Global styles with themes
│   │   └── main.jsx            # React application entry point
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js backend server
│   ├── models/                 # Mongoose data models
│   │   ├── userModels.js       # User schema
│   │   ├── foodModels.js       # Food database schema
│   │   ├── trackingModels.js   # Nutrition tracking schema
│   │   └── verifyToken.js      # JWT verification middleware
│   ├── index.js                # Express server with API routes
│   └── package.json
├── README.md
└── package.json
```

## 🚦 Getting Started

### Prerequisites
- **Node.js**: Version 18 or higher
- **MongoDB**: Local installation or MongoDB Atlas connection
- **npm**: Package manager for Node.js

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/buildbymanoj/Nutrify.git
   cd Nutrify
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

Create a `.env` file in the server directory with:
```env
MONGODB_URI=mongodb://localhost:27017/nutrify
JWT_SECRET=your_jwt_secret_key
PORT=8000
```

### Running the Application

1. **Start MongoDB** (if using local instance)

2. **Start the Backend Server**:
   ```bash
   cd server
   npm start
   ```
   Server runs on `http://localhost:8000`

3. **Start the Frontend**:
   ```bash
   cd client
   npm run dev
   ```
   Frontend available at `http://localhost:5173`

## 🔧 API Endpoints

Base URL: `http://localhost:8000`

### Authentication
- `POST /register` - User registration
- `POST /login` - User authentication with JWT

### Food Management
- `GET /foods/:query` - Search food items (authenticated)
- `POST /track` - Add food to daily tracking (authenticated)
- `GET /track/:user/:date` - Get daily nutrition data (authenticated)

## 🎨 Features Overview

### Health Calculators
- **BMI Calculator**: Weight/height input with categorized results
- **Calorie Calculator**: Age, gender, weight, height, and activity level inputs
- **Motivational Messages**: Personalized feedback based on BMI results
- **Activity Options**: 10+ activity levels from sedentary to professional athlete

### User Interface
- **Theme Switching**: Toggle between light and dark modes
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: GSAP-powered transitions
- **Accessibility**: Proper contrast ratios and keyboard navigation

### Data Management
- **Real-time Search**: Instant food item search and selection
- **Quantity Calculation**: Dynamic nutritional value scaling
- **Date Navigation**: Historical nutrition data viewing
- **Persistent Sessions**: JWT-based authentication with local storage

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📊 Project Status

- ✅ User authentication system
- ✅ Food search and tracking
- ✅ BMI and calorie calculators
- ✅ Dark/light theme switching
- ✅ Responsive design
- ✅ Real-time feedback system

## 👤 Author

**Manoj** - [buildbymanoj](https://github.com/buildbymanoj)

## 📄 License

This project is licensed under the ISC License.

---

Built with ❤️ using React, Node.js, and modern web technologies
