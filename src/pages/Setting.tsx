import axios from "axios";
import { LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/userAtom";

export default function Setting() {
	const navigate = useNavigate();
	const user = useRecoilValue(userAtom);

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
			window.location.reload();
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};

	const makePayment = async () => {
		const stripe = await loadStripe(
			"pk_test_51Orf6TSG6eGnrw34zshMSVO0UUmNVUXIlogObxaG5DqS8ur0OsH9CbSO6AcEnM22vhtk1S9Hi2TFNXVpAIPWXfgl00JFqaa7hF"
		);

		const payment = {
			price: 10,
		};

		const res = await axios.post(
			`/api/v1/payments/`,
			{ payment },
			{ withCredentials: true }
		);

		console.log(res);

		const session = await res.data;

		const result = await stripe?.redirectToCheckout({
			sessionId: session.id,
		});
		
		if (result) {
			axios
				.patch(`/api/v1/payments/bluetick/${user.username}`)
				.then((data) => console.log(data.data.data));
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
				<button
					onClick={makePayment}
					className="w-full hover:bg-secondary text-left p-4"
				>
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