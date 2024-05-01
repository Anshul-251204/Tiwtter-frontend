import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";

const DeleteAccountPopUp = ({
	setDeleteModal,deleteModal
}: {
	setDeleteModal: Dispatch<SetStateAction<boolean>>,
    deleteModal: boolean
}) => {

    const modalBackgroundRef = useRef<any>();

    const onClickModalClose = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        if(e.target == modalBackgroundRef.current) {
            setDeleteModal(!deleteModal)
            
        }
    }


	return (
		<div onClick={onClickModalClose} ref={modalBackgroundRef} className=" top-0 left-0 text-background  absolute z-10 w-full h-full  flex justify-center items-center">
			<div className="w-[50%] h-[30%] bg-foreground rounded-lg border border-background flex flex-col justify-between p-10 ">
				<div className="flex justify-between">
					<div>
						<p className="text-4xl">YOUR ARE SURE !!</p>
						<p>Thing again bro...⏳</p>
					</div>

					<Button
						onClick={() => setDeleteModal(!deleteModal)}
						className="text-xl"
						variant={"ghost"}
					>
						<CircleX />
					</Button>
				</div>
				<div className=" flex justify-end gap-4 ">
					<Button>No I Want Cancel</Button>
					<Button>Yes Sure</Button>
				</div>
			</div>
		</div>
	);
};

export default DeleteAccountPopUp;
