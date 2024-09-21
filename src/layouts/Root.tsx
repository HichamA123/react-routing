import { useLocation, useOutlet } from "react-router-dom"
import Menu from "../components/Menu"
import { AnimatePresence, motion } from "framer-motion"

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
};

function Root() {
	const location = useLocation()
	const outlet = useOutlet() // Use useOutlet to capture the children (routed components)

	return (
		<>
			<Menu />
			<div className="flex justify-center mt-3">
				<div className="basis-11/12 bg-green-500">
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
		</>
	);
};

export default Root;
