# Nutrify

A full-stack nutrition tracking application built with React (frontend) and Node.js (backend).

## 🚀 Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Nutrition Tracking**: Track daily food intake and nutrition
- **Food Database**: Search and manage food items
- **Responsive UI**: Modern React interface with Vite for fast development

## 🛠️ Tech Stack

### Frontend (`/client`)
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling

### Backend (`/server`)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
nutrify/
├── client/                 # React frontend
│   ├── src/
│   │   ├── Components/     # React components
│   │   ├── App.jsx        # Main app component
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── models/            # Database models
│   │   ├── userModels.js
│   │   ├── foodModels.js
│   │   ├── trackingModels.js
│   │   └── verifyToken.js
│   ├── index.js           # Main server file
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/buildbymanoj/Nutrify.git
   cd Nutrify
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start MongoDB**
   - Make sure MongoDB is running on `mongodb://localhost:27017/nutrify`

2. **Start the Backend Server**
   ```bash
   cd server
   node index.js
   ```
   Server will run on `http://localhost:8000`

3. **Start the Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 🔧 API Endpoints

- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /foods` - Get food items (requires authentication)
- `POST /track` - Track food intake (requires authentication)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Manoj** - [buildbymanoj](https://github.com/buildbymanoj)

## 📄 License

This project is licensed under the ISC License.

---

Built with ❤️ using React and Node.js
