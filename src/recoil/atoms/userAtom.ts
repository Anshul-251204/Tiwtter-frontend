import { atom } from "recoil";

const user = localStorage.getItem("curr-user") || "";

export const userAtom = atom({
	key: "userAtom",
	default: user ? JSON.parse(user) : {},
});
