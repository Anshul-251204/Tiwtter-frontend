import { DesktopNavType } from "@/types/general-types";
import {
	CircleUser,
	HomeIcon,
	LogIn,
	PlusCircle,
	Search,
	Settings,
	Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../../mode-toggle";
import { userAtom } from "@/recoil/atoms/userAtom";
import { useRecoilValue } from "recoil";

const DesktopNavBar: DesktopNavType[] = [
	{ icon: <HomeIcon />, path: "/", text: "Home" },
	{ icon: <Search />, path: "/search", text: "Search" },
	{ icon: <CircleUser />, path: "/me", text: "Profile" },
	{ icon: <PlusCircle />, path: "/addpost", text: "Create" },
	{ icon: <Settings />, path: "/setting", text: "Settings" },
	{ icon: <LogIn />, path: "/signin", text: "Sign In" },
];

export default function DesktopNav() {
	const user = useRecoilValue(userAtom);

	return (
		<div className=" w-full h-screen border-r flex flex-col gap-8 pt-20 pl-16 font-semibold text-lg items-start ">
			<div className="flex gap-4  font-bold text-2xl">
				<h1 className="  ">Tiwtter</h1>
				<Twitter />
			</div>

			{DesktopNavBar.map((item: DesktopNavType, idx: number) => {
				if (user.username && item.text === "Sign In") {
					return null;
				}

				if (!user.username && item.text === "Profile") {
					return null;
				}
				return (
					<Link to={item.path} key={idx}>
						<div className="flex gap-4 items-center hover:text-primary">
							{item.icon} {item.text}
						</div>
					</Link>
				);
			})}

			<div className="flex gap-4 items-center -ml-2">
				<ModeToggle /> Mode
			</div>
		</div>
	);
}
