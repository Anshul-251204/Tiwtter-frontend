import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ProfileEdit = () => {
	return (
		<div className=" w-full h-full  ">
			<div className=" w-full sm:w-[50%] h-full p-4 pt-10 sm:p-8">
				<h1 className="text-xl mb-8 ">Edit your profile</h1>
				<form className=" flex flex-col gap-4">
					<div>
						<Label className="text-lg" htmlFor="name">
							Name
						</Label>
						<Input
							id="name"
							placeholder={"Anshul choure"}
							className="my-2"
						/>
					</div>

					<div>
						<Label className="text-lg" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder={"anshul@gmail.com"}
							className="my-2"
						/>
					</div>

					<div>
						<Label className="text-lg" htmlFor="tagline">
							Tagline
						</Label>
						<Input
							id="tagline"
							placeholder={"Anshul choure"}
							className="my-2"
						/>
					</div>

					<div>
						<Label className="text-lg" htmlFor="bio">
							Bio
						</Label>
						<Textarea
							className="my-2"
							id="bio"
							rows={4}
							 placeholder="ldfdsd dfsdf jrekdfre dfsfe dsfsjkfe fdfe fewefe"
						/>
					</div>

          <Button className=" bg-primary ">Update</Button>
				</form>
			</div>
		</div>
	);
};

export default ProfileEdit;
