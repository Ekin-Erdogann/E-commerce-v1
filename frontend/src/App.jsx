import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreatePage from "./pages/Create";
import HomePage from "./pages/Home";
import Navbar from "./components/ui/Navbar";

function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "#0d001a")}>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/create' element={<CreatePage />} />
			</Routes>
		</Box>
	);
}

export default App;