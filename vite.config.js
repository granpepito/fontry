import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			cssModules: {
				pattern: '[name]-[hash]-[local]',
			},
		},
	},
	build: {
		cssMinify: 'lightningcss',
	},
	plugins: [
		react(),
		svgr({
			svgrOptions: {
				ref: true,
			},
		}),
	],
});
