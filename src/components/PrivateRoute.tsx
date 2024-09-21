import React, { useEffect } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../states/AuthContext"

// redirects to login page if not logged in
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // fixes problem of navigating: when <Navigate /> navigates to /login, 
  // this component immediately gets the new location which rerenders the Navigate element (already removed now) and it navigates to login with state set as /login, which is invalid
  useEffect(() => {
    if (!isLoggedIn) {
      // Navigate to login and pass the original location in state
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [isLoggedIn])

  /*
    could solve the renavigate with new location issue here,
    by returning null here if the location.pathname === '/login' but that would be bound to where it would get redirected to initially
    this way the <Navigate /> component would not get rerendered and trigger a navigation again
  */

  return isLoggedIn ? (<>{children}</>) : (null)
}

export default PrivateRoute
