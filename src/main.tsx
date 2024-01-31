import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
