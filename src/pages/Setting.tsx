import axios from "axios";
import { LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/userAtom";
import DeleteAccountPopUp from "@/components/custom/popup/DeleteAccountPopUp";
import { PaymentPayLoadType } from "@/types/general-types";
export default function Setting() {
	const navigate = useNavigate();
	const user = useRecoilValue(userAtom);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);

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
			"pk_test_51PD2CUSH17005eDbhDsmv9VFr2laaK4idCAP3giQfRBLFwIfJWOGjSd129taKYiuUqbT1AfTViYZUN4fkgLwyiUE00C9uWUJ6a"
		);

		const payment: PaymentPayLoadType = {
			price: 10,
			name: "Twitter Premium",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Eo_circle_light-blue_checkmark.svg/1024px-Eo_circle_light-blue_checkmark.svg.png",
			userId: user.id,
		};

		const res = await axios.post(
			`/api/v1/payments/`,
			{ payment },

			{ withCredentials: true }
		);

		console.log(res);

		const session = await res.data;

		console.log(session);

		await stripe?.redirectToCheckout({
			sessionId: session.id,
		});
	};

	return (
		<div className=" relative w-full h-full overflow-x-auto p-10 max-sm:p-4 ">
			<div className="sm:w-[40%] w-full h-full border py-4 rounded-lg ">
				<button className="w-full hover:bg-secondary text-left p-4">
					Change Account Details
				</button>
				<button
					onClick={() => {
						navigate("/change-profile-pic");
					}}
					className="w-full hover:bg-secondary text-left p-4"
				>
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
				<button
					onClick={() => setDeleteModal((prev) => !prev)}
					className="w-full hover:bg-secondary text-left p-4"
				>
					Delete Account
				</button>
			</div>

			{deleteModal && (
				<DeleteAccountPopUp
					deleteModal={deleteModal}
					setDeleteModal={setDeleteModal}
				/>
			)}
		</div>
	);
}
