import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

function Account() {
    return (
		<div className="w-full my-4 sm:w-[40%] flex gap-4 items-center border px-4 py-2 rounded-lg ">
			<img
				className="w-[50px] h-[50px] rounded-full"
				src="https://plus.unsplash.com/premium_photo-1709865803790-1d929a9386b9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
				alt=""
			/>
			<p className="text-xl">Anshul</p>
		</div>
	);
}

export default function Search() {
	return (
		<div className="w-full h-full p-4 pt-10">
			<div className="flex gap-4">
				<Input placeholder="Search user..." />
				<Button>
					{" "}
					<SearchIcon className="max-sm:hidden" />{" "}
					<span className="sm:ml-4">Search</span>
				</Button>
			</div>

			<div className="mt-4 h-[95%] overflow-y-auto sm:no-scrollbar">
				<Account />
				<Account />
				<Account />
				<Account />
				<Account />
				<Account />
				<Account />
				<Account />
				<Account />
				<Account />
				<Account />
				<Account />
				<Account />
			</div>
		</div>
	);
}
