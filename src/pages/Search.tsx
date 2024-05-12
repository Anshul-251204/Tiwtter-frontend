import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Account({ user }: { user: any }) {
	return (
		<Link
			to={`/profile/${user.username}`}
			className="w-full my-4 sm:w-[40%] flex gap-4 items-center border px-4 py-2 rounded-lg "
		>
			<img
				className="w-[50px] h-[50px] rounded-full"
				src={user?.avatar?.url}
				alt=""
			/>
			<p className="text-xl">{user.username}</p>
		</Link>
	);
}

export default function Search() {
	const [username, setUsername] = useState<string>("");
	const [users, setUsers] = useState([]);

	let g = "g";

	console.log(g.length);

	const fetchUsers = async () => {
		if (username.length === 0) {
			toast.error("Please enter username");
			return;
		}

		const res = await axios.get(`/api/v1/users/search/${username}`, {
			withCredentials: true,
		});
		if (res.data.data.length == 0) {
			toast.error("User not Found !");
		}
		setUsers(res.data.data);
	};

	const fetchUsersOnKEYPress = async (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key == "Enter") {
			const res = await axios.get(`/api/v1/users/search/${username}`, {
				withCredentials: true,
			});

			if (res.data.data.length == 0) {
				toast.error("User not Found !");
			}
			setUsers(res.data.data);
		}
	};

	return (
		<div className="w-full h-full p-4 pt-10">
			<div className="flex gap-4">
				<Input
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Search user..."
					onKeyDown={fetchUsersOnKEYPress}
					 autoFocus
				/>
				<Button onClick={fetchUsers}>
					<SearchIcon className="max-sm:hidden" />{" "}
					<span className="sm:ml-4">Search</span>
				</Button>
			</div>

			<div className="mt-4 h-[95%] overflow-y-auto sm:no-scrollbar">
				{users?.map((user, idx) => (
					<Account user={user} key={idx} />
				))}
			</div>
		</div>
	);
}
