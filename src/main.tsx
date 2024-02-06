import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.ts";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </QueryClientProvider>
);
{
  /* </React.StrictMode> */
}
document.documentElement.setAttribute(
  "data-theme",
  theme.config.initialColorMode
);
document.body.classList.add(`chakra-ui-${theme.config.initialColorMode}`);
