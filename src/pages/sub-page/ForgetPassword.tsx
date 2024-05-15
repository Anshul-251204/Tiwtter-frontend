import { Button } from "@/components/ui/button";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { useState } from "react";

const ForgetPassword = () => {
	const [value, setValue] = useState("");
	const [verifyOtp, setVerifyOtp] = useState<boolean>(true);

	const checkOptIsCorrect = async (value: string): Promise<void> => {
		await axios.post(
			"/api/v1/auth/verify-otp",
			{ otp: value },
			{ withCredentials: true }
		);
	};

	return (
		<div className="w-full h-full p-10 bg-background text-foreground flex flex-col items-center ">
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
				<div className="mb-4 ">
					{value === "" ? (
						<>Enter your one-time password.</>
					) : (
						<>You entered: {value}</>
					)}
				</div>

				<Button onClick={() => checkOptIsCorrect(value)}>
					Verify OPT
				</Button>
			</div>
		</div>
	);
};

export default ForgetPassword;
