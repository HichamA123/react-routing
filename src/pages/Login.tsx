import React, { useCallback, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Input, Button } from "@nextui-org/react"
import { useAuth } from "../states/AuthContext"
import { ToastTypes, triggerToast } from "../utils"

function Login() {
  const { login, isLoggedIn } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  // is given when the user gets redirected to this login page
  const from = location.state?.from?.pathname || "/dashboard"

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      triggerToast("please fill in username and password.", ToastTypes.ERROR)
      return
    }

    try {
      await login(username, password)
      navigate(from)
      triggerToast("succesfully logged in.", ToastTypes.SUCCESS)
    } catch (error) {
      if (error instanceof Error) {
        // Now you can safely access properties of the Error object
        console.error('Caught an error:', error.message)
        triggerToast(error.message, ToastTypes.ERROR)
      } else {
        // Handle the case where the error is not an instance of Error
        console.error('Caught an unknown error:', error)
        triggerToast(`Unknown error occured: ${error}`, ToastTypes.ERROR)
      }
    }
  }, [username, password])

  // for a split second the cache is not yet fetched so the user gets redirected to the login. 
  // here we send the user back to the original page if the user suddenly becomes logged in (after loading in the cache in authcontext)
  useEffect(() => {
    if (isLoggedIn) {
      navigate(from)
    }
  }, [isLoggedIn])

  return (
    <div className="flex flex-col justify-center items-center gap-4" style={{ height: '85vh' }}>
      <h1 className="text-5xl font-bold" >Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 bg-white w-4/5 p-4 border-zinc-500 border-2 rounded-md">
        <Input variant="bordered" isRequired type="text" label="Username" aria-label="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input variant="bordered" isRequired type="password" label="Password" aria-label="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button color="primary" type="submit" className="w-2/5">
          Login
        </Button>

      </form>
    </div>
  )
};

export default Login;
