import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const port = 5000;

// https://vitejs.dev/config/
export default ({ mode }) => {
	const config = loadEnv(mode, "./");

	return defineConfig({
		base: mode == "production" ? "/smart-city" : "/",
		plugins: [vue()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			hmr: true,
			open: true,
			port: port,
			proxy: {
				"/api": {
					target: config.VITE_BASE_API,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "/api"),
				},
			},
		},
	});
};
