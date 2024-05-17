import ResetPassword from "@/components/custom/resetPassword/reset-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// const resetPasswordCompoment = () => {
// 	const [oldPassword, setOldPassword] = useState<string>("");
// 	const [newPassword, setNewPassword] = useState<string>("");
// 	const navigate = useNavigate();

// 	return (
		
// 	);
// };





const ForgetPassword = () => {
	const [value, setValue] = useState("");
	const [verifyOtp, setVerifyOtp] = useState<boolean>(true);
	const [err, setErr] = useState<boolean>(false);

	const checkOptIsCorrect = async (value: string): Promise<void> => {
		const res = await axios.post(
			"/api/v1/auth/verify-otp",
			{ otp: value },
			{ withCredentials: true }
		);
		console.log(res);

		if (res?.data?.message == "Invalid OTP") {
			setErr(true);
		}

		if (res?.data?.message == "now you can reset your password") {
			setVerifyOtp((prev) => !prev);
		}
	};

	return (
		<div className="w-full h-full p-10 bg-background text-foreground flex flex-col items-center ">
			{verifyOtp && (
				<div>
					<p className="text-lg font-semibold">
						Check Your email we send a four digit OTP
					</p>

					<div className="my-4">
						<InputOTP
							maxLength={4}
							value={value}
							onChange={(value) => setValue(value)}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								{/* <InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
        <InputOTPSlot index={3} /> */}
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
							</InputOTPGroup>
						</InputOTP>
					</div>

					{err && (
						<p className=" mb-2 text-red-600 ">
							{" "}
							Invalid OTP check again.{" "}
						</p>
					)}

					<Button onClick={() => checkOptIsCorrect(value)}>
						Verify OPT
					</Button>
				</div>
			)}

			{!verifyOtp && <ResetPassword/>}
		</div>
	);
};


export default ForgetPassword;
