import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import theme from "../theme";
// import { system } from "@chakra-ui/react/preset";
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider initialColorMode={theme.config.initialColorMode}  >
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
);