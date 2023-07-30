import React, { useContext } from 'react'
import Menu from './components/menu/Menu'
import Main from './pages/main/Main'
import {Navigate, createBrowserRouter, RouterProvider, BrowserRouter, Outlet} from 'react-router-dom'
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import './app.css'
import { UserContext } from './context/userContext.jsx'




const ProtectedRoute= ({children})=>{
  const {user} = useContext(UserContext)
  if(!user || user==undefined || user==""){
    return <Navigate to="/login"/>
  }else{
  return children
  }
}

const Layout =()=>{
  return (
    <main>
      <div className='menu'>
       <Menu/>
       </div>
       <div className='main'>
        <Outlet/>
        </div>
    </main>
  )
  }

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Layout/></ProtectedRoute>,
    children: [
      {
        path: 'profile/:username',
        element: <Profile/>
      }, {
        path: '/',
        element: <Main/>
      }
    ],
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/register',
    element: <Register/>,
  }
])




function App() {
  return(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  )
}

export default App
