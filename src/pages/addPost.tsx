"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
// import axios from "axios";
import { Clock, Image, MoveLeft, Plus } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
	const navigate = useNavigate();
	const inputRef = useRef<any>();

	const [image, setImage] = useState<boolean>(false);
	const [avatar, setAvatar] = useState<any>();
	const [content, setContent] = useState<string>("");

	const uploadPost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const res = await axios.post("/api/v1/posts/", formData, {
			withCredentials: true,
		});
		console.log(formData, res);
		toast.success("Post successFully uploaded");
		navigate("/");
	};
	const addImage = () => {
		console.log(inputRef.current);
		inputRef.current.click();
		setImage(!image);
	};

	function handleChange(e: any) {
		setAvatar(URL.createObjectURL(e.target.files[0]));
	}

	return (
		<div className="sm:w-full w-full h-full sm:px-[20%] p-4 ">
			<div className=" w-full h-[10%] flex justify-between items-center border-b pr-4">
				<Button onClick={() => navigate("/")} variant={"ghost"}>
					<MoveLeft />
				</Button>
			</div>

			<form onSubmit={uploadPost} className=" w-full h-[20%]  ">
				<div className="w-full h-[90%]">
					<Textarea
						value={content}
						name="content"
						onChange={(e) => setContent(e.target.value)}
						className="text-md h-[90%]"
						placeholder="Write something you want to share..."
					/>
					<input
						ref={inputRef}
						type="file"
						name="image"
						onChange={handleChange}
						className=" invisible "
					/>
				</div>

				<div className="w-full flex justify-end">
					<Button type="submit">
						Post <Plus size={"1.3rem"} className="ml-2" />
					</Button>
				</div>
			</form>

			<div className="p flex justify-between mt-4 ">
				<div>
					<Button onClick={addImage} variant={"ghost"}>
						<Image />
					</Button>
					<Button variant={"ghost"}>
						<Clock />
					</Button>
				</div>
				{/* <Button onClick={() => uploadPost}>
					Post <Plus size={"1.3rem"} className="ml-2" />
				</Button>  */}
			</div>

			{image && (
				<img
					className=" w-full h-[50%] object-cover mt-4 border-none rounded-lg"
					src={avatar}
					alt=""
				/>
			)}
		</div>
	);
}
