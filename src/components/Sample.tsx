import {Button, ButtonGroup} from "@nextui-org/button";
import { useAuth } from "../states/AuthContext";

function Sample() {

  const { userSession } = useAuth()

  return (
    <>
    <h1 className="text-3xl font-bold" >SAMPLE</h1>
    <Button color="primary">
      Button {userSession}
    </Button>
    </>
  )
}

export default Sample
