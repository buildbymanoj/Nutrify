import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Notfound from './Components/Notfound'
import Track from './Components/Track'

function App() {
  

  return (
    <>
      <BrowserRouter>
        
      <Routes>
         <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/track' element={<Track/>}/>
        <Route path='*' element={<Notfound/>}/>
        

      </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
