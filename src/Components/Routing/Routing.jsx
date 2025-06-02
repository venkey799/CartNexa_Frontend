import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from '../Home/HomePage'
import ProductsPage from '../Products/ProductsPage'
import SingleProduct from '../SingleProduct/SingleProduct'
import Cart from '../Cart/Cart'
import MyOrder from '../MyOrder/MyOrder'
import LoginPage from '../Authentication/LoginPage'
import SignUpPage from '../Authentication/SignUpPage'
import Logout from '../Authentication/Logout'
import ProtectedRoute from './ProtectedRoute'


function Routing() {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/products' element={<ProductsPage/>}></Route>
        <Route path='/products/:id' element={<SingleProduct/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
       
         <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/myorder' element={<MyOrder/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
       
    </Routes>

  )
}

export default Routing