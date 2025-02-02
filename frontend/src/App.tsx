import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import ProtectedRoute from './auth/ProtectedRoute'
import { useUser } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'


function App() {
  const { isSignedIn, isLoaded } = useUser()
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
