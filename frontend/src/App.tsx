import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import ProtectedRoute from './auth/ProtectedRoute'
import { useUser } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'
import PoolVotingPage from './pages/VotingPage'

import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const { isSignedIn, isLoaded ,user } = useUser()
  const checkUser = async () => {
    axios.post('http://localhost:3000/check-user',{
      clerk_id: user?.id,
      fullName: user?.fullName  
    })
  }
  useEffect(() => {
    if (user ){
      checkUser();
    }
  },[user]);

 // console.log(user);
  
  const router = createBrowserRouter([
  
    {
      path: '',
      element: <Header />,
      children: [
        {
          path: '/',
          element: <h1 className='text-5xl'>Home</h1>
        },
        {
          path: '/:id',
          element: <PoolVotingPage />
        },
        {
          path: '/dashboard',
          element: <ProtectedRoute isSignedIn={isSignedIn} navigateTo={'/'} ><Dashboard /></ProtectedRoute>
        },

      ]
    },
  ])

  if (!isLoaded) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
