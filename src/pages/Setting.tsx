import axios from "axios";
import { LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function Setting() {
	const navigate = useNavigate();
	const logoutUser = async () => {
		try {
			const res = await axios.post(
				`/api/v1/auth/signout`,
				{},
				{ withCredentials: true }
			);
			localStorage.removeItem("curr-user");
			toast.success(res.data.message);
			navigate("/");
			window.location.reload()
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};
	return (
		<div className=" w-full h-full overflow-x-auto p-10 max-sm:p-4 ">
			<div className="sm:w-[40%] w-full h-full border py-4 rounded-lg ">
				<button className="w-full hover:bg-secondary text-left p-4">
					Change Account Details
				</button>
				<button className="w-full hover:bg-secondary text-left p-4">
					Change Profile
				</button>
				<button className="w-full hover:bg-secondary text-left p-4">
					Change Password
				</button>
				<button className="w-full hover:bg-secondary text-left p-4">
					Blue Tick
				</button>
				<button className="w-full hover:bg-secondary text-left p-4">
					Privacy
				</button>
				<button
					onClick={logoutUser}
					className="w-full flex gap-2 items-center hover:bg-secondary text-left p-4"
				>
					Logout <LogOutIcon size={"1rem"} />
				</button>
				<button className="w-full hover:bg-secondary text-left p-4">
					Delete Account
				</button>
			</div>
		</div>
	);
}
