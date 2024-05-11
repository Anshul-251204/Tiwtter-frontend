import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
<<<<<<< HEAD
	// server: {
	// 	proxy: {
	// 		"/api": "https://twitter-node-prisma-2.onrender.com/",
	// 	},
	// },
=======
	server: {
		proxy: {
			"/api": "https://twitter-node-prisma-2.onrender.com",
		},
	},
>>>>>>> 11b0f19f2203c1b6bb662e9a64048468328186d5
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
