import {
  createBrowserRouter,
	Navigate
} from "react-router-dom";
import Sample from "./components/Sample"
import App from "./App";

// Creating the router with paths and element mappings
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
	{
		path: "/sample",
		element: <Sample />,
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
])

export default router