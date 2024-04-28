import { Outlet } from "react-router-dom";
import DesktopNav from "./components/custom/nav/Desktop-nav";
import MobileNav from "./components/custom/nav/Mobile-nav";

function App() {

  return (
		<div className="w-full h-screen bg-background text-foreground sm:flex ">
			<div className=" hidden sm:block w-[20%] h-screen ">
        <DesktopNav/>
      </div>
			<div className=" sm:w-[80%] w-full h-screen sm:p-4 ">
        <Outlet/>
      </div>
      <div className=" absolute bottom-0 h-[7%] w-full sm:hidden  ">
        <MobileNav/>
      </div>
		</div>
  );
}

export default App
