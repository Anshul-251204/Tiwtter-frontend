import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddPostHome() {
	const [content, setContent] = useState<string>("");
	const uploadPost = async (content: string) => {
		const res = await axios.post(
			"/api/v1/posts/",
			{ content },
			{ withCredentials: true }
		);
		toast.success(res.data.message)
		
	};
	return (
		<div className="max-sm:hidden w-ful  h-[16%] border rounded-lg flex p-4 pt-2 mb-4">
			<div className="w-[15%] flex items-center ">
				<img
					className=" w-[50px] h-[50px] rounded-full "
					src="https://images.unsplash.com/photo-1661174585122-83a2909163ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D"
					alt=""
				/>
			</div>
			<div className=" w-full flex flex-col ">
				<div>
					<input
						value={content}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setContent(e.target.value)
						}
						className=" bg-background p-4 w-full outline-none border-b mb-2 "
						placeholder="What's Happening"
					/>
				</div>

				<Button
				onClick={()=>uploadPost(content)}
				 variant={"outline"} className="self-end ">
					Add <Plus size={"1rem"} />{" "}
				</Button>
			</div>
		</div>
	);
}
