import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DeleteIcon, Heart, MessageCircle, Pin } from "lucide-react";
import { PostType } from "@/types/general-types";
import { constantImage } from "@/lib/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Post({
	post,
	deleteOption = false,
}: {
	post: PostType;
	deleteOption?: boolean;
}) {
	const [likes, setLikes] = useState<boolean>(false);

	const avatar = post?.owner?.avatar
		? post?.owner?.avatar?.url
		: constantImage.AVATAR;

	const image = post?.image?.url;

	const navigate = useNavigate();

	async function deletePost(id: number) {
		try {
			await axios.delete(`/api/v1/posts/${id}`, {
				withCredentials: true,
			});
			toast.success("YOUR POST DELETE SUCCESSFULLY.");
			navigate("/me");
		} catch (error) {
			toast.error("Something went wrong while delete Post");
		}
	}

	const redirectOnSignlePostPage = (id: number) => {
		navigate(`/single-post/${id}`);
	};

	const doLike = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number
	) => {
		e.preventDefault();
		axios.post(`/api/v1/likes/${id}`, {}, { withCredentials: true });
		setLikes((prev) => !prev);
	};
	return (
		<div className="w-full h-fit border rounded-lg my-4 ">
			<Link
				to={`/profile/${post?.owner?.username}`}
				className=" w-ful h-fit p-3 flex gap-4 items-center  max-sm:rounded-none border-b "
			>
				<div className=" w-[40px] h-[40px] bg-white rounded-full  ">
					<img
						className=" w-full h-full object-cover rounded-full"
						src={avatar}
						alt=""
					/>
				</div>
				<h1 className="text-xl">{post?.owner?.username}</h1>
			</Link>

			<p className="p-4  mt-0">{post?.content}</p>

			{image && (
				<img
					className="w-full object-cover h-[500px] "
					src={image}
					alt=""
				/>
			)}

			<div className=" w-full flex justify-between p-2  ">
				<Button
					onClick={(
						e: React.MouseEvent<HTMLButtonElement, MouseEvent>
					) => doLike(e, post?.id)}
					variant={"ghost"}
					size={"icon"}
				>
					{!likes ? (
						<span>
							<Heart />
						</span>
					) : (
						<span>
							<Heart color="red"/>
						</span>
					)}
					<span className="ml-2 text-md">{post?.likes}</span>
				</Button>

				<Button
					onClick={() => redirectOnSignlePostPage(post.id)}
					variant={"ghost"}
					size={"icon"}
				>
					<MessageCircle />
				</Button>

				<Button variant={"ghost"} size={"icon"}>
					<Pin />
				</Button>

				{deleteOption && (
					<Button
						onClick={() => {
							deletePost(post?.id);
						}}
						variant={"ghost"}
						size={"icon"}
					>
						<DeleteIcon />
					</Button>
				)}
			</div>
		</div>
	);
}
