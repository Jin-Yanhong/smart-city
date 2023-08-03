import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path, { resolve, dirname } from 'path';
import { fileURLToPath } from 'node:url';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

const port = 5000;

// https://vitejs.dev/config/
export default ({ mode }) => {
	const config = loadEnv(mode, './');

	return defineConfig({
		base: config.VITE_PUBLIC_PATH,
		plugins: [
			vue(),
			VueI18nPlugin({
				include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		esbuild: {
			jsxFactory: 'h',
			jsxFragment: 'Fragment',
		},
		server: {
			hmr: true,
			open: true,
			port: port,
			proxy: {
				'/api': {
					target: config.VITE_BASE_API,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api\//, '/api/'),
				},
			},
		},
	});
};
