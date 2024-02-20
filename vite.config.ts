import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "process-control-flow",
			filename: "remoteEntry.js",
			exposes: {
				"./DateTimePickerCard": "./src/components/DateTimePickerCard",
				"./CustomComponent": "./src/components/CustomComponent",
				"./SideNavbar": "./src/components/SideNavbar",
				"./AppShell": "./src/components/AppShell",
			},
			shared: [
				"react",
				"react-dom",
				"tailwindcss",
				"react-router-dom",
				"@ui5/webcomponents-react",
			],
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			target: "esnext",
		},
	},
	build: {
		target: "esnext",
		cssCodeSplit: false,
		minify: "esbuild",
	},
});
