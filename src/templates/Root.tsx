import { useEffect } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import Menu from "../components/Menu"
import { AnimatePresence, motion } from "framer-motion"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const pageVariants = {
  initial: { // Starting state when component enters
    opacity: 0,
  },
  animate: { // Active state (when fully visible)
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: { // Exit state when component is leaving
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
}

// this file acts as the App.tsx as we know it
function Root() {
	const location = useLocation()

	// using outlet instead of <outlet /> because it wraps the pages around a component. because of this i cannot reach the child page to set a key for the animatepresence
	const outlet = useOutlet() // Use useOutlet to capture the children (routed components)


	useEffect(() => {
		const page = location.pathname.slice(1) // remove the / in path
		const capitalizedPage = page.charAt(0).toUpperCase() + page.slice(1)

		document.title = `UNC INC - ${capitalizedPage || 'Home'}`
	}, [location.pathname])

	return (
		<>
			<Menu />
			<div className="flex justify-center mt-3">
				<div className="basis-11/12">
					<AnimatePresence mode="wait">
						<motion.div
							key={location.pathname}
							variants={pageVariants}
							initial="initial"
							animate="animate"
							exit="exit"
						>
							{outlet}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
			<ToastContainer />
		</>
	)
}

export default Root
