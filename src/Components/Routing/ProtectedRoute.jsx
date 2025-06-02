import React from 'react'
import { getUser } from '../../services/userServices'
import { Navigate, Outlet } from 'react-router-dom'
function ProtectedRoute() {
  return (
   getUser() ? <Outlet/> :<Navigate to="/login"/>
  )
}

export default ProtectedRoute