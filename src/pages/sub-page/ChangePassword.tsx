import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
	const [oldPassword, setOldPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
    const navigate = useNavigate()

	const changePassword = async () => {
		try {
			const res = await axios.post(
				"/api/v1/users/change-password",
				{ oldPassword, newPassword },
				{ withCredentials: true }
			);

			toast.success(res.data.message);
            navigate("/me")
		} catch (error:any) {
            console.log(error);
            
            toast.error(error.response.data.message)
        }
	};

	const redirectToForgetPasswordPage = ()=>{
		navigate("/forget-password")
	}
	return (
		<div className="w-full h-full p-10 flex flex-col items-center ">
			
			<Input
				className="w-full sm:w-[50%] my-4 "
				placeholder="Old Password"
				value={oldPassword}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setOldPassword(e.target.value);
				}}
			/>

			<Input
				className="w-full sm:w-[50%] my-4 "
				placeholder="New Password"
				value={newPassword}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setNewPassword(e.target.value);
				}}
			/>
			<Button
				onClick={changePassword}
				className="w-full sm:w-[50%] my-4  block "
			>
				Change Password
			</Button>
			<Button
				onClick={redirectToForgetPasswordPage}
				variant={"outline"}
				className="w-full sm:w-[50%]  "
			>
				Forget Password
			</Button>
		</div>
	);
};

export default ChangePassword;
