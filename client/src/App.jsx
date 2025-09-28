import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Notfound from './Components/Notfound'
import Track from './Components/Track'
import { UserContext } from './Contexts/UserContext'
import { useEffect } from 'react'
import Private from './Components/Private'
import Diet from './Components/Diet'

function App() {

  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("nutrify-user")));
  //  const navigate = useNavigate();

  //   useEffect(()=>{
  //  console.log(loggedUser);

  // //   if(localStorage.getItem("nutrify-user") !== null){
  // //       setLoggedUser(JSON.parse(localStorage.getItem("nutrify-user")))
  // //   }

  //   },[])

  return (

    <>

      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/track' element={<Private Component={Track} />} />
            <Route path="/diet" element={<Private Component={Diet} />} />
            <Route path='*' element={<Notfound />} />


          </Routes>

        </BrowserRouter>

      </UserContext.Provider>
    </>
  )
}

export default App
