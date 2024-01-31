import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";

function App() {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode("dark");
  }, []);
  return <div></div>;
}

export default App;
