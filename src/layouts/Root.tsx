import { useLocation, useOutlet } from "react-router-dom";
import Menu from "../components/Menu";

function Root() {
	const outlet = useOutlet() // Use useOutlet to capture the children (routed components)

	return (
		<>
			<Menu />
			<div className="flex justify-center mt-3">
				<div className="basis-11/12 bg-green-500">
						{outlet}
				</div>
			</div>
		</>
	);
};

export default Root;
