import AddPostHome from "@/components/custom/post/Add-post";
import Post from "@/components/custom/post/Post";
import { PostType } from "@/types/general-types";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
	const [posts, setPosts] = useState<PostType[]>([]);
	useEffect(() => {
		axios
			.get("/api/v1/posts/")
			.then((response) => setPosts(response.data.data));
	}, []);
	return (
		<div className="w-full h-full sm:pl-[25%] sm:pr-[25%] overflow-x-auto no-scrollbar ">
			<AddPostHome />

			{posts.map((post: PostType, idx: number) => (
				<Post key={idx} post={post} />
			))}
		</div>
	);
}

export default Home;
