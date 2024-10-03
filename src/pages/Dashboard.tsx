import { useMemo } from "react"
import { useAuth } from "../states/AuthContext"

function Dashboard() {

  const { username } = useAuth()

  const welcomeUser = useMemo(() => {
    let header = "Welcome back, "
    if (!username) header += "user."
    else header += username + "."

    return header
  }, [username])

  return (
    <div className="flex flex-col justify-center items-center" style={{ height: '85vh' }}>
      <h1 className="text-5xl font-semibold text-center" >{welcomeUser}</h1>
    </div>
  )
}

export default Dashboard
