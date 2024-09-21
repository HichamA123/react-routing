import {
  createBrowserRouter,
	Navigate
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Root from "./layouts/Root";

// Creating the router with paths and element mappings
const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
		]
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
])

export default router