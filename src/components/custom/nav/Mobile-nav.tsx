import { MobileNavType } from "@/types/general-types";
import { CircleUser, HomeIcon, LogIn, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../../mode-toggle";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/userAtom";

const mobileNav: MobileNavType[] = [
	{ icon: <HomeIcon />, path: "/" },
	{ icon: <Search />, path: "/search" },
	{ icon: <CircleUser />, path: "/me" },
	{ icon: <Settings />, path: "/setting" },
	{ icon: <LogIn />, path: "/signin" },
];

export default function MobileNav() {
	const user = useRecoilValue(userAtom);
	return (
		<div className="h-full w-full flex justify-evenly items-center bg-background ">
			{mobileNav.map((item: MobileNavType, idx: number) => {
				if (!user.username && idx === 2) {
					return null;
				}

				if (user.username && idx === 4) {
					return null;
				}
				if (!user.username && idx === 3) {
					return null;
				}



				return (
					<Link to={item.path} key={idx}>
						<div className="flex gap-4 items-center hover:text-primary">
							{item.icon}
						</div>
					</Link>
				);
			})}
			<ModeToggle />
		</div>
	);
}
