import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
	const [passwordObject, setPasswordObject] = useState({
		password1: "",
		password2: "",
	});
	const [err, setErr] = useState<boolean>(false);
	const navigate = useNavigate();

	const checkAndResetPassword = async () => {
		if (passwordObject.password1 === passwordObject.password2) {
			try {
				const res = await axios.patch(
					"/api/v1/auth/reset-password",
					{ password: passwordObject.password1 },
					{ withCredentials: true }
				);
				toast.success("Your password was change successfully ");
				navigate("/me");
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		}
		setErr((prev) => !prev);
	};
	return (
		<div className="w-full sm:w-[40%]">
			<Input
				value={passwordObject.password1}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setPasswordObject((prev) => {
						return {
							...prev,
							password1: e.target.value,
						};
					});
				}}
				className="my-4"
				placeholder="Enter a password"
			/>
			<Input
				value={passwordObject.password2}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setPasswordObject((prev) => {
						return {
							...prev,
							password2: e.target.value,
						};
					});
				}}
				className="my-4"
				placeholder="Enter a password again"
			/>
			{err && <p className="my-2 text-red-500">Password not matched</p>}
			<Button onClick={checkAndResetPassword} className={`w-full`}>
				Reset Password
			</Button>
		</div>
	);
};

export default ResetPassword;
