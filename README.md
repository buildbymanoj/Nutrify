# Nutrify

A full-stack nutrition tracking application built with React for the frontend and Node.js/Express for the backend. This application allows users to register, log in, search for food items, and track their daily nutritional intake.

## 🚀 Features

- **User Authentication**: Secure user registration and login system using JWT for authentication.
- **Food Tracking**: Users can search for food items and add them to their daily tracking log.
- **Dynamic Date Tracking**: View nutrition data for any selected date.
- **Nutrition Summary**: Calculates and displays total calories, protein, carbs, fat, and fiber for the selected day.
- **Responsive UI**: A clean and modern user interface built with React and Vite for a fast, responsive experience.

## 🛠️ Tech Stack

### Frontend (`/client`)
- **React** - A JavaScript library for building user interfaces.
- **Vite** - A fast build tool and development server for modern web projects.
- **React Router** - For client-side routing between pages.
- **CSS3** - For styling the application.

### Backend (`/server`)
- **Node.js** - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js** - A minimal and flexible Node.js web application framework.
- **MongoDB** - A NoSQL database for storing application data.
- **Mongoose** - An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)** - For creating secure authentication tokens.
- **bcryptjs** - A library for hashing passwords.
- **CORS** - For enabling Cross-Origin Resource Sharing.

## 📁 Project Structure

```
nutrify/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── Components/     # Reusable React components (Header, Food, Diet, etc.)
│   │   ├── Contexts/       # React Context for state management (e.g., UserContext)
│   │   ├── App.jsx         # Main application component with routing
│   │   └── main.jsx        # Entry point for the React application
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend server
│   ├── models/             # Mongoose schema models
│   │   ├── userModels.js
│   │   ├── foodModels.js
│   │   └── trackingModels.js
│   ├── index.js            # Main server file with Express setup and API routes
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- **Node.js**: Version 16 or higher.
- **MongoDB**: A local installation of MongoDB or a connection string for MongoDB Atlas.
- **npm** or **yarn**: A package manager for Node.js.

### Installation

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/buildbymanoj/Nutrify.git
   cd Nutrify
   ```

2. **Install Backend Dependencies**:
   Navigate to the `server` directory and install the required packages.
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**:
   Navigate to the `client` directory and install the required packages.
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start MongoDB**:
   Ensure your MongoDB server is running. The default connection string is `mongodb://localhost:27017/nutrify`.

2. **Start the Backend Server**:
   In the `server` directory, run the following command:
   ```bash
   node index.js
   ```
   The server will start on `http://localhost:8000`.

3. **Start the Frontend Development Server**:
   In the `client` directory, run the following command:
   ```bash
   npm run dev
   ```
   The frontend application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🔧 API Endpoints

All endpoints are prefixed with `http://localhost:8000`.

- `POST /register`: Allows a new user to register.
- `POST /login`: Authenticates a user and returns a JWT token.
- `GET /foods`: Retrieves a list of all food items (requires authentication).
- `POST /track`: Adds a new food item to the user's daily tracking log (requires authentication).
- `GET /track/:user/:date`: Retrieves the tracked food items for a specific user and date (e.g., `/track/60d21b4667d0d8992e610c85/2025-09-28`) (requires authentication).

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the project repository.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Make your changes and commit them (`git commit -m 'Add some AmazingFeature'`).
4. Push your changes to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 👤 Author

**Manoj** - [buildbymanoj](https://github.com/buildbymanoj)

## 📄 License

This project is licensed under the ISC License.

---

Built with ❤️ using React and Node.js
