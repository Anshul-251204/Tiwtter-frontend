import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserSignUpType } from "@/types/reqest-response";
import axios from "axios";
import { Github } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

export default function SignUp() {
	const navigate = useNavigate();
	const [user, setUser] = useState<UserSignUpType>({
		username: "",
		password: "",
		email:"",
		name:""
	});

	const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await axios.post("/api/v1/auth/signin", user, {
				withCredentials: true,
			});

			toast.success(res.data.message);
			navigate("/");
		} catch (error: any) {
			toast.success(error.response.data.message);
		}
	};

	return (
		<div className="w-full h-screen flex justify-center items-center p-4 ">
			<div className="w-full h-[65%] sm:w-[35%] sm:h-[70%] border rounded-lg p-4 ">
				<h1 className=" text-2xl text-center p-4">Sign Up</h1>

				<form onSubmit={signInHandler}>
					<Input
					onChange={(e)=>setUser({...user,name:e.target.value})}
					className=" mb-4" placeholder="name" />
					<Input
					onChange={(e)=>setUser({...user,username:e.target.value})}
					className=" my-4" placeholder="username" />
					<Input
					onChange={(e)=>setUser({...user,email:e.target.value})}
					className=" my-4" placeholder="Email" />
					<Input
					onChange={(e)=>setUser({...user,password:e.target.value})}
					className=" my-4" placeholder="Password" />

					<Button type="submit" className="w-full">
						Sign Up
					</Button>
					<div className="flex my-4 items-center justify-between">
						<div className=" border-t w-[45%]"></div>
						<p>OR</p>
						<div className=" border-t w-[45%]"></div>
					</div>
					<Button className=" my-4 w-full">
						<Github className="mr-2" /> GitHub
					</Button>
					<Button className="w-full">
						<img
							width="30"
							height="30"
							className="mr-4"
							src="https://img.icons8.com/color/48/google-logo.png"
							alt="google-logo"
						/>
						Google
					</Button>
				</form>

				<div className="my-4 flex">
					<p>if your have already account </p>
					<Link className=" text-blue-500 ml-2 " to={"/signin"}>
						click here
					</Link>
				</div>
			</div>
		</div>
	);
}
