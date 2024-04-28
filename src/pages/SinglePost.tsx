import Comments from "@/components/custom/comments/Comment";
import Post from "@/components/custom/post/Post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommentType, PostType } from "@/types/general-types";
import axios from "axios";
import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const SinglePost: React.FC = () => {
	const { id } = useParams();
	const [post, setPost] = useState<PostType | any>({});
	const [comments, setComments] = useState<CommentType[]>([]);
	const [content, setContent] = useState<string>("");
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios.get(`/api/v1/posts/${id}`).then((data) => {
			setPost(data?.data?.data);
		});
		axios.get(`/api/v1/comments/${id}`).then((data) => {
			setComments(data?.data?.data);
		});
	}, [refresh]);

	const addCommentOnKeyPress = (
		e: React.KeyboardEvent<HTMLInputElement>,
		id: number,
		content: string
	) => {
		if (e.key == "Enter") {
			axios
				.post(
					`/api/v1/comments/${id}`,
					{ content },
					{ withCredentials: true }
				)
				.then((data) => {
					
					setRefresh((prev)=>!prev);
					toast.success(data.data.message);
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.response.data.message);
				});
		}
	};

	const addCommentOnClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number,
		content: string
	) => {
		e.preventDefault()
		axios
			.post(
				`/api/v1/comments/${id}`,
				{ content },
				{ withCredentials: true }
			)
			.then((data) => {
		
				setRefresh((prev) => !prev);
				toast.success(data.data.message);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);
			});
	};

	return (
		<div
			id="single-post"
			className={`w-full h-full sm:w-[50%] mx-auto ${
				comments.length > 2 ? "pb-[100px]" : null
			} overflow-x-auto no-scrollbar `}
		>
			<Post post={post} />

			<div className=" flex gap-4 p-2">
				<Input
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setContent(e.target.value)
					}
					placeholder="Something...."
					onKeyDown={(e) =>
						addCommentOnKeyPress(e, Number(id), content)
					}
				/>
				<Button
					onClick={(
						e: React.MouseEvent<HTMLButtonElement, MouseEvent>
					) => addCommentOnClick(e, Number(id), content)}
				>
					<Send />
				</Button>
			</div>
			{comments.map((comment: CommentType, idx: number) => (
				<Comments comment={comment} key={idx} />
			))}
		</div>
	);
};

export default SinglePost;
