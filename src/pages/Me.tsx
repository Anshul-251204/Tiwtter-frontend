import Post from "@/components/custom/post/Post";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PostType, ProfileType } from "@/types/general-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/userAtom";
import { BadgeCheck } from "lucide-react";

function Profile() {
	const navigate = useNavigate();

	const user = useRecoilValue(userAtom);

	console.log(user);

	const redirectToEditPage = () => {
		navigate("/profile-edit");
	};

	const [profile, setProfile] = useState<ProfileType>();
	let joinedDate: any = new Date(profile?.createdAt as any);

	joinedDate = joinedDate.toDateString().split(" ");

	joinedDate.shift();
	useEffect(() => {
		axios.get("/api/v1/users/" + user.username).then((response) => {
			setProfile(response.data.data);
		});
	}, []);

	return (
		<div className=" w-full h-full sm:w-[70%] overflow-x-auto no-scrollbar ">
			<div className=" w-full h-[60%] border mb-2 ">
				<div className=" relative w-full sm:h-[45%] h-[40%] ">
					<img
						className=" w-full h-full object-cover object-center "
						src="https://images.unsplash.com/photo-1712135596173-2bb522bcfd88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
						alt=""
					/>
					<img
						className=" absolute top-[55%] sm:top-[45%]  left-[5%] sm:h-[150px] h-[120px] sm:w-[150px] w-[120px] object-cover rounded-full "
						src={
							user.avatar.url
								? user.avatar.url
								: "https://images.unsplash.com/photo-1712135596173-2bb522bcfd88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
						}
						alt=""
					/>
				</div>
				<div className="w-full h-[55%]  p-4  pt-10 sm:pl-8 ">
					<div className="w-full">
						<div className="w-full flex justify-between ">
							<div>
								<h1>{profile?.name} </h1>
								<h1
									className={`${
										user.blueTick ? "text-blue-400" : null
									} flex gap-2 items-center`}
								>
									@{profile?.username}{" "}
									{user.blueTick && (
										<BadgeCheck
											// color="#0000FF"
											size={"1.2rem"}
										/>
									)}
								</h1>
								<h1 className="  text-gray-400 my-2 ">
									Join At {joinedDate.join(" ")}
								</h1>
							</div>

							<div>
								<Button onClick={redirectToEditPage}>
									Edit
								</Button>
							</div>
						</div>

						<div>
							<p>{profile?.tagList}</p>
							<p>{profile?.bio}</p>
						</div>

						<div className=" flex gap-8 my-2 text-gray-400 ">
							<p>{profile?.followers} &nbsp;follower</p>
							<p>{profile?.friends} &nbsp; following</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				{profile?.posts?.length == 0 && (
					<div className=" h-full w-full flex my-20 text-2xl justify-center items-center">
						NO POST 🥲
					</div>
				)}
				{profile?.posts.map((post: PostType, idx: number) => (
					<Post
						key={idx}
						post={{
							...post,
							owner: {
								username: profile?.username,
								avatar: {
									url: profile?.avatar?.url as string,
									public_id: profile?.avatar
										?.public_id as string,
								},
							},
						}}
						deleteOption={true}
					/>
				))}
			</div>
		</div>
	);
}

export default Profile;
