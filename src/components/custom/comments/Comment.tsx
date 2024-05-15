import { CommentType } from "@/types/general-types";
import { Link } from "react-router-dom";

const Comments = ({ comment }: { comment: CommentType }) => {
	return (
		<div className="w-full min-h-[100px] border flex items-center my-4 rounded-lg p-2">
			<div className="w-[20%] h-[100px] flex items-center justify-center  ">
				<img
					className=" w-[70px] h-[70px] rounded-full  object-cover "
					src={comment.user.avatar.url}
					alt=""
				/>
			</div>
			<Link to={`/profile/${comment?.user?.username}`} className="w-[80%] h-[100px] flex flex-col justify-center pl-4">
				<h1 className="text-lg font-semibold ">@ {comment?.user?.username}</h1>
				<p>{comment?.content}</p>
			</Link>

			 
		</div>
	);
};

export default Comments;
