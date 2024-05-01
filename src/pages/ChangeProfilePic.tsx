import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userAtom } from "@/recoil/atoms/userAtom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const ChangeProfilePic = () => {
	const [avatar, setAvatar] = useState<any>();
	const navigate = useNavigate();
	const setUserAtom = useSetRecoilState(userAtom);

	function handleChange(e: any) {
		setAvatar(URL.createObjectURL(e.target.files[0]));
	}
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const ChangeAvatar = async () => {
			const res = await axios.patch("/api/v1/users/avatar", formData);
			setUserAtom(res.data.data);
            localStorage.setItem("curr-user", JSON.stringify(res.data.data));
			return res;
		};
		const myPromise = ChangeAvatar();

		toast.promise(myPromise, {
			loading: "wait your profile is changing ⏳",
			success: "your Profile was changed ✅",
			error: "Error when fetching",
		});
		navigate("/");
	};
	return (
		<div className="w-full h-full p-10">
			<h1 className="text-2xl font-semibold">CHANGE YOUR PROFILE 🐭</h1>
			<form onSubmit={submitHandler}>
				<Input
					className="sm:w-[50%] text-foreground text-lg p-2 my-4 relative after:h-full after:w-full after:absolute after:bg-foreground after:left-0 after:top-0 after:content-['Choose_file'] after:text-background after:text-xl after:p-1"
					id="avatar"
					name="avatar"
					onChange={handleChange}
					placeholder="avatar"
					type="file"
				/>
				{avatar && (
					<img
						className="w-[50%] h-[65%] object-cover"
						src={avatar}
						alt=""
					/>
				)}

				<Button type="submit" className="w-[50%] my-4">
					Save
				</Button>
			</form>
		</div>
	);
};

export default ChangeProfilePic;
