import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets.js";
import { ThemeProvider } from "@ui5/webcomponents-react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<Suspense fallback={<Loading />}>
					<App />
				</Suspense>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
);
