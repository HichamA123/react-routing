import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../states/AuthContext"

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  return isLoggedIn ? (<>{children}</>) : 
	(
    <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateRoute
