import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.tsx";
import App from "@/App.tsx";
import Profile from "./pages/Profile.tsx";
import Setting from "./pages/Setting.tsx";
import Search from "./pages/Search.tsx";
import SignUp from "./pages/Signup.tsx";
import SignIp from "./pages/Signin.tsx";
import Me from "./pages/Me.tsx";
import ProfileEdit from "./pages/ProfileEdit.tsx";
import AddPostHome from "./pages/addPost.tsx";
import SinglePost from "./pages/SinglePost.tsx";
export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "/profile/:username",
				element: <Profile />,
			},
			{
				path: "/setting",
				element: <Setting />,
			},
			{
				path: "/search",
				element: <Search />,
			},
			{
				path: "/me",
				element: <Me />,
			},
			{
				path: "/profile-edit",
				element: <ProfileEdit />,
			},
			{
				path: "/addpost",
				element: <AddPostHome />,
			},
			{
				path: "/single-post/:id",
				element: <SinglePost />,
			},
		],
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
	{
		path: "/signIn",
		element: <SignIp />,
	},
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
		<ThemeProvider>
			<RecoilRoot>
				<RouterProvider router={router} />
			</RecoilRoot>
			<Toaster />
		</ThemeProvider>
	// </React.StrictMode>
);
