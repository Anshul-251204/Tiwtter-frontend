import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	// server: {
	// 	proxy: {
	// 		"/api": "https://twitter-node-prisma-2.onrender.com/",
	// 	},
	// },
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
