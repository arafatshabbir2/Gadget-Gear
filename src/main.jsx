import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './Pages/MainLayout.jsx'
import ErrorPage from './Pages/ErrorPage/ErrorPage'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import AuthProvider from './Components/AuthProvider/AuthProvider'
import Addproduct from './Pages/AddProduct/Addproduct'
import Brandproduct from './Pages/BrandProduct/Brandproduct'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import ProductDetail from './Pages/ProductDetail/ProductDetail'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/signIn',
        element: <SignIn></SignIn>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/addProduct',
        element: <PrivateRoute>
          <Addproduct></Addproduct>
        </PrivateRoute>
      },
      {
        path: '/product/:brandname',
        element: <PrivateRoute><Brandproduct></Brandproduct></PrivateRoute>,
        loader:({params})=>{
          return fetch(`http://localhost:5000/product/${params.brandname}`)
        }
      },
      {
        path:"/items/:id",
        element:<ProductDetail></ProductDetail>,
        loader:({params})=> fetch(`http://localhost:5000/items/${params.id}`)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>

  </React.StrictMode>,
)