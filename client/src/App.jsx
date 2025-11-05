import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Register from './Components/Register'
import Login from './Components/Login'
import Notfound from './Components/Notfound'
import Track from './Components/Track'
import { UserContext } from './Contexts/UserContext'
import { ThemeProvider } from './Contexts/ThemeContext'
import { useEffect } from 'react'
import Private from './Components/Private'
import Diet from './Components/Diet'
import Calculator from './Components/Calculator'

function App() {
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("nutrify-user")));
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  return (
    <>
      {googleClientId ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          <ThemeProvider>
            <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/track' element={<Private Component={Track} />} />
                  <Route path="/diet" element={<Private Component={Diet} />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path='*' element={<Notfound />} />
                </Routes>
              </BrowserRouter>
            </UserContext.Provider>
          </ThemeProvider>
        </GoogleOAuthProvider>
      ) : (
        <ThemeProvider>
          <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/track' element={<Private Component={Track} />} />
                <Route path="/diet" element={<Private Component={Diet} />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path='*' element={<Notfound />} />
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </ThemeProvider>
      )}
    </>
  )
}

export default App
